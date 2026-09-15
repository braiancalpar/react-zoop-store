/**
 * Typography Component Types
 */

import React from 'react';

export type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

export type TypographyVariant =
  | 'display' // Hero headings (5xl-7xl)
  | 'heading' // Section headings (3xl-4xl)
  | 'title' // Card titles, sub-headings (xl-2xl)
  | 'body' // Paragraph text (base-lg)
  | 'caption' // Meta info, helper text (sm)
  | 'overline'; // Labels, tags (xs)

export type TypographyWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export interface TypographyProps {
  /**
   * HTML element to render
   */
  as?: TypographyElement;

  /**
   * Style variant
   */
  variant?: TypographyVariant;

  /**
   * Font weight
   */
  weight?: TypographyWeight;

  /**
   * Text color (Tailwind class)
   */
  color?: string;

  /**
   * Apply gradient to text
   */
  gradient?: boolean;

  /**
   * Text alignment
   */
  align?: TypographyAlign;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Content
   */
  children: React.ReactNode;
}
