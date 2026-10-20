import { content } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-cream-line bg-cream-deep pb-28 pt-10 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-xl font-black text-basil">
            <span aria-hidden="true">{content.brand.logo} </span>
            {content.brand.name}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{content.brand.tagline}</p>
        </div>
        <div className="text-sm text-ink-soft">
          <p>{content.footer.hours}</p>
          <p>{content.footer.area}</p>
        </div>
        <p className="max-w-xs text-sm text-ink-soft">{content.footer.note}</p>
      </div>
    </footer>
  );
}
