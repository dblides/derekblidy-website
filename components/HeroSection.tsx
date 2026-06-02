"use client";

import Link from "next/link";

const scrollLinks = [
  { href: "#about",   label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#life",    label: "My Life" },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection({ lastUpdated }: { lastUpdated?: string }) {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center pt-16 pb-0 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-400/10 rounded-full translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-400/10 rounded-full -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Last updated badge */}
          {lastUpdated && (
            <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Last updated {lastUpdated}
            </div>
          )}

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
            Hi, I&apos;m Derek.
          </h1>

          {/* Sub */}
          <p className="text-xl text-gray-500 max-w-xl leading-relaxed mb-10">
            I built this site as an alternative to social media. A place to log
            my life, share what I&apos;m reading and thinking, and let people know
            what I&apos;m up to. Updated every few months.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("#about")}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-7 py-3.5 rounded-full transition-colors text-sm"
            >
              Get to know me
            </button>
            <Link
              href="/content"
              className="border-2 border-gray-200 hover:border-gray-400 text-gray-700 font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
            >
              What I&apos;m into
            </Link>
          </div>

          {/* Quick nav */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-14">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">
              Jump to
            </span>
            {scrollLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-gray-500 hover:text-yellow-500 font-medium transition-colors"
              >
                {link.label} →
              </button>
            ))}
            <Link
              href="/content"
              className="text-sm text-gray-500 hover:text-yellow-500 font-medium transition-colors"
            >
              Content →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
