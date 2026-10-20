import { content } from "../data/content.js";
import { ALL_CATEGORY_ID } from "../data/categories.js";

export default function CategoryChips({ categories, activeId, onChange }) {
  const options = [
    { id: ALL_CATEGORY_ID, name: content.menu.allLabel, icon: "🍽️" },
    ...categories,
  ];
  return (
    <div
      role="group"
      aria-label={content.menu.categoryLabel}
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      {options.map((option) => {
        const active = option.id === activeId;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={active}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chili ${
              active
                ? "border-chili bg-chili text-white"
                : "border-cream-line bg-white text-ink hover:border-chili/60"
            }`}
          >
            <span aria-hidden="true">{option.icon}</span>
            {option.name}
          </button>
        );
      })}
    </div>
  );
}
