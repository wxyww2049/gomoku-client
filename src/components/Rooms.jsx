import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";

export default function Rooms() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          marginTop: "20px",
          width: "80%",
          minWidth: "800px",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          padding: "20px",
        }}
        elevation={3}
      >
        <Typography variant="h5">加入游戏</Typography>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
          }}
        ></Box>
      </Paper>
    </Box>
  );
}
