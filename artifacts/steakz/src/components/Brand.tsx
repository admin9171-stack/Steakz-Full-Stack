import { Link } from "wouter";

export function Brand({
  light = true,
  className = "",
}: {
  light?: boolean;
  className?: string;
}) {
  const baseColor = light ? "text-white" : "text-black";
  return (
    <Link href="/">
      <span
        className={`font-serif-brand text-4xl cursor-pointer select-none ${className || baseColor}`}
      >
        Steakz
      </span>
    </Link>
  );
}
