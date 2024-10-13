// @ts-nocheck
"use client";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";
import OptionsDropdown from "@/app/_components/OptionsDropdown/OptionsDropdown";
import { truncateText } from "@/app/_utils/text";
import styles from "@/app/_components/Chat/Chat.module.css";
import { TextareaAutosize } from "@mui/material";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { globalContext } from "@/app/_context/store";
import useChat from "@/app/_hooks/useChat";
import debounce from "debounce";

const ExpandableCircleMenu = ({ isExpanded, handleFileUpload }: any) => {
  const menuItems = [
    {
      icon: (
        <svg
          fill="#000000"
          viewBox="0 0 1920 1920"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[--26px] h-[--26px]"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M425.818 709.983V943.41c0 293.551 238.946 532.497 532.497 532.497 293.55 0 532.496-238.946 532.496-532.497V709.983h96.818V943.41c0 330.707-256.438 602.668-580.9 627.471l-.006 252.301h242.044V1920H667.862v-96.818h242.043l-.004-252.3C585.438 1546.077 329 1274.116 329 943.41V709.983h96.818ZM958.315 0c240.204 0 435.679 195.475 435.679 435.68v484.087c0 240.205-195.475 435.68-435.68 435.68-240.204 0-435.679-195.475-435.679-435.68V435.68C522.635 195.475 718.11 0 958.315 0Z"
              fill-rule="evenodd"
            ></path>{" "}
          </g>
        </svg>
      ),
      label: "Audio",
      color: "#31B2E9B2",
    },

    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[--26px] h-[--26px]"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M13 4H8.8C7.11984 4 6.27976 4 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4 6.27976 4 7.11984 4 8.8V15.2C4 16.8802 4 17.7202 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.27976 20 7.11984 20 8.8 20H15.2C16.8802 20 17.7202 20 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C20 17.7202 20 16.8802 20 15.2V11"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M4 16L8.29289 11.7071C8.68342 11.3166 9.31658 11.3166 9.70711 11.7071L13 15M13 15L15.7929 12.2071C16.1834 11.8166 16.8166 11.8166 17.2071 12.2071L20 15M13 15L15.25 17.25"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M18 8V3M18 3L16 5M18 3L20 5"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      ),
      label: "Media",
      color: "#5FA85BB5",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[--26px] h-[--26px]"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H12M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
            <path
              d="M17.5 21L17.5 15M17.5 15L20 17.5M17.5 15L15 17.5"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      ),
      label: "Files",
      color: "#E1C655B2",
    },
  ];

  return (
    <div className="absolute bottom-[--30px] flex flex-col-reverse items-center">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`
            relative
              w-12 h-12 rounded-full
              }] text-white flex items-center justify-center transition-all duration-300 ease-in-out
              backdrop-blur-xl bg-opacity-90
            ${
              isExpanded
                ? "mb-4 translate-y-0 opacity-100"
                : "mb-0 -translate-y-4 opacity-0"
            }
          `}
          style={{
            boxShadow: `0 0 0 2px white, 0 0 0 4px ${item.color}, 0 0 10px 2px ${item.color}`,
            transitionDelay: `${index * 50}ms`,
            backgroundColor: item.color,
          }}
        >
          {item.icon}
          {index === 2 && (
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          )}
        </button>
      ))}
    </div>
  );
};

const TypingIndicator = ({ firstName, lastName, theme }: any) => {
  return (
    <div className="flex items-center space-x-[--4px] h-full py-[--5px] px-[--10px]">
      <div className={`text-[${theme} text-[--16px]`}>
        {firstName} {lastName} is typing
      </div>
      <div className="flex space-x-[--4px]">
        <div className="w-[--4px] h-[--4px] bg-gray-500 rounded-full animate-bounce"></div>
        <div
          className="w-[--4px] h-[--4px] bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-[--4px] h-[--4px] bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
};

const files = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 10.7777V13.2C22 17.3483 22 19.4226 20.7112 20.7112C19.4226 22 17.3484 22 13.2 22H8.8C4.65166 22 2.57747 22 1.28873 20.7112C0.216975 19.6395 0.036531 18.0245 0.00614896 15.1251H9.56307L7.07731 16.9329C6.70882 17.2008 6.62736 17.7168 6.89534 18.0853C7.16333 18.4538 7.6793 18.5352 8.04779 18.2673L12.5853 14.9673C12.7987 14.8121 12.925 14.564 12.925 14.3001C12.925 14.0361 12.7987 13.7881 12.5853 13.6329L8.04779 10.3329C7.6793 10.0649 7.16333 10.1463 6.89534 10.5148C6.62736 10.8833 6.70882 11.3993 7.07731 11.6673L9.56307 13.4751H1.10149e-05L0 13.2L3.30448e-05 5.44473C3.30448e-05 4.47398 3.30527e-05 3.98853 0.0763181 3.58423C0.412137 1.80434 1.80436 0.412104 3.58425 0.076285C3.98857 7.86781e-09 4.47396 0 5.44475 0C5.87008 0 6.08276 0 6.28715 0.019118C7.16834 0.101519 8.00419 0.447744 8.68556 1.01256C8.84356 1.14357 8.99393 1.29396 9.29478 1.59473L9.9 2.2C10.7974 3.09736 11.2461 3.54604 11.7833 3.84497C12.0786 4.00918 12.3916 4.13886 12.7164 4.23146C13.3077 4.4 13.9423 4.4 15.2112 4.4H15.6223C18.518 4.4 19.9658 4.4 20.9068 5.24641C20.9934 5.32426 21.0758 5.40665 21.1537 5.49321C22 6.43429 22 7.88209 22 10.7777Z"
      fill="#2A2B2A"
    />
  </svg>
);

