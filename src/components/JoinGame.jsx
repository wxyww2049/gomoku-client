import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";

export default function JoinGame() {
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
        <Typography variant="h5">创建房间</Typography>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <TextField label="昵称" size="normal" sx={{ marginRight: 3 }} />

          <Button variant="contained" color="primary" size="large">
            更改
          </Button>
          <Box sx={{ width: "150px" }}></Box>
          <TextField label="房间名称" size="normal" sx={{ marginRight: 3 }} />

          <Button variant="contained" color="primary" size="large">
            创建房间
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
