import { Star } from "lucide-react";

export function Stars({ count, size = 16, label }: { count: number; size?: number; label?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={label ?? `${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          width={size}
          height={size}
          className={i < Math.round(count) ? "fill-mustard text-mustard" : "fill-transparent text-mustard"}
        />
      ))}
    </span>
  );
}
