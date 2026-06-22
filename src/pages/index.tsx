import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
    <>
      <Navbar />
      {/* Compense la hauteur de la navbar fixe */}
      <Toolbar />
      <Hero />
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1, my: 4 }}>
          <Box sx={{ width: 4, height: 38, bgcolor: "primary.main", borderRadius: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Movies
            </Typography>
          </Box>
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid size={3} key={movie.slug}>
              <MovieCard {...movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}