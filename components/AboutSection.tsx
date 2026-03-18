import Image from "next/image";

// Photos from /public/main photos/ — add more filenames here as you drop in new images
const stripPhotos = [
  "/Main%20photos/IMG_0420.JPG",
  "/Main%20photos/IMG_1958.jpeg",
  "/Main%20photos/IMG_4363.jpeg",
  "/Main%20photos/IMG_5900.jpeg",
  "/Main%20photos/472326607_18480429754018863_7057591190755462964_n.jpg",
  "/Main%20photos/68821927338__C6E9FC0B-49BD-40C9-884C-0B762C717351.jpeg",
  "/Main%20photos/IMG_0046.JPG",
  "/Main%20photos/IMG_1182.jpeg",
  "/Main%20photos/IMG_5948.jpeg",
  "/Main%20photos/alien.jpeg",
];

// Duplicate for seamless infinite loop
const loopPhotos = [...stripPhotos, ...stripPhotos];

export default function AboutSection() {
  return (
    <section id="about" className="pt-10 pb-24 bg-white overflow-hidden">

      {/* ── Scrolling photo strip ── */}
      <div className="relative w-full mb-14 overflow-hidden">
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="marquee-track gap-3" style={{ gap: "12px" }}>
          {loopPhotos.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 rounded-xl overflow-hidden"
              style={{ width: "280px", height: "200px" }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-yellow-500 mb-3">
              About me
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-6">
              What&apos;s a{" "}
              <span className="relative inline-block">
                Derek
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded" />
              </span>
              ?
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                I&apos;m a disciple of Christ, a husband and an entrepreneur. I
                spend the majority of my time building my company Talas. When
                I&apos;m not working on Talas I&apos;m reading, praying,
                exercising or exploring my new curiosity of the year including
                marathon running, blockchain, Sauerkraut, and much more.
              </p>
              <p>
                In 2021 I began to cut social media out of my life
                (except LinkedIn which is a tragedy). There are endless benefits
                to this and I encourage everyone to do so. The one downside is
                that I no longer have a place to share/store photos (Instagram).
                And nowhere to post my random thoughts (Twitter).
              </p>
              <p>So I&apos;m using this website to do just that. Enjoy!</p>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="mailto:derekmblidy@gmail.com"
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Say hello
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Portrait placeholder */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Decorative yellow square behind */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-yellow-400 rounded-2xl" />
              {/* Photo container */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                <Image
                  src="/Profile%20photo/IMG_5144.PNG"
                  alt="Derek Blidy"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 288px, 320px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
