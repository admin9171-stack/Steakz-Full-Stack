import { Brand } from "@/components/Brand";
import { useStore } from "@/store";

export default function OrdersPage() {
  const { orders } = useStore();

  return (
    <div className="min-h-screen w-full relative bg-steak">
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(28, 25, 23, 0.65)" }} />
      <div className="relative z-10 p-6">
        <Brand className="text-[#d4a574]" />
      </div>

      <div className="relative z-10 px-6 md:px-12 pb-16">
        <h1 className="text-center text-[#f5ede0] text-4xl mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Previous Orders
        </h1>

        <div className="rounded-2xl shadow-2xl overflow-x-auto backdrop-blur-md" style={{ backgroundColor: "rgba(28, 25, 23, 0.85)", border: "1px solid rgba(212, 165, 116, 0.2)" }}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider" style={{ backgroundColor: "rgba(15, 23, 42, 0.6)" }}>
                <th className="px-4 py-4 font-semibold text-[#d4a574]">Order #</th>
                <th className="px-4 py-4 font-semibold text-[#d4a574]">Customer Name</th>
                <th className="px-4 py-4 font-semibold text-[#d4a574]">Phone Number</th>
                <th className="px-4 py-4 font-semibold text-[#d4a574]">Steak</th>
                <th className="px-4 py-4 font-semibold text-[#d4a574]">Q</th>
                <th className="px-4 py-4 font-semibold text-[#d4a574]">Sub</th>
                <th className="px-4 py-4 font-semibold text-[#d4a574]">Q</th>
                <th className="px-4 py-4 font-semibold text-[#d4a574]">Drinks</th>
                <th className="px-4 py-4 font-semibold text-[#d4a574]">Q</th>
                <th className="px-4 py-4 font-semibold text-[#d4a574]">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.orderNumber} className="text-sm hover:bg-white/5 transition-colors" style={{ borderTop: "1px solid rgba(212, 165, 116, 0.1)" }}>
                  <td className="px-4 py-3 font-bold text-[#d4a574]">{o.orderNumber}</td>
                  <td className="px-4 py-3 text-[#f5ede0]">{o.customerName}</td>
                  <td className="px-4 py-3 text-[#cbd5e1]">{o.phone}</td>
                  <td className="px-4 py-3 text-[#f5ede0]">{o.steak}</td>
                  <td className="px-4 py-3 text-[#cbd5e1]">{o.steakQty}</td>
                  <td className="px-4 py-3 text-[#f5ede0]">{o.sub}</td>
                  <td className="px-4 py-3 text-[#cbd5e1]">{o.subQty}</td>
                  <td className="px-4 py-3 text-[#f5ede0]">{o.drink}</td>
                  <td className="px-4 py-3 text-[#cbd5e1]">{o.drinkQty}</td>
                  <td className="px-4 py-3 font-semibold text-[#d4a574]">${o.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
