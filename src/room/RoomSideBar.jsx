import { Box, Button, Tooltip, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import RoomStatus from "../components/RoomStatus";
import Chess from "../components/Chess";
import { currentRoomContext, infoContext, sendContext } from "../App";
import { StartGame } from "../constants/msg_code";
const NullPeople = () => {
  return (
    <Typography fontSize={20} color="red">
      未加入
    </Typography>
  );
};

export default function RoomSideBar(props) {
  const { room } = props;
  const { info } = useContext(infoContext);
  useEffect(() => {
    console.log("newInfo", info);
  }, [info]);
  const { currentRoom } = useContext(currentRoomContext);
  const { sendMessage } = useContext(sendContext);
  const startGame = () => {
    sendMessage(
      JSON.stringify({
        code: StartGame,
      })
    );
  };

  return (
    <Box fontSize={20}>
      <Box sx={{ marginTop: 3 }}>
        <RoomStatus status={room?.status} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          alignItems: "center",
        }}
      >
        房主{room?.owner.id === info?.id ? "(我)" : "(对手)"}：
        {room?.owner?.name}
        <Box flex={1}></Box>
        <Box sx={{ marginRight: 8 }}>
          {<Chess color={currentRoom?.owner.color} />}
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        玩家{room?.player?.id === info?.id ? "(我)" : "(对手)"}：
        {room?.player?.name ? (
          <>
            {room.player.name}
            <Box flex={1}></Box>
            <Box sx={{ marginRight: 8 }}>
              <Chess color={currentRoom?.player.color} />
            </Box>
          </>
        ) : (
          <NullPeople />
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        {(currentRoom?.winner === 1 || currentRoom?.winner == -1) && (
          <Box>
            <Typography variant="h4" color="red">
              {currentRoom.winner == 1 ? "黑方胜利" : "白方胜利"}
            </Typography>
          </Box>
        )}
        {currentRoom?.status == 2 && currentRoom.color == info.color && (
          <Typography variant="h6">你的轮次</Typography>
        )}
        {currentRoom?.status == 2 && currentRoom.color != info.color && (
          <Typography variant="h6">对手的轮次</Typography>
        )}
        {room?.status === 1 && room?.owner?.id === info?.id && (
          <Button onClick={startGame} size="large" variant="contained">
            开始游戏
          </Button>
        )}
        {room?.owner?.id !== info?.id && room?.status === 1 && (
          <Tooltip title="只有房主才能开始游戏">
            <Box>
              <Button size="large" variant="contained" disabled>
                开始游戏
              </Button>
            </Box>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
