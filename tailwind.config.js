/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#711d1c",
        secondary: "#070707",
        mug: "#3f2616",
        mugShadow: "#442918",
        mugBorder: "#3c2415",
        mugLight: "#e4e6b2",
        mugLighter: "#eff0d1",
        mugRing: "#77665c",
        numberShadow: "#34180e",
        textLink: "#414042",
      },
      fontFamily: {
        shabnam: ["shabnam", "sans-serif"],
        "shabnam-bold": ["shabnam-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
