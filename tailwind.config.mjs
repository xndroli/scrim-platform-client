// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // Define your font families here instead of using extend
      zentry: ["var(--font-zentry)"],
      general: ["var(--font-general)"],
      circular: ["var(--font-circular-web)"],
      robert: ["var(--font-robert-regular)"],
      // Add other font families here if needed
    },
    extend: {
      // Other extensions...
    },
  },
  plugins: [require("tailwindcss-animate")],
};