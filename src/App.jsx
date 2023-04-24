import Router from "./router/Router";
import "./App.css";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { socketUrl } from "./constants/url";
import { createContext, useContext, useEffect, useState } from "react";
import {
  Connect,
  CreateRoom,
  EnterRoom,
  Fail,
  GetAllRoom,
  PlayerRename,
} from "./constants/msg_code";
export const sendContext = createContext();
export const roomsContext = createContext();
export const infoContext = createContext();
export const currentRoomContext = createContext();
function MyApp() {
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [info, setInfo] = useState({ name: "unNamed" });
  useEffect(() => {
    if (lastMessage) {
      var msg = JSON.parse(lastMessage.data);
      console.log(msg);
      // setRooms([]);
      switch (msg.code) {
        case Fail:
          enqueueSnackbar("发生错误", { variant: "error" });
          break;
        case GetAllRoom:
          setRooms(msg.data);
          break;
        case CreateRoom:
          setCurrentRoom(msg.data);
          break;
        case EnterRoom:
          setCurrentRoom(msg.data);
          break;
        case PlayerRename:
          setInfo(msg.data);
          break;
        case Connect:
          setInfo(msg.data);
          // console.log(msg.data);
          break;
        default:
          enqueueSnackbar("未知的消息", { variant: "error" });
          break;
      }
    }
  }, [lastMessage]);

  return (
    <infoContext.Provider value={{ info, setInfo }}>
      <roomsContext.Provider value={{ rooms, setRooms }}>
        <sendContext.Provider value={{ sendMessage }}>
          <currentRoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
            <Router />
          </currentRoomContext.Provider>
        </sendContext.Provider>
      </roomsContext.Provider>
    </infoContext.Provider>
  );
}
const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
};
export default App;
