import { Banner } from 'react-native-paper';
import { clearLocalBreeds } from '@/lib/storage';
import { useLocalSearchParams } from 'expo-router';
import { pageQueryParamsSchema } from '@/schemas/params';
import { useBreedInvalidation } from '@/lib/hooks';

type CachedDataBannerProps = {
  visible: boolean;
};

export default function CachedDataBanner({ visible }: CachedDataBannerProps) {
  const params = pageQueryParamsSchema.parse(useLocalSearchParams());
  const invalidateCache = useBreedInvalidation(params);

  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: 'Remove cache',
          onPress: () => {
            clearLocalBreeds();
            invalidateCache();
          },
        },
        {
          label: 'Retry',
          onPress: invalidateCache,
        },
      ]}>
      You're viewing cached data. Please check your internet connection.
    </Banner>
  );
}
