"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./newTask.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { backIcon } from "@/app/_utils/svgIcons";
import { useRouter } from "next/navigation";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

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
  role: string;
  cv: string;
  linkedIn: string;
}

const departmentOptions = Object.keys(DepartmentEnum).map((key) => key);

// ===== Start CustomSelectInput =====
interface Option<T> {
  value: T;
  label: string;
}

interface Iprops<T> {
  label: string;
  defaultValue?: T;
  options: Option<T>[];
  icon?: any;
  theme?: "dark";
  whenSideNavClosed?: boolean;
  getValue?: (value: T) => void;
  paddingVal?: string;
  children?: React.ReactNode;
  hoverColor?: string;
}

const CustomSelectInput1 = <T,>(props: Iprops<T>) => {
  const [isActive, setIsActive] = useState(false);

  const [selectedOption, setSelectedOption] = useState<Option<T>>(() => {
    if (props.defaultValue !== undefined) {
      const matchingOption = props.options.find(
        (option) => option.value === props.defaultValue
      );
      if (matchingOption) return matchingOption;
    }
    return props.options[0];
  });

  const ref = useRef<HTMLDivElement | null>(null);
  const clickableContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (props.whenSideNavClosed) {
      setIsActive(false);
    }
  }, [props.whenSideNavClosed]);

  // Detect if there is a space for the dropdown to open downwards, if not, open upwards
  useEffect(() => {
    if (ref.current) {
      const clickContainer =
        clickableContainer.current?.getBoundingClientRect();

      if (
        clickContainer &&
        window.innerHeight - clickContainer.bottom < window.innerHeight / 3
      ) {
        ref.current.style.top = "auto";
        ref.current.style.bottom = "125%";
      } else {
        ref.current.style.top = "125%";
        ref.current.style.bottom = "auto";
      }
    }
  }, [isActive]);

  const handleSelectedItem = (option: Option<T>) => {
    setSelectedOption(option);
    setIsActive(false);
    if (props.getValue) {
      props.getValue(option.value);
    }
  };

  return (
    <div
      className={`${styles.dropdown} ${
        props.theme === "dark" ? styles.dark : ""
      } ${props.whenSideNavClosed ? styles.onClose : ""}`}
    >
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={`${styles.dropdown_btn} ${
          props.paddingVal ? props.paddingVal : `py-[0.2vw] px-[1.2vw]`
        } ${isActive ? styles.open : ""} `}
        ref={clickableContainer}
      >
        {props.icon}
        <span>{selectedOption.label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 21 11"
          fill="none"
          className={styles.toggleIcon}
        >
          <path
            d="M19.9494 2.76915e-06L1.04883 1.11645e-06C0.857472 0.000420716 0.669902 0.037347 0.506307 0.106803C0.342711 0.176259 0.209287 0.275614 0.120398 0.394177C0.0315084 0.512738 -0.00947862 0.646018 0.00184339 0.779666C0.0131673 0.913315 0.0763711 1.04227 0.184657 1.15266L9.63492 10.703C10.0266 11.099 10.9695 11.099 11.3622 10.703L20.8125 1.15266C20.9219 1.0425 20.986 0.913482 20.998 0.779611C21.0099 0.64574 20.9692 0.51214 20.8802 0.393327C20.7912 0.274514 20.6574 0.17503 20.4933 0.105687C20.3292 0.0363435 20.1411 -0.000207976 19.9494 2.76915e-06Z"
            fill="#2A2B2A"
          />
        </svg>
      </div>
      <div
        className={styles.dropdown_content}
        style={{ display: isActive ? "block" : "none" }}
        ref={ref}
      >
        <div>
          {props.options.map((option) => (
            <div
              onClick={() => handleSelectedItem(option)}
              className={`${styles.item} ${
                props.hoverColor ? props.hoverColor : "hover:bg-[--orange]"
              }`}
              key={uuidv4()}
            >
              {option.label}
            </div>
          ))}
        </div>
        {props.children}
      </div>
    </div>
  );
};
// ===== End CustomSelectInput =====

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
                <CustomSelectInput1
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
