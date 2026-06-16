import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {main : "#FFB400"},
        secondary: {main: "#E94560"},
        background: {default: "#1B1B2F", paper: "#2E2E4D"}
    },
});

export default theme;