"use client";

import { useSyncExternalStore } from "react";
import { business } from "@/content/business";

// Highlights today's row using the restaurant's own timezone (America/New_York),
// not the visitor's. Before hydration no row is highlighted (static HTML stays correct).
function todayInBusinessTz(): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: business.timezone }).format(new Date());
}

const subscribe = () => () => {};

export function HoursTable() {
  const today = useSyncExternalStore(subscribe, todayInBusinessTz, () => "");

  return (
    <table className="w-full text-left">
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        {business.hours.map((h) => {
          const isToday = h.day === today;
          const closed = h.hours === "Closed";
          return (
            <tr
              key={h.day}
              className={`border-b border-ink/10 last:border-0 ${isToday ? "bg-mustard/40" : ""}`}
              aria-current={isToday ? "date" : undefined}
            >
              <th scope="row" className="py-2.5 pl-3 pr-4 font-semibold">
                {h.day}
                {isToday && <span className="ml-2 rounded bg-ink px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-cream">Today</span>}
              </th>
              <td className={`py-2.5 pr-3 text-right tabular-nums ${closed ? "text-smoke" : "font-medium"}`}>{h.hours}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
