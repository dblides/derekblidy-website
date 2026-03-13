export const metadata = {
  title: "Health — Derek Blidy",
  description: "My current health strategy, philosophy, and things I've tried.",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Edit each section's content directly below.

const currentStrategy = [
  {
    label: "Training",
    value: "Placeholder — e.g. running 4x/week, strength 2x/week",
  },
  {
    label: "Diet",
    value: "Placeholder — e.g. whole foods, no seed oils, time-restricted eating",
  },
  {
    label: "Sleep",
    value: "Placeholder — e.g. 8 hours, consistent wake time, no screens after 10pm",
  },
  {
    label: "Supplements",
    value: "Placeholder — e.g. creatine, vitamin D, magnesium",
  },
];

const philosophy = `Placeholder — write your health philosophy here. What do you believe about the body, longevity, performance, and the role faith plays in how you take care of yourself? This is a great place to share the principles that guide your decisions, not just the tactics.`;

const thingsTried = [
  {
    name: "Marathon Training",
    verdict: "Loved it",
    note: "Placeholder — what did you learn? Would you do it again?",
  },
  {
    name: "Sauerkraut / Fermented Foods",
    verdict: "Still exploring",
    note: "Placeholder — gut health experiment, early results.",
  },
  {
    name: "Cold Plunge",
    verdict: "Placeholder",
    note: "Placeholder — your experience and whether you stuck with it.",
  },
  {
    name: "Intermittent Fasting",
    verdict: "Placeholder",
    note: "Placeholder — how long you tried it, what changed.",
  },
];

const verdictColors: Record<string, string> = {
  "Loved it": "bg-green-50 text-green-700 border-green-200",
  "Still exploring": "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Stopped": "bg-red-50 text-red-600 border-red-200",
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HealthPage() {
  return (
    <div className="pt-16 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Page header */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-3">
            Health
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
            How I take care<br />of my body.
          </h1>
          <p className="mt-5 text-gray-500 text-lg max-w-xl leading-relaxed">
            Health is one of the few things worth being systematic about. Here&apos;s
            what I&apos;m doing, what I believe, and what I&apos;ve experimented with.
          </p>
        </div>

        {/* ── 1. Current Strategy ── */}
        <section className="mb-20">
          <h2 className="text-2xl font-black text-gray-900 mb-1">Current Strategy</h2>
          <p className="text-sm text-gray-400 mb-8">What my routine actually looks like right now.</p>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
            {currentStrategy.map((item) => (
              <div key={item.label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 px-6 py-5">
                <span className="flex-shrink-0 w-28 text-xs font-bold uppercase tracking-widest text-yellow-500 pt-0.5">
                  {item.label}
                </span>
                <span className="text-gray-700 leading-relaxed">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. My Philosophy ── */}
        <section className="mb-20">
          <h2 className="text-2xl font-black text-gray-900 mb-1">My Philosophy</h2>
          <p className="text-sm text-gray-400 mb-8">The principles behind the practices.</p>
          <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
            {philosophy}
          </p>
        </section>

        {/* ── 3. Things I've Tried ── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-1">Things I&apos;ve Tried</h2>
          <p className="text-sm text-gray-400 mb-8">Experiments — some stuck, some didn&apos;t.</p>
          <ul className="space-y-4">
            {thingsTried.map((item) => (
              <li
                key={item.name}
                className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5"
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-bold text-gray-900">{item.name}</span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      verdictColors[item.verdict] ?? "bg-gray-100 text-gray-500 border-gray-200"
                    }`}
                  >
                    {item.verdict}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.note}</p>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}
