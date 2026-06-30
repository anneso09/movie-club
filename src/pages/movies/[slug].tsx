import { useState, useEffect } from "react";
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
import { movieSchema, Movie } from "@/schemas/movie";

export default function MovieDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch("/api/movies")
      .then((res) => res.json())
      .then((data: unknown[]) => {
        const found = data.find((m: any) => m.slug === slug);

        if (found) {
          const result = movieSchema.safeParse(found);
          setMovie(result.success ? result.data : null);
        } else {
          setMovie(null);
        }

        setLoading(false);
      });
  }, [slug]);

  // En attente du fetch
  if (loading) {
    return (
      <>
        <Navbar />
        <Toolbar />
        <Container maxWidth="xl">
          <Typography sx={{ mt: 4 }}>Loading...</Typography>
        </Container>
      </>
    );
  }

  // Fetch terminé mais film introuvable → 404
  if (!movie) {
    return (
      <>
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
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              404
            </Typography>
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
      </>
    );
  }

  // Film trouvé → affichage normal
  return (
    <>
      <Navbar />
      <Toolbar />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", gap: 6, flexDirection: { xs: "column", md: "row-reverse" } }}>
          <Box sx={{ position: "relative", width: { xs: "100%", md: 350 }, height: 500, flexShrink: 0 }}>
            <Image
              src={movie.img}
              alt={movie.title}
              fill
              sizes="(max-width: 600px) 100vw, 350px"
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {movie.title}
            </Typography>

            <Chip label={movie.type} color="primary" sx={{ width: "fit-content" }} />

            {movie.comingSoon ? (
              <Typography variant="body1" sx={{ color: "secondary.main", fontWeight: 600 }}>
                Coming Soon
              </Typography>
            ) : (
              <Typography variant="body1" sx={{ color: "primary.main", fontWeight: 600 }}>
                ★ {movie.rating}
              </Typography>
            )}

            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
              {movie.description_long}
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}