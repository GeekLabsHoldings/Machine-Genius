"use client";
import React, { useContext, useState } from "react";
import styles from "./AddSubBrandModal.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";
import { addIcon } from "@/app/_utils/svgIcons";
import CustomDatePicker from "@/app/_components/DatePicker/CustomDatePicker";
interface IProps {
  btnWord?: string; // Button text.
  btnIcon?: React.ReactElement; // Optional button icon.
  btnColor: "black" | "white"; // Button color.
  modalTitle: string; // Modal title text.
}

enum TicketTypeEnum {
  IT = "IT",
  SystemIssue = "System Issue",
  Request = "Request",
}
const ticketTypeOptions: TicketTypeEnum[] = [
  TicketTypeEnum.IT,
  TicketTypeEnum.SystemIssue,
  TicketTypeEnum.Request,
];

export default function AddSubBrandModal({
  modalTitle,
  btnWord,
  btnColor,
  btnIcon,
}: IProps) {
  const { authState, handleSignOut } = useContext(globalContext);
  // State for controlling the modal open/close state
  const [open, setOpen] = React.useState(false);
  // Function to handle modal open.
  const handleOpen = () => setOpen(true);
  // Function to handle modal close.
  const handleClose = () => setOpen(false);

  const [pageState, setPageState] = useState<{
    ticketType: TicketTypeEnum | "";
    subjectLine: string;
    ticketDescription: string;
  }>({
    ticketType: "",
    subjectLine: "",
    ticketDescription: "",
  });

  async function createTicket() {
    if (
      !pageState.ticketType ||
      !pageState.subjectLine ||
      !pageState.ticketDescription
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/administrative/tickets/create-ticket`,
        {
          method: "POST",
          body: JSON.stringify({
            ticketType: pageState.ticketType as TicketTypeEnum,
            subjectLine: pageState.subjectLine,
            ticketDescription: pageState.ticketDescription,
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
      const json = await res.json();
      if (json) {
        toast.success("Ticket created successfully!");
        handleClose();
        setPageState({
          ticketType: "",
          subjectLine: "",
          ticketDescription: "",
        });
        // getTickets();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error createTicket:", error);
    }
  }

  return (
    <>
      <CustomBtn
        word={btnWord}
        btnColor={btnColor}
        icon={btnIcon}
        onClick={handleOpen}
        paddingVal="py-[0.2vw] px-[0.2vw]"
      />

      <Modal
        className={`${styles.modal}`}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className={`${styles.modalBox}`}>
            {/* 1. Modal Head */}
            <div className={`flex justify-between ${styles.createTicket}`}>
              {/* Modal title */}
              <h2>{modalTitle}</h2>
              {/* Close button */}
              <div
                onClick={() => {
                  handleClose();
                }}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.0125 13.9613L18.4214 21.3616C18.8145 21.7543 19.3477 21.9749 19.9037 21.9749C20.4597 21.9749 20.9929 21.7543 21.386 21.3616C21.7791 20.969 22 20.4364 22 19.881C22 19.3257 21.7791 18.7931 21.386 18.4004L13.9744 11L21.3846 3.59962C21.5792 3.40518 21.7335 3.17437 21.8388 2.92035C21.944 2.66634 21.9982 2.39411 21.9981 2.11919C21.998 1.84428 21.9438 1.57207 21.8384 1.3181C21.733 1.06414 21.5786 0.833399 21.3839 0.639051C21.1892 0.444703 20.9582 0.290556 20.7039 0.185411C20.4496 0.0802654 20.177 0.026181 19.9018 0.0262458C19.6266 0.0263106 19.354 0.080523 19.0998 0.185788C18.8455 0.291053 18.6145 0.445309 18.42 0.639749L11.0125 8.04013L3.6037 0.639749C3.41048 0.439732 3.17931 0.280156 2.92369 0.170331C2.66806 0.0605069 2.3931 0.00263317 2.11484 8.77827e-05C1.83659 -0.0024576 1.56061 0.0503759 1.30301 0.155506C1.04541 0.260635 0.811359 0.415956 0.614501 0.612405C0.417642 0.808853 0.261924 1.0425 0.156431 1.2997C0.0509388 1.5569 -0.00221519 1.83252 7.07167e-05 2.11046C0.00235662 2.3884 0.0600364 2.6631 0.169745 2.91854C0.279454 3.17398 0.438994 3.40503 0.639057 3.59823L8.05068 11L0.640455 18.4018C0.440392 18.595 0.280852 18.826 0.171143 19.0815C0.0614341 19.3369 0.00375362 19.6116 0.00146772 19.8895C-0.000818188 20.1675 0.0523358 20.4431 0.157828 20.7003C0.263321 20.9575 0.419039 21.1911 0.615898 21.3876C0.812756 21.584 1.04681 21.7394 1.30441 21.8445C1.562 21.9496 1.83798 22.0025 2.11624 21.9999C2.3945 21.9974 2.66946 21.9395 2.92508 21.8297C3.18071 21.7198 3.41188 21.5603 3.6051 21.3603L11.0125 13.9613Z"
                    fill="#BDBDBD"
                  />
                </svg>
              </div>
            </div>

            {/* 2. Modal Body */}

            {/* Details section */}

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

                <label
                  className="mb-[0.7vw] inline-block"
                  htmlFor="brand_niche"
                >
                  Niche*
                </label>
                <div className=" w-[15vw] mb-[1.2vw]">
                  <CustomSelectInput
                    label={"All"}
                    options={["Niche", "Niches"]}
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

                <label htmlFor="brand_acquisition_date">
                  Acquisition Date*
                </label>
                {/* <CustomDatePicker getDateTimeValue={getDateTimeValue} /> */}
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

            {/* Add Product button */}
            <div className="flex justify-end">
              <CustomBtn
                word="Create"
                btnColor="black"
                paddingVal="py-[--10px] px-[--42px]"
                onClick={createTicket}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
