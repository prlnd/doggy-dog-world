import { ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Card, List, Text } from 'react-native-paper';
import { useFetchImage } from '@/lib/hooks';
import { idParamsSchema } from '@/schemas/params';
import { useLocalSearchParams } from 'expo-router';

export default function BreedDetails() {
  const { id } = idParamsSchema.parse(useLocalSearchParams());
  const { data, isLoading, error } = useFetchImage(id);

  if (isLoading) return <ActivityIndicator animating={true} />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data) return <Text>Breed not found</Text>;

  const [breed] = data.breeds;

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Title title={breed.name} />
        <Card.Cover source={{ uri: data.url }} style={styles.image} resizeMode="contain" />
        <Card.Content>
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
    margin: 16,
  },
  image: {
    height: 300,
    backgroundColor: '#fff',
  },
});
