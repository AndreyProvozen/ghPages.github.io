/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      whiteMain: "#ffff",
      grayMain: "#dde1e7",
      darkGrayMain: "#2e2e2e",
      blackMain: "#020205",
      lightPinkMain: "#FC88ED",
      pinkMain: "#FB56E6",
      darkPinkMain: "#A43F99",
      brownMain: "#5E4761",
    },
  },
  plugins: [],
};
