import { HiringStepsEnum } from "@/app/_components/HR/00Hiring/01JobOpenings/01AllHiring/AllHiringTable";

const GoBack = async (currentStep: string, jobId: string) => {
  try {
    const HiringStepsArray = Object.values(HiringStepsEnum);
    const getPreviousStep = HiringStepsArray.findIndex(
      (step) => step === currentStep
    );
    if (getPreviousStep === -1) return "Note found";
    if (getPreviousStep === 0) return "Already at the first step";
    if (getPreviousStep === 1 || getPreviousStep === 2) return "can't go back";
    const previousStep = HiringStepsArray[getPreviousStep - 1];
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `/hr/hiring/current-step-template/${jobId}?currentStep=${previousStep}`,
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
  } catch (error) {
    console.log(error);
  }
};
