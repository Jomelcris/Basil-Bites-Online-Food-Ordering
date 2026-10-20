import { StarIcon } from "./Icons.jsx";
import { content } from "../data/content.js";

export default function RatingStars({ rating, count, className = "" }) {
  if (!rating) {
    return (
      <span className={`text-sm font-medium text-basil ${className}`}>
        {content.card.noRatings}
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1 text-sm ${className}`}
      aria-label={content.a11y.ratingOf(rating)}
    >
      <StarIcon className="h-4 w-4 text-mango-dark" />
      <span className="font-medium text-ink">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-ink-soft">{content.card.reviewCount(count)}</span>
      )}
    </span>
  );
}
