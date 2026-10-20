import { CONFIG } from "../data/config.js";

const priceFormatter = new Intl.NumberFormat(CONFIG.currency.locale, {
  style: "currency",
  currency: CONFIG.currency.code,
  maximumFractionDigits: 0,
});

export const formatPrice = (amount) => priceFormatter.format(amount);

export const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString(CONFIG.currency.locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const generateOrderId = () =>
  "BB-" + Math.random().toString(36).slice(2, 8).toUpperCase();
