import { Link, NavLink } from "react-router-dom";
import { ICONS } from "./Icons.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { content } from "../data/content.js";

function Badge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-chili px-1 text-xs font-bold text-white">
      {count}
    </span>
  );
}

export default function Navbar() {
  const { cart, favorites } = useStore();
  const counts = { cart: cart.getItemCount(), heart: favorites.count };
  const ariaFor = {
    cart: content.nav.cartAria(counts.cart),
    heart: content.nav.favoritesAria(counts.heart),
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-cream-line bg-cream/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link
            to="/"
            aria-label={content.a11y.goHome}
            className="flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-chili"
          >
            <span className="text-2xl" aria-hidden="true">{content.brand.logo}</span>
            <span className="font-display text-xl font-black text-basil">{content.brand.name}</span>
          </Link>

          <nav aria-label={content.a11y.mainNav} className="hidden items-center gap-1 md:flex">
            {content.nav.links.map(({ to, label, icon, end }) => {
              const Icon = ICONS[icon];
              return (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  aria-label={ariaFor[icon]}
                  className={({ isActive }) =>
                    `relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-chili ${
                      isActive ? "bg-basil text-white" : "text-ink hover:bg-cream-deep"
                    }`
                  }
                >
                  <span className="relative">
                    <Icon className="h-5 w-5" />
                    {(icon === "cart" || icon === "heart") && <Badge count={counts[icon]} />}
                  </span>
                  {label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>

      <nav
        aria-label={content.a11y.mobileNav}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-cream-line bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <ul className="mx-auto flex max-w-md items-stretch justify-around">
          {content.nav.links.map(({ to, label, icon, end }) => {
            const Icon = ICONS[icon];
            return (
              <li key={to} className="flex-1">
                <NavLink
                  to={to}
                  end={end}
                  aria-label={ariaFor[icon]}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 py-2.5 text-xs font-medium ${
                      isActive ? "text-chili" : "text-ink-soft"
                    }`
                  }
                >
                  <span className="relative">
                    <Icon className="h-6 w-6" />
                    {(icon === "cart" || icon === "heart") && <Badge count={counts[icon]} />}
                  </span>
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
