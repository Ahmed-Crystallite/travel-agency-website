import Image from "next/image";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const LOGO_MARK = { src: "/images/brand/logo-mark.png", width: 369, height: 223 };

export function Logo({ className }: { className?: string }) {
  const { name, wordmark } = siteConfig;

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src={LOGO_MARK.src}
        width={LOGO_MARK.width}
        height={LOGO_MARK.height}
        alt={`${name} logo`}
        title={name}
        priority
        className="h-9 w-auto"
      />
      <span className="font-display text-2xl tracking-tight">
        {wordmark.base}
        <span className="text-gold-400">{wordmark.accent}</span>
      </span>
    </span>
  );
}
