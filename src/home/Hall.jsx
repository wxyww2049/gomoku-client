import { Box } from "@mui/material";
import React, { useEffect } from "react";
import JoinGame from "../components/JoinGame";
import Rooms from "../components/Rooms";

export default function Hall() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          // minWidth: "800px",
          // maxWidth: "1500px",
        }}
      >
        <Box sx={{ marginTop: 6 }}>
          <JoinGame />
        </Box>
        <Box>
          <Rooms />
        </Box>
      </Box>
    </Box>
  );
}
