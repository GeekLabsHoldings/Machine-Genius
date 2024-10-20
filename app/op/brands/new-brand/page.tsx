"use client";
import React, { useContext, useState } from "react";
import styles from "./newBrand.module.css";
import "./newBrand.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { addIcon, backIcon } from "@/app/_utils/svgIcons";
import { useRouter } from "next/navigation";
import CustomDatePicker from "@/app/_components/DatePicker/CustomDatePicker";
import AddSubBrandModal from "./_AddSubBrandModal/AddSubBrandModal";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import useSessionStorage from "@/app/_hooks/useSessionStorage";

const subBrands = Array.from(
  { length: 20 },
  (_, index) => `Sub-brand ${index + 1}`
);

function InnerInfoCard({}: {}) {
  return (
    <div className={`${styles.info} p-[1vw] rounded-3xl`}>
      <div className="flex justify-between items-center pb-[0.6vw] mb-[0.5vw] border-b-[var(--dark)] border-b-[1px]">
        <h4>subBrandTitle</h4>
        <span className={`px-[0.4vw] py-[0.1vw] font-medium rounded-[--4px]`}>
          subBrandNiche
        </span>
      </div>
      <h5 className=" mb-[0.5vw]">Description</h5>
      <p className=" mb-[0.5vw]">subBrandDescription</p>
      <div className=" flex justify-between items-center">
        <h5>Acquisition Date</h5>
        <span className={`${styles.dateSpan} text-[#ACACAC]`}>
          subBrandAcquisitionDate
        </span>
      </div>
    </div>
  );
}

