import { type PageQueryParams, paginationSchema } from '@/schemas/params';
import { breedArraySchema, breedImageSchema } from '@/schemas/breeds';

const BASE_URL = 'https://api.thedogapi.com/v1';

function assertOkResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status} ${response.statusText}`);
  }
}

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
  assertOkResponse(response);
  const data = await response.json();

  return {
    breeds: breedArraySchema.parse(data),
    pagination: q
      ? undefined
      : paginationSchema.parse({
          current: response.headers.get('pagination-page'),
          count: response.headers.get('pagination-count'),
          limit: response.headers.get('pagination-limit'),
        }),
  };
}

export async function getImage(imageId: string) {
  const response = await fetch(`${BASE_URL}/images/${imageId}`);
  assertOkResponse(response);
  const data = await response.json();
  return breedImageSchema.parse(data);
}
