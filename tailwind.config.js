// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import theme from "./theme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      white: "#FFFF",
      "gray-100": "#E1E1E6",
      "gray-300": "#C4C4CC",
      "gray-400": "#8D8D99",
      "gray-500": "#7C7C8A",
      "gray-600": "#323238",
      "gray-700": "#29292E",
      "gray-800": "#202024",
      "gray-900": "#121214",

      "green-300": "#00B37E",
      "green-500": "#00875F",
      "green-700": "#015F43",

      "red-500": "#AB222E",
      "red-700": "#7A1921",

      "yellow-500": "#FBA94C",
      transparent: "transparent",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      mono: ["Roboto", "mono", "monospace"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
