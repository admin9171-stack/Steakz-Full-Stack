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

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#2d5a43" }}>
      <div className="p-6">
        <Brand />
      </div>
      <div className="px-6 md:px-16 pb-16 max-w-3xl">
        <h1 className="text-white font-serif-brand text-4xl mb-8">Add Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-5 text-white text-xl">
          <div className="flex items-center gap-3 flex-wrap">
            <label className="font-serif-brand">Employee Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="flex-1 min-w-[280px] bg-white text-black px-2 py-1 text-base"
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <label className="font-serif-brand">Service Points:</label>
            <input
              type="number"
              min={0}
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              required
              className="flex-1 min-w-[280px] bg-white text-black px-2 py-1 text-base"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-1 text-xl font-bold border-2 border-black"
            style={{ backgroundColor: "#12e06d", color: "#0d4a2b" }}
          >
            Add Employee
          </button>
        </form>

        <div className="mt-12">
          <h2 className="text-white font-serif-brand text-2xl mb-4">Current Employees</h2>
          <div className="bg-white/95 shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-bold">
                  <th className="px-4 py-2 border-b">Employee ID</th>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Points</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id} className="text-sm">
                    <td className="px-4 py-2 border-b">{e.id}</td>
                    <td className="px-4 py-2 border-b">{e.name}</td>
                    <td className="px-4 py-2 border-b">{e.points}</td>
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
