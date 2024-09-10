"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { globalContext } from "@/app/_context/store";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useContext(globalContext);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    function getToken() {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        return token ? `Bearer ${token}` : null;
      } else {
        return `Bearer ${authState?.token}` || null;
      }
    }
    console.log("getToken", getToken());
    const newSocket = io("wss://api.machinegenius.io", {
      reconnectionAttempts: 5, // optional, manage reconnection logic
      auth: {
        token: getToken(),
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    newSocket.on("message", (data) => {
      console.log("Message from server:", data);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    return () => {
      newSocket.disconnect(); // Clean up on unmount
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
