import { MenuItem } from "../models/index.js";

// `image` is optional. Leave it empty to show the emoji tile, or paste an
// image URL / a file path from /public to show a real photo.
const raw = [
  {
    id: 1, name: "Smash burger", price: 220, emoji: "🍔", tint: "#F9DDD5", categoryId: 1,
    description: "Two thin beef patties pressed on the grill, American cheese, pickles, and house sauce on a toasted potato bun.",
    tags: ["bestseller"], prepTime: "15-20 min", isFeatured: true,
  },
  {
    id: 2, name: "Mushroom swiss burger", price: 245, emoji: "🍄", tint: "#EFE3CF", categoryId: 1,
    description: "Juicy beef patty topped with sauteed mushrooms, melted swiss, and garlic aioli.",
    tags: [], prepTime: "15-20 min",
  },
  {
    id: 3, name: "Margherita pizza", price: 280, emoji: "🍕", tint: "#FCEFCB", categoryId: 2,
    description: "Wood-fired crust, San Marzano tomato sauce, fresh mozzarella, and basil picked the same day.",
    tags: ["vegetarian", "bestseller"], prepTime: "20-25 min", isFeatured: true,
  },
  {
    id: 4, name: "Spicy pepperoni pizza", price: 320, emoji: "🌶️", tint: "#F9DDD5", categoryId: 2,
    description: "Crisp pepperoni cups, chili honey drizzle, and a blanket of mozzarella.",
    tags: ["spicy"], prepTime: "20-25 min",
  },
  {
    id: 5, name: "Tonkotsu ramen", price: 260, emoji: "🍜", tint: "#F6EAD3", categoryId: 3,
    description: "Creamy pork bone broth simmered for 12 hours, chashu slices, soft egg, and springy noodles.",
    tags: ["bestseller"], prepTime: "15-20 min", isFeatured: true,
  },
  {
    id: 6, name: "Miso veggie ramen", price: 240, emoji: "🥬", tint: "#DCEBDD", categoryId: 3,
    description: "Savory miso broth with corn, bok choy, tofu, and toasted sesame.",
    tags: ["vegetarian"], prepTime: "15 min",
  },
  {
    id: 7, name: "Mango cream cake", price: 150, emoji: "🥭", tint: "#FCEFCB", categoryId: 4,
    description: "Light sponge layered with whipped cream and fresh Cebu mangoes.",
    tags: ["vegetarian", "bestseller"], prepTime: "5 min", isFeatured: true,
  },
  {
    id: 8, name: "Molten choco lava", price: 175, emoji: "🍫", tint: "#EADBD2", categoryId: 4,
    description: "Warm chocolate cake with a gooey center, served with a scoop of vanilla ice cream.",
    tags: ["vegetarian"], prepTime: "10 min",
  },
  {
    id: 9, name: "Halo-halo cup", price: 130, emoji: "🍧", tint: "#F3DDEB", categoryId: 4,
    description: "Shaved ice, sweet beans, leche flan, ube, and evaporated milk in a tall cup.",
    tags: ["vegetarian"], prepTime: "5 min",
  },
  {
    id: 10, name: "Brown sugar milk tea", price: 120, emoji: "🧋", tint: "#EFE3CF", categoryId: 5,
    description: "Fresh milk, caramelized brown sugar syrup, and chewy tapioca pearls.",
    tags: ["vegetarian", "bestseller"], prepTime: "5 min",
  },
  {
    id: 11, name: "Mango shake", price: 110, emoji: "🥤", tint: "#FCEFCB", categoryId: 5,
    description: "Ripe mangoes blended with ice and a splash of milk. No added syrup.",
    tags: ["vegetarian"], prepTime: "5 min",
  },
  {
    id: 12, name: "Calamansi iced tea", price: 95, emoji: "🍋", tint: "#E5F0D2", categoryId: 5,
    description: "Black tea shaken with calamansi juice and a touch of honey.",
    tags: ["vegetarian"], prepTime: "3 min",
  },
];

export const menuItems = raw.map((item) => new MenuItem(item));

export const TAG_FILTERS = ["vegetarian", "spicy", "bestseller"];
