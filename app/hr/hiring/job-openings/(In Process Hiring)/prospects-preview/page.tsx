"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./ProspectsPreview.module.css";
import Link from "next/link";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import ProspectsPreviewTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/ProspectsPreviewTable";
import { globalContext } from "@/app/_context/store";
import { StepContext } from "@/app/_context/hrStepContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Page() {
  const [candidateId, setCandidateId] = useState<string>("");
  const { handleSignOut } = useContext(globalContext);
  const [data, setData] = useState<any>({});
  const [data2, setData2] = useState<any>({});
  const { step, setStep } = useContext(StepContext);
  const [selectedCandidateCV, setSelectedCandidateCV] = useState<any>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<any>(null);
  const router = useRouter()

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
      console.log("result", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const rejectCandidate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/candidate/reject/${selectedCandidateId}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 401) {
        handleSignOut();
      }
      const result = await res.json();
      console.log("resultReject", result);
      if (result.stepsStatus[2].status == "Rejected") {
        setSelectedCandidateCV(null)
        setSelectedCandidateId(null)
        fetchData()
        toast.success("Candidate Rejected Successfully")
      }
    } catch (error) {
      console.error("Error rejecting candidate:", error);
    }
  }
  const shortListCandidate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/candidate/next-hiring-step/${selectedCandidateId}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 401) {
        handleSignOut();
      }
      const result = await res.json();
      console.log("resultShortList", result);
      fetchData()
      toast.success("Candidate Short Listed Successfully")
    } catch (error) {
      console.error("Error short listing candidate:", error);
    }
  }

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
      router.push(`/hr/hiring/job-openings/short-list`);
    } catch (error) {
      console.error("Error updating next step:", error);
    }
  }

  useEffect(() => {
    console.log(step);
  }, []);
  useEffect(()=>{
    console.log(selectedCandidateCV);
    
  },[selectedCandidateCV])

  useEffect(() => {
    fetchData();
  }, [step]);

  return (
    <section className="w-[90vw] prospects-preview">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <Link href="/hr/hiring/job-openings/prospects">
          <svg
            width="11"
            height="22"
            viewBox="0 0 11 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 20.8993L11 1.09878C10.9996 0.898304 10.9627 0.701801 10.8932 0.530416C10.8237 0.359031 10.7244 0.219253 10.6058 0.126133C10.4873 0.03301 10.354 -0.00993011 10.2203 0.0019317C10.0867 0.0137935 9.95773 0.080009 9.84734 0.19345L0.296979 10.0937C-0.0989937 10.504 -0.0989937 11.4919 0.296979 11.9033L9.84734 21.8036C9.9575 21.9182 10.0865 21.9854 10.2204 21.9979C10.3543 22.0104 10.4879 21.9677 10.6067 21.8745C10.7255 21.7813 10.825 21.6411 10.8943 21.4692C10.9637 21.2973 11.0002 21.1002 11 20.8993Z"
              fill="#2A2B2A"
            />
          </svg>
        </Link>
        <span className="text-[32px] font-bold">Prospects</span>
      </div>

      <div className="h-[70vh] flex align-center justify-between w-full">
        <div className="w-[49%] h-full">
          <ProspectsPreviewTable
            data={data}
            setSelectedCandidateCV={setSelectedCandidateCV}
            setSelectedCandidateId={setSelectedCandidateId}
          />
        </div>
        <div
          className={
            styles.prospectsPreview +
            " w-[49%] h-full border p-7 flex flex-col justify-between"
          }
        >
          {!selectedCandidateCV ? (
            <div className="w-full h-full flex items-center justify-center text-center text-[20px] font-bold">
              Not Available
            </div>
            
          ) : (
            <iframe
              width="100%"
              height="100%"
              className="mb-[--sy-30px]"
              src={`${selectedCandidateCV}`}
            ></iframe>
          )}
          {/* Action Buttons */}
          <div className="flex justify-between gap-3">
            <CustomBtn word={"Reject"} btnColor="white" width="w-full" disabled={!selectedCandidateCV} onClick={rejectCandidate}/>
            <CustomBtn word={"Short List"} btnColor="black" width="w-full" disabled={!selectedCandidateCV} onClick={shortListCandidate}/>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <CustomBtn
          word={"Next"}
          btnColor="black"
          onClick={()=>updateNextStep()}
          // href="/hr/hiring/job-openings/short-list"
        />
      </div>
    </section>
  );
}
