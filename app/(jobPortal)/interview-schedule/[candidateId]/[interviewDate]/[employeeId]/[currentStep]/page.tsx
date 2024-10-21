"use client";
import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths, startOfDay, isSameDay } from "date-fns";
import { useParams } from "next/navigation";

enum HiringStepsEnum {
  Schedule_Interview_Call = "PhoneCall",
  Schedule_Face_To_Face_Interview = "FaceToFace",
}

const PhoneScheduler = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [timeSlots, setTimeSlots] = useState<
    { startTime: Date; endTime: Date }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { candidateId, interviewDate, employeeId, currentStep } = useParams();
  const newCurrentStep =
    HiringStepsEnum[currentStep as keyof typeof HiringStepsEnum];

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api-development.machinegenius.io/calendly/available-time?date=${interviewDate}&type=${newCurrentStep}&employee_id=${employeeId}`
      );
      const data = await response.json();
      setTimeSlots(
        data.map((slot) => ({
          startTime: new Date(slot.startTime),
          endTime: new Date(slot.endTime),
        }))
      );

      if (data.length > 0) {
        setSelectedDate(new Date(data[0].startTime));
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) return;

    setLoading(true);
    try {
      await fetch(
        "https://api-development.machinegenius.io/calendly/create-reservation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chosenDate: selectedTime.getTime(),
            invitationDate: interviewDate,
            type: newCurrentStep,
            employee_id: employeeId,
            candidate_id: candidateId,
          }),
        }
      );
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const daysInMonth = Array.from(
    {
      length: new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
      ).getDate(),
    },
    (_, i) => i + 1
  );
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const hasTimeSlots = (date) => {
    return timeSlots.some((slot) => isSameDay(new Date(slot.startTime), date));
  };

  const getAvailableTimesForDate = (date) => {
    return timeSlots.filter((slot) =>
      isSameDay(new Date(slot.startTime), date)
    );
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-[clamp(10px,5vh,150px)]">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-900">
            Schedule Phone Interview
          </h1>
          <p className="text-gray-500 mt-1">Select your preferred time slot</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ←
              </button>
              <span className="font-medium">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}

              {[...Array(firstDayOfMonth)].map((_, index) => (
                <div key={`empty-${index}`} className="p-2" />
              ))}

              {daysInMonth.map((day) => {
                const date = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                );
                const hasSlots = hasTimeSlots(date);
                const isActive = hasSlots && date >= new Date();

                return (
                  <button
                    key={day}
                    onClick={() => {
                      if (isActive) {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }
                    }}
                    disabled={!isActive}
                    className={`
                      relative p-2 rounded-full w-10 h-10 mx-auto flex items-center justify-center
                      ${
                        !isActive
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-blue-50"
                      }
                      ${
                        selectedDate && isSameDay(date, selectedDate)
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : ""
                      }
                      ${hasSlots ? "font-semibold" : ""}
                    `}
                  >
                    {day}
                    {hasSlots && (
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-l pl-6">
            <h2 className="font-medium mb-4">
              {selectedDate
                ? format(selectedDate, "EEEE, MMMM d")
                : "Select a Date"}
            </h2>

            <div className="h-[400px] overflow-y-auto">
              {loading ? (
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 bg-gray-100 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {selectedDate &&
                    getAvailableTimesForDate(selectedDate).map(
                      (slot, index) => (
                        <button
                          key={index}
                          onClick={() => handleTimeSelect(slot.startTime)}
                          className={`
                        p-3 rounded-lg text-left
                        ${
                          selectedTime &&
                          isSameDay(selectedTime, slot.startTime) &&
                          format(selectedTime, "HH:mm") ===
                            format(slot.startTime, "HH:mm")
                            ? "bg-blue-500 text-white"
                            : "border border-gray-200 hover:border-blue-500"
                        }
                      `}
                        >
                          {format(slot.startTime, "h:mm a")}
                        </button>
                      )
                    )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {selectedDate && selectedTime && (
            <div className="text-sm text-gray-600">
              Selected: {format(selectedDate, "MMMM d, yyyy")} at{" "}
              {format(selectedTime, "h:mm a")}
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTime || loading}
            className={`
              ml-auto
              px-6 py-2 rounded-lg font-medium
              ${
                !selectedDate || !selectedTime || loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }
            `}
          >
            {loading ? "Scheduling..." : "Confirm Interview"}
          </button>
        </div>
      </div>

      {success && (
        <div className="max-w-4xl mx-auto mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Interview successfully scheduled! You'll receive a confirmation email
          shortly.
        </div>
      )}
    </div>
  );
};

export default PhoneScheduler;
