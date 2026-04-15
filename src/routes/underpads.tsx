import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhereToBuy } from "@/components/WhereToBuy";

export const Route = createFileRoute("/underpads")({
  head: () => ({
    meta: [
      { title: "Пелюшки поглинаючі VIVO Care 60×90 см — 30 шт" },
      {
        name: "description",
        content:
          "Поглинаючі пелюшки VivoCare 60×90 см, 30 шт. 5 шарів поглинання, вологонепроникний нижній шар. Для дорослих, дітей та домашніх тварин.",
      },
      { property: "og:title", content: "Пелюшки поглинаючі VIVO Care 60×90 см" },
      {
        property: "og:description",
        content: "Поглинаючі пелюшки 60×90 см, 30 шт. 5 шарів захисту. Ціна 529 ₴.",
      },
    ],
  }),
  component: UnderpadsPage,
});

const underpadsSizes = [
  { id: "1", size: "Standard", dimensions: "60×90 см", qty: 30, price: "529 ₴", drops: 5 },
];

const specs = [
  { label: "Розмір", value: "60 × 90 см" },
  { label: "Кількість", value: "30 шт" },
  { label: "Шари поглинання", value: "5 шарів" },
  { label: "Верхній шар", value: "М'який нетканий матеріал" },
  { label: "Внутрішній шар", value: "Розпушена целюлоза + SAP" },
  { label: "Нижній шар", value: "Водонепроникна плівка" },
  { label: "Виробник", value: "VivoCare" },
  { label: "Країна виробник", value: "Китай" },
  { label: "Колір", value: "Білий" },
  { label: "Ціна", value: "529 ₴" },
];

const advantages = [
  {
    icon: <img src="/1.png" alt="water" className="w-8 h-8" />,
    title: "Висока поглинаюча здатність",
    desc: "Швидко вбирає рідину та утримує її всередині",
  },
  {
    icon: <img src="/2.png" alt="waterproof" className="w-8 h-8" />,
    title: "Вологонепроникний нижній шар",
    desc: "Зменшує ризик протікання на поверхні",
  },
  {
    icon: <img src="/3.png" alt="soft" className="w-8 h-8" />,
    title: "М'яка поверхня",
    desc: "Приємна на дотик, комфортна для шкіри",
  },
  {
    icon: <img src="/4.png" alt="distribution" className="w-8 h-8" />,
    title: "Рівномірний розподіл рідини",
    desc: "Антиковзна поверхня для стабільного положення",
  },
  {
    icon: <img src="/5.png" alt="hypoallergenic" className="w-8 h-8" />,
    title: "Гіпоалергенність",
    desc: "Підходять для чутливої шкіри",
  },
];

const useCases = [
  {
    title: "Догляд за лежачими пацієнтами",
    desc: "Надійний захист постільної білизни під час щоденного догляду",
  },
  {
    title: "Післяопераційний період",
    desc: "Ідеально підходять для використання у лікарнях та вдома",
  },
  { title: "Догляд за дітьми", desc: "Зручний захист поверхонь під час пеленання та годування" },
  { title: "Захист меблів", desc: "Для ліжка, матраца, дивана, крісла та автомобільних сидінь" },
  { title: "Домашні тварини", desc: "Захист підлоги та меблів від вологи та забруднень" },
  { title: "У подорожі", desc: "Компактні та зручні для використання в дорозі" },
];

