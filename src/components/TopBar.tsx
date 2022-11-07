import { useState, FormEvent } from "react";
import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import PokeballIcon from "../assets/pokeball-icon.svg";
import { useTheme } from "next-themes";
import Search from "./Search";

export default function TopBar() {
  const { theme, setTheme } = useTheme();

  return (
    <AppBar>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex">
          <Image
            src={PokeballIcon}
            height={30}
            width={30}
            alt="pokeball icon"
          />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ display: { xs: "none", sm: "block" }, ml: 1 }}
          >
            Pokemon cards
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: { xs: "100%", sm: "auto" },
            justifyContent: "flex-end",
          }}
        >
          <>
            <Search />
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="change theme"
            >
              {theme === "dark" ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon sx={{ color: "white" }} />
              )}
            </IconButton>
          </>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
