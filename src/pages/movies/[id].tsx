import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Image from "next/image";
import { omdbMovieSchema, OmdbMovie } from "@/schemas/omdbMovie";



export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<OmdbMovie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/movie/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const result = omdbMovieSchema.safeParse(data);
        setMovie(result.success ? result.data : null);
        setLoading(false);
      })
      .catch(() => {
        setMovie(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Fragment>
        
        <Navbar />
        <Toolbar />
        <Container maxWidth="xl">
          <Typography sx={{ mt: 4 }}>Loading...</Typography>
        </Container>
      </Fragment>
    );
  }

  if (!movie) {
    return (
      <Fragment>
        <Navbar />
        <Toolbar />
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              mt: 10,
              gap: 2,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700 }}>404</Typography>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              This movie doesnt exist.
            </Typography>
            <Link href="/" passHref legacyBehavior>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Back to Home
              </Button>
            </Link>
          </Box>
        </Container>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar />
      <Toolbar />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", gap: 6, flexDirection: { xs: "column", md: "row-reverse" } }}>

          {/* Poster */}
          <Box sx={{ position: "relative", width: { xs: "100%", md: 350 }, height: { xs: 300, md: 500 }, flexShrink: 0 }}>
            {movie.Poster && movie.Poster !== "N/A" ? (
              <Image
                src={movie.Poster}
                alt={movie.Title}
                fill
                sizes="(max-width: 600px) 100vw, 350px"
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "text.secondary" }}>Poster not added</Typography>
              </Box>
            )}
          </Box>

          {/* Infos */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {movie.Title}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {movie.Year} • {movie.Runtime}
            </Typography>

            {/* Genre */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {movie.Genre && movie.Genre !== "N/A" &&
                movie.Genre.split(",").map((g) => (
                  <Chip key={g.trim()} label={g.trim()} color="primary" size="small" />
                ))
              }
            </Box>

            {/* Rating */}
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <Typography variant="body1" sx={{ color: "primary.main", fontWeight: 600 }}>
                ★ {movie.imdbRating} / 10
              </Typography>
            )}

            {/* Plot */}
            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
              {movie.Plot && movie.Plot !== "N/A" ? movie.Plot : "Description not added"}
            </Typography>

            {/* Director */}
            {movie.Director && movie.Director !== "N/A" && (
              <Typography variant="body2">
                <strong>Director:</strong> {movie.Director}
              </Typography>
            )}

            {/* Actors */}
            {movie.Actors && movie.Actors !== "N/A" && (
              <Typography variant="body2">
                <strong>Actors:</strong> {movie.Actors}
              </Typography>
            )}

            <Link href="/" passHref legacyBehavior>
              <Button
                variant="outlined"
                color="primary"
                sx={{ textTransform: "none", width: "fit-content", mt: 2 }}
              >
                ← Back to Home
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
}