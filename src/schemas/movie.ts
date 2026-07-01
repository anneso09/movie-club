import { z } from "zod";

export const movieSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  description_short: z.string().optional(),
  description_long: z.string().optional(),
  rating: z.number().nullable().optional(),
  type: z.string().optional(),
  img: z.string().optional(),
  isTrending: z.boolean().optional(),
  comingSoon: z.boolean().optional(),
});

export type Movie = z.infer<typeof movieSchema>;