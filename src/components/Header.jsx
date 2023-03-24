import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

import ColorModeButton from "./ColorModeButton";
import { useGetPokemonGenerationsQuery } from "../redux/api/pokemonAPI";
import { setGeneration, setPage } from "../redux/features/pokedex/pokedexSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const { data, isLoading, isSuccess, isError, error } =
    useGetPokemonGenerationsQuery();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };

  const handleSelection = (name) => {
    dispatch(setGeneration(name));
    dispatch(setPage(0));
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  if (isSuccess) {
    const generations = data.results;

    const drawerList = () => (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {generations.map((item, index) => (
            <span key={index}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleSelection(item.name)}>
                  <ListItemText
                    primary={item.name}
                    sx={{
                      fontWeight: 400,
                      textTransform: "uppercase",
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </span>
          ))}
        </List>
      </Box>
    );

    return (
      <AppBar position="fixed">
        <Container>
          <Toolbar disableGutters>
            <CatchingPokemonIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Pokédex
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Drawer anchor="left" open={drawer} onClose={toggleDrawer(false)}>
                {drawerList()}
              </Drawer>
            </Box>
            <CatchingPokemonIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Pokédex
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleOpenNavMenu}
              >
                Generations
              </Button>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {generations.map((item) => (
                  <MenuItem key={item.name} onClick={handleCloseNavMenu}>
                    <Typography
                      onClick={() => handleSelection(item.name)}
                      textAlign="center"
                      sx={{
                        textTransform: "uppercase",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <ColorModeButton />
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
};
export default Header;
