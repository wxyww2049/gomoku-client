import React, { useContext, useEffect, useState } from "react";
import Chess from "./Chess";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { infoContext, sendContext } from "../App";
import { currentRoomContext } from "../App";
import { AddNewChess } from "../constants/msg_code";
const gridWidth = 38,
  NumOfGrid = 15;

const MyGrid = (props) => {
  const { x, y } = props;
  return (
    <>
      <line
        x1={x * gridWidth + gridWidth / 2 + 6}
        x2={x * gridWidth + gridWidth / 2 + 6}
        y1={y === 0 ? y * gridWidth + gridWidth / 2 + 6 : y * gridWidth + 6}
        y2={
          y === NumOfGrid - 1
            ? y * gridWidth + gridWidth / 2 + 6
            : y * gridWidth + gridWidth + 6
        }
        style={{ stroke: "black", strokeWidth: 2 }}
      ></line>
      <line
        x1={x === 0 ? gridWidth / 2 + 6 : x * gridWidth + 6}
        x2={
          x === NumOfGrid - 1
            ? x * gridWidth + gridWidth / 2 + 6
            : x * gridWidth + gridWidth + 6
        }
        y1={y * gridWidth + gridWidth / 2 + 6}
        y2={y * gridWidth + gridWidth / 2 + 6}
        style={{ stroke: "black", strokeWidth: 2 }}
      ></line>

      <rect
        x={x * gridWidth + 6}
        y={y * gridWidth + 6}
        width={gridWidth}
        height={gridWidth}
        fill="transparent"
        style={{ cursor: "pointer", zIndex: 100 }}
        onClick={props.onClick}
        // stroke="black"
        // strokeWidth="2"
      ></rect>
    </>
  );
};

export default function Board() {
  const [board, setBoard] = useState([]);
  const { currentRoom } = useContext(currentRoomContext);

  useEffect(() => {
    var tmp = [];
    for (var i = 0; i < NumOfGrid; ++i) {
      tmp[i] = [];
      for (var j = 0; j < NumOfGrid; ++j) {
        tmp[i][j] = { x: i, y: j };
      }
    }
    setBoard(tmp);
  }, []);
  const { info } = useContext(infoContext);
  const { sendMessage } = useContext(sendContext);

  const loadChess = (x, y) => {
    if (currentRoom.status !== 2) {
      enqueueSnackbar("游戏未开始", { variant: "warning" });
      return;
    }

    var newChess = {
      x: x,
      y: y,
      color: info.color,
    };
    if (currentRoom.color !== info.color) {
      enqueueSnackbar("不是你的回合", { variant: "warning" });
      return;
    }
    if (
      currentRoom?.steps?.filter((val) => val.x === x && val.y === y).length
    ) {
      enqueueSnackbar("此处已有棋子", { variant: "error" });
      return;
    }
    sendMessage(JSON.stringify({ code: AddNewChess, data: newChess }));
  };

  return (
    <svg width="580" height="580">
      <circle
        cx={6 + 7 * gridWidth + gridWidth / 2}
        cy={6 + 7 * gridWidth + gridWidth / 2}
        fill="black"
        r="4"
      ></circle>
      <circle
        cx={6 + 3 * gridWidth + gridWidth / 2}
        cy={6 + 3 * gridWidth + gridWidth / 2}
        fill="black"
        r="4"
      ></circle>
      <circle
        cx={6 + 11 * gridWidth + gridWidth / 2}
        cy={6 + 3 * gridWidth + gridWidth / 2}
        fill="black"
        r="4"
      ></circle>
      <circle
        cx={6 + 3 * gridWidth + gridWidth / 2}
        cy={6 + 11 * gridWidth + gridWidth / 2}
        fill="black"
        r="4"
      ></circle>
      <circle
        cx={6 + 11 * gridWidth + gridWidth / 2}
        cy={6 + 11 * gridWidth + gridWidth / 2}
        fill="black"
        r="4"
      ></circle>
      {board.map((row) => {
        return row.map((val) => {
          return (
            <MyGrid
              x={val.x}
              y={val.y}
              onClick={() => loadChess(val.x, val.y)}
            />
          );
        });
      })}

      {currentRoom?.steps?.map((val) => {
        return (
          <svg
            width={gridWidth - 4}
            x={val.x * gridWidth + 8}
            y={val.y * gridWidth + 8}
            height={gridWidth - 4}
            viewBox="0 0 44 44"
          >
            <Chess color={val.color} />
          </svg>
        );
      })}
    </svg>
  );
}
