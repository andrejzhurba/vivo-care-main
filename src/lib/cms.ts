import { createClient } from '@supabase/supabase-js';

export interface StoreLink {
  name: string;
  url: string;
}

export interface DiaperSize {
  id: string;
  name: string;
  waist: string;
  absorbency: string;
}

export interface UnderpadSize {
  id: string;
  name: string;
  size: string;
  absorbLevel: number;
  qty: string;
}

export interface CMSSettings {
  heroSlogan: string;
  heroDescription: string;
  stores: { name: string; url: string; description?: string }[];
  contactEmail: string;
  contactPhone: string;
  diaperStores: Record<string, StoreLink[]>;
  underpadStores: StoreLink[];
  diaperSizes: DiaperSize[];
  underpadSizes: UnderpadSize[];
}

// These should ideally be in .env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
  contactPhone: "+38 (067) 123-45-67",
  diaperSizes: [
    { id: "S", name: "Small", waist: "60-90 см", absorbency: "1200 мл" },
    { id: "M", name: "Medium", waist: "80-110 см", absorbency: "1400 мл" },
    { id: "L", name: "Large", waist: "100-135 см", absorbency: "1600 мл" },
    { id: "XL", name: "Extra Large", waist: "120-155 см", absorbency: "1800 мл" },
    { id: "XXL", name: "Extra Extra Large", waist: "135-170 см", absorbency: "2000 мл" },
  ],
  diaperStores: {
    S: [
      { name: "Igorek", url: "https://igorek.com.ua/ua/p2999239908-podguzniki-trusiki-dlya.html" },
      { name: "Капітошка", url: "https://kapitoshka.kiev.ua/ua/p2905451595-podguzniki-trusy-dlya.html" },
      { name: "Prom", url: "https://prom.ua/ua/p2999239908-podguzniki-trusiki-dlya.html" },
    ],
    M: [
      { name: "Igorek", url: "https://igorek.com.ua/ua/p2999256297-podguzniki-trusiki-dlya.html" },
      { name: "Капітошка", url: "https://kapitoshka.kiev.ua/ua/p2905451614-podguzniki-trusy-dlya.html" },
      { name: "Prom", url: "https://prom.ua/ua/p2999256297-podguzniki-trusiki-dlya.html" },
    ],
    L: [
      { name: "Igorek", url: "https://igorek.com.ua/ua/p2999223127-podguzniki-trusiki-dlya.html" },
      { name: "Капітошка", url: "https://kapitoshka.kiev.ua/ua/p2905451581-podguzniki-trusy-dlya.html" },
      { name: "Prom", url: "https://prom.ua/ua/p2999223127-podguzniki-trusiki-dlya.html" },
    ],
    XL: [
      { name: "Igorek", url: "https://igorek.com.ua/ua/p2999226792-podguzniki-trusiki-dlya.html" },
      { name: "Капітошка", url: "https://kapitoshka.kiev.ua/ua/p2905451613-podguzniki-trusy-dlya.html" },
      { name: "Prom", url: "https://prom.ua/ua/p2999226792-podguzniki-trusiki-dlya.html" },
    ],
    XXL: [
      { name: "Igorek", url: "https://igorek.com.ua/ua/p2999318378-podguzniki-trusiki-dlya.html" },
      { name: "Капітошка", url: "https://kapitoshka.kiev.ua/ua/p2905451660-podguzniki-trusy-dlya.html" },
      { name: "Prom", url: "https://prom.ua/ua/p2999318378-podguzniki-trusiki-dlya.html" },
    ],
  },
  underpadSizes: [
    {
      id: "1",
      name: "Standard",
      size: "60 × 90 см",
      absorbLevel: 8,
      qty: "30 шт",
    },
  ],
  underpadStores: [
    { name: "Igorek", url: "https://igorek.com.ua/ua/p2999318379-pelenki-vivocare.html" },
    { name: "Капітошка", url: "https://kapitoshka.kiev.ua/ua/p2905451661-pelenki-pogloschayuschie-vivocare.html" },
    { name: "Prom", url: "https://prom.ua/ua/m-2017105891998858515-pelenki-pogloschayuschie-vivocare.html?p=2905451661" },
  ],
};

export async function getSettings(): Promise<CMSSettings> {
  // If Supabase is configured, try to fetch from it
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('config')
        .single();
      
      if (data && !error) {
        const config = data.config as CMSSettings;
        // Ensure new fields exist even if DB has old schema
        return {
          ...DEFAULT_SETTINGS,
          ...config,
          diaperSizes: config.diaperSizes || DEFAULT_SETTINGS.diaperSizes,
          underpadSizes: config.underpadSizes || DEFAULT_SETTINGS.underpadSizes,
        };
      }
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to local storage/defaults", e);
    }
  }

  // Fallback to localStorage for quick edits if DB not ready
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("vivo_cms_settings");
    if (saved) {
      try {
        const config = JSON.parse(saved);
        return {
          ...DEFAULT_SETTINGS,
          ...config,
          diaperSizes: config.diaperSizes || DEFAULT_SETTINGS.diaperSizes,
          underpadSizes: config.underpadSizes || DEFAULT_SETTINGS.underpadSizes,
        };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
  }
  
  return DEFAULT_SETTINGS;
}

export async function saveSettings(settings: CMSSettings) {
  // Save to Supabase if configured
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ id: 1, config: settings });
      
      if (error) throw error;
    } catch (e) {
      console.error("Supabase save failed", e);
    }
  }

  // Always save to localStorage as a cache/fallback
  if (typeof window !== "undefined") {
    localStorage.setItem("vivo_cms_settings", JSON.stringify(settings));
  }
}
