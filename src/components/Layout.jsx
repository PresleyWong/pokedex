import Header from "./Header";
import Footer from "./Footer";
import { Container, Box } from "@mui/material";

const Layout = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Header />
      <Container
        sx={{
          marginTop: "100px",
        }}
      >
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
