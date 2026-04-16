import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhereToBuy } from "@/components/WhereToBuy";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CheckCircle2, Droplets, ShieldCheck, Activity, Wind, Heart } from "lucide-react";

// Імпорт зображення
import underpadImg from "@/assets/underpads-product.png";

export const Route = createFileRoute("/underpads")({
  head: () => ({
    meta: [
      { title: "Пелюшки поглинаючі VIVO Care 60×90 см — Надійний захист" },
      {
        name: "description",
        content: "Поглинаючі пелюшки VIVO Care 60×90 см. 5 шарів захисту, гіпоалергенні, з вологонепроникним шаром.",
      },
    ],
  }),
  component: UnderpadsPage,
});

const underpadSizes = [
  {
    id: "6090",
    size: "Standard",
    dimensions: "60 × 90 см",
    qty: "30 шт",
    price: "529 ₴",
    absorbency: "Висока (5 крапель)",
    url: "https://kapitoshka.kiev.ua/ua/p2905451661-pelenki-pogloschayuschie-vivocare.html",
  },
  // Приклад для майбутнього додавання розміру 60x60
  /*
  {
    id: "6060",
    size: "Compact",
    dimensions: "60 × 60 см",
    qty: "30 шт",
    price: "415 ₴",
    absorbency: "Середня (4 краплі)",
    url: "#",
  },
  */
];

const specs = [
  { label: "Розмір", value: "60 × 90 см" },
  { label: "Кількість", value: "30 шт" },
  { label: "Шари поглинання", value: "5 шарів" },
  { label: "Верхній шар", value: "М'який нетканий" },
  { label: "Внутрішній шар", value: "Целюлоза + SAP" },
  { label: "Нижній шар", value: "Водонепроникна плівка" },
  { label: "Гіпоалергенність", value: "Так" },
  { label: "Виробник", value: "VIVO Care" },
];

const advantages = [
  {
    icon: <Droplets className="w-5 h-5 text-blue-500" />,
    title: "Висока поглинальність",
    desc: "Швидко вбирає та утримує рідину",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-blue-500" />,
    title: "Вологонепроникність",
    desc: "Захищає поверхні від протікань",
  },
  {
    icon: <Activity className="w-5 h-5 text-blue-500" />,
    title: "М’яка поверхня",
    desc: "Комфортна для тривалого контакту",
  },
  {
    icon: <Wind className="w-5 h-5 text-blue-500" />,
    title: "Рівномірний розподіл",
    desc: "Антиковзне покриття для стабільності",
  },
  {
    icon: <Heart className="w-5 h-5 text-blue-500" />,
    title: "Гіпоалергенність",
    desc: "Безпечно для чутливої шкіри",
  },
];

function UnderpadsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Преміальна серія</span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                Пелюшки поглинаючі <br />
                <span className="text-blue-600">VIVO Care</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 font-light leading-relaxed max-w-xl">
                Надійний гігієнічний захист для будь-яких поверхонь. 
                5 шарів безпеки для вашого спокою.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                  Сухість та комфорт
                </div>
                <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                  Захист 24/7
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img src={underpadImg} alt="VIVO Care Underpads" className="w-full max-w-lg mx-auto drop-shadow-2xl animate-in zoom-in duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* 1. БЛОК РОЗМІРІВ (Scalable Grid) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Оберіть розмір</h2>
          <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full mb-12" />
          
          <div className="flex flex-wrap justify-center gap-8">
            {underpadSizes.map((s) => (
              <div key={s.id} className="w-full sm:w-[350px] bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 hover:border-blue-100 group">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{s.size}</h3>
                <div className="text-blue-600 font-black text-3xl mb-4 tracking-tighter">{s.dimensions}</div>
                
                <div className="space-y-3 mb-8 text-slate-500 font-light italic">
                  <p>Кількість: <span className="text-slate-900 font-medium">{s.qty}</span></p>
                  <p>Поглинання: <span className="text-slate-900 font-medium">{s.absorbency}</span></p>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-3xl font-bold text-slate-900">{s.price}</span>
                  <a 
                    href={s.url} 
                    target="_blank"
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    КУПИТИ
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ВІЗУАЛ ПЕРЕВАГ (Horizontal Layout) */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {advantages.map((a, i) => (
              <div key={i} className="flex items-start gap-5 p-6 bg-white rounded-3xl shadow-sm border border-white transition-all hover:border-blue-100 group">
                <div className="shrink-0 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {a.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{a.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. БЛОК ХАРАКТЕРИСТИК (2 Columns on Desktop) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Детальні характеристики</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
              {specs.map((s, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-slate-200/50">
                  <span className="text-slate-500 font-light">{s.label}</span>
                  <span className="text-slate-900 font-bold text-sm">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ЛОГІКА "ДЕ КУПИТИ" */}
      <div className="bg-slate-900">
        <WhereToBuy 
          links={[
            {
              name: "Капітошка — офіційний партнер",
              url: "https://kapitoshka.kiev.ua/ua/product_list?csbss0=1128038494",
            },
          ]}
        />
      </div>

      <Footer />
    </div>
  );
}
