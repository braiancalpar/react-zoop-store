export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags?: string[];
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: ProductReview[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product?: Product;
}

export interface CartItemData {
  id: number;
  title: string;
  brand?: string;
  price: number;
  discountPercentage?: number;
  thumbnail: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItemData[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: CustomerInfo;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  createdAt: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentMethod {
  type: 'credit_card' | 'debit_card' | 'pix' | 'boleto';
  installments?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
