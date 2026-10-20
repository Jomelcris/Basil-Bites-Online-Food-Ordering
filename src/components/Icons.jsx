// Small inline SVG icon set (no icon library needed).
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const HeartIcon = ({ filled = false, ...props }) => (
  <svg {...base} {...props} fill={filled ? "currentColor" : "none"}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

export const CartIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
  </svg>
);

export const SearchIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const StarIcon = ({ filled = true, ...props }) => (
  <svg {...base} {...props} fill={filled ? "currentColor" : "none"}>
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
  </svg>
);

export const PlusIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14" />
  </svg>
);

export const HomeIcon = (props) => (
  <svg {...base} {...props}>
    <path d="m3 11 9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
);

export const MenuBookIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10" />
    <path d="M17 3c-2 2-3 4.500-3 7 0 1.500 1 2.500 3 2.500V21" />
  </svg>
);

export const TrashIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
);

export const ChevronLeftIcon = (props) => (
  <svg {...base} {...props}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const CheckIcon = (props) => (
  <svg {...base} {...props}>
    <path d="m5 12.500 4.500 4.500L19 7.500" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ICONS = {
  home: HomeIcon,
  menu: MenuBookIcon,
  heart: HeartIcon,
  cart: CartIcon,
};
