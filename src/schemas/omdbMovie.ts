import { z } from "zod";

export const omdbMovieSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  Plot: z.string(),
  Poster: z.string(),
  imdbRating: z.string(),
  imdbID: z.string(),
  Genre: z.string(),
  Director: z.string(),
  Actors: z.string(),
  Runtime: z.string(),
  Response: z.literal("True"),
});

export type OmdbMovie = z.infer<typeof omdbMovieSchema>;