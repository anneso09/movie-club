import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

type MovieCardProps = {
  slug: string;
  title: string;
  description_short: string;
  rating: number | null;
  type: string;
  img: string;
  isTrending: boolean;
  comingSoon: boolean;
};

export default function MovieCard({
  slug,
  title,
  description_short,
  rating,
  type,
  img,
  comingSoon,
}: MovieCardProps) {
  const router = useRouter();
  return (
    <Card
      sx={{
        maxWidth: 300,
        height: 600,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea onClick={() => router.push(`/movies/${slug}`)}
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <CardMedia component="div" sx={{ position: "relative", height: 400, width: "100%" }}>
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 600px) 100vw, 300px"
            style={{ objectFit: "cover" }}
          />
        </CardMedia>
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description_short}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "auto",
            }}
          >
            {comingSoon ? (
              <Typography variant="body2" sx={{ color: "secondary.main" }}>
                Coming Soon
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ color: "primary.main" }}>
                ★ {rating}
              </Typography>
            )}
            <Chip label={type} color="primary" />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
