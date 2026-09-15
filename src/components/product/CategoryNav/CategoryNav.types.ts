/**
 * CategoryNav Component Types
 */

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CategoryNavProps {
  /**
   * List of categories
   */
  categories: Category[];

  /**
   * Active category slug
   */
  activeCategory?: string;

  /**
   * Category click handler
   */
  onCategoryClick: (categorySlug: string) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}
