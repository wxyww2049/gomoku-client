import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import RoomCard from "./RoomCard";
import { roomsContext } from "../App";

export default function Rooms() {
  const rooms = useContext(roomsContext);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginTop: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
        elevation={3}
      >
        <Typography variant="h5">加入游戏</Typography>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          {rooms.rooms.map((room) => {
            return <RoomCard room={room} />;
          })}
          {rooms.rooms.length === 0 ? (
            <Typography variant="h6">暂无房间</Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
