import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState, useEffect, useCallback } from "react";
import {
  getSettings,
  saveSettings,
  uploadFileToStorage,
  type CMSSettings,
  type StoreLink,
} from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, Plus, Trash2, LogOut, ExternalLink, Upload, Loader2, X } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin - Vivo Care" }],
  }),
  component: AdminPage,
});

function ImageUploadZone({
  images,
  onUpload,
  onRemove,
}: {
  images: string[];
  onUpload: (urls: string[]) => void;
  onRemove: (index: number) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setIsUploading(true);
      const uploadPromises = Array.from(files).map((file) => uploadFileToStorage(file));

      try {
        const urls = await Promise.all(uploadPromises);
        onUpload(urls);
        toast.success(`Завантажено ${urls.length} фото`);
      } catch (error) {
        console.error(error);
        toast.error("Помилка при завантаженні");
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload],
  );

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`
          border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all
          ${isDragging ? "border-blue-500 bg-blue-50/50 scale-[0.99]" : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/50"}
          ${isUploading ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        {isUploading ? (
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        ) : (
          <Upload className="w-10 h-10 text-slate-300 mb-4" />
        )}
        <p className="text-sm font-medium text-slate-600">
          {isUploading ? "Завантаження..." : "Перетягніть фото сюди або клікніть для вибору"}
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          id="file-upload"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Button
          variant="outline"
          size="sm"
          className="mt-4 rounded-xl"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          Вибрати файли
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {images.map((url, idx) => (
          <div
            key={idx}
            className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 group"
          >
            <img src={url} className="w-full h-full object-cover" />
            <button
              onClick={() => onRemove(idx)}
              className="absolute top-1 right-1 bg-white/90 p-1 rounded-lg text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState<CMSSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");

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
    if (password === (settings?.adminPassword || "vivo2025")) {
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

  const handleChangePassword = () => {
    if (!settings || !newPassword) return;
    setSettings({ ...settings, adminPassword: newPassword });
    setNewPassword("");
    toast.success("Пароль змінено! Не забудьте зберегти всі налаштування.");
  };

  // Diaper size management
  const addDiaperSize = () => {
    if (!settings) return;
    const newSizes = [
      ...settings.diaperSizes,
      { id: "NEW", name: "New Size", waist: "", absorbency: "", images: [] },
    ];
    const newStores = { ...settings.diaperStores, NEW: [] };
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

  const updateDiaperSize = (index: number, field: string, value: any) => {
    if (!settings) return;
    const newSizes = [...settings.diaperSizes];
    const oldId = newSizes[index].id;
    // @ts-ignore
    newSizes[index] = { ...newSizes[index], [field]: value };

    const newStores = { ...settings.diaperStores };
    if (field === "id" && oldId !== value) {
      newStores[value] = newStores[oldId] || [];
      delete newStores[oldId];
    }

    setSettings({ ...settings, diaperSizes: newSizes, diaperStores: newStores });
  };

  const handleDiaperUpload = (sizeIndex: number, newUrls: string[]) => {
    if (!settings) return;
    const newSizes = [...settings.diaperSizes];
    const images = [...(newSizes[sizeIndex].images || []), ...newUrls];
    newSizes[sizeIndex] = { ...newSizes[sizeIndex], images };
    setSettings({ ...settings, diaperSizes: newSizes });
  };

  const removeDiaperImage = (sizeIndex: number, imageIndex: number) => {
    if (!settings) return;
    const newSizes = [...settings.diaperSizes];
    const images = [...(newSizes[sizeIndex].images || [])];
    images.splice(imageIndex, 1);
    newSizes[sizeIndex] = { ...newSizes[sizeIndex], images };
    setSettings({ ...settings, diaperSizes: newSizes });
  };

  // Underpad size management
  const addUnderpadSize = () => {
    if (!settings) return;
    const newSizes = [
      ...settings.underpadSizes,
      { id: Date.now().toString(), name: "New", size: "", absorbLevel: 5, qty: "", images: [] },
    ];
    setSettings({ ...settings, underpadSizes: newSizes });
  };

  const removeUnderpadSize = (index: number) => {
    if (!settings) return;
    const newSizes = [...settings.underpadSizes];
    newSizes.splice(index, 1);
    setSettings({ ...settings, underpadSizes: newSizes });
  };

  const updateUnderpadSize = (index: number, field: string, value: any) => {
    if (!settings) return;
    const newSizes = [...settings.underpadSizes];
    // @ts-ignore
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSettings({ ...settings, underpadSizes: newSizes });
  };

  const handleUnderpadUpload = (sizeIndex: number, newUrls: string[]) => {
    if (!settings) return;
    const newSizes = [...settings.underpadSizes];
    const images = [...(newSizes[sizeIndex].images || []), ...newUrls];
    newSizes[sizeIndex] = { ...newSizes[sizeIndex], images };
    setSettings({ ...settings, underpadSizes: newSizes });
  };

  const removeUnderpadImage = (sizeIndex: number, imageIndex: number) => {
    if (!settings) return;
    const newSizes = [...settings.underpadSizes];
    const images = [...(newSizes[sizeIndex].images || [])];
    images.splice(imageIndex, 1);
    newSizes[sizeIndex] = { ...newSizes[sizeIndex], images };
    setSettings({ ...settings, underpadSizes: newSizes });
  };

  // Diaper store management
  const updateDiaperStore = (
    size: string,
    index: number,
    field: keyof StoreLink,
    value: string,
  ) => {
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
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-6"
              >
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
              <h1 className="text-3xl font-bold text-slate-900">Адмін-панель Vivo Care</h1>
              <p className="text-slate-500 italic font-light">Керування контентом та посиланнями</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 rounded-xl px-6 font-bold"
              >
                <Save className="w-4 h-4 mr-2" />
                Зберегти все
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsAuthenticated(false)}
                className="rounded-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Вийти
              </Button>
            </div>
          </div>

          <Tabs defaultValue="general" className="space-y-8">
            <TabsList className="bg-white p-1 rounded-2xl border border-slate-100 h-auto">
              <TabsTrigger
                value="general"
                className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                Загальні
              </TabsTrigger>
              <TabsTrigger
                value="diapers"
                className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                Підгузки-труси
              </TabsTrigger>
              <TabsTrigger
                value="underpads"
                className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                Пелюшки
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                Безпека
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="general"
              className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-2 h-6 bg-blue-500 rounded-full" />
                  Головний екран (Hero)
                </h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">
                      Слоган
                    </label>
                    <Input
                      value={settings.heroSlogan}
                      onChange={(e) => setSettings({ ...settings, heroSlogan: e.target.value })}
                      className="rounded-xl p-6 text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">
                      Опис
                    </label>
                    <Textarea
                      value={settings.heroDescription}
                      onChange={(e) =>
                        setSettings({ ...settings, heroDescription: e.target.value })
                      }
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
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">
                      Email
                    </label>
                    <Input
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="rounded-xl p-6"
                      placeholder="info@vivocare.ua"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">
                      Телефон
                    </label>
                    <Input
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      className="rounded-xl p-6"
                      placeholder="+38 (0XX) XXX-XX-XX"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-bold text-slate-900 mb-4">Посилання на месенджери</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">
                        WhatsApp
                      </label>
                      <Input
                        value={settings.messengerLinks?.whatsapp || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            messengerLinks: {
                              ...settings.messengerLinks,
                              whatsapp: e.target.value,
                            },
                          })
                        }
                        className="rounded-xl"
                        placeholder="https://wa.me/380671234567"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">
                        Telegram
                      </label>
                      <Input
                        value={settings.messengerLinks?.telegram || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            messengerLinks: {
                              ...settings.messengerLinks,
                              telegram: e.target.value,
                            },
                          })
                        }
                        className="rounded-xl"
                        placeholder="https://t.me/vivocare"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">
                        Viber
                      </label>
                      <Input
                        value={settings.messengerLinks?.viber || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            messengerLinks: { ...settings.messengerLinks, viber: e.target.value },
                          })
                        }
                        className="rounded-xl"
                        placeholder="viber://chat?number=380671234567"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="diapers"
              className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="flex justify-end">
                <Button
                  onClick={addDiaperSize}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" /> Додати новий розмір
                </Button>
              </div>

              {settings.diaperSizes.map((size, sizeIndex) => (
                <div
                  key={sizeIndex}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center text-sm">
                        {size.id}
                      </div>
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

                  <div className="grid md:grid-cols-5 gap-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        ID (S, M)
                      </label>
                      <Input
                        value={size.id}
                        onChange={(e) => updateDiaperSize(sizeIndex, "id", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Назва
                      </label>
                      <Input
                        value={size.name}
                        onChange={(e) => updateDiaperSize(sizeIndex, "name", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Обхват талії
                      </label>
                      <Input
                        value={size.waist}
                        onChange={(e) => updateDiaperSize(sizeIndex, "waist", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                        placeholder="60-90 см"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Вага
                      </label>
                      <Input
                        value={size.weight || ""}
                        onChange={(e) => updateDiaperSize(sizeIndex, "weight", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                        placeholder="40-60 кг"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Кількість (шт)
                      </label>
                      <Input
                        value={size.qty || ""}
                        onChange={(e) => updateDiaperSize(sizeIndex, "qty", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                        placeholder="30 шт"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Краплі (число)
                      </label>
                      <Input
                        type="number"
                        value={size.drops || 0}
                        onChange={(e) => updateDiaperSize(sizeIndex, "drops", parseInt(e.target.value) || 0)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Бренд
                      </label>
                      <Input
                        value={size.brand || ""}
                        onChange={(e) => updateDiaperSize(sizeIndex, "brand", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                        placeholder="Vivo Care"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Тип
                      </label>
                      <Input
                        value={size.type || ""}
                        onChange={(e) => updateDiaperSize(sizeIndex, "type", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                        placeholder="підгузки-трусики (pull-up)"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Посадка
                      </label>
                      <Input
                        value={size.fit || ""}
                        onChange={(e) => updateDiaperSize(sizeIndex, "fit", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                        placeholder="еластичний пояс 360°"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-1 gap-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Особливості (Характеристики)
                      </label>
                      <Input
                        value={size.specialties || ""}
                        onChange={(e) => updateDiaperSize(sizeIndex, "specialties", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                        placeholder="дихаючі, індикатор, запах"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Короткий опис
                      </label>
                      <Textarea
                        value={size.description || ""}
                        onChange={(e) => updateDiaperSize(sizeIndex, "description", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200 min-h-[80px]"
                        placeholder="Комфортні підгузки-трусики для дорослих..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Переваги (кожна з нового рядка)
                      </label>
                      <Textarea
                        value={(size.features || []).join("\n")}
                        onChange={(e) => updateDiaperSize(sizeIndex, "features", e.target.value.split("\n"))}
                        className="bg-slate-50 rounded-lg border-slate-200 min-h-[80px]"
                        placeholder="Еластичний пояс 360°&#10;Висока поглинальна здатність"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Комфорт у користуванні
                      </label>
                      <Textarea
                        value={size.comfortText || ""}
                        onChange={(e) => updateDiaperSize(sizeIndex, "comfortText", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200 min-h-[120px]"
                        placeholder="Текст для секції комфорту..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Рекомендації щодо вибору
                      </label>
                      <Textarea
                        value={size.recommendations || ""}
                        onChange={(e) => updateDiaperSize(sizeIndex, "recommendations", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200 min-h-[120px]"
                        placeholder="Текст для секції рекомендацій..."
                      />
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h3 className="font-bold text-slate-900">Фотографії (Drag-n-Drop)</h3>
                    <ImageUploadZone
                      images={size.images || []}
                      onUpload={(urls) => handleDiaperUpload(sizeIndex, urls)}
                      onRemove={(idx) => removeDiaperImage(sizeIndex, idx)}
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-slate-900">Магазини для цього розміру</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addDiaperStore(size.id)}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Додати магазин
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      {(settings.diaperStores[size.id] || []).map((store, storeIndex) => (
                        <div
                          key={storeIndex}
                          className="flex gap-4 items-end p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group"
                        >
                          <div className="flex-1 space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              Магазин
                            </label>
                            <Input
                              value={store.name}
                              onChange={(e) =>
                                updateDiaperStore(size.id, storeIndex, "name", e.target.value)
                              }
                              className="bg-white rounded-lg border-slate-200"
                              placeholder="Назва"
                            />
                          </div>
                          <div className="flex-[3] space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              URL посилання
                            </label>
                            <div className="relative">
                              <Input
                                value={store.url}
                                onChange={(e) =>
                                  updateDiaperStore(size.id, storeIndex, "url", e.target.value)
                                }
                                className="bg-white rounded-lg border-slate-200 pr-10"
                                placeholder="https://..."
                              />
                              <a
                                href={store.url}
                                target="_blank"
                                className="absolute right-3 top-2.5 text-slate-300 hover:text-blue-500"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
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

            <TabsContent
              value="underpads"
              className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="flex justify-end">
                <Button
                  onClick={addUnderpadSize}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" /> Додати новий розмір
                </Button>
              </div>

              {settings.underpadSizes.map((size, sizeIndex) => (
                <div
                  key={sizeIndex}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
                >
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

                  <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Назва
                      </label>
                      <Input
                        value={size.name}
                        onChange={(e) => updateUnderpadSize(sizeIndex, "name", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Розмір (напр. 60x90)
                      </label>
                      <Input
                        value={size.size}
                        onChange={(e) => updateUnderpadSize(sizeIndex, "size", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Поглинання (1-10)
                      </label>
                      <Input
                        type="number"
                        value={size.absorbLevel}
                        onChange={(e) =>
                          updateUnderpadSize(sizeIndex, "absorbLevel", parseInt(e.target.value))
                        }
                        className="bg-slate-50 rounded-lg border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Кількість (шт)
                      </label>
                      <Input
                        value={size.qty}
                        onChange={(e) => updateUnderpadSize(sizeIndex, "qty", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Бренд
                      </label>
                      <Input
                        value={size.brand || ""}
                        onChange={(e) => updateUnderpadSize(sizeIndex, "brand", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                        placeholder="Vivo Care"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Тип
                      </label>
                      <Input
                        value={size.type || ""}
                        onChange={(e) => updateUnderpadSize(sizeIndex, "type", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                        placeholder="поглинаючі пелюшки"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Структура
                      </label>
                      <Input
                        value={size.fit || ""}
                        onChange={(e) => updateUnderpadSize(sizeIndex, "fit", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                        placeholder="5 шарів захисту"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-1 gap-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Особливості (Склад)
                      </label>
                      <Input
                        value={size.specialties || ""}
                        onChange={(e) => updateUnderpadSize(sizeIndex, "specialties", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200"
                        placeholder="SAP + розпушена целюлоза"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Короткий опис
                      </label>
                      <Textarea
                        value={size.description || ""}
                        onChange={(e) => updateUnderpadSize(sizeIndex, "description", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200 min-h-[80px]"
                        placeholder="Надійний гігієнічний захист для будь-яких поверхонь..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Переваги (кожна з нового рядка)
                      </label>
                      <Textarea
                        value={(size.features || []).join("\n")}
                        onChange={(e) => updateUnderpadSize(sizeIndex, "features", e.target.value.split("\n"))}
                        className="bg-slate-50 rounded-lg border-slate-200 min-h-[80px]"
                        placeholder="5 шарів поглинання&#10;100% захист від протікання"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Комфорт у користуванні
                      </label>
                      <Textarea
                        value={size.comfortText || ""}
                        onChange={(e) => updateUnderpadSize(sizeIndex, "comfortText", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200 min-h-[120px]"
                        placeholder="Текст для секції комфорту..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Рекомендації щодо використання
                      </label>
                      <Textarea
                        value={size.recommendations || ""}
                        onChange={(e) => updateUnderpadSize(sizeIndex, "recommendations", e.target.value)}
                        className="bg-slate-50 rounded-lg border-slate-200 min-h-[120px]"
                        placeholder="Текст для секції рекомендацій..."
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-900">Фотографії (Drag-n-Drop)</h3>
                    <ImageUploadZone
                      images={size.images || []}
                      onUpload={(urls) => handleUnderpadUpload(sizeIndex, urls)}
                      onRemove={(idx) => removeUnderpadImage(sizeIndex, idx)}
                    />
                  </div>
                </div>
              ))}

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 mt-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-3">
                    <div className="w-2 h-6 bg-blue-500 rounded-full" />
                    Магазини для пелюшок
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newStores = [...settings.underpadStores, { name: "", url: "" }];
                      setSettings({ ...settings, underpadStores: newStores });
                    }}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Додати магазин
                  </Button>
                </div>
                <div className="grid gap-4">
                  {settings.underpadStores.map((store, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-end p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group"
                    >
                      <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Магазин
                        </label>
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
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          URL посилання
                        </label>
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

            <TabsContent
              value="security"
              className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 max-w-md">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-2 h-6 bg-red-500 rounded-full" />
                  Зміна пароля адміністратора
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">
                      Новий пароль
                    </label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="rounded-xl p-6"
                      placeholder="Введіть новий пароль"
                    />
                  </div>
                  <Button
                    onClick={handleChangePassword}
                    className="w-full bg-slate-900 hover:bg-slate-800 rounded-xl py-6 font-bold"
                  >
                    Оновити пароль
                  </Button>
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
