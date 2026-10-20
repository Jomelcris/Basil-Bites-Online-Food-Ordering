import { Review } from "../models/index.js";

// [menuItemId, author, rating, comment, date]
const rows = [
  [1, "Ana Mercado", 5, "Crispy edges and the sauce is dangerous. Ordered twice this week.", "2026-09-28"],
  [1, "Rico Delgado", 4, "Great burger, would love an extra patty option.", "2026-10-02"],
  [2, "Liza Cuenco", 4, "The mushrooms make this one. Fries were a little cold on arrival.", "2026-10-05"],
  [2, "Mark Tan", 4, "Rich and filling. Swiss cheese is a nice change.", "2026-10-09"],
  [3, "Joy Alcantara", 5, "Fresh basil, chewy crust. Best margherita I have had in Cebu.", "2026-09-30"],
  [3, "Paolo Reyes", 5, "Simple and perfect.", "2026-10-03"],
  [3, "Carla Go", 4, "Slightly soggy in the middle after delivery but still tasty.", "2026-10-11"],
  [4, "Nico Villareal", 4, "Chili honey is a great idea. Medium heat, not too much.", "2026-10-01"],
  [4, "Bea Lim", 5, "Spicy, sweet, salty. Finished the whole box.", "2026-10-07"],
  [5, "Dan Ocampo", 5, "The broth is thick and deeply savory. Egg was perfectly jammy.", "2026-09-26"],
  [5, "Mika Sy", 4, "Generous chashu. Noodles could be a bit firmer.", "2026-10-04"],
  [6, "Ella Ramos", 5, "Surprisingly rich for a veggie ramen.", "2026-10-06"],
  [6, "Jun Abella", 4, "Loved the corn and sesame. Wish it were a bigger bowl.", "2026-10-10"],
  [7, "Tess Navarro", 5, "Mangoes were so sweet. The cream is not heavy at all.", "2026-09-29"],
  [7, "Gio Fernandez", 5, "Birthday-worthy. Ordered a whole one for my sister.", "2026-10-08"],
  [8, "Kim Dizon", 5, "The center really does flow. Pair it with the milk tea.", "2026-10-02"],
  [8, "Ron Pacana", 4, "Rich and warm. A little sweet for me.", "2026-10-12"],
  [9, "Lea Santos", 5, "Ube and leche flan together is unbeatable.", "2026-10-03"],
  [9, "Ben Yap", 4, "Arrived a bit melted but still delicious.", "2026-10-09"],
  [10, "Cathy Uy", 5, "Pearls were soft and the syrup tastes like real caramel.", "2026-09-27"],
  [10, "Alvin Torres", 4, "Sweet. Ask for less sugar if you like.", "2026-10-05"],
  [11, "Rina Salazar", 5, "Tastes like actual mango. Nothing artificial.", "2026-10-01"],
  [11, "Jed Aguilar", 4, "Thick and cold. Great for hot afternoons.", "2026-10-13"],
  [12, "Nina Cabrera", 4, "Refreshing and tart. Not too sweet.", "2026-10-04"],
  [12, "Ivan Chua", 5, "Perfect with the spicy pizza.", "2026-10-10"],
];

export const seedReviews = rows.map(
  ([menuItemId, author, rating, comment, date], index) =>
    new Review({ id: index + 1, menuItemId, author, rating, comment, date })
);
