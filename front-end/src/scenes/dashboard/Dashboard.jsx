import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/Header";

function index() {
  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      ></Box>
      <Header title="DASHBOARD" subtitle="Welcome to Dashboard" />
    </Box>
  );
}

export default index;
