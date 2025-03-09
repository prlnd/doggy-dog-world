import { Animated, StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useSkeletonOpacity } from '@/lib/hooks';
import { useAppTheme } from '@/lib/hooks';

export function SkeletonImageCell() {
  const opacity = useSkeletonOpacity();
  const { theme } = useAppTheme();

  const skeletonColor = theme.dark ? '#444444' : '#e0e0e0';

  return (
    <DataTable.Cell>
      <View style={styles.imageContainer}>
        <Animated.View
          style={[styles.skeleton, styles.image, { opacity, backgroundColor: skeletonColor }]}
        />
      </View>
    </DataTable.Cell>
  );
}

export default function SkeletonRow() {
  const opacity = useSkeletonOpacity();
  const { theme } = useAppTheme();

  const skeletonColor = theme.dark ? '#444444' : '#e0e0e0';

  return (
    <DataTable.Row>
      <SkeletonImageCell />
      <DataTable.Cell>
        <Animated.View
          style={[styles.skeleton, styles.name, { opacity, backgroundColor: skeletonColor }]}
        />
      </DataTable.Cell>
      <DataTable.Cell numeric>
        <Animated.View
          style={[styles.skeleton, styles.size, { opacity, backgroundColor: skeletonColor }]}
        />
      </DataTable.Cell>
    </DataTable.Row>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    borderRadius: 4,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    width: 120,
    height: 20,
  },
  size: {
    width: 60,
    height: 20,
  },
});
