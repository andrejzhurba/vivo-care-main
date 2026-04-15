import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhereToBuy } from "@/components/WhereToBuy";
import diapersS from "@/assets/diapers-S.png";
import diapersM from "@/assets/diapers-M.png";
import diapersL from "@/assets/diapers-L.png";
import diapersXL from "@/assets/diapers-XL.png";
import diapersXXL from "@/assets/diapers-XXL.png";

export const Route = createFileRoute("/diapers")({
  head: () => ({
    meta: [
      { title: "Підгузки-труси VIVO Care — Розміри та характеристики" },
      {
        name: "description",
        content:
          "Підгузки-трусики для дорослих VIVO Care з еластичним поясом 360°. Розміри S, M, L, XL, XXL. 30 шт в упаковці. Дихаючі, з індикатором вологості.",
      },
      { property: "og:title", content: "Підгузки-труси VIVO Care" },
      {
        property: "og:description",
        content: "Комфортні підгузки-трусики з еластичним поясом 360°. Розміри S–XXL, 30 шт.",
      },
    ],
  }),
  component: DiapersPage,
});

const sizes = [
  {
    size: "S",
    label: "Small",
    waist: "50–80 см",
    weight: "40–60 кг",
    drops: 8,
    price: "560 ₴",
    qty: "30 шт",
    img: diapersS,
    url: "https://kapitoshka.kiev.ua/ua/p2905451595-podguzniki-trusy-dlya.html",
  },
  {
    size: "M",
    label: "Medium",
    waist: "75–100 см",
    weight: "55–85 кг",
    drops: 9,
    price: "610 ₴",
    qty: "30 шт",
    img: diapersM,
    url: "https://kapitoshka.kiev.ua/ua/p2905451614-podguzniki-trusy-dlya.html",
  },
  {
    size: "L",
    label: "Large",
    waist: "90–120 см",
    weight: "80–125 кг",
    drops: 9,
    price: "680 ₴",
    qty: "30 шт",
    img: diapersL,
    url: "https://kapitoshka.kiev.ua/ua/p2905451581-podguzniki-trusy-dlya.html",
  },
  {
    size: "XL",
    label: "Extra Large",
    waist: "120–145 см",
    weight: "110–150 кг",
    drops: 9,
    price: "700 ₴",
    qty: "30 шт",
    img: diapersXL,
    url: "https://kapitoshka.kiev.ua/ua/p2905451613-podguzniki-trusy-dlya.html",
  },
  {
    size: "XXL",
    label: "Extra Extra Large",
    waist: "135–180 см",
    weight: "120–170 кг",
    drops: 8,
    price: "750 ₴",
    qty: "30 шт",
    img: diapersXXL,
    url: "https://kapitoshka.kiev.ua/ua/p2905451660-podguzniki-trusy-dlya.html",
  },
];

const features = [
  {
    icon: "🔄",
    title: "Еластичний пояс 360°",
    desc: "Комфортна посадка та свобода рухів, як звичайна білизна",
  },
  {
    icon: <img src="/1.png" alt="water" className="w-8 h-8" />,
    title: "Висока поглинальна здатність",
    desc: "Сухість і впевненість упродовж дня та ночі",
  },
  {
    icon: "🛡️",
    title: "Захист від протікань",
    desc: "Еластичні бар'єри та гідрофобні манжети з боків",
  },
  {
    icon: "🌬️",
    title: "Дихаючий матеріал",
    desc: "Зменшує ризик подразнень, комфорт для чутливої шкіри",
  },
  { icon: "📊", title: "Індикатор вологості", desc: "Зручний контроль для своєчасної заміни" },
  {
    icon: "🚫",
    title: "Нейтралізація запаху",
    desc: "Система Odour Stop ефективно блокує неприємні запахи",
  },
];

const layers = [
  "Нетканий верхній шар",
  "Нетканий шар для розподілу та поглинання рідини",
  "SAP + розпушена целюлоза",
  "Нетканий бар'єр від протікань",
  "Нетканий еластичний пояс 360°",
  "Дихаючий водонепроникний задній шар",
];

function DropsIndicator({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" title={`Рівень поглинання: ${count} крапель`}>
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className={i < count ? "" : "opacity-30"}>
          <img src="/1.png" alt="drop" className="w-4 h-4" />
        </span>
      ))}
    </div>
  );
}

