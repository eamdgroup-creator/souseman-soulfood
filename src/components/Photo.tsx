import Image from "next/image";
import { hasImage } from "@/lib/site";

type Props = {
  file?: string;
  alt: string;
  label: string; // shown on the placeholder if the photo is missing
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

// Shows the photo if the build downloaded it, otherwise a styled placeholder
// (so a failed download never breaks the page).
export function Photo({ file, alt, label, width, height, className = "", priority, sizes }: Props) {
  if (hasImage(file)) {
    return (
      <Image
        src={`/images/${file}`}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`pattern-diag flex items-center justify-center bg-ink text-center ${className}`}
    >
      <span className="px-4 font-display text-2xl uppercase tracking-wide text-mustard">{label}</span>
    </div>
  );
}
