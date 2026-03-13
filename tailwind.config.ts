import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          400: "#FACC15",
          500: "#EAB308",
        },
        accent: "#FACC15",
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
