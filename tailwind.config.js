/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FFF8EE", deep: "#F6EAD3", line: "#EADFCC" },
        chili: { DEFAULT: "#D64933", dark: "#B83A27", soft: "#F9DDD5" },
        basil: { DEFAULT: "#2F5D3A", dark: "#224629", soft: "#DCEBDD" },
        mango: { DEFAULT: "#F4B942", dark: "#C98A0B", soft: "#FCEFCB" },
        ink: { DEFAULT: "#2B2622", soft: "#6F645A" },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        plate: "0 1px 0 #EADFCC, 0 10px 24px -14px rgba(43,38,34,0.35)",
      },
    },
  },
  plugins: [],
};
