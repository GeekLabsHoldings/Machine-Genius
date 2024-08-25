"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { contentCreatorContext } from "@/app/_context/contentCreatorContext";

// page appears when genuis finished checking
const ArticleReady = () => {
  const { setEditContentData } = useContext(contentCreatorContext);
  useEffect(() => {
    setEditContentData(null);
    sessionStorage.removeItem("editContentData");
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center mx-auto h-[75vh] py-[1.5vw] space-y-[2vw]">
        <LogoAndTitle title="Your Script  Is Ready!" needTxt={false} />

        {/* button leads you to show errors page */}
        <CustomBtn
          word={"Dashboard"}
          btnColor="black"
          href={"/content-creator/dashboard"}
        />
      </div>
    </div>
  );
};

export default ArticleReady;
