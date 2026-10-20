import { Link } from "react-router-dom";
import FoodImage from "../components/FoodImage.jsx";
import MenuCard from "../components/MenuCard.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { menuItems } from "../data/menuItems.js";
import { categories } from "../data/categories.js";
import { content } from "../data/content.js";

const featured = menuItems.filter((item) => item.isFeatured);
const tilePositions = [
  "left-0 top-6 -rotate-6 h-44 w-44 sm:h-52 sm:w-52",
  "right-2 top-0 rotate-3 h-40 w-40 sm:h-48 sm:w-48",
  "left-24 bottom-0 rotate-[8deg] h-44 w-44 sm:left-32 sm:h-52 sm:w-52",
];

export default function Home() {
  const t = content.home;
  useStore(); // keeps cards in sync with cart and favorites

  return (
    <>
      <section className="mt-6 overflow-hidden rounded-[2rem] bg-chili text-white sm:mt-10">
        <div className="grid items-center gap-8 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="font-display text-4xl font-black leading-[1.05] sm:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/90">{t.heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="rounded-full bg-mango px-7 py-3.5 font-bold text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.heroCta}
              </Link>
              <Link
                to="/favorites"
                className="rounded-full border-2 border-white/70 px-7 py-3 font-bold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.heroSecondaryCta}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-72 w-full max-w-sm sm:h-80" aria-hidden="true">
            {featured.slice(0, 3).map((item, index) => (
              <FoodImage
                key={item.id}
                item={item}
                emojiClass="text-7xl sm:text-8xl"
                className={`absolute rounded-3xl border-4 border-cream shadow-xl ${tilePositions[index]}`}
              />
            ))}
            <div className="absolute -right-1 bottom-2 flex h-28 w-28 rotate-12 flex-col items-center justify-center rounded-full bg-mango text-center text-ink shadow-lg sm:h-32 sm:w-32">
              <span className="font-display text-base font-black leading-tight">{t.sticker.top}</span>
              <span className="text-sm font-medium leading-tight">{t.sticker.bottom}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-14">
        <h2 className="font-display text-2xl font-black text-ink sm:text-3xl">{t.categoriesTitle}</h2>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/menu?cat=${category.id}`}
                className="flex items-center gap-3 rounded-2xl border border-cream-line bg-white p-4 font-medium transition-colors hover:border-chili focus-visible:outline focus-visible:outline-2 focus-visible:outline-chili"
              >
                <span className="text-3xl" aria-hidden="true">{category.icon}</span>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-black text-ink sm:text-3xl">{t.featuredTitle}</h2>
            <p className="mt-1 text-ink-soft">{t.featuredBody}</p>
          </div>
          <Link to="/menu" className="font-bold text-chili underline-offset-4 hover:underline">
            {t.featuredCta}
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="pt-14">
        <ul className="grid gap-4 sm:grid-cols-3">
          {t.perks.map((perk) => (
            <li key={perk.title} className="rounded-2xl bg-basil-soft p-6">
              <span className="text-3xl" aria-hidden="true">{perk.icon}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-basil">{perk.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{perk.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
