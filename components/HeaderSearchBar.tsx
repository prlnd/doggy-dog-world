import { useState, useEffect } from 'react';
import { StyleSheet, Animated, Platform } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import SearchInput from './SearchInput';
import { useAppTheme } from '@/lib/hooks';
import { router, useGlobalSearchParams } from 'expo-router';
import { pageQueryParamsSchema } from '@/schemas/params';

type HeaderSearchBarProps = {
  showBackAction?: boolean;
  onBackPress?: () => void;
  title: string;
  showSearch?: boolean;
};

export default function HeaderSearchBar({
  showBackAction,
  onBackPress,
  title,
  showSearch = false,
}: HeaderSearchBarProps) {
  const { q } = pageQueryParamsSchema.parse(useGlobalSearchParams());
  const [isSearchVisible, setIsSearchVisible] = useState(q !== '');
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useAppTheme();
  const [animatedValue] = useState(new Animated.Value(0));

  const headerTextColor = theme.dark ? '#000' : '#fff';

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isSearchVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isSearchVisible, animatedValue]);

  const handleSearchToggle = () => {
    if (isSearchVisible) {
      router.setParams({ q: '' });
    }
    setIsSearchVisible(!isSearchVisible);
  };

  const searchWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const searchOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: theme.colors.primary }]} elevated>
      {showBackAction && <Appbar.BackAction onPress={onBackPress} color={headerTextColor} />}

      {(!isSearchVisible || !showSearch) && (
        <Appbar.Content
          title={title}
          titleStyle={[
            styles.title,
            { color: headerTextColor },
            Platform.OS === 'ios' && styles.iosTitle,
            Platform.OS === 'ios' && !showBackAction && styles.iosTitleNoPadding,
          ]}
        />
      )}

      {isSearchVisible && (
        <Animated.View
          style={[
            styles.searchContainer,
            {
              width: searchWidth,
              opacity: searchOpacity,
            },
          ]}>
          <SearchInput placeholder="Search dog breeds" />
        </Animated.View>
      )}

      <Appbar.Action
        icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
        onPress={toggleTheme}
        color={headerTextColor}
      />

      {showSearch && (
        <Appbar.Action
          icon={isSearchVisible ? 'close' : 'magnify'}
          onPress={handleSearchToggle}
          color={headerTextColor}
        />
      )}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    elevation: 4,
  },
  searchContainer: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    marginVertical: 6,
  },
  title: {
    fontWeight: '500',
  },
  iosTitle: {
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  iosTitleNoPadding: {
    paddingLeft: 16,
  },
});
