/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Təbii kənd tonları: yaşıl + krem + torpaq
        brand: {
          50: "#f1f8f2",
          100: "#dcefe0",
          200: "#bbdfc4",
          300: "#8ec79e",
          400: "#5aa872",
          500: "#2f7d4f",
          600: "#246340",
          700: "#1e4f34",
          800: "#1a402c",
          900: "#163525",
        },
        cream: {
          50: "#faf7f0",
          100: "#f3ecdd",
          200: "#e7d8bb",
        },
        honey: {
          400: "#f0b429",
          500: "#de8f0a",
        },
      },
      fontFamily: {
        sans: ["Nunito", "system-ui", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px -2px rgba(30, 79, 52, 0.12)",
      },
    },
  },
  plugins: [],
};
