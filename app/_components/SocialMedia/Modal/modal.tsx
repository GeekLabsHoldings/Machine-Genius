"use client"; //Indicates that this component is meant for client-side rendering.
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./modal.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { AccountsData, ArticleNames, Brands } from "@/app/_data/data";
import { chainIcon, closeIcon } from "@/app/_utils/svgIcons";

interface IProps {
  btnWord: string; // Button text.
  btnIcon?: React.ReactElement; // Optional button icon.
  btnColor: "black" | "white"; // Button color.
  modalTitle?: string; // Modal title text.
  forWhat: string; //Purpose of the modal
}

// Regular expression to match URL patterns.
const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

// Rendering list of accounts to remove.
const renderAccountsToRemove = AccountsData.map((account) => (
  <li>{account.account_name}</li>
));
// Rendering list of users to remove.
const renderUsersToRemove = AccountsData.map((account) => (
  <li>{account.user_name}</li>
));

export default function BasicModal({
  btnWord,
  btnIcon,
  btnColor,
  modalTitle,
  forWhat,
}: IProps) {
  // State for controlling the modal open/close state
  const [open, setOpen] = React.useState(false);
  // Function to handle modal open.
  const handleOpen = () => setOpen(true);
  // Function to handle modal close.
  const handleClose = () => setOpen(false);

  // State to track URL validation result.
  const [matchResult, setMatchResult] = React.useState<boolean>(true);

  return (
    <div>
      {/* 01- Conditional rendering of different buttons based on 'forWhat' prop */}
      {forWhat === "add_to_list" ? (
        <CustomBtn
          word={btnWord}
          icon={btnIcon}
          btnColor={btnColor}
          onClick={handleOpen}
          paddingVal="py-[--10px] px-[--22px]"
        />
      ) : forWhat === "add_account" ? (
        <CustomBtn
          word={btnWord}
          icon={btnIcon}
          btnColor={btnColor}
          onClick={handleOpen}
          paddingVal="py-[--10px] px-[--22px]"
        />
      ) : (
        <CustomBtn
          word={btnWord}
          btnColor={btnColor}
          onClick={handleOpen}
          paddingVal="py-[--10px] px-[--22px]"
        />
      )}

      {/* 02- Modal */}
      <Modal
        className={`${styles.modal}`}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className={`${styles.modalBox}`}>
            <div className={`flex justify-between ${styles.addToListSec}`}>
              {/* Modal title */}
              <h3>{modalTitle}</h3>
              {/* Close button */}
              <div
                onClick={() => {
                  handleClose();
                }}
                className="cursor-pointer"
              >
                {closeIcon}
              </div>
            </div>
            {/* Conditional rendering based on 'forWhat' prop */}
            {forWhat === "add_to_list" ? (
              <>
                {/* Form fields for adding a post */}
                <div className="flex flex-col gap-[0.7vw]">
                  <div className="flex flex-col gap-[0.2vw]">
                    <label htmlFor="subreddit">Subreddit Name*</label>
                    <input
                      type="text"
                      id="subreddit"
                      required
                      className={`${styles.subredditInput}`}
                    />
                  </div>
                  <div
                    className={`flex flex-col gap-[0.2vw] ${styles.linkValidation}`}
                  >
                    <label htmlFor="subredditLink">Subreddit Link*</label>
                    <div className={`${styles.linkInput}`}>
                      <input
                        type="text"
                        id="subredditLink"
                        required
                        className={`${styles.subredditInput}`}
                        onKeyUp={(e: any) => {
                          setMatchResult(urlRegex.test(e.target.value));
                        }}
                      />
                      {chainIcon}
                    </div>
                    {/* Display error message if URL validation fails */}
                    {matchResult ? null : <span>Oops</span>}
                  </div>
                </div>
                {/* Subreddit Details section */}
                <div className="flex flex-col gap-[0.8vw]">
                  <h3>Subreddit Details</h3>
                  <div className="flex gap-[1vw]">
                    <div className="flex flex-col w-1/2 gap-[0.3vw]">
                      <h5>Niche</h5>
                      <CustomSelectInput
                        label="All"
                        options={ArticleNames}
                        paddingVal="py-[0.2vw] px-[0.5vw]"
                      />
                    </div>
                    <div className="flex flex-col w-1/2 gap-[0.3vw]">
                      <h5>Brand</h5>
                      <CustomSelectInput
                        label="All"
                        options={Brands}
                        paddingVal="py-[0.2vw] px-[0.5vw]"
                      />
                    </div>
                  </div>
                </div>
                {/* Create button */}
                <div className="flex justify-end">
                  <CustomBtn word="Create" btnColor="black" />
                </div>
              </>
            ) : forWhat === "add_account" ? (
              <>
                {/* Form fields for adding an account */}
                <div
                  className={`flex flex-col gap-[0.2vw] ${styles.linkValidation}`}
                >
                  <label htmlFor="subredditLink">Account Link*</label>
                  <div className={`${styles.linkInput}`}>
                    <input
                      type="text"
                      id="subredditLink"
                      required
                      className={`${styles.subredditInput}`}
                      onKeyUp={(e: any) => {
                        setMatchResult(urlRegex.test(e.target.value));
                      }}
                    />
                    {chainIcon}
                  </div>
                  {/* Display error message if URL validation fails */}
                  {matchResult ? null : <span>Oops</span>}
                </div>
                <div className="flex gap-[0.5vw]">
                  <CustomBtn
                    btnColor="white"
                    word="Cancel"
                    paddingVal="px-[3vw] py-[0.5vw]"
                    onClick={() => {
                      handleClose();
                    }}
                  />
                  <CustomBtn
                    btnColor="black"
                    /* SVG icon for 'Add Account' button */
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="11"
                        viewBox="0 0 12 11"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.08333 10.0833C5.08333 10.5896 5.49373 11 6 11C6.50628 11 6.91667 10.5896 6.91667 10.0833V6.41667H10.5833C11.0896 6.41667 11.5 6.00628 11.5 5.5C11.5 4.99373 11.0896 4.58333 10.5833 4.58333H6.91667V0.916667C6.91667 0.410401 6.50628 0 6 0C5.49373 0 5.08333 0.410401 5.08333 0.916667V4.58333H1.41667C0.91041 4.58333 0.5 4.99373 0.5 5.5C0.5 6.00628 0.91041 6.41667 1.41667 6.41667H5.08333V10.0833Z"
                          fill="#FFFFFB"
                        />
                      </svg>
                    }
                    word="Add Account"
                    paddingVal="px-[1.3vw] py-[0.5vw]"
                  />
                </div>
              </>
            ) : (
              <>
                {/* List of accounts to remove */}
                <div className={`flex ${styles.removeSec}`}>
                  <div className="w-1/2 text-center">
                    <h4>Accounts</h4>
                    <ul className="flex flex-col gap-[0.4vw]">
                      {renderAccountsToRemove}
                    </ul>
                  </div>
                  {/* List of users to remove */}
                  <div className="w-1/2 text-center">
                    <h4>Username</h4>
                    <ul className="flex flex-col gap-[0.4vw]">
                      {renderUsersToRemove}
                    </ul>
                  </div>
                </div>
                {/* Action buttons */}
                <div className="flex gap-[0.5vw] w-full">
                  <CustomBtn
                    btnColor={"white"}
                    word="Cancel"
                    width="w-full"
                    paddingVal="px-[0.5vw] py-[0.7vw]"
                  />
                  <CustomBtn
                    btnColor={"black"}
                    word="Remove Accounts"
                    width="w-full"
                    paddingVal="px-[0.5vw] py-[0.7vw]"
                  />
                </div>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
