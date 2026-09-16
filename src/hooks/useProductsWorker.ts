import { useEffect, useState, useRef, useCallback } from 'react';
import * as Comlink from 'comlink';
import type { Product } from '../types/Product';
import type { ProductsWorkerApi, SortOption } from '../workers/products.workers';

export function useProductsWorker() {
  const workerRef = useRef<Worker | null>(null);
  const apiRef = useRef<ProductsWorkerApi | null>(null);

  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/products.worker.ts', import.meta.url), {
      type: 'module',
    });

    apiRef.current = Comlink.wrap<ProductsWorkerApi>(workerRef.current);

    return () => {
      apiRef.current?.[Comlink.releaseProxy]();
      workerRef.current?.terminate();
    };
  }, []);

  const filterProducts = useCallback(
    async (params: {
      products: Product[];
      category: string;
      searchTerm: string;
      sortBy: SortOption;
      currentPage: number;
      itemsPerPage: number;
    }) => {
      if (!apiRef.current) return;

      setIsProcessing(true);
      setError(null);

      try {
        // Chamada async direta - Comlink abstrai postMessage!
        const result = await apiRef.current.filterAndSort({
          products: params.products,
          category: params.category,
          searchTerm: params.searchTerm,
          sortBy: params.sortBy,
          page: params.currentPage,
          itemsPerPage: params.itemsPerPage,
        });

        setPaginatedProducts(result.paginatedProducts);
        setTotalPages(result.totalPages);
        setTotalProducts(result.totalProducts);
        setProcessingTime(result.processingTime);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Worker error');
        console.error('Products worker error:', err);
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  return {
    paginatedProducts,
    totalPages,
    totalProducts,
    isProcessing,
    processingTime,
    error,
    filterProducts,
  };
}
