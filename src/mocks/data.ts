/**
 * Mock Data
 * Dados mockados para desenvolvimento
 */

export interface Product {
  id: number;
  title: string;
  brand?: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  thumbnail: string;
  stock?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Eletrônicos', slug: 'electronics' },
  { id: 2, name: 'Smartphones', slug: 'smartphones' },
  { id: 3, name: 'Notebooks', slug: 'laptops' },
  { id: 4, name: 'Áudio', slug: 'audio' },
  { id: 5, name: 'Casa', slug: 'home' },
  { id: 6, name: 'Moda', slug: 'fashion' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Notebook Samsung Book Intel Core i5 8GB 256GB SSD Full HD',
    brand: 'Samsung',
    price: 2800.0,
    discountPercentage: 15,
    rating: 4.5,
    thumbnail: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    stock: 12,
  },
  {
    id: 2,
    title: 'iPhone 15 Pro Max 256GB 6.7" 5G iOS 17',
    brand: 'Apple',
    price: 8999.0,
    discountPercentage: 10,
    rating: 5.0,
    thumbnail: 'https://images.unsplash.com/photo-1592286927505-86b3c8c0aef9?w=400&h=400&fit=crop',
    stock: 8,
  },
  {
    id: 3,
    title: 'Headphone Sony WH-1000XM5 Bluetooth com Cancelamento de Ruído',
    brand: 'Sony',
    price: 1899.0,
    discountPercentage: 20,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop',
    stock: 25,
  },
  {
    id: 4,
    title: 'Smart TV Samsung 55" 4K UHD QLED',
    brand: 'Samsung',
    price: 3299.0,
    discountPercentage: 0,
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    stock: 5,
  },
  {
    id: 5,
    title: 'Console PlayStation 5 825GB SSD com 2 Controles',
    brand: 'Sony',
    price: 4199.0,
    discountPercentage: 5,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop',
    stock: 3,
  },
  {
    id: 6,
    title: 'Teclado Mecânico Logitech MX Keys com Retroiluminação',
    brand: 'Logitech',
    price: 699.0,
    discountPercentage: 12,
    rating: 4.4,
    thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    stock: 18,
  },
  {
    id: 7,
    title: 'Mouse Gamer Razer DeathAdder V3 Pro Wireless 30K DPI',
    brand: 'Razer',
    price: 899.0,
    discountPercentage: 18,
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    stock: 0,
  },
  {
    id: 8,
    title: 'Smartwatch Apple Watch Series 9 GPS 45mm',
    brand: 'Apple',
    price: 4299.0,
    discountPercentage: 8,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
    stock: 14,
  },
];
