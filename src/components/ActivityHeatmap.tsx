"use client";

import type { GamePlayRecord } from "@/lib/progress/types";

interface ActivityHeatmapProps {
  gamesPlayed: GamePlayRecord[];
  days?: number;
}

function getDayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default function ActivityHeatmap({ gamesPlayed, days = 91 }: ActivityHeatmapProps) {
  // Count games per day
  const counts: Record<string, number> = {};
  for (const g of gamesPlayed) {
    const key = g.playedAt.slice(0, 10);
    counts[key] = (counts[key] ?? 0) + 1;
  }

  // Build grid of days (last N days, ending today)
  const today = new Date();
  const grid: { key: string; count: number; date: Date }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = getDayKey(d);
    grid.push({ key, count: counts[key] ?? 0, date: d });
  }

  // Organize into weeks (columns), starting from Sunday
  const weeks: typeof grid[] = [];
  let currentWeek: typeof grid = [];

  // Pad the first week with empty cells if it doesn't start on Sunday
  const firstDay = grid[0].date.getDay();
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push({ key: "", count: -1, date: new Date() });
  }

  for (const day of grid) {
    currentWeek.push(day);
    if (day.date.getDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  function getColor(count: number): string {
    if (count < 0) return "transparent";
    if (count === 0) return "var(--color-border)";
    if (count === 1) return "rgba(124, 92, 252, 0.35)";
    if (count === 2) return "rgba(124, 92, 252, 0.6)";
    return "rgba(124, 92, 252, 0.85)";
  }

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-0.5">
        {/* Day labels */}
        <div className="mr-1 flex flex-col gap-0.5">
          {dayLabels.map((label, i) => (
            <span
              key={i}
              className="flex h-3 items-center text-[10px] leading-none text-text-muted"
            >
              {i % 2 === 1 ? label : ""}
            </span>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {week.map((day, di) => (
              <div
                key={di}
                className="h-3 w-3 rounded-sm"
                style={{ background: getColor(day.count) }}
                title={day.count >= 0 ? `${day.key}: ${day.count} game${day.count !== 1 ? "s" : ""}` : undefined}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-text-muted">
        <span>Less</span>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-sm"
            style={{ background: getColor(i) }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
