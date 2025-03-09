import { useQuery } from '@tanstack/react-query';
import { getBreeds, getImage } from './api';
import { useCallback, useRef, useState, useEffect } from 'react';
import type { PageQueryParams } from '@/schemas/params';
import { Animated, Easing } from 'react-native';

function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
  const debounceTimeout = useRef<NodeJS.Timeout>();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, []);

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

export function useSkeletonOpacity() {
  const [opacity] = useState(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return opacity;
}
