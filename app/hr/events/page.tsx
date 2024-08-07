"use client"; // Indicates that this file is intended for use on the client side
import "../../video-editor/calender/calender.css"; // Importing CSS styles for the calendar component
import FullCalendar from "@fullcalendar/react"; // Importing the FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Importing the dayGridPlugin for FullCalendar
import { useEffect, useState } from "react"; // Importing React hooks for state management
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput"; // Importing custom select input component
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Importing custom button component
import eventContentImg from "../../../public/assets/calender event content img.png"; // Importing event content image
import Image from "next/image"; // Importing Next.js Image component for optimized image loading
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { headers } from "next/headers";
import { title } from "process";

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
  const [currentEvents, setCurrentEvents] = useState([]);

  // State to manage the selected event
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleDateClick = (selected:any) => {
    console.log(selected.view);
    const title = prompt("Please enter a new title for your event");
    const bg = prompt("Please enter a new background");
    const calendarApi = selected.view.calendar;
    console.log(calendarApi);
    
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        backgroundColor:bg,
        borderColor:"transparent"
      });
    }
    createSchedule(title, selected.startStr, selected.endStr, bg)
  };

  async function createSchedule(title:any, start:any, end:any, backgroundColor:any) {
    const token = localStorage.getItem("token")
    try {
      const data = await fetch("https://machine-genius.onrender.com/hr/event/create",{
        method:"post",
        
          headers:{
            "Content-Type": "application/json",
              Authorization:`Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            start,
            end,
            backgroundColor,
          })
        
      })
      const res = await data.json()
      console.log(res);
      getSchedule()
      
    } catch (error) {
      console.log(error);
      
    }
  }
  async function getSchedule() {
    const token = localStorage.getItem("token")
    try {
      const data = await fetch("https://machine-genius.onrender.com/user/task/all",{
        method:"get",
          headers:{
            "Content-Type": "application/json",
              Authorization:`Bearer ${token}`
          },
        
      })
      const res = await data.json()
      console.log(res);

      setCurrentEvents(res)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  async function deleteSchedule(id:any) {
    const token = localStorage.getItem("token")
    try {
      const data = await fetch(`https://machine-genius.onrender.com/hr/event/delete/${id}`,{
        method:"delete",
          headers:{
            "Content-Type": "application/json",
              Authorization:`Bearer ${token}`
          },
        
      })
      const res = await data.json()
      console.log(res);

getSchedule()      
    } catch (error) {
      console.log(error);
      
    }
  }
  async function updateSchedule(id:any ,title:any, start:any, end:any, backgroundColor:any) {
    const token = localStorage.getItem("token")
    try {
      const data = await fetch(`https://machine-genius.onrender.com/hr/event/edit-event/${id}`,{
        method:"put",
          headers:{
            "Content-Type": "application/json",
              Authorization:`Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            start,
            end,
            backgroundColor,
          })
        
      })
      const res = await data.json()
      console.log(res);

getSchedule()      
    } catch (error) {
      console.log(error);
      
    }
  }

  // Function to handle event click
  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event);
    console.log(selectedEvent); // Log the selected event
    console.log(info);
    console.log(info.event._def.extendedProps._id);
    let id = info.event._def.extendedProps._id
    if (
      window.confirm(`Do you want to delete the event `)){
    deleteSchedule(id)
      } else if (window.confirm(`Do you want to edit this event `)) {
        const title = prompt("Please enter a new title for your event");
    const bg = prompt("Please enter a new background");
    const start = prompt("Please enter a start date in this form YYYY-MM-DD");
    const end = prompt("Please enter a end date in this form YYYY-MM-DD");
    if (title) {
      updateSchedule(id , title, start, end, bg )
    }
      } 
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
  useEffect(()=>{
getSchedule()
  },[])

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
            height="75vh"
            plugins={[
              dayGridPlugin,
              interactionPlugin,
            ]}
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
            eventClick={(e)=>handleEventClick(e)}
            
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
  );
}
