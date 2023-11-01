module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'media',
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    screens: {
      xs: "300px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
    colors: {
      primary: "#da18a3",
      light: "#ffffff",
      dark: "#24252d",
      gray100: "#e3e1e3",
      gray200: "#888888",
      gray300: "#4f4f4f",
      dark100: "#2d2e36",
      dark200: "#1b1a21",
      dark300: "#2a2d3a",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
