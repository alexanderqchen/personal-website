/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      colors: {
        accent: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dark: "#4f46e5",
        },
        // Warm-toned neutrals to complement the beige/slate color scheme
        neutral: {
          50:  "#faf7f3",
          100: "#f0ebe2",  // card surfaces, tag bg (light)
          200: "#ddd6cb",  // borders (light)
          300: "#c9c0b3",
          400: "#a89e8f",
          500: "#8a8070",  // muted text
          600: "#6e6457",  // secondary text (light)
          700: "#4e4540",
          800: "#252d3a",  // borders, surfaces (dark) — blue-tinted
          900: "#1a2130",
          950: "#111720",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
