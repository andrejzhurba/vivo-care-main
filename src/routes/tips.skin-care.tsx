import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, CheckCircle2, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/tips/skin-care")({
  head: () => ({
    meta: [
      { title: "5 порад щодо догляду за шкірою при використанні підгузків — VIVO Care" },
      {
        name: "description",
        content: "Дізнайтеся, як правильно доглядати за шкірою дорослих при використанні підгузків-трусів. Поради від VIVO Care щодо запобігання подразненням.",
      },
    ],
  }),
  component: SkinCarePage,
});

function SkinCarePage() {
  const tips = [
    {
      title: "Своєчасна заміна виробу",
      desc: "Навіть найпоглинальніший підгузок потребує регулярної заміни. Тривалий контакт шкіри з вологою є головною причиною подразнень. Орієнтуйтеся на індикатор наповнення.",
    },
    {
      title: "Правильне очищення",
      desc: "Використовуйте спеціальні очищувальні піни або вологі серветки з нейтральним pH. Уникайте частого використання звичайного мила, яке може пересушувати шкіру.",
    },
    {
      title: "Захисний бар'єр",
      desc: "Наносьте захисні креми з вмістом цинку або пантенолу на зони, що найбільш піддаються впливу вологи. Це створює невидимий шар, що захищає епідерміс.",
    },
    {
      title: "Повітряні ванни",
      desc: "При кожній заміні підгузка залишайте шкіру відкритою на 5-10 хвилин. Це дозволяє шкірі «дихати» і природним чином відновлювати захисні функції.",
    },
    {
      title: "Ідеальний розмір",
      desc: "Занадто тісний підгузок може натирати, а занадто вільний — протікати. Правильно підібраний розмір VIVO Care забезпечує оптимальну циркуляцію повітря.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Header />

      <main className="pt-32 pb-20">
        <article className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="text-pink-500 w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              5 порад щодо догляду за шкірою <br />
              <span className="text-blue-600">при використанні підгузків</span>
            </h1>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed font-light mb-12 text-center">
              Збереження здоров'я шкіри — це ключ до комфорту та гідності при використанні засобів гігієни. 
              Дотримання цих простих кроків допоможе уникнути дерматитів та пролежнів.
            </p>

            <div className="space-y-12">
              {tips.map((tip, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm font-bold text-blue-600 text-xl">
                    {i + 1}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">{tip.title}</h2>
                    <p className="text-slate-600 leading-relaxed font-light text-lg">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 p-10 rounded-[3rem] bg-blue-600 text-white shadow-xl shadow-blue-200">
              <div className="flex items-center gap-4 mb-6">
                <ShieldAlert className="w-8 h-8 text-blue-200" />
                <h3 className="text-2xl font-bold">Важливо пам'ятати</h3>
              </div>
              <p className="text-blue-50 text-lg font-light leading-relaxed mb-6">
                Якщо ви помітили стійкі почервоніння, висип або пошкодження шкіри, які не минають упродовж 24 годин — 
                обов'язково зверніться до лікаря або професійної доглядальниці.
              </p>
              <div className="flex items-center gap-3 text-blue-100 font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-300" />
                VIVO Care — з турботою про здоров'я шкіри
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
