/**
 * ProductDetail Page
 *
 * Página de detalhes do produto com galeria de imagens,
 * informações completas e opções de compra.
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import Rating from '../../components/common/Rating';
import Badge from '../../components/common/Badge';
import ProductPrice from '../../components/product/ProductPrice';
import QuantitySelector from '../../components/common/QuantitySelector';
import { useCart } from '../../contexts/CartContext';
import { useProduct } from '../../hooks/useProduct';

const ImageGallery = lazy(() => import('../../components/product/ImageGallery/ImageGallery'));

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const { product, loading, error } = useProduct(id);
  const [addedToCart, setAddedToCart] = useState(false);

  // Reset addedToCart message after 3 seconds
  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => setAddedToCart(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  // Loading state
  if (loading) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-magenta-200 border-t-magenta-600"></div>
          </div>
          <Typography variant="body" color="text-grafite-600" className="mt-4">
            Carregando produto...
          </Typography>
        </div>
      </Container>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <Typography variant="heading" weight="bold" className="mb-2">
            Produto não encontrado
          </Typography>
          <Typography variant="body" color="text-grafite-600" className="mb-6">
            {error || 'Desculpe, o produto que você está procurando não existe.'}
          </Typography>
          <Button onClick={() => navigate('/')}>Voltar para Home</Button>
        </div>
      </Container>
    );
  }

  // Múltiplas imagens (usando a mesma thumbnail repetida ou várias imagens da API)
  const productImages = [product.thumbnail, product.thumbnail, product.thumbnail];

  // Verificar estoque
  const inStock = (product.stock ?? 0) > 0;
  const lowStock = (product.stock ?? 0) < 5;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    console.log(`${quantity}x ${product.title} adicionado ao carrinho`);
  };

  return (
    <div className="bg-cinza-50 min-h-screen py-8">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <button
                onClick={() => navigate('/')}
                className="text-grafite-600 hover:text-magenta-600 transition-colors"
              >
                Home
              </button>
            </li>
            <li className="text-grafite-400">/</li>
            <li>
              <button
                onClick={() => navigate('/products')}
                className="text-grafite-600 hover:text-magenta-600 transition-colors"
              >
                Produtos
              </button>
            </li>
            <li className="text-grafite-400">/</li>
            <li className="text-grafite-900 font-medium truncate max-w-xs">{product.title}</li>
          </ol>
        </nav>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <Suspense
            fallback={
              <div className="aspect-square w-full bg-cinza-100 rounded-xl animate-pulse flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-cinza-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            }
          >
            <ImageGallery images={productImages} alt={product.title} />
          </Suspense>

          {/* Right Column - Product Info */}
          <div>
            {/* Brand */}
            {product.brand && (
              <Typography
                variant="caption"
                color="text-magenta-600"
                className="uppercase font-bold mb-2"
              >
                {product.brand}
              </Typography>
            )}

            {/* Title */}
            <Typography as="h1" variant="heading" weight="bold" className="mb-4">
              {product.title}
            </Typography>

            {/* Rating */}
            <div className="mb-6">
              <Rating rating={product.rating} totalReviews={127} size="lg" />
            </div>

            {/* Price */}
            <div className="mb-6 p-6 bg-white rounded-xl border border-cinza-200">
              <ProductPrice
                price={product.price}
                discountPercentage={product.discountPercentage}
                size="lg"
                showBadge
              />
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {inStock ? (
                <div className="flex items-center gap-2">
                  <Badge variant="success">Em estoque</Badge>
                  {lowStock && (
                    <Typography variant="caption" color="text-orange-600">
                      Últimas unidades!
                    </Typography>
                  )}
                </div>
              ) : (
                <Badge variant="error">Fora de estoque</Badge>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-8 p-6 bg-white rounded-xl border border-cinza-200">
              <Typography variant="body" weight="semibold" className="mb-3">
                Quantidade
              </Typography>

              <div className="flex items-center gap-4 mb-4">
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={product.stock ?? 99}
                  disabled={!inStock}
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={!inStock}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                }
              >
                {inStock ? 'Adicionar ao carrinho' : 'Produto indisponível'}
              </Button>

              {/* Success message after adding to cart */}
              {addedToCart && (
                <div className="mt-4 p-3 bg-verde-50 border border-verde-200 rounded-lg">
                  <Typography
                    variant="body"
                    color="text-verde-700"
                    weight="semibold"
                    className="text-center"
                  >
                    {quantity}x {product.title} adicionado ao carrinho!
                  </Typography>
                </div>
              )}
            </div>

            {/* Product Description */}
            <div className="mb-8">
              <Typography variant="title" weight="semibold" className="mb-3">
                Descrição do produto
              </Typography>
              <Typography variant="body" color="text-grafite-700" className="leading-relaxed">
                {/* Mock description */}
                Este é um produto de alta qualidade da marca {product.brand || 'premium'}. Ideal
                para quem busca excelência e durabilidade. Possui características únicas que o
                tornam perfeito para o seu dia a dia.
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <>
                    {' '}
                    Aproveite o desconto especial de {product.discountPercentage}% por tempo
                    limitado!
                  </>
                )}
              </Typography>
            </div>

            {/* Features */}
            <div>
              <Typography variant="title" weight="semibold" className="mb-3">
                Características
              </Typography>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-verde-600 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Typography variant="body" color="text-grafite-700">
                    Produto original e com garantia
                  </Typography>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-verde-600 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Typography variant="body" color="text-grafite-700">
                    Frete grátis para todo o Brasil
                  </Typography>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-verde-600 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Typography variant="body" color="text-grafite-700">
                    Envio em até 24 horas úteis
                  </Typography>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
