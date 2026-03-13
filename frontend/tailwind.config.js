/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],

  theme: {
    extend: {
      colors: {
        primary: "#4f46e5"
      },

      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },

        drift1: {
          "0%": { transform: "translate(0px,0px) rotate(0deg)" },
          "25%": { transform: "translate(40px,-60px) rotate(15deg)" },
          "50%": { transform: "translate(-30px,-120px) rotate(-10deg)" },
          "75%": { transform: "translate(60px,-40px) rotate(8deg)" },
          "100%": { transform: "translate(0px,0px) rotate(0deg)" }
        },

        drift2: {
          "0%": { transform: "translate(0px,0px)" },
          "25%": { transform: "translate(-60px,40px)" },
          "50%": { transform: "translate(-120px,-30px)" },
          "75%": { transform: "translate(-40px,60px)" },
          "100%": { transform: "translate(0px,0px)" }
        },

        drift3: {
          "0%": { transform: "translate(0px,0px)" },
          "25%": { transform: "translate(50px,70px)" },
          "50%": { transform: "translate(-20px,120px)" },
          "75%": { transform: "translate(80px,20px)" },
          "100%": { transform: "translate(0px,0px)" }
        },

        drift4: {
          "0%": { transform: "translate(0px,0px)" },
          "25%": { transform: "translate(-80px,-30px)" },
          "50%": { transform: "translate(-20px,80px)" },
          "75%": { transform: "translate(-60px,-60px)" },
          "100%": { transform: "translate(0px,0px)" }
        }
      },

      animation: {
        slideDown: "slideDown 0.3s ease-out forwards",
        drift1: "drift1 18s ease-in-out infinite",
        drift2: "drift2 20s ease-in-out infinite",
        drift3: "drift3 22s ease-in-out infinite",
        drift4: "drift4 25s ease-in-out infinite"
      }
    }
  },

  plugins: []
}