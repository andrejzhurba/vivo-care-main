import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vivo Care — Підгузки та пелюшки" },
      { name: "description", content: "Підгузки-труси та поглинаючі пелюшки Vivo Care. Європейська якість." },
      { property: "og:title", content: "Vivo Care — Підгузки та пелюшки" },
      { name: "twitter:title", content: "Vivo Care — Підгузки та пелюшки" },
      { property: "og:description", content: "Підгузки-труси та поглинаючі пелюшки Vivo Care. Європейська якість." },
      { name: "twitter:description", content: "Підгузки-труси та поглинаючі пелюшки Vivo Care. Європейська якість." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/602e8559-c659-492e-bb4b-26d4470da4d2" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/602e8559-c659-492e-bb4b-26d4470da4d2" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Vivo Care",
              "url": "https://vivocare.com.ua",
              "logo": "https://vivocare.com.ua/logo.png",
              "description": "Професійні гігієнічні засоби для дорослих: підгузки-труси та поглинаючі пелюшки Vivo Care.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Київ",
                "addressCountry": "UA"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+38-067-123-45-67",
                "contactType": "customer service",
                "areaServed": "UA",
                "availableLanguage": ["Ukrainian", "Russian"]
              }
            })
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
