import { Box, Typography } from "@mui/material";
import React from "react";
const statusList = [
  {
    name: "等待中",
    color: "green",
  },
  {
    name: "待开始",
    color: "#bfbf22",
  },
  {
    name: "游戏中",
    color: "red",
  },
];
export default function RoomStatus(props) {
  const status = props.status;

  return (
    <Typography sx={{ display: "flex", direction: "row" }} fontSize={20}>
      状态：
      <Typography
        color={statusList[status >= 0 ? status : 0].color}
        fontSize={20}
      >
        {statusList[status >= 0 ? status : 0].name}
      </Typography>
    </Typography>
  );
}
