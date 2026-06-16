import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// Absolute path to the JSON file (fs needs a real path, not "@/data/...")
const dataFilePath = path.join(process.cwd(), "src/data/movies.json");

// Read the current data from disk
function readMovies() {
  const fileContent = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(fileContent);
}

// Overwrite the file with updated data
function writeMovies(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Check that the movie object has the right fields and types
function isValidMovie(movie: any): string | null {
  if (typeof movie.slug !== "string") return "slug must be a string";
  if (typeof movie.title !== "string") return "title must be a string";
  if (typeof movie.description_short !== "string") return "description_short must be a string";
  if (typeof movie.description_long !== "string") return "description_long must be a string";
  if (movie.rating !== null && typeof movie.rating !== "number") return "rating must be a number or null";
  if (typeof movie.type !== "string") return "type must be a string";
  if (typeof movie.img !== "string") return "img must be a string";
  if (typeof movie.isTrending !== "boolean") return "isTrending must be a boolean";
  if (typeof movie.comingSoon !== "boolean") return "comingSoon must be a boolean";
  return null; // no error
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = readMovies();

  switch (req.method) {
    // Return all movies
    case "GET": {
      return res.status(200).json(data.movies);
    }

    // Add a new movie to the list
    case "POST": {
      const error = isValidMovie(req.body);
      if (error) return res.status(400).json({ message: error });

      data.movies.push(req.body);
      writeMovies(data);
      return res.status(201).json(req.body);
    }

    // Replace an existing movie (matched by slug)
    case "PUT": {
      const error = isValidMovie(req.body);
      if (error) return res.status(400).json({ message: error });

      const index = data.movies.findIndex((m: any) => m.slug === req.body.slug);
      data.movies[index] = req.body;
      writeMovies(data);
      return res.status(200).json(req.body);
    }

    // Remove a movie (matched by slug)
    case "DELETE": {
      data.movies = data.movies.filter((m: any) => m.slug !== req.body.slug);
      writeMovies(data);
      return res.status(200).json({ message: `Movie "${req.body.slug}" deleted` });
    }

    // Any other method is not supported
    default: {
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  }
}