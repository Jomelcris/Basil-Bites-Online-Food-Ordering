import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import FoodImage from "../components/FoodImage.jsx";
import FavoriteButton from "../components/FavoriteButton.jsx";
import RatingStars from "../components/RatingStars.jsx";
import { PlusIcon } from "../components/Icons.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { menuItems } from "../data/menuItems.js";
import { content } from "../data/content.js";
import { formatPrice } from "../utils/format.js";

export default function Favorites() {
  const t = content.favorites;
  const { favorites, addToCart, addFavoritesToCart, clearFavorites, getRating, getReviewCount } = useStore();
  const saved = favorites.itemIds
    .map((id) => menuItems.find((item) => item.id === id))
    .filter(Boolean);

  if (saved.length === 0) {
    return (
      <>
        <PageHeader title={t.title} />
        <EmptyState
          emoji={t.emptyEmoji}
          title={t.emptyTitle}
          body={t.emptyBody}
          ctaLabel={t.emptyCta}
          ctaTo="/menu"
        />
      </>
    );
  }

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle(saved.length)}>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={addFavoritesToCart}
            className="rounded-full bg-basil px-5 py-2.5 font-bold text-white transition hover:bg-basil-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basil"
          >
            {t.addAll}
          </button>
          <button
            type="button"
            onClick={clearFavorites}
            className="rounded-full border border-cream-line bg-white px-5 py-2.5 font-medium text-ink transition hover:border-chili hover:text-chili"
          >
            {t.clearAll}
          </button>
        </div>
      </PageHeader>

      <ul className="space-y-3">
        {saved.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded-2xl border border-cream-line bg-white p-3 pr-4"
          >
            <Link to={`/menu/${item.id}`} tabIndex={-1} aria-hidden="true">
              <FoodImage item={item} emojiClass="text-4xl" className="h-20 w-20 shrink-0 rounded-xl" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                to={`/menu/${item.id}`}
                className="font-display text-lg font-bold text-ink hover:text-chili"
              >
                {item.name}
              </Link>
              <div className="mt-0.5">
                <RatingStars rating={getRating(item)} count={getReviewCount(item)} />
              </div>
              <p className="mt-1 font-bold text-chili">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => addToCart(item)}
                className="inline-flex items-center gap-1.5 rounded-full bg-chili px-4 py-2 text-sm font-bold text-white transition hover:bg-chili-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chili"
              >
                <PlusIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{content.card.addToCart}</span>
                <span className="sr-only sm:hidden">{content.card.addToCart}</span>
              </button>
              <FavoriteButton item={item} className="border border-cream-line" />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
