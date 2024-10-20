"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./newTask.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { backIcon } from "@/app/_utils/svgIcons";
import { useRouter } from "next/navigation";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import CustomSelectInputWithLabelAndValue from "@/app/_components/CustomSelectInput/CustomSelectInputWithLabelAndValue";

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

interface IEmployee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  phoneNumber: string;
  department: string[];
  cv: string;
  linkedIn: string;
}

const departmentOptions = Object.keys(DepartmentEnum).map((key) => key);

const Page = () => {
  const { authState, handleSignOut, globalBrands, brandMap } =
    useContext(globalContext);
  const router = useRouter();
  const [pageState, setPageState] = useState<{
    fetchedEmployees: IEmployee[];
    isLoading: boolean;
    formState: {
      taskData: {
        assignedTo: string;
        brand: string;
        title: string;
        department: string;
        startNumber: number;
        endNumber: number;
      };
    };
  }>({
    fetchedEmployees: [],
    isLoading: false,
    formState: {
      taskData: {
        assignedTo: "",
        brand: "",
        title: "",
        department: "",
        startNumber: new Date().getTime(),
        endNumber: new Date().getTime() + 1000 * 60 * 60 * 24,
      },
    },
  });

  async function getEmployees() {
    try {
      setPageState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/tasks/get-all-employees?limit=9999`,
        {
          headers: {
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
        console.error("Error getEmployees:");
        return;
      }
      const json: IEmployee[] = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else if (json && Array.isArray(json) && json.length > 0) {
        setPageState((prev) => ({
          ...prev,
          fetchedEmployees: json,
        }));
      } else {
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getEmployees:", error);
    } finally {
      setPageState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

  async function handleAddNewTask() {
    if (
      !pageState.formState.taskData.title ||
      !pageState.formState.taskData.department ||
      !pageState.formState.taskData.brand ||
      !pageState.formState.taskData.assignedTo
    ) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      setPageState((prev) => ({ ...prev, isLoading: true }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/tasks/add-task`,
        {
          method: "POST",
          body: JSON.stringify({
            taskData: {
              assignedTo: pageState.formState.taskData.assignedTo,
              brand: pageState.formState.taskData.brand,
              title: pageState.formState.taskData.title,
              department: pageState.formState.taskData.department,
              startNumber: pageState.formState.taskData.startNumber,
              endNumber: pageState.formState.taskData.endNumber,
            },
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
        return;
      }
      const json: any = await res.json();
      if (json && json.title) {
        toast.success("Task added successfully!");
        router.replace("/op/system-tasks/");
      } else {
        toast.error("Something went wrong!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      setPageState((prev) => ({ ...prev, isLoading: false }));
      toast.error("Something went wrong!");
      console.error("Error handleAddNewTask:", error);
    }
  }

  return (
    <section className={`${styles.container}`}>
      <div className="flex items-center gap-[--10px] my-[1vw]">
        <span onClick={() => router.replace("/op/system-tasks/")}>
          {backIcon}
        </span>
        <h3>Add New Task</h3>
      </div>

      <div className={`!w-[25vw] h-[65vh]`}>
        <div className="flex flex-col gap-[1vw]">
          {/* Title* */}
          <div>
            <label htmlFor="title">Title*</label>
            <div className={`${styles.inputWrapper}`}>
              <input
                type="text"
                id="title"
                required
                className={`${styles.customInput}`}
                value={pageState.formState.taskData.title}
                onChange={(e) => {
                  setPageState((prev) => ({
                    ...prev,
                    formState: {
                      ...prev.formState,
                      taskData: {
                        ...prev.formState.taskData,
                        title: e.target.value,
                      },
                    },
                  }));
                }}
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="!mb-[0.30vw] block">
              Department
            </label>
            <div className={`${styles.inputWrapper}`}>
              {Array.isArray(departmentOptions) &&
              departmentOptions.length > 0 ? (
                <CustomSelectInput
                  label={"Select Department"}
                  options={departmentOptions}
                  getValue={(value: string) => {
                    setPageState((prev) => ({
                      ...prev,
                      formState: {
                        ...prev.formState,
                        taskData: {
                          ...prev.formState.taskData,
                          department: value,
                        },
                      },
                    }));
                  }}
                />
              ) : (
                <span className="custom-loader"></span>
              )}
            </div>
          </div>

          {/* Brand */}
          <div>
            <label htmlFor="brand" className="!mb-[0.30vw] block">
              Brand
            </label>
            <div className={`${styles.inputWrapper}`}>
              {Array.isArray(globalBrands) && globalBrands.length > 0 ? (
                <CustomSelectInput
                  label={"Select Brand"}
                  options={globalBrands.map((brand) => brand.brandName) || []}
                  getValue={(value: string) => {
                    setPageState((prev) => ({
                      ...prev,
                      formState: {
                        ...prev.formState,
                        taskData: {
                          ...prev.formState.taskData,
                          brand: brandMap[value],
                        },
                      },
                    }));
                  }}
                />
              ) : (
                <span className="custom-loader"></span>
              )}
            </div>
          </div>

          {/* Assigned To */}
          <div>
            <label htmlFor="assignedTo" className="!mb-[0.30vw] block">
              Assigned To
            </label>
            <div className={`${styles.inputWrapper}`}>
              {Array.isArray(pageState.fetchedEmployees) &&
              pageState.fetchedEmployees.length > 0 ? (
                <CustomSelectInputWithLabelAndValue
                  label={"Select Assigned To"}
                  options={
                    pageState.fetchedEmployees.map((employee) => ({
                      value: employee._id,
                      label: `${employee.firstName} ${employee.lastName}`,
                    })) || []
                  }
                  getValue={(value: string) => {
                    setPageState((prev) => ({
                      ...prev,
                      formState: {
                        ...prev.formState,
                        taskData: {
                          ...prev.formState.taskData,
                          assignedTo: value,
                        },
                      },
                    }));
                  }}
                />
              ) : (
                <span className="custom-loader"></span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-fit ms-auto">
        <CustomBtn
          btnColor="black"
          word="Save"
          onClick={handleAddNewTask}
          disabled={pageState.isLoading}
        />
      </div>
    </section>
  );
};

export default Page;
