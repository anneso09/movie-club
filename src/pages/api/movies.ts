import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { omdbMovieSchema, OmdbMovie } from "@/schemas/omdbMovie";

// Chemin absolu vers le fichier JSON (fs ne comprend pas les alias "@/")
const dataFilePath = path.join(process.cwd(), "src/data/movies.json");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // On accepte uniquement les requêtes GET
  if (req.method !== "GET") {
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    // Lecture du fichier JSON contenant les titres à chercher
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    const { movies } = JSON.parse(fileContent);

    // Promise.all → fetch tous les films EN PARALLÈLE (plus rapide qu'une boucle séquentielle)
    const results = await Promise.all(
      movies.map(async ({ title }: { title: string }) => {
        // encodeURIComponent → encode les caractères spéciaux dans l'URL
        // ex: "Dead Man's Chest" → "Dead%20Man%27s%20Chest"
        const response = await fetch(
          `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${process.env.OMDB_API_KEY}`
        );
        const data = await response.json();

        // safeParse → valide les données OMDb sans crasher si invalide
        // (contrairement à parse() qui lève une exception)
        const result = omdbMovieSchema.safeParse(data);

        if (!result.success) {
          // Le film existe sur OMDb mais ses données ne correspondent pas au schéma attendu
          // On log l'erreur pour debug et on retourne null pour ignorer ce film
          console.warn(`Invalid OMDb data for "${title}":`, result.error.format());
          return null;
        }

        // result.data → les données validées et typées par Zod
        return result.data;
      })
    );

    // On filtre les null (films invalides ou non trouvés)
    // Le type guard "movie is OmdbMovie" permet à TypeScript de savoir
    // que le tableau final ne contient QUE des OmdbMovie (pas de null)
    const validMovies: OmdbMovie[] = results.filter(
      (movie): movie is OmdbMovie => movie !== null
    );

    return res.status(200).json(validMovies);

  } catch (error) {
    // Catch global : erreur de lecture du fichier JSON ou erreur réseau OMDb
    console.error("Error fetching movies:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}