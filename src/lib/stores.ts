export interface StoreLink {
  name: string;
  url: string;
}

export const DIAPER_STORES: Record<string, StoreLink[]> = {
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
};

export const UNDERPAD_STORES: StoreLink[] = [
  { name: "Igorek", url: "https://igorek.com.ua/ua/p2999318379-pelenki-vivocare.html" },
  { name: "Капітошка", url: "https://kapitoshka.kiev.ua/ua/p2905451661-pelenki-pogloschayuschie-vivocare.html" },
  { name: "Prom", url: "https://prom.ua/ua/search?search_term=VIVO+Care+пелюшки" },
];
