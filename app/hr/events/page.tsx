"use client"; // Indicates that this file is intended for use on the client side
import "../../video-editor/calender/calender.css"; // Importing CSS styles for the calendar component
import FullCalendar from "@fullcalendar/react"; // Importing the FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Importing the dayGridPlugin for FullCalendar
import { useState } from "react"; // Importing React hooks for state management
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput"; // Importing custom select input component
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Importing custom button component
import eventContentImg from "../../../public/assets/calender event content img.png"; // Importing event content image
import Image from "next/image"; // Importing Next.js Image component for optimized image loading

// Calendar component definition
export default function Calendar() {
  // Options for brand and content type select inputs
  const eventsOptions: string[] = [
    "event 1",
    "event 2",
    "event 3",
    "event 4",
    "event 5",
    "event 6",
    "event 7",
  ];

  // Array of calendar events
  const calenderEvents = [
    {
      title: "event 1",
      start: "2024-04-26",
      end: "2024-04-30",
      backgroundColor: "#09c",
      articleImg: "../../../public/assets/calender event content img.png",
      article:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es",
      articleTitle: "Canada’s PM Quits",
    },
    {
      title: "event 2",
      date: "2024-04-26",
      backgroundColor: "#F36F24",
      articleImg: "../../../public/assets/calender event content img.png",
      article:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es",
      articleTitle: "Canada’s PM Quits",
    },
    {
      title: "event 2",
      date: "2024-04-26",
      backgroundColor: "#000",
      articleImg: "../../../public/assets/calender event content img.png",
      article:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es",
      articleTitle: "Canada’s PM Quits",
    },
    {
      title: "event 2",
      date: "2024-04-26",
      backgroundColor: "rgba(95, 168, 91, 0.71)",
      articleImg: "../../../public/assets/calender event content img.png",
      article:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es",
      articleTitle: "Canada’s PM Quits",
    },
    {
      title: "event 3",
      date: "2024-04-02",
      backgroundColor: "#F36F24",
      articleImg: "../../../public/assets/calender event content img.png",
      article:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es",
      articleTitle: "Canada’s PM Quits",
    },
    {
      title: "event 3",
      date: "2024-04-02",
      backgroundColor: "#F36F24",
      articleImg: "../../../public/assets/calender event content img.png",
      article:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es",
      articleTitle: "Canada’s PM Quits",
    },
    {
      title: "event 3",
      date: "2024-04-02",
      backgroundColor: "#F36F24",
      articleImg: "../../../public/assets/calender event content img.png",
      article:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es",
      articleTitle: "Canada’s PM Quits",
    },
    {
      title: "event 3",
      date: "2024-04-02",
      backgroundColor: "#F36F24",
      articleImg: "../../../public/assets/calender event content img.png",
      article:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es",
      articleTitle: "Canada’s PM Quits",
    },
    {
      title: "event 3",
      date: "2024-04-02",
      backgroundColor: "#F36F24",
      articleImg: "../../../public/assets/calender event content img.png",
      article:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es",
      articleTitle: "Canada’s PM Quits",
    },
    {
      title: "event 3",
      date: "2024-04-02",
      backgroundColor: "#F36F24",
      articleImg: "../../../public/assets/calender event content img.png",
      article:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es",
      articleTitle: "Canada’s PM Quits",
    },
  ];

  // State to manage the selected event
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Function to handle event click
  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event);
    console.log(selectedEvent); // Log the selected event
  };

  // Function to close the selected event
  const handleCloseEvent = () => {
    setSelectedEvent("");
  };

  // Get today's date for the button text
  const today = new Date();
  const month = today.getMonth() + 1; // Note: Month is zero-based (0 for January, 1 for February, etc.)
  const day = today.getDate();

  // add Icon for button
  const addIcon = (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
        fill="#FFFFFB"
      />
    </svg>
  );

  // Render the calendar component
  return (
    <div className="pt-[1.5vw] h-full w-full full-calender">
      {/* Filters section */}
      <div className="flex justify-between filters">
        <div className="w-[30%] flex items-center gap-[2vw]">
          <h3 className="font-bold text-[32px]">Calendar</h3>
          <CustomSelectInput label="All Events" options={eventsOptions} />
        </div>
        <div className="flex items-center justify-end">
          <CustomBtn
            btnColor="black"
            word="New Entry"
            width="max-content"
            icon={addIcon}
            paddingVal="py-[0.5vw] px-[1vw]"
          />
        </div>
      </div>
      {/* FullCalendar component */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={{
          left: "prev,next title today",
          right: "",
        }}
        initialView="dayGridMonth"
        events={calenderEvents}
        eventClick={(e) => handleEventClick(e)}
        height={"100%"}
        eventBorderColor="transparent"
        dayMaxEvents={3}
        buttonText={{ today: `${day} / ${month}` }}
        droppable={true}
      />
      {/* Selected event content */}
      {selectedEvent ? (
        <>
          <div
            className="event-content-overlay"
            onClick={handleCloseEvent}
          ></div>
          <div className="event-content">
            <span className="close-event-content" onClick={handleCloseEvent}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                /* SVG path */
              </svg>
            </span>
            <div className="event-content-header">
              <h3>{selectedEvent.extendedProps?.articleTitle}</h3>
              <p>
                {selectedEvent.startStr}
                <span style={{ background: selectedEvent.backgroundColor }}>
                  Canada
                </span>
              </p>
            </div>
            <Image src={eventContentImg} height={100} alt="" />
            <p>{selectedEvent.extendedProps.article}</p>
          </div>
        </>
      ) : null}
    </div>
  );
}
