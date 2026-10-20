export default function PageHeader({ title, subtitle, children }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 pb-6 pt-8 sm:pt-12">
      <div>
        <h1 className="font-display text-3xl font-black text-ink sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-xl text-ink-soft">{subtitle}</p>}
      </div>
      {children}
    </header>
  );
}
