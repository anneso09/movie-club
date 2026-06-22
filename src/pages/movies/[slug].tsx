import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";

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

export default function MovieDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    // On attend que le slug soit disponible avant de fetcher
    if (!slug) return;

    fetch("/api/movies")
      .then((res) => res.json())
      .then((data: Movie[]) => {
        const found = data.find((m) => m.slug === slug);
        setMovie(found || null);
      });
  }, [slug]);

  // Film pas encore chargé
  if (!movie) {
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

  return (
    <>
      <Navbar />
      <Toolbar />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", gap: 6, flexDirection: { xs: "column", md: "row"}}}>
          {/* Poster */}
          <Box sx={{ position: "relative", width: { xs: "100%", md: 350 }, height: 500, flexShrink: 0 }}>
            <Image
              src={movie.img}
              alt={movie.title}
              fill
              sizes="(max-width: 600px) 100vw, 350px"
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          </Box>

          {/* Infos */}
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