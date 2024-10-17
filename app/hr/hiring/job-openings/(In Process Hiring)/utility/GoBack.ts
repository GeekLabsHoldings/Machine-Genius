import { HiringStepsEnum } from "@/app/_components/HR/00Hiring/01JobOpenings/01AllHiring/AllHiringTable";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { NextRouter } from "next/router";

export const GoBack = async (router: any, currentStep: string, jobId: string, path: string) => {
  console.log(currentStep);
  try {
    const HiringStepsArray = Object.values(HiringStepsEnum);
    const getPreviousStep = HiringStepsArray.findIndex(
      (step) => step === currentStep
    );

    if (getPreviousStep === -1) {
      toast.error("Not found");
      return "Not found";
    }
    if (getPreviousStep === 0) {
      toast.error("Already at the first step");
      return "Already at the first step";
    }
    if (getPreviousStep === 1 || getPreviousStep === 2) {
      toast.error("Can't go back");
      return "Can't go back";
    } else {
      const previousStep = HiringStepsArray[getPreviousStep - 1];
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/hiring/current-step-template/${jobId}?currentStep=${previousStep}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      console.log(getPreviousStep);
      console.log(HiringStepsArray);
      console.log(HiringStepsArray[getPreviousStep - 1]);
      router.push(`/hr/hiring/job-openings/${path}`);
    }
  } catch (error) {
    console.log(error);
    toast.error("Error");
  }
};
