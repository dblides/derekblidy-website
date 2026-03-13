// ─── DATA ────────────────────────────────────────────────────────────────────
// Add new entries here. They display top-to-bottom (newest first).

type TimelineEntry = {
  emoji: string;
  description: string;
  date: string; // e.g. "March 2025" or "2024"
};

const entries: TimelineEntry[] = [
  {
    emoji: "🚀",
    description: "Today!",
    date: "2026",
  },
  {
    emoji: "🏠",
    description: "Buy home in Berwyn, IL",
    date: "February 2026",
  },
  {
    emoji: "🤖",
    description: "Founded Talas",
    date: "2024",
  },
  {
    emoji: "✝️",
    description: "Joined Oasis Church",
    date: "2022",
  },
  {
    emoji: "💒",
    description: "Private wedding",
    date: "April 2020",
  },
  {
    emoji: "💔",
    description: "Wedding canceled",
    date: "March 2020",
  },
  {
    emoji: "🦠",
    description: "Covid",
    date: "March 2020",
  },
  {
    emoji: "💍",
    description: "Engaged",
    date: "July 2019",
  },
  {
    emoji: "🎓",
    description: "Graduate college",
    date: "May 2019",
  },
  {
    emoji: "🤝",
    description: "Rush AKPsi",
    date: "August 2016",
  },
  {
    emoji: "🏫",
    description: "Start Illinois State",
    date: "August 2015",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function TimelineSection() {
  return (
    <section id="life" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-3">
            Life
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900">
            My Life
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl">
            A running log of the moments that have shaped me. More to come.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200" />

          <ul className="space-y-0">
            {entries.map((entry, i) => (
              <li key={i} className="relative flex items-start gap-6 pb-10 last:pb-0">
                {/* Dot + emoji */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-lg shadow-sm">
                  {entry.emoji}
                </div>

                {/* Content */}
                <div className="pt-1.5">
                  <p className="text-base font-semibold text-gray-900 leading-snug">
                    {entry.description}
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">{entry.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