const Page = () => {
  const { authState, handleSignOut } = useContext(globalContext);

  const router = useRouter();
  const [pageState, setPageState] = useSessionStorage<{
    isLoading: boolean;
    brandName: string;
    brandDescription: string;
    brandNiche: string;
    brandAquisitionDate: number;
    accounts: any[];
  }>("OP-addNewBrand", {
    isLoading: false,
    brandName: "",
    brandDescription: "",
    brandNiche: "",
    brandAquisitionDate: new Date().getTime(),
    accounts: [],
  });

  async function handleAddNewBrand() {
    // if (!postCaption) {
    //   toast.error("No post caption provided!");
    //   return;
    // } else if (!selectedBrandId) {
    //   toast.error("No brand selected!");
    //   return;
    // }
    setPageState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/add-brand-all-data`,
        {
          method: "POST",
          body: JSON.stringify({}),
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
      const json: any = await res.json();
      if (json && json.brand_name) {
        toast.success("Brand added successfully!", {
          duration: 5000,
        });
        router.replace("/op/brands");
      } else {
        toast.error("Something went wrong!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleAddNewBrand:", error);
      setPageState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  return (
    <div className={`${styles.newBrand} newBrand`}>
      <div className="flex items-center gap-[--10px] my-[0.8vw]">
        <span onClick={() => router.replace("/op/brands")}>{backIcon}</span>
        <h3>Add New Brand</h3>
      </div>

      <div className="grid grid-cols-5 w-full gap-[5vw] px-[1vw]">
        <div className={`${styles.form} col-span-2`}>
          <h4 className="mb-[1vw]">Brand Details</h4>

          <label htmlFor="brand_name">Brand Name*</label>
          <input
            type="text"
            id="brand_name"
            name="brand_name"
            placeholder="Juice Box"
            className=" py-[0.6vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
          />

          <label className="mb-[0.7vw] inline-block" htmlFor="brand_niche">
            Niche*
          </label>
          <div className=" w-[15vw] mb-[1.2vw]">
            <CustomSelectInput
              label={"All"}
              options={["Politics", "Entertainment", "Finance"]}
              getValue={(value: any) => {
                setPageState((prev: any) => ({
                  ...prev,
                  brandNiche: value.toLowerCase(),
                }));
              }}
            />
          </div>

          <label htmlFor="brand_description">Description*</label>
          <input
            type="text"
            id="brand_description"
            name="brand_description"
            placeholder="51640615651463254"
            className=" py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
          />

          <label htmlFor="brand_acquisition_date">Acquisition Date*</label>
          <CustomDatePicker
            getDateTimeValue={(value: any) => {
              setPageState((prev: any) => ({
                ...prev,
                brandAquisitionDate: value,
              }));
            }}
          />

          {/* Sub-brands */}
          <div
            className={`${styles.card} px-[1vw] pt-[0.8vw] rounded-3xl mt-[0.9vw]`}
          >
            <div className="flex justify-between items-center pb-[0.7vw] border-b-[1px] border-b-[#2A2B2A] mb-[0.8vw]">
              <h3>Sub-brand</h3>
              <AddSubBrandModal
                btnColor="black"
                modalTitle="Add Sub-brand"
                btnIcon={addIcon}
              />
            </div>

            <div className=" overflow-y-scroll h-[23vh] pr-2 py-[0.2vw]">
              {subBrands.map((brand, index) => (
                <InnerInfoCard key={index} />
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.socialAccordions} col-span-3`}>
          <div className="flex justify-between items-center mb-[1vw]">
            <h4>Social Media</h4>
          </div>
          <div className="flex justify-between h-[62vh] overflow-y-scroll px-[0.5vw] gap-[1.5vw]">
            <div className="w-full">
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                <input type="radio" name="my-accordion-2" />
                <div
                  className={`${styles.collapseTitle} collapse-title text-xl font-semibold`}
                >
                  Website
                </div>
                <div className="collapse-content">
                  <label htmlFor="">Link*</label>

                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                <input type="radio" name="my-accordion-2" />

                <div className="collapse-title text-xl font-semibold">
                  Twitter
                </div>

                <div className="collapse-content">
                  {/* // Label for the Username input field */}
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block" // CSS classes for styling the label
                  >
                    {/* // Label text indicating a required field */}
                    Username*
                  </label>
                  {/* // Input field for the Username */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                  {/* // Label for the Password input field */}
                  <label htmlFor="">Password*</label>
                  {/* // Input field for the Password */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                  {/* // Label for the Link input field */}
                  <label htmlFor="">Link*</label>
                  {/* // Input field for the Link */}
                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Handle*</label>

                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                {/* // Input element for the radio button to control the accordion
                state */}
                <input type="radio" name="my-accordion-2" />
                {/* // Div for the accordion title with styling for font size and
                weight */}
                <div className="collapse-title text-xl font-semibold">
                  Instagram
                </div>

                <div className="collapse-content">
                  {/* // Label for the Username input field with styling for
                  padding, border, width, and display */}
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    {/* // Label text indicating a required field */}
                    Username*
                  </label>
                  {/* // Input field for the Username with placeholder and styling
                  for padding, border, width, outline, display, placeholder text
                  color, and margin-bottom */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                  {/* // Label for the Password input field */}
                  <label htmlFor="">Password*</label>
                  {/* // Input field for the Password with placeholder and styling
                  similar to the Username input */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                  {/* // Label for the Link input field */}
                  <label htmlFor="">Link*</label>
                  {/* // Input field for the Link with placeholder and styling
                  similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Handle*</label>
                  {/* // Input field for the Handle with placeholder and styling
                  similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                {/* Input element for the radio button to control the accordion state */}
                <input type="radio" name="my-accordion-2" />

                {/* Div for the accordion title with styling for font size and weight */}
                <div className="collapse-title text-xl font-semibold">
                  Telegram
                </div>

                {/* Div for the accordion content */}
                <div className="collapse-content">
                  {/* Label for the Username input field */}
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Username*
                  </label>
                  {/* Input field for the Username with placeholder and styling for padding, border, width, outline, display, placeholder text color, and margin-bottom */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Password input field */}
                  <label htmlFor="">Password*</label>
                  {/* Input field for the Password with placeholder and styling similar to the Username input */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Link input field */}
                  <label htmlFor="">Link*</label>
                  {/* Input field for the Link with placeholder and styling similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Handle input field */}
                  <label htmlFor="">Handle*</label>
                  {/* Input field for the Handle with placeholder and styling similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                {/* Input element for the radio button to control the accordion state */}
                <input type="radio" name="my-accordion-2" />

                {/* Div for the accordion title with styling for font size and weight */}
                <div className="collapse-title text-xl font-semibold">
                  Facebook
                </div>

                {/* Div for the accordion content */}
                <div className="collapse-content">
                  {/* Label for the Username input field */}
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Username*
                  </label>
                  {/* Input field for the Username with placeholder and styling for padding, border, width, outline, display, placeholder text color, and margin-bottom */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Password input field */}
                  <label htmlFor="">Password*</label>
                  {/* Input field for the Password with placeholder and styling similar to the Username input */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Link input field */}
                  <label htmlFor="">Link*</label>
                  {/* Input field for the Link with placeholder and styling similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Handle input field */}
                  <label htmlFor="">Handle*</label>
                  {/* Input field for the Handle with placeholder and styling similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                {/* Input element for the radio button to control the accordion state */}
                <input type="radio" name="my-accordion-2" />

                {/* Div for the accordion title with styling for font size and weight */}
                <div className="collapse-title text-xl font-semibold">
                  Youtube
                </div>

                {/* Div for the accordion content */}
                <div className="collapse-content">
                  {/* Label for the Username input field */}
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Username*
                  </label>
                  {/* Input field for the Username with placeholder and styling for padding, border, width, outline, display, placeholder text color, and margin-bottom */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Password input field */}
                  <label htmlFor="">Password*</label>
                  {/* Input field for the Password with placeholder and styling similar to the Username input */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Link input field */}
                  <label htmlFor="">Link*</label>
                  {/* Input field for the Link with placeholder and styling similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Handle input field */}
                  <label htmlFor="">Handle*</label>
                  {/* Input field for the Handle with placeholder and styling similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                {/* Input element for the radio button to control the accordion state */}
                <input type="radio" name="my-accordion-2" />

                {/* Div for the accordion title with styling for font size and weight */}
                <div className="collapse-title text-xl font-semibold">
                  Reddit
                </div>

                {/* Div for the accordion content */}
                <div className="collapse-content">
                  {/* Label for the Username input field */}
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Username*
                  </label>
                  {/* Input field for the Username with placeholder and styling for padding, border, width, outline, display, placeholder text color, and margin-bottom */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Password input field */}
                  <label htmlFor="">Password*</label>
                  {/* Input field for the Password with placeholder and styling similar to the Username input */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Link input field */}
                  <label htmlFor="">Link*</label>
                  {/* Input field for the Link with placeholder and styling similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Handle input field */}
                  <label htmlFor="">Handle*</label>
                  {/* Input field for the Handle with placeholder and styling similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                {/* Input element for the radio button to control the accordion state */}
                <input type="radio" name="my-accordion-2" />

                {/* Div for the accordion title with styling for font size and weight */}
                <div className="collapse-title text-xl font-semibold">
                  Discord
                </div>

                {/* Div for the accordion content */}
                <div className="collapse-content">
                  {/* Label for the Username input field */}
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Username*
                  </label>
                  {/* Input field for the Username with placeholder and styling for padding, border, width, outline, display, placeholder text color, and margin-bottom */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Password input field */}
                  <label htmlFor="">Password*</label>
                  {/* Input field for the Password with placeholder and styling similar to the Username input */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Link input field */}
                  <label htmlFor="">Link*</label>
                  {/* Input field for the Link with placeholder and styling similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Handle input field */}
                  <label htmlFor="">Handle*</label>
                  {/* Input field for the Handle with placeholder and styling similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                {/* Input element for the radio button to control the accordion state */}
                <input type="radio" name="my-accordion-2" />

                {/* Div for the accordion title with styling for font size and weight */}
                <div className="collapse-title text-xl font-semibold">
                  Tiktok
                </div>

                {/* Div for the accordion content */}
                <div className="collapse-content">
                  {/* Label for the Username input field */}
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Username*
                  </label>
                  {/* Input field for the Username with placeholder and styling for padding, border, width, outline, display, placeholder text color, and margin-bottom */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Password input field */}
                  <label htmlFor="">Password*</label>
                  {/* Input field for the Password with placeholder and styling similar to the Username input */}
                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Link input field */}
                  <label htmlFor="">Link*</label>
                  {/* Input field for the Link with placeholder and styling similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  {/* Label for the Handle input field */}
                  <label htmlFor="">Handle*</label>
                  {/* Input field for the Handle with placeholder and styling similar to the previous input fields */}
                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-fit ms-auto">
        <CustomBtn
          btnColor="black"
          word="Save"
          onClick={handleAddNewBrand}
          disabled={pageState.isLoading}
        />
      </div>
    </div>
  );
};

export default Page;
