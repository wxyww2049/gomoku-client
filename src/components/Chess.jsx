import React, { useEffect } from "react";
import { ReactComponent as WhiteChess } from "../assets/svg/stone_-1.svg";
import { ReactComponent as BlackChess } from "../assets/svg/stone_1.svg";
import { ReactComponent as LastChess1 } from "../assets/svg/stone_01.svg";
import { ReactComponent as LastChess0 } from "../assets/svg/stone_0-1.svg";
import { Box } from "@mui/material";

export default function Chess(props) {
  useEffect(() => {
    console.log(props.color);
  }, [props.color]);
  return (
    <>
      {!props.last && (props.color === 1 ? <BlackChess /> : <WhiteChess />)}
      {props.last && (props.color === 1 ? <LastChess1 /> : <LastChess0 />)}
    </>
  );
}
