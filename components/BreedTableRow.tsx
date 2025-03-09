import type { Breed } from '@/lib/breed-schemas';
import { router } from 'expo-router';
import { DataTable } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { useFetchImage } from '@/lib/hooks';
import { SkeletonImageCell } from '@/components/SkeletonRow';

type BreedTableRowProps = {
  breed: Breed;
};

export default function BreedTableRow({ breed }: BreedTableRowProps) {
  const { data: imageData } = useFetchImage(breed.imageId);

  return (
    <DataTable.Row key={breed.id} onPress={() => router.push(`/${breed.imageId}`)}>
      <DataTable.Cell>
        <View style={styles.imageContainer}>
          {!imageData ? (
            <SkeletonImageCell />
          ) : (
            <Image source={{ uri: imageData.url }} style={styles.image} />
          )}
        </View>
      </DataTable.Cell>
      <DataTable.Cell>{breed.name}</DataTable.Cell>
      <DataTable.Cell numeric>{breed.height.metric} cm</DataTable.Cell>
    </DataTable.Row>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
