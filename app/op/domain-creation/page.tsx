"use client";
import styles from "./domainCreation.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { globalContext } from "@/app/_context/store";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const steps = [
  { number: 1, title: "Check Domain Availability" },
  { number: 2, title: "User Info" },
  { number: 3, title: "Zoho Credentials" },
  // You can add more steps here
];

// ===== Start Step 2 =====
interface IStep2FormState {
  brand: string;
  FirstName: string;
  LastName: string;
  ContactType: string;
  AddressLine1: string;
  City: string;
  State: string;
  CountryCode: string;
  ZipCode: string;
  PhoneNumber: string;
  Email: string;
  domainName: string;
  DurationInYears: number;
  AutoRenew: boolean;
}
// ===== End Step 2 =====

const Page = () => {
  const { authState, handleSignOut, globalBrands, brandMap } =
    useContext(globalContext);
  const router = useRouter();
  const [pageState, setPageState] = useState<{
    isLoading: boolean;
    formStep: number;
    // ===== Start Step 1 =====
    domainName: string;
    domainSuggestions: string[];
    // ===== End Step 1 =====
    // ===== Start Step 2 =====
    step2FormState: IStep2FormState;
    // ===== End Step 2 =====
  }>({
    isLoading: false,
    formStep: 1,
    // ===== Start Step 1 =====
    domainName: "",
    domainSuggestions: [],
    // ===== End Step 1 =====
    // ===== Start Step 2 =====
    step2FormState: {
      brand: "",
      FirstName: "",
      LastName: "",
      ContactType: "",
      AddressLine1: "",
      City: "",
      State: "",
      CountryCode: "",
      ZipCode: "",
      PhoneNumber: "",
      Email: "",
      domainName: "",
      DurationInYears: 1,
      AutoRenew: true,
    },
    // ===== End Step 2 =====
  });

  // ===== Start Step 1 =====
  async function checkDomainAvailability() {
    if (!pageState.domainName) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      setPageState((prev) => ({ ...prev, isLoading: true }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/check-domain-availability`,
        {
          method: "POST",
          body: JSON.stringify({
            domainName: pageState.domainName,
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
      if (json && json.isAvailable === true) {
        toast.success("Domain is available!");
        setPageState((prev) => ({
          ...prev,
          isLoading: false,
          formStep: 2,
          // Reset Step 1
          domainName: "",
          domainSuggestions: [],
        }));
        return;
      } else if (json && json.isAvailable === false) {
        toast.error("Domain is already taken!");
        if (
          json &&
          Array.isArray(json.suggestions) &&
          json.suggestions.length > 0
        ) {
          setPageState((prev) => ({
            ...prev,
            isLoading: false,
            domainSuggestions: json.suggestions,
          }));
          return;
        }
        return;
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
  // ===== End Step 1 =====

  // ===== Start Step 2 =====
  async function handleRegisterDomain() {
    if (Object.values(pageState.step2FormState).some((value) => !value)) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      setPageState((prev) => ({ ...prev, isLoading: true }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/register-domain`,
        {
          method: "POST",
          body: JSON.stringify({
            ...pageState.step2FormState,
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
        toast.success("Domain registered successfully!");
        setPageState((prev) => ({
          ...prev,
          isLoading: false,
          formStep: 3,
        }));
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
  // ===== End Step 2 =====

  return (
    <section
      className={
        styles.container +
        " flex flex-col justify-center items-center w-full h-full"
      }
    >
      <ol className="flex justify-center items-center gap-10 w-full my-[--sy-60px]">
        {steps.map((step) => (
          <li
            key={step.number}
            className={`flex items-center space-x-2.5 ${
              pageState.formStep === step.number
                ? "text-[--dark]"
                : "text-gray-500"
            }`}
          >
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
                pageState.formStep === step.number
                  ? "border-[--2px] border-[--dark] font-bold"
                  : "border border-gray-500 font-medium"
              }`}
            >
              {step.number}
            </span>
            <span>
              <h3
                className={`${
                  pageState.formStep === step.number
                    ? "font-bold"
                    : "font-medium"
                } leading-tight font-sans`}
              >
                {step.title}
              </h3>
            </span>
          </li>
        ))}
      </ol>

      {pageState.formStep === 1 && (
        <>
          <div className={`!min-w-[40vw] h-[55vh]`}>
            {/* ===== Start Col (1) ===== */}
            <div className="flex flex-col gap-[1vw]">
              <div>
                <label htmlFor="domainName">Domain Name*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="domainName"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.domainName}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        domainName: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              {pageState.domainSuggestions.length > 0 && (
                <div>
                  <p>Suggestions:</p>
                  <ul>
                    {pageState.domainSuggestions.map((suggestion) => (
                      <li
                        key={suggestion}
                        className="cursor-pointer"
                        onClick={() => {
                          setPageState((prev) => ({
                            ...prev,
                            domainName: suggestion,
                          }));
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* ===== End Col (1) ===== */}
          </div>

          <div className="flex justify-end items-center w-full">
            <CustomBtn
              word="Next"
              btnColor="black"
              onClick={checkDomainAvailability}
              disabled={pageState.isLoading}
            />
          </div>
        </>
      )}

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
