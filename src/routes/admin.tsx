import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { getSettings, saveSettings, type CMSSettings, type StoreLink } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, Plus, Trash2, LogOut, ExternalLink } from "lucide-react";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getSettings();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      toast.error("Невірний пароль!");
    }
  };

  const handleSave = async () => {
    if (settings) {
      await saveSettings(settings);
      toast.success("Налаштування збережено!");
    }
  };

  // Generic store management
  const updateGeneralStore = (index: number, field: keyof CMSSettings["stores"][0], value: string) => {
    if (!settings) return;
    const newStores = [...settings.stores];
    newStores[index] = { ...newStores[index], [field]: value };
    setSettings({ ...settings, stores: newStores });
  };

  // Diaper size management
  const addDiaperSize = () => {
    if (!settings) return;
    const newSizes = [...settings.diaperSizes, { id: "NEW", name: "New Size", waist: "", absorbency: "" }];
    const newStores = { ...settings.diaperStores, "NEW": [] };
    setSettings({ ...settings, diaperSizes: newSizes, diaperStores: newStores });
  };

  const removeDiaperSize = (index: number) => {
    if (!settings) return;
    const size = settings.diaperSizes[index];
    const newSizes = [...settings.diaperSizes];
    newSizes.splice(index, 1);
    
    const newStores = { ...settings.diaperStores };
    delete newStores[size.id];
    
    setSettings({ ...settings, diaperSizes: newSizes, diaperStores: newStores });
  };

  const updateDiaperSize = (index: number, field: string, value: string) => {
    if (!settings) return;
    const newSizes = [...settings.diaperSizes];
    const oldId = newSizes[index].id;
    // @ts-ignore
    newSizes[index] = { ...newSizes[index], [field]: value };
    
    const newStores = { ...settings.diaperStores };
    if (field === 'id' && oldId !== value) {
      newStores[value] = newStores[oldId] || [];
      delete newStores[oldId];
    }
    
    setSettings({ ...settings, diaperSizes: newSizes, diaperStores: newStores });
  };

  // Underpad size management
  const addUnderpadSize = () => {
    if (!settings) return;
    const newSizes = [...settings.underpadSizes, { id: Date.now().toString(), name: "New", size: "", absorbLevel: 5, qty: "" }];
    setSettings({ ...settings, underpadSizes: newSizes });
  };

  const removeUnderpadSize = (index: number) => {
    if (!settings) return;
    const newSizes = [...settings.underpadSizes];
    newSizes.splice(index, 1);
    setSettings({ ...settings, underpadSizes: newSizes });
  };

  const updateUnderpadSize = (index: number, field: string, value: string | number) => {
    if (!settings) return;
    const newSizes = [...settings.underpadSizes];
    // @ts-ignore
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSettings({ ...settings, underpadSizes: newSizes });
  };

  // Diaper store management
  const updateDiaperStore = (size: string, index: number, field: keyof StoreLink, value: string) => {
    if (!settings) return;
    const newDiaperStores = { ...settings.diaperStores };
    const sizeStores = [...newDiaperStores[size]];
    sizeStores[index] = { ...sizeStores[index], [field]: value };
    newDiaperStores[size] = sizeStores;
    setSettings({ ...settings, diaperStores: newDiaperStores });
  };

  const addDiaperStore = (size: string) => {
    if (!settings) return;
    const newDiaperStores = { ...settings.diaperStores };
    newDiaperStores[size] = [...newDiaperStores[size], { name: "", url: "" }];
    setSettings({ ...settings, diaperStores: newDiaperStores });
  };

  const removeDiaperStore = (size: string, index: number) => {
    if (!settings) return;
    const newDiaperStores = { ...settings.diaperStores };
    const sizeStores = [...newDiaperStores[size]];
    sizeStores.splice(index, 1);
    newDiaperStores[size] = sizeStores;
    setSettings({ ...settings, diaperStores: newDiaperStores });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
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

  if (loading || !settings) return <div className="p-20 text-center">Завантаження...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />

      <section className="py-12 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Адмін-панель VIVO Care</h1>
              <p className="text-slate-500 italic font-light">Керування контентом та посиланнями</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 rounded-xl px-6 font-bold">
                <Save className="w-4 h-4 mr-2" />
                Зберегти все
              </Button>
              <Button variant="outline" onClick={() => setIsAuthenticated(false)} className="rounded-xl">
                <LogOut className="w-4 h-4 mr-2" />
                Вийти
              </Button>
            </div>
          </div>

          <Tabs defaultValue="general" className="space-y-8">
            <TabsList className="bg-white p-1 rounded-2xl border border-slate-100 h-auto">
              <TabsTrigger value="general" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">Загальні</TabsTrigger>
              <TabsTrigger value="diapers" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">Підгузки-труси</TabsTrigger>
              <TabsTrigger value="underpads" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">Пелюшки</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-2 h-6 bg-blue-500 rounded-full" />
                  Головний екран (Hero)
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Слоган</label>
                    <Input
                      value={settings.heroSlogan}
                      onChange={(e) => setSettings({ ...settings, heroSlogan: e.target.value })}
                      className="rounded-xl p-6 text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Опис</label>
                    <Textarea
                      value={settings.heroDescription}
                      onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
                      className="rounded-xl p-6 min-h-[120px]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-2 h-6 bg-blue-500 rounded-full" />
                  Контакти
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Email</label>
                    <Input
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="rounded-xl p-6"
                      placeholder="info@vivocare.ua"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">Телефон</label>
                    <Input
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      className="rounded-xl p-6"
                      placeholder="+38 (0XX) XXX-XX-XX"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="diapers" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-end">
                <Button onClick={addDiaperSize} className="bg-blue-600 hover:bg-blue-700 rounded-xl">
                  <Plus className="w-4 h-4 mr-2" /> Додати новий розмір
                </Button>
              </div>
              
              {settings.diaperSizes.map((size, sizeIndex) => (
                <div key={sizeIndex} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center text-sm">{size.id}</div>
                      Налаштування розміру {size.id}
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeDiaperSize(sizeIndex)}
                      className="text-slate-300 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID (напр. S, M)</label>
                      <Input 
                        value={size.id} 
                        onChange={(e) => updateDiaperSize(sizeIndex, "id", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Назва (напр. Small)</label>
                      <Input 
                        value={size.name} 
                        onChange={(e) => updateDiaperSize(sizeIndex, "name", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Обхват (напр. 60-90 см)</label>
                      <Input 
                        value={size.waist} 
                        onChange={(e) => updateDiaperSize(sizeIndex, "waist", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Поглинання (мл)</label>
                      <Input 
                        value={size.absorbency} 
                        onChange={(e) => updateDiaperSize(sizeIndex, "absorbency", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-slate-900">Магазини для цього розміру</h3>
                      <Button variant="ghost" size="sm" onClick={() => addDiaperStore(size.id)} className="text-blue-600 hover:bg-blue-50">
                        <Plus className="w-4 h-4 mr-1" /> Додати магазин
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      {(settings.diaperStores[size.id] || []).map((store, storeIndex) => (
                        <div key={storeIndex} className="flex gap-4 items-end p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                          <div className="flex-1 space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Магазин</label>
                            <Input 
                              value={store.name} 
                              onChange={(e) => updateDiaperStore(size.id, storeIndex, "name", e.target.value)}
                              className="bg-white rounded-lg border-slate-200"
                              placeholder="Назва"
                            />
                          </div>
                          <div className="flex-[3] space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">URL посилання</label>
                            <div className="relative">
                              <Input 
                                value={store.url} 
                                onChange={(e) => updateDiaperStore(size.id, storeIndex, "url", e.target.value)}
                                className="bg-white rounded-lg border-slate-200 pr-10"
                                placeholder="https://..."
                              />
                              <a href={store.url} target="_blank" className="absolute right-3 top-2.5 text-slate-300 hover:text-blue-500"><ExternalLink className="w-4 h-4" /></a>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeDiaperStore(size.id, storeIndex)}
                            className="text-slate-300 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="underpads" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="flex justify-end">
                  <Button onClick={addUnderpadSize} className="bg-blue-600 hover:bg-blue-700 rounded-xl">
                    <Plus className="w-4 h-4 mr-2" /> Додати новий розмір
                  </Button>
               </div>

               {settings.underpadSizes.map((size, sizeIndex) => (
                 <div key={sizeIndex} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                   <div className="flex justify-between items-start mb-6">
                      <h2 className="text-xl font-bold flex items-center gap-3">
                        <div className="w-2 h-6 bg-blue-500 rounded-full" />
                        Розмір: {size.size || "Новий"}
                      </h2>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeUnderpadSize(sizeIndex)}
                        className="text-slate-300 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                   </div>

                   <div className="grid md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Назва</label>
                        <Input 
                          value={size.name} 
                          onChange={(e) => updateUnderpadSize(sizeIndex, "name", e.target.value)}
                          className="bg-slate-50 rounded-lg border-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Розмір (напр. 60x90)</label>
                        <Input 
                          value={size.size} 
                          onChange={(e) => updateUnderpadSize(sizeIndex, "size", e.target.value)}
                          className="bg-slate-50 rounded-lg border-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Поглинання (1-10)</label>
                        <Input 
                          type="number"
                          value={size.absorbLevel} 
                          onChange={(e) => updateUnderpadSize(sizeIndex, "absorbLevel", parseInt(e.target.value))}
                          className="bg-slate-50 rounded-lg border-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Кількість (шт)</label>
                        <Input 
                          value={size.qty} 
                          onChange={(e) => updateUnderpadSize(sizeIndex, "qty", e.target.value)}
                          className="bg-slate-50 rounded-lg border-slate-200"
                        />
                      </div>
                   </div>
                 </div>
               ))}

               <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 mt-12">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <div className="w-2 h-6 bg-blue-500 rounded-full" />
                      Магазини для пелюшок
                    </h2>
                    <Button variant="ghost" size="sm" onClick={() => {
                        const newStores = [...settings.underpadStores, { name: "", url: "" }];
                        setSettings({ ...settings, underpadStores: newStores });
                    }} className="text-blue-600 hover:bg-blue-50">
                      <Plus className="w-4 h-4 mr-1" /> Додати магазин
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    {settings.underpadStores.map((store, index) => (
                      <div key={index} className="flex gap-4 items-end p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                        <div className="flex-1 space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Магазин</label>
                          <Input 
                            value={store.name} 
                            onChange={(e) => {
                                const newStores = [...settings.underpadStores];
                                newStores[index] = { ...newStores[index], name: e.target.value };
                                setSettings({ ...settings, underpadStores: newStores });
                            }}
                            className="bg-white rounded-lg border-slate-200"
                          />
                        </div>
                        <div className="flex-[3] space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">URL посилання</label>
                          <Input 
                            value={store.url} 
                            onChange={(e) => {
                                const newStores = [...settings.underpadStores];
                                newStores[index] = { ...newStores[index], url: e.target.value };
                                setSettings({ ...settings, underpadStores: newStores });
                            }}
                            className="bg-white rounded-lg border-slate-200"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => {
                              const newStores = [...settings.underpadStores];
                              newStores.splice(index, 1);
                              setSettings({ ...settings, underpadStores: newStores });
                          }}
                          className="text-slate-300 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
