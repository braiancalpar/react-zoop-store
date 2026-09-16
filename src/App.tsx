import { Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider, useCart } from './contexts/CartContextAdapter';
import MainLayout from './components/layout/MainLayout';
import { lazy, Suspense } from 'react';
// import PageLoader from './components/common/PageLoader';
import PageSkeleton from './components/common/PageSkeleton';

const Home = lazy(() => import('./pages/Home/Home'));
const Products = lazy(() => import('./pages/Products/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const ComponentShowcase = lazy(() => import('./pages/ComponentShowcase/ComponentShowcase'));

function AppContent() {
  const navigate = useNavigate();
  const { itemCount } = useCart();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <MainLayout cartItemCount={itemCount} onSearch={handleSearch} onCartClick={handleCartClick}>
      {/* <Suspense fallback={<PageLoader />}> */}
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/components" element={<ComponentShowcase />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
