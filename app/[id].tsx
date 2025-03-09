import { ScrollView, StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';
import { useFetchImage } from '@/lib/hooks';
import { idParamsSchema } from '@/schemas/params';
import { useLocalSearchParams } from 'expo-router';
import ErrorView from '@/components/ErrorView';
import SkeletonBreedDetails from '@/components/SkeletonBreedDetails';

export default function BreedDetails() {
  const { id } = idParamsSchema.parse(useLocalSearchParams());
  const { data, isLoading, error, refetch } = useFetchImage(id);

  if (error) return <ErrorView message={error.message} onRetry={refetch} />;
  if (isLoading || !data) return <SkeletonBreedDetails />;

  const [breed] = data.breeds;

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Title title={breed.name} />
        <Card.Cover source={{ uri: data.url }} style={styles.image} resizeMode="contain" />
        <Card.Content style={styles.cardContent}>
          <List.Section>
            <List.Accordion title="Physical Characteristics">
              <List.Item title="Height" description={`${breed.height.metric} cm`} />
              <List.Item title="Weight" description={`${breed.weight.metric} kg`} />
              <List.Item title="Life Span" description={breed.lifeSpan} />
            </List.Accordion>

            {breed.temperament && (
              <List.Accordion title="Temperament">
                <List.Item title="Temperament" description={breed.temperament} />
              </List.Accordion>
            )}

            <List.Accordion title="Origin">
              <List.Item title="Origin" description={breed.origin.join(', ')} />
            </List.Accordion>
          </List.Section>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    width: '90%',
    maxWidth: 500,
    overflow: 'hidden',
  },
  image: {
    height: 300,
    backgroundColor: '#fff',
    width: '100%',
    margin: 0,
  },
  cardContent: {
    paddingTop: 16,
  },
});
