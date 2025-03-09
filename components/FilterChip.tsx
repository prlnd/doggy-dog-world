import { Chip, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

type FilterChipProps = {
  title: string;
  filters: string[];
  param: string;
  index: number;
};

export default function FilterChip({ title, filters, param, index }: FilterChipProps) {
  const theme = useTheme();

  return (
    <Chip
      selected={filters.includes(title)}
      onPress={() => {
        const filtered = filters.filter((f) => f !== title);
        if (filtered.length === filters.length) {
          router.setParams({ [param]: filters.concat(title) });
        } else {
          router.setParams({ [param]: filtered });
        }
      }}
      onLongPress={() => router.setParams({ [param]: [] })}
      style={index === 0 ? styles.firstChip : styles.chip}
      selectedColor={theme.colors.primary}>
      {title}
    </Chip>
  );
}

const styles = StyleSheet.create({
  chip: {
    marginRight: 8,
  },
  firstChip: {
    marginLeft: 16,
    marginRight: 8,
  },
});
