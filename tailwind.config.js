/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#ffff",
      gray: "#dde1e7",
      lightBlack: "#2e2e2e",
      black: "#020205",
      lightPink: "#FC88ED",
      pink: "#FB56E6",
      darkPink: "#A43F99",
      darkGreen: "#05c148",
      lightOrange: "#F0AD4E",
      darkRed: "#c1002a",
    },
  },
  plugins: [],
};
