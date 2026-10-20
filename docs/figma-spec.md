# Figma spec: Basil Bites

Frame size: 390 x 844 (mobile) and 1440 x 900 (desktop). Use auto layout everywhere.

## Styles
Colors: Cream #FFF8EE, Cream deep #F6EAD3, Line #EADFCC, Chili #D64933, Chili dark #B83A27,
Basil #2F5D3A, Basil soft #DCEBDD, Mango #F4B942, Ink #2B2622, Ink soft #6F645A, White #FFFFFF.
Fonts: Fraunces (Bold/Black) for headings, DM Sans (Regular/Medium/Bold) for body.
Type scale: 12 / 14 / 16 / 18 / 24 / 30 / 36 / 60. Radii: 12 (inputs), 16 (cards), 24 to 32 (hero), 999 (buttons, chips).

## Components to build first
Button (primary chili, secondary white with line border, success basil), Chip (default / selected),
Menu card, Quantity stepper, Rating, Heart button (off / on), Review card, Input, Toast, Navbar, Bottom tab bar.

## Pages (one frame each, mobile + desktop)
1. Home: hero (chili block, tilted dish tiles, mango sticker), category tiles, most ordered, perks.
2. Menu: search, category chips, tag chips, sort, grid of cards (1 / 2 / 3 columns), empty state.
3. Item details: large image, name, rating, tags, price, stepper, add to cart, reviews, review form, related.
4. Favorites: list rows with thumb, rating, price, add to cart, heart. Empty state.
5. Cart: item rows with stepper and remove, summary card with free delivery progress bar.
6. Checkout: delivery form, payment radio cards, summary card, error states.
7. Order confirmation: success header, details card, 4-step tracker, delivery and items cards.
Add a prototype link from each button to its page so reviewers can click through.
