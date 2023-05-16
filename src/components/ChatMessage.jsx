import { Box, Typography } from "@mui/material";
import React from "react";

export default function ChatMessage(props) {
  const { msg, flg } = props;

  return (
    <Box
      sx={{
        width: "100%",
        // height: "50px",
        // paddingTop: "10px",
        // paddingBottom: "10px",
        // marginLeft: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: flg == 1 ? "flex-end" : "flex-start",
        }}
      >
        <Box
          sx={{
            marginTop: "10px",
            marginLeft: "20px",
            display: "flex",
            marginRight: "20px",
            flexDirection: "row",
          }}
        >
          <Typography variant="h7" sx={{ color: "#a4a4a4" }}>
            {msg.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              marginLeft: "10px",
              marginRight: "10px",
              background: flg == 1 ? "#4791db" : "#e6e6e6",
              color: flg == 1 ? "#fff" : "#000",
              padding: "10px",
              borderRadius: "13px",
            }}
          >
            {msg.content}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
