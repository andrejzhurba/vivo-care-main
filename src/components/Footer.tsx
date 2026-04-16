import { Link } from "@tanstack/react-router";
import { getSettings, type CMSSettings } from "@/lib/cms";
import { useState, useEffect } from "react";

import telegramIcon from "@/assets/Telegram.png";
import viberIcon from "@/assets/viber.png";
import whatsappIcon from "@/assets/whatsapp.png";

export function Footer() {
  const [settings, setSettings] = useState<CMSSettings | null>(null);

  useEffect(() => {
    async function load() {
      setSettings(await getSettings());
    }
    load();
  }, []);

  const phone = settings?.contactPhone || "+38 (067) 123-45-67";
  const email = settings?.contactEmail || "info@vivocare.ua";
  const messengers = settings?.messengerLinks || {};

  const formatPhoneForLink = (phone: string) => {
    return phone.replace(/[^\d+]/g, "");
  };

  return (
    <footer className="bg-[#1a1c2e] text-white py-10 px-4 mt-auto">
      <div className="flex flex-col items-center text-center space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-wider">Vivo Care</h2>
          <p className="text-blue-300 italic text-sm mt-1">Турбота щодня</p>
          <p className="text-[10px] opacity-70 uppercase tracking-widest mt-4">
            Офіційний представник в Україні
          </p>
        </div>

        <div className="w-full max-w-xs border-y border-white/10 py-6 space-y-4">
          <a
            href={`tel:${formatPhoneForLink(phone)}`}
            className="block text-xl font-bold text-white active:scale-95 transition-transform"
          >
            {phone}
          </a>
          <a href={`mailto:${email}`} className="block text-blue-300 underline underline-offset-4">
            {email}
          </a>

          {(messengers.whatsapp || messengers.telegram || messengers.viber) && (
            <div className="flex justify-center gap-4 pt-2">
              {messengers.whatsapp && (
                <a
                  href={messengers.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                  aria-label="WhatsApp"
                >
                  <img src={whatsappIcon} alt="WhatsApp" className="w-10 h-10 object-contain" />
                </a>
              )}
              {messengers.telegram && (
                <a
                  href={messengers.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                  aria-label="Telegram"
                >
                  <img src={telegramIcon} alt="Telegram" className="w-10 h-10 object-contain" />
                </a>
              )}
              {messengers.viber && (
                <a
                  href={messengers.viber}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                  aria-label="Viber"
                >
                  <img src={viberIcon} alt="Viber" className="w-10 h-10 object-contain" />
                </a>
              )}
            </div>
          )}

          <p className="text-[11px] text-gray-400 uppercase leading-relaxed">
            Київ, Україна <br /> Доставка по всій країні
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm font-medium">
          <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
            Головна
          </Link>
          <Link to="/diapers" className="opacity-80 hover:opacity-100 transition-opacity">
            Підгузки-труси
          </Link>
          <Link to="/underpads" className="opacity-80 hover:opacity-100 transition-opacity">
            Пелюшки
          </Link>
          <Link to="/where-to-buy" className="opacity-80 hover:opacity-100 transition-opacity">
            Де купити
          </Link>
          <a
            href="/#contacts"
            className="opacity-80 hover:opacity-100 transition-opacity col-span-2 underline decoration-blue-500"
          >
            Контакти
          </a>
        </div>

        <div className="text-[10px] opacity-30 pt-4">
          © {new Date().getFullYear()} Vivo Care. Усі права захищено.
        </div>
      </div>
    </footer>
  );
}
