"use client";
import React, { useState } from "react";
import styles from "./newBrand.module.css";
import "./newBrand.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { addIcon, backIcon } from "@/app/_utils/svgIcons";
import { useRouter } from "next/navigation";
import CustomDatePicker from "@/app/_components/DatePicker/CustomDatePicker";
import AddSubBrandModal from "./_AddSubBrandModal/AddSubBrandModal";

const subBrands = Array.from(
  { length: 20 },
  (_, index) => `Sub-brand ${index + 1}`
);

const Page = () => {
  const router = useRouter();
  const [pageState, setPageState] = useState<{
    isLoading: boolean;
  }>({
    isLoading: false,
  });

  function getDateTimeValue(value: any) {
    if (setPageState) {
      setPageState((prev: any) => ({ ...prev, scheduledTime: value }));
    }
  }

  return (
    <div className={`${styles.newBrand} newBrand`}>
      <div className="flex items-center gap-[--10px] my-[1vw]">
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
            <CustomSelectInput label={"All"} options={["Niche", "Niches"]} />
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
          <CustomDatePicker getDateTimeValue={getDateTimeValue} />

          {/* Sub-brands */}
          <div className="rounded-2xl p-2 shadow-sm mt-[1.2vw] border-[--2px] border-[#DBDBD7]">
            <div className="flex justify-between py-[--sy-10px] px-[--50px]">
              <h4>Sub-brand</h4>

              <AddSubBrandModal
                btnColor="black"
                modalTitle="Add Sub-brand"
                btnIcon={addIcon}
              />
            </div>
            <div className="h-[20vh] overflow-y-auto overflow-x-hidden space-y-2 py-[--sy-5px]">
              {subBrands.map((brand, index) => (
                <div
                  key={index}
                  className="w-[95%] m-auto flex items-center p-4 bg-gray-100 rounded-lg transition hover:outline outline-2 outline-[--dark] cursor-pointer"
                >
                  <span className="text-gray-800">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.socialAccordions} col-span-3`}>
          <div className=" flex justify-between items-center mb-[1vw]">
            <h4>Social Media</h4>
          </div>
          <div className=" flex justify-between h-[62vh] overflow-y-scroll px-[0.5vw] gap-[1.5vw]">
            <div className=" w-full">
              {/* // Container div for the accordion component with additional
              styles and classes */}
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`} // CSS classes for styling the accordion
              >
                {/* // Input element for the radio button to control the accordion
                state */}
                <input type="radio" name="my-accordion-2" />
                {/* // Div for the accordion title */}
                <div
                  className={`${styles.collapseTitle} collapse-title text-xl font-semibold`}
                >
                  {/* // Title of the accordion section */}
                  Website
                </div>
                {/* // Div for the accordion content */}
                <div className="collapse-content">
                  {/* // Label for the Username input field */}
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block" // CSS classes for styling the label
                  >
                    {/* // Label text */}
                    Username*
                  </label>
                  {/* // Input field for the Username */}
                  <input
                    type="text"
                    placeholder="username" // Placeholder text for the input field
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]" // CSS classes for styling the input field
                  />
                  {/* // Label for the Password input field */}
                  <label htmlFor="">Password*</label>
                  {/* // Input field for the Password */}
                  <input
                    type="text"
                    placeholder="username" // Placeholder text for the input field
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]" // CSS classes for styling the input field
                  />
                  {/* // Label for the Link input field */}
                  <label htmlFor="">Link*</label>
                  {/* // Input field for the Link */}
                  <input
                    type="text"
                    placeholder="Account url" // Placeholder text for the input field
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]" // CSS classes for styling the input field
                  />
                  {/* // Label for the Handle input field */}
                  <label htmlFor="">Handle*</label>
                  {/* // Input field for the Handle */}
                  <input
                    type="text"
                    placeholder="@username" // Placeholder text for the input field
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]" // CSS classes for styling the input field
                  />
                </div>
              </div>
              {/* // Main container div for the accordion component with additional
              styling classes */}
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                {/* // Input element for the radio button to control the accordion
                state */}
                <input type="radio" name="my-accordion-2" />
                {/* // Div for the accordion title */}
                <div className="collapse-title text-xl font-semibold">
                  {/* // Title of the accordion section */}
                  Twitter
                </div>
                {/* // Div for the accordion content */}
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
                    placeholder="username" // Placeholder text for the input field
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]" // CSS classes for styling the input field
                  />
                  {/* // Label for the Password input field */}
                  <label htmlFor="">Password*</label>
                  {/* // Input field for the Password */}
                  <input
                    type="text"
                    placeholder="username" // Placeholder text for the input field
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]" // CSS classes for styling the input field
                  />
                  {/* // Label for the Link input field */}
                  <label htmlFor="">Link*</label>
                  {/* // Input field for the Link */}
                  <input
                    type="text"
                    placeholder="Account url" // Placeholder text for the input field
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]" // CSS classes for styling the input field
                  />
                  {/* // Label for the Handle input field */}
                  <label htmlFor="">Handle*</label>
                  {/* // Input field for the Handle */}
                  <input
                    type="text"
                    placeholder="@username" // Placeholder text for the input field
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]" // CSS classes for styling the input field
                  />
                </div>
              </div>
              {/* // Main container div for the accordion component with specific
              styling classes */}
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                {/* // Input element for the radio button to control the accordion
                state */}
                <input type="radio" name="my-accordion-2" />
                {/* // Div for the accordion title with styling for font size and
                weight */}
                <div className="collapse-title text-xl font-semibold">
                  {/* // Title of the accordion section */}
                  Instagram
                </div>
                {/* // Div for the accordion content */}
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
                  {/* // Label for the Handle input field */}
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
            <div className=" w-full">
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
        <CustomBtn btnColor="black" word="Save" />
      </div>
    </div>
  );
};

export default Page;
