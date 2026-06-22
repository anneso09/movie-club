import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 400,
        backgroundImage:
          "linear-gradient(180deg, rgba(27,27,47,0.55), rgba(27,27,47,0.92)), url('/images/heroImg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 4,
      }}
    >
      <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
        All your movies,{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
          in one place
        </Box>
        .
      </Typography>
      <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 480 }}>
        Discover, track, and explore movies that are out, trending, or coming soon.
      </Typography>
    </Box>
  );
}