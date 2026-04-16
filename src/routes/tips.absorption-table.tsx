import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Droplets } from "lucide-react";

export const Route = createFileRoute("/tips/absorption-table")({
  head: () => ({
    meta: [
      { title: "Vivo Care — Таблиця поглинання підгузків" },
      {
        name: "description",
        content: "Порівняльна таблиця поглинальної здатності різних розмірів підгузків Vivo Care.",
      },
    ],
  }),
  component: AbsorptionTablePage,
});

function AbsorptionTablePage() {
  const absorptionData = [
    { size: "S (Small)", drops: 9, usage: "Денне/Нічне" },
    { size: "M (Medium)", drops: 9, usage: "Денне/Нічне" },
    { size: "L (Large)", drops: 9, usage: "Денне/Нічне" },
    { size: "XL (Extra Large)", drops: 9, usage: "Нічне/Посилене" },
    { size: "XXL (XX Large)", drops: 9, usage: "Нічне/Посилене" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Header />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 text-center tracking-tight">
              Таблиця <span className="text-blue-600">поглинання</span>
            </h1>

            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="p-6 font-bold text-slate-900 border-b border-slate-100">Розмір</th>
                      <th className="p-6 font-bold text-slate-900 border-b border-slate-100 text-center">Поглинання</th>
                      <th className="p-6 font-bold text-slate-900 border-b border-slate-100">Рекомендації</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {absorptionData.map((row, i) => (
                      <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                        <td className="p-6 text-slate-900 font-bold">{row.size}</td>
                        <td className="p-6">
                          <div className="flex justify-center gap-0.5">
                            {Array.from({ length: row.drops }).map((_, idx) => (
                              <Droplets key={idx} className="w-4 h-4 text-blue-500 fill-blue-500" />
                            ))}
                          </div>
                        </td>
                        <td className="p-6 text-slate-600 font-light">{row.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 bg-blue-50 rounded-[2rem] p-8 md:p-10 border border-blue-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Як розуміти таблицю?</h2>
              <div className="space-y-4 text-slate-600 font-light leading-relaxed">
                <p>
                  Поглинальна здатність підгузків-трусів Vivo Care позначається кількістю крапель. 
                  Чим більше крапель, тим більший об'єм рідини може увібрати виріб.
                </p>
                <p>
                  Всі підгузки-труси Vivo Care мають високий рівень захисту (<span className="font-bold text-blue-600">9 крапель</span>), 
                  що забезпечує спокійний сон і впевненість упродовж дня. Ми використовуємо 
                  суперабсорбент <span className="font-bold text-blue-600">SAP</span>, який миттєво перетворює рідину на гель.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
