import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Stack, useRouter } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaView, StatusBar } from 'react-native';
import HeaderSearchBar from '@/components/HeaderSearchBar';

const theme = DefaultTheme;

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
              animation: 'fade_from_bottom',
              animationDuration: 300,
              contentStyle: { backgroundColor: theme.colors.background },
              headerShown: true,
              presentation: 'transparentModal',
              cardOverlayEnabled: true,
              cardStyle: { backgroundColor: theme.colors.background },
              animationTypeForReplace: 'push',
              detachPreviousScreen: false,
              headerMode: 'screen',
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