interface ProfileImageFrameProps {
  reversed?: boolean;
}

function ProfileImageFrame({ reversed }: ProfileImageFrameProps) {
  return reversed ? (
    <div
      className={`[background-color:var(--dark)] flex items-center justify-center ${styles.chat__chat__aside__menu__profile} group-hover:[background-color:var(--white)] shrink-0`}
    >
      {/* <img src="/images/profile.png" alt="profile" /> */}
    </div>
  ) : (
    <div
      className={`[background-color:var(--dark)] flex items-center justify-center ${styles.chat__chat__aside__menu__profile_reversed} group-hover:[background-color:var(--white)] shrink-0`}
    >
      {/* <img src="/images/profile.png" alt="profile" /> */}
    </div>
  );
}

interface ChatProps {
  children: React.ReactNode;
}

// interface Message {
//   _id: string;
//   text: string;
//   sender: {
//     _id: string;
//   };
// }

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

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
}

/*
{
    "sender": {
        "_id": "66a8cefa890901b1d41b323b",
        "firstName": "Andrew",
        "lastName": "Haliem",
        "theme": "#00FFFF"
    },
    "text": "Hello test media message",
    "media": [
        {
            "url": "https://machine-genius.s3.us-east-1.amazonaws.com/receipts/1726557818176",
            "type": "image",
            "_id": "66ea82092499af59b40044c4"
        }
    ],
    "chat": {
        "_id": "66e192b4d17a588344a94284",
        "type": "oneToOne"
    },
    "createdAt": 1726644745282,
    "_id": "66ea82092499af59b40044c3",
    "__v": 0
}
  */

interface Message {
  _id?: string;
  text: string;
  mediaUrl: [
    {
      url: string;
      type: string;
    }
  ];
  createdAt?: number;
  sender: {
    _id: string;
  };
}

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

