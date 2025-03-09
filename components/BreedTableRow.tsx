import type { Breed } from '@/lib/breed-schemas';
import { router } from 'expo-router';
import { DataTable } from 'react-native-paper';

type BreedTableRowProps = {
  breed: Breed;
};

export default function BreedTableRow({ breed }: BreedTableRowProps) {
  return (
    <DataTable.Row key={breed.id} onPress={() => router.push(`/${breed.imageId}`)}>
      <DataTable.Cell style={{ justifyContent: 'center' }}>{breed.name}</DataTable.Cell>
      <DataTable.Cell style={{ justifyContent: 'center' }}>{breed.height.metric} cm</DataTable.Cell>
    </DataTable.Row>
  );
}
