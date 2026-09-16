import * as Comlink from 'comlink';
import type { Product } from '../types/Product';

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

interface FilterParams {
  products: Product[];
  category?: string;
  searchTerm?: string;
  sortBy: SortOption;
  page: number;
  itemsPerPage: number;
}

interface FilterResult {
  paginatedProducts: Product[];
  totalPages: number;
  totalProducts: number;
  processingTime: number;
}

const productsWorkerApi = {
  async filterAndSort(params: FilterParams): Promise<FilterResult> {
    const startTime = performance.now();

    // Passo 1: Filtrar por categoria
    let filtered = params.products;

    if (params.category && params.category !== 'all') {
      filtered = filtered.filter((p) => p.category === params.category);
    }

    // Passo 2: Filtrar por termo de busca
    if (params.searchTerm) {
      const searchLower = params.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.brand?.toLowerCase().includes(searchLower) ||
          p.category?.toLowerCase().includes(searchLower)
      );
    }

    // Passo 3: Ordenar produtos
    const sorted = sortProducts([...filtered], params.sortBy);

    // Passo 4: Paginar produtos
    const startIndex = (params.page - 1) * params.itemsPerPage;
    const endIndex = startIndex + params.itemsPerPage;
    const paginated = sorted.slice(startIndex, endIndex);

    const totalPages = Math.ceil(sorted.length / params.itemsPerPage);
    const processingTime = performance.now() - startTime;

    return {
      paginatedProducts: paginated,
      totalPages,
      totalProducts: sorted.length,
      processingTime,
    };
  },
};

function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  switch (sortBy) {
    case 'price-asc':
      return products.sort((a, b) => calculateFinalPrice(a) - calculateFinalPrice(b));
    case 'price-desc':
      return products.sort((a, b) => calculateFinalPrice(b) - calculateFinalPrice(a));
    case 'rating':
      return products.sort((a, b) => b.rating - a.rating);
    case 'relevance':
    default:
      return products;
  }
}

function calculateFinalPrice(product: Product): number {
  return product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;
}

Comlink.expose(productsWorkerApi);
export type ProductsWorkerApi = typeof productsWorkerApi;
