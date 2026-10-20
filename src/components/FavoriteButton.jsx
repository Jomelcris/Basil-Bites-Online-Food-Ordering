import { HeartIcon } from "./Icons.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { content } from "../data/content.js";

export default function FavoriteButton({ item, className = "" }) {
  const { favorites, toggleFavorite } = useStore();
  const saved = favorites.has(item.id);
  const label = saved
    ? content.card.favoriteRemove(item.name)
    : content.card.favoriteAdd(item.name);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(item);
      }}
      aria-label={label}
      aria-pressed={saved}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chili ${
        saved ? "text-chili" : "text-ink-soft hover:text-chili"
      } ${className}`}
    >
      <HeartIcon filled={saved} className="h-5 w-5" />
    </button>
  );
}
