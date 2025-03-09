import { SortBy, transformParamsSchema } from '@/lib/schemas';
import { router, useLocalSearchParams } from 'expo-router';
import { DataTable } from 'react-native-paper';

export default function DataTableTitle({ title }: { title: SortBy }) {
  const { sortBy, order } = transformParamsSchema.parse(useLocalSearchParams());

  return (
    <DataTable.Title
      sortDirection={sortBy === title ? order : undefined}
      onPress={() => {
        router.setParams({
          'sort-by': title,
          order: sortBy === title && order === 'ascending' ? 'descending' : 'ascending',
        });
      }}>
      {title}
    </DataTable.Title>
  );
}
