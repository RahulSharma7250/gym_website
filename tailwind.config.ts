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
        'fire-red': 'var(--fire-red)',
        'fire-orange': 'var(--fire-orange)',
        'fire-amber': 'var(--fire-amber)',
        'deep-black': 'var(--deep-black)',
        'smoke': 'var(--smoke)',
        'ash': 'var(--ash)',
        'white': 'var(--white)',
      },
      fontFamily: {
        'bebas': ['var(--font-bebas-neue)'],
        'barlow-condensed': ['var(--font-barlow-condensed)'],
        'barlow': ['var(--font-barlow)'],
      },
    },
  },
  plugins: [],
};
export default config;
