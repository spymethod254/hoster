/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: '#090E1A',
        cardBg: '#111A2E',
        accentBlue: '#2563EB',
        neonBlue: '#38BDF8',
        textMuted: '#94A3B8',
      },
      borderRadius: {
        'dashboard': '1.25rem',
      }
    },
  },
  plugins: [],
}