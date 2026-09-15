/**
 * CategoryCard Component
 *
 * Card clicável para exibir categorias com ícones Material Icons.
 * Usado na seção de navegação de categorias na Home page.
 */

import React, { useCallback } from 'react';
import Typography from '../../common/Typography';
import { getIconForCategory } from './CategoryIcons';
import { formatCategoryName } from '../../../utils/formatters';
import type { Category } from '../../../types/Product';

interface CategoryCardProps {
  category: Category;
  onClick: (slug: string) => void;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, className = '' }) => {
  const handleClick = useCallback(() => {
    onClick(category.slug);
  }, [category.slug, onClick]);

  const iconName = getIconForCategory(category.slug);
  const displayName = formatCategoryName(category.name);

  return (
    <button
      onClick={handleClick}
      className={`
        flex-none flex flex-col items-center gap-3 p-2
        w-[100px] md:w-[120px]
        transition-all duration-200
        hover:scale-105 focus:scale-105
        focus:outline-none focus:ring-2 focus:ring-magenta-400 focus:ring-offset-2
        rounded-lg
        ${className}
      `}
      aria-label={`Ver produtos da categoria ${category.name}`}
    >
      {/* Icon Container */}
      <div
        className="
        w-16 h-16 md:w-20 md:h-20
        rounded-full
        bg-gradient-to-br from-magenta-400 to-azul-500
        flex items-center justify-center
        shadow-md hover:shadow-lg transition-shadow
        flex-shrink-0
      "
      >
        <span className="material-icons text-white text-3xl md:text-4xl">{iconName}</span>
      </div>

      {/* Category Name */}
      <Typography
        variant="caption"
        weight="semibold"
        align="center"
        className="w-full line-clamp-2 leading-tight"
      >
        {displayName}
      </Typography>
    </button>
  );
};

export default React.memo(CategoryCard);
