import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
  onEdit: () => void;
  onDelete: () => void;
};

export default function MovieCard({
  slug,
  title,
  description_short,
  rating,
  type,
  img,
  isTrending,
  comingSoon,
  onEdit,
  onDelete,
}: MovieCardProps) {
  const router = useRouter();

  return (
    <Card
      sx={{
        maxWidth: 300,
        height: 650,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        onClick={() => router.push(`/movies/${slug}`)}
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
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 600px) 100vw, 300px"
            style={{ objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 8,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
          {isTrending && (
            <Chip
              label="Trending"
              color="primary"
            />
          )}
          </Box>    
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

      {/* Boutons Edit + Delete en dehors du CardActionArea */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1, gap: 1 }}>
        <IconButton
          size="small"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
}
