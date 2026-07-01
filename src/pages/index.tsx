import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MovieFormModal from "@/components/MovieFormModal";
import { movieSchema, Movie } from "@/schemas/movie";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [slugToDelete, setSlugToDelete] = useState<string | null>(null);

  function fetchMovies() {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data: unknown[]) => {
        const validMovies: Movie[] = [];

        data.forEach((item) => {
          const result = movieSchema.safeParse(item);
          if (result.success) {
            validMovies.push(result.data);
          } else {
            // Le film est invalide → on le log et on l'ignore
            console.warn("Invalid movie skipped:", item, result.error.format());
          }
        });

        setMovies(validMovies);
      });
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  async function handleSubmit(movie: Movie) {
    const method = selectedMovie ? "PUT" : "POST";
    await fetch("/api/movies", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
    fetchMovies();
  }

  function handleDeleteClick(slug: string) {
    setSlugToDelete(slug);
    setConfirmOpen(true);
  }

  async function handleConfirmDelete() {
    if (!slugToDelete) return;
    await fetch("/api/movies", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: slugToDelete }),
    });
    setConfirmOpen(false);
    setSlugToDelete(null);
    fetchMovies();
  }

  function handleOpenAdd() {
    setSelectedMovie(undefined);
    setOpen(true);
  }

  function handleOpenEdit(movie: Movie) {
    setSelectedMovie(movie);
    setOpen(true);
  }

  return (
    <>
      <Navbar />
      <Toolbar />
      <Hero />
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", my: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 4, height: 24, bgcolor: "primary.main", borderRadius: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Movies
            </Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={handleOpenAdd}
          sx={{textTransform: "none"}}>
            + Add Movie
          </Button>
        </Box>

        <Grid container spacing={4}>
          {movies.map((movie, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <MovieCard
                {...movie}
                onEdit={() => handleOpenEdit(movie)}
                onDelete={() => handleDeleteClick(movie.slug)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal Add/Edit */}
      <MovieFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedMovie}
      />

      {/* Dialog confirmation Delete */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Movie</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this movie?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}