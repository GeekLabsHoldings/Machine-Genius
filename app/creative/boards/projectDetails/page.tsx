"use client";
import React, { useState } from "react";
import styles from "./details.module.css";
import QuarterCircles from "@/app/_components/Creative/QuarterCircles/QuarterCircles";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useRouter } from "next/navigation";

const plusIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.31852 10.3277C5.31348 10.834 5.71976 11.2485 6.22601 11.2535C6.73226 11.2585 7.14672 10.8523 7.15177 10.346L7.18832 6.67953L10.8548 6.71609C11.3611 6.72113 11.7755 6.31485 11.7806 5.8086C11.7856 5.30235 11.3793 4.88789 10.8731 4.88284L7.20659 4.84629L7.24315 1.17981C7.24819 0.673567 6.84191 0.259095 6.33566 0.254048C5.82941 0.249001 5.41495 0.65529 5.4099 1.16153L5.37335 4.82802L1.70687 4.79146C1.20064 4.78642 0.786155 5.1927 0.781108 5.69895C0.776061 6.2052 1.18236 6.61966 1.68859 6.6247L5.35508 6.66126L5.31852 10.3277Z"
      fill="#FFFFFB"
    />
  </svg>
);

const verticalDots = (
  <svg
    width="6"
    height="21"
    viewBox="0 0 6 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="2.98486" cy="2.28955" r="2.28955" fill="#ACACAC" />
    <circle cx="2.98486" cy="10.3032" r="2.28955" fill="#ACACAC" />
    <circle cx="2.98486" cy="18.3169" r="2.28955" fill="#ACACAC" />
  </svg>
);

