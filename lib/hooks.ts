import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBreeds, getImage } from './api';
import { useCallback, useRef, useState, useEffect, useContext } from 'react';
import type { PageQueryParams } from '@/lib/params-schemas';
import { Animated, Easing } from 'react-native';
import { getLocalBreeds, setLocalBreeds } from './storage';
import { ThemeContext } from '@/components/ThemeProvider';

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
    // Preserve previous state when fetching new data
    placeholderData: (prev) => prev,
    queryKey: ['breeds', page, limit, q],
    queryFn: async () => {
      try {
        const data = await getBreeds({ page, limit, q });
        if (data.breeds.length) {
          await setLocalBreeds(data.breeds);
        }
        return {
          ...data,
          isLocal: false,
          networkError: undefined,
        };
      } catch (error) {
        const breeds = await getLocalBreeds();
        if (!breeds) throw error;
        return {
          breeds,
          pagination: undefined,
          isLocal: true,
          networkError: error,
        };
      }
    },
  });
}

export function useBreedInvalidation({ page, limit, q }: PageQueryParams) {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ['breeds', page, limit, q],
    });
}

export function useFetchImage(imageId: string) {
  return useQuery({
    queryKey: ['image', imageId],
    queryFn: () => getImage(imageId),
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

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};
