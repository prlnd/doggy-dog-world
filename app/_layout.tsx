import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Stack, useRouter } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaView, Platform } from 'react-native';
import HeaderSearchBar from '@/components/HeaderSearchBar';

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={DefaultTheme}>
        <SafeAreaView style={{ flex: 1, backgroundColor: DefaultTheme.colors.background }}>
          <Stack
            screenOptions={({ route }) => ({
              header: ({ options, back }) => (
                <HeaderSearchBar
                  showBackAction={!!back}
                  onBackPress={() => router.back()}
                  title={options.title || 'Doggy Dog World'}
                  showSearch={route.name === 'index'}
                />
              ),
              animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
              animationDuration: 200,
              contentStyle: { backgroundColor: DefaultTheme.colors.background },
              headerShown: true,
              // Preserve state of screens in the stack
              presentation: 'card',
            })}>
            <Stack.Screen
              name="index"
              options={{
                title: 'Dog Breeds',
              }}
            />
            <Stack.Screen
              name="[id]"
              options={{
                title: 'Breed Details',
              }}
            />
          </Stack>
        </SafeAreaView>
      </PaperProvider>
    </QueryClientProvider>
  );
}
