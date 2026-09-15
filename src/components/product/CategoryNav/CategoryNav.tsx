/* eslint-disable react-hooks/refs */
/**
 * CategoryNav Component
 *
 * Navegação de categorias com scroll horizontal (mobile).
 *
 * @example
 * ```tsx
 * <CategoryNav
 *   categories={categories}
 *   activeCategory="electronics"
 *   onCategoryClick={(slug) => filterByCategory(slug)}
 * />
 * ```
 */

import React from 'react';
import { formatCategoryName } from '../../../utils/formatters';
import { useHorizontalScroll } from '../../../hooks/useHorizontalScroll';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CategoryNavProps {
  categories: Category[];
  activeCategory?: string;
  onCategoryClick: (categorySlug: string) => void;
  className?: string;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
  className = '',
}) => {
  const useScroll = useHorizontalScroll();

  return (
    <nav className={`relative ${className}`}>
      {/* Left Navigation Button */}
      {useScroll.canScrollLeft && (
        <button
          onClick={() => useScroll.scroll('left')}
          className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-magenta-50 transition-all border border-cinza-200"
          aria-label="Scroll left"
        >
          <svg
            className="w-4 h-4 text-magenta-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={useScroll.scrollRef}
        onScroll={() => useScroll.updateScrollButtons()}
        className="overflow-x-auto scrollbar-hide px-8"
      >
        <div className="flex gap-2 pb-2">
          {/* All Categories Button */}
          <button
            onClick={() => onCategoryClick('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              !activeCategory || activeCategory === 'all'
                ? 'bg-magenta-500 text-white shadow-md'
                : 'bg-cinza-100 text-grafite-700 hover:bg-cinza-200'
            }`}
          >
            Todos
          </button>

          {/* Category Buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === category.slug
                  ? 'bg-magenta-500 text-white shadow-md'
                  : 'bg-cinza-100 text-grafite-700 hover:bg-cinza-200'
              }`}
            >
              {formatCategoryName(category.name)}
            </button>
          ))}
        </div>
      </div>

      {/* Right Navigation Button */}
      {useScroll.canScrollRight && (
        <button
          onClick={() => useScroll.scroll('right')}
          className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-magenta-50 transition-all border border-cinza-200"
          aria-label="Scroll right"
        >
          <svg
            className="w-4 h-4 text-magenta-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </nav>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(CategoryNav);
