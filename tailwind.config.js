/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d1117",
        surface: "rgba(255, 255, 255, 0.05)",
        primary: "#38bdf8", // Neon Blue
        secondary: "#4ade80", // Aqua Green
        accent: "#a78bfa", // Soft Purple
        highlight: "#ec4899", // Accent Pink
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
