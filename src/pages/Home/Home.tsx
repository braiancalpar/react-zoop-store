/**
 * Home Page
 *
 * Página inicial com categorias, mais vendidos, ofertas e depoimentos.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Typography from '../../components/common/Typography';
import Badge from '../../components/common/Badge';
import ProductGrid from '../../components/product/ProductGrid';
import ProductCard from '../../components/product/ProductCard';
import CategoryCard from '../../components/product/CategoryCard';
import TestimonialCard from '../../components/common/TestimonialCard';
import Spinner from '../../components/common/Spinner';
import { productsService } from '../../services/productsService';
import { useCart } from '../../contexts/CartContext';
import type { Product, Category } from '../../types/Product';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

interface Testimonial {
  rating: number;
  comment: string;
  reviewerName: string;
  productTitle?: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const useScroll = useHorizontalScroll({ scrollAmount: 400 });

  // API State
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loadingBestSellers, setLoadingBestSellers] = useState(true);

  const [dealsProducts, setDealsProducts] = useState<Product[]>([]);
  const [loadingDeals, setLoadingDeals] = useState(true);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [categoriesData, bestSellersData, dealsData, reviewsData] = await Promise.all([
          productsService.getCategories(),
          productsService.getProducts({ limit: 12, sortBy: 'rating', order: 'desc' }),
          productsService.getProducts({ limit: 20, sortBy: 'price', order: 'desc' }),
          productsService.getProducts({ limit: 10, sortBy: 'rating', order: 'desc' }),
        ]);

        setCategories(categoriesData);
        setBestSellers(bestSellersData);

        // Processar deals - filtrar produtos com desconto e ordenar
        const filteredDeals = dealsData
          .filter((p) => p.discountPercentage && p.discountPercentage > 0)
          .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
          .slice(0, 8);
        setDealsProducts(filteredDeals);

        // Processar testimonials - extrair reviews dos produtos
        const allTestimonials = reviewsData
          .flatMap((product) =>
            (product.reviews || []).map((review) => ({
              ...review,
              productTitle: product.title,
            }))
          )
          .filter((review) => review.rating >= 4)
          .slice(0, 6);
        setTestimonials(allTestimonials);
      } catch (error) {
        console.error('Erro ao buscar dados da Home:', error);
      } finally {
        setLoadingCategories(false);
        setLoadingBestSellers(false);
        setLoadingDeals(false);
        setLoadingTestimonials(false);
      }
    };

    fetchHomeData();
  }, []);

  // Computed Values
  const topDeals = useMemo(() => {
    return dealsProducts
      .filter((p) => p.discountPercentage && p.discountPercentage > 0)
      .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
      .slice(0, 8);
  }, [dealsProducts]);

  const maxDiscount = useMemo(() => {
    return topDeals.length > 0
      ? Math.round(Math.max(...topDeals.map((d) => d.discountPercentage || 0)))
      : 0;
  }, [topDeals]);

  // Event Handlers
  const handleAddToCart = useCallback(
    (productId: number) => {
      const product = [...bestSellers, ...topDeals].find((p) => p.id === productId);
      if (product) {
        addToCart(product, 1);
      }
    },
    [bestSellers, topDeals, addToCart]
  );

  const handleProductClick = useCallback(
    (productId: number) => {
      navigate(`/product/${productId}`);
    },
    [navigate]
  );

  const handleCategoryClick = useCallback(
    (categorySlug: string) => {
      navigate(`/products?category=${categorySlug}`);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen">
      {/* 1. Categories Section */}
      <section className="py-12 bg-linear-to-b from-cinza-50 to-white">
        <Container>
          <Typography variant="heading" weight="bold" className="mb-6 text-center">
            Explore por Categoria
          </Typography>

          {loadingCategories ? (
            <div className="flex justify-center py-8">
              <Spinner size="md" color="primary" />
            </div>
          ) : (
            <div className="relative px-12">
              {/* Left Navigation Button */}
              {useScroll.canScrollLeft && (
                <button
                  onClick={() => useScroll.scroll('left')}
                  className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-magenta-50 hover:shadow-2xl transition-all border border-cinza-200"
                  aria-label="Scroll left"
                >
                  <svg
                    className="w-5 h-5 text-magenta-600"
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
                className="overflow-x-auto scrollbar-hide"
              >
                <div className="flex gap-4 pb-4 px-4">
                  {categories.map((category) => (
                    <CategoryCard
                      key={category.slug}
                      category={category}
                      onClick={handleCategoryClick}
                    />
                  ))}
                </div>
              </div>

              {/* Right Navigation Button */}
              {useScroll.canScrollRight && (
                <button
                  onClick={() => useScroll.scroll('right')}
                  className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-magenta-50 hover:shadow-2xl transition-all border border-cinza-200"
                  aria-label="Scroll right"
                >
                  <svg
                    className="w-5 h-5 text-magenta-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* 2. Best Sellers Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="mb-8">
            <Typography variant="heading" weight="bold" className="mb-2">
              Mais Vendidos
            </Typography>
            <Typography variant="body" color="text-grafite-600">
              Os produtos mais amados pelos nossos clientes
            </Typography>
          </div>

          <ProductGrid
            products={bestSellers}
            loading={loadingBestSellers}
            skeletonCount={12}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
          />
        </Container>
      </section>

      {/* 3. Deals Section */}
      {topDeals.length > 0 && (
        <section className="py-16 bg-linear-to-r from-magenta-50 to-azul-50">
          <Container>
            <div className="mb-8">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
                <Typography variant="heading" weight="bold">
                  Ofertas Imperdíveis
                </Typography>
                {maxDiscount > 0 && (
                  <Badge variant="error" className="text-sm px-3 py-1">
                    Até {maxDiscount}% OFF
                  </Badge>
                )}
              </div>
              <Typography variant="body" color="text-grafite-600">
                Produtos com os maiores descontos
              </Typography>
            </div>

            {loadingDeals ? (
              <div className="flex justify-center py-8">
                <Spinner size="md" color="primary" />
              </div>
            ) : (
              <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div className="flex gap-6 pb-4">
                  {topDeals.map((product) => (
                    <div key={product.id} className="flex-none w-72">
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                        onClick={handleProductClick}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* 4. Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-white">
          <Container>
            <div className="text-center mb-12">
              <Typography variant="heading" weight="bold" className="mb-2">
                O que nossos clientes dizem
              </Typography>
              <Typography variant="body" color="text-grafite-600">
                Avaliações reais de quem já comprou
              </Typography>
            </div>

            {loadingTestimonials ? (
              <div className="flex justify-center py-8">
                <Spinner size="md" color="primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} />
                ))}
              </div>
            )}
          </Container>
        </section>
      )}
    </div>
  );
};

export default Home;
