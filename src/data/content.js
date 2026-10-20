// Every piece of text shown in the UI lives here.
// Components read from this object, so no wording is hardcoded in JSX.
import { CONFIG } from "./config.js";
import { formatPrice } from "../utils/format.js";

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

export const content = {
  brand: {
    name: "Basil Bites",
    tagline: "Fresh plates, delivered fast",
    logo: "🍲",
  },

  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    ratingOf: (rating) => `Rated ${rating} out of 5`,
    goHome: "Basil Bites home",
    dismiss: "Dismiss message",
  },

  nav: {
    links: [
      { to: "/", label: "Home", icon: "home", end: true },
      { to: "/menu", label: "Menu", icon: "menu" },
      { to: "/favorites", label: "Favorites", icon: "heart" },
      { to: "/cart", label: "Cart", icon: "cart" },
    ],
    cartAria: (count) => `Cart, ${plural(count, "item", "items")}`,
    favoritesAria: (count) => `Favorites, ${count} saved`,
  },

  home: {
    heroTitle: "Comfort food at your door in 30 minutes",
    heroBody:
      "Burgers, wood-fired pizza, slow-simmered ramen, and sweets. Order from one menu and pay your way.",
    heroCta: "Browse the menu",
    heroSecondaryCta: "See your favorites",
    sticker: {
      top: "Free delivery",
      bottom: `over ${formatPrice(CONFIG.delivery.freeAbove)}`,
    },
    categoriesTitle: "Pick a craving",
    featuredTitle: "Most ordered this week",
    featuredBody: "The dishes our regulars keep coming back for.",
    featuredCta: "See the full menu",
    perks: [
      {
        icon: "🛵",
        title: "Hot on arrival",
        text: "Insulated bags and short routes keep every order warm.",
      },
      {
        icon: "🌿",
        title: "Made fresh",
        text: "Dough, broth, and sauces are prepared in our kitchen every morning.",
      },
      {
        icon: "🧾",
        title: "Simple pricing",
        text: `Delivery is ${formatPrice(CONFIG.delivery.fee)}, and free once your order passes ${formatPrice(CONFIG.delivery.freeAbove)}.`,
      },
    ],
  },

  menu: {
    title: "The menu",
    subtitle: "Search, filter, and sort to find your next meal.",
    searchLabel: "Search the menu",
    searchPlaceholder: "Try ramen, mango, or spicy",
    clearSearch: "Clear search",
    categoryLabel: "Categories",
    allLabel: "All dishes",
    sortLabel: "Sort by",
    sortOptions: [
      { value: "rating", label: "Top rated" },
      { value: "priceAsc", label: "Price, low to high" },
      { value: "priceDesc", label: "Price, high to low" },
      { value: "name", label: "Name, A to Z" },
    ],
    tagLabel: "Filter by tag",
    tags: {
      vegetarian: "Vegetarian",
      spicy: "Spicy",
      bestseller: "Bestseller",
    },
    savedOnly: "Saved only",
    resultCount: (n) => plural(n, "dish", "dishes"),
    emptyEmoji: "🍽️",
    emptyTitle: "No dishes match that",
    emptyBody: "Try another word, or clear your filters to see everything.",
    clearFilters: "Clear filters",
  },

  card: {
    addToCart: "Add to cart",
    inCart: (qty) => `In cart: ${qty}`,
    favoriteAdd: (name) => `Save ${name} to favorites`,
    favoriteRemove: (name) => `Remove ${name} from favorites`,
    noRatings: "New",
    reviewCount: (n) => `(${n})`,
  },

  details: {
    back: "Back to menu",
    prepLabel: "Ready in",
    ratingLabel: "Rating",
    quantityLabel: "Quantity",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    addToCart: (total) => `Add to cart, ${formatPrice(total)}`,
    goToCart: "View cart",
    reviewsTitle: "What people are saying",
    reviewsCount: (n) => plural(n, "review", "reviews"),
    noReviews: "No reviews yet. Be the first to share what you thought.",
    relatedTitle: "More from the same category",
    notFoundEmoji: "🔍",
    notFoundTitle: "We couldn't find that dish",
    notFoundBody: "It may have been removed from the menu.",
    notFoundCta: "Back to the menu",
  },

  reviewForm: {
    title: "Write a review",
    nameLabel: "Your name",
    namePlaceholder: "Maria Santos",
    ratingLabel: "Your rating",
    starAria: (n) => `${plural(n, "star", "stars")}`,
    commentLabel: "Your review",
    commentPlaceholder: "What did you like? How was the portion?",
    submit: "Post review",
    errors: {
      author: "Enter your name.",
      comment: "Write at least 10 characters.",
    },
  },

  favorites: {
    title: "Your favorites",
    subtitle: (n) => `${plural(n, "dish", "dishes")} saved for later.`,
    addAll: "Add all to cart",
    clearAll: "Clear favorites",
    emptyEmoji: "💛",
    emptyTitle: "No favorites yet",
    emptyBody: "Tap the heart on any dish and it will wait for you here.",
    emptyCta: "Browse the menu",
  },

  cart: {
    title: "Your cart",
    subtitle: (n) => plural(n, "item", "items"),
    emptyEmoji: "🛒",
    emptyTitle: "Your cart is empty",
    emptyBody: "Add a few dishes and they will show up here.",
    emptyCta: "Browse the menu",
    remove: "Remove",
    removeAria: (name) => `Remove ${name} from cart`,
    clear: "Clear cart",
    continueShopping: "Add more dishes",
    summaryTitle: "Order summary",
    subtotal: "Subtotal",
    delivery: "Delivery",
    free: "Free",
    total: "Total",
    checkout: "Go to checkout",
    eachPrice: (price) => `${formatPrice(price)} each`,
    freeHint: (remaining) => `Add ${formatPrice(remaining)} more to get free delivery.`,
    freeUnlocked: "Free delivery unlocked.",
  },

  checkout: {
    title: "Checkout",
    subtitle: "Tell us where to send your order.",
    contactTitle: "Delivery details",
    paymentTitle: "Payment method",
    summaryTitle: "Your order",
    fields: [
      { name: "customerName", label: "Full name", placeholder: "Juan Dela Cruz", type: "text", autoComplete: "name" },
      { name: "phone", label: "Mobile number", placeholder: "09171234567", type: "tel", autoComplete: "tel" },
      { name: "address", label: "Delivery address", placeholder: "House number, street, barangay, city", type: "textarea", autoComplete: "street-address" },
      { name: "notes", label: "Notes for the rider (optional)", placeholder: "Gate code, landmark, or ring the bell twice", type: "textarea", optional: true },
    ],
    paymentMethods: [
      { id: "cod", label: "Cash on delivery", hint: "Pay the rider when your food arrives." },
      { id: "gcash", label: "GCash", hint: "Send payment to our GCash number after you order." },
      { id: "card", label: "Card on delivery", hint: "The rider brings a card terminal." },
    ],
    errors: {
      customerName: "Enter your full name.",
      phone: "Enter a mobile number like 09171234567.",
      address: "Enter a delivery address with at least 10 characters.",
      paymentMethod: "Choose how you want to pay.",
    },
    placeOrder: "Place order",
    backToCart: "Back to cart",
    emptyTitle: "Nothing to check out yet",
    emptyBody: "Add some dishes to your cart first.",
    emptyCta: "Browse the menu",
    emptyEmoji: "🧺",
  },

  confirmation: {
    emoji: "🎉",
    title: "Order placed",
    subtitle: (name) => `Thanks, ${name}. Your food is being prepared.`,
    orderNumber: "Order number",
    placedOn: "Placed on",
    etaLabel: "Estimated arrival",
    etaValue: "25 to 35 minutes",
    trackerTitle: "Order progress",
    steps: ["Order received", "Preparing", "On the way", "Delivered"],
    deliveringTo: "Delivering to",
    paymentLabel: "Payment",
    itemsTitle: "Items",
    notesLabel: "Rider notes",
    orderAgain: "Order again",
    backHome: "Back to home",
    notFoundEmoji: "🔍",
    notFoundTitle: "We can't find that order",
    notFoundBody: "The link may be wrong. You can start a new order anytime.",
    notFoundCta: "Browse the menu",
  },

  notFound: {
    emoji: "🥄",
    title: "That page isn't on the menu",
    body: "The link may be wrong, or the page has moved.",
    cta: "Back to home",
  },

  toasts: {
    addedToCart: (name) => `${name} added to your cart`,
    addedMany: (n) => `${plural(n, "dish", "dishes")} added to your cart`,
    favoriteAdded: (name) => `${name} saved to favorites`,
    favoriteRemoved: (name) => `${name} removed from favorites`,
    cartCleared: "Cart cleared",
    reviewPosted: "Thanks, your review is posted",
  },

  footer: {
    hours: "Open daily, 10:00 AM to 10:00 PM",
    area: "Delivering across Cebu City",
    note: "Built with React and Tailwind CSS for the Midterm Practical Exam.",
  },
};
