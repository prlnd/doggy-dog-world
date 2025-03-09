import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useFetchBreeds } from '@/lib/hooks';
import { searchParamsSchema } from '@/lib/params-schemas';
import { useLocalSearchParams } from 'expo-router';
import BreedTablePagination from '@/components/BreedTablePagination';
import { searchBreedsLocally, transformBreeds } from '@/lib/utils';
import BreedTableTitle from '@/components/BreedTableTitle';
import FilterChipGroup from '@/components/FilterChipGroup';
import SkeletonRow from '@/components/SkeletonRow';
import SkeletonChips from '@/components/SkeletonChips';
import BreedTableRow from '@/components/BreedTableRow';
import ErrorView from '@/components/ErrorView';
import NetworkErrorSnackbar from '@/components/NetworkErrorSnackbar';
import CachedDataBanner from '@/components/CachedDataBanner';

export default function Index() {
  const params = searchParamsSchema.parse(useLocalSearchParams());
  const { data, isLoading, isFetching, error, refetch } = useFetchBreeds(params);
  const transformedBreeds = transformBreeds(data?.breeds || [], params);
  const breeds = data?.isLocal
    ? searchBreedsLocally(transformedBreeds, params.q)
    : transformedBreeds;

  const isLoadingOrFetching = isLoading || isFetching;

  if (error) return <ErrorView message={error.message} onRetry={refetch} />;

  return (
    <>
      <CachedDataBanner visible={!isLoadingOrFetching && data?.isLocal === true} />

      <ScrollView>
        {isLoadingOrFetching ? <SkeletonChips /> : data && <FilterChipGroup breeds={data.breeds} />}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Image</DataTable.Title>
            <BreedTableTitle title="Name" />
            <BreedTableTitle title="Size" numeric />
          </DataTable.Header>
          {isLoadingOrFetching
            ? Array.from({ length: params.limit }, (_, index) => <SkeletonRow key={index} />)
            : breeds.map((breed) => <BreedTableRow key={breed.id} breed={breed} />)}
          {data?.pagination && <BreedTablePagination {...data.pagination} />}
        </DataTable>
      </ScrollView>

      {data?.networkError && (
        <NetworkErrorSnackbar
          networkError={data.networkError}
          visible={!isLoadingOrFetching && data?.isLocal === true}
        />
      )}
    </>
  );
}
