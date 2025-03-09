import { PAGE_SIZES } from '@/lib/constants';
import { z } from 'zod';

function closestNumber(target: number, values: number[]) {
  return values.reduce((prev, curr) => {
    return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
  });
}

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

export const idParamsSchema = z.object({
  id: z.string(),
});
