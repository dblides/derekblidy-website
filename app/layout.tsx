import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Derek Blidy",
  description: "Personal website of Derek Blidy — bio, photos, blog, and more.",
  openGraph: {
    title: "Derek Blidy",
    description: "Personal website of Derek Blidy — photos, life updates & what I'm into.",
    type: "website",
    siteName: "Derek Blidy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Derek Blidy",
    description: "Personal website of Derek Blidy — photos, life updates & what I'm into.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Derek Blidy"
          href="/feed.xml"
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
