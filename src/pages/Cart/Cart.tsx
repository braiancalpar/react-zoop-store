/**
 * Cart Page
 *
 * Página do carrinho de compras com lista de itens,
 * resumo do pedido e ações de checkout.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import CartItem from '../../components/product/CartItem';
import { useCart } from '../../contexts/CartContextAdapter';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, itemCount, subtotal, discount, total, updateQuantity, removeFromCart } = useCart();

  // Formata preço em BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  // Handlers
  const handleQuantityChange = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleCheckout = () => {
    console.log('Finalizando compra...', { itemCount, subtotal, discount, total });
    alert('Funcionalidade de checkout em desenvolvimento!');
    // TODO: Implementar checkout
  };

  // Empty state
  if (items.length === 0) {
    return (
      <div className="bg-cinza-50 min-h-screen py-12">
        <Container>
          <div className="flex flex-col items-center justify-center py-16">
            {/* Empty cart icon */}
            <div className="mb-6">
              <svg
                className="w-32 h-32 text-cinza-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>

            <Typography variant="heading" weight="bold" className="mb-3" align="center">
              Seu carrinho está vazio
            </Typography>

            <Typography variant="body" color="text-grafite-600" className="mb-8" align="center">
              Adicione produtos ao carrinho para começar suas compras
            </Typography>

            <Button
              variant="primary"
              size="lg"
              onClick={handleContinueShopping}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              }
            >
              Continuar comprando
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Cart with items
  return (
    <div className="bg-cinza-50 min-h-screen py-8">
      <Container>
        {/* Page Header */}
        <div className="mb-8">
          <Typography as="h1" variant="heading" weight="bold" className="mb-2">
            Carrinho de Compras
          </Typography>
          <Typography variant="body" color="text-grafite-600">
            {itemCount} {itemCount === 1 ? 'item' : 'itens'} no carrinho
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}

            {/* Continue Shopping Button - Mobile */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={handleContinueShopping}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                }
              >
                Continuar comprando
              </Button>
            </div>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-cinza-200 p-6 sticky top-4">
              <Typography variant="title" weight="bold" className="mb-6">
                Resumo do Pedido
              </Typography>

              {/* Summary Items */}
              <div className="space-y-4 mb-6">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <Typography variant="body" color="text-grafite-700">
                    Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
                  </Typography>
                  <Typography variant="body" weight="semibold">
                    {formatPrice(subtotal)}
                  </Typography>
                </div>

                {/* Discount */}
                {discount > 0 && (
                  <div className="flex justify-between items-center">
                    <Typography variant="body" color="text-verde-600">
                      Desconto
                    </Typography>
                    <Typography variant="body" weight="semibold" color="text-verde-600">
                      -{formatPrice(discount)}
                    </Typography>
                  </div>
                )}

                {/* Shipping */}
                <div className="flex justify-between items-center">
                  <Typography variant="body" color="text-grafite-700">
                    Frete
                  </Typography>
                  <Typography variant="body" weight="semibold" color="text-verde-600">
                    Grátis
                  </Typography>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-cinza-200 my-4" />

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <Typography variant="title" weight="bold">
                  Total
                </Typography>
                <Typography variant="title" weight="bold" color="text-magenta-600">
                  {formatPrice(total)}
                </Typography>
              </div>

              {/* Checkout Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleCheckout}
                className="mb-4"
                rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                }
              >
                Finalizar compra
              </Button>

              {/* Continue Shopping Button - Desktop */}
              <div className="hidden lg:block">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={handleContinueShopping}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                  }
                >
                  Continuar comprando
                </Button>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-cinza-200">
                <div className="flex items-center gap-2 text-grafite-600">
                  <svg className="w-5 h-5 text-verde-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Typography variant="caption" color="text-grafite-600">
                    Compra 100% segura e protegida
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
