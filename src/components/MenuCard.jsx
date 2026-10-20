import { Link } from "react-router-dom";
import FoodImage from "./FoodImage.jsx";
import FavoriteButton from "./FavoriteButton.jsx";
import RatingStars from "./RatingStars.jsx";
import { PlusIcon } from "./Icons.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { content } from "../data/content.js";
import { formatPrice } from "../utils/format.js";

export default function MenuCard({ item }) {
  const { addToCart, cart, getRating, getReviewCount } = useStore();
  const inCart = cart.getQuantity(item.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-cream-line bg-white shadow-plate transition-colors hover:border-chili/50">
      <div className="relative">
        <Link to={`/menu/${item.id}`} aria-label={item.name} tabIndex={-1}>
          <FoodImage item={item} className="h-40 w-full" />
        </Link>
        <FavoriteButton item={item} className="absolute right-3 top-3" />
        {item.hasTag("bestseller") && (
          <span className="absolute left-3 top-3 rounded-full bg-mango px-2.5 py-1 text-xs font-bold text-ink">
            {content.menu.tags.bestseller}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold leading-snug text-ink">
            <Link to={`/menu/${item.id}`} className="hover:text-chili focus-visible:outline focus-visible:outline-2 focus-visible:outline-chili">
              {item.name}
            </Link>
          </h3>
          <span className="font-bold text-chili">{formatPrice(item.price)}</span>
        </div>

        <RatingStars rating={getRating(item)} count={getReviewCount(item)} />

        <p className="line-clamp-2 text-sm text-ink-soft">{item.description}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          {inCart > 0 ? (
            <span className="text-sm font-medium text-basil">{content.card.inCart(inCart)}</span>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={() => addToCart(item)}
            className="inline-flex items-center gap-1.5 rounded-full bg-chili px-4 py-2 text-sm font-bold text-white transition hover:bg-chili-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chili"
          >
            <PlusIcon className="h-4 w-4" />
            {content.card.addToCart}
          </button>
        </div>
      </div>
    </article>
  );
}
