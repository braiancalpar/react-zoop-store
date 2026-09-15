/**
 * MainLayout Component
 *
 * Layout principal que envolve Header, conteúdo e Footer.
 * Wrapper para todas as páginas da aplicação.
 *
 * @example
 * ```tsx
 * <MainLayout cartItemCount={3} onCartClick={() => navigate('/cart')}>
 *   <YourPageContent />
 * </MainLayout>
 * ```
 */

import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import type { MainLayoutProps } from './MainLayout.types';

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  cartItemCount = 0,
  onSearch,
  onCartClick,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header cartItemCount={cartItemCount} onSearch={onSearch} onCartClick={onCartClick} />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(MainLayout);
