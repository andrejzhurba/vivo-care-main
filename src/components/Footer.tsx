import { Link } from "@tanstack/react-router";
import { getSettings, type CMSSettings } from "@/lib/cms";
import { useState, useEffect } from "react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.185-.573c.948.517 2.048.79 3.144.791 3.18 0 5.767-2.587 5.768-5.766.001-3.18-2.587-5.767-5.766-5.767zm3.391 8.205c-.142.405-.815.741-1.121.78-.305.039-.58.05-.989-.082-.244-.078-.546-.174-.925-.337-1.611-.692-2.659-2.333-2.739-2.439-.081-.106-.656-.874-.656-1.648 0-.774.405-1.154.546-1.307.142-.154.305-.193.405-.193s.203.003.293.01c.099.006.231-.038.362.277.132.314.453 1.104.493 1.187.04.082.066.178.013.284-.053.106-.08.174-.158.265-.078.091-.164.153-.234.241-.077.098-.158.203-.069.356.09.153.398.656.854 1.061.588.522 1.083.684 1.237.761.154.077.244.066.334-.038.09-.105.385-.451.488-.604.102-.153.203-.128.344-.077.142.05.897.423 1.05.499.152.076.253.114.291.178.038.064.038.37-.104.775zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 16.2c-1.108 0-2.187-.291-3.132-.843l-3.376.885.9-3.285c-.604-.954-.922-2.062-.921-3.201.002-3.328 2.711-6.036 6.039-6.036 1.612 0 3.128.628 4.267 1.769a6.001 6.001 0 011.77 4.27c-.002 3.328-2.711 6.036-6.038 6.036-.003.004-.006.007-.009.004z" />
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

const ViberIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.067 1.954c-.11-.044-.216-.073-.346-.088-.135-.015-.27-.015-.407-.015-1.48.01-2.956.036-4.436.06-.98.017-1.958.04-2.936.06-.275.006-.554.01-.83.033-.41.035-.82.096-1.225.18-.3.064-.59.146-.88.24-.264.085-.522.18-.776.29-.533.228-1.04.52-1.52.87-.243.17-.478.36-.7.564-.23.2-.443.415-.644.646l-.004-.004C.99 7.243.04 10.37.04 13.59c0 .61.05 1.22.15 1.815.15.894.465 1.764.915 2.56.244.428.535.83.87 1.2.213.235.445.454.69.658l.006.006c.245.203.504.385.776.547.46.273.945.493 1.45.656.333.11.674.194 1.02.253.273.045.55.074.825.088.138.006.275.01.413.01h.436c.22 0 .44-.004.658-.01.218-.008.435-.022.653-.04.434-.038.86-.11 1.28-.216.4-.1.794-.234 1.176-.4l.006.006c.205-.09.405-.188.6-.296.67-.37 1.284-.844 1.83-1.404.34-.35.65-.72.93-1.12.063-.092.124-.185.182-.28.16-.255.304-.52.433-.79.082-.172.155-.347.223-.526.04-.103.076-.207.11-.312.067-.21.123-.423.17-.64.03-.135.056-.27.08-.407.014-.103.027-.206.038-.31.02-.21.034-.42.043-.632.01-.22.015-.438.015-.658 0-3.34-.997-6.556-2.825-9.145zm-1.875 11.233c-.092.174-.21.334-.35.474l-.006.006c-.16.16-.34.296-.534.408-.344.204-.717.34-1.11.414-.4.075-.812.094-1.22.054-.3-.028-.59-.09-.87-.184-.19-.06-.37-.14-.543-.243l-.014-.008-.014-.008-.004-.002-.016-.01-.1-.06-.344-.22c-.104-.067-.204-.142-.3-.223-.082-.07-.16-.144-.236-.222-.047-.047-.09-.1-.132-.15l-.01-.012c-.04-.047-.077-.095-.112-.146-.11-.16-.204-.33-.284-.51-.08-.184-.14-.376-.184-.572-.03-.136-.05-.275-.06-.414-.02-.213-.026-.427-.02-.642.006-.214.02-.428.046-.64.032-.262.083-.522.154-.775.055-.195.127-.384.214-.564.043-.09.09-.178.143-.263.142-.23.313-.44.512-.622.033-.03.068-.06.104-.088l.006-.006c.036-.027.073-.053.11-.077.2-.132.413-.242.636-.328.334-.13.684-.214 1.04-.253.27-.03.543-.042.815-.035.137.004.274.013.41.03.4.047.788.163 1.15.343.34.17.65.4.92.678.117.117.224.246.32.383.085.12.162.246.23.376.1.187.182.383.245.584.07.227.116.46.14.697.027.27.033.54.02.812-.014.27-.05.54-.112.804-.085.367-.234.717-.442 1.032z" />
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
                  className="p-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-6 h-6 text-white" />
                </a>
              )}
              {messengers.telegram && (
                <a
                  href={messengers.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0088cc] rounded-full hover:bg-[#0077b5] transition-colors"
                  aria-label="Telegram"
                >
                  <TelegramIcon className="w-6 h-6 text-white" />
                </a>
              )}
              {messengers.viber && (
                <a
                  href={messengers.viber}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#665cac] rounded-full hover:bg-[#7c6fbe] transition-colors"
                  aria-label="Viber"
                >
                  <ViberIcon className="w-6 h-6 text-white" />
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
