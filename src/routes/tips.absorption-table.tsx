import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClipboardList, Droplets, Info } from "lucide-react";

export const Route = createFileRoute("/tips/absorption-table")({
  head: () => ({
    meta: [
      { title: "Таблиця поглинання пелюшок та підгузків Vivo Care — Повний гід" },
      {
        name: "description",
        content:
          "Порівняйте рівень поглинання різних розмірів підгузків-трусів та пелюшок Vivo Care. Дізнайтеся, скільки мілілітрів рідини утримує кожен виріб.",
      },
    ],
  }),
  component: AbsorptionTablePage,
});

function AbsorptionTablePage() {
  const diaperData = [
    { size: "S (Small)", ml: "1200 мл", drops: 6, usage: "Денне/Нічне" },
    { size: "M (Medium)", ml: "1400 мл", drops: 7, usage: "Денне/Нічне" },
    { size: "L (Large)", ml: "1600 мл", drops: 7, usage: "Денне/Нічне" },
    { size: "XL (Extra Large)", ml: "1800 мл", drops: 8, usage: "Нічне/Посилене" },
    { size: "XXL (XX Large)", ml: "2000 мл", drops: 8, usage: "Нічне/Посилене" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Header />

      <main className="pt-32 pb-20">
        <article className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ClipboardList className="text-blue-600 w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Таблиця поглинання <br />
              <span className="text-blue-600">продукції Vivo Care</span>
            </h1>
            <p className="text-xl text-slate-500 font-light italic">
              Максимальна впевненість у кожній краплі
            </p>
          </div>

          <section className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Droplets className="text-blue-500" />
              Підгузки-труси
            </h2>
            <div className="overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="py-6 px-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
                      Розмір
                    </th>
                    <th className="py-6 px-8 text-sm font-bold text-slate-400 uppercase tracking-widest text-center">
                      Об'єм (мл)
                    </th>
                    <th className="py-6 px-8 text-sm font-bold text-slate-400 uppercase tracking-widest text-center">
                      Режим
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {diaperData.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-6 px-8 font-bold text-slate-900">{row.size}</td>
                      <td className="py-6 px-8 text-center text-blue-600 font-black text-xl">
                        {row.ml}
                      </td>
                      <td className="py-6 px-8 text-center">
                        <span className="px-4 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 uppercase tracking-tighter">
                          {row.usage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Droplets className="text-blue-500" />
              Поглинаючі пелюшки
            </h2>
            <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Стандарт 60х90 см</h3>
                  <p className="text-slate-500 font-light">
                    Ідеально для захисту ліжка, крісла або при перевдяганні.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-black text-blue-600 mb-1">8 / 10</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Рівень захисту
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                <Info className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Як працює поглинання?</h3>
                <p className="text-slate-400 leading-relaxed font-light text-lg">
                  В основі продукції Vivo Care лежить сучасний суперабсорбент (SAP). Він не просто
                  вбирає рідину, а миттєво перетворює її на гель, блокуючи вологу та запах
                  всередині. Це забезпечує сухість поверхні навіть під тиском тіла.
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
