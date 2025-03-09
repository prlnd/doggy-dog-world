import { ScrollView } from 'react-native';
import { ActivityIndicator, DataTable, Text } from 'react-native-paper';
import { useFetchBreeds } from '@/lib/hooks';
import { searchParamsSchema } from '@/lib/schemas';
import { useLocalSearchParams } from 'expo-router';
import DataTablePagination from '@/components/DataTablePagination';
import { transformBreeds } from '@/lib/utils';
import DataTableTitle from '@/components/DataTableTitle';
import FilterChips from '@/components/FilterChips';

export default function Index() {
  const params = searchParamsSchema.parse(useLocalSearchParams());
  const { data, isLoading, error } = useFetchBreeds(params);
  const breeds = transformBreeds(data?.breeds || [], params);

  if (isLoading) return <ActivityIndicator animating={true} />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data) return <Text>Data is undefined</Text>;

  return (
    <ScrollView>
      {data && <FilterChips breeds={data.breeds} />}
      <DataTable>
        <DataTable.Header>
          <DataTableTitle title="Name" />
          <DataTableTitle title="Size" />
        </DataTable.Header>
        {breeds.map((breed) => (
          <DataTable.Row key={breed.id}>
            <DataTable.Cell style={{ justifyContent: 'center' }}>{breed.name}</DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
              {breed.height.metric}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        {data.pagination && <DataTablePagination {...data.pagination} />}
      </DataTable>
    </ScrollView>
  );
}
