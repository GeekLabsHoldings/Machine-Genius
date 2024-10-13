"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function DateAndTimePicker({ getDateTimeValue }) {
  const [value, setValue] = useState(dayjs());

  //   useEffect(() => {
  //     const milliseconds = new Date(value).getTime();
  //     console.log(milliseconds);
  //   }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          label="Posting Time"
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
