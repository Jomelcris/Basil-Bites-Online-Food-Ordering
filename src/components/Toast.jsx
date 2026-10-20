import { useStore } from "../context/StoreContext.jsx";
import { CheckIcon, CloseIcon } from "./Icons.jsx";
import { content } from "../data/content.js";

export default function Toast() {
  const { toast, dismissToast } = useStore();
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 md:bottom-8"
      role="status"
      aria-live="polite"
    >
      {toast && (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 rounded-full bg-ink py-2.5 pl-3 pr-2 text-sm font-medium text-cream shadow-lg"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-basil text-white">
            <CheckIcon className="h-4 w-4" />
          </span>
          {toast.message}
          <button
            type="button"
            onClick={dismissToast}
            aria-label={content.a11y.dismiss}
            className="flex h-7 w-7 items-center justify-center rounded-full text-cream/70 hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
