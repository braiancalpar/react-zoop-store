/**
 * TestimonialCard Component
 *
 * Card para exibir depoimentos/avaliações de clientes.
 * Usado na seção de testimonials na Home page.
 */

import React from 'react';
import Typography from '../Typography';
import Rating from '../Rating';

interface TestimonialCardProps {
  testimonial: {
    rating: number;
    comment: string;
    reviewerName: string;
    productTitle?: string;
  };
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border border-cinza-200 ${className}`}>
      {/* Quote Icon */}
      <div className="mb-4">
        <svg className="w-8 h-8 text-magenta-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Review Text */}
      <Typography variant="body" className="mb-4 line-clamp-3 text-grafite-700">
        {testimonial.comment}
      </Typography>

      {/* Rating */}
      <div className="mb-3">
        <Rating rating={testimonial.rating} size="sm" />
      </div>

      {/* Reviewer Info */}
      <div>
        <Typography variant="caption" weight="semibold" className="text-grafite-900 mb-1 block">
          {testimonial.reviewerName}
        </Typography>
        {testimonial.productTitle && (
          <Typography variant="caption" color="text-grafite-500" className="line-clamp-1">
            Comprou: {testimonial.productTitle}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default React.memo(TestimonialCard);
