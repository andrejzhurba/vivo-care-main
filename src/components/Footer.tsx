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
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.366 11.132c-.19.692-.697 1.202-1.392 1.202-.825 0-1.449-.748-1.387-1.564l.678-2.678-2.14-5.136-2.367 11.132c-.191.692-.697 1.202-1.392 1.202-.825 0-1.449-.748-1.387-1.564l.678-2.678-2.14-5.136-2.367 11.132c-.19.692-.697 1.202-1.392 1.202-.825 0-1.449-.748-1.387-1.564l.678-2.678L3.698 9.75c.19-.691.697-1.202 1.392-1.202.825 0 1.449.748 1.387 1.564L4.5 11.25l2.14-5.136 2.367-11.132c.19-.692.697-1.202 1.392-1.202.825 0 1.449.748 1.387 1.564L8.918 7.5l-4.72 3.132c.19-.001.37-.001.548-.001.825 0 1.449.748 1.387 1.564L5.133 13.5l2.14 5.136 2.367-11.132c.19-.692.697-1.202 1.392-1.202.825 0 1.449.748 1.387 1.564L9.4 10.632l4.72-3.132c-.19.001-.37.001-.548.001-.825 0-1.449-.748-1.387-1.564L13.537 4.5l-2.14 5.136-2.367 11.132c-.191.692-.697 1.202-1.392 1.202-.825 0-1.449-.748-1.387-1.564L8.918 14.25 12 9.114l2.14 5.136 2.14-5.136 2.14 5.136-2.14 5.136L17.562 3.5c.062-.816-.562-1.564-1.386-1.564-.825 0-1.449-.748-1.387-1.564L15.367 1.75l-2.367 11.132c-.191.692-.697 1.202-1.392 1.202-.825 0-1.449-.748-1.387-1.564L12.237 9.914 10.097 4.778l4.72 3.132c-.19.001-.37.001-.548.001z" />
  </svg>
);

const ViberIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.092 1.152c-.936-.006-2.041.172-3.018.688-.977.517-1.713 1.343-2.404 2.404-.345.531-.672 1.165-.938 1.752-.266-.587-.593-1.221-.938-1.752-.691-1.061-1.427-1.887-2.404-2.404-.977-.516-2.082-.694-3.018-.688C1.54 1.156.058 2.694.058 12.27c0 6.616 4.582 11.636 8.31 12.67.404.154.855.232 1.306.232.225 0 .449-.019.672-.056.666-.111 1.788-.449 2.675-.849 1.633-.738 2.379-1.523 2.379-1.523l-.173-.249s-.601-.632-1.548-1.185c-.473-.277-1.154-.447-1.154-.447-.226.379-.523.903-.879 1.424-.356.521-.777.977-1.235 1.329-.458.352-.927.614-1.367.772-.441.158-.903.235-1.306.219-.886-.035-1.729-.442-2.458-1.164-.729-.722-1.129-1.572-1.164-2.458-.017-.403.061-.865.219-1.306.158-.44.42-.909.772-1.367.352-.458.808-.879 1.329-1.235.521-.356 1.045-.653 1.424-.879 0 0-.17-.681-.447-1.154-.553-.947-1.185-1.548-1.185-1.548l-.249-.173s-.785.746-1.523 1.379c-.4.887-.738 2.009-.849 2.675-.037.223-.056.447-.056.672 0 .451.078.902.232 1.306C7.634 19.37 11.654 24 18.27 24c9.576 0 11.114-1.482 11.114-2.248-.006-.936-.172-2.041-.688-3.018-.516-.977-1.343-1.713-2.404-2.404-.531-.345-1.165-.672-1.752-.938-.587.266-1.221.593-1.752.938-1.061.691-1.887 1.427-2.404 2.404-.516.977-.694 2.082-.688 3.018z" />
  </svg>
);

export function Footer() {
  const [settings, setSettings] = useState<CMSSettings | null>(null);

  useEffect(() => {
    setSettings(getSettings());
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
