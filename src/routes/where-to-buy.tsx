import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhereToBuy } from "@/components/WhereToBuy";
import { useState, useEffect } from "react";
import { getSettings, type CMSSettings } from "@/lib/cms";
import { ShoppingCart, MapPin, Truck } from "lucide-react";

export const Route = createFileRoute("/where-to-buy")({
  head: () => ({
    meta: [
      { title: "Де купити Vivo Care в Україні — Офіційні магазини та партнери" },
      {
        name: "description",
        content:
          "Знайдіть найближчий магазин або замовляйте онлайн підгузки та пелюшки Vivo Care. Офіційні партнери: Капітошка, Igorek, Prom.ua. Доставка по всій Україні.",
      },
    ],
  }),
  component: WhereToBuyPage,
});

function WhereToBuyPage() {
  const [settings, setSettings] = useState<CMSSettings | null>(null);

  useEffect(() => {
    async function load() {
      setSettings(await getSettings());
    }
    load();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 font-sans">
      <Header />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Де купити <span className="text-blue-500">Vivo Care</span>?
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
              Ми співпрацюємо з провідними інтернет-магазинами та аптечними мережами України, щоб ви
              могли отримати якісну допомогу вчасно.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Онлайн замовлення</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Швидко та зручно через маркетплейси та спеціалізовані сайти.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Наявність у Києві</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Офіційний представник у місті Київ забезпечує постійний склад.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-sm text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck className="text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Доставка по Україні</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Надсилаємо Новою Поштою та Укрпоштою у будь-який куточок країни.
              </p>
            </div>
          </div>

          <WhereToBuy links={settings?.stores} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
