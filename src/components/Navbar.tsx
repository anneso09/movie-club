import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Container maxWidth= {false} sx={{ display: "flex" }}>
          <Stack
            direction="row"
            sx={{
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

            <TextField
              size="small"
              placeholder="Search for a movie..."
              sx={{ width: 280 }}
            />
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
