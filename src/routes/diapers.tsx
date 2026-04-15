import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhereToBuy } from "@/components/WhereToBuy";
import diapersHero from "@/assets/diapers-hero.jpg";
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
    icon: "💧",
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
        <span
          key={i}
          className={`text-xs ${i < count ? "text-sky-accent" : "text-muted-foreground/30"}`}
        >
          💧
        </span>
      ))}
    </div>
  );
}

function DiapersPage() {
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
          <div className="flex-shrink-0">
            <img
              src={diapersHero}
              alt="Підгузки-трусики VIVO Care"
              width={320}
              height={320}
              className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
            />
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
      <section id="sizes" className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Оберіть свій розмір
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Якщо ваші параметри між двома розмірами — обирайте більший для кращого комфорту.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sizes.map((s) => (
              <div key={s.size} className="card-product flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={s.img}
                    alt={`VIVO Care ${s.size}`}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="badge-size text-lg">{s.size}</span>
                      <span className="text-muted-foreground text-xs">{s.label}</span>
                    </div>
                    <DropsIndicator count={s.drops} />
                  </div>
                </div>
                <dl className="text-sm space-y-1.5 flex-1">
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
                    <dd className="text-foreground font-bold">{s.price}</dd>
                  </div>
                </dl>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-buy mt-4 text-center text-sm justify-center"
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
