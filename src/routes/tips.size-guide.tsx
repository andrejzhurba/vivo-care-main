import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Ruler, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/tips/size-guide")({
  head: () => ({
    meta: [
      { title: "Як правильно обрати розмір підгузків-трусів? — Інструкція VIVO Care" },
      {
        name: "description",
        content: "Детальна інструкція із замірів для вибору ідеального розміру підгузків-трусів для дорослих. Таблиця розмірів S, M, L, XL, XXL.",
      },
    ],
  }),
  component: SizeGuidePage,
});

function SizeGuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Header />

      <main className="pt-32 pb-20">
        <article className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Ruler className="text-green-600 w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Як правильно обрати розмір <br />
              <span className="text-blue-600">підгузків-трусів?</span>
            </h1>
            <p className="text-xl text-slate-500 font-light italic">Комфорт починається з точних замірів</p>
          </div>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Чому розмір такий важливий?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-red-50 border border-red-100">
                <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Якщо замалий:
                </h3>
                <p className="text-red-700 text-sm">Натирає шкіру, обмежує рухи, спричиняє дискомфорт та подразнення через погану циркуляцію повітря.</p>
              </div>
              <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100">
                <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Якщо завеликий:
                </h3>
                <p className="text-orange-700 text-sm">Погано прилягає до тіла, що призводить до протікань, навіть якщо виріб має високу поглинальну здатність.</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Як робити заміри?</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Замір талії</h3>
                  <p className="text-slate-600">Виміряйте обхват талії сантиметровою стрічкою на рівні пупка.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Замір стегон</h3>
                  <p className="text-slate-600">Виміряйте обхват стегон у найширшій їх частині.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Вибір результату</h3>
                  <p className="text-slate-600 font-bold">Важливо! Орієнтуйтеся на більший із двох отриманих показників.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Таблиця розмірів VIVO Care</h2>
            <div className="overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-6 px-8 text-sm font-bold text-slate-400 uppercase tracking-widest">Розмір</th>
                    <th className="py-6 px-8 text-sm font-bold text-slate-400 uppercase tracking-widest text-center">Обхват (см)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { s: "S (Small)", v: "60 - 90 см" },
                    { s: "M (Medium)", v: "80 - 110 см" },
                    { s: "L (Large)", v: "100 - 135 см" },
                    { s: "XL (Extra Large)", v: "120 - 155 см" },
                    { s: "XXL (Extra Extra Large)", v: "135 - 170 см" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-6 px-8 font-bold text-slate-900">{row.s}</td>
                      <td className="py-6 px-8 text-center text-blue-600 font-black text-xl">{row.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-blue-600 w-5 h-5" /> Корисна порада
            </h3>
            <p className="text-blue-800 font-light">
              Якщо ваші заміри знаходяться на межі двох розмірів (наприклад, рівно 110 см), ми рекомендуємо обрати більший розмір (L замість M). 
              Це забезпечить кращу циркуляцію повітря та уникне надмірного тиску на шкіру.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