function Chat() {
  const { authState } = useContext(globalContext);
  // const messagesApi = [
  //   {
  //     name: "John Doe",
  //     message: "Hello, how can I help you today?",
  //     time: "12:00 PM",
  //   },
  //   {
  //     name: "John Doe",
  //     message:
  //       "Hello, how can I help you today? lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //     time: "12:00 PM",
  //   },
  //   {
  //     name: "John Doe",
  //     message: "Hello, how can I help you today?",
  //     time: "12:00 PM",
  //   },
  //   {
  //     name: "John Doe",
  //     message: "Hello, how can I help you today?",
  //     time: "12:00 PM",
  //   },
  //   {
  //     name: "John Doe",
  //     message:
  //       "Hello, how can I help you today? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //     time: "12:00 PM",
  //   },
  //   {
  //     name: "John Doe",
  //     message: "Hello, how can I help you today?",
  //     time: "12:00 PM",
  //   },
  //   {
  //     name: "John Doe",
  //     message: "Hello, how can I help you today?",
  //     time: "12:00 PM",
  //   },
  //   {
  //     name: "John Doe",
  //     message: "Hello, how can I help you today?",
  //     time: "12:00 PM",
  //   },
  // ];
  const ref = useRef<any>(null);
  const [scrolled, setScrolled] = useState(false);
  // const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState<Message>();
  const [toggleCreateGroup, setToggleCreateGroup] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const [currentConversation, setCurrentConversation] = useState(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchBarFocus, setSearchBarFocus] = useState(false);

  const [user, setUser] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("decodedToken");
      return token ? JSON.parse(token) : "";
    } else {
      return authState?.decodedToken || "";
    }
  });

  const unreadRef = useRef<any>([]);
  const initialRef = useRef(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => setIsExpanded(!isExpanded);

  const {
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
  } = useChat();
  // const { sendMessage } = useChat();

  const AddMessage = (message: Message) => {
    if (message.text.trim() === "" && !message?.mediaUrl?.length) return;
    setMessages((prev) => [...prev, message]);
    setInQueueAttachments([]);
  };

  const [messagesUpdated, setMessagesUpdated] = useState(false);
  const [newGroupMembers, setNewGroupMembers] = useState<string[]>([]);

  // useEffect(() => {
  //   if (messagesUpdated && ref.current) {
  //     setTimeout(() => {
  //       ref.current.scrollTop = ref.current.scrollHeight;
  //       setMessagesUpdated(false);
  //     }, 100); // 100ms delay
  //   }
  // }, [messagesUpdated]);

  const scrollTimeoutRef = useRef<any>(null);

  // ... other code ...

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setMessagesUpdated(true);

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set a new timeout
      scrollTimeoutRef.current = setTimeout(() => {
        setMessagesUpdated(true);
      }, 50);
    }
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isLoaded]);

  useLayoutEffect(() => {
    if (messagesUpdated && ref.current) {
      const scrollToBottom = () => {
        requestAnimationFrame(() => {
          ref.current.scrollTop = ref.current.scrollHeight;
        });
      };

      scrollToBottom();

      // Scroll again after a short delay to catch any late updates
      setTimeout(scrollToBottom, 100);

      setMessagesUpdated(false);
    }
  }, [messagesUpdated]);

  // ... rest of the component ...

  useEffect(() => {
    async function fetchEmployees() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/employee/data`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(`
        
        
        
        
        
        ${JSON.stringify(response)}
        
        
        
        
        
        `);
      const data = await response.json();
      console.log(data);
      if (data) {
        setEmployees(data);
      } else {
        console.log(data.message);
      }
    }

    try {
      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function createConversation(
    type: string,
    members: string[],
    groupName?: string
  ) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/conversation/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          type,
          members,
          groupName,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.Success) {
      console.log(data);
      setCurrentConversation(data.result);
      setConversation((prev) => [data.result, ...prev]);
    } else {
      console.log(data.message);
    }
  }

  async function createGroup() {
    console.log(newGroupMembers);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/conversation/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          type: "group",
          members: [user._id, ...newGroupMembers],
          groupName: "New Group",
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.Success) {
      console.log(data);
      setCurrentConversation(data.result);
      setConversation((prev) => [data.result, ...prev]);
    } else {
      console.log(data.message);
    }
    setNewGroupMembers([]);
  }

  useEffect(() => {
    setIsLoaded(false);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight || 0;
    }
    // if (window.localStorage.getItem("decodedToken")) {
    //   setUserId(window.localStorage.getItem("decodedToken")?._id);
    // }

    /*
      fetch messages
    */
    async function fetchMessages() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/conversation/all-messages/${currentConversation?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        console.log(data.messages);
        setMessages(data.messages.reverse());
      } else {
        console.log(data.message);
      }
    }

    try {
      if (currentConversation._id) fetchMessages();
    } catch (error) {
      console.log(error);
    }
  }, [currentConversation]);

  useEffect(() => {
    console.log(messages);
    setIsLoaded(true);
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight || 0;
    }
  }, [messages]);

  /*
    fetch conversation
  */
  async function fetchConversation() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/conversation/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      setConversation(data.result);
    } else {
      console.log(data.message);
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight || 0;
    }
    // const handleScroll = () => {
    //   if (ref.current) {
    //     var limit = Math.max(
    //       ref.current.scrollHeight - ref.current.clientHeight || 0,
    //       0
    //     );

    //     if (ref.current.scrollTop < limit - 11) {
    //       setScrolled(true);
    //     } else {
    //       setScrolled(false);
    //     }
    //   }
    // };

    /*
      fetch conversation
      */

    try {
      fetchConversation();
    } catch (error) {
      console.log(error);
    }
    // ref.current?.addEventListener("scroll", handleScroll);

    // return () => {
    //   ref.current?.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  useEffect(() => {
    console.log(
      `----------------------/n/n/n/n/n/n/n/n------------------------------------`
    );
    console.log(conversation);

    console.log(currentConversation);
    console.log(
      `----------------------/n/n/n/n/n/n/n/n------------------------------------`
    );
    if (searchBarFocus) {
      setSearchBarFocus(false);
    }
    if (conversation.length > 0 && initialRef.current) {
      setCurrentConversation(conversation[0]);
      initialRef.current = false;
    }
  }, [conversation, currentConversation]);

  useEffect(() => {
    console.log(`
      
      

***********************************************************      
      
      
      
      
      ${JSON.stringify(currentConversation)}
      
      
      




      
**************************************************************      
      
      
      
      
      `);
  }, [currentConversation]);

  useEffect(() => {
    const uncheckOnGroupChange = () => {
      document.querySelectorAll("#chat-list input").forEach((checkbox) => {
        (checkbox as HTMLInputElement).checked = false;
      });
    };
    if (toggleCreateGroup) {
      uncheckOnGroupChange();
    }
  }, [toggleCreateGroup]);

  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current.scrollTop = ref.current.scrollHeight || 0;
  //   }
  // }, [isLoaded, messages, currentConversation, conversation, message]);

  // useEffect(() => {
  //   if (isLoaded) {
  //     setMessagesUpdated(true);
  //   }
  // }, [isLoaded]);

  useEffect(() => {
    if (messages.length > 0 && isLoaded) {
      console.log("messages have been seen");
      console.log(isLoaded);
      handleUserSeenMessage();
    }
  }, [handleUserSeenMessage, isLoaded]);

  // const handleTyping = (typing:
  //   setIsTyping
  // };

  // const typingTimeoutRef = useRef<any>(null);

  // useEffOect(() => {
  //   clearTimeout()
  // }

  useEffect(() => {
    console.log(`
################################################################################################
      `);
    console.log(conversation);
    console.log(currentConversation);
    console.log(`
################################################################################################
      `);
  }, [searchBarFocus]);

  const debouncedHandleUserTyping = useCallback(
    debounce(() => {
      handleUserTyping({
        _id: user._id,
        firstName: "John",
        lastName: "Doe",
        theme: "#FF0000",
      });
    }, 500),
    [user._id, handleUserTyping]
  );

  // ===== 01. get Presigned URL =====
  async function getPresignedURL() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/administrative/receipts/presigned-url`,
        {
          headers: {
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
        }
      );
      if (res.status === 401) {
        // handleSignOut();
      }
      const json = await res.json();
      if (!json) {
        // toast.error("Something went wrong!");
        return;
      } else {
        // setPresignedURLData(json);
        return json;
      }
    } catch (error) {
      // toast.error("Something went wrong!");
      console.error("Error getPresignedURL:", error);
    }
  }
  const [presignedURLData, setPresignedURLData] = useState<any>(null);
  const [receiptUrl, setReceiptUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [inQueueAttachments, setInQueueAttachments] = useState<
    {
      url: string;
      type: string;
    }[]
  >([]);

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const presignedURLData = await getPresignedURL();
    console.log(presignedURLData);
    if (presignedURLData) {
      const { presignedURL, receiptUrl } = presignedURLData;
      console.log(presignedURL);
      console.log(receiptUrl);
      const res = await fetch(presignedURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: file,
      });
      if (res.status === 200) {
        setReceiptUrl(receiptUrl);
        setInQueueAttachments((prev) => [
          ...prev,
          { url: receiptUrl, type: "img" },
        ]);

        // AddMessage({
        //   text: receiptUrl,
        //   sender: {
        //     _id: userId,
        //   },
        // });
        // sendMessage({
        //   conversationId: currentConversation._id,
        //   text: receiptUrl,
        // });
      }
    }
  };

  function formatTime(date: Date) {
    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes + ampm;
  }

  return (
    <div className="flex gap-[--22px] h-[85vh] py-[1.5vw]">
      <div
        className={`flex flex-col h-full ${styles.chat__chat__aside} ${
          toggleCreateGroup ? styles.chat__chat__aside__create_group : ""
        }`}
      >
        {/* <div>
          <h2 className="mb-5 text-2xl font-semibold">Chats</h2>
          <Dropdown title="Brand" items={["All", "Unread", "Read"]} />
        </div> */}
        <div
          className={`flex flex-col border-2 [border-color:#DBDBD7] rounded-[20px] h-[50vh] overflow-hidden shrink-0 grow py-[--21px] ${styles.chat__chat__aside__menu}`}
        >
          <div className="flex justify-between items-center mx-5">
            <h2 className="text-[--24px] font-semibold">Chats</h2>
            <button
              className="flex flex-col gap-1 items-center"
              onClick={() => {
                if (newGroupMembers.length > 0) {
                  createGroup();
                }
                setToggleCreateGroup(!toggleCreateGroup);
              }}
            >
              {toggleCreateGroup ? (
                <>
                  <svg
                    viewBox="0 0 27 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[--26px] h-[--26px]"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26.5 13C26.5 20.1796 20.6796 26 13.5 26C6.32029 26 0.5 20.1796 0.5 13C0.5 5.82029 6.32029 0 13.5 0C20.6796 0 26.5 5.82029 26.5 13ZM18.7394 9.06057C19.1202 9.44133 19.1202 10.0587 18.7394 10.4394L12.2394 16.9394C11.8586 17.3202 11.2414 17.3202 10.8606 16.9394L8.26057 14.3394C7.87981 13.9586 7.87981 13.3414 8.26057 12.9606C8.64133 12.5798 9.25867 12.5798 9.63943 12.9606L11.55 14.8711L14.4552 11.9658L17.3606 9.06057C17.7414 8.67981 18.3586 8.67981 18.7394 9.06057Z"
                      fill="#5FA85B"
                    />
                  </svg>
                  <span className="text-[#5FA85B] font-semibold text-[--9px]">
                    Create Group
                  </span>
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[--27px] h-[--26px]"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.97848 4.5221C12.9149 4.5221 15.3063 6.912 15.3063 9.8499V11.3721C15.3063 13.0131 14.5452 14.4638 13.3746 15.4426C14.6411 15.6298 15.8954 15.9129 17.1193 16.3118C18.7663 16.8476 19.873 18.4064 19.873 20.1889V22.8848L19.5122 23.1085C17.5151 24.3507 14.2377 25.8333 9.97848 25.8333C7.62664 25.8333 4.06158 25.3599 0.443229 23.1085L0.0839844 22.8848V20.3366C0.0839844 18.4444 1.28502 16.7974 3.0706 16.2357C4.21989 15.8764 5.392 15.61 6.57326 15.435C5.40874 14.4562 4.65068 13.0085 4.65068 11.3721V9.8499C4.65068 6.912 7.04058 4.5221 9.97848 4.5221ZM16.0065 0C18.9429 0 21.3343 2.3899 21.3343 5.32781V6.85004C21.3343 8.491 20.5732 9.94322 19.4026 10.9205C20.6691 11.1077 21.9219 11.3924 23.1473 11.7897C24.7944 12.3285 25.901 13.8858 25.901 15.6683V18.3642L25.5418 18.588C24.4975 19.238 23.0956 19.9473 21.3952 20.4816V20.1893C21.3952 17.7447 19.8669 15.6044 17.5912 14.8646C17.0959 14.7031 16.5953 14.5584 16.0902 14.4307C16.5713 13.4915 16.8285 12.4473 16.8285 11.3726V9.85035C16.8285 6.48014 14.3793 3.68837 11.1719 3.12057C12.0152 1.28476 13.8571 0 16.0065 0Z"
                      fill="#2A2B2A"
                    />
                  </svg>
                  <span className="text-[#2A2B2A] font-semibold text-[--9px]">
                    New Group
                  </span>
                </>
              )}
            </button>
          </div>
          <div className="h-min flex items-center justify-between border mx-5 my-[--17px] [border-color:var(--dark)] rounded-[--7px] text-sm placeholder:[color:var(--dark)] py-[--8px] px-[--15px]">
            <input
              type="text"
              placeholder="Search"
              className="outline-none grow"
              onFocus={() => setSearchBarFocus(true)}
              // onBlur={() => setSearchBarFocus(false)}
            />
            <svg
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[--20px] h-[--20px] ml-[--5px]"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.246094 10.377C0.246094 4.92206 4.66815 0.5 10.123 0.5C15.5779 0.5 20 4.92206 20 10.377C20 15.8318 15.5779 20.2539 10.123 20.2539C4.66815 20.2539 0.246094 15.8318 0.246094 10.377ZM7.15996 9.88311C7.15996 8.51939 8.26549 7.41387 9.6292 7.41387C10.9929 7.41387 12.0984 8.51939 12.0984 9.88311C12.0984 11.2468 10.9929 12.3523 9.6292 12.3523C8.26549 12.3523 7.15996 11.2468 7.15996 9.88311ZM9.6292 5.43848C7.1745 5.43848 5.18457 7.42841 5.18457 9.88311C5.18457 12.3378 7.1745 14.3277 9.6292 14.3277C10.4989 14.3277 11.3103 14.0779 11.9954 13.6462L13.3754 15.0261C13.7611 15.4118 14.3865 15.4118 14.7722 15.0261C15.1579 14.6404 15.1579 14.015 14.7722 13.6293L13.3923 12.2493C13.824 11.5642 14.0738 10.7528 14.0738 9.88311C14.0738 7.42841 12.0839 5.43848 9.6292 5.43848Z"
                fill="#323232"
              />
            </svg>
          </div>

          <div className="h-[1px] bg-[#DBDBD7] mx-5"></div>
          <ul
            className="flex flex-col relative max-h-[90%] overflow-y-auto [border-color:#DBDBD7] w-full"
            id="chat-list"
          >
            {searchBarFocus || toggleCreateGroup
              ? employees?.map((employee, index) => (
                  <li
                    className={`cursor-pointer ${styles.chat__chat__aside__menu__item} group transition-colors duration-300 ease-in-out hover:[background-color:var(--dark)] !transition-none`}
                    key={index}
                    // ref={(el) => (unreadRef.current = el)}
                    onClick={() => {
                      if (!toggleCreateGroup)
                        createConversation("oneToOne", [
                          user._id,
                          employee._id,
                        ]);
                      else {
                        // create group
                        if (newGroupMembers.includes(employee._id)) {
                          setNewGroupMembers((prev) =>
                            prev.filter((member) => member !== employee._id)
                          );
                        } else {
                          setNewGroupMembers((prev) => [...prev, employee._id]);
                        }
                      }
                    }}
                  >
                    <div className="flex items-center relative mx-5 gap-5 py-[23px] group-hover:border-transparent">
                      <CustomCheckBox
                        checked={newGroupMembers.includes(employee._id)}
                      />
                      <ProfileImageFrame />
                      <div className="flex flex-col justify-center gap-1 w-[80%]">
                        <h3 className="font-bold text-xl transition-colors duration-100">
                          {employee.firstName + " " + employee.lastName}
                        </h3>
                        <p className="text-base [color:#828282] overflow-hidden whitespace-nowrap text-ellipsis">
                          {/* {truncateText(message.lastMessage || "Message", 60)} */}
                        </p>
                      </div>
                      {/* <div className="absolute flex justify-center items-center right-4 top-0 bottom-0">
                        {message.lastSeen < message.updatedAt &&
                        message?._id !== currentConversation?._id &&
                        user._id !==
                          message.members[
                            user._id === message.members[0]?._id ? 1 : 0
                          ]._id ? (
                          <div className="w-3 h-3 rounded-full bg-[#E9313E]"></div>
                        ) : null} 
                      </div> */}
                    </div>
                  </li>
                ))
              : conversation?.map((message: any, index) => (
                  <li
                    className={`cursor-pointer ${styles.chat__chat__aside__menu__item} group transition-colors duration-300 ease-in-out hover:[background-color:var(--dark)]`}
                    key={index}
                    ref={(el: HTMLLIElement | null) => {
                      unreadRef.current = el;
                    }}
                    onClick={() => {
                      unreadRef.current[index] = message.lastSeen;
                      if (!toggleCreateGroup) setCurrentConversation(message);
                    }}
                  >
                    <div className="flex items-center relative mx-5 gap-5 py-[23px] group-hover:border-transparent">
                      <CustomCheckBox />
                      <ProfileImageFrame />
                      <div className="flex flex-col justify-center gap-1 w-[80%]">
                        <h3 className="font-bold text-xl !transition-none">
                          {message.type === "group"
                            ? message.groupName
                            : message.members[
                                user._id === message.members[0]?._id ? 1 : 0
                              ]?.firstName +
                              " " +
                              message.members[
                                user._id === message.members[0]?._id ? 1 : 0
                              ]?.lastName}
                        </h3>
                        <p className="text-base [color:#828282] overflow-hidden whitespace-nowrap text-ellipsis">
                          {truncateText(message.lastMessage || "Message", 60)}
                        </p>
                      </div>
                      <div className="absolute flex justify-center items-center right-4 top-0 bottom-0">
                        {message.lastSeen < message.updatedAt &&
                        message?._id !== currentConversation?._id ? (
                          <div className="w-3 h-3 rounded-full bg-[#E9313E]"></div>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
          <div className="h-[1px] bg-[#DBDBD7] mx-5"></div>
        </div>
      </div>

      {/*
        chat main section / chat Box
      */}
      <div className={`flex flex-col h-full ${styles.chat__box__container}`}>
        <div
          className={`flex justify-between items-center ${styles.chat__box__header}`}
        >
          <div className="flex w-full items-center gap-5">
            <ProfileImageFrame />
            <div className="flex gap-[--8px]">
              <h3 className="font-bold text-[--20px]">
                {currentConversation?.type === "group"
                  ? currentConversation?.groupName
                  : currentConversation?.members[
                      user._id === currentConversation?.members[0]?._id ? 1 : 0
                    ]?.firstName +
                    " " +
                    currentConversation?.members[
                      user._id === currentConversation?.members[0]?._id ? 1 : 0
                    ]?.lastName}
              </h3>
              <button>
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[--15px] h-[--15px]"
                >
                  <path
                    d="M0.453125 7.5C0.453125 8.93855 0.879704 10.3448 1.67892 11.5409C2.47814 12.737 3.61409 13.6693 4.94314 14.2198C6.27218 14.7703 7.73463 14.9143 9.14554 14.6337C10.5564 14.353 11.8524 13.6603 12.8697 12.6431C13.8869 11.6259 14.5796 10.3299 14.8602 8.91898C15.1409 7.50807 14.9968 6.04562 14.4463 4.71658C13.8958 3.38753 12.9636 2.25157 11.7675 1.45236C10.5714 0.653142 9.16511 0.226563 7.72656 0.226562C6.7714 0.226563 5.82559 0.414696 4.94314 0.78022C4.06068 1.14574 3.25887 1.6815 2.58347 2.3569C1.90806 3.0323 1.37231 3.83412 1.00678 4.71658C0.641257 5.59903 0.453124 6.54484 0.453125 7.5ZM11.282 6.21656L9.03113 3.96663L9.91861 3.07916C10.0553 2.94317 10.2403 2.86683 10.4331 2.86683C10.6259 2.86683 10.8109 2.94317 10.9476 3.07916L12.1685 4.30105C12.3045 4.43774 12.3809 4.62271 12.3809 4.81552C12.3809 5.00834 12.3045 5.19331 12.1685 5.33L11.282 6.21656ZM3.72098 11.693C3.60155 11.693 3.53172 11.6011 3.56204 11.4661L4.08846 9.13071C4.13771 8.94876 4.22968 8.7812 4.35673 8.64196L8.51849 4.48019L9.10095 5.0645L4.94011 9.22534L4.70859 8.99382C4.64804 9.06636 4.60217 9.14998 4.57354 9.24004L4.34111 10.2727L4.97502 10.9066L6.00857 10.6751C6.09864 10.646 6.18224 10.5999 6.25478 10.5391L5.45459 9.73982L9.61635 5.57805L10.7675 6.73104L6.60573 10.891C6.46621 11.0183 6.29835 11.1106 6.11606 11.1601L3.7807 11.6866C3.76082 11.6913 3.74048 11.6937 3.72006 11.6939L3.72098 11.693Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </button>
            </div>
          </div>
          <OptionsDropdown
            icon={files}
            options={["Send To Sales Team", "Escalate To Manager"]}
            openIndecator
          />
        </div>
        <div
          className="flex-1 overflow-y-auto"
          ref={ref}
          onScroll={() => {
            console.log(scrolled);
          }}
        >
          {isLoaded ? (
            <div className="flex flex-col gap-8 p-5">
              {messages?.map((message: any, index: number) => (
                <div key={message._id || index}>
                  {conversation &&
                    currentConversation &&
                    unreadRef?.current && (
                      <>
                        {message.createdAt >
                          (unreadRef.current[
                            conversation.indexOf(currentConversation)
                          ] || 0) &&
                        messages[index - 1]?.createdAt <=
                          (unreadRef.current[
                            conversation.indexOf(currentConversation)
                          ] || 0) &&
                        user._id !== message.sender._id ? (
                          <div className="text-center text-[#FFFFFB] font-bold  text-[--16px] bg-[--dark] p-[--10px] my-[--10px]">
                            New Message
                          </div>
                        ) : null}
                      </>
                    )}
                  {/* <div className="text-center text-[#828282] text-sm p-[--10px]">
                    1 New Message
                  </div> */}
                  <div
                    className={`flex gap-5 whitespace-pre-wrap ${
                      message?.sender?._id == user._id
                        ? "items-end flex-row-reverse"
                        : ""
                    }`}
                  >
                    {message?.sender?._id == user._id ? (
                      <ProfileImageFrame reversed />
                    ) : (
                      <ProfileImageFrame />
                    )}
                    <div
                      className={`p-[--15px] rounded-[20px] max-w-[60%] flex flex-col gap-[--10px] ${
                        message?.sender?._id == user._id
                          ? "bg-[#CEEAE9] self-end"
                          : "self-start"
                      } ${styles.chat__box__message__container}`}
                    >
                      {currentConversation?.type === "group" &&
                        message.sender._id !== user._id && (
                          <p className="text-[#2A2B2A] font-semibold text-[--16px]">
                            {message.sender.firstName +
                              " " +
                              message.sender.lastName}
                          </p>
                        )}
                      <p className="break-words">
                        {message?.mediaUrl?.url ? (
                          <img
                            src={message?.mediaUrl?.url}
                            alt="media"
                            className="w-full h-full object-cover rounded-[20px]"
                          />
                        ) : null}

                        {message.text}
                      </p>
                      <p
                        className={`text-[#828282] text-[--10px] place-content-start`}
                      >
                        {formatTime(new Date(message.createdAt))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              {/* Add a sspinner loading animation */}
              <div className="w-10 h-10 border-4 border-t-transparent border-[#DBDBD7] rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <div className="h-[--50px]">
          {/* ... existing message rendering code ... */}
          {isTyping && isTyping[currentConversation._id] && (
            <TypingIndicator
              firstName={isTyping[currentConversation._id]?.user?.firstName}
              lastName={isTyping[currentConversation._id]?.user?.lastName}
              theme={isTyping[currentConversation._id]?.user?.theme}
            />
          )}
        </div>
        {inQueueAttachments.length > 0 && (
          <div className="flex items-center gap-[--25px] px-[--18px] py-[--15px] border-t border-[var(--dark)]">
            {inQueueAttachments.map((attachment, index) => (
              <div
                className="relative w-[--58px] h-[--58px] border-[--1px] border-[var(--dark)] rounded-[12px]"
                key={index}
              >
                <img
                  src={attachment.receiptUrl}
                  alt={attachment.name}
                  className="w-full h-full object-cover rounded-[12px]"
                />
                <div className="absolute -top-[--5px] -right-[--5px] flex items-center justify-center w-[--20px] h-[--20px] bg-[#DBDBD7] rounded-full border-[--2px] border-[var(--white)]">
                  <button
                    onClick={() => {
                      setInQueueAttachments((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-[--15px] h-[--15px]"
                    >
                      <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-[--38px] px-[--18px] py-[--21px] border-t border-[var(--dark)]">
          {/* <textarea
            placeholder="Type a message"
            className="flex-1 resize-none border md:max-w-[90%] lg:max-w-[85%] text-3xl:max-w-[80%] [border-color:var(--dark)] rounded-[12px] py-2 px-4 placeholder:[color:var(--dark)] bg-[#DBDBD73D]"
            rows={1}
          /> */}
          <TextareaAutosize
            className="flex-1 resize-none border [border-color:var(--dark)] rounded-[12px] py-2 px-4 placeholder:[color:var(--dark)] bg-[#DBDBD73D]"
            placeholder="Type your reply here..."
            maxRows={5}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              // Simulate sending typing status to server
              // handleTyping(true);
              // Clear typing status after 2 seconds of inactivity
              // if (typingTimeoutRef.current) {
              //   clearTimeout(typingTimeoutRef.current);
              // }
              debouncedHandleUserTyping();
              // typingTimeoutRef.current = setTimeout(
              //   () => handleTyping(false),
              //   2000
              // );
              console.log(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
                console.log("Enter key pressed");
                setMessage((prev) => prev + "\n");
              }
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage({
                  conversationId: currentConversation?._id,
                  text: message,
                  mediaUrl: {
                    url: inQueueAttachments[0]?.url,
                    type: inQueueAttachments[0]?.type,
                  },
                });
                AddMessage({
                  text: message,
                  mediaUrl: {
                    url: inQueueAttachments[0]?.url,
                    type: inQueueAttachments[0]?.type,
                  },
                  //! Need sender data
                  sender: { _id: user._id },
                  createdAt: new Date().getTime(),
                });
                setMessage("");
              }
            }}
            ref={textareaRef}
          />
          {/* // center the button */}
          <div
            className="relative flex items-center justify-center"
            onClick={toggleMenu}
            ref={menuRef}
          >
            <svg
              viewBox="0 0 27 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[--27px] h-[--28px] cursor-pointer"
            >
              <path
                d="M8.5526 19.8417C8.88102 20.1708 9.37365 20.116 9.70208 19.8417L15.1757 14.3566C15.5589 13.9727 16.2157 13.9178 16.7084 14.3566C17.201 14.7954 17.1463 15.5633 16.7084 16.0021L9.97576 22.6391C8.49787 24.1201 6.03472 24.1201 4.55683 22.6391L4.50209 22.5842C3.0242 21.1033 3.0242 18.635 4.50209 17.154L16.3799 5.25139C17.8578 3.77042 20.321 3.77042 21.7989 5.25139L21.8536 5.30624C23.3315 6.78721 23.3315 9.2555 21.8536 10.7365L21.7989 10.7913C21.5252 11.0656 21.4705 11.4495 21.6894 11.7786C22.0178 12.382 22.2915 13.0402 22.4557 13.6984C22.5652 14.1372 23.0578 14.2469 23.3862 13.9727C23.4744 13.8843 23.5603 13.796 23.6413 13.7113C24.0268 13.3081 24.4175 12.9073 24.7631 12.4696C26.9735 9.66985 26.8011 5.58616 24.246 2.98673C24.2214 2.96174 24.1876 2.94765 24.1526 2.94765C24.1175 2.94765 24.0838 2.93348 24.0588 2.90886C21.2641 0.150322 16.7501 0.163251 13.9715 2.94765L2.09368 14.7954C-0.697893 17.5928 -0.697893 22.1454 2.09368 24.9428L2.20315 25.0525C4.99472 27.8499 9.48313 27.8499 12.2747 25.0525L19.062 18.3059C20.8136 16.5507 20.7589 13.6984 18.9526 11.9432C17.201 10.2428 14.3547 10.3525 12.6579 12.1077L7.29366 17.4831C6.96524 17.8122 6.96524 18.3607 7.29366 18.6898L8.5526 19.8417Z"
                fill="#2A2B2A"
              />
            </svg>
            <ExpandableCircleMenu
              isExpanded={isExpanded}
              handleFileUpload={handleFileUpload}
              // handleImageUpload={handleImageUpload}
              // handleAudioUpload={handleAudioUpload}
            />
          </div>
          <button
            onClick={() => {
              sendMessage({
                conversationId: currentConversation?._id,
                text: message,
                mediaUrl: inQueueAttachments,
              });
              AddMessage({
                text: message,
                mediaUrl: inQueueAttachments,
                sender: {
                  _id: user._id,
                  firstName: "You",
                  lastName: "You",
                  theme: "light",
                },
                createdAt: new Date().getTime(),
              });
              setMessage("");
            }}
          >
            <svg
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[--25px] h-[--24px]"
            >
              <path
                d="M24.7668 11.9598C24.7679 12.4633 24.6279 12.9567 24.3633 13.3828C24.0986 13.8088 23.7201 14.1499 23.2718 14.3664L4.05915 23.5942C3.70751 23.7886 3.31797 23.9021 2.9182 23.9266C2.48072 23.9257 2.05042 23.8139 1.66647 23.6013C1.28252 23.3886 0.957122 23.0821 0.719894 22.7094C0.482667 22.3367 0.341148 21.9098 0.308221 21.4675C0.275295 21.0252 0.352007 20.5816 0.531374 20.177L3.52146 13.2894H10.7868C11.1347 13.2894 11.4682 13.1493 11.7142 12.9C11.9601 12.6506 12.0983 12.3124 12.0983 11.9598C12.0983 11.6071 11.9601 11.2689 11.7142 11.0196C11.4682 10.7702 11.1347 10.6301 10.7868 10.6301H3.52146L0.531374 3.80902C0.314713 3.31333 0.252663 2.76235 0.353541 2.22991C0.454419 1.69746 0.713404 1.20901 1.09579 0.829993C1.47817 0.450981 1.96568 0.199525 2.49298 0.109327C3.02028 0.019128 3.56217 0.0944963 4.04603 0.325331L23.2586 9.55311C23.7094 9.7677 24.0907 10.108 24.3577 10.5342C24.6248 10.9604 24.7667 11.4548 24.7668 11.9598Z"
                fill="#2A2B2A"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
