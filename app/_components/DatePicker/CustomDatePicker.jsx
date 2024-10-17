"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./CustomDatePicker.css";

export default function CustomDatePicker({ getDateTimeValue }) {
  const [value, setValue] = useState(dayjs());

  //   useEffect(() => {
  //     const milliseconds = new Date(value).getTime();
  //     console.log(milliseconds);
  //   }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]} className="custom-date-picker">
        <DatePicker
          // label="Date"
          value={value}
          onChange={(newValue) => {
            const milliseconds = new Date(newValue).getTime();
            setValue(newValue);
            getDateTimeValue(milliseconds);
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
