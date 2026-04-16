import { createClient } from "@supabase/supabase-js";

export interface StoreLink {
  name: string;
  url: string;
}

export interface DiaperSize {
  id: string;
  name: string;
  waist: string;
  absorbency: string;
  images?: string[];
}

export interface UnderpadSize {
  id: string;
  name: string;
  size: string;
  absorbLevel: number;
  qty: string;
  images?: string[];
}

export interface CMSSettings {
  heroSlogan: string;
  heroDescription: string;
  stores: { name: string; url: string; description?: string }[];
  contactEmail: string;
  contactPhone: string;
  adminPassword?: string;
  diaperStores: Record<string, StoreLink[]>;
  underpadStores: StoreLink[];
  diaperSizes: DiaperSize[];
  underpadSizes: UnderpadSize[];
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const DEFAULT_SETTINGS: CMSSettings = {
  heroSlogan: "Турбота щодня",
  heroDescription:
    "Професійні гігієнічні засоби для дорослих. Комфорт, впевненість та гідність у кожному русі.",
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
  adminPassword: "vivo2025",
  diaperSizes: [
    { id: "S", name: "Small", waist: "60-90 см", absorbency: "1200 мл", images: [] },
    { id: "M", name: "Medium", waist: "80-110 см", absorbency: "1400 мл", images: [] },
    { id: "L", name: "Large", waist: "100-135 см", absorbency: "1600 мл", images: [] },
    { id: "XL", name: "Extra Large", waist: "120-155 см", absorbency: "1800 мл", images: [] },
    {
      id: "XXL",
      name: "Extra Extra Large",
      waist: "135-170 см",
      absorbency: "2000 мл",
      images: [],
    },
  ],
  diaperStores: {
    S: [
      { name: "Igorek", url: "https://igorek.com.ua/ua/p2999239908-podguzniki-trusiki-dlya.html" },
      {
        name: "Капітошка",
        url: "https://kapitoshka.kiev.ua/ua/p2905451595-podguzniki-trusy-dlya.html",
      },
    ],
    M: [
      { name: "Igorek", url: "https://igorek.com.ua/ua/p2999256297-podguzniki-trusiki-dlya.html" },
      {
        name: "Капітошка",
        url: "https://kapitoshka.kiev.ua/ua/p2905451614-podguzniki-trusy-dlya.html",
      },
    ],
    L: [
      { name: "Igorek", url: "https://igorek.com.ua/ua/p2999223127-podguzniki-trusiki-dlya.html" },
      {
        name: "Капітошка",
        url: "https://kapitoshka.kiev.ua/ua/p2905451581-podguzniki-trusy-dlya.html",
      },
    ],
    XL: [
      { name: "Igorek", url: "https://igorek.com.ua/ua/p2999226792-podguzniki-trusiki-dlya.html" },
      {
        name: "Капітошка",
        url: "https://kapitoshka.kiev.ua/ua/p2905451613-podguzniki-trusy-dlya.html",
      },
    ],
    XXL: [
      { name: "Igorek", url: "https://igorek.com.ua/ua/p2999318378-podguzniki-trusiki-dlya.html" },
      {
        name: "Капітошка",
        url: "https://kapitoshka.kiev.ua/ua/p2905451660-podguzniki-trusy-dlya.html",
      },
    ],
  },
  underpadSizes: [
    { id: "1", name: "Standard", size: "60 × 90 см", absorbLevel: 8, qty: "30 шт", images: [] },
  ],
  underpadStores: [
    { name: "Igorek", url: "https://igorek.com.ua/ua/p2999318379-pelenki-vivocare.html" },
    {
      name: "Капітошка",
      url: "https://kapitoshka.kiev.ua/ua/p2905451661-pelenki-pogloschayuschie-vivocare.html",
    },
  ],
};

export async function getSettings(): Promise<CMSSettings> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const { data, error } = await supabase.from("settings").select("config").single();
      if (data && !error) {
        const config = data.config as CMSSettings;
        return {
          ...DEFAULT_SETTINGS,
          ...config,
          adminPassword: config.adminPassword || DEFAULT_SETTINGS.adminPassword,
          diaperSizes: (config.diaperSizes || DEFAULT_SETTINGS.diaperSizes).map((s) => ({
            ...s,
            images: Array.isArray(s.images) ? s.images : s.image ? [s.image] : [],
          })),
          underpadSizes: (config.underpadSizes || DEFAULT_SETTINGS.underpadSizes).map((s) => ({
            ...s,
            images: Array.isArray(s.images) ? s.images : s.image ? [s.image] : [],
          })),
        };
      }
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to local storage/defaults", e);
    }
  }

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("vivo_cms_settings");
    if (saved) {
      try {
        const config = JSON.parse(saved);
        return {
          ...DEFAULT_SETTINGS,
          ...config,
          adminPassword: config.adminPassword || DEFAULT_SETTINGS.adminPassword,
          diaperSizes: (config.diaperSizes || DEFAULT_SETTINGS.diaperSizes).map((s: any) => ({
            ...s,
            images: Array.isArray(s.images) ? s.images : s.image ? [s.image] : [],
          })),
          underpadSizes: (config.underpadSizes || DEFAULT_SETTINGS.underpadSizes).map((s: any) => ({
            ...s,
            images: Array.isArray(s.images) ? s.images : s.image ? [s.image] : [],
          })),
        };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
  }

  return DEFAULT_SETTINGS;
}

export async function saveSettings(settings: CMSSettings) {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const { error } = await supabase.from("settings").upsert({ id: 1, config: settings });
      if (error) throw error;
    } catch (e) {
      console.error("Supabase save failed", e);
    }
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("vivo_cms_settings", JSON.stringify(settings));
  }
}

export async function uploadFileToStorage(file: File): Promise<string> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage.from("product-images").upload(fileName, file);

      if (error) {
        console.error("Supabase upload error:", error);
        throw error;
      }

      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (e) {
      console.warn("Supabase upload failed, using Base64:", e);
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
