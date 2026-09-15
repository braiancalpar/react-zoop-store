import { useRef, useState, useCallback, useEffect } from 'react';

export interface UseHorizontalScrollOptions {
  scrollAmount?: number;
  threshold?: number;
}

export function useHorizontalScroll(options?: UseHorizontalScrollOptions) {
  const { scrollAmount = 400, threshold = 10 } = options || {};

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - threshold);
  }, [threshold]);

  useEffect(() => {
    updateScrollButtons();

    const handleResize = () => updateScrollButtons();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [updateScrollButtons]);

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      if (!scrollRef.current) return;

      const newScrollLeft =
        scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    },
    [scrollAmount]
  );

  return { scrollRef, canScrollLeft, canScrollRight, scroll, updateScrollButtons };
}
