"use client";
import React, { useEffect, useContext, useState } from "react";
import styles from "./ShortList.module.css";
import Link from "next/link";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import ShortListTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/ShortListTable";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { globalContext } from "@/app/_context/store";
import { StepContext } from "@/app/_context/hrStepContext";
import { Editor } from "primereact/editor";
import useWebSocket from "react-use-websocket";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { QRCodeSVG } from "qrcode.react"; // Update this import
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const { handleSignOut } = useContext(globalContext);
  const { step, setStep } = useContext(StepContext);
  const [data, setData] = useState<any>({});
  const [returnedTemplate, setReturnedTemplate] = useState<any>("");
  const [open, setOpen] = React.useState(false);
  const [recievedId, setRecievedId] = useState<any>(null);
  const handleClose = () => setOpen(false);
  const [socketResult, setSocketResult] = useState<any>(null);
  const [oldTemplate, setOldTemplate] = useState<any>("");
  const [candidateData, setCandidateData] = useState<any>({});
  const router = useRouter();

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
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (lastMessage) {
      setSocketResult(lastMessage);
      if (JSON.parse(lastMessage?.data).body.includes("@")) {
        setOpen(true);
      }
      if (JSON.parse(lastMessage?.data).body.includes("Client Is Ready")) {
        setOpen(false);
      }
      console.log(lastMessage);
      console.log(JSON.parse(lastMessage?.data).body);
    }
  }, [lastMessage]);

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
      setRecievedId(result.candidates[0]._id);
      setReturnedTemplate(
        result.template.details[0].description
          .replace(/\[firstName\]/g, result?.candidates[0].firstName)
          .replace(/\[lastName\]/g, result?.candidates[0].lastName)
          .replace(/\[role\]/g, result?.candidates[0].role.roleName)
          .replace(/\[link\]/g, `https://recruitment.geeklabs.agency/interview-schedule/${recievedId}/${Date.now()}/${
              typeof window !== "undefined" &&
              localStorage.getItem("decodedToken") &&
              JSON.parse(localStorage.getItem("decodedToken") as string)._id
            }/Schedule_Interview_Call`)
      );
      setOldTemplate(result.template.details[0].description);
      console.log(result.template.details[0].description);

      console.log(
        result.template.details[0].description
          .replace(/<\/[^>]+>/g, "\n")
          .replace(/<[^>]+>/g, "")
          .replace(/\[firstName\]/g, result.candidates[0].firstName)
          .replace(/\[lastName\]/g, result.candidates[0].lastName)
          .replace(/\[role\]/g, result.candidates[0].role.roleName)
          .replace(
            /\[link\]/g,
            `https://recruitment.geeklabs.agency/interview-schedule/${recievedId}/${Date.now()}/${
              typeof window !== "undefined" &&
              localStorage.getItem("decodedToken") &&
              JSON.parse(localStorage.getItem("decodedToken") as string)._id
            }/Schedule_Interview_Call`
          )
      );
      console.log("result", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (step) {
      fetchData();
    }
  }, [step]);

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
      router.push(`/hr/hiring/job-openings/phone-interview-questionnaire`);
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
      router.push(`/hr/hiring/job-openings/prospects-preview`);
    } catch (error) {
      console.error("Error updating next step:", error);
    }
  }

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
          .replace(/\[link\]/g, `https://recruitment.geeklabs.agency/interview-schedule/${recievedId}/${Date.now()}/${
              typeof window !== "undefined" &&
              localStorage.getItem("decodedToken") &&
              JSON.parse(localStorage.getItem("decodedToken") as string)._id
            }/Schedule_Interview_Call`)
      );
    }
  }, [candidateData]);
  return (
    <section className="w-[90vw] relative">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold">Short List</span>
      </div>

      <div className="h-[70vh] flex align-center justify-between w-full">
        <div className="w-[49%] h-full">
          <ShortListTable
            data={data}
            setRecievedId={setRecievedId}
            recievedId={recievedId}
            stepIdx={3}
          />
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
              label="More Info - Call Whatsapp Message"
            />
          </div>
          <div>
            <span className="font-bold mb-[15px] block">Message Preview:</span>
            <div className="border border-[#2A2B2A] bg-[#DBDBD73D] p-4 rounded-[11px]">
              <Editor
                value={returnedTemplate}
                onTextChange={(e: any) => setReturnedTemplate(e.htmlValue)}
                style={{ height: "320px" }}
                formats={["list", "bold"]} // Allowed formats
                modules={{ toolbar: toolbarOptions }} // Toolbar configuration
              />
            </div>
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
        <CustomBtn word={"Back"} btnColor="white" onClick={goPreviousStep} />
        <CustomBtn word={"Next"} btnColor="black" onClick={updateNextStep} />
      </div>
      <Modal
        className={`${styles.modal}`}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className={`${styles.modalBox}`}>
            {/* 1. Modal Head */}
            <div className={`flex justify-between ${styles.createTicket}`}>
              <div
                onClick={() => {
                  handleClose();
                }}
                className="cursor-pointer w-fit ml-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.0125 13.9613L18.4214 21.3616C18.8145 21.7543 19.3477 21.9749 19.9037 21.9749C20.4597 21.9749 20.9929 21.7543 21.386 21.3616C21.7791 20.969 22 20.4364 22 19.881C22 19.3257 21.7791 18.7931 21.386 18.4004L13.9744 11L21.3846 3.59962C21.5792 3.40518 21.7335 3.17437 21.8388 2.92035C21.944 2.66634 21.9982 2.39411 21.9981 2.11919C21.998 1.84428 21.9438 1.57207 21.8384 1.3181C21.733 1.06414 21.5786 0.833399 21.3839 0.639051C21.1892 0.444703 20.9582 0.290556 20.7039 0.185411C20.4496 0.0802654 20.177 0.026181 19.9018 0.0262458C19.6266 0.0263106 19.354 0.080523 19.0998 0.185788C18.8455 0.291053 18.6145 0.445309 18.42 0.639749L11.0125 8.04013L3.6037 0.639749C3.41048 0.439732 3.17931 0.280156 2.92369 0.170331C2.66806 0.0605069 2.3931 0.00263317 2.11484 8.77827e-05C1.83659 -0.0024576 1.56061 0.0503759 1.30301 0.155506C1.04541 0.260635 0.811359 0.415956 0.614501 0.612405C0.417642 0.808853 0.261924 1.0425 0.156431 1.2997C0.0509388 1.5569 -0.00221519 1.83252 7.07167e-05 2.11046C0.00235662 2.3884 0.0600364 2.6631 0.169745 2.91854C0.279454 3.17398 0.438994 3.40503 0.639057 3.59823L8.05068 11L0.640455 18.4018C0.440392 18.595 0.280852 18.826 0.171143 19.0815C0.0614341 19.3369 0.00375362 19.6116 0.00146772 19.8895C-0.000818188 20.1675 0.0523358 20.4431 0.157828 20.7003C0.263321 20.9575 0.419039 21.1911 0.615898 21.3876C0.812756 21.584 1.04681 21.7394 1.30441 21.8445C1.562 21.9496 1.83798 22.0025 2.11624 21.9999C2.3945 21.9974 2.66946 21.9395 2.92508 21.8297C3.18071 21.7198 3.41188 21.5603 3.6051 21.3603L11.0125 13.9613Z"
                    fill="#BDBDBD"
                  />
                </svg>
              </div>
            </div>

            {/* 2. Modal Body */}

            {/* Details section */}
            <div className="w-fit mx-auto">
              {lastMessage ? (
                typeof lastMessage?.data === "string" &&
                /client is ready/gi.test(JSON.parse(lastMessage?.data).body) ? (
                  <p>Waiting for WebSocket data...</p>
                ) : (
                  <QRCodeSVG value={JSON.parse(lastMessage?.data).body} />
                )
              ) : (
                <p>Please Initiate User...</p>
              )}
            </div>

            {/* Form fields for adding a post */}
          </div>
        </Box>
      </Modal>
    </section>
  );
}
