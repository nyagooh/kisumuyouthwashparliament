/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#0066cc",
        secondary: "#004d99",
        accent: "#00264d",
        text: "#333333",
        light: "#f8f9fa",
        gray: "#6c757d"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
      container: {
        center: true,
        padding: "1rem"
      }
    }
  },
  plugins: []
}
