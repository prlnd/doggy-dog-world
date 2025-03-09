import { type SortBy, transformParamsSchema } from '@/lib/params-schemas';
import { router, useLocalSearchParams } from 'expo-router';
import { DataTable } from 'react-native-paper';

type BreedTableTitleProps = {
  title: SortBy;
  numeric?: boolean;
};

export default function BreedTableTitle({ title, numeric = false }: BreedTableTitleProps) {
  const { sortBy, order } = transformParamsSchema.parse(useLocalSearchParams());

  return (
    <DataTable.Title
      numeric={numeric}
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
