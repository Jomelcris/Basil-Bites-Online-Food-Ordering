import { useState } from "react";
import { StarIcon } from "./Icons.jsx";
import { content } from "../data/content.js";
import { validateReview } from "../utils/validators.js";

const EMPTY = { author: "", rating: 5, comment: "" };
const field =
  "w-full rounded-xl border bg-white px-4 py-2.5 text-ink focus:outline-none focus:ring-2";

export default function ReviewForm({ onSubmit }) {
  const t = content.reviewForm;
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const update = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateReview(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSubmit(values);
    setValues(EMPTY);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-2xl border border-cream-line bg-white p-5">
      <h3 className="font-display text-xl font-bold">{t.title}</h3>

      <div>
        <label htmlFor="review-author" className="mb-1 block text-sm font-medium">{t.nameLabel}</label>
        <input
          id="review-author"
          type="text"
          value={values.author}
          onChange={(e) => update("author", e.target.value)}
          placeholder={t.namePlaceholder}
          aria-invalid={Boolean(errors.author)}
          aria-describedby={errors.author ? "review-author-error" : undefined}
          className={`${field} ${errors.author ? "border-chili focus:ring-chili/30" : "border-cream-line focus:border-chili focus:ring-chili/30"}`}
        />
        {errors.author && <p id="review-author-error" className="mt-1 text-sm text-chili-dark">{t.errors.author}</p>}
      </div>

      <fieldset>
        <legend className="mb-1 text-sm font-medium">{t.ratingLabel}</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => update("rating", n)}
              aria-label={t.starAria(n)}
              aria-pressed={values.rating === n}
              className="rounded-md p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-chili"
            >
              <StarIcon
                filled={n <= values.rating}
                className={`h-7 w-7 ${n <= values.rating ? "text-mango-dark" : "text-cream-line"}`}
              />
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="review-comment" className="mb-1 block text-sm font-medium">{t.commentLabel}</label>
        <textarea
          id="review-comment"
          rows={3}
          value={values.comment}
          onChange={(e) => update("comment", e.target.value)}
          placeholder={t.commentPlaceholder}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={errors.comment ? "review-comment-error" : undefined}
          className={`${field} ${errors.comment ? "border-chili focus:ring-chili/30" : "border-cream-line focus:border-chili focus:ring-chili/30"}`}
        />
        {errors.comment && <p id="review-comment-error" className="mt-1 text-sm text-chili-dark">{t.errors.comment}</p>}
      </div>

      <button
        type="submit"
        className="rounded-full bg-basil px-6 py-2.5 font-bold text-white transition hover:bg-basil-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basil"
      >
        {t.submit}
      </button>
    </form>
  );
}
