/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slide: "slide 5s infinite",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      height: {
        custom: "610px",
      },
      flexBasis: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "1/4": "25%",
        full: "100%",
        custom: "510px", // Thêm giá trị tùy chỉnh cho flex-basis
      },
    },
  },
  plugins: [],
};
