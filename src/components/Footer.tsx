import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="section-navy mt-auto">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold">VIVO Care</h3>
            <p className="text-sm mt-1 opacity-70 italic">Офіційний представник в Україні</p>
            <p className="text-[10px] mt-4 opacity-50 uppercase tracking-widest leading-relaxed">
              Київ, Україна • Доставка по всій країні <br />
              info@vivocare.com.ua • +38 (067) 123-45-67
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm">
            <Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">Головна</Link>
            <Link to="/diapers" className="opacity-70 hover:opacity-100 transition-opacity">Підгузки-труси</Link>
            <Link to="/underpads" className="opacity-70 hover:opacity-100 transition-opacity">Пелюшки</Link>
            <Link to="/where-to-buy" className="opacity-70 hover:opacity-100 transition-opacity">Де купити</Link>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-[oklch(1_0_0/0.1)] text-xs opacity-50 text-center">
          © {new Date().getFullYear()} VIVO Care. Усі права захищено.
        </div>
      </div>
    </footer>
  );
}
