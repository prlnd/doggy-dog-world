import { z } from 'zod';
import { PAGE_SIZES } from './constants';
import { closestNumber } from './utils';

function sizeFromHeight(height: number): 'Small' | 'Medium' | 'Large' {
  if (height < 25) {
    return 'Small';
  } else if (height < 50) {
    return 'Medium';
  } else {
    return 'Large';
  }
}

const numberPairSchema = z
  .tuple([z.coerce.number(), z.coerce.number()])
  .or(z.coerce.number().transform((n) => [n, n] as const));
const heightSpanSchema = z.string().transform((s) => numberPairSchema.parse(s.split(' - ')));
const heightSchema = z
  .object({
    metric: z.string(),
  })
  .transform((height) => {
    const [min, max] = heightSpanSchema.parse(height.metric);
    return {
      ...height,
      min,
      max,
      size: sizeFromHeight(min),
    };
  });

const breedSchema = z
  .object({
    weight: z.object({
      metric: z.string(),
    }),
    height: heightSchema,
    id: z.number(),
    name: z.string(),
    temperament: z.string().optional(),
    life_span: z.string(),
    origin: z
      .string()
      .optional()
      .transform((origin) => (origin || 'Unknown').split(', ')),
  })
  .transform(({ life_span: lifeSpan, ...breed }) => ({
    ...breed,
    lifeSpan,
  }));
export type Breed = z.infer<typeof breedSchema>;

export const breedArraySchema = z.array(breedSchema);

export const pageQueryParamsSchema = z.object({
  page: z.coerce
    .number()
    .catch(0)
    .transform((val) => Math.max(0, val)),
  limit: z.coerce
    .number()
    .catch(0)
    .transform((limit) => closestNumber(limit, PAGE_SIZES)),
  q: z.string().default(''),
});
export type PageQueryParams = z.infer<typeof pageQueryParamsSchema>;

export const sortBySchema = z.enum(['Size', 'Name']).default('Size');
export type SortBy = z.infer<typeof sortBySchema>;

export const orderSchema = z.enum(['ascending', 'descending']).default('ascending');
export type Order = z.infer<typeof orderSchema>;

export const transformParamsSchema = z
  .object({
    'sort-by': sortBySchema,
    order: orderSchema,
    size: z
      .string()
      .or(z.string().array())
      .default([])
      .transform((size) => (Array.isArray(size) ? size : [size])),
    origin: z
      .string()
      .or(z.string().array())
      .default([])
      .transform((origin) => (Array.isArray(origin) ? origin : [origin])),
  })
  .transform(({ 'sort-by': sortBy, ...params }) => ({
    ...params,
    sortBy,
  }));
export type TransformParams = z.infer<typeof transformParamsSchema>;

export const searchParamsSchema = pageQueryParamsSchema.and(transformParamsSchema);
export type SearchParams = z.infer<typeof searchParamsSchema>;

export const paginationSchema = z.object({
  current: z.coerce.number(),
  count: z.coerce.number(),
  limit: z.coerce.number(),
});
export type Pagination = z.infer<typeof paginationSchema>;
