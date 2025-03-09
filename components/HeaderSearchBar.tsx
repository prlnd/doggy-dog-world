import { useState, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import SearchInput from './SearchInput';

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
  const [searchVisible, setSearchVisible] = useState(false);
  const theme = useTheme();
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: searchVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [searchVisible, animatedValue]);

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
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
      {showBackAction && <Appbar.BackAction onPress={onBackPress} color="#fff" />}

      {(!searchVisible || !showSearch) && (
        <Appbar.Content title={title} titleStyle={[styles.title, { color: '#fff' }]} />
      )}

      {showSearch && (
        <Animated.View
          style={[
            styles.searchContainer,
            {
              width: searchWidth,
              opacity: searchOpacity,
              display: searchVisible ? 'flex' : 'none',
            },
          ]}>
          <SearchInput placeholder="Search dog breeds" />
        </Animated.View>
      )}

      {showSearch && (
        <Appbar.Action
          icon={searchVisible ? 'close' : 'magnify'}
          onPress={handleSearchToggle}
          color="#fff"
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
});
