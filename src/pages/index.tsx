import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Head from "next/head";
import { omdbMovieSchema, OmdbMovie } from "@/schemas/omdbMovie";

export default function Home() {
  const [movies, setMovies] = useState<OmdbMovie[]>([]);

  function fetchMovies() {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data: unknown[]) => {
        const validMovies: OmdbMovie[] = [];

        data.forEach((item) => {
          const result = omdbMovieSchema.safeParse(item);
          if (result.success) {
            validMovies.push(result.data);
          } else {
            console.warn("Invalid movie skipped:", item, result.error.format());
          }
        });

        setMovies(validMovies);
      });
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Head>
        <title>MovieClub</title>
      </Head>
      <Navbar />
      <Toolbar />
      <Hero />
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            my: 4,
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 24,
              bgcolor: "primary.main",
              borderRadius: 1,
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Movies
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.imdbID}>
              <MovieCard {...movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}