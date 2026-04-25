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

  const inputCls = "flex-1 min-w-[280px] px-4 py-2 rounded-lg text-[#f5ede0] focus:outline-none transition-colors";
  const inputStyle = { backgroundColor: "rgba(245, 237, 224, 0.08)", border: "1px solid rgba(212, 165, 116, 0.3)" };
  const selectCls = "px-3 py-2 rounded-lg text-[#f5ede0] focus:outline-none";
  const selectStyle = { backgroundColor: "rgba(245, 237, 224, 0.12)", border: "1px solid rgba(212, 165, 116, 0.3)" };
  const labelCls = "text-[#d4a574] tracking-wide text-base";

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#1c1917" }}>
      <div className="p-6">
        <Brand className="text-[#d4a574]" />
      </div>

      <form onSubmit={handleSubmit} className="px-6 md:px-16 pb-16 max-w-4xl mx-auto">
        <div className="rounded-2xl p-8 md:p-10 shadow-2xl" style={{ backgroundColor: "rgba(42, 37, 34, 0.6)", border: "1px solid rgba(212, 165, 116, 0.2)" }}>
          <h2 className="text-3xl mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f5ede0" }}>
            New Order
          </h2>

          <div className="space-y-5 text-base">
            <div className="flex items-center gap-3 flex-wrap">
              <label className={`${labelCls} w-56`}>Customer Name</label>
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
              <label className={`${labelCls} w-56`}>Customer Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={inputCls}
                style={inputStyle}
              />
            </div>

            <div className="h-px my-2" style={{ backgroundColor: "rgba(212, 165, 116, 0.2)" }} />

            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="checkbox"
                checked={steakOn}
                onChange={(e) => setSteakOn(e.target.checked)}
                className="w-4 h-4"
                style={{ accentColor: "#d4a574" }}
              />
              <label className={`${labelCls} w-20`}>Steak</label>
              <select
                value={steak}
                onChange={(e) => setSteak(e.target.value as SteakType)}
                className={selectCls}
                style={selectStyle}
                disabled={!steakOn}
              >
                {(Object.keys(STEAK_PRICES) as SteakType[]).slice(0, 4).map((s) => (
                  <option key={s} value={s} style={{ color: "#1c1917" }}>{s}</option>
                ))}
              </select>
              <label className={`${labelCls} ml-2`}>Quantity</label>
              <input
                type="number"
                min={0}
                value={steakQty}
                onChange={(e) => setSteakQty(Math.max(0, Number(e.target.value)))}
                disabled={!steakOn}
                className={inputCls}
                style={inputStyle}
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="checkbox"
                checked={subOn}
                onChange={(e) => setSubOn(e.target.checked)}
                className="w-4 h-4"
                style={{ accentColor: "#d4a574" }}
              />
              <label className={`${labelCls} w-20`}>Sub</label>
              <select
                value={sub}
                onChange={(e) => setSub(e.target.value as SubType)}
                className={selectCls}
                style={selectStyle}
                disabled={!subOn}
              >
                {(Object.keys(SUB_PRICES) as SubType[]).map((s) => (
                  <option key={s} value={s} style={{ color: "#1c1917" }}>{s}</option>
                ))}
              </select>
              <label className={`${labelCls} ml-2`}>Quantity</label>
              <input
                type="number"
                min={0}
                value={subQty}
                onChange={(e) => setSubQty(Math.max(0, Number(e.target.value)))}
                disabled={!subOn}
                className={inputCls}
                style={inputStyle}
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="checkbox"
                checked={drinkOn}
                onChange={(e) => setDrinkOn(e.target.checked)}
                className="w-4 h-4"
                style={{ accentColor: "#d4a574" }}
              />
              <label className={`${labelCls} w-20`}>Drinks</label>
              <select
                value={drink}
                onChange={(e) => setDrink(e.target.value as DrinkType)}
                className={selectCls}
                style={selectStyle}
                disabled={!drinkOn}
              >
                {(Object.keys(DRINK_PRICES) as DrinkType[]).map((d) => (
                  <option key={d} value={d} style={{ color: "#1c1917" }}>{d}</option>
                ))}
              </select>
              <label className={`${labelCls} ml-2`}>Quantity</label>
              <input
                type="number"
                min={0}
                value={drinkQty}
                onChange={(e) => setDrinkQty(Math.max(0, Number(e.target.value)))}
                disabled={!drinkOn}
                className={inputCls}
                style={inputStyle}
              />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between flex-wrap gap-4 pt-6" style={{ borderTop: "1px solid rgba(212, 165, 116, 0.2)" }}>
            <p className="text-3xl" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f5ede0" }}>
              Sub Total <span style={{ color: "#d4a574" }}>${subTotal.toFixed(2)}</span>
            </p>
            <button
              type="submit"
              className="px-8 py-3 text-base font-semibold rounded-lg hover:opacity-90 transition-all tracking-wide"
              style={{ backgroundColor: "#d4a574", color: "#1c1917" }}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
