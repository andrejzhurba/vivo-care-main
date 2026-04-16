import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin - VIVO Care" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Адмін-панель VIVO Care</h1>

          <div className="grid sm:grid-cols-2 gap-6">
            <a
              href="/admin/diapers"
              className="card-product p-8 text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h2 className="text-2xl font-bold mb-2">Підгузки-труси</h2>
              <p className="text-muted-foreground">Управління розмірами</p>
            </a>
            <a
              href="/admin/underpads"
              className="card-product p-8 text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h2 className="text-2xl font-bold mb-2">Пелюшки</h2>
              <p className="text-muted-foreground">Управління розмірами</p>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
