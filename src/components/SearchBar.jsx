import { SearchIcon, CloseIcon } from "./Icons.jsx";
import { content } from "../data/content.js";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <label htmlFor="menu-search" className="sr-only">
        {content.menu.searchLabel}
      </label>
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
      <input
        id="menu-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={content.menu.searchPlaceholder}
        className="w-full rounded-full border border-cream-line bg-white py-3 pl-12 pr-12 text-ink placeholder:text-ink-soft/70 focus:border-chili focus:outline-none focus:ring-2 focus:ring-chili/30 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={content.menu.clearSearch}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-soft hover:bg-cream-deep"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
