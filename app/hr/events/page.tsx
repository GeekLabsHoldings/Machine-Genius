"use client"; // Indicates that this file is intended for use on the client side
import "../../video-editor/calender/calender.css"; // Importing CSS styles for the calendar component
import FullCalendar from "@fullcalendar/react"; // Importing the FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Importing the dayGridPlugin for FullCalendar
import { useEffect, useState } from "react"; // Importing React hooks for state management
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput"; // Importing custom select input component
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Importing custom button component
import eventContentImg from "../../../public/assets/calender event content img.png"; // Importing event content image
import Image from "next/image"; // Importing Next.js Image component for optimized image loading
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { headers } from "next/headers";
import { title } from "process";
import { url } from "inspector";
import { log } from "console";

// Calendar component definition
export default function Calendar() {
  // Options for brand and content type select inputs
  const eventsOptions: string[] = ["All", "Events", "Tasks"];

  // Array of calendar events
  const [currentEvents, setCurrentEvents] = useState([]);

  // State to manage the selected event
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedEventInCreate, setSelectedEventInCreate] = useState<any>(null);
  const [selectedEventInDelete, setSelectedEventInDelete] = useState<any>(null);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const handleDateClick = (selected: any) => {
    console.log(selected.view);
    setSelectedEventInCreate(selected);
    setCreateModal(true);
  };

  async function createSchedule() {
    let url: string = "";

    const title = (document.getElementById("title") as HTMLInputElement)?.value;
    const bg = (document.getElementById("bg") as HTMLInputElement)?.value;

    const calendarApi = selectedEventInCreate.view.calendar;
    console.log(calendarApi);
    console.log(title, bg);

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selectedEventInCreate.dateStr}-${title}`,
        title,
        start: selectedEventInCreate.startStr,
        end: selectedEventInCreate.endStr,
        backgroundColor: bg,
        borderColor: "transparent",
      });
    }

    const token = localStorage.getItem("token");

    url = "https://machine-genius.onrender.com/hr/event/create";

    try {
      const data = await fetch(`${url}`, {
        method: "post",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          start: selectedEventInCreate.startStr,
          end: selectedEventInCreate.endStr,
          backgroundColor: bg,
        }),
      });
      const res = await data.json();
      console.log(res);
      setCreateModal(false);
      getSchedule();
      
      (document.getElementById("title") as HTMLInputElement).value = "";
      (document.getElementById("bg") as HTMLInputElement).value = "";
    } catch (error) {
      console.log(error);
    }
  }
  async function getSchedule() {
    const token = localStorage.getItem("token");
    try {
      const data = await fetch(
        "https://machine-genius.onrender.com/user/task/all",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await data.json();
      console.log(res);

      setCurrentEvents(res);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteSchedule(id: any) {
    const token = localStorage.getItem("token");
    try {
      const data = await fetch(
        `https://machine-genius.onrender.com/hr/event/delete/${id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await data.json();
      console.log(res);

      getSchedule();
    } catch (error) {
      console.log(error);
    }
  }
  async function updateSchedule(id: any) {
    const title = (document.getElementById("titleEdit") as HTMLInputElement)
      ?.value;
    const bg = (document.getElementById("bgEdit") as HTMLInputElement)?.value;
    const start = (document.getElementById("start") as HTMLInputElement)?.value;
    const end = (document.getElementById("end") as HTMLInputElement)?.value;

    const token = localStorage.getItem("token");
    try {
      const data = await fetch(
        `https://machine-genius.onrender.com/hr/event/edit-event/${id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            start,
            end,
            backgroundColor: bg,
          }),
        }
      );
      const res = await data.json();
      console.log(res);
      (document.getElementById("titleEdit") as HTMLInputElement).value = "";
      (document.getElementById("bgEdit") as HTMLInputElement).value = "";
      (document.getElementById("start") as HTMLInputElement).value = "";
      (document.getElementById("end") as HTMLInputElement).value = "";
      setEditModal(false);
      getSchedule();
    } catch (error) {
      console.log(error);
    }
  }

  // Function to handle event click
  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event);
    setSelectedEventInDelete(info.event._def.extendedProps._id);
    setDeleteModal(true);
    // console.log(info);
    // console.log(info.event._def.extendedProps._id);
    // let id = info.event._def.extendedProps._id;
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
  useEffect(() => {
    getSchedule();
  }, []);

  // Render the calendar component
  return (
    <>
      <div className="pt-[1.5vw] h-full w-full full-calender relative">
        {/* Filters section */}
        <div className="flex justify-between filters">
          <div className="w-[30%] flex items-center gap-[2vw]">
            <h3 className="font-bold text-[32px]">Calendar</h3>
          </div>
        </div>
        {/* FullCalendar component */}
        <FullCalendar
          height="75vh"
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventClick={(e) => handleEventClick(e)}
          events={currentEvents}
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
      <div
        className={`${
          createModal ? "block" : "hidden"
        } absolute inset-0 bg-black bg-opacity-20 z-50`}
      >
        <div
          className={` absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-[6px] p-6 shadow-md bg-white z-[60] w-[550px]`}
        >
          <span
            className=" text-2xl absolute top-1 right-2 cursor-pointer font-bold"
            onClick={() => setCreateModal(false)}
          >
            x
          </span>
          <h3 className=" text-center uppercase mb-[30px] text-[24px] leading-[22px] font-bold">
            Enter your Event info
          </h3>
          <div className=" flex flex-col gap-[25px]">
            <div className=" flex flex-col gap-[10px]">
              <label
                htmlFor="title"
                className=" leading-[22px] font-bold text-[18px]"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className=" w-full rounded-[4px] p-2 border-[1px] border-black"
              />
            </div>
            <div className=" flex flex-col gap-[10px]">
              <label
                htmlFor="bg"
                className=" leading-[22px] font-bold text-[18px]"
              >
                Background Color
              </label>
              <input
                type="text"
                id="bg"
                className=" w-full rounded-[4px] p-2 border-[1px] border-black"
              />
            </div>
            <button
              className=" bg-black text-white px-5 py-3 text-center rounded-[5px] w-fit ml-auto"
              onClick={() => createSchedule()}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          deleteModal ? "block" : "hidden"
        } absolute inset-0 bg-black bg-opacity-20 z-50`}
      >
        <div
          className={` absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-[6px] p-6 shadow-md bg-white z-50 w-[550px]`}
        >
          <span
            className=" text-2xl absolute top-1 right-2 cursor-pointer font-bold"
            onClick={() => setDeleteModal(false)}
          >
            x
          </span>
          <h3 className=" font-bold text-[24px] text-center mb-6">
            Do you want to delete this event
          </h3>
          <div className=" flex gap-4 justify-center items-center">
            <button
              className=" bg-black text-white px-5 py-3 text-center rounded-[5px] w-fit"
              onClick={() => {
                deleteSchedule(selectedEventInDelete);
                setDeleteModal(false);
              }}
            >
              Yes
            </button>
            <button
              className=" bg-black text-white px-5 py-3 text-center rounded-[5px] w-fit"
              onClick={() => {
                setDeleteModal(false);
                setEditModal(true);
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          editModal ? "block" : "hidden"
        } absolute inset-0 bg-black bg-opacity-20 z-50
      `}
      >
        <div
          className={`${
            editModal ? "block" : "hidden"
          } absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-[6px] p-6 shadow-md bg-white z-50 w-[550px]`}
        >
          <span
            className=" text-2xl absolute top-1 right-2 cursor-pointer font-bold"
            onClick={() => setEditModal(false)}
          >
            x
          </span>
          <h3 className=" text-center uppercase mb-[30px] text-[24px] leading-[22px] font-bold">
            Edit Your Event
          </h3>
          <div className=" flex flex-col gap-[25px]">
            <div className=" flex flex-col gap-[10px]">
              <label
                htmlFor="titleEdit"
                className=" leading-[22px] font-bold text-[18px]"
              >
                Title
              </label>
              <input
                type="text"
                id="titleEdit"
                className=" w-full rounded-[4px] p-2 border-[1px] border-black"
              />
            </div>
            <div className=" flex flex-col gap-[10px]">
              <label
                htmlFor="bgEdit"
                className=" leading-[22px] font-bold text-[18px]"
              >
                Background Color
              </label>
              <input
                type="text"
                id="bgEdit"
                className=" w-full rounded-[4px] p-2 border-[1px] border-black"
              />
            </div>
            <div className=" flex flex-col gap-[10px]">
              <label
                htmlFor="assignedTO"
                className=" leading-[22px] font-bold text-[18px]"
              >
                Start Date
              </label>
              <input
                type="text"
                id="start"
                placeholder="Please enter a start date in this form YYYY-MM-DD"
                className=" w-full rounded-[4px] p-2 border-[1px] border-black"
              />
            </div>
            <div className=" flex flex-col gap-[10px]">
              <label
                htmlFor="assignedTO"
                className=" leading-[22px] font-bold text-[18px]"
              >
                End Date
              </label>
              <input
                type="text"
                id="end"
                placeholder="Please enter an end date in this form YYYY-MM-DD"
                className=" w-full rounded-[4px] p-2 border-[1px] border-black"
              />
            </div>
            <button
              className=" bg-black text-white px-5 py-3 text-center rounded-[5px] w-fit ml-auto"
              onClick={() => updateSchedule(selectedEventInDelete)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
