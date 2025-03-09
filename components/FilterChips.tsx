import { Chip, Text, useTheme } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { Breed } from '@/schemas/breeds';
import { transformParamsSchema } from '@/schemas/params';
import { router, useLocalSearchParams } from 'expo-router';
import { getFilters } from '@/lib/utils';

type Props = {
  breeds: Breed[];
};

export default function FilterChips({ breeds }: Props) {
  const { size, origin } = transformParamsSchema.parse(useLocalSearchParams());
  const filters = getFilters(breeds, { size, origin });
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="titleSmall" style={[styles.label, { color: theme.colors.onSurface }]}>
        Size:
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {Array.from(filters.sizes).map((selectedSize, i) => (
          <Chip
            key={selectedSize}
            selected={size.includes(selectedSize)}
            onPress={() => {
              const filtered = size.filter((s) => s !== selectedSize);
              if (filtered.length === size.length) {
                router.setParams({ size: [...size, selectedSize] });
              } else {
                router.setParams({ size: filtered });
              }
            }}
            onLongPress={() => router.setParams({ size: [] })}
            style={i === 0 ? styles.firstChip : styles.chip}
            selectedColor={theme.colors.primary}>
            {selectedSize}
          </Chip>
        ))}
      </ScrollView>

      <Text variant="titleSmall" style={[styles.label, { color: theme.colors.onSurface }]}>
        Country of origin:
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {Array.from(filters.origins).map((selectedOrigin, i) => (
          <Chip
            key={selectedOrigin}
            selected={origin.includes(selectedOrigin)}
            onPress={() => {
              const filtered = origin.filter((o) => o !== selectedOrigin);
              if (filtered.length === origin.length) {
                router.setParams({ origin: [...origin, selectedOrigin] });
              } else {
                router.setParams({ origin: filtered });
              }
            }}
            onLongPress={() => router.setParams({ origin: [] })}
            style={i === 0 ? styles.firstChip : styles.chip}
            selectedColor={theme.colors.primary}>
            {selectedOrigin}
          </Chip>
        ))}
      </ScrollView>
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
    marginRight: 8,
  },
  firstChip: {
    marginLeft: 16,
    marginRight: 8,
  },
});
