import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhereToBuy, BuyDropdown } from "@/components/WhereToBuy";
import { Ruler, Droplets, Activity, ShieldCheck, Wind, Timer, Ban } from "lucide-react";
import { useState, useEffect } from "react";
import { getSettings, type CMSSettings } from "@/lib/cms";

// Імпорт зображень розмірів
import diapersS from "@/assets/diapers-S.png";
import diapersM from "@/assets/diapers-M.png";
import diapersL from "@/assets/diapers-L.png";
import diapersXL from "@/assets/diapers-XL.png";
import diapersXXL from "@/assets/diapers-XXL.png";

export const Route = createFileRoute("/diapers")({
  head: () => ({
    meta: [
      { title: "Vivo Care — Підгузки-труси для дорослих: комфорт та захист" },
      {
        name: "description",
        content:
          "Підгузки-труси Vivo Care для дорослих. Максимальний захист, еластичний пояс 360°, дихаючі матеріали. Оберіть свій розмір: S, M, L, XL, XXL.",
      },
      { property: "og:title", content: "Vivo Care — Підгузки-труси для дорослих" },
      {
        property: "og:description",
        content: "Професійні гігієнічні рішення для вашої гідності та комфорту.",
      },
    ],
  }),
  component: DiapersPage,
});

// Мапінг ID розміру до зображення
const sizeImageMap: Record<string, string> = {
  S: diapersS,
  M: diapersM,
  L: diapersL,
  XL: diapersXL,
  XXL: diapersXXL,
};

const mainFeatures = [
  {
    icon: <Activity className="w-6 h-6 text-blue-500" />,
    title: "Еластичний пояс 360°",
    desc: "М'яка посадка та свобода рухів",
  },
  {
    icon: <Droplets className="w-6 h-6 text-blue-500" />,
    title: "Висока поглинальність",
    desc: "Сухість і впевненість",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    title: "Leak Guard",
    desc: "Захист від протікань",
  },
  {
    icon: <Wind className="w-6 h-6 text-blue-500" />,
    title: "Дихаючий матеріал",
    desc: "Комфорт для шкіри",
  },
  {
    icon: <Timer className="w-6 h-6 text-blue-500" />,
    title: "Індикатор вологості",
    desc: "Зручний контроль заміни",
  },
  {
    icon: <Ban className="w-6 h-6 text-blue-500" />,
    title: "Odour Stop",
    desc: "Нейтралізація запаху",
  },
];

import { FAQ } from "@/components/FAQ";

const diaperFaqs = [
  {
    question: "Як підібрати розмір підгузків-трусів Vivo Care?",
    answer:
      "Для правильного підбору необхідно виміряти обхват талії та стегон. Орієнтуйтеся на більший показник. В нашій таблиці розмірів вказано діапазон обхвату для кожного розміру (S, M, L, XL, XXL). Якщо ваші заміри знаходяться на межі двох розмірів, рекомендуємо обрати більший для максимального комфорту.",
  },
  {
    question: "Чи підходять підгузки-труси для нічного використання?",
    answer:
      "Так, підгузки-труси Vivo Care мають високу поглинальну здатність та систему захисту від протікань, що робить їх ідеальними для тривалого використання, включаючи нічний час.",
  },
  {
    question: "Як часто потрібно міняти підгузок-труси?",
    answer:
      "Рекомендується змінювати виріб за потреби, але не рідше ніж кожні 4-6 годин, або відразу після наповнення. Наші підгузки оснащені індикатором наповнення, який підкаже, коли прийшов час для зміни.",
  },
];

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function DiapersPage() {
  const [settings, setSettings] = useState<CMSSettings | null>(null);

  useEffect(() => {
    async function load() {
      setSettings(await getSettings());
    }
    load();
  }, []);

  const diaperSizeInfo = settings?.diaperSizes || [];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Підгузки-труси Vivo Care для дорослих",
    image: "https://vivocare.com.ua/assets/diapers-L.png",
    description:
      "Професійні підгузки-труси для дорослих з еластичним поясом 360° та високою поглинальною здатністю.",
    brand: {
      "@type": "Brand",
      name: "Vivo Care",
    },
    offers: {
      "@type": "AggregateOffer",
      offerCount: diaperSizeInfo.length > 0 ? diaperSizeInfo.length : 5,
      lowPrice: "500",
      highPrice: "800",
      priceCurrency: "UAH",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <main>
        {/* 1. ШАПКА ПРОДУКТУ */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Підгузки-труси <span className="text-blue-600">Vivo Care</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              Поєднання комфорту звичайної білизни та максимального захисту. Створені для активного
              життя та спокійного сну.
            </p>
          </div>
        </section>

        {/* 2. БЛОК РОЗМІРІВ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Оберіть свій розмір
              </h2>
              <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              {diaperSizeInfo.map((s) => {
                const images =
                  s.images && s.images.length > 0 ? s.images : [sizeImageMap[s.id] || diapersM];
                return (
                  <article
                    key={s.id}
                    className="group flex flex-col bg-white border border-slate-100 rounded-[2rem] p-6 transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-2 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 mb-6">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {images.map((img, idx) => (
                            <CarouselItem key={idx}>
                              <div className="aspect-square overflow-hidden flex items-center justify-center">
                                <img
                                  src={img}
                                  alt={`Підгузки Vivo Care розмір ${s.id} (${s.name}) — упаковка`}
                                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                  loading="lazy"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        {images.length > 1 && (
                          <>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                          </>
                        )}
                      </Carousel>
                    </div>

                    <div className="mb-4 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row items-center gap-2 mb-1">
                        <span className="text-2xl font-black text-blue-600">{s.id}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                          {s.name}
                        </span>
                      </div>

                      <div className="space-y-2 mt-4">
                        <div className="flex items-center text-sm text-slate-600">
                          <Ruler className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                          <span>{s.waist}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <Droplets className="w-4 h-4 mr-2 text-blue-400 shrink-0" />
                          <span className="font-medium">{s.absorbency}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <BuyDropdown stores={settings?.diaperStores[s.id] || []} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. ВІЗУАЛЬНА ПЕРЕВАГА (Icons grid) */}
        <section className="py-20 bg-slate-50/50">
          <div className="container mx-auto px-6">
            <h2 className="sr-only">Переваги підгузків Vivo Care</h2>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {mainFeatures.map((f, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 transition-all group-hover:bg-blue-50 group-hover:scale-110 group-hover:border-blue-100">
                      {f.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{f.title}</h3>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ items={diaperFaqs} title="Питання про підгузки-труси" />
      </main>

      <div className="bg-slate-900 py-10">
        <WhereToBuy links={settings?.stores} />
      </div>

      <Footer />
    </div>
  );
}
