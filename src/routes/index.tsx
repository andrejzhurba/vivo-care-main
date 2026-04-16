import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhereToBuy } from "@/components/WhereToBuy";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Droplets, ShieldCheck, Wind, Activity, Timer, Ban } from "lucide-react";

// Імпорт зображень
import heroBg from "@/assets/hero-bg.jpg";
import diaperImg from "@/assets/diapers-hero.jpg";
import underpadImg from "@/assets/underpads-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VIVO Care — Свобода бути собою" },
      {
        name: "description",
        content: "Професійні рішення для вашої гідності. Комфорт та впевненість у кожному русі.",
      },
    ],
  }),
  component: HomePage,
});

const diaperFeatures = [
  {
    icon: <Activity className="w-6 h-6 text-blue-500" />,
    title: "Еластичний пояс 360°",
    desc: "Комфортна посадка та свобода рухів, як звичайна білизна.",
  },
  {
    icon: <Droplets className="w-6 h-6 text-blue-500" />,
    title: "Висока поглинальна здатність",
    desc: "Сухість і впевненість упродовж дня та ночі.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    title: "Захист від протікань",
    desc: "Еластичні бар'єри та гідрофобні манжети з боків.",
  },
  {
    icon: <Wind className="w-6 h-6 text-blue-500" />,
    title: "Дихаючий матеріал",
    desc: "Зменшує ризик подразнень, комфорт для чутливої шкіри.",
  },
  {
    icon: <Timer className="w-6 h-6 text-blue-500" />,
    title: "Індикатор вологості",
    desc: "Зручний контроль для своєчасної заміни.",
  },
  {
    icon: <Ban className="w-6 h-6 text-blue-500" />,
    title: "Нейтралізація запаху",
    desc: "Система Odour Stop ефективно блокує неприємні запахи.",
  },
];

const underpadFeatures = [
  {
    icon: <Droplets className="w-6 h-6 text-blue-500" />,
    title: "Висока поглинаюча здатність",
    desc: "Швидко вбирає рідину та утримує її всередині.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    title: "Вологонепроникний нижній шар",
    desc: "Зменшує ризик протікання на поверхні.",
  },
  {
    icon: <Activity className="w-6 h-6 text-blue-500" />,
    title: "М’яка поверхня",
    desc: "Приємна на дотик, комфортна для шкіри.",
  },
  {
    icon: <Wind className="w-6 h-6 text-blue-500" />,
    title: "Рівномірний розподіл рідини",
    desc: "Антиковзна поверхня для стабільного положення.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    title: "Гіпоалергенність",
    desc: "Підходять для чутливої шкіри.",
  },
];

function HomePage() {
  const scrollToProducts = () => {
    document.getElementById("product-selection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            className="w-full h-full object-cover object-center opacity-40 scale-105" 
            alt="Hero Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              VIVO Care — <br />
              <span className="text-blue-600">свобода бути собою</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 font-light leading-relaxed">
              Комфорт та впевненість у кожному русі. <br />
              Професійні рішення для вашої гідності.
            </p>
            <Button 
              onClick={scrollToProducts}
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-7 text-lg shadow-xl shadow-blue-200 transition-all hover:-translate-y-1"
            >
              Обрати продукт
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT SELECTION */}
      <section id="product-selection" className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Оберіть свій рівень комфорту</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Card 1: Diapers */}
            <Link 
              to="/diapers" 
              className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 transition-all hover:shadow-2xl hover:border-blue-200 shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={diaperImg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Підгузки-труси" />
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-slate-900 mb-3">Підгузки-труси</h3>
                <p className="text-slate-500 mb-6 font-light italic">Максимальна активність та непомітність</p>
                <div className="inline-flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                  Детальніше <ChevronRight className="ml-1 w-5 h-5" />
                </div>
              </div>
            </Link>

            {/* Card 2: Underpads */}
            <Link 
              to="/underpads" 
              className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 transition-all hover:shadow-2xl hover:border-blue-200 shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={underpadImg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Поглинаючі пелюшки" />
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-slate-900 mb-3">Поглинаючі пелюшки</h3>
                <p className="text-slate-500 mb-6 font-light italic">Надійний захист та гігієна поверхонь</p>
                <div className="inline-flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                  Детальніше <ChevronRight className="ml-1 w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS: DIAPERS */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 italic">Для активного життя</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-10 leading-tight">Чому обирають підгузки VIVO Care?</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {diaperFeatures.map((f, i) => (
                  <FeatureCard 
                    key={i}
                    icon={f.icon}
                    title={f.title}
                    description={f.desc}
                  />
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="absolute -inset-10 bg-blue-100/30 rounded-full blur-3xl -z-10 animate-pulse" />
               <img src={diaperImg} className="rounded-[3rem] shadow-2xl rotate-2 transition-transform hover:rotate-0 duration-500" alt="Diaper Advantage" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. BENEFITS: UNDERPADS */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 italic">Для надійного захисту</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-10 leading-tight">Пелюшки, що дарують спокій</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {underpadFeatures.map((f, i) => (
                  <FeatureCard 
                    key={i}
                    icon={f.icon}
                    title={f.title}
                    description={f.desc}
                  />
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="absolute -inset-10 bg-slate-200/50 rounded-full blur-3xl -z-10" />
               <img src={underpadImg} className="rounded-[3rem] shadow-2xl -rotate-2 transition-transform hover:rotate-0 duration-500" alt="Underpad Advantage" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHERE TO BUY */}
      <div className="bg-slate-900 py-10">
        <WhereToBuy />
      </div>

      <Footer />
    </div>
  );
}
