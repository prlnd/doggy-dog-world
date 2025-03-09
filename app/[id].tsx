import { ScrollView, StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';
import { useFetchImage } from '@/lib/hooks';
import { idParamsSchema } from '@/lib/params-schemas';
import { useLocalSearchParams } from 'expo-router';
import ErrorView from '@/components/ErrorView';
import SkeletonBreedDetails from '@/components/SkeletonBreedDetails';
import { useAppTheme } from '@/lib/hooks';

export default function BreedDetails() {
  const { id } = idParamsSchema.parse(useLocalSearchParams());
  const { data, isLoading, error, refetch } = useFetchImage(id);
  const { theme } = useAppTheme();

  if (error) return <ErrorView message={error.message} onRetry={refetch} />;
  if (isLoading || !data) return <SkeletonBreedDetails />;

  const [breed] = data.breeds;

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Title title={breed.name} />
        <Card.Cover
          source={{ uri: data.url }}
          style={[
            styles.image,
            { backgroundColor: theme.dark ? theme.colors.surfaceVariant : '#fff' },
          ]}
          resizeMode="contain"
        />
        <Card.Content style={styles.cardContent}>
          <List.Section>
            <List.Accordion title="Physical Characteristics">
              <List.Item
                title="Height"
                description={`${breed.height.metric} cm`}
                titleStyle={styles.listItemTitle}
              />
              <List.Item
                title="Weight"
                description={`${breed.weight.metric} kg`}
                titleStyle={styles.listItemTitle}
              />
              <List.Item
                title="Life Span"
                description={breed.lifeSpan}
                titleStyle={styles.listItemTitle}
              />
            </List.Accordion>

            {breed.temperament && (
              <List.Accordion title="Temperament">
                <List.Item
                  title="Characteristics"
                  description={breed.temperament}
                  titleStyle={styles.listItemTitle}
                />
              </List.Accordion>
            )}

            <List.Accordion title="Origin">
              <List.Item
                title="Country"
                description={breed.origin.join(', ')}
                titleStyle={styles.listItemTitle}
              />
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
    width: '95%',
    maxWidth: 500,
    overflow: 'hidden',
  },
  image: {
    height: 300,
    width: '94%',
    alignSelf: 'center',
  },
  cardContent: {
    paddingTop: 16,
  },
  listItemTitle: {
    marginBottom: 4,
  },
});
