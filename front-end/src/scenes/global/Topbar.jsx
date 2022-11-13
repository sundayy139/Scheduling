import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { InputBase } from "@mui/material";
import LightModeOutLinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutLinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutLinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchOutLinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutLinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        borderRadius="3px"
        backgroundColor={colors.primary[400]}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchOutLinedIcon />
        </IconButton>
      </Box>

      {/* Icon */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutLinedIcon />
          ) : (
            <LightModeOutLinedIcon />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutLinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutLinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
