import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 250, sm: 350, md: 400 },
        backgroundImage:
          "linear-gradient(180deg, rgba(27,27,47,0.55), rgba(27,27,47,0.92)), url('/images/heroImg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        All your movies,{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
          in one place
        </Box>
        .
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          maxWidth: 480,
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        Discover, track, and explore movies that are out, trending, or coming soon.
      </Typography>
    </Box>
  );
}