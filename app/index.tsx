import { ScrollView } from 'react-native';
import { ActivityIndicator, DataTable, Text } from 'react-native-paper';
import { useFetchBreeds } from '@/lib/hooks';
import { pageQueryParamsSchema } from '@/lib/schemas';
import { useLocalSearchParams } from 'expo-router';
import DataTablePagination from '@/components/DataTablePagination';

export default function Index() {
  const params = pageQueryParamsSchema.parse(useLocalSearchParams());
  const { data, isLoading, error } = useFetchBreeds(params);

  if (isLoading) return <ActivityIndicator animating={true} />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data) return <Text>Data is undefined</Text>;

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Breed</DataTable.Title>
          <DataTable.Title>Size</DataTable.Title>
        </DataTable.Header>
        {data.breeds.map((breed) => (
          <DataTable.Row key={breed.id}>
            <DataTable.Cell>{breed.name}</DataTable.Cell>
            <DataTable.Cell>{breed.height.size}</DataTable.Cell>
          </DataTable.Row>
        ))}
        {data.pagination && <DataTablePagination {...data.pagination} />}
      </DataTable>
    </ScrollView>
  );
}
