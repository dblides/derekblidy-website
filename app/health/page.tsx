export const metadata = {
  title: "Health — Derek Blidy",
  description: "My current health strategy, philosophy, and things I've tried.",
};

type Section = {
  title: string;
  items: string[];
};

const sections: Section[] = [
  {
    title: "Beliefs",
    items: [
      "Make change in this order: actions, diet, supplements — then if all else fails, pharma.",
      "I don't care about health protocols I can't practically sustain for a year.",
    ],
  },
  {
    title: "Daily Habits",
    items: [
      "10k steps",
      "Maximum protein (ideally 120g+)",
      "Minimum carbs (I don't track)",
      "30 min strength",
      "30 min zone 2 cardio",
    ],
  },
  {
    title: "Daily Supplements",
    items: [
      "Protein",
      "Creatine",
      "Electrolytes",
      "Psyllium husk",
      "Vitamin D",
      "Vitamin C",
      "Zinc",
      "Fish oil",
      "Magnesium glycinate",
    ],
  },
  {
    title: "Roughly Once a Week",
    items: [
      "Stretching routine",
      "Wim Hof breathing",
      "Fasting",
    ],
  },
  {
    title: "Things I've Tried",
    items: [
      "Running every day for 1.5 years",
      "Trauma release stretching",
      "Niacin",
      "Extended fasts",
    ],
  },
];

export default function HealthPage() {
  return (
    <div className="pt-24 pb-32 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-20">
          <p className="text-xs font-medium uppercase tracking-widest text-yellow-500 mb-4">
            Health
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">
            My Health Stack
          </h1>
          <p className="mt-3 text-gray-400 text-base">
            What I do, what I believe, and what I&apos;ve experimented with.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">
                {section.title}
              </p>
              <ul>
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="py-3 text-gray-700 text-base border-b border-gray-100 last:border-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
