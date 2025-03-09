import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Breeds' }} />
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}
