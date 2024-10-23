"use client";
import styles from "./domainCreation.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { globalContext } from "@/app/_context/store";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const steps = [
  { number: 1, title: "Check Domain Availability" },
  { number: 2, title: "Register Domain" },
  { number: 3, title: "Domain Email Verification" },
  { number: 4, title: "Activate Domain" },
];

// ===== Start Step 1 =====
interface ICheckDomainWithPricesResponse {
  available: boolean;
  prices?: IPriceInfo;
  message?: string;
  suggestions?: IDomainSuggestion[];
}

interface IPriceInfo {
  registrationPrice: Price;
  renewalPrice: Price;
}

interface Price {
  Currency: string;
  Price: number;
}

interface IDomainSuggestion {
  DomainName: string;
  prices: IPriceInfo;
}
// ===== End Step 1 =====
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
  domainName?: string;
  DurationInYears: number;
  AutoRenew: boolean;
}
// ===== End Step 2 =====

const Page = () => {
  const { authState, handleSignOut, globalBrands, brandMap, brandIdMap } =
    useContext(globalContext);
  const router = useRouter();
  const [pageState, setPageState] = useState<{
    isLoading: boolean;
    formStep: number;
    // ===== Start Step 1 =====
    domainName: string;
    domainSuggestions: IDomainSuggestion[];
    domainPrices: IPriceInfo | null;
    // ===== End Step 1 =====
    // ===== Start Step 2 =====
    step2FormState: IStep2FormState;
    // ===== End Step 2 =====
    // ===== Start Step 3 =====
    isEmailVerified: boolean;
    // ===== End Step 3 =====
  }>({
    isLoading: false,
    formStep: 1,
    // ===== Start Step 1 =====
    domainName: "",
    domainSuggestions: [],
    domainPrices: null,
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
      DurationInYears: 1,
      AutoRenew: true,
    },
    // ===== End Step 2 =====
    // ===== Start Step 3 =====
    isEmailVerified: false,
    // ===== End Step 3 =====
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/check-domain-with-prices`,
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
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
      const json: ICheckDomainWithPricesResponse = await res.json();
      if (json && json.available === true) {
        toast.success("Domain is available!");
        setPageState((prev) => ({
          ...prev,
          isLoading: false,
          // formStep: 2,
          domainPrices: json.prices || null,
          domainSuggestions: [],
          // Reset Step 1
          // domainName: "",
          // domainSuggestions: [],
        }));
        return;
      } else if (json && json.available === false) {
        toast.error("Domain is already taken!");
        if (
          json &&
          Array.isArray(json.suggestions) &&
          json.suggestions.length > 0
        ) {
          setPageState((prev) => ({
            ...prev,
            isLoading: false,
            domainSuggestions: json.suggestions || [],
            domainPrices: null,
          }));
          return;
        }
        setPageState((prev) => ({
          ...prev,
          isLoading: false,
          domainPrices: null,
        }));
        return;
      } else {
        toast.error("Something went wrong!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      setPageState((prev) => ({ ...prev, isLoading: false }));
      toast.error("Something went wrong!");
      console.error("Error checkDomainAvailability:", error);
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
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      } else {
        toast.success("Domain registered successfully! Please verify email.");
        setPageState((prev) => ({
          ...prev,
          isLoading: false,
          formStep: 3,
        }));
      }
    } catch (error) {
      setPageState((prev) => ({ ...prev, isLoading: false }));
      toast.error("Something went wrong!");
      console.error("Error handleRegisterDomain:", error);
    }
  }
  // ===== End Step 2 =====

  // ===== Start Step 3 =====
  async function handleCheckEmailVerification() {
    if (!pageState.domainName || !pageState.isEmailVerified) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      setPageState((prev) => ({ ...prev, isLoading: true }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/check-domain-email-verification`,
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
        toast.error(
          "Something went wrong! Please make sure you have verified the email."
        );
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      } else {
        toast.success("Email verified successfully!");
        setPageState((prev) => ({
          ...prev,
          isLoading: false,
          formStep: 4,
        }));
      }
    } catch (error) {
      setPageState((prev) => ({ ...prev, isLoading: false }));
      toast.error("Something went wrong!");
      console.error("Error handleCheckEmailVerification:", error);
    }
  }
  // ===== End Step 3 =====

  // ===== Start Step 4 =====
  async function handleActivateDomain() {
    if (!pageState.domainName || !pageState.step2FormState.brand) {
      toast.error("Please fill all required fields!");
      return;
    }
    try {
      setPageState((prev) => ({ ...prev, isLoading: true }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/activate-domain`,
        {
          method: "POST",
          body: JSON.stringify({
            domainName: pageState.domainName,
            brand: pageState.step2FormState.brand,
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
        toast.success("Domain activated successfully!");
        router.push("/op/dashboard");
      }
    } catch (error) {
      setPageState((prev) => ({ ...prev, isLoading: false }));
      toast.error("Something went wrong!");
      console.error("Error handleActivateDomain:", error);
    }
  }
  // ===== End Step 4 =====

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

                <div className="mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm block mb-1">
                      Allowed Domain Extensions:
                    </span>
                    <span className="text-gray-500 text-[--12px]">
                      e.g. example.com
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["com", "net", "org", "info", "biz", "us", "co", "io"].map(
                      (tld) => (
                        <span
                          key={tld}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs hover:bg-gray-300 transition"
                          title={`Top-level domain: .${tld}`}
                          aria-label={`Allowed domain extension: .${tld}`}
                        >
                          .{tld}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Display domainPrices if domain is available */}
              {pageState.domainPrices && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                  <p className="text-green-600 font-semibold mb-2">
                    Domain is available!
                  </p>
                  <div className="text-gray-700">
                    <p>
                      Registration Price:{" "}
                      <span className="font-semibold">
                        {pageState.domainPrices.registrationPrice.Currency}{" "}
                        {pageState.domainPrices.registrationPrice.Price}
                      </span>
                    </p>
                    <p>
                      Renewal Price:{" "}
                      <span className="font-semibold">
                        {pageState.domainPrices.renewalPrice.Currency}{" "}
                        {pageState.domainPrices.renewalPrice.Price}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <CustomBtn
                      word="Proceed to Registration"
                      btnColor="black"
                      onClick={() =>
                        setPageState((prev) => ({
                          ...prev,
                          formStep: 2,
                        }))
                      }
                      paddingVal="py-[--10px] px-[--22px]"
                    />
                  </div>
                </div>
              )}

              {/* Domain Suggestions */}
              {pageState.domainSuggestions.length > 0 && (
                <div className="mt-4 p-4 bg-red rounded-lg shadow-md overflow-hidden">
                  <p className="text-gray-700 font-semibold mb-2">
                    Suggestions:
                  </p>
                  <ul className="space-y-2 max-h-[30vh] overflow-y-auto">
                    {pageState.domainSuggestions
                      .filter(Boolean)
                      .map((suggestion) => (
                        <li
                          key={suggestion.DomainName}
                          className="px-3 py-2 bg-gray-50 rounded-md hover:bg-blue-100 cursor-pointer transition-colors duration-200 flex justify-between items-center"
                          onClick={() => {
                            setPageState((prev) => ({
                              ...prev,
                              domainName: suggestion.DomainName,
                              domainPrices: suggestion.prices,
                              domainSuggestions: [],
                            }));
                          }}
                        >
                          <span className="text-blue-600 hover:underline">
                            {suggestion.DomainName}
                          </span>
                          <span className="text-gray-500">
                            {suggestion.prices.registrationPrice.Currency}{" "}
                            {suggestion.prices.registrationPrice.Price}
                          </span>
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
              word="Check Domain Availability"
              btnColor="black"
              onClick={checkDomainAvailability}
              disabled={pageState.isLoading}
              paddingVal="py-[--10px] px-[--22px]"
            />
          </div>
        </>
      )}

      {pageState.formStep === 2 && (
        <>
          <div
            className={`flex justify-between gap-[3vw] !min-w-[40vw] h-[55vh]`}
          >
            {/* ===== Start Col (1) ===== */}
            <div className="flex flex-col gap-[1vw] w-1/2">
              {/* Email Address* */}
              <div>
                <label htmlFor="email-address">Email Address*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="email-address"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.step2FormState.Email}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        step2FormState: {
                          ...prev.step2FormState,
                          Email: e.target.value,
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
                    value={pageState.step2FormState.FirstName}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        step2FormState: {
                          ...prev.step2FormState,
                          FirstName: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Contact Type* */}
              <div>
                <label htmlFor="contact-type">Contact Type*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="contact-type"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.step2FormState.ContactType}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        step2FormState: {
                          ...prev.step2FormState,
                          ContactType: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label htmlFor="city">City*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="city"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.step2FormState.City}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        step2FormState: {
                          ...prev.step2FormState,
                          City: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* CountryCode */}
              <div>
                <label htmlFor="country-code">Country Code*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="department"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.step2FormState.CountryCode}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        step2FormState: {
                          ...prev.step2FormState,
                          CountryCode: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Duration In Years */}
              <div>
                <label htmlFor="duration-in-years">Duration In Years*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="number"
                    id="duration-in-years"
                    max={10}
                    required
                    className={`${styles.customInput}`}
                    value={pageState.step2FormState.DurationInYears}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        step2FormState: {
                          ...prev.step2FormState,
                          DurationInYears: Number(e.target.value),
                        },
                      }));
                    }}
                  />
                </div>
                <span className="text-gray-500 text-[--12px]">
                  max duration: 10 years
                </span>
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
                          step2FormState: {
                            ...prev.step2FormState,
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
              {/* Phone Number* */}
              <div>
                <label htmlFor="phone-number">Phone Number*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="phone-number"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.step2FormState.PhoneNumber}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        step2FormState: {
                          ...prev.step2FormState,
                          PhoneNumber: e.target.value,
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
                    value={pageState.step2FormState.LastName}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        step2FormState: {
                          ...prev.step2FormState,
                          LastName: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Address Line 1* */}
              <div>
                <label htmlFor="address-line-1">Address Line (1)*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="address-line-1"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.step2FormState.AddressLine1}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        step2FormState: {
                          ...prev.step2FormState,
                          AddressLine1: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* State */}
              <div>
                <label htmlFor="state">State*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="state"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.step2FormState.State}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        step2FormState: {
                          ...prev.step2FormState,
                          State: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* ZipCode */}
              <div>
                <label htmlFor="zip-code">Zip Code*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="zip-code"
                    required
                    className={`${styles.customInput}`}
                    value={pageState.step2FormState.ZipCode}
                    onChange={(e) => {
                      setPageState((prev) => ({
                        ...prev,
                        step2FormState: {
                          ...prev.step2FormState,
                          ZipCode: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>

              {/* AutoRenew */}
              <div className="flex items-center gap-[--20px]">
                <label htmlFor="auto-renew">Auto Renew*</label>
                <input
                  type="checkbox"
                  id="auto-renew"
                  required
                  className="w-[--20px] h-[--20px]"
                  checked={pageState.step2FormState.AutoRenew}
                  onChange={(e) => {
                    setPageState((prev) => ({
                      ...prev,
                      step2FormState: {
                        ...prev.step2FormState,
                        AutoRenew: e.target.checked,
                      },
                    }));
                  }}
                />
              </div>
            </div>
            {/* ===== End Col (2) ===== */}
          </div>

          <div className="flex justify-end items-center w-full">
            <CustomBtn
              word="Register Domain"
              btnColor="black"
              onClick={handleRegisterDomain}
              disabled={pageState.isLoading}
              paddingVal="py-[--10px] px-[--22px]"
            />
          </div>
        </>
      )}

      {pageState.formStep === 3 && (
        <>
          <div className={`!min-w-[40vw] h-[55vh]`}>
            {/* ===== Start Col (1) ===== */}
            <div className="flex flex-col gap-[3vw]">
              {/* Domain Name* */}
              <div>
                <label htmlFor="domainName">Domain Name*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="domainName"
                    required
                    readOnly
                    className={`${styles.customInput}`}
                    value={pageState.domainName}
                    // onChange={(e) => {
                    //   setPageState((prev) => ({
                    //     ...prev,
                    //     domainName: e.target.value,
                    //   }));
                    // }}
                  />
                </div>
              </div>
              {/* AutoRenew */}
              <div className="flex items-center gap-[--12px]">
                <input
                  type="checkbox"
                  id="verified-email"
                  required
                  className="w-[--20px] h-[--20px]"
                  checked={pageState.isEmailVerified}
                  onChange={(e) => {
                    setPageState((prev) => ({
                      ...prev,
                      isEmailVerified: e.target.checked,
                    }));
                  }}
                />

                <label htmlFor="verified-email">
                  I have verified the email*
                </label>
              </div>
            </div>
            {/* ===== End Col (1) ===== */}
          </div>

          <div className="flex justify-end items-center w-full">
            <CustomBtn
              word="Check Email Verification"
              btnColor="black"
              onClick={handleCheckEmailVerification}
              disabled={pageState.isLoading}
              paddingVal="py-[--10px] px-[--22px]"
            />
          </div>
        </>
      )}

      {pageState.formStep === 4 && (
        <>
          <div className={`!min-w-[40vw] h-[55vh]`}>
            {/* ===== Start Col (1) ===== */}
            <div className="flex flex-col gap-[3vw]">
              {/* Domain Name* */}
              <div>
                <label htmlFor="domainName">Domain Name*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="domainName"
                    required
                    readOnly
                    className={`${styles.customInput}`}
                    value={pageState.domainName}
                    // onChange={(e) => {
                    //   setPageState((prev) => ({
                    //     ...prev,
                    //     domainName: e.target.value,
                    //   }));
                    // }}
                  />
                </div>
              </div>
              {/* Brand* */}
              <div>
                <label htmlFor="brand">Brand*</label>
                <div className={`${styles.inputWrapper}`}>
                  <input
                    type="text"
                    id="brand"
                    required
                    readOnly
                    className={`${styles.customInput}`}
                    value={brandIdMap[pageState.step2FormState.brand]}
                  />
                </div>
              </div>
            </div>
            {/* ===== End Col (1) ===== */}
          </div>

          <div className="flex justify-end items-center w-full">
            <CustomBtn
              word="Activate Domain"
              btnColor="black"
              onClick={handleActivateDomain}
              disabled={pageState.isLoading}
              paddingVal="py-[--10px] px-[--22px]"
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
