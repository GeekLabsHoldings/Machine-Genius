import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        rotateRight: 'rotateRight 6s linear infinite',
        rotateLeft: 'rotateLeft 6s linear infinite',
        rotateLeftTransform: 'rotateLeftTransform 6s linear infinite',
        rotateRightTransform: 'rotateRightTransform 6s linear infinite',
      },
      keyframes: {
        rotateRight: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rotateLeftTransform: {
          '0%': { transform: 'translate(-50%,-50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%,-50%) rotate(-360deg)' },
        },
        rotateRightTransform: {
          '0%': { transform: 'translate(-50%,-50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%,-50%) rotate(360deg)' },
        }
      }
    },
  },
  plugins: [require("daisyui")],
};
export default config;
