import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeProvider from '@/components/ThemeProvider';
import RootLayoutContent from '@/components/RootLayoutContent';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SafeAreaProvider>
          <RootLayoutContent />
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
