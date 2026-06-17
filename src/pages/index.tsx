import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import Grid from '@mui/material/Grid';

type Movie = {
  slug: string;
  title: string;
  description_short: string;
  rating: number | null;
  type: string;
  img: string;
  isTrending: boolean;
  comingSoon: boolean;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <Grid container spacing={4}>
      
        {movies.map((movie) => (
          <Grid size={3} key={movie.slug}>
            <MovieCard key={movie.slug} {...movie} />
          </Grid>
      ))}
      
    </Grid>
  );
}