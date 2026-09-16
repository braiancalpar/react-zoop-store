/**
 * Products Page
 *
 * Página de listagem de produtos com filtros por categoria,
 * ordenação e paginação básica.
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';
import { productsService } from '../../services/productsService';
import type { Product, Category } from '../../types/Product';
import { useCartStore } from '../../store/CartStore';
import { useProductsWorker } from '../../hooks/useProductsWorker';

const ProductGrid = lazy(() => import('../../components/product/ProductGrid/ProductGrid'));
const CategoryNav = lazy(() => import('../../components/product/CategoryNav/CategoryNav'));

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [searchParams] = useSearchParams();

  // API State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const itemsPerPage = 100;

  // Capturar parâmetros da URL
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    if (search) {
      setSearchTerm(search);
    }

    if (category && category !== 'all') {
      setActiveCategory(category);
    } else if (category === 'all') {
      setActiveCategory('all');
    }
  }, [searchParams]);

  // Fetch products and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [productsData, categoriesData] = await Promise.all([
          // Buscar todos os produtos - filtro será feito no frontend para melhor precisão
          productsService.getProducts(),
          productsService.getCategories(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
        setError(errorMessage);
        console.error('Erro ao buscar dados:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const { paginatedProducts, totalPages, totalProducts, isProcessing, filterProducts } =
    useProductsWorker();

  useEffect(() => {
    if (products.length > 0) {
      filterProducts({
        products,
        category: activeCategory,
        searchTerm,
        sortBy,
        currentPage,
        itemsPerPage,
      });
    }
  }, [products, activeCategory, searchTerm, sortBy, currentPage, itemsPerPage, filterProducts]);

  const handleCategoryChange = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    setCurrentPage(1); // Reset para primeira página ao mudar categoria
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    setCurrentPage(1); // Reset para primeira página ao mudar ordenação
  };

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      addToCart(product);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-cinza-50 min-h-screen py-8">
      <Container>
        {/* Page Header */}
        <div className="mb-8">
          <Typography as="h1" variant="heading" weight="bold" className="mb-2">
            {searchTerm ? `Resultados para "${searchTerm}"` : 'Produtos'}
          </Typography>
          <Typography variant="body" color="text-grafite-600">
            {searchTerm
              ? `Mostrando produtos relacionados à sua busca`
              : 'Encontre os melhores produtos com os melhores preços'}
          </Typography>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <Typography variant="body" color="text-red-800">
              Erro ao carregar produtos: {error}
            </Typography>
          </div>
        )}

        {/* Loading State */}
        {isLoading || isProcessing ? (
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col items-center gap-4">
              <Spinner size="lg" color="primary" />
              <Typography variant="body" color="text-grafite-600">
                {isProcessing ? 'Processando produtos...' : 'Carregando produtos...'}
              </Typography>
            </div>
          </div>
        ) : (
          <>
            {/* Category Navigation */}
            <Suspense
              fallback={<div className="mb-8 h-12 bg-cinza-100 rounded-lg animate-pulse" />}
            >
              <CategoryNav
                categories={categories}
                activeCategory={activeCategory}
                onCategoryClick={handleCategoryChange}
              />
            </Suspense>

            {/* Filters and Sort Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-white rounded-lg border border-cinza-200">
              {/* Results count */}
              <Typography variant="body" color="text-grafite-700">
                <span className="font-semibold">{totalProducts}</span>{' '}
                {totalProducts === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </Typography>

              {/* Sort dropdown */}
              <div className="flex items-center gap-2">
                <Typography variant="body" color="text-grafite-700" className="whitespace-nowrap">
                  Ordenar por:
                </Typography>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2 border border-cinza-300 rounded-lg bg-white text-grafite-900 focus:outline-none focus:ring-2 focus:ring-magenta-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="relevance">Mais relevantes</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                  <option value="rating">Melhor avaliação</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {totalProducts === 0 && !isProcessing && !isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="text-center max-w-md">
                  <div className="mb-6">
                    <svg
                      className="w-24 h-24 mx-auto text-grafite-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <Typography variant="title" weight="bold" className="mb-2">
                    {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto disponível'}
                  </Typography>
                  <Typography variant="body" color="text-grafite-600" className="mb-6">
                    {searchTerm
                      ? `Não encontramos produtos para "${searchTerm}". Tente buscar por outros termos.`
                      : 'Não há produtos disponíveis nesta categoria no momento.'}
                  </Typography>
                  {searchTerm && (
                    <Button variant="primary" onClick={() => navigate('/products')}>
                      Ver todos os produtos
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              /* Products Grid */
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse" />
                    ))}
                  </div>
                }
              >
                <ProductGrid
                  products={paginatedProducts}
                  loading={isLoading || isProcessing}
                  onProductClick={handleProductClick}
                  onAddToCart={handleAddToCart}
                />
              </Suspense>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg border border-cinza-200">
                {/* Page info */}
                <Typography variant="body" color="text-grafite-700">
                  Página <span className="font-semibold">{currentPage}</span> de{' '}
                  <span className="font-semibold">{totalPages}</span>
                </Typography>

                {/* Pagination controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>

                  {/* Page numbers */}
                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Mostrar apenas algumas páginas ao redor da página atual
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => {
                              setCurrentPage(page);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              page === currentPage
                                ? 'bg-magenta-500 text-white'
                                : 'bg-cinza-100 text-grafite-700 hover:bg-cinza-200'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      // Mostrar "..." entre grupos de páginas
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <span key={page} className="px-2 text-grafite-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Products;
