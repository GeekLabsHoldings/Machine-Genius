"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./message.module.css";

const Page = () => {
  return (
    <div className={`${styles.message} flex flex-col h-full`}>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw]">
          {/* writing type select */}
          <h2 className="text-[2.5rem] font-bold mb-[--sy-20px]">
            Type your message below
          </h2>
          <textarea
            rows={10}
            placeholder="Message..."
            className="rounded-md block w-[35vw] px-[0.8vw] py-[0.4vw] outline-none border-[1px] border-[var(--dark)] placeholder:text-[var(--dark)]"
            maxLength={280}
          />
          <span className="text-gray-500 text-sm self-start">
            Maximum 280 characters
          </span>
        </div>

        {/* buttons to move to last or next page */}
        <div className="flex justify-end items-center w-full">
          <CustomBtn
            word="Publish"
            btnColor="black"
            paddingVal="py-[--10px] px-[--32px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
