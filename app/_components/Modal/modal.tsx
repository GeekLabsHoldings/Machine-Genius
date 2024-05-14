"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CustomBtn from "../Button/CustomBtn";

import styles from "./modal.module.css";
import { TextField } from "@mui/material";
import CustomSelectInput from "../CustomSelectInput/CustomSelectInput";
import { AccountsData, ArticleNames, Brands } from "@/app/_data/data";

interface IProps {
  btnWord: string;
  btnIcon?: React.ReactElement;
  btnColor: "black" | "white";
  modalTitle: string;
  forWhat: string;
}

export default function BasicModal({
  btnWord,
  btnIcon,
  btnColor,
  modalTitle,
  forWhat,
}: IProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const [matchResult, setMatchResult] = React.useState<boolean>(true);
  const renderAccountsToRemove = AccountsData.map((account)=>(
      <li>{account.account_name}</li>
  ))
  const renderUsersToRemove = AccountsData.map((account)=>(
    <li>{account.user_name}</li>
))

  return (
    <div>
      {forWhat === "add_post" ? (
        <CustomBtn
          word={btnWord}
          icon={btnIcon}
          btnColor={btnColor}
          onClick={handleOpen}
        />
      ) : forWhat === "add_account" ? (
        <CustomBtn
          word={btnWord}
          icon={btnIcon}
          btnColor={btnColor}
          onClick={handleOpen}
          paddingVal="py-[0.5vw] px-[1vw]"
        />
      ) : (
        <CustomBtn
          word={btnWord}
          btnColor={btnColor}
          onClick={handleOpen}
          paddingVal="py-[0.5vw] px-[1vw]"
        />
      )}
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
              <h3>{modalTitle}</h3>
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

            {forWhat === "add_post" ? (
              <>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 26 19"
                        fill="none"
                      >
                        <path
                          d="M9.36716 16.8489C9.05992 17.14 8.82214 17.3348 8.57914 17.4773C7.38962 18.1742 5.9241 18.1742 4.7346 17.4773C4.29626 17.2204 3.87491 16.7928 3.0322 15.9376C2.18949 15.0824 1.76813 14.6547 1.51507 14.2098C0.828309 13.0026 0.828309 11.5153 1.51507 10.3081C1.76813 9.86325 2.18949 9.43562 3.0322 8.58036L6.65687 4.90176C7.49958 4.04651 7.92093 3.61888 8.35925 3.36205C9.54877 2.66507 11.0143 2.66507 12.2038 3.36204C12.6421 3.61888 13.0635 4.04651 13.9062 4.90176C14.7489 5.75701 15.1703 6.18463 15.4234 6.62948C16.1101 7.83668 16.1101 9.32403 15.4234 10.5312C15.283 10.7778 15.0911 11.0192 14.8041 11.331M11.1959 7.66904C10.909 7.98079 10.717 8.22218 10.5767 8.46877C9.88997 9.67597 9.88997 11.1633 10.5767 12.3705C10.8298 12.8154 11.2511 13.2431 12.0939 14.0982C12.9366 14.9535 13.3579 15.3811 13.7962 15.638C14.9857 16.335 16.4513 16.335 17.6408 15.638C18.0792 15.3811 18.5005 14.9535 19.3432 14.0982L22.9679 10.4196C23.8106 9.56438 24.232 9.13675 24.4849 8.69195C25.1717 7.48475 25.1717 5.99738 24.4849 4.79018C24.232 4.34533 23.8106 3.9177 22.9679 3.06245C22.1252 2.2072 21.7038 1.77958 21.2655 1.52274C20.0759 0.825754 18.6105 0.825754 17.421 1.52274C17.1779 1.66513 16.9402 1.85999 16.6328 2.15111"
                          stroke="#2A2B2A"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    {matchResult ? null : <span>Oops</span>}
                  </div>
                </div>

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

                <div className="flex justify-end">
                  <CustomBtn word="Create" btnColor="black" />
                </div>
              </>
            ) : forWhat === "add_account" ? (
              <>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 26 19"
                      fill="none"
                    >
                      <path
                        d="M9.36716 16.8489C9.05992 17.14 8.82214 17.3348 8.57914 17.4773C7.38962 18.1742 5.9241 18.1742 4.7346 17.4773C4.29626 17.2204 3.87491 16.7928 3.0322 15.9376C2.18949 15.0824 1.76813 14.6547 1.51507 14.2098C0.828309 13.0026 0.828309 11.5153 1.51507 10.3081C1.76813 9.86325 2.18949 9.43562 3.0322 8.58036L6.65687 4.90176C7.49958 4.04651 7.92093 3.61888 8.35925 3.36205C9.54877 2.66507 11.0143 2.66507 12.2038 3.36204C12.6421 3.61888 13.0635 4.04651 13.9062 4.90176C14.7489 5.75701 15.1703 6.18463 15.4234 6.62948C16.1101 7.83668 16.1101 9.32403 15.4234 10.5312C15.283 10.7778 15.0911 11.0192 14.8041 11.331M11.1959 7.66904C10.909 7.98079 10.717 8.22218 10.5767 8.46877C9.88997 9.67597 9.88997 11.1633 10.5767 12.3705C10.8298 12.8154 11.2511 13.2431 12.0939 14.0982C12.9366 14.9535 13.3579 15.3811 13.7962 15.638C14.9857 16.335 16.4513 16.335 17.6408 15.638C18.0792 15.3811 18.5005 14.9535 19.3432 14.0982L22.9679 10.4196C23.8106 9.56438 24.232 9.13675 24.4849 8.69195C25.1717 7.48475 25.1717 5.99738 24.4849 4.79018C24.232 4.34533 23.8106 3.9177 22.9679 3.06245C22.1252 2.2072 21.7038 1.77958 21.2655 1.52274C20.0759 0.825754 18.6105 0.825754 17.421 1.52274C17.1779 1.66513 16.9402 1.85999 16.6328 2.15111"
                        stroke="#2A2B2A"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
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
            ) : <>
            <div className={`flex ${styles.removeSec}`}>
              <div className="w-1/2 text-center">
              <h4>Accounts</h4>
              <ul className="flex flex-col gap-[0.4vw]">
                {renderAccountsToRemove}
              </ul>
              </div>
              <div className="w-1/2 text-center">
              <h4>Username</h4>
                <ul className="flex flex-col gap-[0.4vw]">
                 {renderUsersToRemove}
                </ul>
              </div>
            </div>
            {/* paddingVal="py-[0.5vw] px-[3vw]" */}
            <div className="flex gap-[0.5vw] w-full">
              <CustomBtn btnColor={"white"} word="Cancel" width="w-full" paddingVal="px-[0.5vw] py-[0.7vw]" />
              <CustomBtn btnColor={"black"} word="Remove Accounts" width="w-full" paddingVal="px-[0.5vw] py-[0.7vw]"/>
              </div>
           
            </>}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
