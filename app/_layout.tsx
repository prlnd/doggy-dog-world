import { MD3LightTheme as DefaultTheme, PaperProvider, Searchbar } from 'react-native-paper';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';
import SearchInput from '@/components/SearchInput';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={DefaultTheme}>
        <Stack
          screenOptions={{
            header: () => (
              <View style={styles.header}>
                <SearchInput placeholder="Search breeds" />
              </View>
            ),
          }}>
          <Stack.Screen name="index" options={{ title: 'Breeds' }} />
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  searchbar: {
    elevation: 0,
    backgroundColor: '#f0f0f0',
  },
});
