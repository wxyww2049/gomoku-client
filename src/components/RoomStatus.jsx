import { Typography } from "@mui/material";
import React from "react";
const statusList = [
  {
    name: " 待加入",
    color: "green",
  },
  {
    name: " 待开始",
    color: "yellow",
  },
  {
    name: " 游戏中",
    color: "red",
  },
];
export default function RoomStatus(props) {
  const staus = props.status;

  return (
    <Typography color={statusList[staus].color} fontSize={20}>
      {statusList[staus].name}
    </Typography>
  );
}
