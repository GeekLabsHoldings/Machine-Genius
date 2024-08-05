"use client"; // Indicates that this file is intended for use on the client side
import "./calender.css"; // Importing CSS styles for the calendar component
import FullCalendar from "@fullcalendar/react"; // Importing the FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Importing the dayGridPlugin for FullCalendar
import {  useState } from "react"; // Importing React hooks for state management
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput"; // Importing custom select input component
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Importing custom button component
import eventContentImg from "../../../public/assets/calender event content img.png"; // Importing event content image
import Image from "next/image"; // Importing Next.js Image component for optimized image loading
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox"; // Importing custom checkbox component

// Calendar component definition
export default function Calendar() {
  // Options for brand and content type select inputs
  const brandOptions: string[] = [
    "Street Politics",
    "Street Politics",
    "Street Politics",
    "Street Politics",
    "Street Politics",
    "Street Politics",
    "Street Politics",
  ];
  const contentTypeOptions: string[] = [
    "Street Politics",
    "Street Politics",
    "Street Politics",
    "Street Politics",
    "Street Politics",
    "Street Politics",
    "Street Politics",
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

  // SVG icon for arrow left
  const arrowLeft = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      {" "}
      /* SVG path */{" "}
    </svg>
  );

  // Render the calendar component
  return (
    <div className="pt-[1.5vw] h-full w-full full-calender">
      {/* Filters section */}
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-[1vw] filters">
        <CustomSelectInput label="Brand Name" options={brandOptions} />
        <CustomSelectInput label="Content Type" options={contentTypeOptions} />
        <CustomBtn
          btnColor="white"
          word="Clear"
          onClick={() => console.log("clear")}
          style={{ width: "max-content" }}
        />
        <div className="flex items-center justify-end">
          <CustomCheckBox value={"Show Events Only"} name="show-events-only" />
          <label htmlFor="">Show Events Only</label>
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
          <div className="event-content-overlay" onClick={handleCloseEvent}>
            {" "}
          </div>
          <div className="event-content">
            <span className="close-event-content" onClick={handleCloseEvent}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                {" "}
                /* SVG path */{" "}
              </svg>
            </span>
            <div className="event-content-header">
              <h3>{selectedEvent.extendedProps?.articleTitle}</h3>
              <p>
                {selectedEvent.startStr}{" "}
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
