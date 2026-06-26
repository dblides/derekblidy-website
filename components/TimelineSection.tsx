// ─── DATA ────────────────────────────────────────────────────────────────────
// Add new entries here. They display top-to-bottom (newest first).

type TimelineEntry = {
  emoji: string;
  description: string;
  date: string; // e.g. "March 2025" or "2024"
  url?: string;
};

const entries: TimelineEntry[] = [
  {
    emoji: "🚀",
    description: "Today!",
    date: "2026",
  },
  {
    emoji: "🏅",
    description: "Ran a 21K Spartan Race in Colorado Springs",
    date: "May 2026",
  },
  {
    emoji: "🎤",
    description: "Give entrepreneurship talk at NLU",
    date: "April 2026",
  },
  {
    emoji: "🏠",
    description: "Purchased home",
    date: "February 2026",
  },
  {
    emoji: "🥾",
    description: "Hike Kumano Kodo trail",
    date: "November 2025",
  },
  {
    emoji: "✈️",
    description: "First trip to Japan",
    date: "November 2025",
  },
  {
    emoji: "🎤",
    description: "Preach my first sermon",
    date: "May 2025",
  },
  {
    emoji: "💼",
    description: "Quit corporate world, went full time on Talas",
    date: "September 2024",
  },
  {
    emoji: "🤖",
    description: "Founded Talas",
    date: "January 2024",
  },
  {
    emoji: "🏃",
    description: "Chicago Marathon",
    date: "October 2023",
  },
  {
    emoji: "🌍",
    description: "First trip to Europe",
    date: "April 2023",
  },
  {
    emoji: "✝️",
    description: "Join Oasis Church Chicago's Senior Leadership Team",
    date: "February 2023",
  },
  {
    emoji: "✂️",
    description: "I learn to cut my own hair",
    date: "January 2023",
  },
  {
    emoji: "🎵",
    description: "Release the Nico Segal and Nikko Washington PlayTogether Collaboration",
    date: "November 2022",
    url: "https://playtogether.co/nico-nikko",
  },
  {
    emoji: "🏃",
    description: "Ran a solo marathon",
    date: "October 2022",
  },
  {
    emoji: "🦵",
    description: "Started running 2 miles a day",
    date: "April 2022",
  },
  {
    emoji: "📖",
    description: "Read Can't Hurt Me",
    date: "March 2022",
  },
  {
    emoji: "💼",
    description: "Started working at Stryker",
    date: "October 2021",
  },
  {
    emoji: "🖼️",
    description: "Bought my first NFT",
    date: "September 2021",
  },
  {
    emoji: "🎉",
    description: "Wedding re-do celebration",
    date: "August 2021",
  },
  {
    emoji: "🏙️",
    description: "Move to Wicker Park with Kayla",
    date: "May 2021",
  },
  {
    emoji: "🐶",
    description: "Adopted Milly",
    date: "April 2021",
  },
  {
    emoji: "📚",
    description: "Read Atomic Habits — snowballed into a lot of self transformation",
    date: "March 2021",
  },
  {
    emoji: "📖",
    description: "Took up reading as a hobby",
    date: "February 2021",
  },
  {
    emoji: "🎵",
    description: "Release the Femdot and Liz Flores PlayTogether Collaboration",
    date: "November 2020",
    url: "https://playtogether.co/femdot-flores-delacreme",
  },
  {
    emoji: "💰",
    description: "Bought crypto for the first time",
    date: "November 2020",
  },
  {
    emoji: "✝️",
    description: "Joined Oasis Church Chicago",
    date: "May 2020",
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
    description: "Propose to Kayla",
    date: "July 2019",
  },
  {
    emoji: "💼",
    description: "Start first post-grad job at Coyote Logistics",
    date: "July 2019",
  },
  {
    emoji: "🎵",
    description: "Release the Violet Crime and Julius Bautista PlayTogether Collaboration",
    date: "May 2019",
    url: "https://playtogether.co/violetcrime-juliusbautista",
  },
  {
    emoji: "🎓",
    description: "Graduate college",
    date: "May 2019",
  },
  {
    emoji: "➕",
    description: "Became a cofounder of PlayTogether",
    date: "December 2018",
    url: "https://playtogether.co/",
  },
  {
    emoji: "❤️",
    description: "Met Kayla",
    date: "September 2018",
  },
  {
    emoji: "✝️",
    description: "Rededicated my life to Christ",
    date: "August 2018",
  },
  {
    emoji: "🎥",
    description: "Videography internship at Summit Ministries, CO",
    date: "June 2018",
  },
  {
    emoji: "⛰️",
    description: "Hiked Pikes Peak",
    date: "June 2018",
  },
  {
    emoji: "🎬",
    description: "Campus rep for Universal Pictures",
    date: "December 2017",
  },
  {
    emoji: "🎨",
    description: "Brand Ambassador for Adobe video editing",
    date: "November 2017",
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
  {
    emoji: "🏈",
    description: "Started playing football",
    date: "August 2011",
  },
  {
    emoji: "🏫",
    description: "Started public high school",
    date: "August 2011",
  },
  {
    emoji: "✝️",
    description: "Became a Christian and got baptized",
    date: "April 2006",
  },
  {
    emoji: "📚",
    description: "Started homeschooling",
    date: "August 2000",
  },
  {
    emoji: "👶",
    description: "Born",
    date: "1997",
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
                    {entry.url ? (
                      <a href={entry.url} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 underline underline-offset-2 transition-colors">
                        {entry.description}
                      </a>
                    ) : entry.description}
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
