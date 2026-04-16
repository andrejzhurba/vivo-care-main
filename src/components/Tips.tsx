import { Link } from "@tanstack/react-router";
import { BookOpen, Heart, Info, ClipboardList } from "lucide-react";

const tips = [
  {
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    title: "5 порад щодо догляду за шкірою",
    desc: "Як запобігти подразненням та пролежням при використанні підгузків.",
    link: "/tips/skin-care",
  },
  {
    icon: <ClipboardList className="w-6 h-6 text-blue-500" />,
    title: "Таблиця поглинання пелюшок",
    desc: "Порівняльний аналіз поглинальної здатності різних видів пелюшок.",
    link: "/tips/absorption-table",
  },
  {
    icon: <Info className="w-6 h-6 text-green-500" />,
    title: "Як правильно обрати розмір?",
    desc: "Детальна інструкція із замірів для ідеальної посадки підгузка-трусів.",
    link: "/tips/size-guide",
  },
];

export function Tips() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Корисна інформація
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Поради та статті
          </h2>
          <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tips.map((tip, i) => (
            <div 
              key={i} 
              className="p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all group"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {tip.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {tip.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                {tip.desc}
              </p>
              <Link 
                to={tip.link as any}
                className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
              >
                Читати повністю <BookOpen className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
