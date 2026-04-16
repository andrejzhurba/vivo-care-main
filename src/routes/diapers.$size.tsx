import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhereToBuy } from "@/components/WhereToBuy";
import { useState, useEffect } from "react";
import { getSettings, type CMSSettings, type DiaperSize } from "@/lib/cms";
import { CheckCircle2, Droplets, ShieldCheck, Activity, Wind, Timer, Ban } from "lucide-react";

// Імпорт зображень розмірів
import diapersS from "@/assets/diapers-S.png";
import diapersM from "@/assets/diapers-M.png";
import diapersL from "@/assets/diapers-L.png";
import diapersXL from "@/assets/diapers-XL.png";
import diapersXXL from "@/assets/diapers-XXL.png";

const sizeImageMap: Record<string, string> = {
  S: diapersS,
  M: diapersM,
  L: diapersL,
  XL: diapersXL,
  XXL: diapersXXL,
};

export const Route = createFileRoute("/diapers/$size")({
  component: DiaperDetailPage,
});

function DiaperDetailPage() {
  const [settings, setSettings] = useState<CMSSettings | null>(null);
  const [sizeData, setSizeData] = useState<DiaperSize | null>(null);
  const sizeId = Route.useParams().size;

  useEffect(() => {
    async function load() {
      const data = await getSettings();
      setSettings(data);
      const found = data.diaperSizes.find((s) => s.id === sizeId);
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

  const image = sizeData.images?.[0] || sizeImageMap[sizeId] || diapersM;
  const features =
    sizeData.features && sizeData.features.length > 0
      ? sizeData.features.filter((f) => f.trim() !== "")
      : [
          "Еластичний пояс 360°",
          "Висока поглинальна здатність",
          "Захист від протікань",
          "Дихаючий матеріал",
          "Індикатор вологості",
          "Нейтралізація запаху",
        ];

  const qty = sizeData.qty || "30 шт";
  const brand = sizeData.brand || "Vivo Care";
  const type = sizeData.type || "підгузки-трусики (pull-up)";
  const fit = sizeData.fit || "еластичний пояс 360°";
  const specialties = sizeData.specialties || "дихаючі, індикатор, запах";

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
                  alt={`Підгузки-трусики ${brand} розмір ${sizeData.name} (${sizeData.id}) — упаковка ${qty}`}
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                  loading="eager"
                />
              </div>
              <div className="lg:w-1/2 text-center lg:text-left">
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  Розмір {sizeData.id}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  Підгузки-трусики <br />
                  <span className="text-blue-600">{brand}</span>
                </h1>
                <p className="text-xl text-slate-600 mb-2 font-medium">
                  Розмір {sizeData.name} ({sizeData.id})
                </p>
                <p className="text-lg text-slate-500 mb-6 font-light">
                  {sizeData.description ||
                    "Комфортні підгузки-трусики для дорослих з еластичним поясом 360°"}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold">
                    {qty} в упаковці
                  </span>
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                    {sizeData.drops || 9} крапель
                  </span>
                </div>

                {/* Size Info */}
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0 text-left">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Обхват талії
                    </p>
                    <p className="font-bold text-slate-900">{sizeData.waist || "75-100 см"}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Вага
                    </p>
                    <p className="font-bold text-slate-900">{sizeData.weight || "55-85 кг"}</p>
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
                    Завдяки анатомічній посадці та м'яким еластичним манжетам підгузки-трусики щільно
                    прилягають до тіла, не сковують рухів і допомагають зменшити ризик протікань.
                  </p>
                  <p>
                    Матеріал, що дихає, зменшує ризик подразнень, а вбираючий шар швидко поглинає
                    вологу та сприяє відчуттю сухості. Зручний формат трусиків дозволяє легко
                    одягати та знімати виріб як самостійно, так і під час догляду.
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
              Рекомендації щодо вибору розміру
            </h2>
            <div className="max-w-xl mx-auto bg-blue-50 p-8 rounded-[2rem] text-center">
              <p className="text-slate-600 mb-4">
                <span className="font-bold">Розмір:</span> {sizeData.name} ({sizeData.id})
              </p>
              <p className="text-slate-600 mb-4">
                <span className="font-bold">Рекомендована вага:</span> {sizeData.weight}
              </p>
              <p className="text-slate-600 mb-6">
                <span className="font-bold">Обхват талії:</span> {sizeData.waist}
              </p>
              <div className="text-sm text-slate-400 italic whitespace-pre-line">
                {sizeData.recommendations ||
                  "Якщо ваші параметри знаходяться між двома розмірами, рекомендується обирати більший розмір для комфорту."}
              </div>
            </div>
          </div>
        </section>

        {/* Характеристики */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Характеристики</h2>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-[2rem] shadow-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="py-3 border-b border-slate-100">
                  <span className="text-slate-500">Тип</span>
                  <span className="block font-bold text-slate-900">{type}</span>
                </div>
                <div className="py-3 border-b border-slate-100">
                  <span className="text-slate-500">Призначення</span>
                  <span className="block font-bold text-slate-900">для дорослих</span>
                </div>
                <div className="py-3 border-b border-slate-100">
                  <span className="text-slate-500">Бренд</span>
                  <span className="block font-bold text-slate-900">{brand}</span>
                </div>
                <div className="py-3 border-b border-slate-100">
                  <span className="text-slate-500">Розмір</span>
                  <span className="block font-bold text-slate-900">
                    {sizeData.name} ({sizeData.id})
                  </span>
                </div>
                <div className="py-3 border-b border-slate-100">
                  <span className="text-slate-500">Кількість</span>
                  <span className="block font-bold text-slate-900">{qty}</span>
                </div>
                <div className="py-3 border-b border-slate-100">
                  <span className="text-slate-500">Посадка</span>
                  <span className="block font-bold text-slate-900">{fit}</span>
                </div>
                <div className="py-3 border-b border-slate-100">
                  <span className="text-slate-500">Поглинання</span>
                  <span className="block font-bold text-slate-900">
                    {sizeData.drops || 9} крапель
                  </span>
                </div>
                <div className="py-3 border-b border-slate-100">
                  <span className="text-slate-500">Особливості</span>
                  <span className="block font-bold text-slate-900">{specialties}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Де купити */}
        <div className="bg-slate-900 py-10">
          <WhereToBuy links={settings.diaperStores[sizeId] || settings.stores} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
