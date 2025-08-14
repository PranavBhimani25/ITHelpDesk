/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: ["index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class', // Enable dark mode support
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark'], // Include light and dark themes
    darkTheme: 'dark', // Set the default dark theme
  },
}

