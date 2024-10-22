"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./face-to-face-interview-msg.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import ShortListTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/ShortListTable";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { useRouter } from "next/navigation";
import { StepContext } from "@/app/_context/hrStepContext";
import { globalContext } from "@/app/_context/store";
import { Editor } from "primereact/editor";
import useWebSocket from "react-use-websocket";
import toast from "react-hot-toast";


export default function Page() {
  const router = useRouter();
  const { step, setStep } = useContext(StepContext);
  const { handleSignOut } = useContext(globalContext);
  const [data, setData] = useState<any>(null);
  const [recievedId, setRecievedId] = useState<string>("");
  const [oldTemplate, setOldTemplate] = useState<string>("");
  const [returnedTemplate, setReturnedTemplate] = useState<string>("");
  const [candidateData, setCandidateData] = useState<any>(null);
  const toolbarOptions = [[{ list: "ordered" }, { list: "bullet" }], ["bold"]];

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "wss://linkedin-scrape.machinegenius.io"
  );

  const sendWhatsappMessage = async () => {
    try {
      const res = await fetch(
        `https://linkedin-scrape.machinegenius.io/whats-app/send-message`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            message: returnedTemplate
              .replaceAll(/<strong>/gi, "*")
              .replaceAll(/<\/strong>/gi, "* ")
              .replaceAll(/<[^>]*>/gi, "")
              .replaceAll(/<\/[^>]*>/g, "\n"),
            candidate_id: recievedId,
          }),
        }
      );

      const result = await res.json();
      console.log(result);
      if (result == "Message sent successfully") {
        toast.success("Message sent successfully");
        fetchData();
      } else {
        toast.error("Message sending failed");
      }
    } catch (error) {
      console.log(error);
    }
  };


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
      result?.candidates?.length > 0 && setRecievedId(result?.candidates[0]?._id);
      setOldTemplate(result?.template?.details[0]?.description);
      setReturnedTemplate(
        result?.template?.details[0]?.description
          .replace(/\[firstName\]/g, result?.candidates[0]?.firstName)
          .replace(/\[lastName\]/g, result?.candidates[0]?.lastName)
          .replace(/\[link\]/g, `https://development.machinegenius.io/interview-schedule/${recievedId}/${Date.now()}/${
            typeof window !== "undefined" &&
            localStorage.getItem("decodedToken") &&
            JSON.parse(localStorage.getItem("decodedToken") as string)._id
          }/Schedule_Face_To_Face_Interview'`)
      );

      console.log("result", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  async function updateNextStep() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/hiring/next-step/${step}`,
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
      router.push(`/hr/hiring/job-openings/interview-details`);
    } catch (error) {
      console.error("Error updating next step:", error);
    }
  }

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
          .replace(/\[firstName\]/g, candidateData.firstName)
          .replace(/\[lastName\]/g, candidateData.lastName)
          .replace(/\[role\]/g, candidateData.role.roleName)
          .replace(/\[link\]/g, `https://development.machinegenius.io/interview-schedule/${recievedId}/${Date.now()}/${
            typeof window !== "undefined" &&
            localStorage.getItem("decodedToken") &&
            JSON.parse(localStorage.getItem("decodedToken") as string)._id
          }/Schedule_Face_To_Face_Interview'`)
      );
    }
  }, [candidateData]);

  return (
    <section className="w-[90vw]">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold">Face To Face Interview Message</span>
      </div>

      <div className="h-[70vh] flex align-center justify-between w-full">
        <div className="w-[49%] h-full">
          <ShortListTable data={data} setRecievedId={setRecievedId} recievedId={recievedId} stepIdx={6} />
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
              label="More Info - Final Interview"
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
            <CustomBtn
              word={"Send Whatsapp Message"}
              btnColor="black"
              width="w-full"
              onClick={sendWhatsappMessage}
            />
          </div>
        </div>
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
          onClick={updateNextStep}
        />
      </div>
    </section>
  );
}
