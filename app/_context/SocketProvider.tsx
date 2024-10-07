"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import styles from "@/app/_components/Chat/Chat.module.css";
import { data } from "jquery";

const SocketContext = createContext<Socket | null>(null);

<div
  className={`[background-color:var(--dark)] flex items-center justify-center ${styles.chat__chat__aside__menu__profile_reversed} group-hover:[background-color:var(--white)] shrink-0`}
>
  {/* <img src="/images/profile.png" alt="profile" /> */}
</div>;

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
    const newSocket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
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

      let message = "";
      if (data[0]) message = data[0].text;
      else if (data) message = data.text;

      if (message)
        toast(() => (
          <div className="flex items-center justify-between gap-[--50px] pr-[--40px]">
            <div
              className={`[background-color:var(--dark)] flex items-center justify-center ${styles.chat__chat__aside__menu__profile_reversed} group-hover:[background-color:var(--white)] shrink-0`}
            >
              {/* <img src="/images/profile.png" alt="profile" /> */}
            </div>
            <div className="text-[--20px]">{message}</div>
          </div>
        ));
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    // setTimeout(() => {
    //   newSocket.disconnect(); // Clean up on unmount
    // }, 15000);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
