"use client";
import styles from "./emailCreation.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { globalContext } from "@/app/_context/store";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

interface IFormState {
  userData: {
    primaryEmailAddress: string;
    password: string;
    firstName: string;
    lastName: string;
    displayName: string;
    department: string;
    designation: string;
    mobileNumber: string;
    oneTimePassword: boolean;
    employeeId: string;
  };
  brand: string;
}

interface IZohoCredentials {
  acc_id: string;
  clientId: string;
  clientSecret: string;
  code: string;
}

const Page = () => {
  const { authState, handleSignOut, globalBrands, brandMap } =
    useContext(globalContext);
  const router = useRouter();
  const [pageState, setPageState] = useState<{
    formState: IFormState;
    isLoading: boolean;
    formStep: number;
    zohoCredentials: IZohoCredentials;
  }>({
    formState: {
      userData: {
        primaryEmailAddress: "",
        password: "",
        firstName: "",
        lastName: "",
        displayName: "",
        department: "",
        designation: "",
        mobileNumber: "",
        oneTimePassword: false,
        employeeId: uuidv4(),
      },
      brand: "",
    },
    zohoCredentials: {
      acc_id: "",
      clientId: "",
      clientSecret: "",
      code: "",
    },
    isLoading: false,
    formStep: 1,
  });

  async function handleAddEmail() {
    if (
      !pageState.formState.userData.primaryEmailAddress ||
      !pageState.formState.brand ||
      !pageState.formState.userData.password ||
      !pageState.formState.userData.firstName ||
      !pageState.formState.userData.lastName ||
      !pageState.formState.userData.displayName ||
      !pageState.formState.userData.department ||
      !pageState.formState.userData.designation ||
      !pageState.formState.userData.mobileNumber
    ) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      setPageState((prev) => ({ ...prev, isLoading: true }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/emails/add-email`,
        {
          method: "POST",
          body: JSON.stringify({
            userData: {
              primaryEmailAddress:
                pageState.formState.userData.primaryEmailAddress,
              password: pageState.formState.userData.password,
              firstName: pageState.formState.userData.firstName,
              lastName: pageState.formState.userData.lastName,
              displayName: pageState.formState.userData.displayName,
              department: pageState.formState.userData.department,
              designation: pageState.formState.userData.designation,
              mobileNumber: pageState.formState.userData.mobileNumber,
              oneTimePassword: pageState.formState.userData.oneTimePassword,
              employeeId: pageState.formState.userData.employeeId,
            },
            brand: pageState.formState.brand,
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
      if (json && json._id) {
        setPageState((prev) => ({
          ...prev,
          isLoading: false,
          formStep: 2,
          zohoCredentials: {
            ...prev.zohoCredentials,
            acc_id: json._id,
          },
        }));
      } else {
        toast.error("Something went wrong!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      setPageState((prev) => ({ ...prev, isLoading: false }));
      toast.error("Something went wrong!");
      console.error("Error handleAddEmail:", error);
    }
  }

  async function handleUpdateAccessToken() {
    if (
      !pageState.zohoCredentials.acc_id ||
      !pageState.zohoCredentials.clientId ||
      !pageState.zohoCredentials.clientSecret ||
      !pageState.zohoCredentials.code
    ) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      setPageState((prev) => ({ ...prev, isLoading: true }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/emails/update-accesstokens`,
        {
          method: "POST",
          body: JSON.stringify({
            acc_id: pageState.zohoCredentials.acc_id,
            clientId: pageState.zohoCredentials.clientId,
            clientSecret: pageState.zohoCredentials.clientSecret,
            code: pageState.zohoCredentials.code,
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
        toast.success("Access token updated successfully!");
        // setPageState((prev) => ({ ...prev, isLoading: false }));
        router.push("/op/dashboard");
      }
      // const json: any = await res.json();
      // if (json && json._id) {
      //   setPageState((prev) => ({
      //     ...prev,
      //     isLoading: false,
      //   }));
      // } else {
      //   toast.error("Something went wrong!");
      //   setPageState((prev) => ({ ...prev, isLoading: false }));
      // }
    } catch (error) {
      setPageState((prev) => ({ ...prev, isLoading: false }));
      toast.error("Something went wrong!");
      console.error("Error handleUpdateAccessToken:", error);
    }
  }

  return (
    <section
      className={
        styles.container +
        " flex flex-col justify-center items-center w-full h-full"
      }
    >
      <ol className="flex justify-center items-center gap-10 w-full my-[--sy-60px]">
        {/* Step 1 */}
        <li
          className={`flex items-center space-x-2.5 ${
            pageState.formStep === 1
              ? "text-[--dark]"
              : "text-gray-500"
          }`}
        >
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
              pageState.formStep === 1
                ? "border-[--2px] border-[--dark] font-bold"
                : "border border-gray-500 font-medium"
            }`}
          >
            1
          </span>
          <span>
            <h3 className={pageState.formStep === 1 ? "font-bold" : "font-medium" + " leading-tight font-sans"}>User Info</h3>
          </span>
        </li>

        {/* Step 2 */}
        <li
          className={`flex items-center space-x-2.5 ${
            pageState.formStep === 2
              ? "text-[--dark]"
              : "text-gray-500"
          }`}
        >
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
              pageState.formStep === 2
                ? "border-[--2px] border-[--dark] font-bold"
                : "border border-gray-500 font-medium"
            }`}
          >
            2
          </span>
          <span>
            <h3 className={pageState.formStep === 2 ? "font-bold" : "font-medium" + " leading-tight font-sans"}>Zoho Credentials</h3>
          </span>
        </li>
      </ol>

      {pageState.formStep === 1 && (
        <>
          <div
            className={`flex justify-between gap-[3vw] !min-w-[40vw] h-[55vh]`}
          >
            {/* ===== Start Col (1) ===== */}
            <div className="flex flex-col gap-[1vw] w-1/2">
              {/* Primary Email Address* */}
              <div>
                <label htmlFor="primary-email-address">
                  Primary Email Address*
                </label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="primary-email-address"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.formState.userData.primaryEmailAddress}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        formState: {
                          ...prev.formState,
                          userData: {
                            ...prev.formState.userData,
                            primaryEmailAddress: e.target.value,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* First Name* */}
              <div>
                <label htmlFor="first-name">First Name*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="first-name"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.formState.userData.firstName}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        formState: {
                          ...prev.formState,
                          userData: {
                            ...prev.formState.userData,
                            firstName: e.target.value,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Display Name* */}
              <div>
                <label htmlFor="display-name">Display Name*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="display-name"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.formState.userData.displayName}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        formState: {
                          ...prev.formState,
                          userData: {
                            ...prev.formState.userData,
                            displayName: e.target.value,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department">Department*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="department"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.formState.userData.department}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        formState: {
                          ...prev.formState,
                          userData: {
                            ...prev.formState.userData,
                            department: e.target.value,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Brand */}
              <div>
                <label htmlFor="brand" className="!mb-[0.30vw] block">
                  Brand*
                </label>
                <div className={`${styles.inputWrapper}`}>
                  {Array.isArray(globalBrands) && globalBrands.length > 0 ? (
                    <CustomSelectInput
                      label={"Select Brand"}
                      options={
                        globalBrands.map((brand) => brand.brandName) || []
                      }
                      getValue={(value: string) => {
                        setPageState((prev) => ({
                          ...prev,
                          formState: {
                            ...prev.formState,
                            brand: brandMap[value],
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
            {/* ===== End Col (1) ===== */}

            {/* ===== Start Col (2) ===== */}
            <div className="flex flex-col gap-[1vw] w-1/2">
              {/* Password* */}
              <div>
                <label htmlFor="password">Password*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="password"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.formState.userData.password}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        formState: {
                          ...prev.formState,
                          userData: {
                            ...prev.formState.userData,
                            password: e.target.value,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Last Name* */}
              <div>
                <label htmlFor="last-name">Last Name*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="last-name"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.formState.userData.lastName}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        formState: {
                          ...prev.formState,
                          userData: {
                            ...prev.formState.userData,
                            lastName: e.target.value,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Mobile Number* */}
              <div>
                <label htmlFor="mobile-number">Mobile Number*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="mobile-number"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.formState.userData.mobileNumber}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        formState: {
                          ...prev.formState,
                          userData: {
                            ...prev.formState.userData,
                            mobileNumber: e.target.value,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Designation */}
              <div>
                <label htmlFor="designation">Designation*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="designation"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.formState.userData.designation}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        formState: {
                          ...prev.formState,
                          userData: {
                            ...prev.formState.userData,
                            designation: e.target.value,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
            {/* ===== End Col (2) ===== */}
          </div>

          <div className="flex justify-end items-center w-full">
            <CustomBtn
              word="Next"
              btnColor="black"
              onClick={handleAddEmail}
              disabled={pageState.isLoading}
            />
          </div>
        </>
      )}

      {pageState.formStep === 2 && (
        <>
          <div className={`!min-w-[40vw] h-[55vh]`}>
            {/* ===== Start Col (1) ===== */}
            <div className="flex flex-col gap-[1vw]">
              {/* clientId* */}
              <div>
                <label htmlFor="clientId">clientId*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="clientId"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.zohoCredentials.clientId}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        zohoCredentials: {
                          ...prev.zohoCredentials,
                          clientId: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* clientSecret* */}
              <div>
                <label htmlFor="clientSecret">clientSecret*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="clientSecret"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.zohoCredentials.clientSecret}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        zohoCredentials: {
                          ...prev.zohoCredentials,
                          clientSecret: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* code */}
              <div>
                <label htmlFor="code">code*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="code"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.zohoCredentials.code}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        zohoCredentials: {
                          ...prev.zohoCredentials,
                          code: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
            {/* ===== End Col (1) ===== */}
          </div>

          <div className="flex justify-end items-center w-full">
            <CustomBtn
              word="All Done"
              btnColor="black"
              onClick={handleUpdateAccessToken}
              disabled={pageState.isLoading}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
