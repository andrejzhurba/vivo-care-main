import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export const Route = createFileRoute("/admin/diapers")({
  head: () => ({
    meta: [{ title: "Admin - Підгузки-труси VIVO Care" }],
  }),
  component: AdminDiapersPage,
});

interface DiaperSize {
  id: string;
  size: string;
  label: string;
  waist: string;
  weight: string;
  drops: number;
  price: string;
  qty: string;
}

const defaultSizes: DiaperSize[] = [
  {
    id: "1",
    size: "S",
    label: "Small",
    waist: "50–80 см",
    weight: "40–60 кг",
    drops: 8,
    price: "560 ₴",
    qty: "30 шт",
  },
  {
    id: "2",
    size: "M",
    label: "Medium",
    waist: "75–100 см",
    weight: "55–85 кг",
    drops: 9,
    price: "610 ₴",
    qty: "30 шт",
  },
  {
    id: "3",
    size: "L",
    label: "Large",
    waist: "90–120 см",
    weight: "80–125 кг",
    drops: 9,
    price: "680 ₴",
    qty: "30 шт",
  },
  {
    id: "4",
    size: "XL",
    label: "Extra Large",
    waist: "120–145 см",
    weight: "110–150 кг",
    drops: 9,
    price: "700 ₴",
    qty: "30 шт",
  },
  {
    id: "5",
    size: "XXL",
    label: "Extra Extra Large",
    waist: "135–180 см",
    weight: "120–170 кг",
    drops: 8,
    price: "750 ₴",
    qty: "30 шт",
  },
];

function AdminDiapersPage() {
  const [sizes, setSizes] = useState<DiaperSize[]>(defaultSizes);
  const [newSize, setNewSize] = useState({
    size: "",
    label: "",
    waist: "",
    weight: "",
    drops: 3,
    price: "",
    qty: "30 шт",
  });

  const handleAdd = () => {
    if (!newSize.size || !newSize.price) return;
    const id = Date.now().toString();
    setSizes([...sizes, { ...newSize, id } as DiaperSize]);
    setNewSize({ size: "", label: "", waist: "", weight: "", drops: 3, price: "", qty: "30 шт" });
  };

  const handleDelete = (id: string) => {
    setSizes(sizes.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Адмін-панель: Підгузки-труси</h1>

          <div className="card-product p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Додати новий розмір</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Розмір (S, M, L...)"
                value={newSize.size}
                onChange={(e) => setNewSize({ ...newSize, size: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Назва (Small, Medium...)"
                value={newSize.label}
                onChange={(e) => setNewSize({ ...newSize, label: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Обхват талії (50–80 см)"
                value={newSize.waist}
                onChange={(e) => setNewSize({ ...newSize, waist: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Вага (40–60 кг)"
                value={newSize.weight}
                onChange={(e) => setNewSize({ ...newSize, weight: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Краплі (3-10)"
                value={newSize.drops}
                onChange={(e) => setNewSize({ ...newSize, drops: Number(e.target.value) })}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Ціна (560 ₴)"
                value={newSize.price}
                onChange={(e) => setNewSize({ ...newSize, price: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <button onClick={handleAdd} className="btn-buy sm:col-span-3">
                Додати розмір
              </button>
            </div>
          </div>

          <div className="card-product p-6">
            <h2 className="text-xl font-bold mb-4">Поточні розміри</h2>
            <div className="space-y-4">
              {sizes.map((s) => (
                <div key={s.id} className="flex justify-between items-center border-b pb-4">
                  <div className="flex gap-4">
                    <span className="font-bold">{s.size}</span>
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="text-muted-foreground">талії: {s.waist}</span>
                    <span className="text-muted-foreground">вага: {s.weight}</span>
                    <span className="text-muted-foreground">{s.drops} крапель</span>
                    <span className="font-bold">{s.price}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Видалити
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => alert("Збережено! JSON:\n" + JSON.stringify(sizes, null, 2))}
              className="btn-buy"
            >
              Зберегти зміни
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
