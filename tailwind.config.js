/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "8rem",
      },
    },
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
          primary: "#0060bb",
          secondary: "#ea581d",
          accent: "#748e9c",
          neutral: "#1e293b",
          "base-100": "#ffffff",
          "--rounded-btn": "6px",
          "--padding-card": "1.5rem",
        },
      },
    ],
    prefix: "ds-",
  },
};