function DiapersPage() {
  const heroImages = [
    "/src/assets/diapers-hero1.jpg",
    "/src/assets/diapers-hero2.jpg",
    "/src/assets/diapers-hero3.jpg",
    "/src/assets/diapers-hero4.jpg",
    "/src/assets/diapers-hero5.jpg",
  ];
  const [currentHero, setCurrentHero] = useState(0);

  const nextHero = () => setCurrentHero((prev) => (prev + 1) % heroImages.length);
  const prevHero = () =>
    setCurrentHero((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="gradient-hero">
        <div className="mx-auto max-w-5xl px-4 py-14 md:py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <p className="text-violet-accent-light text-sm font-semibold tracking-widest uppercase mb-3">
              VIVO Care
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-4">
              Підгузки-трусики
              <br />
              для дорослих
            </h1>
            <p className="text-primary-foreground/80 text-base max-w-md mb-6 leading-relaxed">
              Комфортні підгузки-трусики з еластичним поясом 360°, які сидять зручно, як звичайна
              білизна. Надійне поглинання та захист упродовж дня та ночі.
            </p>
            <a href="#sizes" className="btn-buy inline-flex">
              Обрати розмір ↓
            </a>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-8 px-4 bg-white">
        <div className="mx-auto max-w-4xl relative">
          <button
            onClick={prevHero}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-violet-100 hover:bg-violet-200 rounded-full p-3 shadow-lg text-violet-600 font-bold"
          >
            ‹
          </button>
          <img
            src={heroImages[currentHero]}
            alt="Підгузки-трусики VIVO Care"
            className="w-full max-w-2xl mx-auto object-contain drop-shadow-2xl"
          />
          <button
            onClick={nextHero}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-violet-100 hover:bg-violet-200 rounded-full p-3 shadow-lg text-violet-600 font-bold"
          >
            ›
          </button>
          <div className="flex justify-center gap-2 mt-6">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentHero(i)}
                className={`w-3 h-3 rounded-full ${i === currentHero ? "bg-violet-600" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Переваги</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="card-product">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layers */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            Багатошарова структура
          </h2>
          <div className="card-product">
            <ol className="space-y-3">
              {layers.map((layer, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="badge-size text-xs w-7 h-7 flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-foreground text-sm pt-0.5">{layer}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Size cards */}
      <section id="sizes" className="py-14 md:py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-2">
            Оберіть свій розмір
          </h2>
          <p className="text-base text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Якщо ваші параметри між двома розмірами — обирайте більший для кращого комфорту.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sizes.map((s) => (
              <div key={s.size} className="card-product flex flex-col p-6">
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={s.img}
                    alt={`VIVO Care ${s.size}`}
                    className="w-40 h-40 md:w-48 md:h-48 object-contain rounded-lg mb-4"
                  />
                  <div className="flex items-center gap-2">
                    <span className="badge-size text-xl px-3 py-1">{s.size}</span>
                    <span className="text-muted-foreground text-sm">{s.label}</span>
                  </div>
                  <DropsIndicator count={s.drops} />
                </div>
                <dl className="text-base space-y-2 flex-1">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Обхват талії</dt>
                    <dd className="text-foreground font-medium">{s.waist}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Вага</dt>
                    <dd className="text-foreground font-medium">{s.weight}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Кількість</dt>
                    <dd className="text-foreground font-medium">{s.qty}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Ціна</dt>
                    <dd className="text-foreground font-bold text-lg">{s.price}</dd>
                  </div>
                </dl>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-buy mt-6 text-center justify-center py-3 text-base"
                >
                  Купити на Капітошка →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comfort section */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
            Комфорт у користуванні
          </h2>
          <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
            <p>
              Завдяки анатомічній посадці та м'яким еластичним манжетам підгузки-трусики щільно
              прилягають до тіла, не сковують рухів і допомагають зменшити ризик протікань.
            </p>
            <p>
              Матеріал, що дихає, зменшує ризик подразнень, а вбираючий шар швидко поглинає вологу
              та сприяє відчуттю сухості. Зручний формат трусиків дозволяє легко одягати та знімати
              виріб як самостійно, так і під час догляду.
            </p>
            <p>
              Підходять для активних людей, щоденного використання та догляду за лежачими
              пацієнтами. Рекомендовані при легкому, середньому або більш вираженому нетриманні.
            </p>
          </div>
        </div>
      </section>

      <WhereToBuy
        links={[
          {
            name: "Капітошка — усі розміри",
            url: "https://kapitoshka.kiev.ua/ua/product_list?csbss0=1128038494",
          },
        ]}
      />
      <Footer />
    </div>
  );
}
