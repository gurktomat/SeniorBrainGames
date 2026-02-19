interface LogicGridPuzzle {
  id: string;
  title: string;
  difficulty: string;
  scenario: string;
  categories: string[];
  options: Record<string, string[]>;
  clues: string[];
  solution: Record<string, string>[];
}

export default function PrintableLogicGrid({ puzzle }: { puzzle: LogicGridPuzzle }) {
  const cats = puzzle.categories;
  const primaryCat = cats[0]; // e.g. "Person"
  const primaryOpts = puzzle.options[primaryCat];

  // Build grid sections: primary vs each other category, then pairwise among non-primary
  // Standard logic grid: rows = primary options + secondary options (minus last), cols = other categories' options
  // For simplicity: show primary × each other category grids stacked

  const otherCats = cats.slice(1);

  return (
    <>
      {/* Puzzle */}
      <div className="print-no-break">
        <p className="mb-4 text-text-muted">{puzzle.scenario}</p>
        <p className="mb-1 text-sm text-text-muted">
          Difficulty: <span className="font-semibold capitalize">{puzzle.difficulty}</span>
        </p>

        {/* Clues */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-bold">Clues</h3>
          <ol className="list-inside list-decimal space-y-1 text-base">
            {puzzle.clues.map((clue, i) => (
              <li key={i}>{clue}</li>
            ))}
          </ol>
        </div>

        {/* Logic Grid */}
        <div className="mb-4">
          <h3 className="mb-3 text-lg font-bold">Logic Grid</h3>
          <p className="mb-3 text-sm text-text-muted">
            Mark each cell with &#x2718; (no) or &#x25CB; (yes) to eliminate possibilities.
          </p>

          <div className="inline-block">
            <table className="border-collapse border-2 border-black text-sm">
              <thead>
                <tr>
                  <th className="border border-gray-400 bg-gray-100 px-2 py-1" />
                  {otherCats.map((cat) => (
                    <th
                      key={cat}
                      colSpan={puzzle.options[cat].length}
                      className="border-2 border-black bg-gray-100 px-2 py-1 text-center font-bold"
                    >
                      {cat}
                    </th>
                  ))}
                </tr>
                <tr>
                  <th className="border border-gray-400 bg-gray-100 px-2 py-1" />
                  {otherCats.flatMap((cat) =>
                    puzzle.options[cat].map((opt, oi) => (
                      <th
                        key={`${cat}-${opt}`}
                        className={`border border-gray-400 bg-gray-50 px-2 py-1 text-center text-xs font-medium ${
                          oi === puzzle.options[cat].length - 1 ? "border-r-2 border-r-black" : ""
                        }`}
                        style={{ minWidth: 36, writingMode: primaryOpts.length >= 5 ? "vertical-lr" : undefined }}
                      >
                        {opt}
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Primary category rows */}
                {primaryOpts.map((opt, ri) => (
                  <tr key={opt}>
                    <td
                      className={`border border-gray-400 bg-gray-50 px-2 py-1 text-sm font-medium ${
                        ri === primaryOpts.length - 1 ? "border-b-2 border-b-black" : ""
                      }`}
                    >
                      {opt}
                    </td>
                    {otherCats.flatMap((cat) =>
                      puzzle.options[cat].map((_, ci) => (
                        <td
                          key={`${cat}-${ci}`}
                          className={`border border-gray-400 ${
                            ci === puzzle.options[cat].length - 1 ? "border-r-2 border-r-black" : ""
                          } ${ri === primaryOpts.length - 1 ? "border-b-2 border-b-black" : ""}`}
                          style={{ width: 36, height: 36 }}
                        />
                      ))
                    )}
                  </tr>
                ))}
                {/* Cross-category rows (cat1 vs cat2) — only if 3 categories */}
                {otherCats.length >= 2 &&
                  puzzle.options[otherCats[0]].map((opt, ri) => (
                    <tr key={`cross-${opt}`}>
                      <td className="border border-gray-400 bg-gray-50 px-2 py-1 text-sm font-medium">
                        {opt}
                      </td>
                      {/* Empty cells for first other category (greyed out — same category) */}
                      {puzzle.options[otherCats[0]].map((_, ci) => (
                        <td
                          key={`same-${ci}`}
                          className={`border border-gray-400 bg-gray-200 ${
                            ci === puzzle.options[otherCats[0]].length - 1 ? "border-r-2 border-r-black" : ""
                          }`}
                          style={{ width: 36, height: 36 }}
                        />
                      ))}
                      {/* Usable cells for remaining categories */}
                      {otherCats.slice(1).flatMap((cat) =>
                        puzzle.options[cat].map((_, ci) => (
                          <td
                            key={`${cat}-${ci}`}
                            className={`border border-gray-400 ${
                              ci === puzzle.options[cat].length - 1 ? "border-r-2 border-r-black" : ""
                            } ${ri === puzzle.options[otherCats[0]].length - 1 ? "border-b-2 border-b-black" : ""}`}
                            style={{ width: 36, height: 36 }}
                          />
                        ))
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
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

        <table className="border-collapse border-2 border-black text-base">
          <thead>
            <tr>
              {cats.map((cat) => (
                <th
                  key={cat}
                  className="border border-gray-400 bg-gray-100 px-4 py-2 text-left font-bold"
                >
                  {cat}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {puzzle.solution.map((row, i) => (
              <tr key={i}>
                {cats.map((cat) => (
                  <td key={cat} className="border border-gray-400 px-4 py-2">
                    {row[cat]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
