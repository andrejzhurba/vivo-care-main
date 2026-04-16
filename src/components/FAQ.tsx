import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export function FAQ({ items, title = "Популярні питання" }: FAQProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          <div className="h-1 w-16 bg-blue-500 mx-auto rounded-full" />
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {items.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-slate-100 rounded-[2rem] px-8 py-2 shadow-sm data-[state=open]:border-blue-200 data-[state=open]:shadow-md transition-all"
            >
              <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline hover:text-blue-600 transition-colors py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6 pt-2 font-light">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
