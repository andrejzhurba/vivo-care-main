import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ShoppingBag, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface WhereToBuyProps {
  links?: { name: string; url: string; description?: string }[];
}

const defaultStores = [
  {
    name: "Капітошка",
    url: "https://kapitoshka.kiev.ua/ua/product_list?csbss0=1128038494",
    description: "Офіційний партнер",
  },
  {
    name: "Igorek",
    url: "https://igorek.com.ua/ua/site_search?search_term=VIVO+Care",
    description: "Інтернет-магазин",
  },
  {
    name: "Prom.ua",
    url: "https://prom.ua/ua/search?search_term=VivoCare",
    description: "Маркетплейс",
  },
];

export function WhereToBuy({ links }: WhereToBuyProps) {
  const stores = links && links.length > 0 ? links : defaultStores;

  return (
    <section className="py-12 px-4">
      <h2 className="sr-only">Де купити продукцію VIVO Care</h2>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Де купити?</h2>
        <p className="text-slate-400 text-lg mb-10 font-light italic">
          Оберіть зручний для вас магазин
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          {stores.map((store) => (
            <a
              key={store.name}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold transition-all border border-white/10 backdrop-blur-sm group"
            >
              <ShoppingBag className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col items-start">
                <span>{store.name}</span>
                {store.description && (
                  <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wider">
                    {store.description}
                  </span>
                )}
              </div>
              <ExternalLink className="w-4 h-4 ml-2 opacity-30 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BuyDropdown({ stores, label = "ДЕ КУПИТИ" }: { stores: { name: string; url: string }[], label?: string }) {
  const [checking, setChecking] = useState<string | null>(null);

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>, store: { name: string; url: string }) => {
    e.preventDefault();
    
    if (checking) return;

    setChecking(store.name);
    const toastId = toast.loading(`Перевірка наявності в ${store.name}...`);

    try {
      // NOTE: Client-side fetch to external domains will likely fail due to CORS
      // This is a "best effort" check. In a real production app, you'd use a proxy.
      const response = await fetch(store.url, { 
        mode: 'no-cors', // Standard for cross-origin if CORS headers are missing
        method: 'GET'
      });

      // With no-cors, we can't actually see the status code (it's always 0).
      // So we'll assume it's okay unless the fetch itself fails.
      // If we wanted a real 404 check, we'd need a backend proxy.
      
      toast.dismiss(toastId);
      window.open(store.url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error("Availability check failed:", error);
      toast.dismiss(toastId);
      toast.error(`Товар в магазині ${store.name} тимчасово відсутній або посилання недоступне.`);
    } finally {
      setChecking(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-50">
        <ShoppingBag className="w-3 h-3" />
        {checking ? "ПЕРЕВІРКА..." : label}
        <ChevronDown className="w-3 h-3 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl bg-white border-slate-100 shadow-2xl">
        <div className="px-2 py-2 mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Оберіть магазин
        </div>
        {stores.map((store) => (
          <DropdownMenuItem key={store.name} className="p-0 mb-1 last:mb-0">
            <a
              href={store.url}
              onClick={(e) => handleLinkClick(e, store)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors group"
            >
              <span className="font-bold text-slate-700 group-hover:text-blue-700">{store.name}</span>
              <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-blue-400" />
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
