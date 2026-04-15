interface SizeRow {
  size: string;
  label: string;
  waist: string;
  absorption: string;
  qty: string;
}

interface SizeTableProps {
  sizes: SizeRow[];
}

export function SizeTable({ sizes }: SizeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="py-3 px-3 font-semibold text-foreground">Розмір</th>
            <th className="py-3 px-3 font-semibold text-foreground">Обхват</th>
            <th className="py-3 px-3 font-semibold text-foreground">Поглинання</th>
            <th className="py-3 px-3 font-semibold text-foreground text-center">Кількість</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((row) => (
            <tr key={row.size} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
              <td className="py-3.5 px-3">
                <div className="flex items-center gap-2">
                  <span className="badge-size">{row.size}</span>
                  <span className="text-muted-foreground text-xs">{row.label}</span>
                </div>
              </td>
              <td className="py-3.5 px-3 text-foreground">{row.waist}</td>
              <td className="py-3.5 px-3 text-foreground">{row.absorption}</td>
              <td className="py-3.5 px-3 text-center text-foreground font-medium">{row.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
