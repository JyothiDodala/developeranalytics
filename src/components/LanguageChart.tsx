import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "hsl(172, 66%, 50%)",
  "hsl(152, 60%, 46%)",
  "hsl(200, 80%, 55%)",
  "hsl(40, 90%, 55%)",
  "hsl(280, 60%, 60%)",
  "hsl(0, 70%, 55%)",
  "hsl(120, 50%, 50%)",
  "hsl(320, 60%, 55%)",
];

interface LanguageChartProps {
  languages: Record<string, number>;
}

export function LanguageChart({ languages }: LanguageChartProps) {
  const data = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="rounded-lg bg-card border border-border p-6 card-glow transition-all animate-slide-up">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Language Distribution</h3>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 18%, 10%)",
                border: "1px solid hsl(220, 14%, 18%)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "hsl(210, 20%, 92%)",
              }}
              formatter={(value: number, name: string) => [`${value} repos`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 justify-center">
        {data.map((d, i) => (
          <span key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            {d.name}
          </span>
        ))}
      </div>
    </div>
  );
}
