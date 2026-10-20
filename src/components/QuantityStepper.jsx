import { MinusIcon, PlusIcon } from "./Icons.jsx";
import { content } from "../data/content.js";
import { CONFIG } from "../data/config.js";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = CONFIG.maxQuantity,
  compact = false,
}) {
  const size = compact ? "h-8 w-8" : "h-10 w-10";
  const btn = `${size} flex items-center justify-center rounded-full border border-cream-line bg-white text-ink transition hover:border-chili hover:text-chili focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chili disabled:opacity-40 disabled:hover:border-cream-line disabled:hover:text-ink`;

  return (
    <div className="inline-flex items-center gap-3" role="group" aria-label={content.details.quantityLabel}>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={content.details.decrease}
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="min-w-6 text-center font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={content.details.increase}
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
