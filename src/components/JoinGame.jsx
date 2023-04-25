import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { currentRoomContext, infoContext, sendContext } from "../App";
import { CreateRoom, PlayerRename } from "../constants/msg_code";
import { useSnackbar } from "notistack";

export default function JoinGame() {
  const sendMessage = useContext(sendContext);
  const info = useContext(infoContext);
  const [newName, setNewName] = useState(info?.info?.name);
  const [roomName, setRoomName] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const currentRoom = useContext(currentRoomContext);
  const sendRename = () => {
    if (newName.length === 0) {
      enqueueSnackbar("昵称不能为空", { variant: "error" });
      return;
    }
    sendMessage.sendMessage(
      JSON.stringify({ code: PlayerRename, data: { name: newName } })
    );
  };
  const sendCreateRoom = () => {
    if (currentRoom.currentRoom) {
      console.log(currentRoom.currentRoom);
      enqueueSnackbar("已经在房间中", { variant: "error" });
      return;
    }
    sendMessage.sendMessage(
      JSON.stringify({ code: CreateRoom, data: { name: roomName } })
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        direction: "column",
        marginTop: "20px",
        width: "100%",
        flexDirection: "column",
        // alignItems: "center",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Typography variant="h5">创建房间</Typography>
        <Box flex={1}></Box>
        <Typography variant="h5">用户名:{info?.info?.name}</Typography>
      </Box>
      <Paper
        sx={{
          padding: "20px",
          marginTop: 3,
        }}
        elevation={3}
      >
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <TextField
            label="昵称"
            size="normal"
            sx={{ marginRight: 3 }}
            value={newName}
            defaultValue="unNamed"
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />

          <Button
            onClick={sendRename}
            variant="contained"
            color="primary"
            size="large"
          >
            更改
          </Button>
          <Box sx={{ width: "150px" }}></Box>
          <TextField
            label="房间名称"
            size="normal"
            sx={{ marginRight: 3 }}
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
          />

          <Button
            onClick={sendCreateRoom}
            variant="contained"
            color="primary"
            size="large"
          >
            创建房间
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
