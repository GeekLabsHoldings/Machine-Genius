"use client";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";


export default function Calendar() {
  return (
    <div className="w-1/2 flex justify-end items-end pb-[0.2vw] ">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          slots={{
            rightArrowIcon: ArrowRightIcon,
            leftArrowIcon: ArrowLeftIcon,
          }}
          dayOfWeekFormatter={(weekday) => `${weekday.format("ddd")}`}
        />
      </LocalizationProvider>
    </div>
  );
}
