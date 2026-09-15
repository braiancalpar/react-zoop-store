/**
 * CategoryIcons
 *
 * Mapeamento de slugs de categorias para nomes de ícones do Material Icons.
 * Fornece uma função helper para obter o ícone apropriado para cada categoria.
 */

/**
 * Mapeamento de categorias para Material Icons
 * @see https://fonts.google.com/icons
 */
export const categoryIconMap: Record<string, string> = {
  beauty: 'face',
  fragrances: 'local_florist',
  furniture: 'weekend',
  groceries: 'shopping_cart',
  'home-decoration': 'home',
  'kitchen-accessories': 'kitchen',
  laptops: 'laptop',
  'mens-shirts': 'checkroom',
  'mens-shoes': 'hiking',
  'mens-watches': 'watch',
  'mobile-accessories': 'phonelink',
  motorcycle: 'two_wheeler',
  'skin-care': 'self_improvement',
  smartphones: 'smartphone',
  'sports-accessories': 'sports_basketball',
  sunglasses: 'light_mode',
  tablets: 'tablet',
  tops: 'shopping_bag',
  vehicle: 'directions_car',
  'womens-bags': 'work_outline',
  'womens-dresses': 'face_retouching_natural',
  'womens-jewellery': 'celebration',
  'womens-shoes': 'hiking',
  'womens-watches': 'schedule',
};

/**
 * Retorna o nome do ícone Material Icons para uma categoria
 * @param categorySlug - O slug da categoria (ex: 'beauty', 'fragrances')
 * @returns O nome do ícone (ex: 'face', 'local_florist')
 */
export const getIconForCategory = (categorySlug: string): string => {
  return categoryIconMap[categorySlug] || 'category';
};
