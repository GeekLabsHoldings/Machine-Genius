"use client";
import CheckBox from "@/app/_components/CheckBox/CheckBox";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";
import OptionsDropdown from "@/app/_components/OptionsDropdown/OptionsDropdown";
import { truncateText } from "@/app/_utils/text";
import styles from "@/app/customer-service/chat/chat.module.css";
import { TextareaAutosize } from "@mui/material";
import { useEffect, useRef, useState } from "react";

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

function Page() {
  const messagesApi = [
    {
      name: "John Doe",
      message: "Hello, how can I help you today?",
      time: "12:00 PM",
    },
    {
      name: "John Doe",
      message:
        "Hello, how can I help you today? lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      time: "12:00 PM",
    },
    {
      name: "John Doe",
      message: "Hello, how can I help you today?",
      time: "12:00 PM",
    },
    {
      name: "John Doe",
      message: "Hello, how can I help you today?",
      time: "12:00 PM",
    },
    {
      name: "John Doe",
      message:
        "Hello, how can I help you today? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      time: "12:00 PM",
    },
    {
      name: "John Doe",
      message: "Hello, how can I help you today?",
      time: "12:00 PM",
    },
    {
      name: "John Doe",
      message: "Hello, how can I help you today?",
      time: "12:00 PM",
    },
    {
      name: "John Doe",
      message: "Hello, how can I help you today?",
      time: "12:00 PM",
    },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [messages, setMessages] = useState(messagesApi);
  const [message, setMessage] = useState("");
  const [toggleCreateGroup, setToggleCreateGroup] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const AddMessage = (message: string) => {
    setMessages([
      ...messages,
      {
        name: "John Doe",
        message: message,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight || 0;
    }
  }, [messages]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight || 0;
    }
    const handleScroll = () => {
      if (ref.current) {
        var limit = Math.max(
          ref.current.scrollHeight - ref.current.clientHeight || 0,
          0
        );

        if (ref.current.scrollTop < limit - 11) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };

    ref.current?.addEventListener("scroll", handleScroll);

    return () => {
      ref.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  return (
    <div className="flex gap-[22px] h-[85vh] py-[1.5vw]">
      {/* 
        chat aside menu 
      */}
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
              onClick={() => setToggleCreateGroup(!toggleCreateGroup)}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
            </button>
          </div>
          <div className="h-min flex items-center justify-between border mx-5 my-[--17px] [border-color:var(--dark)] rounded-[--7px] text-sm placeholder:[color:var(--dark)] py-[--8px] px-[--15px]">
            <input
              type="text"
              placeholder="Search"
              className="outline-none grow"
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
            {messages.map((message, index) => (
              <li
                className={`cursor-pointer ${styles.chat__chat__aside__menu__item} group transition-colors duration-300 ease-in-out hover:[background-color:var(--dark)]`}
                key={index}
              >
                <div className="flex items-center relative mx-5 gap-5 py-[23px] group-hover:border-transparent">
                  <CustomCheckBox />
                  <ProfileImageFrame />
                  <div className="flex flex-col justify-center gap-1 w-[80%]">
                    <h3 className="font-bold text-xl transition-colors duration-100">
                      {message.name}
                    </h3>
                    <p className="text-base [color:#828282] overflow-hidden whitespace-nowrap text-ellipsis">
                      {truncateText(message.message, 60)}
                    </p>
                  </div>
                  <div className="absolute flex justify-center items-center right-4 top-0 bottom-0">
                    <div className="w-3 h-3 rounded-full bg-[#E9313E]"></div>
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
            <ProfileImageFrame reversed />
            <div>
              <h3 className="font-bold text-2xl">John Doe</h3>
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
          <div className="flex flex-col gap-8 p-5">
            {messages.map((message, index: number) => (
              <div key={index}>
                <div
                  className={`flex gap-5 ${
                    index % 2 === 0 ? "items-end flex-row-reverse" : ""
                  }`}
                >
                  {index % 2 === 0 ? (
                    <ProfileImageFrame />
                  ) : (
                    <ProfileImageFrame reversed />
                  )}
                  <div
                    className={`p-3 rounded-[20px] max-w-[60%] ${
                      index % 2 === 0 ? "bg-[#CEEAE9] self-end" : "self-start"
                    } ${styles.chat__box__message__container}`}
                  >
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-[18px] py-[21px] border-t border-[var(--dark)]">
          {/* <textarea
            placeholder="Type a message"
            className="flex-1 resize-none border md:max-w-[90%] lg:max-w-[85%] text-3xl:max-w-[80%] [border-color:var(--dark)] rounded-[12px] py-2 px-4 placeholder:[color:var(--dark)] bg-[#DBDBD73D]"
            rows={1}
          /> */}
          <TextareaAutosize
            className="flex-1 resize-none border md:max-w-[90%] lg:max-w-[85%] text-3xl:max-w-[80%] [border-color:var(--dark)] rounded-[12px] py-2 px-4 placeholder:[color:var(--dark)] bg-[#DBDBD73D]"
            placeholder="Type your reply here..."
            maxRows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                AddMessage(message);
                setMessage("");
              }
            }}
            ref={textareaRef}
          />
          <button onClick={() => AddMessage(message)}>
            <svg
              width="40"
              height="39"
              viewBox="0 0 40 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 19.4351C40.0018 20.2583 39.773 21.0651 39.3403 21.7616C38.9076 22.4582 38.2887 23.0159 37.5557 23.3698L6.14463 38.4565C5.56973 38.7743 4.93286 38.9599 4.27926 39C3.56403 38.9985 2.86052 38.8156 2.23279 38.468C1.60507 38.1204 1.07307 37.6192 0.685217 37.0099C0.297369 36.4006 0.0659961 35.7026 0.012164 34.9795C-0.0416681 34.2564 0.0837501 33.5311 0.377 32.8697L5.26555 21.609H17.1439C17.7125 21.609 18.2579 21.38 18.66 20.9723C19.0621 20.5646 19.288 20.0117 19.288 19.4351C19.288 18.8586 19.0621 18.3057 18.66 17.898C18.2579 17.4903 17.7125 17.2613 17.1439 17.2613H5.26555L0.377 6.10929C0.0227774 5.29889 -0.0786688 4.39807 0.0862584 3.52757C0.251186 2.65707 0.674606 1.85848 1.29977 1.23882C1.92494 0.619169 2.72197 0.208059 3.58407 0.0605917C4.44616 -0.0868758 5.33211 0.0363454 6.12319 0.413741L37.5343 15.5004C38.2713 15.8513 38.8946 16.4076 39.3312 17.1044C39.7679 17.8012 39.9998 18.6096 40 19.4351Z"
                fill="#231F20"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
