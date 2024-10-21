"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./phone-interview-questionnaire.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import ShortListTable from "@/app/_components/HR/00Hiring/01JobOpenings/03InProcessHiring/ShortListTable";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { globalContext } from "@/app/_context/store";
import { StepContext } from "@/app/_context/hrStepContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
const [data, setData] = useState<any>(null);
const [recievedId, setRecievedId] = useState<any>(null);
const { handleSignOut } = useContext(globalContext);
const { step, setStep } = useContext(StepContext);
const [questions, setQuestions] = useState<any>(null);
const router = useRouter();
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

      result?.candidates.length > 0 && setRecievedId(result?.candidates[0]._id);
      const questions = result?.template.details[0].description.replaceAll(/data-list="bullet"/gi, "")
      .replaceAll(
        /<span class="ql-ui" contenteditable="false"><\/span>/gi,
        ""
      )
      .replaceAll(/data-list="ordered"/gi, "").replaceAll(/<ol>/gi, "").replaceAll(/<\/ol>/gi, "").replaceAll(/<li >/gi, "").replaceAll(/<\/li>/gi, "").split("?");
      questions.pop();
      setQuestions(questions);
      console.log(result);

      
      console.log("result", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const rejectCandidate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/candidate/reject/${recievedId}`, {
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
      if (result.stepsStatus[4].status == "Rejected") {
        setRecievedId(null)
        fetchData()
        toast.success("Candidate Rejected Successfully")
      }
    } catch (error) {
      console.error("Error rejecting candidate:", error);
    }
  }
  const shortListCandidate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/candidate/next-hiring-step/${recievedId}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 401) {
        handleSignOut();
      }
      const result = await res.json();
      console.log("resultTaskList", result);
      fetchData()
      toast.success("Candidate Task Listed Successfully")
    } catch (error) {
      console.error("Error Task listing candidate:", error);
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
      router.push(`/hr/hiring/job-openings/send-task`);
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
      router.push(`/hr/hiring/job-openings/short-list`);
    } catch (error) {
      console.error("Error updating next step:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [step]);
  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <section className="w-[90vw]">
      {/* Back To In Process Hiring Table Button */}
      <div className="flex items-center gap-4 my-[15px]">
        <span className="text-[32px] font-bold">
          Phone Interview Questionnaire
        </span>
      </div>

      <div className="h-[70vh] flex align-center justify-between w-full">
        <div className="w-[49%] h-full">
          <ShortListTable data={data} setRecievedId={setRecievedId} recievedId={recievedId} stepIdx={4}/>
        </div>

        {/* Question Container */}
        <div
          className={
            styles.questionContainer +
            " w-[49%] h-full border p-7 flex flex-col"
          }
        >
          {/* Questions Title */}
          <h3 className="font-bold text-[20px] mb-[1.5vh]">Questions:</h3>

          {/* Questions List */}
          <div className="space-y-6 max-h-[55vh] overflow-y-auto">
            {questions?.map((question: any, index: number) => (
              <div className="flex flex-col">
              <label
                className="font-bold mb-[1.5vh] block"
                htmlFor="tell-me-about-yourself"
              >
                {index + 1}. {question}:
              </label>
              {/* Textarea for answering question 1 */}
              <textarea
                name={`question-${index}`}
                id={`question-${index}`}
                cols={30}
                rows={5}
              ></textarea>
            </div>
            ))}
          </div>
          <hr className={styles.divider + " my-[2.5vh]"} />
          {/* Action Buttons */}
          <div className="flex justify-between gap-4">
            <CustomBtn
              word={"Reject"}
              btnColor="white"
              width="w-full"
              disabled={!recievedId}
              onClick={rejectCandidate}
            />
            <CustomBtn
              word={"Task List"}
              btnColor="black"
              width="w-full"
              disabled={!recievedId}
              onClick={shortListCandidate}
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
