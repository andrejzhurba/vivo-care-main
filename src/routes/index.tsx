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

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.195.194 1.612.163.416-.03 1.064-.432 1.213-.822.149-.391.149-1.06.1-1.172-.049-.111-.174-.186-.386-.186H17.44c-.198 0-.52-.074-.792-.372zm-3.497 7.617c-.297.148-1.758.868-2.03.968-.273.099-.471.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.195.194 1.612.163.416-.03 1.064-.432 1.213-.822.149-.391.149-1.06.1-1.172-.049-.111-.174-.186-.386-.186H13.975c-.198 0-.52-.074-.792-.372z" />
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.366 11.132c-.19.692-.697 1.202-1.392 1.202-.825 0-1.449-.748-1.387-1.564l.678-2.678-2.14-5.136-2.367 11.132c-.191.692-.697 1.202-1.392 1.202-.825 0-1.449-.748-1.387-1.564l.678-2.678-2.14-5.136-2.367 11.132c-.19.692-.697 1.202-1.392 1.202-.825 0-1.449-.748-1.387-1.564l.678-2.678L3.698 9.75c.19-.691.697-1.202 1.392-1.202.825 0 1.449.748 1.387 1.564L4.5 11.25l2.14-5.136 2.367-11.132c.19-.692.697-1.202 1.392-1.202.825 0 1.449.748 1.387 1.564L8.918 7.5l-4.72 3.132c.19-.001.37-.001.548-.001.825 0 1.449.748 1.387 1.564L5.133 13.5l2.14 5.136 2.367-11.132c.19-.692.697-1.202 1.392-1.202.825 0 1.449.748 1.387 1.564L9.4 10.632l4.72-3.132c-.19.001-.37.001-.548.001-.825 0-1.449-.748-1.387-1.564L13.537 4.5l-2.14 5.136-2.367 11.132c-.191.692-.697 1.202-1.392 1.202-.825 0-1.449-.748-1.387-1.564L8.918 14.25 12 9.114l2.14 5.136 2.14-5.136 2.14 5.136-2.14 5.136L17.562 3.5c.062-.816-.562-1.564-1.386-1.564-.825 0-1.449-.748-1.387-1.564L15.367 1.75l-2.367 11.132c-.191.692-.697 1.202-1.392 1.202-.825 0-1.449-.748-1.387-1.564L12.237 9.914 10.097 4.778l4.72 3.132c-.19.001-.37.001-.548.001z" />
  </svg>
);

const ViberIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.092 1.152c-.936-.006-2.041.172-3.018.688-.977.517-1.713 1.343-2.404 2.404-.345.531-.672 1.165-.938 1.752-.266-.587-.593-1.221-.938-1.752-.691-1.061-1.427-1.887-2.404-2.404-.977-.516-2.082-.694-3.018-.688C1.54 1.156.058 2.694.058 12.27c0 6.616 4.582 11.636 8.31 12.67.404.154.855.232 1.306.232.225 0 .449-.019.672-.056.666-.111 1.788-.449 2.675-.849 1.633-.738 2.379-1.523 2.379-1.523l-.173-.249s-.601-.632-1.548-1.185c-.473-.277-1.154-.447-1.154-.447-.226.379-.523.903-.879 1.424-.356.521-.777.977-1.235 1.329-.458.352-.927.614-1.367.772-.441.158-.903.235-1.306.219-.886-.035-1.729-.442-2.458-1.164-.729-.722-1.129-1.572-1.164-2.458-.017-.403.061-.865.219-1.306.158-.44.42-.909.772-1.367.352-.458.808-.879 1.329-1.235.521-.356 1.045-.653 1.424-.879 0 0-.17-.681-.447-1.154-.553-.947-1.185-1.548-1.185-1.548l-.249-.173s-.785.746-1.523 1.379c-.4.887-.738 2.009-.849 2.675-.037.223-.056.447-.056.672 0 .451.078.902.232 1.306C7.634 19.37 11.654 24 18.27 24c9.576 0 11.114-1.482 11.114-2.248-.006-.936-.172-2.041-.688-3.018-.516-.977-1.343-1.713-2.404-2.404-.531-.345-1.165-.672-1.752-.938-.587.266-1.221.593-1.752.938-1.061.691-1.887 1.427-2.404 2.404-.516.977-.694 2.082-.688 3.018z" />
  </svg>
);

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
                        className="p-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                        aria-label="WhatsApp"
                      >
                        <WhatsAppIcon className="w-6 h-6 text-white" />
                      </a>
                    )}
                    {settings.messengerLinks?.telegram && (
                      <a
                        href={settings.messengerLinks.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#0088cc] rounded-full hover:bg-[#0077b5] transition-colors"
                        aria-label="Telegram"
                      >
                        <TelegramIcon className="w-6 h-6 text-white" />
                      </a>
                    )}
                    {settings.messengerLinks?.viber && (
                      <a
                        href={settings.messengerLinks.viber}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#665cac] rounded-full hover:bg-[#7c6fbe] transition-colors"
                        aria-label="Viber"
                      >
                        <ViberIcon className="w-6 h-6 text-white" />
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
