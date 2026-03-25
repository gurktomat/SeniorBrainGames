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
      {/* Puzzle Section */}
      <div className="mb-12">
        <div className="mb-8 rounded-lg bg-gray-50 border border-gray-300 p-4 print:bg-transparent print:border-black">
          <p className="text-base font-medium italic text-black">
            <span className="font-bold not-italic">Instructions:</span> Each letter below stands for a different letter. Decode the substitution cipher to reveal the famous quote. A hint and letter frequency table are provided.
          </p>
        </div>

        {/* Encoded text with blanks */}
        <div className="mb-12" style={{ fontFamily: "monospace" }}>
          <div className="flex flex-wrap gap-x-8 gap-y-8">
            {words.map((word, wi) => (
              <div key={wi} className="flex gap-1">
                {word.split("").map((ch, ci) => (
                  <div key={ci} className="flex flex-col items-center" style={{ width: 32 }}>
                    <span className="text-2xl font-bold text-black">{ch}</span>
                    <span
                      className="mt-1 block border-b-2 border-black"
                      style={{ width: 28, height: 24 }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Hint */}
          <div className="rounded-xl border-2 border-black p-5">
            <h3 className="mb-2 text-lg font-black uppercase tracking-widest text-black">Hint &mdash; Starter Letters:</h3>
            <p className="text-xl font-bold" style={{ fontFamily: "monospace" }}>
              {hints.map((h, i) => (
                <span key={i}>
                  {i > 0 && "   "}
                  {h.encoded} = {h.plain}
                </span>
              ))}
            </p>
          </div>

          {/* Letter frequency */}
          <div className="rounded-xl border-2 border-black p-5">
            <h3 className="mb-2 text-lg font-black uppercase tracking-widest text-black">Letter Frequency:</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-base font-medium" style={{ fontFamily: "monospace" }}>
              {letterFreq.map(({ letter, count }) => (
                <span key={letter}>
                  {letter}:{count}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scratch area — substitution tracker */}
        <div className="mt-6 rounded-xl border-2 border-black p-5">
          <h3 className="mb-4 text-lg font-black uppercase tracking-widest text-black">Substitution Tracker:</h3>
          <div className="flex flex-wrap gap-2" style={{ fontFamily: "monospace" }}>
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <div key={letter} className="flex flex-col items-center" style={{ width: 24 }}>
                <span className="text-lg font-bold text-black">{letter}</span>
                <span
                  className="mt-1 block border-b-2 border-gray-400 print:border-black"
                  style={{ width: 20, height: 20 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Answer Key */}
      {showAnswers !== false && (
        <>
          <div className="print-page-break" />
          <div className="mt-12 border-t-4 border-black pt-8">
            <h2
              className="mb-6 text-2xl font-black text-black"
              style={{ fontFamily: "var(--font-merriweather), var(--font-heading)" }}
            >
              Answer Key
            </h2>

            <div className="mb-8">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-500 print:text-black">Decoded Quote:</h3>
              <p className="text-2xl font-bold leading-relaxed text-black" style={{ fontFamily: "monospace" }}>
                &ldquo;{puzzle.plaintext}&rdquo;
              </p>
              <p className="mt-2 text-lg font-medium italic text-black">&mdash; {puzzle.author}</p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-500 print:text-black">Full Substitution Key:</h3>
              <div
                className="inline-block rounded-lg border-2 border-black"
                style={{ fontFamily: "monospace" }}
              >
                <div className="flex border-b-2 border-black bg-gray-100 print:bg-gray-200">
                  <span className="px-3 py-2 text-sm font-black uppercase tracking-widest text-black flex items-center border-r-2 border-black" style={{ width: 100 }}>
                    Cipher
                  </span>
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
                    const appears = puzzle.encoded.includes(letter);
                    return appears ? (
                      <span key={letter} className="px-2 py-2 text-center text-lg font-bold text-black border-r border-gray-300 print:border-black" style={{ width: 32 }}>
                        {letter}
                      </span>
                    ) : null;
                  })}
                </div>
                <div className="flex bg-white">
                  <span className="px-3 py-2 text-sm font-black uppercase tracking-widest text-black flex items-center border-r-2 border-black" style={{ width: 100 }}>
                    Plain
                  </span>
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
                    const appears = puzzle.encoded.includes(letter);
                    return appears ? (
                      <span key={letter} className="px-2 py-2 text-center text-lg font-medium text-black border-r border-gray-300 print:border-black" style={{ width: 32 }}>
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
