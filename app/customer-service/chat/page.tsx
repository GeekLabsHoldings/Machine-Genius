"use client";
import Dropdown from "@/app/_components/Dropdown/Dropdown";
import OptionsDropdown from "@/app/_components/OptionsDropdown/OptionsDropdown";
import { truncateText } from "@/app/_utils/text";
import styles from "@/app/customer-service/chat/chat.module.css";
import { TextareaAutosize } from "@mui/material";
import { use, useEffect, useRef, useState } from "react";

const messages = [
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
      className={`[background-color:var(--dark)] flex items-center justify-center ${styles.chat__chat__aside__menu__profile} group-hover:[background-color:var(--white)]`}
    >
      {/* <img src="/images/profile.png" alt="profile" /> */}
    </div>
  ) : (
    <div
      className={`[background-color:var(--dark)] flex items-center justify-center ${styles.chat__chat__aside__menu__profile_reversed} group-hover:[background-color:var(--white)]`}
    >
      {/* <img src="/images/profile.png" alt="profile" /> */}
    </div>
  );
}

function page() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className="flex gap-[22px] h-[85vh] py-[1.5vw]">
      {/* 
        chat aside menu 
      */}
      <div className={`flex flex-col h-full ${styles.chat__chat__aside}`}>
        <div>
          <h2 className="mb-5 text-2xl font-semibold">Chats</h2>
          <Dropdown title="Brand" items={["All", "Unread", "Read"]} />
        </div>
        <div
          className={`flex flex-col border-2 [border-color:#DBDBD7] rounded-[20px] h-[50vh] overflow-hidden mt-6 shrink-0 grow py-5 ${styles.chat__chat__aside__menu}`}
        >
          <input
            type="text"
            placeholder="Search"
            className="h-min border mx-5 [border-color:var(--dark)] rounded-[5px] text-sm placeholder:[color:var(--dark)] py-2 px-4 "
          />

          <div className="h-[1px] bg-[#DBDBD7] mt-5 mx-5"></div>
          <ul className="flex flex-col relative max-h-[90%] overflow-y-auto [border-color:#DBDBD7] w-full">
            {messages.map((message, index) => (
              <li
                className={`cursor-pointer ${styles.chat__chat__aside__menu__item} group transition-colors duration-300 ease-in-out hover:[background-color:var(--dark)]`}
                key={index}
              >
                <div className="flex relative mx-5 gap-5 py-[23px] group-hover:border-transparent">
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
          />
          <button>
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

export default page;
