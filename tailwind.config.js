/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "log-in-green": "#478665",
        "top-bar-green": "#059669",

        primary: {
          50: "#f3faf4",
          100: "#e3f5e5",
          200: "#c9e9cd",
          300: "#9ed7a7",
          400: "#6cbc79",
          500: "#41904e",
          600: "#378244",
          700: "#2e6737",
          800: "#28532f",
          900: "#234429",
          950: "#0f2414",
        },

        contessa: {
          50: "#fbf6f5",
          100: "#f6ecea",
          200: "#f0dcd8",
          300: "#e4c3bd",
          400: "#d3a096",
          500: "#ba7264",
          600: "#aa6558",
          700: "#8e5347",
          800: "#77463d",
          900: "#643f38",
          950: "#351e1a",
        },
      },
      fontFamily: {
        trocchi: ['"Trocchi"', "serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
