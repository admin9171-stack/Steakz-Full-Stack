import { useMemo } from "react";
import { Brand } from "@/components/Brand";
import { useStore, SteakType, SubType } from "@/store";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const STEAK_COLORS: Record<SteakType, string> = {
  "T-bone": "#d4a574",
  RibEye: "#b8543d",
  Filet: "#e0b886",
  Strip: "#1c1917",
  Sirloin: "#7a8471",
  Porterhouse: "#a16936",
};

const SUB_COLORS: Record<SubType, string> = {
  Salad: "#7a8471",
  "Grilled Potatoes": "#d4a574",
  Fries: "#b8543d",
};

const STORE_INCOME = [
  { store: "Store1", income: 60 },
  { store: "Store2", income: 70 },
  { store: "Store3", income: 40 },
  { store: "Store4", income: 50 },
  { store: "Store5", income: 80 },
  { store: "Store6", income: 25 },
  { store: "Store7", income: 35 },
];

export default function DashboardPage() {
  const { orders, employees } = useStore();

  const steakData = useMemo(() => {
    const counts: Record<string, number> = {};
    const allSteaks: SteakType[] = [
      "T-bone",
      "RibEye",
      "Filet",
      "Strip",
      "Sirloin",
      "Porterhouse",
    ];
    allSteaks.forEach((s) => (counts[s] = 0));
    orders.forEach((o) => {
      counts[o.steak] = (counts[o.steak] ?? 0) + o.steakQty;
    });
    allSteaks.forEach((s) => {
      if (counts[s] === 0) counts[s] = 1;
    });
    return allSteaks.map((s) => ({ name: s, value: counts[s] }));
  }, [orders]);

  const subData = useMemo(() => {
    const counts: Record<string, number> = {
      Salad: 0,
      "Grilled Potatoes": 0,
      Fries: 0,
    };
    orders.forEach((o) => {
      counts[o.sub] = (counts[o.sub] ?? 0) + o.subQty;
    });
    if (
      counts.Salad === 0 &&
      counts["Grilled Potatoes"] === 0 &&
      counts.Fries === 0
    ) {
      counts.Salad = 1;
      counts["Grilled Potatoes"] = 1;
      counts.Fries = 1;
    }
    return (Object.keys(counts) as SubType[]).map((k) => ({
      name: k,
      value: counts[k],
    }));
  }, [orders]);

  const top5 = useMemo(() => {
    return [...employees].sort((a, b) => b.points - a.points).slice(0, 5);
  }, [employees]);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#0f172a" }}>
      <div className="p-6 flex items-center gap-6">
        <Brand className="text-[#d4a574]" />
      </div>

      <div className="px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl" style={{ backgroundColor: "#1e293b", border: "1px solid rgba(212, 165, 116, 0.15)" }}>
            <h3 className="text-[#f5ede0] text-base mb-3 font-semibold tracking-wide">
              Customer Preference on Steak Type
            </h3>
            <div className="flex flex-wrap gap-3 mb-3 text-xs">
              {steakData.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 inline-block rounded-sm"
                    style={{ backgroundColor: STEAK_COLORS[s.name as SteakType] }}
                  />
                  <span className="text-[#cbd5e1]">{s.name}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <PieChart width={300} height={260}>
                <Tooltip />
                <Pie
                  data={steakData}
                  dataKey="value"
                  nameKey="name"
                  cx={150}
                  cy={130}
                  outerRadius={110}
                  isAnimationActive={false}
                >
                  {steakData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STEAK_COLORS[entry.name as SteakType]}
                      stroke="#1e293b"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>

          <div className="p-6 rounded-2xl" style={{ backgroundColor: "#1e293b", border: "1px solid rgba(212, 165, 116, 0.15)" }}>
            <h3 className="text-[#f5ede0] text-base mb-3 font-semibold tracking-wide">Preferred Sub Dish</h3>
            <div className="flex flex-wrap gap-3 mb-3 text-xs">
              {subData.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 inline-block rounded-sm"
                    style={{ backgroundColor: SUB_COLORS[s.name as SubType] }}
                  />
                  <span className="text-[#cbd5e1]">{s.name}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <PieChart width={300} height={260}>
                <Tooltip />
                <Pie
                  data={subData}
                  dataKey="value"
                  nameKey="name"
                  cx={150}
                  cy={130}
                  outerRadius={110}
                  isAnimationActive={false}
                >
                  {subData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={SUB_COLORS[entry.name as SubType]}
                      stroke="#1e293b"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>

          <div className="p-6 rounded-2xl" style={{ backgroundColor: "#1e293b", border: "1px solid rgba(212, 165, 116, 0.15)" }}>
            <h3 className="text-[#f5ede0] text-base mb-3 font-semibold tracking-wide">Monthly Income by Stores</h3>
            <div className="flex items-center gap-2 mb-3 text-xs">
              <span className="w-2.5 h-2.5 inline-block rounded-sm" style={{ backgroundColor: "#d4a574" }} />
              <span className="text-[#cbd5e1]">Income (thousand USD)</span>
            </div>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={STORE_INCOME}>
                  <XAxis
                    dataKey="store"
                    stroke="#64748b"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    angle={-25}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis stroke="#64748b" tick={{ fill: "#94a3b8" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #d4a574", color: "#f5ede0" }} />
                  <Bar dataKey="income" fill="#d4a574" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-10 max-w-3xl">
          <h2 className="text-[#f5ede0] text-2xl mb-4 font-semibold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Top 5 Employee Ratings by Service <span style={{ color: "#d4a574" }}>(monthly)</span>
          </h2>
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1e293b", border: "1px solid rgba(212, 165, 116, 0.15)" }}>
            <table className="w-full">
              <thead>
                <tr className="text-left" style={{ backgroundColor: "#0f172a" }}>
                  <th className="px-6 py-4 font-semibold text-[#d4a574] tracking-wide text-sm uppercase">Employee ID</th>
                  <th className="px-6 py-4 font-semibold text-[#d4a574] tracking-wide text-sm uppercase">Employee Name</th>
                  <th className="px-6 py-4 font-semibold text-[#d4a574] tracking-wide text-sm uppercase">Points</th>
                </tr>
              </thead>
              <tbody>
                {top5.map((e) => (
                  <tr key={e.id} style={{ borderTop: "1px solid rgba(212, 165, 116, 0.1)" }}>
                    <td className="px-6 py-4 text-[#cbd5e1]">{e.id}</td>
                    <td className="px-6 py-4 text-[#f5ede0]">{e.name}</td>
                    <td className="px-6 py-4 text-[#d4a574] font-semibold">{e.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
