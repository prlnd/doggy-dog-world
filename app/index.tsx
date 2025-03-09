import { ScrollView } from 'react-native';
import { Banner, DataTable, Text } from 'react-native-paper';
import { useFetchBreeds, useBreedInvalidation } from '@/lib/hooks';
import { searchParamsSchema } from '@/schemas/params';
import { useLocalSearchParams } from 'expo-router';
import BreedTablePagination from '@/components/BreedTablePagination';
import { searchBreedsLocally, transformBreeds } from '@/lib/utils';
import BreedTableTitle from '@/components/BreedTableTitle';
import FilterChips from '@/components/FilterChips';
import SkeletonRow from '@/components/SkeletonRow';
import SkeletonChips from '@/components/SkeletonChips';
import BreedTableRow from '@/components/BreedTableRow';
import { clearLocalBreeds } from '@/lib/storage';

export default function Index() {
  const params = searchParamsSchema.parse(useLocalSearchParams());
  const { data, isLoading, isFetching, error } = useFetchBreeds(params);
  const invalidateCache = useBreedInvalidation(params);
  const transformedBreeds = transformBreeds(data?.breeds || [], params);
  const breeds = data?.isLocal
    ? searchBreedsLocally(transformedBreeds, params.q)
    : transformedBreeds;

  if (error) return <Text>Error: {error.message}</Text>;

  const isLoadingOrFetching = isLoading || isFetching;

  return (
    <>
      <Banner
        visible={!isLoadingOrFetching && data?.isLocal === true}
        actions={[
          {
            label: 'Remove cache',
            onPress: () => {
              clearLocalBreeds();
              invalidateCache();
            },
          },
          {
            label: 'Retry',
            onPress: invalidateCache,
          },
        ]}>
        You're viewing cached data. Please check your internet connection.
      </Banner>
      <ScrollView>
        {isLoadingOrFetching ? <SkeletonChips /> : data && <FilterChips breeds={data.breeds} />}
        <DataTable>
          <DataTable.Header>
            <BreedTableTitle title="Name" />
            <BreedTableTitle title="Size" />
          </DataTable.Header>
          {isLoadingOrFetching
            ? Array.from({ length: 20 }, (_, index) => <SkeletonRow key={index} />)
            : breeds.map((breed) => <BreedTableRow key={breed.id} breed={breed} />)}
          {data?.pagination && <BreedTablePagination {...data.pagination} />}
        </DataTable>
      </ScrollView>
    </>
  );
}
