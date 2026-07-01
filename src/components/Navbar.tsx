import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Container maxWidth="xl" sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Movie
              <Box component="span" sx={{ color: "primary.main" }}>
                Club
              </Box>
            </Typography>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}