import type { Breed, TransformParams } from './schemas';

export function closestNumber(target: number, values: number[]) {
  return values.reduce((prev, curr) => {
    return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
  });
}

export function transformBreeds(breeds: Breed[], { sortBy, order }: TransformParams) {
  const compareBreeds = (a: Breed, b: Breed) => {
    const sizeComparison = a.height.min - b.height.min || a.height.max - b.height.max;
    const nameComparison = a.name.localeCompare(b.name);
    const sign = order === 'ascending' ? 1 : -1;
    const result = sortBy === 'Size' ? sizeComparison || nameComparison : nameComparison;
    return sign * result;
  };

  return breeds.sort(compareBreeds);
}
