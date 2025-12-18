/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
     extend: {
      colors: {
        primary: {
          400: '#42a5f5',
          600: '#1e88e5',
          700: '#1565c0'
        }
      }
    }
  },
  plugins: [
    
  ]
};
