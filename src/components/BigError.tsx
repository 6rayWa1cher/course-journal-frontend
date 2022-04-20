import { Box } from "@mui/system";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const BigError = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <ErrorOutlineIcon fontSize="large" color="error" />
  </Box>
);

export default BigError;
