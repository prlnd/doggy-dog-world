import type { Breed } from '../schemas/breeds';
import type { TransformParams } from '../schemas/params';

export function getFilters(breeds: Breed[]) {
  return {
    sizes: new Set(breeds.map((breed) => breed.height.size)),
    origins: new Set(breeds.flatMap((breed) => breed.origin)),
  };
}

export function transformBreeds(breeds: Breed[], { sortBy, order, size, origin }: TransformParams) {
  return breeds
    .filter((breed) => {
      const sizeMatch = !size.length || size.includes(breed.height.size);
      const originMatch = !origin.length || breed.origin.some((o) => origin.includes(o));
      return sizeMatch && originMatch;
    })
    .sort((a, b) => {
      const sizeComparison = a.height.min - b.height.min || a.height.max - b.height.max;
      const nameComparison = a.name.localeCompare(b.name);
      const sign = order === 'ascending' ? 1 : -1;
      const result = sortBy === 'Size' ? sizeComparison || nameComparison : nameComparison;
      return sign * result;
    });
}
