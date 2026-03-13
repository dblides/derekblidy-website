import ContentSection from "@/components/ContentSection";

export const metadata = {
  title: "Content I Enjoy — Derek Blidy",
  description:
    "Books, music, podcasts, and tools — organized by what I was into each year.",
};

export default function ContentPage() {
  return (
    <div className="pt-16">
      <ContentSection />
    </div>
  );
}
