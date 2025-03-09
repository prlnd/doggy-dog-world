import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import SearchInput from '@/components/SearchInput';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={DefaultTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              header: () => (
                <View style={styles.header}>
                  <SearchInput placeholder="Search dog breeds" />
                </View>
              ),
              animation: 'slide_from_right',
              animationDuration: 150,
            }}>
            <Stack.Screen name="index" options={{ title: 'Breeds' }} />
            <Stack.Screen
              name="[id]"
              options={{
                title: 'Breed Details',
                headerShown: true,
                header: undefined,
              }}
            />
          </Stack>
        </SafeAreaView>
      </PaperProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  searchbar: {
    elevation: 0,
    backgroundColor: '#f0f0f0',
  },
});
