import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-[#1a1c2e] text-white py-10 px-4 mt-auto">
      <div className="flex flex-col items-center text-center space-y-8">
        
        <div>
          <h2 className="text-3xl font-bold tracking-wider">VIVO Care</h2>
          <p className="text-blue-300 italic text-sm mt-1">Турбота щодня</p>
          <p className="text-[10px] opacity-70 uppercase tracking-widest mt-4">Офіційний представник в Україні</p>
        </div>

        <div className="w-full max-w-xs border-y border-white/10 py-6 space-y-4">
          <a href="tel:+380671234567" className="block text-xl font-bold text-white active:scale-95 transition-transform">
            +38 (067) 123-45-67
          </a>
          <a href="mailto:info@vivocare.com.ua" className="block text-blue-300 underline underline-offset-4">
            info@vivocare.com.ua
          </a>
          <p className="text-[11px] text-gray-400 uppercase leading-relaxed">
            Київ, Україна <br /> Доставка по всій країні
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm font-medium">
          <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">Головна</Link>
          <Link to="/diapers" className="opacity-80 hover:opacity-100 transition-opacity">Підгузки-труси</Link>
          <Link to="/underpads" className="opacity-80 hover:opacity-100 transition-opacity">Пелюшки</Link>
          <Link to="/where-to-buy" className="opacity-80 hover:opacity-100 transition-opacity">Де купити</Link>
          <a href="/#contacts" className="opacity-80 hover:opacity-100 transition-opacity col-span-2 underline decoration-blue-500">Контакти</a>
        </div>

        <div className="pt-4">
          <img src="/QR.png" alt="QR" className="w-20 h-20 bg-white p-1 rounded-lg mx-auto shadow-inner" />
          <p className="text-[9px] mt-2 opacity-40 uppercase tracking-tighter">vivocare.com.ua</p>
        </div>

        <div className="text-[10px] opacity-30 pt-4">
          © {new Date().getFullYear()} VIVO Care. Усі права захищено.
        </div>
      </div>
    </footer>
  );
}
