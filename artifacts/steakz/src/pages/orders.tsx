import { Brand } from "@/components/Brand";
import { useStore } from "@/store";

export default function OrdersPage() {
  const { orders } = useStore();

  return (
    <div className="min-h-screen w-full relative bg-steak">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 p-6">
        <Brand />
      </div>

      <div className="relative z-10 px-6 md:px-12 pb-16">
        <h1 className="text-center text-white font-serif-brand text-4xl mb-8">Previous Orders</h1>

        <div className="bg-white/95 shadow-2xl overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-bold">
                <th className="px-4 py-3 border-b">Order Number</th>
                <th className="px-4 py-3 border-b">Customer Name</th>
                <th className="px-4 py-3 border-b">Phone Number</th>
                <th className="px-4 py-3 border-b">Steak</th>
                <th className="px-4 py-3 border-b">Q</th>
                <th className="px-4 py-3 border-b">Sub</th>
                <th className="px-4 py-3 border-b">Q</th>
                <th className="px-4 py-3 border-b">Drinks</th>
                <th className="px-4 py-3 border-b">Q</th>
                <th className="px-4 py-3 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.orderNumber} className="text-sm hover:bg-gray-50">
                  <td className="px-4 py-3 border-b font-bold">{o.orderNumber}</td>
                  <td className="px-4 py-3 border-b">{o.customerName}</td>
                  <td className="px-4 py-3 border-b">{o.phone}</td>
                  <td className="px-4 py-3 border-b">{o.steak}</td>
                  <td className="px-4 py-3 border-b">{o.steakQty}</td>
                  <td className="px-4 py-3 border-b">{o.sub}</td>
                  <td className="px-4 py-3 border-b">{o.subQty}</td>
                  <td className="px-4 py-3 border-b">{o.drink}</td>
                  <td className="px-4 py-3 border-b">{o.drinkQty}</td>
                  <td className="px-4 py-3 border-b">{o.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
