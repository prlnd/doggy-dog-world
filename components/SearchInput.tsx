import { useGlobalSearchParams } from 'expo-router';
import { pageQueryParamsSchema } from '@/schemas/params';
import { router } from 'expo-router';
import { Searchbar } from 'react-native-paper';
import { useSearchFilter } from '@/lib/hooks';
import { useCallback, useEffect, useRef } from 'react';
import { TextInput } from 'react-native';

type SearchInputProps = {
  placeholder?: string;
};

export default function SearchInput(props: SearchInputProps) {
  const inputRef = useRef<TextInput>(null);
  const { q } = pageQueryParamsSchema.parse(useGlobalSearchParams());

  const updateParams = useCallback((query: string) => {
    router.setParams({ q: query });
  }, []);

  const [searchQuery, onChangeSearch] = useSearchFilter(updateParams, 300, q);

  // Focus the search input when the component mounts
  useEffect(() => {
    const id = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(id);
  }, []);

  return <Searchbar {...props} value={searchQuery} onChangeText={onChangeSearch} ref={inputRef} />;
}
