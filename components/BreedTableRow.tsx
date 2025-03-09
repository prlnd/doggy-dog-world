import type { Breed } from '@/schemas/breeds';
import { router } from 'expo-router';
import { DataTable } from 'react-native-paper';

type Props = {
  breed: Breed;
};

export default function BreedTableRow({ breed }: Props) {
  return (
    <DataTable.Row key={breed.id} onPress={() => router.push(`/${breed.imageId}`)}>
      <DataTable.Cell style={{ justifyContent: 'center' }}>{breed.name}</DataTable.Cell>
      <DataTable.Cell style={{ justifyContent: 'center' }}>{breed.height.metric} cm</DataTable.Cell>
    </DataTable.Row>
  );
}
