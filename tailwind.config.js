import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        headerButton: "#D4D298",
        textButton: "#08181F",
        cinza: "#8B949E"
      },
      backgroundImage: {
        'teste': 'radial-gradient(120% 120% at 50% 15%, rgba(34,103,133,0.65) 5%, rgba(34,103,133, 0.1) 70%)',
        "card1": "radial-gradient(40% 40% at 100% 100%, rgba(34,103,133,0.35) 0%, rgba(34,103,133,0.00) 60%)",
        "teste3": `
          radial-gradient(90% 90% at 90% 20%, rgba(34, 103, 133, 0.80) 0%, rgba(34, 103, 133, 0.00) 70%),
          linear-gradient(rgba(34, 103, 133, 0.05), rgba(34, 103, 133, 0.05))
        `,
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))'
      }
    },
    darkMode: "class",
    plugins: [heroui()],
  }
}