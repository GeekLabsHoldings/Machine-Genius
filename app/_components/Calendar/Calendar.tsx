"use client";
import { useContext, useEffect, useRef, useState } from "react";
import "./calender.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import Image from "next/image";
import eventContentImg from "../../../public/assets/calender event content img.png";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";
import { globalContext } from "@/app/_context/store";

const brandOptions: string[] = [
  "Street Politics Canada",
  "Street Politics UK",
  "Street Politics Africa",
  "Investorcracy",
  "Movie Myth",
];
const contentTypeOptions: string[] = ["Script", "Article"];

const arrowLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fill-rule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clip-rule="evenodd"
    />
  </svg>
);

export default function Calendar() {
  const { handleSignOut } = useContext(globalContext);
  const [currentEvents, setCurrentEvents] = useState([]);
  // State to manage the selected event
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedEventInCreate, setSelectedEventInCreate] = useState<any>(null);
  const [selectedEventInDelete, setSelectedEventInDelete] = useState<any>(null);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [eventsOnly, setEventsOnly] = useState<boolean>(false);
  // ===== Start updateTodayButtonHover =====
  const calendarRef = useRef(null);

  useEffect(() => {
    const updateTodayButtonHover = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const formattedDate = `${day}/${month}`;

      const style = document.createElement("style");
      style.textContent = `
        .full-calender .fc-today-button:hover::before {
          content: "${formattedDate}";
        }
      `;
      document.head.appendChild(style);
    };

    updateTodayButtonHover();
  }, []);
  // ===== End updateTodayButtonHover =====

  async function getSchedule() {
    const token = localStorage.getItem("token");
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/task/all`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.status === 401) {
        handleSignOut();
      }
      const res = await data.json();
      console.log(res);

      setCurrentEvents(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSchedule();
  }, []);
  const today = new Date();
  const month = today.getMonth() + 1; // Note: Month is zero-based (0 for January, 1 for February, etc.)
  const day = today.getDate();

  // useEffect(() => {
  //     console.log(handleEventBackgroundColor());

  // })

  useEffect(() => {
    if (
      document.querySelector(".eventsCalendar input[type='checkbox']:checked")
    ) {
      console.log("yes");
      setCurrentEvents(
        currentEvents?.filter((e: any, i: number) => {
          return e.assignedTo == null;
        })
      );
      console.log(
        currentEvents?.filter((e: any, i: number) => {
          return e.assignedTo == null;
        })
      );
    } else {
      getSchedule();
    }
  }, [eventsOnly]);

  return (
    <div className="pt-[1.5vw] h-full w-full full-calender eventsCalendar">
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-[1vw] filters ">
        <CustomSelectInput label="Brand Name" options={brandOptions} />
        <CustomSelectInput label="Content Type" options={contentTypeOptions} />
        <CustomBtn
          btnColor="white"
          word="Clear"
          onClick={() => console.log("clear")}
          paddingVal="px-[3vw] py-[0.2vw]"
        />

        <div className="flex items-center justify-end">
          <CustomCheckBox
            value={"Show Events Only"}
            name="show-events-only"
            accentColor="black"
            onClick={() => setEventsOnly(!eventsOnly)}
            checked={eventsOnly}
          />
          <label htmlFor="">Show Events Only</label>
        </div>
      </div>

      {/* FullCalendar component */}
      <FullCalendar
        ref={calendarRef}
        height="75vh"
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next title today",
          center: "",
          right: "",
        }}
        initialView="dayGridMonth"
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={currentEvents}
        dayHeaderFormat={{ weekday: "short" }}
        dayHeaderContent={(args) => {
          return args.text.toUpperCase();
        }}
      />
    </div>
  );
}
