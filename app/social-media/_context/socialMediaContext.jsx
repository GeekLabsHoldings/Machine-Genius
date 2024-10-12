"use client";
import { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";
import { globalContext } from "@/app/_context/store";
// import useSessionStorage from "@/app/_hooks/useSessionStorage";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import profileImg1 from "@/public/assets/profile_avatar_placeholder.png";
import { truncateText } from "@/app/_utils/text";

const initialContextState = {
  // ===== 01. Start =====
  // ===== 01. End =====
};

// 1- create context, export it
export const socialMediaContext = createContext(initialContextState);

// 2- provide context, export it
export default function SocialMediaContextProvider({ children }) {
  const { authState, handleSignOut } = useContext(globalContext);
  //   const router = useRouter();
  //   const path = usePathname();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    function getToken() {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        return token ? `Bearer ${token}` : null;
      } else {
        return `Bearer ${authState?.token}` || null;
      }
    }
    // Connect to the Socket.IO server
    // todo: change to .env
    const newSocket = io("wss://api-development.machinegenius.io", {
      reconnectionAttempts: 5, // optional, manage reconnection logic
      auth: {
        token: getToken(), // Pass your authorization token here
      },
      // transports: ["websocket"], // Use WebSocket transport
    });

    setSocket(newSocket);

    return () => {
      // Disconnect socket on cleanup
      newSocket.disconnect();
    };
  }, [authState.token]);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Connected to socket server");
      // toast.success("Connected to socket server");
    });

    socket.on("NewTweets", (data) => {
      console.log("Received NewTweets data:", data);

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } w-1/3 bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={profileImg1.src}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {data.accountName}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {truncateText(data.content, 60)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        ),
        {
          duration: 10000,
          position: "top-right",
        }
      );
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
      // toast.error("Disconnected from socket server");
    });

    // Clean up event listeners on component unmount
    return () => {
      socket.off("connect");
      socket.off("NewTweets");
      socket.off("disconnect");
    };
  }, [socket]);

  // Create a context value object
  const contextValue = {
    // ===== 01. Start =====
    // ===== 01. End =====
  };

  return (
    // to provide what i created
    <socialMediaContext.Provider value={contextValue}>
      {children}
    </socialMediaContext.Provider>
  );
}
