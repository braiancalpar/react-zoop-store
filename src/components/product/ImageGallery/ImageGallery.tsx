/**
 * ImageGallery Component
 *
 * Galeria de imagens do produto com preview e thumbnails.
 */

import React, { useState } from 'react';
import OptimizedImage from '../../common/OptimizedImage';

export interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Se não houver imagens, mostrar placeholder
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-cinza-100 rounded-xl flex items-center justify-center">
        <svg
          className="w-24 h-24 text-cinza-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-cinza-50 border border-cinza-200">
        <OptimizedImage
          src={images[selectedIndex]}
          alt={`${alt} - imagem ${selectedIndex + 1}`}
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
          aspectRatio="square"
          priority={selectedIndex === 0}
        />

        {/* Navigation Arrows (se houver múltiplas imagens) */}
        {images.length > 1 && (
          <>
            {/* Previous Button */}
            {selectedIndex > 0 && (
              <button
                onClick={() => setSelectedIndex(selectedIndex - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-magenta-500"
                aria-label="Imagem anterior"
              >
                <svg
                  className="w-5 h-5 text-grafite-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Next Button */}
            {selectedIndex < images.length - 1 && (
              <button
                onClick={() => setSelectedIndex(selectedIndex + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-magenta-500"
                aria-label="Próxima imagem"
              >
                <svg
                  className="w-5 h-5 text-grafite-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
              {selectedIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails (se houver múltiplas imagens) */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`
                relative aspect-square overflow-hidden rounded-lg
                border-2 transition-all duration-200
                hover:border-magenta-400
                focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:ring-offset-2
                ${
                  selectedIndex === index
                    ? 'border-magenta-500 ring-2 ring-magenta-500 ring-offset-2'
                    : 'border-cinza-200'
                }
              `}
              aria-label={`Selecionar imagem ${index + 1}`}
            >
              <OptimizedImage
                src={image}
                alt={`${alt} - thumbnail ${index + 1}`}
                className="w-full h-full object-cover object-center"
                aspectRatio="square"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(ImageGallery);
