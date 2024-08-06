"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";

// shows that the script has been scheduled
const ScheduleScript = () => {
  const { setEditContentData } = useContext(globalContext);
  useEffect(() => {
    setEditContentData(null);
    sessionStorage.removeItem("editContentData");
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center h-[75vh] py-[1.5vw] w-full gap-[10vw] ">
        <div className="flex flex-col gap-[2vw]">
          <LogoAndTitle
            title={"Your Script Has Been Scheduled!"}
            needTxt={false}
          />
          {/* buttons lead you to last and next page */}
          <div className="flex justify-center gap-[1.5vw]">
            <CustomBtn
              word="Dashboard"
              btnColor="black"
              href={"/content-creator/dashboard"}
            />
            <CustomBtn
              word="Convert To Article"
              btnColor="black"
              // href={"/content-creator/create/article-generated-titles"}
              onClick={() => {
                toast.success("Comming Soon...");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleScript;
