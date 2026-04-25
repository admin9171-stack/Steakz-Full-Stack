import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { Brand } from "@/components/Brand";
import { useStore } from "@/store";

export default function AddEmployeePage() {
  const { addEmployee, employees } = useStore();
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addEmployee({ name, points });
    setName("");
    setPoints(0);
    setLocation("/admin");
  };

  const inputCls = "flex-1 min-w-[280px] px-4 py-2 rounded-lg text-[#f5ede0] focus:outline-none";
  const inputStyle = { backgroundColor: "rgba(245, 237, 224, 0.08)", border: "1px solid rgba(212, 165, 116, 0.3)" };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#1c1917" }}>
      <div className="p-6">
        <Brand className="text-[#d4a574]" />
      </div>
      <div className="px-6 md:px-16 pb-16 max-w-4xl mx-auto">
        <h1 className="text-[#f5ede0] text-4xl mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Add Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8" style={{ backgroundColor: "rgba(42, 37, 34, 0.6)", border: "1px solid rgba(212, 165, 116, 0.2)" }}>
          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-[#d4a574] tracking-wide w-44">Employee Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputCls}
              style={inputStyle}
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-[#d4a574] tracking-wide w-44">Service Points</label>
            <input
              type="number"
              min={0}
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              required
              className={inputCls}
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-8 py-3 font-semibold rounded-lg hover:opacity-90 transition-all tracking-wide"
            style={{ backgroundColor: "#d4a574", color: "#1c1917" }}
          >
            Add Employee
          </button>
        </form>

        <div className="mt-12">
          <h2 className="text-[#f5ede0] text-2xl mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Current Employees</h2>
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "rgba(42, 37, 34, 0.6)", border: "1px solid rgba(212, 165, 116, 0.2)" }}>
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider" style={{ backgroundColor: "rgba(15, 23, 42, 0.5)" }}>
                  <th className="px-6 py-4 font-semibold text-[#d4a574]">Employee ID</th>
                  <th className="px-6 py-4 font-semibold text-[#d4a574]">Name</th>
                  <th className="px-6 py-4 font-semibold text-[#d4a574]">Points</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id} className="text-sm" style={{ borderTop: "1px solid rgba(212, 165, 116, 0.1)" }}>
                    <td className="px-6 py-3 text-[#cbd5e1]">{e.id}</td>
                    <td className="px-6 py-3 text-[#f5ede0]">{e.name}</td>
                    <td className="px-6 py-3 text-[#d4a574] font-semibold">{e.points}</td>
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
