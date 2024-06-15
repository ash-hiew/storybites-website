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
    extend: { padding: { "fluid-video": "56.25%" },
    animation: {
      'marquee-infinite': 'marquee 60s linear infinite',
    },
    keyframes: {
      marquee: {
        'from': {transform: 'translateX(0)'},
        'to':{transform: 'translateX(-100%)'},
      }
    }
   },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
