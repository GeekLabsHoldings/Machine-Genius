"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./message.module.css"

const page = () => {
  const options = ["Script", "Article"];

  return (
    <div>
      <div className={`${styles.message} flex flex-col h-full`}>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col justify-center gap-8 items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
            {/* writing type select */}
            <h2 className="text-[2.5rem] font-bold">Type your message below</h2>
            <input
              type="text"
              placeholder="Message..."
              className="rounded-md block w-[25vw] px-[0.8vw] py-[0.4vw] outline-none border-[1px] border-[var(--dark)] placeholder:text-[var(--dark)]"
            />
          </div>

          {/* buttons to move to last or next page */}
          <div className="flex justify-end items-center w-full">
            <CustomBtn
              word="Next"
              btnColor="black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
