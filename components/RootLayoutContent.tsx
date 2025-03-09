import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'react-native';
import HeaderSearchBar from '@/components/HeaderSearchBar';
import { useAppTheme } from '@/lib/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayoutContent() {
  const router = useRouter();
  const { theme } = useAppTheme();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle={theme.dark ? 'dark-content' : 'light-content'}
      />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        edges={['right', 'bottom', 'left']}>
        <Stack
          screenOptions={({ route }) => ({
            header: ({ options, back }) => (
              <HeaderSearchBar
                showBackAction={route.name !== 'index'}
                onBackPress={() => {
                  if (back) {
                    router.back();
                  } else {
                    router.replace('/');
                  }
                }}
                title={options.title || 'DoggyDogWorld'}
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
    </>
  );
}
