export interface CMSSettings {
  heroSlogan: string;
  heroDescription: string;
  stores: { name: string; url: string; description?: string }[];
  contactEmail: string;
}

const DEFAULT_SETTINGS: CMSSettings = {
  heroSlogan: "Турбота щодня",
  heroDescription: "Професійні гігієнічні засоби для дорослих. Комфорт, впевненість та гідність у кожному русі.",
  stores: [
    {
      name: "Капітошка",
      url: "https://kapitoshka.kiev.ua/ua/product_list?csbss0=1128038494",
      description: "Офіційний партнер",
    },
    {
      name: "Igorek",
      url: "https://igorek.com.ua/ua/site_search?search_term=VIVO+Care",
      description: "Інтернет-магазин",
    },
    {
      name: "Prom.ua",
      url: "https://prom.ua/ua/search?search_term=VivoCare",
      description: "Маркетплейс",
    },
  ],
  contactEmail: "info@vivocare.ua",
};

export function getSettings(): CMSSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const saved = localStorage.getItem("vivo_cms_settings");
  if (!saved) return DEFAULT_SETTINGS;
  try {
    return JSON.parse(saved);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: CMSSettings) {
  if (typeof window === "undefined") return;
  localStorage.setItem("vivo_cms_settings", JSON.stringify(settings));
}
