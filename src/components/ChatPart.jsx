import {
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ChatMessage from "./ChatMessage";
import { currentRoomContext, sendContext } from "../App";
import { infoContext } from "../App";
import { enqueueSnackbar } from "notistack";
import { ChatMsg } from "../constants/msg_code";
const message = [
  {
    name: "t1",
    pid: "1",
    msg: "hello",
  },
  {
    name: "t2",
    pid: "2",
    msg: "hello,too",
  },
];
export default function ChatPart() {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    //根据msg的修改调用此函数
    // console.log(messagesEndRef.current);
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const [newMsg, setNewMsg] = useState();
  const { currentRoom } = useContext(currentRoomContext);
  const { info } = useContext(infoContext);
  useEffect(() => {
    scrollToBottom();
  }, [currentRoom?.msg]);

  const { sendMessage } = useContext(sendContext);
  const sendMsg = () => {
    if (newMsg == null || newMsg == "") {
      enqueueSnackbar("消息不能为空", { variant: "warnning" });
      return;
    }
    sendMessage(JSON.stringify({ code: ChatMsg, data: newMsg }));
    setNewMsg("");
  };
  return (
    <Box sx={{ height: 590, paddingRight: "20px" }}>
      <Box
        sx={{
          height: 500,
          // borderBottom: "3px solid black",
          overflow: "auto",
          paddingBottom: "10px",
          background: "#fbfbfb",
        }}
      >
        {currentRoom?.msg?.map((msg) => {
          return <ChatMessage msg={msg} flg={msg.from === info.id ? 1 : 0} />;
        })}

        <div ref={messagesEndRef} />
      </Box>

      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <TextField
          value={newMsg}
          onChange={(e) => {
            setNewMsg(e.target.value);
          }}
          fullWidth
          id="filled-basic"
          variant="filled"
          size="small"
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              sendMsg();
            }
          }}
        />
        <IconButton onClick={sendMsg}>
          <SendIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}
