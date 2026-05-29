import { useId, type CSSProperties, type ReactNode } from "react";

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
  refraction = 18,
  blur = 28,
  variant = "light",
}: LiquidGlassProps) {
  const id = useId().replace(/:/g, "");
  const size = 128;
  const canvas = typeof document !== "undefined" ? document.createElement("canvas") : null;
  let dataUrl = "";

  if (canvas) {
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const img = ctx.createImageData(size, size);
      const center = size / 2;
      const outer = size / 2 - 1;

      for (let y = 0; y < size; y += 1) {
        for (let x = 0; x < size; x += 1) {
          const dx = x - center;
          const dy = y - center;
          const norm = Math.sqrt(dx * dx + dy * dy) / outer;
          let dispX = 128;
          let dispY = 128;

          if (norm >= 0.82 && norm <= 1) {
            const t = (norm - 0.82) / 0.18;
            const profile = Math.pow(1 - Math.pow(1 - t, 4), 0.25);
            const angle = Math.atan2(dy, dx);
            const mag = profile * 28;
            dispX = Math.round(128 + Math.cos(angle) * mag);
            dispY = Math.round(128 + Math.sin(angle) * mag);
          }

          const idx = (y * size + x) * 4;
          img.data[idx] = dispX;
          img.data[idx + 1] = dispY;
          img.data[idx + 2] = 128;
          img.data[idx + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      dataUrl = canvas.toDataURL("image/png");
    }
  }

  const filterId = `lg-f-${id}`;
  const dark = variant === "dark";

  return (
    <div className={`relative isolate ${className}`} style={style}>
      <svg width="0" height="0" aria-hidden style={{ position: "absolute", overflow: "hidden" }}>
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feImage href={dataUrl} width="100%" height="100%" result="dispMap" preserveAspectRatio="none" />
            <feDisplacementMap in="SourceGraphic" in2="dispMap" scale={refraction} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          backdropFilter: `blur(${blur}px) saturate(180%) brightness(${dark ? "0.94" : "1.08"})`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(180%) brightness(${dark ? "0.94" : "1.08"})`,
          background: dark ? "rgba(12,22,52,.72)" : "rgba(255,255,255,.13)",
        }}
      />
      {dataUrl && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ borderRadius, filter: `url(#${filterId})`, opacity: dark ? 0.24 : 0.36, background: "rgba(255,255,255,.06)" }}
        />
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          border: `1px solid ${dark ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.34)"}`,
          boxShadow: dark
            ? "0 8px 32px rgba(0,0,0,.35), inset 0 1.5px 0 rgba(255,255,255,.18)"
            : "0 8px 32px rgba(0,0,0,.15), inset 0 1.5px 0 rgba(255,255,255,.5)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          background: dark
            ? "radial-gradient(ellipse at 25% 10%, rgba(255,255,255,.16), transparent 55%)"
            : "radial-gradient(ellipse at 25% 10%, rgba(255,255,255,.34), transparent 58%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
