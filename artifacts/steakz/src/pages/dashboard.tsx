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
  "T-bone": "#ff5d8b",
  RibEye: "#3aa6ff",
  Filet: "#ffc35a",
  Strip: "#0d0d0d",
  Sirloin: "#7fc6e8",
  Porterhouse: "#3ba27a",
};

const SUB_COLORS: Record<SubType, string> = {
  Salad: "#fff200",
  "Grilled Potatoes": "#9be066",
  Fries: "#a3a3a3",
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
    <div className="min-h-screen w-full" style={{ backgroundColor: "#1a2a44" }}>
      <div className="p-6 flex items-center gap-6">
        <Brand className="text-yellow-400" />
      </div>

      <div className="px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-2">
            <h3 className="text-white text-lg mb-2">
              Customer Preference on Steak type
            </h3>
            <div className="flex flex-wrap gap-3 mb-3 text-xs">
              {steakData.map((s) => (
                <div key={s.name} className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 inline-block"
                    style={{ backgroundColor: STEAK_COLORS[s.name as SteakType] }}
                  />
                  <span className="text-white">{s.name}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <PieChart width={320} height={280}>
                <Tooltip />
                <Pie
                  data={steakData}
                  dataKey="value"
                  nameKey="name"
                  cx={160}
                  cy={140}
                  outerRadius={120}
                  isAnimationActive={false}
                >
                  {steakData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STEAK_COLORS[entry.name as SteakType]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>

          <div className="p-2">
            <h3 className="text-white text-lg mb-2">Preferred Sub Dish</h3>
            <div className="flex flex-wrap gap-3 mb-3 text-xs">
              {subData.map((s) => (
                <div key={s.name} className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 inline-block"
                    style={{ backgroundColor: SUB_COLORS[s.name as SubType] }}
                  />
                  <span className="text-white">{s.name}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <PieChart width={320} height={280}>
                <Tooltip />
                <Pie
                  data={subData}
                  dataKey="value"
                  nameKey="name"
                  cx={160}
                  cy={140}
                  outerRadius={120}
                  isAnimationActive={false}
                >
                  {subData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={SUB_COLORS[entry.name as SubType]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>

          <div className="p-2">
            <h3 className="text-white text-lg mb-2">Monthly Income by Stores</h3>
            <div className="flex items-center gap-2 mb-3 text-xs justify-center">
              <span className="w-3 h-3 inline-block bg-[#dbe7ff]" />
              <span className="text-white">Income (thousand USD)</span>
            </div>
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer>
                <BarChart data={STORE_INCOME}>
                  <XAxis
                    dataKey="store"
                    stroke="#bbb"
                    tick={{ fill: "#bbb", fontSize: 11 }}
                    angle={-25}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis stroke="#bbb" tick={{ fill: "#bbb" }} />
                  <Tooltip />
                  <Bar dataKey="income" fill="#dbe7ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-10 max-w-2xl">
          <h2 className="text-white text-2xl mb-4">
            Top 5 Employee Ratings by service(monthly)
          </h2>
          <div className="bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-3 font-bold">Employee ID</th>
                  <th className="px-4 py-3 font-bold">Employee Name</th>
                  <th className="px-4 py-3 font-bold">Points</th>
                </tr>
              </thead>
              <tbody>
                {top5.map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="px-4 py-3">{e.id}</td>
                    <td className="px-4 py-3">{e.name}</td>
                    <td className="px-4 py-3">{e.points}</td>
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
