import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategoryChips from "../components/CategoryChips.jsx";
import MenuCard from "../components/MenuCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { menuItems, TAG_FILTERS } from "../data/menuItems.js";
import { categories, ALL_CATEGORY_ID } from "../data/categories.js";
import { content } from "../data/content.js";

const DEFAULT_SORT = content.menu.sortOptions[0].value;

export default function Menu() {
  const t = content.menu;
  const { favorites, getRating, getReviewCount } = useStore();
  const [params, setParams] = useSearchParams();

  const query = params.get("q") ?? "";
  const categoryId = Number(params.get("cat") ?? ALL_CATEGORY_ID);
  const sort = params.get("sort") ?? DEFAULT_SORT;
  const activeTags = params.getAll("tag");
  const savedOnly = params.get("saved") === "1";

  const update = (changes) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => {
      next.delete(key);
      const values = Array.isArray(value) ? value : [value];
      values.forEach((v) => {
        if (v !== "" && v !== null && v !== false && v !== ALL_CATEGORY_ID && v !== DEFAULT_SORT) {
          next.append(key, v === true ? "1" : String(v));
        }
      });
    });
    setParams(next, { replace: true });
  };

  const toggleTag = (tag) =>
    update({
      tag: activeTags.includes(tag)
        ? activeTags.filter((x) => x !== tag)
        : [...activeTags, tag],
    });

  const results = useMemo(() => {
    const filtered = menuItems.filter(
      (item) =>
        item.matches(query) &&
        (categoryId === ALL_CATEGORY_ID || item.categoryId === categoryId) &&
        activeTags.every((tag) => item.hasTag(tag)) &&
        (!savedOnly || favorites.has(item.id))
    );
    const sorters = {
      rating: (a, b) =>
        getRating(b) - getRating(a) ||
        getReviewCount(b) - getReviewCount(a) ||
        a.name.localeCompare(b.name),
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name),
    };
    return [...filtered].sort(sorters[sort] ?? sorters.rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, categoryId, sort, activeTags.join(","), savedOnly, favorites, getRating, getReviewCount]);

  const hasFilters =
    query || categoryId !== ALL_CATEGORY_ID || activeTags.length > 0 || savedOnly;

  const chip = (active) =>
    `rounded-full border px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basil ${
      active
        ? "border-basil bg-basil text-white"
        : "border-cream-line bg-white text-ink hover:border-basil/60"
    }`;

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />

      <div className="space-y-4">
        <SearchBar value={query} onChange={(value) => update({ q: value })} />
        <CategoryChips
          categories={categories}
          activeId={categoryId}
          onChange={(id) => update({ cat: id })}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label={t.tagLabel} className="flex flex-wrap gap-2">
            {TAG_FILTERS.map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed={activeTags.includes(tag)}
                onClick={() => toggleTag(tag)}
                className={chip(activeTags.includes(tag))}
              >
                {t.tags[tag]}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={savedOnly}
              onClick={() => update({ saved: !savedOnly })}
              className={chip(savedOnly)}
            >
              {t.savedOnly}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="menu-sort" className="text-sm text-ink-soft">{t.sortLabel}</label>
            <select
              id="menu-sort"
              value={sort}
              onChange={(event) => update({ sort: event.target.value })}
              className="rounded-full border border-cream-line bg-white px-4 py-2 text-sm font-medium focus:border-chili focus:outline-none focus:ring-2 focus:ring-chili/30"
            >
              {t.sortOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft" aria-live="polite">
        {t.resultCount(results.length)}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          emoji={t.emptyEmoji}
          title={t.emptyTitle}
          body={t.emptyBody}
          ctaLabel={hasFilters ? t.clearFilters : undefined}
          onCta={hasFilters ? () => setParams({}, { replace: true }) : undefined}
        />
      )}
    </>
  );
}
