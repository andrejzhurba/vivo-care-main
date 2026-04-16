import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhereToBuy } from "@/components/WhereToBuy";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Droplets, ShieldCheck, Wind, Activity, Timer, Ban } from "lucide-react";
import { useState, useEffect } from "react";
import { getSettings, type CMSSettings } from "@/lib/cms";
import { Tips } from "@/components/Tips";

import diaperImg from "@/assets/diapers-hero.jpg";
import underpadImg from "@/assets/underpads-hero.jpg";
import brandLogo from "@/assets/logo.png";
import heroBg from "../../Gemini_Generated_Image_pql2g1pql2g1pql2.png";

import telegramIcon from "@/assets/Telegram.png";
import viberIcon from "@/assets/viber.png";
import whatsappIcon from "@/assets/whatsapp.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vivo Care — засоби гігієни для дорослих: підгузки-труси та пелюшки" },
      {
        name: "description",
        content:
          "Vivo Care — офіційний сайт бренду професійних гігієнічних засобів. Підгузки-труси та поглинаючі пелюшки європейської якості для догляду за дорослими. Турбота щодня.",
      },
      { property: "og:title", content: "Vivo Care — Турбота щодня" },
      {
        property: "og:description",
        content:
          "Професійні гігієнічні засоби для дорослих. Підгузки-труси та поглинаючі пелюшки європейської якості.",
      },
      { property: "og:type", content: "website" },
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
    desc: "Система Odour Stop эффективно блокує неприємні запахи.",
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
    title: "М'яка поверхня",
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
  const [settings, setSettings] = useState<CMSSettings | null>(null);

  useEffect(() => {
    async function load() {
      setSettings(await getSettings());
    }
    load();
  }, []);

  const scrollToProducts = () => {
    document.getElementById("product-selection")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!settings) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />

      <main>
        {/* 1. HERO SECTION */}
        <section
          className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-100 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl text-left animate-in fade-in duration-1000">
              <img
                src={brandLogo}
                alt="Vivo Care — професійні засоби гігієни (логотип бренду)"
                className="h-24 md:h-32 mb-8 object-contain"
                loading="lazy"
              />
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight tracking-tight">
                {settings.heroSlogan.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={
                      i === settings.heroSlogan.split(" ").length - 1 ? "text-blue-600" : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </h1>
              <p className="text-lg md:text-xl text-slate-700 mb-10 font-medium leading-relaxed max-w-2xl">
                {settings.heroDescription}
              </p>
              <Button
                onClick={scrollToProducts}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-7 text-lg shadow-xl shadow-blue-200 transition-all hover:-translate-y-1"
              >
                Дізнатися більше
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* 2. PRODUCT SELECTION */}
        <section id="product-selection" className="py-24 bg-slate-50/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                Наші продукти
              </h2>
              <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Card 1: Diapers */}
              <Link
                to="/diapers"
                className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 transition-all hover:shadow-2xl hover:border-blue-200 shadow-sm"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={diaperImg}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Підгузки-труси Vivo Care для активних людей — переглянути деталі"
                    loading="lazy"
                  />
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">Підгузки-труси</h3>
                  <p className="text-slate-500 mb-6 font-light italic">
                    Максимальна активність та непомітність
                  </p>
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
                  <img
                    src={underpadImg}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Поглинаючі пелюшки Vivo Care для гігієни поверхонь — переглянути деталі"
                    loading="lazy"
                  />
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">Поглинаючі пелюшки</h3>
                  <p className="text-slate-500 mb-6 font-light italic">
                    Надійний захист та гігієна поверхонь
                  </p>
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
                <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 italic">
                  Для активного життя
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-10 leading-tight">
                  Чому обирають підгузки Vivo Care?
                </h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  {diaperFeatures.map((f, i) => (
                    <FeatureCard key={i} icon={f.icon} title={f.title} description={f.desc} />
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-10 bg-blue-100/30 rounded-full blur-3xl -z-10 animate-pulse" />
                <img
                  src={diaperImg}
                  className="rounded-[3rem] shadow-2xl rotate-2 transition-transform hover:rotate-0 duration-500"
                  alt="Переваги підгузків Vivo Care: комфорт та надійність"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. BENEFITS: UNDERPADS */}
        <section className="py-24 bg-slate-50/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
              <div className="lg:w-1/2">
                <span className="inline-block px-4 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 italic">
                  Для надійного захисту
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-10 leading-tight">
                  Пелюшки, що дарують спокій
                </h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  {underpadFeatures.map((f, i) => (
                    <FeatureCard key={i} icon={f.icon} title={f.title} description={f.desc} />
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-10 bg-slate-200/50 rounded-full blur-3xl -z-10" />
                <img
                  src={underpadImg}
                  className="rounded-[3rem] shadow-2xl -rotate-2 transition-transform hover:rotate-0 duration-500"
                  alt="Переваги пелюшок Vivo Care: 5 шарів поглинання"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <Tips />
      </main>

      {/* 5. WHERE TO BUY */}
      <div className="bg-slate-900 py-10">
        <WhereToBuy links={settings.stores} />
      </div>

      {/* 6. КОНТАКТИ */}
      <section id="contacts" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto bg-slate-50 rounded-[3rem] p-12 border border-slate-100 shadow-sm transition-all hover:shadow-md">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              Контакти
            </h2>
            <div className="h-1 w-12 bg-blue-500 mx-auto rounded-full mb-8" />

            <div className="space-y-6">
              <p className="text-slate-600 text-lg font-light leading-relaxed">
                Ми завжди відкриті до спілкування та співпраці. <br />
                Зв’яжіться з нами для отримання детальної інформації про продукцію{" "}
                <span className="text-blue-600 font-bold italic text-nowrap leading-none">
                  Vivo Care
                </span>
                .
              </p>

              <div className="flex flex-col items-center gap-4 pt-4">
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="text-2xl md:text-3xl font-bold text-slate-900 hover:text-blue-600 transition-colors tracking-tight"
                >
                  {settings.contactEmail}
                </a>
                <a
                  href={`tel:${settings.contactPhone.replace(/\s+/g, "")}`}
                  className="text-xl md:text-2xl font-bold text-slate-600 hover:text-blue-600 transition-colors tracking-tight"
                >
                  {settings.contactPhone}
                </a>
                {(settings.messengerLinks?.whatsapp ||
                  settings.messengerLinks?.telegram ||
                  settings.messengerLinks?.viber) && (
                  <div className="flex justify-center gap-4 pt-4">
                    {settings.messengerLinks?.whatsapp && (
                      <a
                        href={settings.messengerLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                        aria-label="WhatsApp"
                      >
                        <img src={whatsappIcon} alt="WhatsApp" className="w-12 h-12 object-contain" />
                      </a>
                    )}
                    {settings.messengerLinks?.telegram && (
                      <a
                        href={settings.messengerLinks.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                        aria-label="Telegram"
                      >
                        <img src={telegramIcon} alt="Telegram" className="w-12 h-12 object-contain" />
                      </a>
                    )}
                    {settings.messengerLinks?.viber && (
                      <a
                        href={settings.messengerLinks.viber}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                        aria-label="Viber"
                      >
                        <img src={viberIcon} alt="Viber" className="w-12 h-12 object-contain" />
                      </a>
                    )}
                  </div>
                )}

                <p className="text-slate-400 text-sm font-medium uppercase tracking-widest italic pt-2">
                  Офіційний представник в Україні
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
