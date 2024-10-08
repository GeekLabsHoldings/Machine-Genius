"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./UploadReceiptModal.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CustomBtn from "../../Button/CustomBtn";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";

interface IProps {
  btnWord: string; // Button text.
  btnIcon?: React.ReactElement; // Optional button icon.
  btnColor: "black" | "white"; // Button color.
  modalTitle: string; // Modal title text.
  getReceipts: () => void;
}

/**
 * Renders a modal for uploading receipts.
 *
 * @param {IProps} props - The component props.
 * @param {string} props.modalTitle - The title of the modal.
 * @param {string} props.btnWord - The word displayed on the button.
 * @param {string} props.btnColor - The color of the button.
 * @param {string} props.btnIcon - The icon displayed on the button.
 * @return {JSX.Element} The rendered modal component.
 */

export default function UploadReceiptModal({
  modalTitle,
  btnWord,
  btnColor,
  btnIcon,
  getReceipts,
}: IProps) {
  const { authState, handleSignOut } = useContext(globalContext);
  const [pageState, setPageState] = useState<{
    presignedURLData: any;
    uploadReceiptLoading: boolean;
    uploadReceiptError: string;
    selectedFileName: string;
    totalPrice: number | null;
  }>({
    presignedURLData: null,
    uploadReceiptLoading: false,
    uploadReceiptError: "",
    selectedFileName: "",
    totalPrice: null,
  });
  // State for controlling the modal open/close state
  const [open, setOpen] = React.useState(false);
  // Function to handle modal open.
  const handleOpen = () => setOpen(true);
  // Function to handle modal close.
  const handleClose = () => {
    setOpen(false);
    setPageState((prev: any) => ({
      ...prev,
      selectedFileName: "",
      totalPrice: null,
    }));
  };
  const receiptFileRef = useRef<HTMLInputElement>(null);

  // ===== 01. get Presigned URL =====
  async function getPresignedURL() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/administrative/receipts/presigned-url`,
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
      const json = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else {
        setPageState((prev: any) => ({
          ...prev,
          presignedURLData: json,
        }));
        return json;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getPresignedURL:", error);
    }
  }

  // ===== 02. upload Receipt =====
  async function uploadReceipt(file: File) {
    const getPresignedURLData = await getPresignedURL();
    setPageState((prev) => ({ ...prev, uploadReceiptLoading: true }));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/octet-stream");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: file,
      redirect: "follow" as RequestRedirect,
    };

    try {
      const response = await fetch(
        getPresignedURLData.presignedURL,
        requestOptions
      );
      if (response.ok) {
        console.log("Upload successful");
        setPageState((prev) => ({
          ...prev,
          uploadReceiptError: "",
        }));
      } else {
        setPageState((prev) => ({
          ...prev,
          uploadReceiptError: "Upload failed",
        }));

        toast.error(`Upload failed with status: ${response.status}`);
      }
    } catch (error: any) {
      setPageState((prev) => ({
        ...prev,
        uploadReceiptError: "Upload failed",
      }));
      toast.error("Something went wrong!");
      console.error("Error in uploadReceipt:", error);
    } finally {
      setPageState((prev) => ({ ...prev, uploadReceiptLoading: false }));
    }
  }

  // ===== 03. create Receipt =====
  async function createReceipt() {
    if (!pageState.totalPrice || !pageState.presignedURLData) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/administrative/receipts`,
        {
          method: "POST",
          body: JSON.stringify({
            receiptUrl: pageState?.presignedURLData?.receiptUrl,
            totalPrice: pageState.totalPrice,
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
        setPageState((prev: any) => ({
          ...prev,
          presignedURLData: null,
          selectedFileName: "",
          totalPrice: null,
        }));
        getReceipts();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error createReceipt:", error);
    }
  }

  // ===== 00. handleFileChange =====
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setPageState((prev) => ({ ...prev, selectedFileName: files[0].name }));
      uploadReceipt(files[0]);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return today.toLocaleDateString("en-US", options);
  };

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
            <div className={`flex justify-between ${styles.uploadReceipt}`}>
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
            {/* Form fields for adding a post */}
            <div className="flex flex-col gap-[2vw]">
              <div className="flex items-center justify-between gap-[0.2vw]">
                <div className="flex flex-col gap-2">
                  <h3>Upload Receipt</h3>
                  <span>
                    {pageState.uploadReceiptLoading
                      ? `Uploading ${pageState.selectedFileName.slice(
                          0,
                          20
                        )} ...`
                      : pageState.selectedFileName || "No file chosen"}
                  </span>
                  {pageState.uploadReceiptError && (
                    <span className="text-red-500">
                      {pageState.uploadReceiptError}
                    </span>
                  )}
                </div>

                <div
                  className="cursor-pointer"
                  onClick={() => receiptFileRef.current?.click()}
                >
                  <svg
                    width="35"
                    height="23"
                    viewBox="0 0 35 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M29.5191 10.1199C29.5191 10.1199 30.1836 1.0858 21.9824 0.0555995C14.9536 -0.668743 12.8137 5.9237 12.8137 5.9237C12.8137 5.9237 10.6974 3.86951 7.82541 5.54758C5.25448 7.1492 5.70908 10.0817 5.70908 10.0817C5.70908 10.0817 0 11.2018 0 17.0751C0.126959 22.9411 6.19848 23 6.19848 23H15.7727V16.8002H12.7011L17.8204 11.6337L22.9397 16.8002H19.8681V23H28.5372C28.5372 23 34.1889 23.0062 34.9824 17.4254C35.3602 11.3227 29.5191 10.1199 29.5191 10.1199Z"
                      fill="#A6A6A6"
                    />
                  </svg>
                  <input
                    type="file"
                    ref={receiptFileRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className={`flex flex-col gap-[0.2vw]`}>
                <label htmlFor="totalPrice">Total Price</label>
                <div>
                  <input
                    type="number"
                    id="totalPrice"
                    required
                    className={`${styles.input} w-full`}
                    placeholder="15"
                    onChange={(e) =>
                      setPageState((prev: any) => ({
                        ...prev,
                        totalPrice: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className={`flex flex-col gap-2`}>
                <h3>Date Uploaded</h3>
                <span className="text-[#A6A6A6] font-bold">
                  {getTodayDate()}
                </span>
              </div>
            </div>

            {/* Upload Receipt button */}
            <div className={`flex justify-end `}>
              <CustomBtn
                word="Upload Receipts"
                btnColor="black"
                style={{
                  width: "100%",
                  opacity:
                    !pageState.totalPrice ||
                    !pageState.presignedURLData ||
                    pageState.uploadReceiptLoading ||
                    pageState.uploadReceiptError !== ""
                      ? 0.5
                      : 1,
                  cursor:
                    !pageState.totalPrice ||
                    !pageState.presignedURLData ||
                    pageState.uploadReceiptLoading ||
                    pageState.uploadReceiptError !== ""
                      ? "not-allowed"
                      : "pointer",
                }}
                onClick={createReceipt}
                disabled={
                  !pageState.totalPrice ||
                  !pageState.presignedURLData ||
                  pageState.uploadReceiptLoading ||
                  pageState.uploadReceiptError !== ""
                }
              />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
