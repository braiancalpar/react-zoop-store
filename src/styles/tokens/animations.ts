/**
 * Design Tokens - Animações
 * Keyframes e definições de animações para micro-interações
 */

export const animations = {
  // Keyframes
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    fadeInUp: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    fadeInDown: {
      '0%': { opacity: '0', transform: 'translateY(-20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    slideInRight: {
      '0%': { transform: 'translateX(100%)' },
      '100%': { transform: 'translateX(0)' },
    },
    slideInLeft: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(0)' },
    },
    scaleIn: {
      '0%': { transform: 'scale(0.95)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    shimmer: {
      '0%': { backgroundPosition: '-1000px 0' },
      '100%': { backgroundPosition: '1000px 0' },
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.7' },
    },
    bounce: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' },
    },
    spin: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  },

  // Definições de animação
  animation: {
    fadeIn: 'fadeIn 0.3s ease-in-out',
    fadeInUp: 'fadeInUp 0.5s ease-out',
    fadeInDown: 'fadeInDown 0.5s ease-out',
    slideInRight: 'slideInRight 0.3s ease-out',
    slideInLeft: 'slideInLeft 0.3s ease-out',
    scaleIn: 'scaleIn 0.2s ease-out',
    shimmer: 'shimmer 2s linear infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s ease-in-out infinite',
    spin: 'spin 1s linear infinite',
  },
} as const;
