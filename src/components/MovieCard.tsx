import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

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
  title,
  description_short,
  rating,
  type,
  img,
  comingSoon,
}: MovieCardProps) {
  return (
    <Card sx={{ maxWidth: 300}}>
      <CardActionArea>
        <CardMedia
          component="div"
          sx={{ position: "relative", height: 400 }}
        >
          <Image src={img} alt={title} fill style={{ objectFit: "cover" }} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description_short}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
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