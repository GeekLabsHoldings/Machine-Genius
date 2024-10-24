"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import styles from "./message.module.css";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";

const Page = () => {
  const { authState, handleSignOut } = useContext(globalContext);
  const [pageState, setPageState] = useState<{
    message: string;
    isLoading: boolean;
  }>({
    message: "",
    isLoading: false,
  });

  async function createBroadcastMessage() {
    if (!pageState.message) {
      toast.error("Please type your message!");
      return;
    }
    try {
      setPageState((prev) => ({ ...prev, isLoading: true }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/broadCast/create-broad-cast-message`,
        {
          method: "POST",
          body: JSON.stringify({
            messageType: "Announcement",
            message: pageState.message,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      if (!res.ok) {
        toast.error("Something went wrong!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      } else {
        toast.success("Message published!");
        setPageState((prev) => ({
          ...prev,
          isLoading: false,
          message: "",
        }));
      }
    } catch (error) {
      setPageState((prev) => ({ ...prev, isLoading: false }));
      toast.error("Something went wrong!");
      console.error("Error createBroadcastMessage:", error);
    }
  }

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
            value={pageState.message}
            onChange={(e) =>
              setPageState((prev) => ({ ...prev, message: e.target.value }))
            }
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
            onClick={createBroadcastMessage}
            disabled={pageState.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
