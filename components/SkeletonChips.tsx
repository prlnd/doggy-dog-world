import { ScrollView, StyleSheet, View, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { useSkeletonOpacity } from '@/lib/hooks';
import { useAppTheme } from '@/lib/hooks';

export default function SkeletonChips() {
  const opacity = useSkeletonOpacity();
  const { theme } = useAppTheme();

  const skeletonColor = theme.dark ? '#444444' : '#e0e0e0';

  const renderSkeletonChips = (widths: number[], containerStyle?: any) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
      {widths.map((width, i) => (
        <Animated.View
          key={i}
          style={[
            styles.chip,
            { width, opacity, backgroundColor: skeletonColor },
            i === 0 ? styles.firstChip : styles.regularChip,
            containerStyle,
          ]}
        />
      ))}
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="titleSmall" style={[styles.label, { color: theme.colors.onSurface }]}>
        Size:
      </Text>
      {renderSkeletonChips([60, 70, 80])}

      <Text variant="titleSmall" style={[styles.label, { color: theme.colors.onSurface }]}>
        Country of origin:
      </Text>
      {renderSkeletonChips([90, 100, 70, 80])}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  label: {
    marginBottom: 8,
    marginLeft: 16,
  },
  scrollView: {
    marginBottom: 16,
  },
  chip: {
    height: 32,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  regularChip: {
    marginRight: 8,
  },
  firstChip: {
    marginLeft: 16,
    marginRight: 8,
  },
});
