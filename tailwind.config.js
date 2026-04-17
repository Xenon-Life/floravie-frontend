/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    // colors: {
    //   primaryColor: "#1fb6ff",
    //   secondaryColor: "#7e5bef",

    // },
    screens: {
      lg: { max: "1024px" },
      md: { max: "900px" }, 
      sm: { max: "639px" }, 

      
    },
  },
  plugins: [],
};
