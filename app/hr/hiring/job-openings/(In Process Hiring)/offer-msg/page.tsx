"use client";
import React, { useContext , useEffect, useState } from "react";
import styles from "./offer-msg.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import ShortListTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/ShortListTable";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { globalContext } from "@/app/_context/store";
import { StepContext } from "@/app/_context/hrStepContext";
import { useRouter } from "next/navigation";
import { Editor } from "primereact/editor";


export default function Page() {
  const [data, setData] = useState<any>(null);
  const [recievedId, setRecievedId] = useState<any>(null);
  const { handleSignOut } = useContext(globalContext);
  const { step, setStep } = useContext(StepContext);
  const [returnedTemplate, setReturnedTemplate] = useState<any>("");
  const [oldTemplate, setOldTemplate] = useState<any>("");
  const [candidateData, setCandidateData] = useState<any>(null);
  const router = useRouter();
  const toolbarOptions = [[{ list: "ordered" }, { list: "bullet" }], ["bold"]];

  async function sendEmail() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/message/email/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          candidate_id:recievedId,
          subject:"Offer",
          emailContent:returnedTemplate
        })
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/hiring/current-step-template/${step}`,
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
      setRecievedId(result?.candidates[0]?._id);
      setOldTemplate(result?.template?.details[0]?.description);
      setReturnedTemplate(
        result?.template?.details[0]?.description
          .replace(/\[firstName\]/g, result?.candidates[0]?.firstName)
          .replace(/\[lastName\]/g, result?.candidates[0]?.lastName)
          .replace(/\[role\]/g, result?.candidates[0]?.role?.roleName)
      );

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
      router.push(`/hr/hiring/job-openings/face-to-face-interview-msg`);
    } catch (error) {
      console.error("Error updating next step:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [step]);

  useEffect(() => {
    if (recievedId) {
      setCandidateData(
        data.candidates.find((candidate: any) => candidate._id === recievedId)
      );
    }
  }, [recievedId, data]);

  useEffect(() => {
    if (candidateData) {
      setReturnedTemplate(
        oldTemplate
          .replace(/\[firstName\]/g, candidateData?.firstName)
          .replace(/\[lastName\]/g, candidateData?.lastName)
          .replace(/\[role\]/g, candidateData?.role?.roleName)
          .replace(/\[link\]/g, "https://www.google.com")
      );
    }
  }, [candidateData]);

  return (
    <section className="w-[90vw]">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold">Final Offer Message</span>
      </div>

      <div className="h-[70vh] flex align-center justify-between w-full">
        <div className="w-[49%] h-full">
          <ShortListTable data={data} setRecievedId={setRecievedId} recievedId={recievedId} stepIdx={7} />
        </div>

        <div
          className={
            styles.messageBox +
            " w-[49%] h-full border p-7 flex flex-col justify-between"
          }
        >
          <div className="flex justify-between">
            <span className="font-bold">Number of selected candidates:</span>
            <span className="font-bold">(8)</span>
          </div>
          <div>
            <span className="font-bold mb-[15px] block">
              Select Message Template:
            </span>
            <CustomSelectInput
              options={[]}
              label="More Info - Offer Template - Video Editor | Intern"
            />
          </div>
          <div>
            <span className="font-bold mb-[15px] block">Message Preview:</span>
            <Editor
                value={returnedTemplate}
                onTextChange={(e: any) => setReturnedTemplate(e.htmlValue)}
                style={{ height: "320px" }}
                formats={["list", "bold"]} // Allowed formats
                modules={{ toolbar: toolbarOptions }} // Toolbar configuration
              />
          </div>
          {/* Action Button */}
          <div>
            <CustomBtn word={"Send Email"} btnColor="black" width="w-full" onClick={sendEmail} />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href="/hr/hiring/job-openings/face-to-face-interview-msg"
        />
        <CustomBtn word={"Dashboard"} btnColor="black" href="/hr/dashboard" />
      </div>
    </section>
  );
}
