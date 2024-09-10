import { useState, useEffect, useCallback, useContext } from "react";
import { useSocket } from "@/app/_context/SocketProvider";
import { globalContext } from "@/app/_context/store";

interface Conversation {
  _id: string;
  type: string;
  name: string;
  groupName: string;
  lastMessage: string;
  lastSeen: string;
  updatedAt: string;
}

const useChat = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState<string[]>([]);
  const [currentConversation, setCurrentConversation] = useState<any>(null);
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const { authState } = useContext(globalContext);

  function updateConversation(conversation: any) {
    console.log(`Updating conversation


    id: ${conversation._id}
    text: ${conversation.text}
    lastSeen: ${conversation.lastSeen}
    updatedAt: ${conversation.updatedAt}

    `);

    setConversation((prev) => {
      const index = prev.findIndex((c) => c._id === conversation._id);
      if (index === -1) {
        return prev;
      }
      const newConversations = [...prev];
      newConversations[index].lastMessage = conversation.lastMessage;
      if (conversation.lastSeen) {
        newConversations[index].lastSeen = conversation.lastSeen;
      }
      newConversations[index].updatedAt = conversation.updatedAt;
      // remove updated conversation from the list & add it to the top
      const updatedConversation = newConversations.splice(index, 1);
      newConversations.unshift(updatedConversation[0]);
      console.log("New Conversations", newConversations);
      return newConversations;
    });
  }

  useEffect(() => {
    console.log("new conversation", conversation);
  }, [conversation]);

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

  // function to handle user seeing a message
  const handleUserSeenMessage = useCallback(() => {
    if (socket && currentConversation) {
      socket.emit("userSeenMessage", {
        conversationId: currentConversation._id,
        userId: getToken(),
      });

      // Update the conversation to mark the message as seen
      console.log("Updating conversation", currentConversation);
      setConversation((prev) => {
        const index = prev.findIndex((c) => c._id === currentConversation._id);
        if (index === -1) {
          return prev;
        }
        const newConversations = [...prev];
        newConversations[index].lastSeen = new Date().getTime();
        return newConversations;
      });
    }
  }, [socket, currentConversation]);

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
      updateConversation({
        _id: data.chat,
        lastMessage: data.text,
        lastSeen:
          data.chat === currentConversation._id ? new Date().getTime() : null,
        updatedAt: new Date().getTime(),
      });

      // Automatically mark the message as seen
      // handleUserSeenMessage();
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
    conversation,
    setConversation,
    handleUserSeenMessage,
  };
};

export default useChat;
