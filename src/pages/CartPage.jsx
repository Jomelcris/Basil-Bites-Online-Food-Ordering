import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import FoodImage from "../components/FoodImage.jsx";
import QuantityStepper from "../components/QuantityStepper.jsx";
import { TrashIcon } from "../components/Icons.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { CONFIG } from "../data/config.js";
import { content } from "../data/content.js";
import { formatPrice } from "../utils/format.js";

export default function CartPage() {
  const t = content.cart;
  const navigate = useNavigate();
  const { cart, setQuantity, removeFromCart, clearCart } = useStore();

  if (cart.isEmpty()) {
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

  const subtotal = cart.getSubtotal();
  const deliveryFee = cart.getDeliveryFee(CONFIG.delivery);
  const remaining = CONFIG.delivery.freeAbove - subtotal;
  const progress = Math.min(100, Math.round((subtotal / CONFIG.delivery.freeAbove) * 100));

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle(cart.getItemCount())}>
        <button
          type="button"
          onClick={clearCart}
          className="rounded-full border border-cream-line bg-white px-5 py-2.5 text-sm font-medium transition hover:border-chili hover:text-chili"
        >
          {t.clear}
        </button>
      </PageHeader>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <ul className="space-y-3">
          {cart.items.map(({ menuItem, quantity }, index) => (
            <li
              key={menuItem.id}
              className="flex items-center gap-4 rounded-2xl border border-cream-line bg-white p-3 pr-4"
            >
              <Link to={`/menu/${menuItem.id}`} tabIndex={-1} aria-hidden="true">
                <FoodImage item={menuItem} emojiClass="text-4xl" className="h-20 w-20 shrink-0 rounded-xl" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link to={`/menu/${menuItem.id}`} className="font-display text-lg font-bold text-ink hover:text-chili">
                  {menuItem.name}
                </Link>
                <p className="text-sm text-ink-soft">{t.eachPrice(menuItem.price)}</p>
                <div className="mt-2">
                  <QuantityStepper
                    compact
                    value={quantity}
                    onChange={(next) => setQuantity(menuItem.id, next)}
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-ink">{formatPrice(cart.items[index].getSubtotal())}</span>
                <button
                  type="button"
                  onClick={() => removeFromCart(menuItem.id)}
                  aria-label={t.removeAria(menuItem.name)}
                  className="flex items-center gap-1 rounded-full px-2 py-1 text-sm text-ink-soft transition hover:bg-chili-soft hover:text-chili-dark"
                >
                  <TrashIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.remove}</span>
                </button>
              </div>
            </li>
          ))}
          <li>
            <Link to="/menu" className="inline-block pt-2 font-medium text-basil underline underline-offset-4">
              {t.continueShopping}
            </Link>
          </li>
        </ul>

        <aside className="h-fit rounded-2xl border border-cream-line bg-white p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold">{t.summaryTitle}</h2>

          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-cream-deep">
              <div
                className="h-full rounded-full bg-basil transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              {remaining > 0 ? t.freeHint(remaining) : t.freeUnlocked}
            </p>
          </div>

          <dl className="mt-5 space-y-2 text-ink">
            <div className="flex justify-between">
              <dt className="text-ink-soft">{t.subtotal}</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">{t.delivery}</dt>
              <dd>{deliveryFee === 0 ? t.free : formatPrice(deliveryFee)}</dd>
            </div>
            <div className="flex justify-between border-t border-cream-line pt-3 text-lg font-bold">
              <dt>{t.total}</dt>
              <dd className="text-chili">{formatPrice(cart.getTotal(CONFIG.delivery))}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full rounded-full bg-chili px-6 py-3.5 font-bold text-white transition hover:bg-chili-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chili"
          >
            {t.checkout}
          </button>
        </aside>
      </div>
    </>
  );
}
