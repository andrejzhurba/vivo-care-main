import { Link } from "@tanstack/react-router";
import { getSettings, type CMSSettings } from "@/lib/cms";
import { useState, useEffect } from "react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.195.194 1.612.163.416-.03 1.064-.432 1.213-.822.149-.391.149-1.06.1-1.172-.049-.111-.174-.186-.386-.186H17.44c-.198 0-.52-.074-.792-.372zm-3.497 7.617c-.297.148-1.758.868-2.03.968-.273.099-.471.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.195.194 1.612.163.416-.03 1.064-.432 1.213-.822.149-.391.149-1.06.1-1.172-.049-.111-.174-.186-.386-.186H13.975c-.198 0-.52-.074-.792-.372z" />
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

const ViberIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 11c0 3.037-2.463 5.5-5.5 5.5s-5.5-2.463-5.5-5.5 2.463-5.5 5.5-5.5 5.5 2.463 5.5 5.5zm1.5-1.5V9c0-2.209-1.791-4-4-4h-.5v.5c0 1.104-.896 2-2 2s-2-.896-2-2V5H10c-2.209 0-4 1.791-4 4v.5h.5c1.104 0 2 .896 2 2s-.896 2-2 2H6v.5c0 2.209 1.791 4 4 4h.5v-.5c0-1.104.896-2 2-2s2 .896 2 2v.5h.5c2.209 0 4-1.791 4-4v-.5h-.5c-1.104 0-2-.896-2-2s.896-2 2-2h.5zm5-1.5V16c0 4.418-3.582 8-8 8s-8-3.582-8-8V8c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
  </svg>
);

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
                  className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                </a>
              )}
              {messengers.telegram && (
                <a
                  href={messengers.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#0088cc] rounded-full hover:bg-[#0077b5] transition-colors"
                  aria-label="Telegram"
                >
                  <TelegramIcon className="w-5 h-5 text-white" />
                </a>
              )}
              {messengers.viber && (
                <a
                  href={messengers.viber}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#665cac] rounded-full hover:bg-[#7c6fbe] transition-colors"
                  aria-label="Viber"
                >
                  <ViberIcon className="w-5 h-5 text-white" />
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
