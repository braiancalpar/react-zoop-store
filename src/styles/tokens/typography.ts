/**
 * Design Tokens - Tipografia
 * Família de fontes, escala tipográfica e pesos baseados em Montserrat
 */

export const typography = {
  // Família de fontes
  fontFamily: {
    sans: ['Montserrat', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    display: ['Montserrat', 'system-ui', 'sans-serif'],
  },

  // Escala tipográfica com line-heights otimizadas
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
    base: ['1rem', { lineHeight: '1.5rem' }], // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1.2' }], // 48px
    '6xl': ['3.75rem', { lineHeight: '1.1' }], // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }], // 72px
  },

  // Pesos de fonte disponíveis no Montserrat
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Letter spacing para ajustes finos
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;
