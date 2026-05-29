import { type CSSProperties, type ReactNode } from "react";

type LiquidGlassProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  borderRadius?: number;
  refraction?: number;
  blur?: number;
  variant?: "light" | "dark";
};

export default function LiquidGlass({
  children,
  className = "",
  style,
  borderRadius = 22,
  refraction: _refraction = 18,
  blur = 22,
  variant = "light",
}: LiquidGlassProps) {
  return (
    <div
      className={`isolate ${variant === "light" ? "glass-pro glass-pro-light" : "glass-pro"} ${className}`}
      style={{
        borderRadius,
        backdropFilter: `blur(${blur}px) saturate(165%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(165%)`,
        ...style,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
