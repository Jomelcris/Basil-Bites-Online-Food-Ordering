import { Category } from "../models/index.js";

export const ALL_CATEGORY_ID = 0;

export const categories = [
  new Category({ id: 1, name: "Burgers", icon: "🍔" }),
  new Category({ id: 2, name: "Pizza", icon: "🍕" }),
  new Category({ id: 3, name: "Ramen", icon: "🍜" }),
  new Category({ id: 4, name: "Desserts", icon: "🍰" }),
  new Category({ id: 5, name: "Drinks", icon: "🧋" }),
];
