import { Link } from "react-router-dom";

export default function EmptyState({ emoji, title, body, ctaLabel, ctaTo, onCta }) {
  const buttonClass =
    "inline-flex rounded-full bg-chili px-6 py-3 font-bold text-white transition hover:bg-chili-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chili";
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-mango-soft text-5xl" aria-hidden="true">
        {emoji}
      </div>
      <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
      <p className="text-ink-soft">{body}</p>
      {ctaTo && (
        <Link to={ctaTo} className={`${buttonClass} mt-3`}>
          {ctaLabel}
        </Link>
      )}
      {onCta && (
        <button type="button" onClick={onCta} className={`${buttonClass} mt-3`}>
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
