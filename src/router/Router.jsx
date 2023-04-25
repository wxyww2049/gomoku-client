import React, { useContext, useEffect } from "react";
import {
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Hall from "../home/Hall";
import { currentRoomContext } from "../App";
import Room from "../room/Room";
import { Box } from "@mui/material";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="/hall" element={<Hall />} />
          <Route path="/room" element={<Room />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

const Index = () => {
  const currentRoom = useContext(currentRoomContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentRoom.currentRoom) {
      navigate("/room");
    } else navigate("/hall");
  }, [currentRoom.currentRoom]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          minWidth: "800px",
          maxWidth: "1500px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
