"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import AcceptedTasksTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/AcceptedTasksTable";
import { StepContext } from "@/app/_context/hrStepContext";
import { globalContext } from "@/app/_context/store";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
// import styles from "./Prospects.module.css";

export default function Page() {
  const router = useRouter();
  const { step, setStep } = useContext(StepContext);
  const { handleSignOut } = useContext(globalContext);
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/candidate/candidate-task/${step}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const result = await res.json();
      setData(result);

      console.log("result", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function goPreviousStep() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/hiring/previous-step/${step}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const result = await res.json();
      console.log(result);
      
      // navigate to the next page
      router.push(`/hr/hiring/job-openings/send-task`);
    } catch (error) {
      console.error("Error updating next step:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [step]);
  return (
    <section className="">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold">Accepted Tasks</span>
      </div>

      <div className="h-[70vh] w-full ">
        {data && <AcceptedTasksTable data={data} />}
      </div>

      <div className="flex justify-between mt-4">
        <CustomBtn word={"Back"} btnColor="white" onClick={goPreviousStep} />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href="/hr/hiring/job-openings/face-to-face-interview-msg"
        />
      </div>
    </section>
  );
}
