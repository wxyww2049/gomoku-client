import { Box } from "@mui/material";
import React, { useEffect } from "react";
import JoinGame from "../components/JoinGame";
import Rooms from "../components/Rooms";

export default function Hall() {
  return (
    <div>
      <Box>
        <JoinGame />
      </Box>
      <Box>
        <Rooms />
      </Box>
    </div>
  );
}