const checkIcon = (
  <svg
    className=" me-[0.433vw]"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.02344 1.98438C1.02344 1.43209 1.47115 0.984375 2.02344 0.984375H10.3264C10.8787 0.984375 11.3264 1.43209 11.3264 1.98437V9.99949C11.3264 10.7107 10.7498 11.2874 10.0385 11.2874H2.31131C1.60004 11.2874 1.02344 10.7107 1.02344 9.99949V1.98438Z"
      stroke="#595958"
      strokeWidth="0.801342"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.1058 4.84766L6.23717 6.71629C5.84664 7.10682 5.21348 7.10682 4.82295 6.71629L4.24219 6.13553"
      stroke="#595958"
      strokeWidth="0.801342"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const checkboxIcon = (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="12" height="12" rx="0.5" stroke="#2A2B2A" />
  </svg>
);

const Page = () => {
  const router = useRouter();

  const [startDate, setStartDate] = useState("2024-04-04");
  const [dueDate, setDueDate] = useState("2024-04-04");
  const [counter, setCounter] = useState(0);

  // handle change in date input

  function handleDateInput(e: any) {
    setCounter((prev: number) => prev + 1);

    if (counter % 2 == 0) {
      setStartDate(
        `${e.$y}-${e.$M + 1 < 10 ? `0${e.$M + 1}` : e.$M + 1}-${
          e.$D < 10 ? `0${e.$D}` : e.$D
        }`
      );
      console.log(counter);
    } else if (counter % 2 != 0) {
      setDueDate(
        `${e.$y}-${e.$M + 1 < 10 ? `0${e.$M + 1}` : e.$M + 1}-${
          e.$D < 10 ? `0${e.$D}` : e.$D
        }`
      );
      console.log(counter);
    }
  }

  // State for handling modal visibility and date selection
  const [isOpen, setIsOpen] = useState(false);

  // State for managing list of tasks
  const [checkListData, setCheckListData] = useState([
    "15 mins call with client",
    "15 mins call with client",
    "15 mins call with client",
  ]);

  // State for managing newly added task
  const [itemAdded, setItemAdded] = useState("");

  return (
    <div className={`${styles.details} mt-[4.6vh] `}>
      {/* Container for the details */}
      <div className=" flex justify-between items-center mb-[0.568vw] ">
        {/* Title and member information */}
        <h4
          onClick={() => {
            router.back();
          }}
          className={`${styles.heading} relative cursor-pointer`}
        >
          ST Suite
        </h4>
        <div
          className={`bg-[var(--dark)] ${styles.members} h-fit rounded-md flex items-center`}
        >
          {/* Member count and color indicators */}
          <p className=" text-white text-[0.568vw] font-medium me-2">
            Members (4)
          </p>{" "}
          <div className="flex-shrink-0">
            <QuarterCircles
              colors={["#EAD787", "#6FC9EE", "#8DC189", "#F06F77"]}
            />
          </div>
          <div></div>
        </div>
      </div>
      {/* Grid layout for individual cards */}
      <div className=" grid grid-cols-4 gap-[1.142vw]">
        {/* First card */}
        <div
          className={`${styles.card} md:col-span-1 col-span-2 md:self-start self-stretch px-[1.419vw] py-[2.4vh] border-[1.48px] boreder-[#DBDBD7]`}
        >
          {/* Card title */}
          <div className=" flex justify-between items-center pb-[2.1vh] border-b-2 border-[#2A2B2A]">
            <h5>On Boarding</h5>
            {/* Dummy icon */}
            {verticalDots}
          </div>
          {/* Sub-cards */}
          <div className="my-[2.1vh]">
            {/* First sub-card */}
            <div
              className={`${styles.smallCard} py-[1.6vh] px-[0.649vw] mb-[1.2vh]`}
            >
              <h6 className=" mb-[1.6vh] font-medium">Kick off Call</h6>
              {/* Details */}
              <div className=" flex justify-between items-center">
                {/* Date and Task Status */}
                <div className="flex items-center">
                  <span className=" px-[0.426vw] py-[0.5vh] bg-[#E1C655B2] text-[0.8vw] rounded-[3.43px] font-medium me-[0.642vw]">
                    May 9
                  </span>
                  <p className="text-[#595958] flex items-center">
                    {checkIcon}
                    0/4 Tasks
                  </p>
                </div>
                {/* Quarter Circles */}
                <div className="flex-shrink-0">
                  <QuarterCircles colors={["#6FC9EE"]} />
                </div>
              </div>
            </div>
            <div
              className={`${styles.smallCard} py-[1.6vh] px-[0.649vw] mb-[1.2vh]`}
            >
              <h6>Website Goals</h6>
            </div>
            {/* Brief */}
            <div
              className={`${styles.smallCard} py-[1.6vh] px-[0.649vw] flex justify-between`}
            >
              <h6>Brief</h6>
              <div className="flex-shrink-0">
                <QuarterCircles colors={["#6FC9EE", "#8DC189", "#F06F77"]} />
              </div>
            </div>
          </div>
          <CustomBtn
            onClick={() => {
              setIsOpen(true);
            }}
            width="w-full"
            btnColor="white"
            word="Add Card"
            icon={plusIcon}
          />
        </div>
        {/* Card */}
        <div
          className={`${styles.card} md:col-span-1 col-span-2 px-[1.419vw] py-[2.4vh] border-[1.48px] boreder-[#DBDBD7] md:self-start self-stretch`}
        >
          <div className=" flex justify-between items-center pb-[2.1vh] border-b-2 border-[#2A2B2A]">
            <h5>UX Research</h5>
            {verticalDots}
          </div>
          <div className="my-[2.1vh]">
            {/* UX Research details */}
            <div
              className={`${styles.smallCard} py-[1.6vh] px-[0.649vw] mb-[1.2vh]`}
            >
              <h6 className=" mb-[1.6vh] font-medium">User Research</h6>
              <div className=" flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-[#595958] flex items-center">
                    {checkIcon}
                    0/4 Tasks
                  </p>
                </div>
                <QuarterCircles colors={["#6FC9EE"]} />
              </div>
            </div>
            <div
              className={`${styles.smallCard} py-[1.6vh] px-[0.649vw] mb-[1.2vh]`}
            >
              <h6 className=" mb-[1.6vh] font-medium">User Interviews</h6>
              <div className=" flex justify-between items-center">
                <div className="flex items-center">
                  <span className=" px-[0.426vw] py-[0.5vh] bg-[#8DC189] text-[0.8vw] rounded-[3.43px] font-medium me-[0.642vw]">
                    June 20
                  </span>
                  <p className="text-[#595958] flex items-center">
                    {checkIcon}
                    0/4 Tasks
                  </p>
                </div>
                <QuarterCircles colors={["#6FC9EE"]} />
              </div>
            </div>
            <div
              className={`${styles.smallCard} py-[1.6vh] px-[0.649vw] mb-[1.2vh]`}
            >
              <h6 className=" mb-[1.6vh] font-medium">Wire Framing</h6>
              <div className=" flex justify-between items-center">
                <div className="flex items-center">
                  <span className=" px-[0.426vw] py-[0.5vh] bg-[#F06F77] text-[0.8vw] rounded-[3.43px] font-medium me-[0.642vw]">
                    2 Days
                  </span>
                  <p className="text-[#595958] flex items-center">
                    {checkIcon}
                    0/4 Tasks
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <QuarterCircles colors={["#6FC9EE", "#8DC189", "#F06F77"]} />
                </div>
              </div>
            </div>
          </div>
          <CustomBtn
            onClick={() => {
              setIsOpen(true);
            }}
            width="w-full"
            btnColor="white"
            word="Add Card"
            icon={plusIcon}
          />
        </div>
        {/* Card */}
        <div
          className={`${styles.card} md:col-span-1 col-span-2 px-[1.419vw] py-[2.4vh] border-[1.48px] boreder-[#DBDBD7] md:self-start self-stretch`}
        >
          <div className=" flex justify-between items-center pb-[2.1vh] border-b-2 border-[#2A2B2A] mb-[2.1vh]">
            <h5>List Title</h5>
            {verticalDots}
          </div>

          <CustomBtn
            onClick={() => {
              setIsOpen(true);
            }}
            width="w-full"
            btnColor="white"
            word="Add Card"
            icon={plusIcon}
          />
        </div>
        <div
          className={`md:col-span-1 col-span-2 md:self-start self-stretch`}
        >
          <CustomBtn
            width="w-full"
            btnColor="white"
            word="Add Another List"
            icon={plusIcon}
          />
        </div>
      </div>
      <div
        className={` ${
          styles.overlay
        }  absolute left-0 right-0 top-0 bottom-0 justify-center items-center bg-[#FFFFFB] bg-opacity-[58%] z-20 ${
          isOpen ? "flex" : "hidden" // Conditional rendering based on isOpen state
        }`}
      >
        <div
          className={`${styles.detailsModal} bg-[#FFFFFB] py-[4.7vh] px-[2.034vw] mb-[2.1vh] rounded-[20px] `}
        >
          <div className=" flex justify-between">
            <h3>Kick- Off Call</h3>
            {/* Close button */}
            <svg
              onClick={() => {
                setIsOpen(false); // Function to close the modal
              }}
              className=" cursor-pointer"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.0125 13.9613L18.4214 21.3616C18.8145 21.7543 19.3477 21.9749 19.9037 21.9749C20.4597 21.9749 20.9929 21.7543 21.386 21.3616C21.7791 20.969 22 20.4364 22 19.881C22 19.3257 21.7791 18.7931 21.386 18.4004L13.9744 11L21.3846 3.59962C21.5792 3.40518 21.7335 3.17437 21.8388 2.92035C21.944 2.66634 21.9982 2.39411 21.9981 2.11919C21.998 1.84428 21.9438 1.57207 21.8384 1.3181C21.733 1.06414 21.5786 0.833399 21.3839 0.639051C21.1892 0.444703 20.9582 0.290556 20.7039 0.185411C20.4496 0.0802654 20.177 0.026181 19.9018 0.0262458C19.6266 0.0263106 19.354 0.080523 19.0998 0.185788C18.8455 0.291053 18.6145 0.445309 18.42 0.639749L11.0125 8.04013L3.6037 0.639749C3.41048 0.439732 3.17931 0.280156 2.92369 0.170331C2.66806 0.0605069 2.3931 0.00263317 2.11484 8.77827e-05C1.83659 -0.0024576 1.56061 0.0503759 1.30301 0.155506C1.04541 0.260635 0.811359 0.415956 0.614501 0.612405C0.417642 0.808853 0.261924 1.0425 0.156431 1.2997C0.0509388 1.5569 -0.00221519 1.83252 7.07167e-05 2.11046C0.00235662 2.3884 0.0600364 2.6631 0.169745 2.91854C0.279454 3.17398 0.438994 3.40503 0.639057 3.59823L8.05068 11L0.640455 18.4018C0.440392 18.595 0.280852 18.826 0.171143 19.0815C0.0614341 19.3369 0.00375362 19.6116 0.00146772 19.8895C-0.000818188 20.1675 0.0523358 20.4431 0.157828 20.7003C0.263321 20.9575 0.419039 21.1911 0.615898 21.3876C0.812756 21.584 1.04681 21.7394 1.30441 21.8445C1.562 21.9496 1.83798 22.0025 2.11624 21.9999C2.3945 21.9974 2.66946 21.9395 2.92508 21.8297C3.18071 21.7198 3.41188 21.5603 3.6051 21.3603L11.0125 13.9613Z"
                fill="#BDBDBD"
              />
            </svg>
          </div>
          <p className=" text-[#999997] mb-[2.6vh]">
            in list{" "}
            <span className=" underline border-[#ACACAC]">On Boarding</span>
          </p>
          <div className=" flex gap-[1.939vw] mb-[0.6vh]">
            <div>
              <div className=" mb-[2.8vh]">
                <h6 className=" font-bold mb-[1.481vh]">Description</h6>
                <input
                  type="text"
                  className="bg-[#F8F8F8] w-[18.57vw] h-[17.47vh]"
                />
              </div>
              <div>
                <h6 className=" font-bold mb-[1.481vh]">Due Date</h6>
                <div className="flex justify-end items-end pb-[0.2vw] w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="board-add-calendar-card rounded-2xl">
                      <DateCalendar
                        onChange={(e) => {
                          handleDateInput(e);
                        }}
                      />
                      <div className=" flex gap-[1.188vw] mb-[2.2vh] px-[1.615vw]">
                        <div>
                          {/* <p className=" mb-[1.2vh] font-semibold">Start Date</p>
                          <span className=" bg-[#F8F8F8] inline-block py-[1vh] px-[0.677vw] border-[1px] border-[#DFDFDF] rounded-md w-[7.76vw]">9/10/2024</span> */}
                          <p className=" mb-[1.2vh] font-semibold">
                            Start Date
                          </p>
                          <input
                            className="py-[0.8vh] px-[0.4vw] bg-[#F8F8F8] rounded-md w-[7.76vw] border-[1px] border-[#DFDFDF] focus-visible:outline-none"
                            type="text"
                            name=""
                            id="myDateInput1"
                            readOnly
                            value={startDate}
                          />
                        </div>
                        <div>
                          <p className=" mb-[1.2vh] font-semibold">Due Date</p>
                          <input
                            className="py-[0.8vh] px-[0.4vw] bg-[#F8F8F8] rounded-md w-[7.76vw] border-[1px] border-[#DFDFDF] focus-visible:outline-none"
                            type="text"
                            readOnly
                            name=""
                            id="myDateInput2"
                            value={dueDate}
                          />
                        </div>
                      </div>
                    </div>
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-[1.8vh]">
                <h6 className=" mb-[1.481vh]">Check List</h6>
                <div>
                  <ul className=" max-h-[11vh] overflow-scroll">
                    {checkListData.map((e, i) => (
                      <li className=" flex gap-[0.473vw] items-center mb-[1.4vh]">
                        {checkboxIcon}
                        <p className={`${styles.pChecked}`}>{e}</p>
                      </li>
                    ))}
                  </ul>
                  <input
                    onChange={(e) => {
                      setItemAdded(e.target.value);
                    }}
                    type="text"
                    placeholder="Add Item"
                    className="rounded-md border-[1px] border-[#DFDFDF] bg-[#F8F8F8] py-[0.6vh] px-[0.9vw] w-[19.281vw] placeholder:text-[var(--black)] placeholder:text-[0.929vw] placeholder:font-normal mb-[0.926vh]"
                  />
                  <div className=" w-fit ms-auto">
                    <CustomBtn
                      onClick={() => {
                        if (itemAdded) {
                          setCheckListData([...checkListData, itemAdded]);
                        }
                      }}
                      paddingVal="py-[0.5vh] px-[0.7vw]"
                      btnColor="black"
                      word="Add"
                      icon={plusIcon}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h6 className=" mb-[1.481vh]">Assign to</h6>
                <input
                  type="text"
                  placeholder="@username"
                  className="mb-[2.5vh] border-[1px] border-[var(--dark)] rounded-md py-[1.2vh] px-[1.361vw] placeholder:text-[var(--dark)] placeholder:text-[15px] w-full"
                />
                <h6 className=" mb-[1.7vh]">Board Members</h6>
                <ul>
                  <li className=" mb-[0.9vh] flex gap-[1.4vw] items-center bg-[var(--dark)] px-[0.677vw] py-[0.9vh] rounded-md border-[0.74px] border-[#DBDBD7] w-fit">
                    <QuarterCircles colors={["#6FC9EE"]} />
                    <p className=" text-white">Shahenda El Naggar</p>
                  </li>
                  <li className=" mb-[0.9vh] flex gap-[1.4vw] items-center bg-[var(--white)] px-[0.677vw] py-[0.9vh] rounded-md border-[0.74px] border-[#DBDBD7] w-fit">
                    <QuarterCircles colors={["#F36F24B3"]} />
                    <p className="  text-[var(--dark)]">Yara Hesham</p>
                  </li>
                  <li className=" mb-[0.9vh] flex gap-[1.4vw] items-center bg-[var(--dark)] px-[0.677vw] py-[0.9vh] rounded-md border-[0.74px] border-[#DBDBD7] w-fit">
                    <QuarterCircles colors={["#E1C655FF"]} />
                    <p className=" text-white">Mostafa Sakr</p>
                  </li>
                  <li className=" mb-[0.9vh] flex gap-[1.4vw] items-center bg-[var(--white)] px-[0.677vw] py-[0.9vh] rounded-md border-[0.74px] border-[#DBDBD7] w-fit">
                    <QuarterCircles colors={["#9B5FBFFF"]} />
                    <p className="  text-[var(--dark)]">Sherry Magdi</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-fit ms-auto">
            <CustomBtn
              onClick={() => {
                setIsOpen(false);
              }}
              paddingVal="py-[1vh] px-[2.6vw]"
              btnColor="black"
              word="Save"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
