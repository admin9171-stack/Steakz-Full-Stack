import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { useStore } from "@/store";
import { Brand } from "@/components/Brand";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [, setLocation] = useLocation();
  const { login } = useStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login();
    setLocation("/");
  };

  return (
    <div className="bg-steak min-h-screen w-full relative">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 p-6">
        <Brand />
      </div>

      <div className="relative z-10 flex items-center justify-end px-6 md:px-20 pb-20 pt-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-10 shadow-2xl"
          style={{ backgroundColor: "#8b864e" }}
        >
          <h2 className="text-center text-white text-3xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Log In
          </h2>

          <label className="block text-white text-lg mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700 }}>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-6 px-3 py-2 bg-white text-black focus:outline-none border-0"
            required
          />

          <label className="block text-white text-lg mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontWeight: 700 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 px-3 py-2 bg-white text-black focus:outline-none border-0"
            required
          />

          <label className="flex items-center gap-2 text-white text-sm mb-8 cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="w-4 h-4 accent-white"
            />
            Check me out
          </label>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-1 text-lg font-semibold border-2 border-black"
              style={{ backgroundColor: "#12e06d", color: "#0d4a2b" }}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
