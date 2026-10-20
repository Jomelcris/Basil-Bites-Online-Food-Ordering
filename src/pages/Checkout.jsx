import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { ChevronLeftIcon } from "../components/Icons.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { CONFIG } from "../data/config.js";
import { content } from "../data/content.js";
import { formatPrice } from "../utils/format.js";
import { validateCheckout } from "../utils/validators.js";

const INITIAL = { customerName: "", phone: "", address: "", notes: "", paymentMethod: "cod" };

export default function Checkout() {
  const t = content.checkout;
  const navigate = useNavigate();
  const { cart, placeOrder } = useStore();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});

  if (cart.isEmpty()) {
    return (
      <EmptyState
        emoji={t.emptyEmoji}
        title={t.emptyTitle}
        body={t.emptyBody}
        ctaLabel={t.emptyCta}
        ctaTo="/menu"
      />
    );
  }

  const update = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateCheckout(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstInvalid = t.fields.find((f) => found[f.name]);
      if (firstInvalid) document.getElementById(`field-${firstInvalid.name}`)?.focus();
      return;
    }
    const order = placeOrder(values);
    navigate(`/order/${order.id}`);
  };

  const inputClass = (name) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-chili/30 ${
      errors[name] ? "border-chili" : "border-cream-line focus:border-chili"
    }`;

  return (
    <>
      <Link
        to="/cart"
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink-soft hover:text-chili sm:mt-8"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        {t.backToCart}
      </Link>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <section className="space-y-4 rounded-2xl border border-cream-line bg-white p-6">
            <h2 className="font-display text-xl font-bold">{t.contactTitle}</h2>
            {t.fields.map((field) => {
              const id = `field-${field.name}`;
              const Tag = field.type === "textarea" ? "textarea" : "input";
              return (
                <div key={field.name}>
                  <label htmlFor={id} className="mb-1 block text-sm font-medium">
                    {field.label}
                  </label>
                  <Tag
                    id={id}
                    name={field.name}
                    type={field.type === "textarea" ? undefined : field.type}
                    rows={field.type === "textarea" ? 3 : undefined}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={(event) => update(field.name, event.target.value)}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={errors[field.name] ? `${id}-error` : undefined}
                    className={inputClass(field.name)}
                  />
                  {errors[field.name] && (
                    <p id={`${id}-error`} className="mt-1 text-sm text-chili-dark">
                      {t.errors[field.name]}
                    </p>
                  )}
                </div>
              );
            })}
          </section>

          <fieldset className="rounded-2xl border border-cream-line bg-white p-6">
            <legend className="px-2 font-display text-xl font-bold">{t.paymentTitle}</legend>
            <div className="mt-2 space-y-3">
              {t.paymentMethods.map((method) => {
                const selected = values.paymentMethod === method.id;
                return (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                      selected ? "border-basil bg-basil-soft" : "border-cream-line hover:border-basil/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selected}
                      onChange={() => update("paymentMethod", method.id)}
                      className="mt-1 h-4 w-4 accent-basil"
                    />
                    <span>
                      <span className="block font-medium">{method.label}</span>
                      <span className="block text-sm text-ink-soft">{method.hint}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.paymentMethod && (
              <p className="mt-2 text-sm text-chili-dark">{t.errors.paymentMethod}</p>
            )}
          </fieldset>
        </div>

        <aside className="h-fit rounded-2xl border border-cream-line bg-white p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold">{t.summaryTitle}</h2>
          <ul className="mt-4 divide-y divide-cream-line">
            {cart.items.map((item) => (
              <li key={item.menuItem.id} className="flex justify-between gap-3 py-2.5 text-sm">
                <span>
                  {item.quantity} x {item.menuItem.name}
                </span>
                <span className="font-medium">{formatPrice(item.getSubtotal())}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2">
            <div className="flex justify-between text-ink-soft">
              <dt>{content.cart.subtotal}</dt>
              <dd>{formatPrice(cart.getSubtotal())}</dd>
            </div>
            <div className="flex justify-between text-ink-soft">
              <dt>{content.cart.delivery}</dt>
              <dd>
                {cart.getDeliveryFee(CONFIG.delivery) === 0
                  ? content.cart.free
                  : formatPrice(cart.getDeliveryFee(CONFIG.delivery))}
              </dd>
            </div>
            <div className="flex justify-between border-t border-cream-line pt-3 text-lg font-bold">
              <dt>{content.cart.total}</dt>
              <dd className="text-chili">{formatPrice(cart.getTotal(CONFIG.delivery))}</dd>
            </div>
          </dl>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-chili px-6 py-3.5 font-bold text-white transition hover:bg-chili-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chili"
          >
            {t.placeOrder}
          </button>
        </aside>
      </form>
    </>
  );
}
