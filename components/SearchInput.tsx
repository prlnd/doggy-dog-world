import { useGlobalSearchParams } from 'expo-router';
import { pageQueryParamsSchema } from '@/lib/schemas';
import { useRouter } from 'expo-router';
import { Searchbar } from 'react-native-paper';
import { useSearchFilter } from '@/lib/hooks';
import { useCallback } from 'react';

export default function SearchInput(props: { placeholder?: string }) {
  const router = useRouter();
  const { q } = pageQueryParamsSchema.parse(useGlobalSearchParams());

  const updateParams = useCallback(
    (query: string) => {
      router.setParams({ q: query });
    },
    [router]
  );

  const [searchQuery, onChangeSearch] = useSearchFilter(updateParams, 300, q);

  return <Searchbar {...props} value={searchQuery} onChangeText={onChangeSearch} />;
}
