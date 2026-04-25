import { useState, FormEvent, useMemo } from "react";
import { useLocation } from "wouter";
import { Brand } from "@/components/Brand";
import {
  useStore,
  STEAK_PRICES,
  SUB_PRICES,
  DRINK_PRICES,
  SteakType,
  SubType,
  DrinkType,
} from "@/store";

export default function OrderPage() {
  const { addOrder } = useStore();
  const [, setLocation] = useLocation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [steakOn, setSteakOn] = useState(true);
  const [steak, setSteak] = useState<SteakType>("Strip");
  const [steakQty, setSteakQty] = useState(1);
  const [subOn, setSubOn] = useState(true);
  const [sub, setSub] = useState<SubType>("Fries");
  const [subQty, setSubQty] = useState(1);
  const [drinkOn, setDrinkOn] = useState(true);
  const [drink, setDrink] = useState<DrinkType>("Soda");
  const [drinkQty, setDrinkQty] = useState(1);

  const subTotal = useMemo(() => {
    let t = 0;
    if (steakOn) t += STEAK_PRICES[steak] * steakQty;
    if (subOn) t += SUB_PRICES[sub] * subQty;
    if (drinkOn) t += DRINK_PRICES[drink] * drinkQty;
    return Math.round(t * 100) / 100;
  }, [steakOn, steak, steakQty, subOn, sub, subQty, drinkOn, drink, drinkQty]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addOrder({
      customerName: name,
      phone,
      steak,
      steakQty: steakOn ? steakQty : 0,
      sub,
      subQty: subOn ? subQty : 0,
      drink,
      drinkQty: drinkOn ? drinkQty : 0,
      total: subTotal,
    });
    setLocation("/orders");
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#2d5a43" }}>
      <div className="p-6">
        <Brand />
      </div>

      <form onSubmit={handleSubmit} className="px-6 md:px-16 pb-16 max-w-5xl text-white">
        <div className="space-y-5 text-2xl">
          <div className="flex items-center gap-3 flex-wrap">
            <label className="font-serif-brand">Customer Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="flex-1 min-w-[300px] bg-white text-black px-2 py-1 text-base"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <label className="font-serif-brand">Customer Phone Number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="flex-1 min-w-[300px] bg-white text-black px-2 py-1 text-base"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="checkbox"
              checked={steakOn}
              onChange={(e) => setSteakOn(e.target.checked)}
              className="w-4 h-4 accent-white"
            />
            <label className="font-serif-brand">Steak</label>
            <select
              value={steak}
              onChange={(e) => setSteak(e.target.value as SteakType)}
              className="bg-gray-200 text-black px-2 py-1 text-base"
              disabled={!steakOn}
            >
              {(Object.keys(STEAK_PRICES) as SteakType[]).slice(0, 4).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <label className="font-serif-brand">Quantity:</label>
            <input
              type="number"
              min={0}
              value={steakQty}
              onChange={(e) => setSteakQty(Math.max(0, Number(e.target.value)))}
              disabled={!steakOn}
              className="flex-1 min-w-[200px] bg-white text-black px-2 py-1 text-base"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="checkbox"
              checked={subOn}
              onChange={(e) => setSubOn(e.target.checked)}
              className="w-4 h-4 accent-white"
            />
            <label className="font-serif-brand">Sub</label>
            <select
              value={sub}
              onChange={(e) => setSub(e.target.value as SubType)}
              className="bg-gray-200 text-black px-2 py-1 text-base"
              disabled={!subOn}
            >
              {(Object.keys(SUB_PRICES) as SubType[]).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <label className="font-serif-brand">Quantity:</label>
            <input
              type="number"
              min={0}
              value={subQty}
              onChange={(e) => setSubQty(Math.max(0, Number(e.target.value)))}
              disabled={!subOn}
              className="flex-1 min-w-[200px] bg-white text-black px-2 py-1 text-base"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="checkbox"
              checked={drinkOn}
              onChange={(e) => setDrinkOn(e.target.checked)}
              className="w-4 h-4 accent-white"
            />
            <label className="font-serif-brand">Drinks</label>
            <select
              value={drink}
              onChange={(e) => setDrink(e.target.value as DrinkType)}
              className="bg-gray-200 text-black px-2 py-1 text-base"
              disabled={!drinkOn}
            >
              {(Object.keys(DRINK_PRICES) as DrinkType[]).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <label className="font-serif-brand">Quantity:</label>
            <input
              type="number"
              min={0}
              value={drinkQty}
              onChange={(e) => setDrinkQty(Math.max(0, Number(e.target.value)))}
              disabled={!drinkOn}
              className="flex-1 min-w-[200px] bg-white text-black px-2 py-1 text-base"
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-3xl font-serif-brand">Sub Total $ {subTotal.toFixed(2)}</p>
          <button
            type="submit"
            className="mt-6 px-4 py-1 text-xl font-bold border-2 border-black"
            style={{ backgroundColor: "#12e06d", color: "#0d4a2b" }}
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
}
