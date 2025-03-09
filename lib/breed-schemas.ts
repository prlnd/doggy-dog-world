import { z } from 'zod';

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
    reference_image_id: z.string(),
  })
  .transform(({ life_span: lifeSpan, reference_image_id: imageId, ...breed }) => ({
    ...breed,
    lifeSpan,
    imageId,
  }));
export type Breed = z.infer<typeof breedSchema>;

export const breedArraySchema = z.array(breedSchema);

export const breedImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  breeds: breedArraySchema.nonempty(),
  width: z.number(),
  height: z.number(),
});
export type BreedImage = z.infer<typeof breedImageSchema>;
