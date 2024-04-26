/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "log-in-green": "#478665",
      },
      fontFamily: {
        trocchi: ['"Trocchi"', "serif"],
      },
    },
  },
  plugins: [],
};
