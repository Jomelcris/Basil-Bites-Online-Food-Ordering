// App-wide settings. Change values here, not inside components.
export const CONFIG = {
  currency: { locale: "en-PH", code: "PHP" },
  delivery: { fee: 49, freeAbove: 600 },
  maxQuantity: 20,
  storageKeys: {
    cart: "basilbites.cart",
    favorites: "basilbites.favorites",
    reviews: "basilbites.reviews",
    orders: "basilbites.orders",
  },
  toastDurationMs: 2200,
};
