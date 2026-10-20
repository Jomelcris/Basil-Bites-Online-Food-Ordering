import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Toast from "./Toast.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import { content } from "../data/content.js";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-chili focus:px-4 focus:py-2 focus:text-white"
      >
        {content.a11y.skipToContent}
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