function UnderpadsPage() {
  const [sizes, setSizes] = useState(underpadsSizes);
  const [showAdmin, setShowAdmin] = useState(false);
  const [newSize, setNewSize] = useState({
    size: "",
    dimensions: "",
    qty: 30,
    price: "",
    drops: 3,
  });

  const handleAddSize = () => {
    if (!newSize.size || !newSize.dimensions || !newSize.price) return;
    const id = Date.now().toString();
    setSizes([...sizes, { ...newSize, id } as (typeof underpadsSizes)[0]]);
    setNewSize({ size: "", dimensions: "", qty: 30, price: "", drops: 3 });
  };

  const handleDeleteSize = (id: string) => {
    setSizes(sizes.filter((s) => s.id !== id));
  };

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
              Пелюшки
              <br />
              поглинаючі
            </h1>
            <p className="text-primary-foreground/80 text-base max-w-md mb-6 leading-relaxed">
              Одноразові поглинаючі пелюшки 60×90 см із 5-шаровою структурою. Підходять для
              дорослих, дітей та домашніх тварин.
            </p>
            <p className="text-primary-foreground font-bold text-2xl mb-4">529 ₴</p>
            <a
              href="https://kapitoshka.kiev.ua/ua/p2905451661-pelenki-pogloschayuschie-vivocare.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-buy inline-flex"
            >
              Купити на Капітошка →
            </a>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-8 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <img
            src="/src/assets/underpads-product.png"
            alt="Пелюшки поглинаючі VIVO Care 60×90 см"
            className="w-full max-w-2xl mx-auto object-contain drop-shadow-2xl"
          />
        </div>
      </section>

      {/* Advantages */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Переваги</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((a) => (
              <div key={a.title} className="card-product">
                <div className="text-2xl mb-2">{a.icon}</div>
                <h3 className="font-semibold text-foreground mb-1">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Характеристики</h2>
          <div className="card-product max-w-lg">
            <dl className="divide-y divide-border">
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between py-3 px-1">
                  <dt className="text-muted-foreground text-sm">{s.label}</dt>
                  <dd className="text-foreground font-medium text-sm">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            Де використовувати?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((u) => (
              <div key={u.title} className="card-product">
                <h3 className="font-semibold text-foreground mb-1">{u.title}</h3>
                <p className="text-sm text-muted-foreground">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhereToBuy
        links={[
          {
            name: "Капітошка",
            url: "https://kapitoshka.kiev.ua/ua/p2905451661-pelenki-pogloschayuschie-vivocare.html",
          },
        ]}
      />

      {/* Sizes Section */}
      <section id="sizes" className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Оберіть розмір
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sizes.map((s) => (
              <div key={s.id} className="card-product p-6 text-center">
                <h3 className="text-xl font-bold mb-2">{s.size}</h3>
                <p className="text-muted-foreground mb-2">{s.dimensions}</p>
                <p className="text-2xl font-bold text-violet-accent mb-2">{s.price}</p>
                <p className="text-sm text-muted-foreground mb-4">{s.qty} шт</p>
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${i < s.drops ? "text-violet-accent" : "text-muted-foreground/30"}`}
                    >
                      💧
                    </span>
                  ))}
                </div>
                <a
                  href="https://kapitoshka.kiev.ua/ua/p2905451661-pelenki-pogloschayuschie-vivocare.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-buy"
                >
                  Купити →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Panel Toggle */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="mx-auto max-w-4xl text-center">
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className="text-sm text-muted-foreground hover:text-violet-accent"
          >
            {showAdmin ? "Сховати адмін-панель" : "Показати адмін-панель"}
          </button>

          {showAdmin && (
            <div className="mt-6 card-product p-6">
              <h3 className="text-lg font-bold mb-4">Додати новий розмір</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Назва (Standard, Plus)"
                  value={newSize.size}
                  onChange={(e) => setNewSize({ ...newSize, size: e.target.value })}
                  className="border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Розміри (60×90 см)"
                  value={newSize.dimensions}
                  onChange={(e) => setNewSize({ ...newSize, dimensions: e.target.value })}
                  className="border rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Кількість"
                  value={newSize.qty}
                  onChange={(e) => setNewSize({ ...newSize, qty: Number(e.target.value) })}
                  className="border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Ціна (529 ₴)"
                  value={newSize.price}
                  onChange={(e) => setNewSize({ ...newSize, price: e.target.value })}
                  className="border rounded px-3 py-2"
                />
                <select
                  value={newSize.drops}
                  onChange={(e) => setNewSize({ ...newSize, drops: Number(e.target.value) })}
                  className="border rounded px-3 py-2"
                >
                  <option value={3}>3 краплі</option>
                  <option value={5}>5 крапель</option>
                  <option value={7}>7 крапель</option>
                  <option value={9}>9 крапель</option>
                </select>
                <button onClick={handleAddSize} className="btn-buy">
                  Додати
                </button>
              </div>

              <h4 className="font-bold mb-2">Поточні розміри:</h4>
              <div className="space-y-2">
                {sizes.map((s) => (
                  <div key={s.id} className="flex justify-between items-center text-sm">
                    <span>
                      {s.size} ({s.dimensions}) - {s.price}
                    </span>
                    <button onClick={() => handleDeleteSize(s.id)} className="text-red-500 text-sm">
                      Видалити
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
