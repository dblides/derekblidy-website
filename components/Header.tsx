"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// scroll: smooth-scrolls to an anchor on the homepage
// page: navigates to a dedicated route
const navLinks = [
  { type: "scroll", href: "#about",   label: "About" },
  { type: "scroll", href: "#gallery", label: "Gallery" },
  { type: "scroll", href: "#life",    label: "My Life" },
  { type: "page",   href: "/health",  label: "Health" },
  { type: "page",   href: "/content", label: "Content" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (pathname === "/") {
      // Already on homepage — smooth scroll
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    } else {
      // On another page — navigate to homepage with the hash
      router.push(`/${href}`);
    }
  };

  const linkClass = "text-sm font-medium text-gray-600 hover:text-gray-900 relative group transition-colors";
  const underline = "absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-200";
  const mobileLinkClass = "py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-yellow-50 rounded-lg transition-colors";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-2 h-2 rounded-full bg-yellow-400 group-hover:scale-125 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Derek Blidy
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.type === "page" ? (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                  <span className={underline} />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollClick(e, link.href)}
                  className={linkClass}
                >
                  {link.label}
                  <span className={underline} />
                </a>
              )
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100 ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) =>
            link.type === "page" ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={mobileLinkClass}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollClick(e, link.href)}
                className={mobileLinkClass}
              >
                {link.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
