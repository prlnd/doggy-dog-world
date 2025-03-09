import { type SortBy, transformParamsSchema } from '@/schemas/params';
import { router, useLocalSearchParams } from 'expo-router';
import { DataTable } from 'react-native-paper';

type Props = {
  title: SortBy;
};

export default function DataTableTitle({ title }: Props) {
  const { sortBy, order } = transformParamsSchema.parse(useLocalSearchParams());

  return (
    <DataTable.Title
      style={{ justifyContent: 'center' }}
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
