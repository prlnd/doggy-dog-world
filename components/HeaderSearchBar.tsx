import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <Appbar.Header style={styles.header} elevated>
      {showBackAction && <Appbar.BackAction onPress={onBackPress} color={theme.colors.onSurface} />}

      {(!searchVisible || !showSearch) && (
        <Appbar.Content title={title} titleStyle={styles.title} />
      )}

      {searchVisible && showSearch && (
        <View style={styles.searchContainer}>
          <SearchInput placeholder="Search dog breeds" />
        </View>
      )}

      {showSearch && (
        <Appbar.Action
          icon={searchVisible ? 'close' : 'magnify'}
          onPress={handleSearchToggle}
          color={theme.colors.onSurface}
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
  },
  title: {
    fontWeight: '500',
  },
});
