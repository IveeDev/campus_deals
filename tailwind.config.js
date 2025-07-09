/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Jakarta: ["Jakarta", "sans-serif"],
        JakartaBold: ["Jakarta-Bold", "sans-serif"],
        JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
        JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
        JakartaLight: ["Jakarta-Light", "sans-serif"],
        JakartaMedium: ["Jakarta-Medium", "sans-serif"],
        JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
      },

      colors: {
        primary: {
          DEFAULT: "#00A86B", // Main Green
          light: "#E6F4EC", // Light background
          dark: "#008B5B", // Hover/Pressed
        },
        secondary: {
          DEFAULT: "#FFA500", // Main Orange
          light: "#FFF4E5", // Background for promos
          dark: "#E59400", // Hover/Pressed
        },
        neutral: {
          white: "#FFFFFF",
          cream: "#F9FAFB",
          gray: "#D1D5DB", // border / input bg
          dark: "#333333", // text
          medium: "#555555",
          light: "#999999",
        },

        success: {
          100: "#F0FFF4",
          200: "#C6F6D5",
          300: "#9AE6B4",
          400: "#68D391",
          500: "#38A169",
          600: "#2F855A",
          700: "#276749",
          800: "#22543D",
          900: "#1C4532",
        },

        danger: {
          100: "#FFF5F5",
          200: "#FED7D7",
          300: "#FEB2B2",
          400: "#FC8181",
          500: "#F56565",
          600: "#E53E3E",
          700: "#C53030",
          800: "#9B2C2C",
          900: "#742A2A",
        },
      },
    },
  },
  plugins: [],
};
