import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { currentRoomContext, sendContext } from "../App";
import RoomSideBar from "./RoomSideBar";
import { ExitRoom as exitRoom } from "../constants/msg_code";
import { enqueueSnackbar } from "notistack";
import bgimg from "../assets/png/board.png";
import Board from "../components/Board";
import ChatPart from "../components/ChatPart";
export default function Room() {
  const { currentRoom } = useContext(currentRoomContext);
  const { sendMessage } = useContext(sendContext);
  const ExitRoom = () => {
    if (currentRoom === null || currentRoom === undefined) {
      enqueueSnackbar("未在房间中", { variant: "error" });
    }

    sendMessage(
      JSON.stringify({
        code: exitRoom,
      })
    );
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <IconButton onClick={ExitRoom}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Typography fontSize={25}>房间: {currentRoom?.name}</Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={8} md={12} lg={8} sm={12}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Paper
              sx={{
                width: "100%",
                minHeight: "100px",
                height: "800px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  background: `url(${bgimg})`,
                  height: "640px",
                  width: "640px",
                  margin: 3,
                }}
              >
                <Board />
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={4} md={4} lg={4} sm={12}>
          <Box>
            <Paper
              sx={{
                // marginTop: -10,
                width: "100%",
                // minHeight: "100px",
                padding: "10px 10px 10px 10px",
                paddingLeft: "30px",
              }}
            >
              <RoomSideBar room={currentRoom} />
            </Paper>
            <Paper
              sx={{
                marginTop: 3,
                width: "100%",
                minHeight: "100px",
                padding: "10px 10px 10px 10px",
                paddingLeft: "30px",
              }}
            >
              <ChatPart />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
