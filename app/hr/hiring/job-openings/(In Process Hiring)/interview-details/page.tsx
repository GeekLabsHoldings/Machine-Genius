"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import InterviewDetailsTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/InterviewDetailsTable";
import React, { useContext , useState } from "react";
import { globalContext } from "@/app/_context/store";
import { useRouter } from "next/navigation";
import { StepContext } from "@/app/_context/hrStepContext";

export default function Page() {

  const { step, setStep } = useContext(StepContext);

  const { handleSignOut } = useContext(globalContext);
  const router = useRouter();

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
      router.push(`/hr/hiring/job-openings/face-to-face-interview-msg`);
    } catch (error) {
      console.error("Error updating next step:", error);
    }
  }

  return (
    <section className="">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold">Interview Details</span>
      </div>

      <div className="h-[70vh] w-full ">
        <InterviewDetailsTable />
      </div>

      <div className="flex justify-between mt-4">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          onClick={goPreviousStep}
        />
        <CustomBtn
          word={"Next"}
          btnColor="black"
          href="/hr/hiring/job-openings/interview-acceptance-sheet"
        />
      </div>
    </section>
  );
}
