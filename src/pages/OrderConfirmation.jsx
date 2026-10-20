import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import { CheckIcon } from "../components/Icons.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { content } from "../data/content.js";
import { formatDate, formatPrice } from "../utils/format.js";

// Simulated progress: the tracker advances on its own so the page feels alive.
const STEP_DELAYS_MS = [2500, 9000];

export default function OrderConfirmation() {
  const t = content.confirmation;
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrder, addToCart } = useStore();
  const order = getOrder(id);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = STEP_DELAYS_MS.map((delay, index) =>
      window.setTimeout(() => setStep(index + 1), delay)
    );
    return () => timers.forEach(window.clearTimeout);
  }, [id]);

  if (!order) {
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

  const payment = content.checkout.paymentMethods.find((m) => m.id === order.paymentMethod);

  const orderAgain = () => {
    order.items.forEach((item) => addToCart(item.menuItem, item.quantity));
    navigate("/cart");
  };

  return (
    <div className="mx-auto max-w-2xl pt-10">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-basil-soft text-4xl" aria-hidden="true">
          {t.emoji}
        </div>
        <h1 className="mt-4 font-display text-4xl font-black text-ink">{t.title}</h1>
        <p className="mt-2 text-ink-soft">{t.subtitle(order.customerName)}</p>
      </div>

      <section className="mt-8 rounded-2xl border border-cream-line bg-white p-6">
        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-ink-soft">{t.orderNumber}</dt>
            <dd className="font-bold">{order.id}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-soft">{t.placedOn}</dt>
            <dd className="font-bold">{formatDate(order.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-soft">{t.etaLabel}</dt>
            <dd className="font-bold">{t.etaValue}</dd>
          </div>
        </dl>

        <h2 className="mt-8 font-display text-lg font-bold">{t.trackerTitle}</h2>
        <ol className="mt-4 grid grid-cols-4 gap-2">
          {t.steps.map((label, index) => {
            const done = index <= step;
            return (
              <li key={label} className="flex flex-col items-center gap-2 text-center">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    done ? "bg-basil text-white" : "bg-cream-deep text-ink-soft"
                  }`}
                >
                  {done ? <CheckIcon className="h-5 w-5" /> : index + 1}
                </span>
                <span className={`text-xs sm:text-sm ${done ? "font-medium text-ink" : "text-ink-soft"}`}>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-cream-line bg-white p-6">
          <h2 className="font-display text-lg font-bold">{t.deliveringTo}</h2>
          <p className="mt-2 font-medium">{order.customerName}</p>
          <p className="text-ink-soft">{order.address}</p>
          <p className="text-ink-soft">{order.phone}</p>
          {order.notes && (
            <p className="mt-3 text-sm text-ink-soft">
              <span className="font-medium text-ink">{t.notesLabel}: </span>
              {order.notes}
            </p>
          )}
          <h3 className="mt-4 text-sm text-ink-soft">{t.paymentLabel}</h3>
          <p className="font-medium">{payment?.label}</p>
        </div>

        <div className="rounded-2xl border border-cream-line bg-white p-6">
          <h2 className="font-display text-lg font-bold">{t.itemsTitle}</h2>
          <ul className="mt-2 divide-y divide-cream-line">
            {order.items.map((item) => (
              <li key={item.menuItem.id} className="flex justify-between gap-3 py-2 text-sm">
                <span>
                  {item.quantity} x {item.menuItem.name}
                </span>
                <span className="font-medium">{formatPrice(item.getSubtotal())}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-cream-line pt-3 text-lg font-bold">
            <span>{content.cart.total}</span>
            <span className="text-chili">{formatPrice(order.getTotal())}</span>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={orderAgain}
          className="rounded-full bg-chili px-7 py-3 font-bold text-white transition hover:bg-chili-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chili"
        >
          {t.orderAgain}
        </button>
        <Link
          to="/"
          className="rounded-full border border-cream-line bg-white px-7 py-3 font-bold text-ink transition hover:border-chili hover:text-chili"
        >
          {t.backHome}
        </Link>
      </div>
    </div>
  );
}
