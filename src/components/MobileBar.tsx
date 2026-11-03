import { Phone, ShoppingBag } from "lucide-react";
import { business } from "@/content/business";

// Sticky Call / Order bar on phones only.
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-ink/10 bg-paper/95 p-2 backdrop-blur md:hidden">
      <a
        href={`tel:${business.phone.tel}`}
        className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-4 py-3 text-sm font-bold uppercase tracking-wide"
      >
        <Phone aria-hidden="true" width={16} height={16} />
        Call
      </a>
      <a
        href={business.order.primary.url}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-pepper px-4 py-3 text-sm font-bold uppercase tracking-wide text-white"
      >
        <ShoppingBag aria-hidden="true" width={16} height={16} />
        Order online
      </a>
    </div>
  );
}
