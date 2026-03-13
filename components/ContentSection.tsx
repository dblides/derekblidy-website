"use client";

import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
// Add a new object to contentByYear for each year you want.
// Categories: Books, Music, Podcasts, Apps & Tools — add/remove freely.

type ContentItem = {
  title: string;
  creator?: string;
  note: string;
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
          // Add your 2026 books here
          // { title: "...", creator: "...", note: "..." },
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
          // Add your 2026 tools here
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
          {
            title: "The Creative Act",
            creator: "Rick Rubin",
            note: "A meditation on creativity — not just for musicians but for anyone who makes things.",
          },
          {
            title: "Thinking, Fast and Slow",
            creator: "Daniel Kahneman",
            note: "Essential reading for understanding how we actually make decisions.",
          },
          {
            title: "Show Your Work",
            creator: "Austin Kleon",
            note: "Short, punchy, and genuinely useful for anyone trying to share their work online.",
          },
        ],
      },
      {
        category: "Music",
        emoji: "🎵",
        items: [
          {
            title: "Blonde",
            creator: "Frank Ocean",
            note: "Still one of the most emotionally complex albums I've ever heard.",
          },
          {
            title: "Kind of Blue",
            creator: "Miles Davis",
            note: "Perfect for focus. Perfect for anything, really.",
          },
        ],
      },
      {
        category: "Podcasts",
        emoji: "🎙️",
        items: [
          {
            title: "Acquired",
            note: "Deep-dive business history with a level of research that feels almost academic.",
          },
          {
            title: "99% Invisible",
            note: "Design and architecture stories you never knew you needed to hear.",
          },
        ],
      },
      {
        category: "Scriptures, Ideas & Philosophies",
        emoji: "💡",
        items: [
          {
            title: "Obsidian",
            note: "My second brain. Local-first, Markdown-based note-taking that actually scales.",
          },
          {
            title: "Raycast",
            note: "A spotlight replacement that's transformed how I navigate my Mac.",
          },
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
          {
            title: "The Almanack of Naval Ravikant",
            creator: "Eric Jorgenson",
            note: "Distilled wisdom on wealth, happiness, and how to think clearly.",
          },
          {
            title: "A World Without Email",
            creator: "Cal Newport",
            note: "Convinced me that constant connectivity is a productivity killer, not a feature.",
          },
        ],
      },
      {
        category: "Music",
        emoji: "🎵",
        items: [
          {
            title: "Random Access Memories",
            creator: "Daft Punk",
            note: "A masterclass in texture and feel.",
          },
          {
            title: "Currents",
            creator: "Tame Impala",
            note: "Sonically rich and endlessly replayable.",
          },
        ],
      },
      {
        category: "Podcasts",
        emoji: "🎙️",
        items: [
          {
            title: "Lex Fridman Podcast",
            note: "Long-form conversations with fascinating people from science, tech, and philosophy.",
          },
          {
            title: "How I Built This",
            note: "Founders telling the real story behind iconic companies.",
          },
        ],
      },
      {
        category: "Scriptures, Ideas & Philosophies",
        emoji: "💡",
        items: [
          {
            title: "Arc Browser",
            note: "Completely rethinks the browser. Once you use it you can't go back.",
          },
          {
            title: "Notion",
            note: "Where I track projects, notes, and everything in between.",
          },
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
          {
            title: "Deep Work",
            creator: "Cal Newport",
            note: "The book that convinced me to protect my focused hours like they're sacred.",
          },
          {
            title: "Sapiens",
            creator: "Yuval Noah Harari",
            note: "A sweeping story of how humans came to dominate the planet — and what it cost.",
          },
        ],
      },
      {
        category: "Music",
        emoji: "🎵",
        items: [
          {
            title: "In Rainbows",
            creator: "Radiohead",
            note: "A perfect album. Front to back, every track earns its place.",
          },
          {
            title: "After Hours",
            creator: "The Weeknd",
            note: "Atmospheric and cinematic — great for late nights.",
          },
        ],
      },
      {
        category: "Podcasts",
        emoji: "🎙️",
        items: [
          {
            title: "The Tim Ferriss Show",
            note: "Deconstruction of world-class performers — always something actionable.",
          },
          {
            title: "Darknet Diaries",
            note: "True stories from the dark side of the internet. Endlessly fascinating.",
          },
        ],
      },
      {
        category: "Scriptures, Ideas & Philosophies",
        emoji: "💡",
        items: [
          {
            title: "Linear",
            note: "The best issue tracker I've used. Fast, opinionated, and gets out of the way.",
          },
          {
            title: "Figma",
            note: "Still the gold standard for collaborative design work.",
          },
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
          {
            title: "The Pragmatic Programmer",
            creator: "Hunt & Thomas",
            note: "Timeless advice on the craft of software — relevant regardless of your stack.",
          },
          {
            title: "Atomic Habits",
            creator: "James Clear",
            note: "Changed how I think about behavior change and identity.",
          },
        ],
      },
      {
        category: "Music",
        emoji: "🎵",
        items: [
          {
            title: "Certified Lover Boy",
            creator: "Drake",
            note: "Kept this one on repeat for most of the year.",
          },
          {
            title: "Planet Her",
            creator: "Doja Cat",
            note: "Catchy, polished, and hard to stop listening to.",
          },
        ],
      },
      {
        category: "Podcasts",
        emoji: "🎙️",
        items: [
          {
            title: "Masters of Scale",
            note: "Reid Hoffman interviewing founders on how they grew their companies.",
          },
          {
            title: "The Knowledge Project",
            note: "Shane Parrish on mental models and clear thinking.",
          },
        ],
      },
      {
        category: "Scriptures, Ideas & Philosophies",
        emoji: "💡",
        items: [
          {
            title: "Readwise",
            note: "Resurfaces highlights from my books and articles daily. Invaluable.",
          },
          {
            title: "Vercel",
            note: "Deploying web projects has never felt this seamless.",
          },
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
            title: "Zero to One",
            creator: "Peter Thiel",
            note: "Contrarian thinking about startups and what it means to truly innovate.",
          },
          {
            title: "The War of Art",
            creator: "Steven Pressfield",
            note: "Short and brutal — the best book on overcoming resistance to creative work.",
          },
        ],
      },
      {
        category: "Music",
        emoji: "🎵",
        items: [
          {
            title: "SOUR",
            creator: "Olivia Rodrigo",
            note: "Debut albums rarely hit this hard. Every song landed.",
          },
          {
            title: "Donda",
            creator: "Kanye West",
            note: "Ambitious and sprawling — some of the best production he's ever done.",
          },
        ],
      },
      {
        category: "Podcasts",
        emoji: "🎙️",
        items: [
          {
            title: "My First Million",
            note: "Brainstorming business ideas with energy and genuine curiosity.",
          },
          {
            title: "Radiolab",
            note: "Science storytelling at its finest — always leaves me thinking.",
          },
        ],
      },
      {
        category: "Scriptures, Ideas & Philosophies",
        emoji: "💡",
        items: [
          {
            title: "Roam Research",
            note: "Networked note-taking that changed how I connect ideas.",
          },
          {
            title: "Superhuman",
            note: "Email that actually feels fast. Worth every penny for the habit it builds.",
          },
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
        {activeContent && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activeContent.categories.map((cat) => (
              <div
                key={cat.category}
                className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                  <span className="text-2xl">{cat.emoji}</span>
                  <h3 className="text-lg font-bold text-gray-900">{cat.category}</h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {cat.items.map((item, i) => (
                    <li key={i} className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">
                            {item.title}
                            {item.creator && (
                              <span className="font-normal text-gray-400 ml-1">
                                by {item.creator}
                              </span>
                            )}
                          </p>
                          <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

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
