"use client";
import CustomSelectInput from "../../../../_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "../../../../_components/Button/CustomBtn";
import styles from "./Create.module.css";
import { useContext, useEffect } from "react";
import { templatesContext } from "../_context/templatesContext";

const options: { [key: string]: string } = {
  Job_Listings: "Job Listings",
  Schedule_Interview_Call: "Schedule Interview Call",
  Tasks: "Tasks",
  Schedule_Face_To_Face_Interview: "Schedule Face To Face Interview",
  Job_Offer: "Job Offer",
  Required_Documents: "Required Documents",
};

export default function CreateTemplate() {
  const { templates, setTemplates } = useContext(templatesContext);

  useEffect(() => {
    setTemplates({
      key: "",
      value: "",
    });
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
          {/* writing type select */}
          <label className={styles.select_label}>Select Template</label>
          <CustomSelectInput
            label="Select Template"
            options={Object.values(options)}
            getValue={(value: string) => {
              setTemplates({
                key: Object.keys(options).find(
                  (key) => options[key] === value
                ) as string,
                value: value,
              });
            }}
          />
        </div>

        {/* buttons to move to last or next page */}
        <div className="flex justify-between items-center w-full">
          <CustomBtn word="Back" btnColor="white" href="/hr/hiring/templates" />
          {/* if no template is selected, disable the next button */}
          {templates ? (
            <CustomBtn
              word="Next"
              btnColor="black"
              href="/hr/hiring/templates/new-template"
            />
          ) : (
            <span className="cursor-not-allowed bg-gray-600 opacity-85 rounded-md">
              <CustomBtn word="Next" btnColor="black" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
