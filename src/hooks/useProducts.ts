import { useState, useEffect, useCallback } from 'react';
import { productsService } from '../services/productsService';
import type { Product } from '../types/Product';

export interface UseProductsOptions {
  limit?: number;
  sortBy?: 'price' | 'rating' | 'title';
  order?: 'asc' | 'desc';
  category?: string;
  search?: string;
}

export function useProducts(options?: UseProductsOptions) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsService.getProducts(options);

        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erro desconhecido');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return { products, loading, error, refetch };
}
