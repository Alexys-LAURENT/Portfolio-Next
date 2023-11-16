// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: '#00050A',
        bgLight: "#F1F1F1",
        btnColor: '#256949',
        textDark: "#323232",
        textLight: "#FFFFFF"
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

