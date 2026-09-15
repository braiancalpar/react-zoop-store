import { useState, useEffect } from 'react';
import { productsService } from '../services/productsService';
import type { Product } from '../types/Product';

export function useProduct(id: number | string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productId = Number(id);

        if (isNaN(productId)) {
          throw new Error('ID do produto inválido');
        }

        const data = await productsService.getProductById(productId);

        if (!cancelled) {
          setProduct(data);
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

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, loading, error };
}
