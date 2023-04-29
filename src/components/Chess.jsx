import React, { useEffect } from "react";
import { ReactComponent as WhiteChess } from "../assets/svg/stone_-1.svg";
import { ReactComponent as BlackChess } from "../assets/svg/stone_1.svg";
export default function Chess(props) {
  useEffect(() => {
    console.log(props.color);
  }, [props.color]);
  return <>{props.color === 1 ? <BlackChess /> : <WhiteChess />}</>;
}
