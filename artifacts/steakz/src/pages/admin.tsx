import { Link } from "wouter";
import { Brand } from "@/components/Brand";

interface TileProps {
  label: string;
  to: string;
  bg: string;
  textColor?: string;
}

function Tile({ label, to, bg, textColor = "#ffffff" }: TileProps) {
  return (
    <Link href={to}>
      <div
        className="cursor-pointer flex items-center justify-center w-44 h-24 shadow-lg hover:scale-105 transition-transform"
        style={{ backgroundColor: bg, color: textColor }}
      >
        <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {label}
        </span>
      </div>
    </Link>
  );
}

export default function AdminPage() {
  return (
    <div className="bg-steak min-h-screen w-full relative">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 p-6">
        <Brand light={false} />
      </div>

      <div className="relative z-10 flex flex-col items-end gap-6 px-6 md:px-20 py-8 min-h-[80vh] justify-center">
        <Tile label="Add Employee" to="/add-employee" bg="#7ed957" />
        <Tile label="Delete Employee" to="/delete-employee" bg="#4cd9a4" />
        <Tile label="Previous Orders" to="/orders" bg="#6b4f3a" />
        <Tile label="Dashboard" to="/dashboard" bg="#6b6838" />
      </div>
    </div>
  );
}
