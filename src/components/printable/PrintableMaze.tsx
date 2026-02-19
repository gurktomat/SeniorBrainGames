interface MazePuzzle {
  id: string;
  title: string;
  difficulty: string;
  rows: number;
  cols: number;
  grid: number[][];
  start: [number, number];
  end: [number, number];
  solutionPath: [number, number][];
}

function MazeGrid({
  puzzle,
  showSolution,
}: {
  puzzle: MazePuzzle;
  showSolution?: boolean;
}) {
  const solutionSet = new Set<string>();
  if (showSolution) {
    for (const [r, c] of puzzle.solutionPath) {
      solutionSet.add(`${r},${c}`);
    }
  }

  // Cell size based on maze difficulty
  const cellSize = puzzle.rows <= 15 ? 24 : puzzle.rows <= 21 ? 18 : 12;

  return (
    <div className="inline-block border-2 border-black">
      {puzzle.grid.map((row, r) => (
        <div key={r} className="flex">
          {row.map((cell, c) => {
            const isStart = r === puzzle.start[0] && c === puzzle.start[1];
            const isEnd = r === puzzle.end[0] && c === puzzle.end[1];
            const isWall = cell === 1;
            const onPath = solutionSet.has(`${r},${c}`);

            let bg = isWall ? "#1a1a2e" : "#ffffff";
            if (!isWall && onPath) bg = "#bbdefb";
            if (isStart) bg = "#4caf50";
            if (isEnd) bg = "#f44336";

            return (
              <div
                key={c}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: bg,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function PrintableMaze({ puzzle }: { puzzle: MazePuzzle }) {
  return (
    <>
      {/* Puzzle */}
      <div className="print-no-break">
        <p className="mb-4 text-text-muted">
          Find a path from <span className="font-semibold" style={{ color: "#4caf50" }}>Start</span> (green)
          to <span className="font-semibold" style={{ color: "#f44336" }}>Finish</span> (red).
          Difficulty: <span className="font-semibold capitalize">{puzzle.difficulty}</span>
        </p>

        <MazeGrid puzzle={puzzle} />

        {/* Legend */}
        <div className="mt-4 flex gap-6 text-sm text-text-muted">
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded" style={{ backgroundColor: "#4caf50" }} />
            Start
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded" style={{ backgroundColor: "#f44336" }} />
            Finish
          </span>
        </div>
      </div>

      {/* Page break + Answer Key */}
      <div className="print-page-break" />
      <div className="print-no-break">
        <h2
          className="mb-4 text-2xl font-bold text-primary"
          style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
        >
          Answer Key &mdash; {puzzle.title}
        </h2>

        <MazeGrid puzzle={puzzle} showSolution />

        <div className="mt-4 flex gap-6 text-sm text-text-muted">
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded" style={{ backgroundColor: "#4caf50" }} />
            Start
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded" style={{ backgroundColor: "#f44336" }} />
            Finish
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded" style={{ backgroundColor: "#bbdefb" }} />
            Solution Path
          </span>
        </div>
      </div>
    </>
  );
}
