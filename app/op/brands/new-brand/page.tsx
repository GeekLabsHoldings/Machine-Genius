"use client";
import React from "react";
import styles from "./newBrand.module.css";
import "./newBrand.css";
import { useRouter } from "next/navigation";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";

const Page = () => {
  const router = useRouter();
  return (
    <div className={`${styles.newBrand} newBrand pt-[1.5vw]`}>
      {/* // Container div for the back button with a click handler */}
      <div
        onClick={() => router.back()} // Function to navigate back when clicked
        className="flex items-center cursor-pointer mb-[1vw]" // CSS classes for styling the div
      >
        {/* // SVG icon used for the back button */}
        <svg
          className="mr-[0.6vw]" // Margin-right styling for the SVG
          width="11" // Width of the SVG
          height="22" // Height of the SVG
          viewBox="0 0 11 22" // SVG viewbox dimensions
          fill="none" // No fill color
          xmlns="http://www.w3.org/2000/svg" // SVG namespace
        >
          {/* // Path element defining the arrow shape */}
          <path
            d="M11 20.8993L11 1.09878C10.9996 0.898304 10.9627 0.701801 10.8932 0.530416C10.8237 0.359031 10.7244 0.219253 10.6058 0.126133C10.4873 0.03301 10.354 -0.00993011 10.2203 0.0019317C10.0867 0.0137935 9.95773 0.080009 9.84734 0.19345L0.296979 10.0937C-0.0989937 10.504 -0.0989937 11.4919 0.296979 11.9033L9.84734 21.8036C9.9575 21.9182 10.0865 21.9854 10.2204 21.9979C10.3543 22.0104 10.4879 21.9677 10.6067 21.8745C10.7255 21.7813 10.825 21.6411 10.8943 21.4692C10.9637 21.2973 11.0002 21.1002 11 20.8993Z"
            fill="#2A2B2A" // Fill color for the path
          />
        </svg>
        {/* // Heading for the add new brand section */}
        <h3>Add New Brand</h3>
      </div>
      <div className=" grid grid-cols-5 w-full gap-[5vw] px-[1vw] mb-[0.8vw]">
        <div className={`${styles.form} col-span-2`}>
          <h4 className=" mb-[1vw]">Brand Details</h4>
          <label htmlFor="">Brand Name*</label>
          <input
            type="text"
            placeholder="Juice Box"
            className=" py-[0.6vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
          />
          <label className=" mb-[0.7vw] inline-block" htmlFor="">
            Niche
          </label>
          <div className=" w-[15vw] mb-[1.2vw]">
            <CustomSelectInput label={"All"} options={["Niche", "Niches"]} />
          </div>
          <label htmlFor="">Description*</label>
          <input
            type="text"
            placeholder="51640615651463254"
            className=" py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
          />
          <label htmlFor="">Acquisition Date*</label>
          <input
            type="text"
            placeholder="20 April 2024"
            className=" py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
          />
          <div className=" flex justify-between">
            {" "}
            <h4>Sub-brand</h4>
            <CustomBtn
              btnColor="black"
              paddingVal="py-[0.2vw] px-[0.2vw]"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.58333 16.5C7.58333 17.3284 8.21757 18 9 18C9.78242 18 10.4167 17.3284 10.4167 16.5V10.5H16.0833C16.8658 10.5 17.5 9.82845 17.5 9C17.5 8.17155 16.8658 7.5 16.0833 7.5H10.4167V1.5C10.4167 0.671565 9.78242 0 9 0C8.21757 0 7.58333 0.671565 7.58333 1.5V7.5H1.91667C1.13427 7.5 0.5 8.17155 0.5 9C0.5 9.82845 1.13427 10.5 1.91667 10.5H7.58333V16.5Z"
                    fill="#FFFFFB"
                  />
                </svg>
              }
            />
          </div>
        </div>
        <div className={`${styles.socialAccordions} col-span-3`}>
          <div className=" flex justify-between items-center mb-[1vw]">
            <h4>Social Media</h4>
            <CustomBtn
              btnColor="black"
              paddingVal="py-[0.2vw] px-[0.2vw]"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.58333 16.5C7.58333 17.3284 8.21757 18 9 18C9.78242 18 10.4167 17.3284 10.4167 16.5V10.5H16.0833C16.8658 10.5 17.5 9.82845 17.5 9C17.5 8.17155 16.8658 7.5 16.0833 7.5H10.4167V1.5C10.4167 0.671565 9.78242 0 9 0C8.21757 0 7.58333 0.671565 7.58333 1.5V7.5H1.91667C1.13427 7.5 0.5 8.17155 0.5 9C0.5 9.82845 1.13427 10.5 1.91667 10.5H7.58333V16.5Z"
                    fill="#FFFFFB"
                  />
                </svg>
              }
            />
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
      <div className=" w-fit ms-auto">
        <CustomBtn btnColor="black" word="Save" />
      </div>
    </div>
  );
};

export default Page;
