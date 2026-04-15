import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VIVO Care — Турбота, яку відчуваєш" },
      {
        name: "description",
        content:
          "Якісні гігієнічні засоби для дорослих VIVO Care. Комфорт, захист та впевненість щодня.",
      },
    ],
  }),
  component: HomePage,
});

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

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero / Brand Presentation - Matches other pages with gradient-hero */}
      <section className="relative text-white py-24 px-4 overflow-hidden min-h-[500px] flex items-center gradient-hero">
        <div className="mx-auto max-w-5xl flex flex-col items-center text-center relative z-10">
          <img
            src={logo}
            alt="VIVO Care"
            className="h-24 md:h-32 mb-10 brightness-0 invert drop-shadow-2xl"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight drop-shadow-lg">
            Турбота,
            <br />
            <span className="text-white underline decoration-white/20">яку відчуваєш</span>
          </h1>
          <p className="text-xl text-white max-w-2xl mb-12 leading-relaxed font-bold drop-shadow-md">
            VIVO Care створює гігієнічні засоби преміальної якості, щоб ви могли насолоджуватися
            кожним моментом життя з відчуттям повної впевненості та комфорту.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="/diapers" className="btn-buy">
              Підгузки-труси
            </a>
            <a href="/underpads" className="btn-buy">
              Пелюшки
            </a>
          </div>
        </div>

        {/* Decorative elements to add depth while matching the theme */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Features - Підгузки-труси */}
      <section className="py-14 md:py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-8">
            Переваги підгузків-трусиків
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-product p-6 text-center">
                <div className="text-3xl mb-4 flex justify-center">{f.icon}</div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages - Пелюшки */}
      <section className="py-14 md:py-20 px-4 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-8">
            Переваги пелюшок
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="card-product p-6 text-center">
                <div className="flex justify-center mb-4">{a.icon}</div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Links */}
      <section className="py-14 md:py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-6">
            <a
              href="/diapers"
              className="card-product p-8 text-center hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-2xl text-foreground mb-2">Підгузки-труси</h3>
              <p className="text-muted-foreground mb-4">Комфортні підгузки для дорослих</p>
              <span className="btn-buy inline-flex">Переглянути →</span>
            </a>
            <a
              href="/underpads"
              className="card-product p-8 text-center hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-2xl text-foreground mb-2">Пелюшки</h3>
              <p className="text-muted-foreground mb-4">Поглинаючі пелюшки 60×90 см</p>
              <span className="btn-buy inline-flex">Переглянути →</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
