import { useQuery } from '@tanstack/react-query';
import { getBreeds, getImage } from './api';
import { type PageQueryParams } from './schemas';
import { useCallback, useRef, useState, useEffect } from 'react';

function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
  const debounceTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [callback, delay]);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
}

export function useSearchFilter(
  onChange: (query: string) => void,
  debounceDelay: number,
  defaultQuery: string
) {
  const [searchQuery, setSearchQuery] = useState(defaultQuery);
  const debouncedUpdateParams = useDebounce(onChange, debounceDelay);

  const onChangeSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      debouncedUpdateParams(query);
    },
    [debouncedUpdateParams]
  );

  return [searchQuery, onChangeSearch] as const;
}

export function useFetchBreeds({ page, limit, q }: PageQueryParams) {
  return useQuery({
    queryKey: ['breeds', page, limit, q],
    queryFn: () => getBreeds({ page, limit, q }),
  });
}

export function useFetchImage(imageId?: string) {
  return useQuery({
    queryKey: ['image', imageId],
    queryFn: () => (imageId ? getImage(imageId) : null),
    enabled: !!imageId,
  });
}
