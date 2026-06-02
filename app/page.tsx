import { execSync } from "child_process";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BeliefsSection from "@/components/BeliefsSection";
import GallerySection from "@/components/GallerySection";
import TimelineSection from "@/components/TimelineSection";

function getLastUpdated() {
  try {
    const date = execSync('git log -1 --format=%cd --date=format:"%B %Y"')
      .toString()
      .trim();
    return date;
  } catch {
    return null;
  }
}

export default function Home() {
  const lastUpdated = getLastUpdated();

  return (
    <>
      <HeroSection lastUpdated={lastUpdated ?? undefined} />
      <AboutSection />
      <BeliefsSection />
      <GallerySection />
      <TimelineSection />
    </>
  );
}
