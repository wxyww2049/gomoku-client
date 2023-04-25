import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import RoomStatus from "../components/RoomStatus";
import Chess from "../components/Chess";
import { currentRoomContext, infoContext } from "../App";
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
    </Box>
  );
}
