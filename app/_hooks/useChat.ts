import { useState, useEffect, useCallback, useContext } from "react";
import { useSocket } from "@/app/_context/SocketProvider";
import { globalContext } from "@/app/_context/store";

interface Conversation {
  _id: string;
  type: string;
  lastMessage: string;
  lastSeen: number;
  updatedAt: number;
  members: {
    _id: string;
    firstName: string;
    lastName: string;
  }[];
}

interface Message {
  [x: string]: any;
  text: string;
  sender: {
    _id: string;
  };
}

const useChat = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentConversation, setCurrentConversation] = useState<any>(null);
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTyping, setIsTyping] = useState<{ [key: string]: any } | null>(null);
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
    (message: { conversationId: string; text: string; mediaUrl: string }) => {
      if (socket) {
        console.log("Sending message", message.text);
        if (message.text.trim()) {
          console.log("Sending message", message);
          socket.emit("sendMessage", message);
          updateConversation({
            _id: message.conversationId,
            lastMessage: message.text,
            lastSeen: new Date().getTime(),
            updatedAt: new Date().getTime(),
          });
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

  // Listen for typing events
  const handleUserTyping = useCallback(
    (user: {
      _id: string;
      firstName: string;
      lastName: string;
      theme: string;
    }) => {
      if (socket && currentConversation) {
        console.log("User typing", user);
        socket.emit("userTyping", {
          conversationId: currentConversation._id,
          user,
        });
      }
    },
    [socket, currentConversation]
  );

  useEffect(() => {
    if (!socket) return;

    const handleTyping = (event: { [key: string]: any }) => {
      console.log("Typing event", event);
      if (event.user._id === getUserId()) {
        return;
      }
      setIsTyping((prev) => {
        if (!prev) {
          return { [event.conversationId]: { user: event.user } };
        }
        return { ...prev, [event.conversationId]: { user: event.user } };
      });
      setTimeout(() => {
        setIsTyping((prev) => {
          if (!prev) {
            return null;
          }
          const newTyping = { ...prev };
          delete newTyping[event.conversationId];
          return newTyping;
        });
      }, 2000);
    };

    socket.on("userTyping", handleTyping);

    return () => {
      socket.removeListener("userTyping", handleTyping);
    };
  }, [socket, currentConversation]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: { [key: string]: any }) => {
      console.log("Hellllooooo");
      let data = null;
      console.log("Event", event);
      if (event.chat) {
        console.log(event);
        data = event;
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
          mediaUrl: data.mediaUrl,
          sender: {
            _id: data.sender,
          },
          createdAt: data.createdAt,
        },
      ]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.removeListener("message", handleMessage);
    };
  }, [socket, currentConversation]);

  useEffect(() => {
    setIsLoaded((prev) => {
      if (prev) {
        return true;
      }
      if (messages.length > 0) {
        return true;
      }
      return false;
    });
  }, [messages]);

  return {
    messages,
    sendMessage,
    setMessages,
    currentConversation,
    setCurrentConversation,
    conversation,
    setConversation,
    handleUserSeenMessage,
    isLoaded,
    setIsLoaded,
    isTyping,
    setIsTyping,
    handleUserTyping,
  };
};

export default useChat;
