import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VIVO Care — Турбота, яку відчуваєш" },
      { name: "description", content: "Якісні гігієнічні засоби для дорослих VIVO Care. Комфорт, захист та впевненість щодня." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero / Brand Presentation - Matches other pages with gradient-hero */}
      <section className="relative text-white py-24 px-4 overflow-hidden min-h-[500px] flex items-center gradient-hero">
        <div className="mx-auto max-w-5xl flex flex-col items-center text-center relative z-10">
          <img src={logo} alt="VIVO Care" className="h-24 md:h-32 mb-10 brightness-0 invert drop-shadow-2xl" />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight drop-shadow-lg">
            Турбота,<br /><span className="text-white underline decoration-white/20">яку відчуваєш</span>
          </h1>
          <p className="text-xl text-white max-w-2xl mb-12 leading-relaxed font-bold drop-shadow-md">
            VIVO Care створює гігієнічні засоби преміальної якості, щоб ви могли насолоджуватися кожним моментом життя з відчуттям повної впевненості та комфорту.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#products" className="bg-white text-sky-600 hover:bg-sky-50 px-10 py-4 rounded-full font-bold transition-all shadow-2xl hover:-translate-y-1">
              Дізнатися більше
            </a>
          </div>
        </div>
        
        {/* Decorative elements to add depth while matching the theme */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Future sections will go here */}
      <div id="products"></div>

      <Footer />
    </div>
  );
}
