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
  ExitRoom,
  Fail,
  GetAllRoom,
  InfoMsg,
  PlayerRename,
  UpdateRoomAndPlayer,
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
          enqueueSnackbar(msg.data, { variant: "error" });
          break;
        case GetAllRoom:
          setRooms(msg.data);
          break;
        case UpdateRoomAndPlayer:
          setCurrentRoom(msg.data.room);
          setInfo(msg.data.info);
          break;
        case PlayerRename:
          setInfo(msg.data);
          break;
        case Connect:
          setInfo(msg.data);
          break;
        case ExitRoom:
          setCurrentRoom(null);
          break;
        case InfoMsg:
          enqueueSnackbar(msg.data, { variant: "info" });
          break;
        default:
          enqueueSnackbar("未知的消息类型" + msg.code, { variant: "error" });
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
