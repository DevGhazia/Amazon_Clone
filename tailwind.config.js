/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linkBlue: "#007185",
        mutedGray: "#565959",
        darkGray: "#888c8c",
        lightGray: "#d5d9d9",
        brightYellow: "hsl(48, 100%, 54%)",
        darkYellow: "hsl(48, 100%, 48%)",
        inputBlue: "#E7F0FE",
      }
    },
  },
  plugins: [],
}
