import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { Cart, CartItem, FavoritesList, Order, Review } from "../models/index.js";
import { menuItems } from "../data/menuItems.js";
import { seedReviews } from "../data/reviews.js";
import { CONFIG } from "../data/config.js";
import { content } from "../data/content.js";
import { loadJSON, saveJSON } from "../utils/storage.js";
import { generateOrderId } from "../utils/format.js";

const StoreContext = createContext(null);
const KEYS = CONFIG.storageKeys;

const findItem = (id) => menuItems.find((item) => item.id === id);

/* ---------- Saving and loading (plain JSON <-> model classes) ---------- */

const loadCart = () =>
  new Cart(
    loadJSON(KEYS.cart, [])
      .map(({ id, quantity }) => {
        const menuItem = findItem(id);
        return menuItem ? new CartItem(menuItem, quantity) : null;
      })
      .filter(Boolean)
  );

const loadReviews = () => [
  ...seedReviews,
  ...loadJSON(KEYS.reviews, []).map((r) => new Review(r)),
];

const loadOrders = () =>
  loadJSON(KEYS.orders, []).map(
    (o) =>
      new Order({
        ...o,
        items: o.items
          .map(({ id, quantity }) => {
            const menuItem = findItem(id);
            return menuItem ? new CartItem(menuItem, quantity) : null;
          })
          .filter(Boolean),
      })
  );

const initialState = () => ({
  cart: loadCart(),
  favorites: new FavoritesList(loadJSON(KEYS.favorites, [])),
  reviews: loadReviews(),
  orders: loadOrders(),
  toast: null,
});

/* ---------- Reducer ---------- */

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD":
      return { ...state, cart: state.cart.addItem(action.item, action.quantity) };
    case "CART_ADD_MANY":
      return {
        ...state,
        cart: action.items.reduce((cart, item) => cart.addItem(item, 1), state.cart),
      };
    case "CART_SET_QUANTITY":
      return { ...state, cart: state.cart.updateQuantity(action.id, action.quantity) };
    case "CART_REMOVE":
      return { ...state, cart: state.cart.removeItem(action.id) };
    case "CART_CLEAR":
      return { ...state, cart: state.cart.clear() };
    case "FAVORITE_TOGGLE":
      return { ...state, favorites: state.favorites.toggle(action.id) };
    case "FAVORITES_CLEAR":
      return { ...state, favorites: state.favorites.clear() };
    case "REVIEW_ADD":
      return { ...state, reviews: [action.review, ...state.reviews] };
    case "ORDER_PLACE":
      return { ...state, orders: [action.order, ...state.orders], cart: state.cart.clear() };
    case "TOAST_SHOW":
      return { ...state, toast: { id: action.id, message: action.message } };
    case "TOAST_HIDE":
      return { ...state, toast: null };
    default:
      return state;
  }
}

/* ---------- Provider ---------- */

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const toastTimer = useRef(null);

  // Persist to localStorage whenever the related slice changes.
  useEffect(() => {
    saveJSON(KEYS.cart, state.cart.items.map((i) => ({ id: i.menuItem.id, quantity: i.quantity })));
  }, [state.cart]);

  useEffect(() => {
    saveJSON(KEYS.favorites, state.favorites.itemIds);
  }, [state.favorites]);

  useEffect(() => {
    const userReviews = state.reviews.filter((r) => typeof r.id === "string");
    saveJSON(KEYS.reviews, userReviews);
  }, [state.reviews]);

  useEffect(() => {
    saveJSON(
      KEYS.orders,
      state.orders.map((o) => ({
        ...o,
        items: o.items.map((i) => ({ id: i.menuItem.id, quantity: i.quantity })),
      }))
    );
  }, [state.orders]);

  const notify = useCallback((message) => {
    window.clearTimeout(toastTimer.current);
    dispatch({ type: "TOAST_SHOW", id: Date.now(), message });
    toastTimer.current = window.setTimeout(
      () => dispatch({ type: "TOAST_HIDE" }),
      CONFIG.toastDurationMs
    );
  }, []);

  const dismissToast = useCallback(() => {
    window.clearTimeout(toastTimer.current);
    dispatch({ type: "TOAST_HIDE" });
  }, []);

  const actions = useMemo(
    () => ({
      addToCart(item, quantity = 1) {
        dispatch({ type: "CART_ADD", item, quantity });
        notify(content.toasts.addedToCart(item.name));
      },
      setQuantity(id, quantity) {
        dispatch({
          type: "CART_SET_QUANTITY",
          id,
          quantity: Math.min(quantity, CONFIG.maxQuantity),
        });
      },
      removeFromCart(id) {
        dispatch({ type: "CART_REMOVE", id });
      },
      clearCart() {
        dispatch({ type: "CART_CLEAR" });
        notify(content.toasts.cartCleared);
      },
      toggleFavorite(item) {
        const wasSaved = state.favorites.has(item.id);
        dispatch({ type: "FAVORITE_TOGGLE", id: item.id });
        notify(
          wasSaved
            ? content.toasts.favoriteRemoved(item.name)
            : content.toasts.favoriteAdded(item.name)
        );
      },
      clearFavorites() {
        dispatch({ type: "FAVORITES_CLEAR" });
      },
      addFavoritesToCart() {
        const items = state.favorites.itemIds.map(findItem).filter(Boolean);
        dispatch({ type: "CART_ADD_MANY", items });
        notify(content.toasts.addedMany(items.length));
      },
      addReview({ menuItemId, author, rating, comment }) {
        const review = new Review({
          id: `u-${Date.now()}`,
          menuItemId,
          author: author.trim(),
          rating,
          comment: comment.trim(),
          date: new Date().toISOString().slice(0, 10),
        });
        dispatch({ type: "REVIEW_ADD", review });
        notify(content.toasts.reviewPosted);
      },
      placeOrder(form) {
        const order = new Order({
          id: generateOrderId(),
          items: state.cart.items,
          customerName: form.customerName.trim(),
          address: form.address.trim(),
          phone: form.phone.trim(),
          paymentMethod: form.paymentMethod,
          notes: form.notes.trim(),
          deliveryFee: state.cart.getDeliveryFee(CONFIG.delivery),
        });
        dispatch({ type: "ORDER_PLACE", order });
        return order;
      },
    }),
    [state.cart, state.favorites, notify]
  );

  const value = useMemo(
    () => ({
      ...state,
      ...actions,
      dismissToast,
      getReviewsFor: (id) => state.reviews.filter((r) => r.menuItemId === id),
      getRating: (item) => item.getAverageRating(state.reviews),
      getReviewCount: (item) => item.getReviews(state.reviews).length,
      getOrder: (id) => state.orders.find((o) => o.id === id),
    }),
    [state, actions, dismissToast]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
