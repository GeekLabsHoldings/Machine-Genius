"use client";
import React, { useState } from "react";
import styles from "../../_components/Accounting/CreateTicketModal.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import toast from "react-hot-toast";

interface Subscription {
  subscriptionName: string;
  subscriptionPrice: number;
  startDate: number; // Unix timestamp in milliseconds
  endDate: number; // Unix timestamp in milliseconds
}

interface IProps {
  btnWord: string; // Button text.
  btnIcon?: React.ReactElement; // Optional button icon.
  btnColor: "black" | "white"; // Button color.
  modalTitle: string; // Modal title text.
  setSubscriptions: (value: React.SetStateAction<Subscription[]>) => void; // Function to set the subscriptions state.
}

const ticketTypeOptions: string[] = ["IT", "System Issue", "Request"];

function SubscriptionsCreator({
  modalTitle,
  btnWord,
  btnColor,
  btnIcon,
  setSubscriptions,
}: IProps) {
  // State for controlling the modal open/close state
  const [open, setOpen] = useState(false);
  // Function to handle modal open.
  const handleOpen = () => setOpen(true);
  // Function to handle modal close.
  const handleClose = () => setOpen(false);

  const productTypeOptions: string[] = ["Snacks", "Cleaning", "Drinks"];

  const [subscriptionName, setSubscriptionName] = useState("");
  const [subscriptionPrice, setSubscriptionPrice] = useState(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // check if the end date is greater than the start date
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date must be greater than start date");
      return;
    }

    try {
      const response = await fetch(
        "https://api.machinegenius.io/accounting/subscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            subscriptionName,
            subscriptionPrice,
            startDate: new Date(startDate).getTime(),
            endDate: new Date(endDate).getTime(),
          }),
        }
      );
      const data: Subscription = await response.json();

      // check if the data is of type Subscription
      if (data.subscriptionName) {
        toast.success("Subscription added successfully");
        handleClose();
        setSubscriptions((prev: Subscription[]) => [...prev, data]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <CustomBtn
        word={btnWord}
        btnColor={btnColor}
        icon={btnIcon}
        onClick={handleOpen}
        paddingVal="py-[0.5vw] px-[1vw]"
      />

      <Modal
        className={`${styles.modal}`}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <form className={`${styles.modalBox}`} onSubmit={handleSubmit}>
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

            <div className="flex flex-col gap-[0.7vw]">
              <div className="flex flex-col gap-[0.2vw]">
                <label htmlFor="subjectLine" className="xl">
                  Subscription Name*
                </label>
                <input
                  type="text"
                  id="subjectLine"
                  value={subscriptionName}
                  onChange={(e) => setSubscriptionName(e.target.value)}
                  required
                  className={`${styles.input}`}
                />
              </div>
              <div className={`flex flex-col gap-[0.2vw]`}>
                <label htmlFor="tiketDescription" className="text-xl">
                  Price*
                </label>
                <input
                  type="text"
                  id="subjectLine"
                  value={subscriptionPrice}
                  onChange={(e) => setSubscriptionPrice(Number(e.target.value))}
                  required
                  className={`${styles.input}`}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl">Duration</h3>
              <div className="flex w-full gap-5">
                <div className="flex flex-col grow gap-4">
                  <label htmlFor="subjectLine" className="xl">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="subjectLine"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-[var(--dark)] grow rounded-[5px] px-3 py-2"
                    required
                  />
                </div>
                <div className="flex flex-col grow gap-4">
                  <label htmlFor="subjectLine" className="xl">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="subjectLine"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-[var(--dark)] grow rounded-[5px] px-3 py-2"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Add subscriptions button */}
            <div className="flex justify-end">
              <CustomBtn
                word="Add Subscription"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
                      fill="#FFFFFB"
                    />
                  </svg>
                }
                btnColor="black"
                style={{ width: "max-content" }}
                paddingVal="py-[0.5vw] px-[0.8vw]"
                type="submit"
              />
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default SubscriptionsCreator;
