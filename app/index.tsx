import { ScrollView } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { useFetchBreeds } from '@/lib/hooks';
import { searchParamsSchema } from '@/schemas/params';
import { useLocalSearchParams } from 'expo-router';
import BreedTablePagination from '@/components/BreedTablePagination';
import { transformBreeds } from '@/lib/utils';
import BreedTableTitle from '@/components/BreedTableTitle';
import FilterChips from '@/components/FilterChips';
import SkeletonRow from '@/components/SkeletonRow';
import SkeletonChips from '@/components/SkeletonChips';
import BreedTableRow from '@/components/BreedTableRow';

export default function Index() {
  const params = searchParamsSchema.parse(useLocalSearchParams());
  const { data, isLoading, error } = useFetchBreeds(params);
  const breeds = transformBreeds(data?.breeds || [], params);

  if (error) return <Text>Error: {error.message}</Text>;
  if (!data && !isLoading) return <Text>No breed found</Text>;

  return (
    <ScrollView>
      {isLoading ? <SkeletonChips /> : data && <FilterChips breeds={data.breeds} />}
      <DataTable>
        <DataTable.Header>
          <BreedTableTitle title="Name" />
          <BreedTableTitle title="Size" />
        </DataTable.Header>
        {isLoading
          ? Array.from({ length: 20 }, (_, index) => <SkeletonRow key={index} />)
          : breeds.map((breed) => <BreedTableRow key={breed.id} breed={breed} />)}
        {data?.pagination && <BreedTablePagination {...data.pagination} />}
      </DataTable>
    </ScrollView>
  );
}
