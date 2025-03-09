import { View, StyleSheet, Animated } from 'react-native';
import { Card, List } from 'react-native-paper';
import { useSkeletonOpacity } from '@/lib/hooks';
import { useAppTheme } from '@/lib/hooks';

export default function SkeletonBreedDetails() {
  const opacity = useSkeletonOpacity();
  const { theme } = useAppTheme();

  const skeletonColor = theme.dark ? '#444444' : '#e0e0e0';
  const imageBackgroundColor = theme.dark ? theme.colors.surfaceVariant : '#e0e0e0';

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Title
          title={
            <Animated.View
              style={[styles.skeleton, styles.title, { opacity, backgroundColor: skeletonColor }]}
            />
          }
        />

        <Animated.View
          style={[
            styles.skeleton,
            styles.image,
            { opacity, backgroundColor: imageBackgroundColor },
          ]}
        />

        <Card.Content style={styles.cardContent}>
          <List.Section>
            <List.Accordion
              title={
                <Animated.View
                  style={[
                    styles.skeleton,
                    styles.sectionTitle,
                    { opacity, backgroundColor: skeletonColor },
                  ]}
                />
              }
              expanded={false}>
              {[1, 2, 3].map((item) => (
                <List.Item
                  key={item}
                  title={
                    <Animated.View
                      style={[
                        styles.skeleton,
                        styles.listItemTitle,
                        { opacity, backgroundColor: skeletonColor },
                      ]}
                    />
                  }
                  description={
                    <Animated.View
                      style={[
                        styles.skeleton,
                        styles.listItemDesc,
                        { opacity, backgroundColor: skeletonColor },
                      ]}
                    />
                  }
                />
              ))}
            </List.Accordion>

            <List.Accordion
              title={
                <Animated.View
                  style={[
                    styles.skeleton,
                    styles.sectionTitle,
                    { opacity, backgroundColor: skeletonColor },
                  ]}
                />
              }
              expanded={false}>
              <List.Item
                title={
                  <Animated.View
                    style={[
                      styles.skeleton,
                      styles.listItemTitle,
                      { opacity, backgroundColor: skeletonColor },
                    ]}
                  />
                }
                description={
                  <Animated.View
                    style={[
                      styles.skeleton,
                      styles.listItemDesc,
                      { opacity, backgroundColor: skeletonColor },
                    ]}
                  />
                }
              />
            </List.Accordion>

            <List.Accordion
              title={
                <Animated.View
                  style={[
                    styles.skeleton,
                    styles.sectionTitle,
                    { opacity, backgroundColor: skeletonColor },
                  ]}
                />
              }
              expanded={false}>
              <List.Item
                title={
                  <Animated.View
                    style={[
                      styles.skeleton,
                      styles.listItemTitle,
                      { opacity, backgroundColor: skeletonColor },
                    ]}
                  />
                }
                description={
                  <Animated.View
                    style={[
                      styles.skeleton,
                      styles.listItemDesc,
                      { opacity, backgroundColor: skeletonColor },
                    ]}
                  />
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
    marginVertical: 16,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    width: '90%',
    maxWidth: 500,
    overflow: 'hidden',
  },
  skeleton: {
    borderRadius: 4,
  },
  title: {
    width: 150,
    height: 24,
  },
  image: {
    height: 300,
    width: '100%',
    margin: 0,
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
  cardContent: {
    paddingTop: 16,
  },
});
