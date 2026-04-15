import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export const Route = createFileRoute("/admin/underpads")({
  head: () => ({
    meta: [{ title: "Admin - Пелюшки VIVO Care" }],
  }),
  component: AdminUnderpadsPage,
});

interface UnderpadSize {
  id: string;
  size: string;
  dimensions: string;
  qty: number;
  price: string;
  drops: number;
}

const defaultSizes: UnderpadSize[] = [
  { id: "1", size: "Standard", dimensions: "60×90 см", qty: 30, price: "529 ₴", drops: 5 },
];

function AdminUnderpadsPage() {
  const [sizes, setSizes] = useState<UnderpadSize[]>(defaultSizes);
  const [newSize, setNewSize] = useState({
    size: "",
    dimensions: "",
    qty: 30,
    price: "",
    drops: 3,
  });

  const handleAdd = () => {
    if (!newSize.size || !newSize.dimensions || !newSize.price) return;
    const id = Date.now().toString();
    setSizes([...sizes, { ...newSize, id }]);
    setNewSize({ size: "", dimensions: "", qty: 30, price: "", drops: 3 });
  };

  const handleDelete = (id: string) => {
    setSizes(sizes.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Адмін-панель: Пелюшки</h1>

          <div className="card-product p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Додати новий розмір</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Назва (наприклад: Standard, Plus)"
                value={newSize.size}
                onChange={(e) => setNewSize({ ...newSize, size: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Розміри (наприклад: 60×90 см)"
                value={newSize.dimensions}
                onChange={(e) => setNewSize({ ...newSize, dimensions: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Кількість в упаковці"
                value={newSize.qty}
                onChange={(e) => setNewSize({ ...newSize, qty: Number(e.target.value) })}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Ціна (наприклад: 529 ₴)"
                value={newSize.price}
                onChange={(e) => setNewSize({ ...newSize, price: e.target.value })}
                className="border rounded px-3 py-2"
              />
              <select
                value={newSize.drops}
                onChange={(e) => setNewSize({ ...newSize, drops: Number(e.target.value) })}
                className="border rounded px-3 py-2"
              >
                <option value={3}>3 краплі - Легкий</option>
                <option value={5}>5 крапель - Середній</option>
                <option value={7}>7 крапель - Сильний</option>
                <option value={9}>9 крапель - Максимальний</option>
              </select>
              <button onClick={handleAdd} className="btn-buy">
                Додати
              </button>
            </div>
          </div>

          <div className="card-product p-6">
            <h2 className="text-xl font-bold mb-4">Поточні розміри</h2>
            <div className="space-y-4">
              {sizes.map((s) => (
                <div key={s.id} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <span className="font-bold">{s.size}</span>
                    <span className="text-muted-foreground ml-2">({s.dimensions})</span>
                    <span className="text-muted-foreground ml-2">- {s.qty} шт</span>
                    <span className="text-muted-foreground ml-2">- {s.price}</span>
                    <span className="text-muted-foreground ml-2">- {s.drops} крапель</span>
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
