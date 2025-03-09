import type { Breed } from '@/lib/breed-schemas';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getLocalBreeds(): Promise<Breed[] | null> {
  const cache = await AsyncStorage.getItem('breeds');
  return cache ? JSON.parse(cache) : null;
}

export async function setLocalBreeds(breeds: Breed[]) {
  await AsyncStorage.setItem('breeds', JSON.stringify(breeds));
}

export async function clearLocalBreeds() {
  await AsyncStorage.removeItem('breeds');
}
