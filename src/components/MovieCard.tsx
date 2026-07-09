import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "next/link";

type MovieCardProps = {
  imdbID: string;
  Title: string;
  Plot?: string;
  Poster?: string;
  imdbRating?: string;
  Genre?: string;
};

export default function MovieCard({
  imdbID,
  Title,
  Plot,
  Poster,
  imdbRating,
  Genre,
}: MovieCardProps) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 345, md: 300 },
        height: 650,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        component={Link}
        href={`/movies/${imdbID}`}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "stretch",
        }}
      >
        <CardMedia
          component="div"
          sx={{ position: "relative", height: 400, width: "100%" }}
        >
          {Poster && Poster !== "N/A" ? (
            <Image
              src={Poster}
              alt={Title}
              fill
              sizes="(max-width: 600px) 100vw, 300px"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                No poster
              </Typography>
            </Box>
          )}
        </CardMedia>

        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography gutterBottom variant="h6" component="div">
            {Title}
          </Typography>

          {Plot && Plot !== "N/A" && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {Plot}
            </Typography>
          )}

          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "auto",
            }}
          >
            {imdbRating && imdbRating !== "N/A" && (
              <Typography variant="body2" sx={{ color: "primary.main" }}>
                ★ {imdbRating}
              </Typography>
            )}

            {Genre && Genre !== "N/A" && (
              <Chip
                label={Genre.split(",")[0].trim()}
                color="primary"
                size="small"
              />
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}