/**
 * Formata o nome da categoria de slug para texto legível
 *
 * @param name - Nome da categoria em formato slug
 * @returns Nome formatado com capitalização adequada
 *
 * @example
 * formatCategoryName("beauty") // "Beauty"
 * formatCategoryName("home-decoration") // "Home Decoration"
 * formatCategoryName("mens-shoes") // "Mens Shoes"
 */
export const formatCategoryName = (name: string): string => {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
