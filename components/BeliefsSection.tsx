"use client";

import { useState, useEffect } from "react";

const beliefs = [
  "Everyone pretty much gets what they want out of life. Most of us lie about what we want.",
  "Not wanting something is just as good as having it.",
  "I try as many new things as possible. I stop as soon as I realize it's not working.",
  "Anytime I'm faced with dissatisfaction I only have 3 choices: Change, Accept, or Leave. Most of life's frustrations come from mentally desiring change but acting in acceptance.",
  "All advice is situational. You can find incredible advice that is completely contradicting. Discernment is the meta-skill: knowing when to apply what.",
  "Life basically comes down to hard now, easy later, or easy now, hard later.",
  "In the information age, reducing content consumption is of utmost importance.",
];

export default function BeliefsSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % beliefs.length);
        setFading(false);
      }, 600);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-yellow-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-8">
          Some things I believe
        </p>

        <div className="relative min-h-[120px] flex items-center justify-center">
          <p
            className="text-2xl sm:text-3xl font-semibold text-gray-800 leading-snug"
            style={{ opacity: fading ? 0 : 1, transition: "opacity 0.6s ease" }}
          >
            {beliefs[current]}
          </p>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {beliefs.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFading(true); setTimeout(() => { setCurrent(i); setFading(false); }, 600); }}
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
