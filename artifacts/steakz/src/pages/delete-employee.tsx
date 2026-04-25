import { Brand } from "@/components/Brand";
import { useStore } from "@/store";

export default function DeleteEmployeePage() {
  const { employees, deleteEmployee } = useStore();

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#2d5a43" }}>
      <div className="p-6">
        <Brand />
      </div>
      <div className="px-6 md:px-16 pb-16 max-w-3xl">
        <h1 className="text-white font-serif-brand text-4xl mb-8">Delete Employee</h1>

        <div className="bg-white/95 shadow-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-bold">
                <th className="px-4 py-2 border-b">Employee ID</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Points</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id} className="text-sm">
                  <td className="px-4 py-2 border-b">{e.id}</td>
                  <td className="px-4 py-2 border-b">{e.name}</td>
                  <td className="px-4 py-2 border-b">{e.points}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => deleteEmployee(e.id)}
                      className="px-3 py-1 text-white font-semibold bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
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
