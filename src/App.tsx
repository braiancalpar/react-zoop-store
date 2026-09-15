import { Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider, useCart } from './contexts/CartContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home/Home';
import ComponentShowcase from './pages/ComponentShowcase';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/components" element={<ComponentShowcase />} />
      </Routes>
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
