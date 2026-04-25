import { Link } from "wouter";
import { Brand } from "@/components/Brand";

interface TileProps {
  label: string;
  to: string;
  bg: string;
  textColor?: string;
}

function Tile({ label, to, bg, textColor = "#f5ede0" }: TileProps) {
  return (
    <Link href={to}>
      <div
        className="cursor-pointer flex items-center justify-center w-52 h-24 rounded-xl shadow-2xl hover:scale-105 transition-all backdrop-blur-md"
        style={{ backgroundColor: bg, color: textColor, border: "1px solid rgba(212, 165, 116, 0.3)" }}
      >
        <span className="font-bold text-lg tracking-wide" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {label}
        </span>
      </div>
    </Link>
  );
}

export default function AdminPage() {
  return (
    <div className="bg-steak min-h-screen w-full relative">
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(28, 25, 23, 0.35)" }} />
      <div className="relative z-10 p-6">
        <Brand className="text-[#f5ede0]" />
      </div>

      <div className="relative z-10 flex flex-col items-end gap-5 px-6 md:px-20 py-8 min-h-[80vh] justify-center">
        <Tile label="Add Employee" to="/add-employee" bg="rgba(122, 132, 113, 0.92)" textColor="#1c1917" />
        <Tile label="Delete Employee" to="/delete-employee" bg="rgba(184, 84, 61, 0.85)" />
        <Tile label="Previous Orders" to="/orders" bg="rgba(28, 25, 23, 0.85)" textColor="#d4a574" />
        <Tile label="Dashboard" to="/dashboard" bg="rgba(212, 165, 116, 0.92)" textColor="#1c1917" />
      </div>
    </div>
  );
}
