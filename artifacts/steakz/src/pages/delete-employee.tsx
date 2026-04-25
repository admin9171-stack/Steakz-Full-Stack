import { Brand } from "@/components/Brand";
import { useStore } from "@/store";

export default function DeleteEmployeePage() {
  const { employees, deleteEmployee } = useStore();

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#1c1917" }}>
      <div className="p-6">
        <Brand className="text-[#d4a574]" />
      </div>
      <div className="px-6 md:px-16 pb-16 max-w-4xl mx-auto">
        <h1 className="text-[#f5ede0] text-4xl mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Delete Employee</h1>

        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "rgba(42, 37, 34, 0.6)", border: "1px solid rgba(212, 165, 116, 0.2)" }}>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider" style={{ backgroundColor: "rgba(15, 23, 42, 0.5)" }}>
                <th className="px-6 py-4 font-semibold text-[#d4a574]">Employee ID</th>
                <th className="px-6 py-4 font-semibold text-[#d4a574]">Name</th>
                <th className="px-6 py-4 font-semibold text-[#d4a574]">Points</th>
                <th className="px-6 py-4 font-semibold text-[#d4a574]">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id} className="text-sm" style={{ borderTop: "1px solid rgba(212, 165, 116, 0.1)" }}>
                  <td className="px-6 py-3 text-[#cbd5e1]">{e.id}</td>
                  <td className="px-6 py-3 text-[#f5ede0]">{e.name}</td>
                  <td className="px-6 py-3 text-[#d4a574] font-semibold">{e.points}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => deleteEmployee(e.id)}
                      className="px-4 py-1.5 text-[#f5ede0] text-xs font-semibold tracking-wide rounded-lg transition-all hover:opacity-90"
                      style={{ backgroundColor: "#b8543d" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-[#94a3b8]">
                    No employees yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
