interface CryptogramPuzzle {
  id: string;
  title: string;
  author: string;
  plaintext: string;
  cipher: Record<string, string>;
  encoded: string;
}

function getHints(cipher: Record<string, string>, plaintext: string): { plain: string; encoded: string }[] {
  // Pick 3 common letters that appear in the plaintext as starter hints
  const freq: Record<string, number> = {};
  for (const ch of plaintext) {
    if (ch >= "A" && ch <= "Z") freq[ch] = (freq[ch] || 0) + 1;
  }
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  // Give the 2nd, 4th, and 6th most common (skip #1 and #3 to keep some challenge)
  const picks = [sorted[1], sorted[3], sorted[5]].filter(Boolean);
  return picks.map(([plain]) => ({ plain, encoded: cipher[plain] }));
}

function getLetterFrequency(encoded: string): { letter: string; count: number }[] {
  const freq: Record<string, number> = {};
  for (const ch of encoded) {
    if (ch >= "A" && ch <= "Z") freq[ch] = (freq[ch] || 0) + 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([letter, count]) => ({ letter, count }));
}

export default function PrintableCryptogram({ puzzle, showAnswers }: { puzzle: CryptogramPuzzle; showAnswers?: boolean }) {
  const hints = getHints(puzzle.cipher, puzzle.plaintext);
  const letterFreq = getLetterFrequency(puzzle.encoded);

  // Split encoded text into words
  const words = puzzle.encoded.split(" ");

  // Build reverse cipher for answer key
  const reverseCipher: Record<string, string> = {};
  for (const [plain, enc] of Object.entries(puzzle.cipher)) {
    reverseCipher[enc] = plain;
  }

  return (
    <>
      {/* Puzzle */}
      <div className="print-no-break">
        <p className="mb-4 text-text-muted">
          Each letter below stands for a different letter. Decode the substitution cipher to
          reveal the famous quote. A hint and letter frequency table are provided.
        </p>

        {/* Encoded text with blanks */}
        <div className="mb-8" style={{ fontFamily: "monospace" }}>
          <div className="flex flex-wrap gap-x-6 gap-y-6">
            {words.map((word, wi) => (
              <div key={wi} className="flex gap-0.5">
                {word.split("").map((ch, ci) => (
                  <div key={ci} className="flex flex-col items-center" style={{ width: 28 }}>
                    <span className="text-xl font-bold">{ch}</span>
                    <span
                      className="mt-1 block border-b-2 border-gray-400"
                      style={{ width: 22, height: 20 }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Hint */}
        <div className="mb-6 rounded border border-gray-300 bg-gray-50 px-4 py-3">
          <p className="text-base font-semibold">Hint — Starter Letters:</p>
          <p className="mt-1 text-base" style={{ fontFamily: "monospace" }}>
            {hints.map((h, i) => (
              <span key={i}>
                {i > 0 && "   "}
                {h.encoded} = {h.plain}
              </span>
            ))}
          </p>
        </div>

        {/* Letter frequency */}
        <div className="mb-2">
          <p className="mb-2 text-sm font-semibold text-text-muted">Letter Frequency in Cipher Text:</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ fontFamily: "monospace" }}>
            {letterFreq.map(({ letter, count }) => (
              <span key={letter}>
                {letter}:{count}
              </span>
            ))}
          </div>
        </div>

        {/* Scratch area — substitution tracker */}
        <div className="mt-6 rounded border border-gray-300 px-4 py-3">
          <p className="mb-2 text-sm font-semibold text-text-muted">Substitution Tracker:</p>
          <div className="flex flex-wrap gap-1" style={{ fontFamily: "monospace" }}>
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <div key={letter} className="flex flex-col items-center" style={{ width: 28 }}>
                <span className="text-base font-bold">{letter}</span>
                <span
                  className="mt-0.5 block border-b-2 border-gray-400"
                  style={{ width: 20, height: 18 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page break + Answer Key */}
      {showAnswers !== false && (
        <>
          <div className="print-page-break" />
          <div className="print-no-break">
            <h2
              className="mb-4 text-2xl font-bold text-primary"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              Answer Key &mdash; {puzzle.title}
            </h2>

            <div className="mb-6">
              <p className="mb-1 text-sm font-semibold text-text-muted">Decoded Quote:</p>
              <p className="text-xl font-bold" style={{ fontFamily: "monospace" }}>
                &ldquo;{puzzle.plaintext}&rdquo;
              </p>
              <p className="mt-1 text-base text-text-muted">&mdash; {puzzle.author}</p>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-text-muted">Full Substitution Key:</p>
              <div
                className="inline-block rounded border border-gray-300"
                style={{ fontFamily: "monospace" }}
              >
                <div className="flex border-b border-gray-300 bg-gray-50">
                  <span className="px-2 py-1 text-sm font-bold text-text-muted" style={{ width: 80 }}>
                    Cipher
                  </span>
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
                    const appears = puzzle.encoded.includes(letter);
                    return appears ? (
                      <span key={letter} className="px-1.5 py-1 text-center text-sm font-bold" style={{ width: 26 }}>
                        {letter}
                      </span>
                    ) : null;
                  })}
                </div>
                <div className="flex">
                  <span className="px-2 py-1 text-sm font-bold text-text-muted" style={{ width: 80 }}>
                    Plain
                  </span>
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
                    const appears = puzzle.encoded.includes(letter);
                    return appears ? (
                      <span key={letter} className="px-1.5 py-1 text-center text-sm" style={{ width: 26 }}>
                        {reverseCipher[letter] || "?"}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
