"use client";

import { useState, useEffect, useCallback } from "react";

const beliefs = [
  "Everyone pretty much gets what they want out of life. Most of us lie about what we want.",
  "Not wanting something is just as good as having it.",
  "Anytime I'm faced with dissatisfaction I only have 3 choices: Change, Accept, or Leave. Most of life's frustrations come from mentally desiring change but acting in acceptance.",
  "All advice is situational. You can find incredible advice that is completely contradicting. This makes discernment (knowing when to apply what) a key meta skill.",
  "Life basically comes down to hard now, easy later, or easy now, hard later.",
  "In the information age, reducing content consumption is of utmost importance.",
  "Every system is perfectly designed to create the output it creates.",
];

export default function BeliefsSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 300);
  }, []);

  const prev = () => goTo((current - 1 + beliefs.length) % beliefs.length);
  const next = () => goTo((current + 1) % beliefs.length);

  useEffect(() => {
    const interval = setInterval(() => next(), 10000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="py-16 bg-yellow-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-8">
          Some things I believe
        </p>

        <div className="flex items-center gap-4 sm:gap-8">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-gray-200 hover:border-yellow-400 flex items-center justify-center text-gray-400 hover:text-yellow-500 transition-colors"
          >
            ←
          </button>

          {/* Belief text */}
          <div className="flex-1 min-h-[120px] flex items-center justify-center">
            <p
              className="text-xl sm:text-2xl font-semibold text-gray-800 leading-snug"
              style={{ opacity: fading ? 0 : 1, transition: "opacity 0.3s ease" }}
            >
              {beliefs[current]}
            </p>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-gray-200 hover:border-yellow-400 flex items-center justify-center text-gray-400 hover:text-yellow-500 transition-colors"
          >
            →
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {beliefs.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? "bg-yellow-400" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
