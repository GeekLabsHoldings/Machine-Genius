import { useState, useEffect, useCallback, useContext } from "react";
import { useSocket } from "@/app/_context/SocketProvider";
import { globalContext } from "@/app/_context/store";

const useChat = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState<string[]>([]);
  const [currentConversation, setCurrentConversation] = useState<any>(null);
  const { authState } = useContext(globalContext);

  function getToken() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      return token ? `Bearer ${token}` : null;
    } else {
      return `Bearer ${authState?.token}` || null;
    }
  }

  // function ge

  function getUserId() {
    // console.log("User", JSON.parse(user)._id);
    // console.log("User", authState?.decodedToken._id);
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("decodedToken");
      // console.log("User", JSON.parse(user));
      // console.log("User", authState?.decodedToken);
      return user ? JSON.parse(user)._id : null;
    } else {
      return authState?.decodedToken?._id || null;
    }
  }
  // Send a new message
  const sendMessage = useCallback(
    (message: { conversationId: string; text: string }) => {
      if (socket) {
        console.log("Sending message", message.text);
        if (message.text.trim()) {
          console.log("Sending message", message);
          socket.emit("sendMessage", message);
        }
      }
    },
    [socket]
  );

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      console.log("Hellllooooo");
      let data = null;
      if (event[0]) {
        console.log(event);
        data = event[0];
      }
      if (!data) return;
      console.log("User", getUserId());
      console.log("Sender", data.sender);
      console.log("Chat", data.chat);
      console.log("Current", currentConversation);
      if (
        data.sender === getUserId() ||
        data.chat !== currentConversation._id
      ) {
        console.log("quittingggggggggggggggg");
        return;
      }
      setMessages((prev) => [
        ...prev,
        {
          text: data.text,
          sender: {
            _id: data.sender,
          },
        },
      ]);
    };

    // socket.on("message", handleMessage);

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, currentConversation]);

  return {
    messages,
    sendMessage,
    setMessages,
    currentConversation,
    setCurrentConversation,
  };
};

export default useChat;
