import type { PageQueryParams } from './schemas';
import { breedArraySchema, paginationSchema } from './schemas';

const BASE_URL = 'https://api.thedogapi.com/v1';

export async function getBreeds({ page, limit, q }: PageQueryParams) {
  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
  });

  let url: string;
  if (q) {
    params.set('q', q);
    url = `${BASE_URL}/breeds/search?${params.toString()}`;
  } else {
    url = `${BASE_URL}/breeds?${params.toString()}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return {
    breeds: breedArraySchema.parse(data),
    pagination: paginationSchema.parse({
      current: response.headers.get('pagination-page'),
      count: response.headers.get('pagination-count'),
      limit: response.headers.get('pagination-limit'),
    }),
  };
}
