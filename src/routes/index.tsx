import { createFileRoute, Link } from "@tanstack/react-router";
import heroBg from "@/assets/hero-bg.jpg";
import diapersImg from "@/assets/diapers-hero.jpg";
import underpadsImg from "@/assets/underpads-hero.jpg";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VIVO Care — Якісні гігієнічні засоби для дорослих" },
      { name: "description", content: "Підгузки-труси та поглинаючі пелюшки VIVO Care. Європейська якість, комфорт та надійний захист." },
      { property: "og:title", content: "VIVO Care — Якісні гігієнічні засоби для дорослих" },
      { property: "og:description", content: "Підгузки-труси та поглинаючі пелюшки VIVO Care. Європейська якість." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative gradient-hero overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          width={1920}
          height={1080}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20 md:py-28 text-center">
          <p className="text-sky-accent-light text-sm font-semibold tracking-widest uppercase mb-4">Європейська якість</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Комфорт та захист<br />на кожен день
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Підгузки-труси та поглинаючі пелюшки VIVO Care — надійні гігієнічні засоби з м'яким дихаючим матеріалом та максимальним поглинанням.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/diapers" className="btn-buy w-full sm:w-auto">
              Підгузки-труси
            </Link>
            <Link to="/underpads" className="btn-outline-hero w-full sm:w-auto">
              Пелюшки
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">Наші продукти</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/diapers" className="card-product group flex flex-col items-center text-center">
              <img src={diapersImg} alt="Підгузки-труси VIVO Care" width={300} height={300} loading="lazy" className="h-48 w-48 object-contain mb-4 group-hover:scale-105 transition-transform" />
              <h3 className="text-xl font-bold text-foreground mb-2">Підгузки-труси</h3>
              <p className="text-sm text-muted-foreground">Розміри M, L, XL, XXL — для будь-яких потреб. 30 шт в упаковці.</p>
              <span className="mt-4 text-sm font-semibold text-accent flex items-center gap-1">
                Дізнатися більше
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </Link>
            <Link to="/underpads" className="card-product group flex flex-col items-center text-center">
              <img src={underpadsImg} alt="Пелюшки поглинаючі VIVO Care" width={300} height={300} loading="lazy" className="h-48 w-48 object-contain mb-4 group-hover:scale-105 transition-transform" />
              <h3 className="text-xl font-bold text-foreground mb-2">Пелюшки поглинаючі</h3>
              <p className="text-sm text-muted-foreground">Розмір 60×90 см, 30 шт. Надійний захист поверхонь.</p>
              <span className="mt-4 text-sm font-semibold text-accent flex items-center gap-1">
                Дізнатися більше
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">Чому VIVO Care?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
              title="Надійний захист"
              description="Максимальне поглинання рідини та нейтралізація запахів протягом усього дня"
            />
            <FeatureCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>}
              title="Комфорт"
              description="М'який дихаючий матеріал, що не подразнює шкіру та забезпечує комфорт"
            />
            <FeatureCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
              title="Якість"
              description="Європейські стандарти виробництва та сертифікована продукція"
            />
            <FeatureCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>}
              title="Доступність"
              description="Представлені в мережах магазинів по всій Україні"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
