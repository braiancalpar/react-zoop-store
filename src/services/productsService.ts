import { api } from './api';
import type { Product, Category } from '../types/Product';

export interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: 'price' | 'rating' | 'title';
  order?: 'asc' | 'desc';
  search?: string;
}

export interface GetProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export const productsService = {
  async getProducts(params?: GetProductsParams): Promise<Product[]> {
    const queryParams: Record<string, string | number> = {};

    if (params?.page) {
      queryParams._page = params.page;
    }

    if (params?.limit) {
      queryParams._limit = params.limit;
    }

    if (params?.category) {
      queryParams.category = params.category;
    }

    if (params?.sortBy) {
      queryParams._sort = params.sortBy;
    }

    if (params?.order) {
      queryParams._order = params.order;
    }

    if (params?.search) {
      queryParams.q = params.search;
    }

    return api.get<Product[]>('/products', queryParams);
  },

  async getProductById(id: number): Promise<Product> {
    return api.get<Product>(`/products/${id}`);
  },

  async getCategories(): Promise<Category[]> {
    return api.get<Category[]>('/categories');
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    return api.get<Product[]>('/products', { category });
  },
};
