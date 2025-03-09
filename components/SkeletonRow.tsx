import { Animated, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useSkeletonOpacity } from '@/lib/hooks';

export default function SkeletonRow() {
  const opacity = useSkeletonOpacity();

  return (
    <DataTable.Row>
      <DataTable.Cell style={{ justifyContent: 'center' }}>
        <Animated.View style={[styles.skeleton, styles.name, { opacity }]} />
      </DataTable.Cell>
      <DataTable.Cell style={{ justifyContent: 'center' }}>
        <Animated.View style={[styles.skeleton, styles.size, { opacity }]} />
      </DataTable.Cell>
    </DataTable.Row>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
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
