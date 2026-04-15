"use client";

import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
// Add a new object to contentByYear for each year you want.
// Categories: Books, Music, Podcasts, Apps & Tools — add/remove freely.

type ContentItem = {
  title: string;
  creator?: string;
  note: string;
  url?: string;
};

type Category = {
  category: string;
  emoji: string;
  items: ContentItem[];
};

type YearContent = {
  year: number;
  categories: Category[];
};

const contentByYear: YearContent[] = [
  {
    year: 2026,
    categories: [
      {
        category: "Books",
        emoji: "📚",
        items: [
          { title: "The Bible (in progress)", creator: "", note: "" },
          { title: "Chess Story", creator: "Stefan Zweig", note: "" },
          { title: "Ashes of Man", creator: "Christopher Ruocchio", note: "" },
          { title: "The Strength of the Few", creator: "James Islington", note: "" },
          { title: "How to Fail at Almost Everything and Still Win Big", creator: "Scott Adams", note: "" },
          { title: "Economics in One Lesson", creator: "Henry Hazlitt", note: "" },
          { title: "The Death of Ivan Ilyich", creator: "Leo Tolstoy", note: "" },
        ],
      },
      {
        category: "Music",
        emoji: "🎵",
        items: [
          // Add your 2026 music here
        ],
      },
      {
        category: "Podcasts",
        emoji: "🎙️",
        items: [
          // Add your 2026 podcasts here
        ],
      },
      {
        category: "Scriptures, Ideas & Philosophies",
        emoji: "💡",
        items: [
          { title: "Morning Pages", creator: "", note: "" },
        ],
      },
    ],
  },
  {
    year: 2025,
    categories: [
      {
        category: "Books",
        emoji: "📚",
        items: [
          { title: "The Bible", creator: "", note: "" },
          { title: "The Bear", creator: "Andrew Krivak", note: "" },
          { title: "Artificial Wisdom", creator: "Thomas Weaver", note: "" },
          { title: "Project Hail Mary", creator: "Andy Weir", note: "" },
          { title: "The Kite Runner", creator: "Khaled Hosseini", note: "" },
          { title: "Best Loser Wins", creator: "Tom Hougaard", note: "" },
          { title: "The Will of the Many", creator: "James Islington", note: "" },
          { title: "Total Forgiveness", creator: "R.T. Kendall", note: "" },
          { title: "11/22/63", creator: "Stephen King", note: "" },
          { title: "The Screwtape Letters", creator: "C.S. Lewis", note: "" },
          { title: "Tuesdays with Morrie", creator: "Mitch Albom", note: "" },
          { title: "The Brothers Karamazov", creator: "Fyodor Dostoevsky", note: "" },
          { title: "The Blacktongue Thief", creator: "Christopher Buehlman", note: "" },
          { title: "Die with Zero", creator: "Bill Perkins", note: "" },
          { title: "The 48 Laws of Power", creator: "Robert Greene", note: "" },
          { title: "Empire of Silence", creator: "Christopher Ruocchio", note: "" },
          { title: "Howling Dark", creator: "Christopher Ruocchio", note: "" },
          { title: "Sweaty Equity", creator: "Mike Shannon", note: "" },
          { title: "Demon in White", creator: "Christopher Ruocchio", note: "" },
          { title: "The Silver Chair", creator: "C.S. Lewis", note: "" },
          { title: "Kingdoms of Death", creator: "Christopher Ruocchio", note: "" },
          { title: "The Last Battle", creator: "C.S. Lewis", note: "" },
          { title: "The Psychology of Money", creator: "Morgan Housel", note: "" },
        ],
      },
      {
        category: "Music",
        emoji: "🎵",
        items: [
          { title: "I Will Glory in My Redeemer", creator: "Sovereign Grace Music", note: "" },
          { title: "My Reward", creator: "UPPERROOM", note: "" },
          { title: "In Dreams", creator: "Sierra Ferrell", note: "" },
          { title: "Veni Creator Spiritus", creator: "The Cistercian Monks of Stift Heiligenkreuz", note: "" },
        ],
      },
      {
        category: "Podcasts",
        emoji: "🎙️",
        items: [
          { title: "TBPN", creator: "", note: "" },
          { title: "All In", creator: "", note: "" },
          { title: "War Mode", creator: "", note: "" },
        ],
      },
      {
        category: "Scriptures, Ideas & Philosophies",
        emoji: "💡",
        items: [
          { title: "2 Timothy 2:21", creator: "Therefore, if anyone cleanses himself from what is dishonorable, he will be a vessel for honorable use, set apart as holy, useful to the master of the house, ready for every good work.", note: "" },
          { title: "Hebrews 12:14", creator: "Make every effort to live in peace with everyone and to be holy; without holiness no one will see the Lord.", note: "" },
          { title: "Psalm 34:11-14", creator: "Come, my children, listen to me; I will teach you the fear of the LORD. Whoever of you loves life and desires to see many good days, keep your tongue from evil and your lips from telling lies. Turn from evil and do good; seek peace and pursue it.", note: "" },
          { title: "1 Thessalonians 5:16", creator: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.", note: "" },
        ],
      },
    ],
  },
  {
    year: 2024,
    categories: [
      {
        category: "Books",
        emoji: "📚",
        items: [
          { title: "The Bible", creator: "", note: "" },
          { title: "The Voyage of the Dawn Treader", creator: "C.S. Lewis", note: "" },
          { title: "Prince Caspian", creator: "C.S. Lewis", note: "" },
          { title: "The Horse and His Boy", creator: "C.S. Lewis", note: "" },
          { title: "Stages of the Soul", creator: "Nancy Kane", note: "" },
          { title: "The Lion, the Witch and the Wardrobe", creator: "C.S. Lewis", note: "" },
          { title: "The Magician's Nephew", creator: "C.S. Lewis", note: "" },
          { title: "How Will You Measure Your Life?", creator: "Clayton Christensen", note: "" },
          { title: "Antifragile", creator: "Nassim Nicholas Taleb", note: "" },
          { title: "Surrendered to the Holy Spirit", creator: "Hayley Braun", note: "" },
          { title: "Red Rising", creator: "Pierce Brown", note: "" },
          { title: "Golden Son", creator: "Pierce Brown", note: "" },
          { title: "Morning Star", creator: "Pierce Brown", note: "" },
          { title: "Iron Gold", creator: "Pierce Brown", note: "" },
          { title: "Light Bringer", creator: "Pierce Brown", note: "" },
          { title: "Dark Age", creator: "Pierce Brown", note: "" },
          { title: "Blue Ocean Strategy", creator: "W. Chan Kim & Renée Mauborgne", note: "" },
          { title: "Death's End", creator: "Liu Cixin", note: "" },
          { title: "Effortless", creator: "Greg McKeown", note: "" },
          { title: "Pitch Anything", creator: "Oren Klaff", note: "" },
          { title: "Absolute Surrender", creator: "Andrew Murray", note: "" },
        ],
      },
      {
        category: "Music",
        emoji: "🎵",
        items: [
          { title: "You Saved Me", creator: "UPPERROOM", note: "" },
          { title: "Spring Up a Well", creator: "Phil Wickham", note: "" },
          { title: "Pange Lingua Gloriosi", creator: "Harry Hagan OSB", note: "" },
        ],
      },
      {
        category: "Podcasts",
        emoji: "🎙️",
        items: [
          { title: "Huberman Lab", creator: "Andrew Huberman", note: "" },
          { title: "a16z Podcast", creator: "Andreessen Horowitz", note: "" },
          { title: "First15", creator: "", note: "" },
        ],
      },
      {
        category: "Scriptures, Ideas & Philosophies",
        emoji: "💡",
        items: [
          { title: "John 17:17", creator: "Sanctify them in the truth; your word is truth.", note: "" },
        ],
      },
    ],
  },
  {
    year: 2023,
    categories: [
      {
        category: "Books",
        emoji: "📚",
        items: [
          { title: "The Bible", creator: "", note: "" },
          { title: "Never Split the Difference", creator: "Chris Voss", note: "" },
          { title: "Delighting in the Trinity", creator: "Michael Reeves", note: "" },
          { title: "Emotionally Healthy Spirituality", creator: "Peter Scazzero", note: "" },
          { title: "The Hard Thing About Hard Things", creator: "Ben Horowitz", note: "" },
          { title: "10x Is Easier Than 2x", creator: "Dan Sullivan & Benjamin Hardy", note: "" },
          { title: "Essentialism", creator: "Greg McKeown", note: "" },
          { title: "Don't Shoot the Dog", creator: "Karen Pryor", note: "" },
          { title: "Measure What Matters", creator: "John Doerr", note: "" },
          { title: "Outlive", creator: "Peter Attia", note: "" },
          { title: "The War on the West", creator: "Douglas Murray", note: "" },
          { title: "The Cost of Discipleship", creator: "Dietrich Bonhoeffer", note: "" },
          { title: "The Emotionally Healthy Leader", creator: "Peter Scazzero", note: "" },
          { title: "Never Finished", creator: "David Goggins", note: "" },
          { title: "Deep Work", creator: "Cal Newport", note: "" },
          { title: "The Idiot", creator: "Fyodor Dostoevsky", note: "" },
          { title: "The Obstacle Is the Way", creator: "Ryan Holiday", note: "" },
          { title: "The Three-Body Problem", creator: "Liu Cixin", note: "" },
          { title: "The Dark Forest", creator: "Liu Cixin", note: "" },
        ],
      },
      {
        category: "Music",
        emoji: "🎵",
        items: [
          { title: "Binaural Beats: Focus", creator: "", note: "" },
        ],
      },
      {
        category: "Podcasts",
        emoji: "🎙️",
        items: [
          { title: "JRE #1212", creator: "Joe Rogan", note: "" },
        ],
      },
      {
        category: "Scriptures, Ideas & Philosophies",
        emoji: "💡",
        items: [
          { title: "Finding Physical Limitations", creator: "", note: "" },
        ],
      },
    ],
  },
  {
    year: 2022,
    categories: [
      {
        category: "Books",
        emoji: "📚",
        items: [
          { title: "Zero to One", creator: "Peter Thiel", note: "" },
          { title: "Practicing His Presence", creator: "Brother Lawrence", note: "" },
          { title: "The 4-Hour Chef", creator: "Timothy Ferriss", note: "" },
          { title: "Ready Player One", creator: "Ernest Cline", note: "" },
          { title: "You Are What You Love", creator: "James K.A. Smith", note: "" },
          { title: "Island", creator: "Aldous Huxley", note: "" },
          { title: "Not the Way It's Supposed to Be: A Breviary of Sin", creator: "Cornelius Plantinga Jr.", note: "" },
          { title: "Killing Kryptonite", creator: "John Bevere", note: "" },
          { title: "Crime and Punishment", creator: "Fyodor Dostoevsky", note: "" },
          { title: "Theodicy of Love", creator: "John C. Peckham", note: "" },
          { title: "Can't Hurt Me", creator: "David Goggins", note: "" },
          { title: "Atlas Shrugged", creator: "Ayn Rand", note: "" },
          { title: "Jaws: The Story of a Hidden Epidemic", creator: "Sandra Kahn & Paul R. Ehrlich", note: "" },
        ],
      },
      {
        category: "Music",
        emoji: "🎵",
        items: [
          { title: "As the Deer", creator: "Shane & Shane", note: "" },
          { title: "'Tis So Sweet to Trust in Jesus", creator: "", note: "" },
          { title: "Battle Hymn of the Republic", creator: "Stryper", note: "" },
        ],
      },
      {
        category: "Podcasts",
        emoji: "🎙️",
        items: [
          { title: "The Joe Rogan Experience", creator: "Joe Rogan", note: "" },
          { title: "The Tim Dillon Show", creator: "Tim Dillon", note: "" },
          { title: "The Tim Ferriss Show", creator: "Tim Ferriss", note: "" },
        ],
      },
      {
        category: "Scriptures, Ideas & Philosophies",
        emoji: "💡",
        items: [
          { title: "Philippians 4:4-9", creator: "Rejoice in the Lord always. I will say it again: Rejoice! Let your gentleness be evident to all. The Lord is near. Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus. Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable — if anything is excellent or praiseworthy — think about such things.", note: "" },
          { title: "Stoicism", creator: "", note: "" },
        ],
      },
    ],
  },
  {
    year: 2021,
    categories: [
      {
        category: "Books",
        emoji: "📚",
        items: [
          {
            title: "Atomic Habits",
            creator: "James Clear",
            note: "The book that kicked off a lot of self-transformation for me. Identity-based habit change.",
          },
          {
            title: "Brave New World",
            creator: "Aldous Huxley",
            note: "A chilling vision of a society engineered for comfort at the cost of truth and freedom.",
          },
          {
            title: "Man's Search for Meaning",
            creator: "Viktor Frankl",
            note: "Written in Auschwitz. One of the most powerful arguments for finding purpose in suffering.",
          },
          {
            title: "Ruthless Elimination of Hurry",
            creator: "John Mark Comer",
            note: "Slowing down as a spiritual discipline. Changed how I think about rest and pace of life.",
          },
          {
            title: "Breath: The New Science of a Lost Art",
            creator: "James Nestor",
            note: "Fascinating deep dive into how breathing affects nearly everything about your health.",
          },
          {
            title: "Fahrenheit 451",
            creator: "Ray Bradbury",
            note: "A warning about a world that burns books. Eerily relevant.",
          },
          {
            title: "How to Win Friends and Influence People",
            creator: "Dale Carnegie",
            note: "Old but timeless. Genuinely made me a better listener.",
          },
          {
            title: "Mere Christianity",
            creator: "C.S. Lewis",
            note: "The most logical, clear-headed case for Christianity I've ever read.",
          },
          {
            title: "Mastery: The Keys to Success and Long-Term Fulfillment",
            creator: "George Leonard",
            note: "About embracing the plateau. The process is the point.",
          },
          {
            title: "Letters to the Church",
            creator: "Francis Chan",
            note: "A gut-punch call back to what the church is actually supposed to be.",
          },
          {
            title: "The Four Loves",
            creator: "C.S. Lewis",
            note: "Lewis unpacks affection, friendship, eros, and charity with his usual precision.",
          },
          {
            title: "The Catcher in the Rye",
            creator: "J.D. Salinger",
            note: "Classic. Holden Caulfield is annoying in all the right ways.",
          },
          {
            title: "Supernatural",
            creator: "Michael Heiser",
            note: "Completely changed how I read the Old Testament. The divine council worldview is mind-expanding.",
          },
          {
            title: "Demons",
            creator: "Fyodor Dostoevsky",
            note: "Dense but worth it. A prophetic look at what radical ideology does to a community.",
          },
        ],
      },
      {
        category: "Music",
        emoji: "🎵",
        items: [
          { title: "All I Want", creator: "Red Rocks Worship", note: "" },
          { title: "Refiner", creator: "Maverick City", note: "" },
          { title: "Pelota", creator: "Khruangbin", note: "" },
          { title: "When I Hear the Praises Start", creator: "Keith Green", note: "" },
          { title: "Cruisin'", creator: "Smokey Robinson", note: "" },
          { title: "All Night Long", creator: "Mary Jane Girls", note: "" },
        ],
      },
      {
        category: "Podcasts",
        emoji: "🎙️",
        items: [
          { title: "The Tim Dillon Show", creator: "Tim Dillon", note: "" },
          { title: "The Portal", creator: "Eric Weinstein", note: "" },
          { title: "Lex Fridman Podcast", creator: "Lex Fridman", note: "" },
        ],
      },
      {
        category: "Scriptures, Ideas & Philosophies",
        emoji: "💡",
        items: [
          { title: "How to Get Rich Without Getting Lucky", creator: "Naval Ravikant (Twitter thread)", note: "", url: "https://x.com/naval/status/1002103360646823936" },
        ],
      },
    ],
  },
];

const years = contentByYear.map((y) => y.year);

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ContentSection() {
  const [activeYear, setActiveYear] = useState<number>(years[0]);

  const activeContent = contentByYear.find((y) => y.year === activeYear);

  return (
    <section id="content" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-3">
            Recommendations
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900">
            Content I Enjoy
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl">
            I&apos;m categorizing my favorite things by year. I think it&apos;ll
            be fun to look back at this in 2050 to see what shaped me.
          </p>
        </div>

        {/* Year tabs */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeYear === year
                  ? "bg-yellow-400 text-gray-900 shadow-sm"
                  : "bg-gray-50 border border-gray-200 text-gray-500 hover:border-yellow-400 hover:text-gray-900"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Categories grid */}
        {activeContent && (() => {
          const renderCard = (cat: Category) => (
            <div
              key={cat.category}
              className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                <span className="text-2xl">{cat.emoji}</span>
                <h3 className="text-lg font-bold text-gray-900">{cat.category}</h3>
                {cat.category === "Books" && (
                  <span className="ml-auto text-xs font-semibold text-yellow-700 bg-yellow-100 px-2.5 py-1 rounded-full">
                    {cat.items.length} books
                  </span>
                )}
              </div>
              {cat.items.length === 0 ? (
                <p className="px-6 py-5 text-sm text-gray-400 italic">Coming soon</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {cat.items.map((item, i) => (
                    <li key={i} className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">
                            {item.url ? (
                              <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">
                                {item.title}
                              </a>
                            ) : (
                              item.title
                            )}
                            {item.creator && (
                              <span className="font-normal text-gray-400 ml-1">
                                by {item.creator}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );

          const books = activeContent.categories.find((c) => c.category === "Books");
          const rightOrder = ["Scriptures, Ideas & Philosophies", "Podcasts", "Music"];
          const rightCats = rightOrder
            .map((name) => activeContent.categories.find((c) => c.category === name))
            .filter((c): c is Category => c !== undefined);

          return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Left: Books — full height */}
              {books && renderCard(books)}

              {/* Right: Scriptures → Podcasts → Music stacked */}
              <div className="flex flex-col gap-6">
                {rightCats.map((cat) => renderCard(cat))}
              </div>
            </div>
          );
        })()}

        {/* Empty state */}
        {!activeContent && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">Nothing logged for {activeYear} yet</p>
          </div>
        )}
      </div>
    </section>
  );
}
