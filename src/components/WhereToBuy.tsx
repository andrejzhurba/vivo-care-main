interface WhereToBuyProps {
  links?: { name: string; url: string; description?: string }[];
}

const defaultStores = [
  {
    name: "Капітошка",
    url: "https://kapitoshka.kiev.ua/ua/product_list?csbss0=1128038494",
    description: "Інтернет-магазин гігієнічних засобів",
  },
];

export function WhereToBuy({ links }: WhereToBuyProps) {
  const stores = links && links.length > 0 ? links : defaultStores;

  return (
    <section className="py-12 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Де купити?</h2>
        <p className="text-slate-400 text-lg mb-10 font-light italic">Оберіть зручний для вас магазин</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {stores.map((store) => (
            <a
              key={store.name}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-buy w-full sm:w-auto"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {store.name}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
