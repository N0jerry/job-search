/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./screens/**/*.{js,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary50: "#cfeffd",
        primary100: "#a0defb",
        primary200: "#77cff8",
        primary400: "#44bdf5",
        primary500: "#1aacf0",
        primary700: "#0570c9",
        primary800: "#003b88",
        accent500: "#e6b30b",
        gray700: "#221c30",
      },
    },
  },
  plugins: [],
};
