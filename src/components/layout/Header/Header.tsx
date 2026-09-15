/**
 * Header Component
 *
 * Cabeçalho principal com logo, busca e carrinho.
 * Sticky ao scroll com sombra.
 *
 * @example
 * ```tsx
 * <Header
 *   cartItemCount={3}
 *   onSearch={(query) => console.log(query)}
 *   onCartClick={() => navigate('/cart')}
 * />
 * ```
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';
import Input from '../../common/Input';

const SearchIcon: React.FC = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const CartIcon: React.FC = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

export interface HeaderProps {
  /**
   * Número de itens no carrinho
   */
  cartItemCount?: number;

  /**
   * Callback ao realizar busca
   */
  onSearch?: (query: string) => void;

  /**
   * Callback ao clicar no carrinho
   */
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount = 0, onSearch, onCartClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Sticky header with shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-gradient-primary">ZOOP</div>
          </Link>

          {/* Search Bar (desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xl">
            <Input
              type="search"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<SearchIcon />}
              fullWidth
            />
          </form>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-2 text-grafite-700 hover:text-magenta-500 transition-colors"
            aria-label="Carrinho de compras"
          >
            <CartIcon />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-magenta-500 text-white text-xs font-bold rounded-full">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar (mobile) */}
        <form onSubmit={handleSearchSubmit} className="md:hidden pb-4">
          <Input
            type="search"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<SearchIcon />}
            fullWidth
          />
        </form>
      </Container>
    </header>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(Header);
