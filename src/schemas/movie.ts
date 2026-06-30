// src/schemas/movie.ts
import { z } from "zod";

export const movieSchema = z.object({ //décrit la forme attendue d'un film
  slug: z.string(),
  title: z.string(),
  description_short: z.string(),
  description_long: z.string(),
  rating: z.number().nullable(), // accepte un number OU null
  type: z.string(),
  img: z.string(),
  isTrending: z.boolean(),
  comingSoon: z.boolean(),
});

export type Movie = z.infer<typeof movieSchema>;