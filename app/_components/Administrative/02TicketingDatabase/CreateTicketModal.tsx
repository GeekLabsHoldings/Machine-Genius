"use client";
import React, { useContext, useState } from "react";
import styles from "./CreateTicketModal.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CustomBtn from "../../Button/CustomBtn";
import CustomSelectInput from "../../CustomSelectInput/CustomSelectInput";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";
interface IProps {
  btnWord: string; // Button text.
  btnIcon?: React.ReactElement; // Optional button icon.
  btnColor: "black" | "white"; // Button color.
  modalTitle: string; // Modal title text.
  getTickets: () => void;
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

/**
 * Renders a modal for creating a ticket.
 *
 * @param {IProps} props - The props object containing the following properties:
 *   - modalTitle: The title of the modal.
 *   - btnWord: The word to be displayed on the button.
 *   - btnColor: The color of the button.
 *   - btnIcon: An optional icon to be displayed on the button.
 * @return {ReactElement} The rendered modal component.
 */
export default function CreateTicketModal({
  modalTitle,
  btnWord,
  btnColor,
  btnIcon,
  getTickets,
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
        `https://api.machinegenius.io/administrative/tickets/create-ticket`,
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
        getTickets();
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
        paddingVal="py-[--10px] px-[--22px]"
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
            <div className="flex flex-col gap-[0.8vw]">
              <h3>Ticket Type</h3>
              <div className="flex gap-[1vw]">
                <div className="flex flex-col gap-[0.3vw] w-full">
                  <CustomSelectInput
                    label="Select Ticket Type"
                    options={ticketTypeOptions}
                    paddingVal="py-[0.2vw] px-[0.5vw]"
                    hoverColor="hover:bg-[#31B2E9]"
                    getValue={(value: TicketTypeEnum) => {
                      setPageState((prev) => ({
                        ...prev,
                        ticketType: value,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Form fields for adding a post */}
            <div className="flex flex-col gap-[0.7vw]">
              <div className="flex flex-col gap-[0.2vw]">
                <label htmlFor="subjectLine">Subject Line*</label>
                <input
                  type="text"
                  id="subjectLine"
                  required
                  className={`${styles.input}`}
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing."
                  onChange={(e) => {
                    setPageState((prev: any) => ({
                      ...prev,
                      subjectLine: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className={`flex flex-col gap-[0.2vw]`}>
                <label htmlFor="tiketDescription">Ticket Description*</label>
                <div>
                  <textarea
                    id="tiketDescription"
                    required
                    rows={5}
                    className={`${styles.input} w-full`}
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    onChange={(e) => {
                      setPageState((prev: any) => ({
                        ...prev,
                        ticketDescription: e.target.value,
                      }));
                    }}
                  />
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
