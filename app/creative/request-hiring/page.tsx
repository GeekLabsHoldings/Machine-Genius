"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import React, { useEffect, useState, useContext } from "react";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";


export default function page() {
  const [requestHiringData, setRequestHiringData] = useState<any>({
    title: "",
    level: "",
  });
  const { authState, handleSignOut } = useContext(globalContext);
  const [allRoles, setAllRoles] = useState<any>([]);

  function getTitleValue(value: string) {
    setRequestHiringData({
      ...requestHiringData,
      title: value,
    });
  }

  function getLevelValue(value: string) {
    setRequestHiringData({
      ...requestHiringData,
      level: value,
    });
  }


  enum DepartmentEnum {
    HR = "hr",
    ContentCreator = "content-creation",
    SocialMedia = "social-media",
    Administrative = "administrative",
    Accounting = "accounting",
    CEO = "ceo",
    VideoEditing = "video-editing",
    CustomerService = "customer-service",
    Development = "development",
  }

  async function getAllRoles() {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : authState.token;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/hr/role/getByDepartment/${DepartmentEnum.ContentCreator}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    console.log(json);

    setAllRoles(json?.map((role: {
      roleName:string
    }) => role.roleName));
  }
  useEffect(() => {
    getAllRoles();
  }, []);

  async function handlePostHiringRequest() {
    if (requestHiringData.title === "" || requestHiringData.level === "") {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/hiring-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
          body: JSON.stringify({
            title: requestHiringData.title,
            level: requestHiringData.level,
            department: DepartmentEnum.Development,
          }),
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json = await res.json();

      if (json) {
        toast.success("Hiring Request Sent");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handlePostHiringRequest:", error);
    }
  }

//   useEffect(() => {
//     console.log(requestHiringData);
//   }, [requestHiringData]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw] gap-[6vh]">
          <CustomSelectInput
            label="Select Title"
            options={allRoles ? allRoles : []}
            getValue={getTitleValue}
          />
          <CustomSelectInput
            label="Select Level"
            options={[
              "FreshGraduation",
              "Junior",
              "Mid-level",
              "Senior",
              "Expert",
            ]}
            getValue={getLevelValue}
          />
          <CustomBtn
            word={"Post"}
            btnColor="black"
            onClick={handlePostHiringRequest}
          />
        </div>
      </div>
    </div>
  );
}
