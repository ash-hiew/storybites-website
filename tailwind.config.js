module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'primary': ['Poppins', 'sans-serif'],
      'display': ['Lora', 'serif']
    },
    extend: { padding: { "fluid-video": "56.25%" } },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
