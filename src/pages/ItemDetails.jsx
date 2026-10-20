import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import FoodImage from "../components/FoodImage.jsx";
import FavoriteButton from "../components/FavoriteButton.jsx";
import RatingStars from "../components/RatingStars.jsx";
import QuantityStepper from "../components/QuantityStepper.jsx";
import ReviewList from "../components/ReviewList.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import MenuCard from "../components/MenuCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { ChevronLeftIcon } from "../components/Icons.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { menuItems } from "../data/menuItems.js";
import { categories } from "../data/categories.js";
import { content } from "../data/content.js";
import { formatPrice } from "../utils/format.js";

export default function ItemDetails() {
  const t = content.details;
  const { id } = useParams();
  const { addToCart, cart, getRating, getReviewsFor, addReview } = useStore();
  const [quantity, setQuantity] = useState(1);

  const item = menuItems.find((entry) => entry.id === Number(id));

  if (!item) {
    return (
      <EmptyState
        emoji={t.notFoundEmoji}
        title={t.notFoundTitle}
        body={t.notFoundBody}
        ctaLabel={t.notFoundCta}
        ctaTo="/menu"
      />
    );
  }

  const reviews = getReviewsFor(item.id);
  const category = categories.find((c) => c.id === item.categoryId);
  const related = menuItems
    .filter((entry) => entry.categoryId === item.categoryId && entry.id !== item.id)
    .slice(0, 3);
  const inCart = cart.getQuantity(item.id);

  return (
    <article className="pt-6 sm:pt-8">
      <Link
        to="/menu"
        className="inline-flex items-center gap-1 rounded-lg text-sm font-medium text-ink-soft hover:text-chili focus-visible:outline focus-visible:outline-2 focus-visible:outline-chili"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        {t.back}
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-2">
        <div className="relative">
          <FoodImage
            item={item}
            emojiClass="text-[9rem]"
            className="aspect-square w-full rounded-3xl lg:aspect-[4/3]"
          />
          <FavoriteButton item={item} className="absolute right-4 top-4 !h-11 !w-11" />
        </div>

        <div className="flex flex-col">
          {category && (
            <p className="text-sm font-medium text-basil">
              <span aria-hidden="true">{category.icon} </span>
              {category.name}
            </p>
          )}
          <h1 className="mt-1 font-display text-4xl font-black text-ink">{item.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            <RatingStars rating={getRating(item)} count={reviews.length} />
            <span className="text-sm text-ink-soft">
              {t.prepLabel} {item.prepTime}
            </span>
          </div>

          {item.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-basil-soft px-3 py-1 text-sm font-medium text-basil">
                  {content.menu.tags[tag]}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-5 max-w-prose text-lg text-ink-soft">{item.description}</p>

          <p className="mt-6 font-display text-3xl font-black text-chili">{formatPrice(item.price)}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <button
              type="button"
              onClick={() => {
                addToCart(item, quantity);
                setQuantity(1);
              }}
              className="flex-1 rounded-full bg-chili px-6 py-3.5 font-bold text-white transition hover:bg-chili-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chili sm:flex-none sm:px-10"
            >
              {t.addToCart(item.price * quantity)}
            </button>
          </div>

          {inCart > 0 && (
            <Link to="/cart" className="mt-4 w-fit font-medium text-basil underline underline-offset-4">
              {content.card.inCart(inCart)}. {t.goToCart}
            </Link>
          )}
        </div>
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]" aria-labelledby="reviews-title">
        <div>
          <h2 id="reviews-title" className="mb-5 font-display text-2xl font-black text-ink">
            {t.reviewsTitle}
            <span className="ml-3 text-base font-medium text-ink-soft">{t.reviewsCount(reviews.length)}</span>
          </h2>
          <ReviewList reviews={reviews} />
        </div>
        <div className="lg:pt-12">
          <ReviewForm onSubmit={(values) => addReview({ menuItemId: item.id, ...values })} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 font-display text-2xl font-black text-ink">{t.relatedTitle}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) => (
              <MenuCard key={entry.id} item={entry} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
