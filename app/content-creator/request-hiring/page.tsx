"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import React, { useEffect, useState, useContext } from "react";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";

export default function page() {
  const [requestHiringData, setRequestHiringData] = useState<any>({
    title: "",
    level: "",
  });
  const { token } = useContext(globalContext);

  function getTitleValue(value: string) {
    setRequestHiringData({
      ...requestHiringData,
      title: value,
    });
  }

  function getLevelValue(value: string) {
    setRequestHiringData({
      ...requestHiringData,
      level: value,
    });
  }

  async function handlePostHiringRequest() {
    if (requestHiringData.title === "" || requestHiringData.level === "") {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const res = await fetch(
        `https://machine-genius.onrender.com/admin/hiring-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : token
            }`,
          },
          body: JSON.stringify({
            title: requestHiringData.title,
            level: requestHiringData.level,
          }),
        }
      );

      const json = await res.json();

      if (json) {
        toast.success("Hiring Request Sent");
      }
    } catch (error) {
      toast.error("Something went wrong! Contact Backend Department");
      console.error("Error handlePostHiringRequest:", error);
    }
  }

//   useEffect(() => {
//     console.log(requestHiringData);
//   }, [requestHiringData]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw] gap-[6vh]">
          <CustomSelectInput
            label="Select Title"
            options={["ContentWriter"]}
            getValue={getTitleValue}
          />
          <CustomSelectInput
            label="Select Level"
            options={[
              "FreshGraduation",
              "Junior",
              "Mid-level",
              "Senior",
              "Expert",
            ]}
            getValue={getLevelValue}
          />
          <CustomBtn
            word={"Post"}
            btnColor="black"
            onClick={handlePostHiringRequest}
          />
        </div>
      </div>
    </div>
  );
}
