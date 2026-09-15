import { colors } from './src/styles/tokens/colors';
import { typography } from './src/styles/tokens/typography';
import { spacing } from './src/styles/tokens/spacing';
import { shadows } from './src/styles/tokens/shadows';
import { borderRadius } from './src/styles/tokens/borderRadius';
import { animations } from './src/styles/tokens/animations';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Cores customizadas (Magenta, Cinza, Azul, Verde, Grafite)
      colors,

      // Tipografia Montserrat
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      letterSpacing: typography.letterSpacing,

      // Espaçamento
      spacing,

      // Sombras
      boxShadow: shadows,

      // Border Radius
      borderRadius,

      // Animações
      keyframes: animations.keyframes,
      animation: animations.animation,

      // Extras modernos
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}
