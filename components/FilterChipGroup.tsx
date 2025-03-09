import { Text, useTheme } from 'react-native-paper';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import type { Breed } from '@/lib/breed-schemas';
import { transformParamsSchema } from '@/lib/params-schemas';
import { useLocalSearchParams } from 'expo-router';
import { getFilters } from '@/lib/utils';
import FilterChip from './FilterChip';

type FilterChipGroupProps = {
  breeds: Breed[];
};

export default function FilterChipGroup({ breeds }: FilterChipGroupProps) {
  const { size, origin } = transformParamsSchema.parse(useLocalSearchParams());
  const filters = getFilters(breeds, { size, origin });
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {filters.sizes.size > 0 && (
        <>
          <Text variant="titleSmall" style={[styles.label, { color: theme.colors.onSurface }]}>
            Size:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            style={styles.scrollView}>
            {Array.from(filters.sizes).map((title, i) => (
              <FilterChip key={title} title={title} filters={size} param="size" index={i} />
            ))}
          </ScrollView>
        </>
      )}

      {filters.origins.size > 0 && (
        <>
          <Text variant="titleSmall" style={[styles.label, { color: theme.colors.onSurface }]}>
            Country of origin:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            style={styles.scrollView}>
            {Array.from(filters.origins).map((title, i) => (
              <FilterChip key={title} title={title} filters={origin} param="origin" index={i} />
            ))}
          </ScrollView>
        </>
      )}
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
});
