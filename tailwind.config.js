/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        sticky: "sticky 0.35s ease-out",
      },
      keyframes: {
        sticky: {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        reptex: {
          ...require("daisyui/src/colors/themes")["[data-theme=cmyk]"],
          primary: "#0060bb",
          secondary: "#ea581d",
          accent: "#5c7f67",
          neutral: "#5D5656",
        },
      },
    ],
    prefix: "ds-",
  },
};
