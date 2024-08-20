"use client";
import "./calender.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import {  useEffect, useState } from "react";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import eventContentImg from "../../../public/assets/calender event content img.png";
import Image from "next/image";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick


export default function Calendar() {
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

  const [currentEvents, setCurrentEvents] = useState([]);

  // State to manage the selected event
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedEventInCreate, setSelectedEventInCreate] = useState<any>(null);
  const [selectedEventInDelete, setSelectedEventInDelete] = useState<any>(null);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [eventsOnly,setEventsOnly] = useState<boolean>(false)


  

  
  async function getSchedule() {
    const token = localStorage.getItem("token");
    try {
      const data = await fetch(
        "https://api.machinegenius.io/user/task/all",
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
  
  


  const today = new Date();
  const month = today.getMonth() + 1; // Note: Month is zero-based (0 for January, 1 for February, etc.)
  const day = today.getDate();

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

  // useEffect(() => {
  //     console.log(handleEventBackgroundColor());

  // })

  useEffect(() => {
    getSchedule();
  }, []);

  useEffect(() => {
    

    if (document.querySelector(".eventsCalendar input[type='checkbox']:checked")) {
      console.log("yes");
      setCurrentEvents(currentEvents?.filter((e:any,i:number)=>{return e.assignedTo == null}))
      console.log(currentEvents?.filter((e:any,i:number)=>{return e.assignedTo == null}));
      
    } else {
      getSchedule()
    }
  }, [eventsOnly]);
  return (
    <>
    <div className="pt-[1.5vw] h-full w-full full-calender eventsCalendar">
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
          <CustomCheckBox value={"Show Events Only"} name="show-events-only" accentColor="black" onClick={()=>setEventsOnly(!eventsOnly)} checked={eventsOnly}/>
          <label htmlFor="">Show Events Only</label>
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
          events={currentEvents}
        />

      
    </div>
    
    </>
  );
}
