import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhereToBuy } from "@/components/WhereToBuy";
import { useState, useEffect } from "react";
import { getSettings, type CMSSettings, type UnderpadSize } from "@/lib/cms";
import { CheckCircle2, Droplets, ShieldCheck, Activity, Wind, Heart } from "lucide-react";

// Імпорт зображення
import underpadImg from "@/assets/underpads-product.png";

export const Route = createFileRoute("/underpads/$size")({
  component: UnderpadDetailPage,
});

function UnderpadDetailPage() {
  const [settings, setSettings] = useState<CMSSettings | null>(null);
  const [sizeData, setSizeData] = useState<UnderpadSize | null>(null);
  const sizeId = Route.useParams().size;

  useEffect(() => {
    async function load() {
      const data = await getSettings();
      setSettings(data);
      const found = data.underpadSizes.find((s) => s.id === sizeId);
      setSizeData(found || null);
    }
    load();
  }, [sizeId]);

  if (!sizeData || !settings) {
    return (
      <div className="flex flex-col min-h-screen bg-white font-sans">
        <Header />
        <div className="flex-grow flex items-center justify-center py-20">
          <p>Завантаження...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const image = sizeData.images?.[0] || underpadImg;
  const features =
    sizeData.features && sizeData.features.length > 0
      ? sizeData.features.filter((f) => f.trim() !== "")
      : [
          "5 шарів поглинання",
          "100% захист від протікання",
          "Гіпоалергенний",
          "Tissue layers (рівномірний розподіл)",
          "Odour Free (нейтралізація запаху)",
        ];

  const qty = sizeData.qty || "30 шт";
  const brand = sizeData.brand || "Vivo Care";
  const type = sizeData.type || "поглинаючі пелюшки";
  const fit = sizeData.fit || "5 шарів захисту";
  const specialties = sizeData.specialties || "SAP + розпушена целюлоза";

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />

      <main>
        {/* Hero */}
        <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <img
                  src={image}
                  alt={`Пелюшки ${brand} розмір ${sizeData.size} — упаковка ${qty}`}
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                  loading="eager"
                />
              </div>
              <div className="lg:w-1/2 text-center lg:text-left">
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  Розмір {sizeData.size}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  Пелюшки поглинаючі <br />
                  <span className="text-blue-600">{brand}</span>
                </h1>
                <p className="text-xl text-slate-600 mb-2 font-medium">
                  {sizeData.name} ({sizeData.size})
                </p>
                <p className="text-lg text-slate-500 mb-6 font-light">
                  {sizeData.description ||
                    "Надійний гігієнічний захист для будь-яких поверхонь. 5 шарів безпеки."}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold">
                    {qty} в упаковці
                  </span>
                  <div className="bg-blue-50 px-4 py-2 rounded-full flex gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <Droplets key={i} className="w-4 h-4 text-blue-500 fill-blue-500" />
                    ))}
                  </div>
                </div>

                {/* Size Info */}
                <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto lg:mx-0 text-left">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Розмір
                    </p>
                    <p className="font-bold text-slate-900">{sizeData.size}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Переваги */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">Переваги</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <span className="font-medium text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Комфорт */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Комфорт у користуванні
            </h2>
            <div className="max-w-3xl mx-auto text-slate-600 space-y-4 font-light text-center whitespace-pre-line">
              {sizeData.comfortText || (
                <>
                  <p>
                    Поглинаючі пелюшки Vivo Care забезпечують надійний захист постелі та інших
                    поверхонь. Завдяки 5-шаровій структурі рідина швидко поглинається та
                    перетворюється на гель.
                  </p>
                  <p>
                    Верхній гіпоалергенний шар залишається сухим, що запобігає появі подразнень на
                    шкірі. Ідеально підходять для зміни підгузків, медичних маніпуляцій та догляду
                    за лежачими хворими.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Рекомендації */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Рекомендації щодо використання
            </h2>
            <div className="max-w-xl mx-auto bg-blue-50 p-8 rounded-[2rem] text-center">
              <p className="text-slate-600 mb-4">
                <span className="font-bold">Модель:</span> {sizeData.name}
              </p>
              <p className="text-slate-600 mb-6">
                <span className="font-bold">Розмір:</span> {sizeData.size}
              </p>
              <div className="text-sm text-slate-400 italic whitespace-pre-line">
                {sizeData.recommendations ||
                  "Розмістіть пелюшку на поверхні поглинаючим шаром догори. Змінюйте за потреби для підтримки гігієни."}
              </div>
            </div>
          </div>
        </section>

        {/* Характеристики (Технічний паспорт) */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                  Технічні характеристики
                </h2>
                <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full" />
              </div>

              <div className="bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                <dl className="divide-y divide-slate-200/60">
                  {[
                    { label: "Бренд", value: brand },
                    { label: "Тип", value: type },
                    { label: "Розмір", value: sizeData.size },
                    { label: "Кількість в упаковці", value: qty },
                    { label: "Поглинальна здатність", value: "9 крапель (SAP — суперабсорбент)" },
                    { label: "Структура", value: "5 шарів захисту" },
                    { label: "Особливості", value: specialties },
                    { label: "Призначення", value: "Для дорослих та дітей" },
                    { label: "Термін придатності", value: "5 років" },
                    { label: "Сертифікація", value: "ISO 9001, ISO 13485, CE" },
                  ].map((spec, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:justify-between py-5 sm:items-baseline gap-2"
                    >
                      <dt className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                        {spec.label}
                      </dt>
                      <dd className="text-slate-900 font-bold text-base sm:text-right leading-relaxed">
                        {spec.value.split(/(SAP|5 шарів)/g).map((part, idx) =>
                          part === "SAP" || part === "5 шарів" ? (
                            <span
                              key={idx}
                              className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg font-black"
                            >
                              {part}
                            </span>
                          ) : (
                            part
                          ),
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              
              <p className="text-center text-slate-400 text-xs mt-8 italic">
                * Продукція відповідає міжнародним стандартам якості та безпеки.
              </p>
            </div>
          </div>
        </section>

        {/* Де купити */}
        <div className="bg-slate-900 py-10">
          <WhereToBuy links={settings.underpadStores || settings.stores} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
