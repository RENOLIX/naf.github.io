import { Link } from "react-router-dom";
import { cn } from "@/lib/utils.ts";

type SiteLogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  showText?: boolean;
};

export default function SiteLogo({ className, markClassName, textClassName, showText = true }: SiteLogoProps) {
  return (
    <Link to="/" className={cn("flex items-center gap-3", className)}>
      <img
        src="/naf.github.io/naf-factory-logo.png"
        alt="NAF Factory"
        className={cn("h-11 w-auto object-contain", markClassName)}
      />
      {showText && (
        <span className={cn("font-display text-xl font-extrabold tracking-tight text-white", textClassName)}>
          NAF FACTORY
        </span>
      )}
    </Link>
  );
}
