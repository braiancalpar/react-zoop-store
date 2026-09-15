/**
 * Design Tokens - Sombras
 * Sombras sutis para profundidade e glows coloridos para interações
 */

export const shadows = {
  // Sombras básicas
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',

  // Glows coloridos para interações
  'magenta-glow': '0 0 20px -5px rgba(235, 63, 167, 0.5)',
  'azul-glow': '0 0 20px -5px rgba(59, 130, 246, 0.5)',
  'verde-glow': '0 0 20px -5px rgba(34, 197, 94, 0.5)',
  'grafite-glow': '0 0 20px -5px rgba(95, 102, 112, 0.3)',
} as const;
