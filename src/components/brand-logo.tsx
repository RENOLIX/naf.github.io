import type { Brand } from "@/lib/products.ts";
import { cn } from "@/lib/utils.ts";

type BrandLogoProps = {
  brand: Brand;
  className?: string;
};

export default function BrandLogo({ brand, className }: BrandLogoProps) {
  const logos: Record<Brand, { src: string; alt: string; frame: string; img: string }> = {
    sika: {
      src: "/naf.github.io/brands/sika.png",
      alt: "Sika",
      frame: "bg-white/95",
      img: "h-16 w-auto object-contain",
    },
    terraco: {
      src: "/naf.github.io/brands/terraco.png",
      alt: "Terraco",
      frame: "bg-white/95",
      img: "h-12 w-auto object-contain",
    },
    lafarge: {
      src: "/naf.github.io/brands/lafarge.png",
      alt: "Lafarge",
      frame: "bg-white/90",
      img: "h-12 w-auto object-contain",
    },
  };
  const logo = logos[brand];
  return (
    <div className={cn("inline-flex items-center justify-center rounded-lg px-4 py-3 shadow-sm ring-1 ring-black/5", logo.frame, className)}>
      <img src={logo.src} alt={logo.alt} className={logo.img} />
    </div>
  );
}
