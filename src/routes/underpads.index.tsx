import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhereToBuy, BuyDropdown } from "@/components/WhereToBuy";
import { CheckCircle2, Droplets, ShieldCheck, Activity, Wind, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { getSettings, type CMSSettings } from "@/lib/cms";

// Імпорт зображення
import underpadImg from "@/assets/underpads-product.png";

export const Route = createFileRoute("/underpads/")({
  head: () => ({
    meta: [
      { title: "Vivo Care — Поглинаючі пелюшки: надійний захист та гігієна" },
      {
        name: "description",
        content:
          "Поглинаючі пелюшки Vivo Care. 5 шарів захисту, гіпоалергенні, з вологонепроникним шаром. Ідеальні для догляду за дорослими та дітьми.",
      },
      { property: "og:title", content: "Vivo Care — Поглинаючі пелюшки" },
      {
        property: "og:description",
        content: "Надійний гігієнічний захист для будь-яких поверхонь. 5 шарів безпеки.",
      },
    ],
  }),
  component: UnderpadsPage,
});

const advantages = [
  {
    icon: <Droplets className="w-5 h-5 text-blue-500" />,
    title: "5 шарів поглинання",
    desc: "Абсорбуючий шар з SAP миттєво перетворює рідину на гель",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-blue-500" />,
    title: "100% захист від протікання",
    desc: "Водонепроникна основа утримує вологу",
  },
  {
    icon: <Activity className="w-5 h-5 text-blue-500" />,
    title: "Гіпоалергенний",
    desc: "М'який нетканий верхній шар для чутливої шкіри",
  },
  {
    icon: <Wind className="w-5 h-5 text-blue-500" />,
    title: "Tissue layers",
    desc: "Рівномірний розподіл вологи — не збивається в грудки",
  },
  {
    icon: <Heart className="w-5 h-5 text-blue-500" />,
    title: "Odour Free",
    desc: "Нейтралізація запаху — без неприємних ароматів",
  },
];

import { FAQ } from "@/components/FAQ";

const underpadFaqs = [
  {
    question: "Чи підходять пелюшки Vivo Care для догляду за лежачими хворими?",
    answer:
      "Так, поглинаючі пелюшки Vivo Care спеціально розроблені для професійного догляду за лежачими хворими. Вони мають 5 шарів захисту, що забезпечує надійне утримання вологи та захист постільної білизни від протікань.",
  },
  {
    question: "Чи можна використовувати ці пелюшки для дітей?",
    answer:
      "Так, пелюшки Vivo Care гіпоалергенні та виготовлені з м'яких матеріалів, тому вони безпечні для ніжної шкіри немовлят під час перевдягання або повітряних ванн.",
  },
  {
    question: "Який рівень поглинання мають пелюшки?",
    answer:
      "Наші пелюшки мають високий рівень поглинання (8 з 10), що дозволяє їм швидко вбирати значну кількість рідини, залишаючи поверхню сухою.",
  },
];

const usageApplications = [
  { title: "Захист постільної білизни та меблів" },
  { title: "Під час медичних оглядів та маніпуляцій" },
  { title: "При зміні підгузків" },
  { title: "Для пацієнтів у інвалідних візках" },
  { title: "Догляд за домашніми тваринами" },
  { title: "Післяопераційний період" },
];

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function UnderpadsPage() {
  const [settings, setSettings] = useState<CMSSettings | null>(null);

  useEffect(() => {
    async function load() {
      setSettings(await getSettings());
    }
    load();
  }, []);

  const underpadSizes = settings?.underpadSizes || [];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  Преміальна серія
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                  Пелюшки поглинаючі <br />
                  <span className="text-blue-600">Vivo Care</span>
                </h1>
                <p className="text-lg text-slate-600 mb-10 font-light leading-relaxed max-w-xl">
                  Надійний гігієнічний захист для будь-яких поверхонь. 5 шарів безпеки для вашого
                  спокою.
                </p>
              </div>
              <div className="lg:w-1/2">
                <img
                  src={underpadImg}
                  alt="Упаковка поглинаючих пелюшок Vivo Care — 5 шарів захисту"
                  className="w-full max-w-lg mx-auto drop-shadow-2xl animate-in zoom-in duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* БЛОК РОЗМІРІВ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              Оберіть розмір
            </h2>
            <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full mb-12" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {underpadSizes.map((item) => {
                const images = item.images && item.images.length > 0 ? item.images : [underpadImg];
                return (
                  <Link
                    key={item.id}
                    to="/underpads/$size"
                    params={{ size: item.id }}
                    className="w-full max-w-sm bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 hover:border-blue-100 group flex flex-col cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">
                        {item.name}
                      </h3>
                      <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                        {item.qty}
                      </span>
                    </div>

                    <div className="mb-6">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {images.map((img, idx) => (
                            <CarouselItem key={idx}>
                              <div className="aspect-video overflow-hidden rounded-2xl flex items-center justify-center">
                                <img
                                  src={img}
                                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
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

                    <div className="text-blue-600 font-black text-5xl mb-6 tracking-tighter italic text-center">
                      {item.size}
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Рівень поглинання
                        </span>
                        <div
                          className="flex gap-1"
                          aria-label={`Рівень поглинання: ${item.absorbLevel} з 10`}
                        >
                          {Array.from({ length: 9 }).map((_, i) => (
                            <Droplets
                              key={i}
                              className="w-4 h-4 text-blue-500 fill-blue-500"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-50">
                       <span className="text-xs text-blue-600 font-medium">Детальніше →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ items={underpadFaqs} title="Питання про пелюшки" />

        {/* ПЕРЕВАГИ (Horizontal) */}
        <section className="py-20 bg-slate-50/50">
          <div className="container mx-auto px-6">
            <h2 className="sr-only">Переваги пелюшок Vivo Care</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {advantages.map((a, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 p-6 bg-white rounded-3xl shadow-sm border border-white transition-all hover:border-blue-100 group"
                >
                  <div className="shrink-0 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {a.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 leading-tight">{a.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-light">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* СФЕРИ ЗАСТОСУВАННЯ */}
        <section className="py-16 bg-blue-50/50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Призначення (Usage)
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {usageApplications.map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-700 border border-slate-200"
                >
                  {item.title}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="bg-slate-900 py-10">
        <WhereToBuy links={settings?.stores} />
      </div>

      <Footer />
    </div>
  );
}
