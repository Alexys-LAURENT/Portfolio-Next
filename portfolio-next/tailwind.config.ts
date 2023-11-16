import type { Config } from 'tailwindcss'
import { nextui } from "@nextui-org/react";
const config: Config = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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

export default config
