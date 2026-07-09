import type { NextApiRequest, NextApiResponse } from "next";
import { omdbMovieSchema } from "@/schemas/omdbMovie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Missing movie id" });
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`
    );
    const data = await response.json();

    // Film non trouvé sur OMDb
    if (data.Response === "False") {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Validation Zod
    const result = omdbMovieSchema.safeParse(data);
    if (!result.success) {
      console.error("Invalid OMDb data:", result.error.format());
      return res.status(500).json({ message: "Invalid movie data" });
    }

    return res.status(200).json(result.data);

  } catch (error) {
    console.error("Error fetching movie:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}