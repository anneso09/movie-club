import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/movies.json");

type Movie = {
  slug: string;
  title: string;
  description_short: string;
  description_long: string;
  rating: number | null;
  type: string;
  img: string;
  isTrending: boolean;
  comingSoon: boolean;
};

type MoviesFile = {
  title: string;
  description_short: string;
  img: string;
  isPromoted: boolean;
  movies: Movie[];
};

function readMovies(): MoviesFile {
  const fileContent = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(fileContent);
}

function writeMovies(data: MoviesFile) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = readMovies();

  switch (req.method) {
    case "GET": {
      return res.status(200).json(data.movies);
    }

    case "POST": {
      const newMovie: Movie = req.body;

      const alreadyExists = data.movies.some((m) => m.slug === newMovie.slug);
      if (alreadyExists) {
        return res.status(409).json({ message: `Movie with slug "${newMovie.slug}" already exists` });
      }

      data.movies.push(newMovie);
      writeMovies(data);
      return res.status(201).json(newMovie);
    }

    case "PUT": {
      const updatedMovie: Movie = req.body;
      const index = data.movies.findIndex((m) => m.slug === updatedMovie.slug);

      if (index === -1) {
        return res.status(404).json({ message: `Movie with slug "${updatedMovie.slug}" not found` });
      }

      data.movies[index] = updatedMovie;
      writeMovies(data);
      return res.status(200).json(updatedMovie);
    }

    case "DELETE": {
      const { slug } = req.body;
      const index = data.movies.findIndex((m) => m.slug === slug);

      if (index === -1) {
        return res.status(404).json({ message: `Movie with slug "${slug}" not found` });
      }

      data.movies.splice(index, 1);
      writeMovies(data);
      return res.status(200).json({ message: `Movie "${slug}" deleted` });
    }

    default: {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  }
}