import { View, StyleSheet, Animated } from 'react-native';
import { Card, List } from 'react-native-paper';
import { useSkeletonOpacity } from '../lib/hooks';

export default function SkeletonBreedDetails() {
  const opacity = useSkeletonOpacity();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title={<Animated.View style={[styles.skeleton, styles.title, { opacity }]} />}
        />

        <Animated.View style={[styles.skeleton, styles.image, { opacity }]} />

        <Card.Content>
          <List.Section>
            <List.Accordion
              title={<Animated.View style={[styles.skeleton, styles.sectionTitle, { opacity }]} />}
              expanded={true}>
              {[1, 2, 3].map((item) => (
                <List.Item
                  key={item}
                  title={
                    <Animated.View style={[styles.skeleton, styles.listItemTitle, { opacity }]} />
                  }
                  description={
                    <Animated.View style={[styles.skeleton, styles.listItemDesc, { opacity }]} />
                  }
                />
              ))}
            </List.Accordion>

            <List.Accordion
              title={<Animated.View style={[styles.skeleton, styles.sectionTitle, { opacity }]} />}
              expanded={false}>
              <List.Item
                title={
                  <Animated.View style={[styles.skeleton, styles.listItemTitle, { opacity }]} />
                }
                description={
                  <Animated.View style={[styles.skeleton, styles.listItemDesc, { opacity }]} />
                }
              />
            </List.Accordion>

            <List.Accordion
              title={<Animated.View style={[styles.skeleton, styles.sectionTitle, { opacity }]} />}
              expanded={false}>
              <List.Item
                title={
                  <Animated.View style={[styles.skeleton, styles.listItemTitle, { opacity }]} />
                }
                description={
                  <Animated.View style={[styles.skeleton, styles.listItemDesc, { opacity }]} />
                }
              />
            </List.Accordion>
          </List.Section>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
  },
  skeleton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  title: {
    width: 150,
    height: 24,
  },
  image: {
    height: 300,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
  },
  sectionTitle: {
    width: 180,
    height: 20,
  },
  listItemTitle: {
    width: 80,
    height: 18,
  },
  listItemDesc: {
    width: 120,
    height: 16,
    marginTop: 4,
  },
});
