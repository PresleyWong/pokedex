import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      sx={{
        marginTop: "auto",
        padding: "10px",
        justifyContent: "center",
        bgcolor: theme.palette.mode === "dark" ? "#000000" : "#1976d2",
        color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
      }}
    >
      © {year} All rights reserved
    </Stack>
  );
};

export default Footer;
