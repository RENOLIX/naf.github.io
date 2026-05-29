import { cn } from "@/lib/utils.ts";
import type { Brand } from "@/lib/products.ts";

type BrandLogoProps = {
  brand: Brand;
  className?: string;
};

export default function BrandLogo({ brand, className }: BrandLogoProps) {
  if (brand === "sika") {
    return (
      <div className={cn("relative inline-flex items-center justify-center bg-[#f5b325] px-5 py-3 shadow-sm", className)}>
        <div className="absolute inset-x-5 top-0 h-full bg-[#d8282f]" style={{ clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0 100%)" }} />
        <span className="relative font-display text-4xl font-black italic tracking-tight text-white">Sika</span>
      </div>
    );
  }

  if (brand === "terraco") {
    return (
      <div className={cn("inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm", className)}>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#008e62]">
          <span className="h-5 w-5 rounded-full border-4 border-white" />
        </span>
        <span className="font-display text-4xl font-black tracking-tight text-[#008e62]">terraco</span>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-3 bg-white px-5 py-3 shadow-sm", className)}>
      <span className="grid h-10 w-10 place-items-center rounded-sm bg-[#00925a] text-3xl font-black italic text-white">L</span>
      <span className="font-display text-4xl font-black uppercase tracking-tight text-black">Lafarge</span>
    </div>
  );
}
