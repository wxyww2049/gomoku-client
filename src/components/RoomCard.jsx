import { Box, Button, Card, Paper, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import RoomStatus from "./RoomStatus";
import { currentRoomContext, sendContext } from "../App";
import { enqueueSnackbar } from "notistack";
import { EnterRoom } from "../constants/msg_code";

export default function RoomCard(props) {
  const { room } = props;
  const currentRoom = useContext(currentRoomContext);
  const sendMessage = useContext(sendContext);
  const enterRoom = () => {
    if (currentRoom.currentRoom) {
      enqueueSnackbar("已经在房间中", { variant: "error" });
      return;
    }
    sendMessage.sendMessage(
      JSON.stringify({
        code: EnterRoom,
        data: room.id,
      })
    );
  };
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",

        marginTop: "20px",
        padding: "20px",
      }}
      elevation={4}
    >
      <Box flex={1}>
        <Typography variant="h6">
          <strong>{room.name}</strong>
        </Typography>
        <Box sx={{ marginLeft: 2, marginTop: 2 }}>
          <Typography fontSize={20}>房主：{room.owner.name}</Typography>
          <Typography fontSize={20}>
            玩家：{room.player ? room.player.name : "无"}
          </Typography>

          <RoomStatus status={room.status} />
        </Box>
      </Box>

      <Box
        sx={{
          // width: "100%",
          // marginTop: 2,
          alignItems: "flex-end",
          display: "flex",
          direction: "column",
        }}
      >
        <Button onClick={enterRoom} variant="contained" size="large">
          加入房间
        </Button>
      </Box>
    </Paper>
  );
}
