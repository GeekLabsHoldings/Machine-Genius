"use client";

import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { useMemo } from "react";

const Page = () => {
  const options = useMemo(() => ["Script", "Article"], []);
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col justify-center gap-12 items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
            {/* writing type select */}
            <h2 className="text-[2.5rem] font-bold">
              I am creating a newsletter for
            </h2>
            <CustomSelectInput label="Select Brand" options={options} />
          </div>

          {/* buttons to move to last or next page */}
          <div className="flex justify-end items-center w-full">
            <CustomBtn
              word="Next"
              btnColor="black"
              href="/newsletter/create/choose-brand"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
