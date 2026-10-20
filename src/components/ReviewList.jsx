import { StarIcon } from "./Icons.jsx";
import { content } from "../data/content.js";
import { formatDate } from "../utils/format.js";

export default function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return <p className="text-ink-soft">{content.details.noReviews}</p>;
  }
  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li key={review.id} className="rounded-2xl border border-cream-line bg-white p-4">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full bg-basil-soft text-sm font-bold text-basil"
              aria-hidden="true"
            >
              {review.getInitials()}
            </span>
            <div className="flex-1">
              <p className="font-medium text-ink">{review.author}</p>
              <p className="text-xs text-ink-soft">{formatDate(review.date)}</p>
            </div>
            <span className="flex items-center gap-0.5 text-mango-dark" aria-label={content.a11y.ratingOf(review.rating)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon key={n} filled={n <= review.rating} className={`h-4 w-4 ${n <= review.rating ? "" : "text-cream-line"}`} />
              ))}
            </span>
          </div>
          <p className="mt-3 text-ink-soft">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
