import { Animated, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useSkeletonOpacity } from '@/lib/hooks';
import { useAppTheme } from '@/lib/hooks';

export default function SkeletonRow() {
  const opacity = useSkeletonOpacity();
  const { theme } = useAppTheme();

  const skeletonColor = theme.dark ? '#444444' : '#e0e0e0';

  return (
    <DataTable.Row>
      <DataTable.Cell style={{ justifyContent: 'center' }}>
        <Animated.View
          style={[styles.skeleton, styles.name, { opacity, backgroundColor: skeletonColor }]}
        />
      </DataTable.Cell>
      <DataTable.Cell style={{ justifyContent: 'center' }}>
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
  name: {
    width: 120,
    height: 20,
  },
  size: {
    width: 60,
    height: 20,
  },
});
