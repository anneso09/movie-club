import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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

          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
