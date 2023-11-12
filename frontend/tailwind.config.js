/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5DB8F8",
        secondary: "#E6E6E5",
        accent: "#007DD1q",
      },
    },
  },
  plugins: [],
};
