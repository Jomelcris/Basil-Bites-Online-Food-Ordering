# Basil Bites: online food ordering app

Midterm Practical Exam project (Theme: Food & Dining). Built with React 18, React Router, and Tailwind CSS only.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## What it does
- Multi-page routing: `/`, `/menu`, `/menu/:id`, `/favorites`, `/cart`, `/checkout`, `/order/:id`, and a 404 page.
- Menu with live search, category chips, tag filters (vegetarian, spicy, bestseller), "saved only", and sorting. Filters live in the URL, so a filtered menu can be shared or refreshed.
- Favorites (heart button), saved between visits.
- Cart with quantity controls, free-delivery progress, and totals. Saved between visits.
- Item details with average rating, reviews, and a review form with validation. New reviews update the rating.
- Checkout form with validation and payment choice, then an order confirmation page with a progress tracker.
- Responsive: bottom tab bar on mobile, top navigation on desktop. Keyboard focus styles, skip link, ARIA labels.

## Rubric map

| Requirement | Where |
| --- | --- |
| Class diagram and OOP models | `docs/class-diagram.mmd` and `src/models/*` |
| No hardcoded text in components | All wording is in `src/data/content.js`. Data is in `src/data/*` and built from the model classes |
| React Router | `src/App.jsx`, `src/pages/*` |
| State management | `src/context/StoreContext.jsx` (Context + useReducer) |
| Dynamic filtering | `src/pages/Menu.jsx` |
| Tailwind only | `tailwind.config.js`, class names in components, `src/index.css` only loads Tailwind and base styles |
| Figma | See `docs/figma-spec.md` for the frames, styles, and components |

## Project structure

```
src/
  models/      Category, MenuItem, Review, CartItem, Cart, Order, FavoritesList
  data/        categories, menuItems, reviews (instances of the models), content (all UI text), config
  context/     StoreContext (cart, favorites, reviews, orders, toast)
  components/  Navbar, MenuCard, FoodImage, QuantityStepper, ReviewForm, Toast, ...
  pages/       Home, Menu, ItemDetails, Favorites, CartPage, Checkout, OrderConfirmation, NotFound
  utils/       format, storage, validators
```

## Customizing
- Change prices, delivery fee, or free-delivery threshold in `src/data/config.js`.
- Add a dish in `src/data/menuItems.js`. Set `image` to a URL or a file in `/public` to show a photo instead of the emoji tile.
- Change any wording in `src/data/content.js`.
- Colors and fonts are in `tailwind.config.js` and `index.html`.

## Deploying
The app uses `BrowserRouter`. Hosts like Vercel and Netlify handle this with a rewrite to `index.html`. For GitHub Pages, switch to `HashRouter` in `src/main.jsx`.
