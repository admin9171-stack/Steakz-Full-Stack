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
          className="w-full max-w-md p-10 rounded-2xl shadow-2xl backdrop-blur-md"
          style={{ backgroundColor: "rgba(28, 25, 23, 0.92)", border: "1px solid rgba(212, 165, 116, 0.25)" }}
        >
          <h2 className="text-center text-3xl font-bold mb-2 tracking-wide" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f5ede0" }}>
            Welcome Back
          </h2>
          <p className="text-center text-sm mb-8" style={{ color: "#d4a574" }}>Sign in to your Steakz account</p>

          <label className="block text-sm mb-2 tracking-wide uppercase" style={{ color: "#d4a574", letterSpacing: "0.08em" }}>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-lg text-white focus:outline-none transition-colors"
            style={{ backgroundColor: "rgba(245, 237, 224, 0.08)", border: "1px solid rgba(212, 165, 116, 0.3)" }}
            required
          />

          <label className="block text-sm mb-2 tracking-wide uppercase" style={{ color: "#d4a574", letterSpacing: "0.08em" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-lg text-white focus:outline-none transition-colors"
            style={{ backgroundColor: "rgba(245, 237, 224, 0.08)", border: "1px solid rgba(212, 165, 116, 0.3)" }}
            required
          />

          <label className="flex items-center gap-2 text-sm mb-8 cursor-pointer" style={{ color: "#f5ede0" }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="w-4 h-4"
              style={{ accentColor: "#d4a574" }}
            />
            Remember me
          </label>

          <button
            type="submit"
            className="w-full py-3 text-base font-semibold rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: "#d4a574", color: "#1c1917", letterSpacing: "0.05em" }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
