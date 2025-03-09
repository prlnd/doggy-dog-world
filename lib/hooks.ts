import { useQuery } from '@tanstack/react-query';
import { getBreeds } from './api';
import type { PageQueryParams } from './schemas';

export function useFetchBreeds({ page, limit, q }: PageQueryParams) {
  return useQuery({
    queryKey: ['breeds', page, limit, q],
    queryFn: () => getBreeds({ page, limit, q }),
  });
}
