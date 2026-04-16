import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { getSettings, saveSettings, type CMSSettings } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Plus, Trash2, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin - VIVO Care" }],
  }),
  component: AdminPage,
});

const ADMIN_PASSWORD = "vivo2025";

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState<CMSSettings | null>(null);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      toast.error("Невірний пароль!");
    }
  };

  const handleSave = () => {
    if (settings) {
      saveSettings(settings);
      toast.success("Налаштування збережено!");
    }
  };

  const addStore = () => {
    if (settings) {
      setSettings({
        ...settings,
        stores: [...settings.stores, { name: "", url: "", description: "" }],
      });
    }
  };

  const removeStore = (index: number) => {
    if (settings) {
      const newStores = [...settings.stores];
      newStores.splice(index, 1);
      setSettings({ ...settings, stores: newStores });
    }
  };

  const updateStore = (index: number, field: keyof CMSSettings["stores"][0], value: string) => {
    if (settings) {
      const newStores = [...settings.stores];
      newStores[index] = { ...newStores[index], [field]: value };
      setSettings({ ...settings, stores: newStores });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <section className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="w-full max-w-md bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h1 className="text-2xl font-bold text-center mb-8">Вхід до адмін-панелі</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Введіть пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-6">
                Увійти
              </Button>
            </form>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Керування контентом</h1>
              <p className="text-slate-500">Зміна текстів та посилань на сайті</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 rounded-xl px-6">
                <Save className="w-4 h-4 mr-2" />
                Зберегти всі зміни
              </Button>
              <Button variant="outline" onClick={() => setIsAuthenticated(false)} className="rounded-xl">
                <LogOut className="w-4 h-4 mr-2" />
                Вийти
              </Button>
            </div>
          </div>

          <div className="grid gap-8">
            {/* HERO SECTION SETTINGS */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-500 rounded-full" />
                Головний екран (Hero)
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Слоган</label>
                  <Input
                    value={settings.heroSlogan}
                    onChange={(e) => setSettings({ ...settings, heroSlogan: e.target.value })}
                    className="rounded-xl p-6 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Опис</label>
                  <Textarea
                    value={settings.heroDescription}
                    onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
                    className="rounded-xl p-6 min-h-[120px]"
                  />
                </div>
              </div>
            </div>

            {/* STORES SETTINGS */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-500 rounded-full" />
                  Магазини (Де купити)
                </h2>
                <Button variant="outline" size="sm" onClick={addStore} className="rounded-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Додати магазин
                </Button>
              </div>
              
              <div className="space-y-4">
                {settings.stores.map((store, index) => (
                  <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                    <button 
                      onClick={() => removeStore(index)}
                      className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Назва магазину</label>
                        <Input
                          value={store.name}
                          onChange={(e) => updateStore(index, "name", e.target.value)}
                          className="bg-white rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Опис/Тип</label>
                        <Input
                          value={store.description}
                          onChange={(e) => updateStore(index, "description", e.target.value)}
                          className="bg-white rounded-lg"
                          placeholder="Наприклад: Офіційний партнер"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">URL посилання</label>
                        <Input
                          value={store.url}
                          onChange={(e) => updateStore(index, "url", e.target.value)}
                          className="bg-white rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRODUCT LINKS NOTICE */}
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <p className="text-blue-700 text-sm">
                <strong>Примітка:</strong> Посилання на конкретні розміри підгузків налаштовуються у файлі конфігурації <code>src/lib/stores.ts</code> для забезпечення точності переходів на відповідні товарні позиції.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
