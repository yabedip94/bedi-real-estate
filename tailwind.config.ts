import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        limestone: {
          DEFAULT: "var(--color-limestone)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          light: "#3a3c35",
          muted: "#555850",
        },
        sage: {
          DEFAULT: "var(--color-sage)",
          light: "#9ea192",
          dark: "#686a5a",
        },
        bronze: {
          DEFAULT: "var(--color-bronze)",
          light: "#c5b093",
          dark: "#967f60",
        },
        sand: {
          DEFAULT: "var(--color-sand)",
          light: "#ede9e0",
          dark: "#d1c9ba",
        },
        white: {
          DEFAULT: "var(--color-white)",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        editorial: "1360px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
