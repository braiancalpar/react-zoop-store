import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement | null>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false } = options;

  const ref = useRef<HTMLElement>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const frozen = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsIntersecting(true);
      return;
    }

    if (frozen.current) return;

    const observerCallback: IntersectionObserverCallback = ([entry]) => {
      const isElementIntersecting = entry.isIntersecting;

      setEntry(entry);
      setIsIntersecting(isElementIntersecting);

      if (isElementIntersecting && freezeOnceVisible) {
        frozen.current = true;
      }
    };

    const observerOptions: IntersectionObserverInit = {
      threshold,
      root,
      rootMargin,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return { ref, isIntersecting, entry };
}
