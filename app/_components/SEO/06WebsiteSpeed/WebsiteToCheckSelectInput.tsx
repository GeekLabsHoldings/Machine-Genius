"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./WebsiteToCheckSelectInput.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CustomBtn from "../../Button/CustomBtn";

interface Iprops {
  label?: string | number;
  options: string[] | number[];
  icon?: any;
  theme?: "dark";
  whenSideNavClosed?: boolean;
  getValue?: (value: string | number) => void;
  paddingVal?: string;
  children?: React.ReactNode;
}

const WebsiteToCheckSelectInput = (props: Iprops) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState(
    props.label ? props.label : props.options[0]
  );
  // const [CurrentRole, setCurrentRole] = useState(localStorage.getItem('selected-role'));

  const ref = useRef<HTMLDivElement | null>(null);
  const clickableContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (props.whenSideNavClosed) {
      setIsActive(false);
    }
  }, [props.whenSideNavClosed]);

  //detect if there is a space for the dropdown to open downwards if not open it upwards
  useEffect(() => {
    if (ref.current) {
      const clickContainer =
        clickableContainer.current?.getBoundingClientRect();

      if (
        clickContainer &&
        window.innerHeight - clickContainer.bottom < window.innerHeight / 3
      ) {
        ref.current.style.top = "auto";
        ref.current.style.bottom = "125%";
      } else {
        ref.current.style.top = "125%";
        ref.current.style.bottom = "auto";
      }
    }
  }, [isActive]);

  // State for controlling the modal open/close state
  const [open, setOpen] = React.useState(false);
  // Function to handle modal open.
  const handleOpen = () => setOpen(true);
  // Function to handle modal close.
  const handleClose = () => setOpen(false);

  const handleSelectedItem = (e: any) => {
    console.log(e.innerText);
    setIsSelected(e.innerText);
    setIsActive(false);
    if (props.getValue) {
      props.getValue(e.innerText);
    }
  };

  return (
    <>
      {/* ===== Start Create New List Modal ===== */}
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
            <div className={`flex justify-between ${styles.addNewList}`}>
              {/* Modal title */}
              <h2>Add Website</h2>
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
            <div className="flex flex-col gap-[0.7vw]">
              <h4 className="font-semibold text-[20px]">Add Website</h4>
              <div className="flex flex-col">
                <label htmlFor="listName" className="font-bold">
                  Website URL*
                </label>
                <input
                  type="text"
                  id="listName"
                  required
                  className={`${styles.input}`}
                />
              </div>
            </div>

            {/* Save button */}
            <div className="flex justify-end">
              <CustomBtn
                word="Save"
                btnColor="black"
                style={{ width: "max-content" }}
              />
            </div>
          </div>
        </Box>
      </Modal>
      {/* ===== End Create New List Modal ===== */}

      {/* ===== Start Select Input ===== */}
      {/* // Main container div for the dropdown menu. Applies conditional styling based on theme and navigation state. */}
      <div
        className={`${styles.dropdown} ${
          props.theme === "dark" ? styles.dark : null
        } ${props.whenSideNavClosed ? styles.onClose : null}`}
      >
        {/* Button to toggle the dropdown menu. Toggles 'isActive' state on click. */}
        <div
          onClick={(e) => {
            setIsActive(!isActive);
          }}
          className={`${styles.dropdown_btn} ${
            props.paddingVal ? props.paddingVal : `py-[0.2vw] px-[1.2vw]`
          } ${isActive ? styles.open : ""} `}
          ref={clickableContainer}
        >
          {/* Icon for the dropdown button. */}
          {props.icon}
          <span>
            {/* Conditional rendering of text based on theme. If theme exists, fetch selected role from localStorage, otherwise use 'selected'. */}
            {props.theme
              ? typeof window !== "undefined" &&
                localStorage.getItem("selected-role")
              : selected}
          </span>
          {/* SVG icon for the dropdown toggle arrow. */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 11"
            fill="none"
            className={styles.toggleIcon}
          >
            <path
              d="M19.9494 2.76915e-06L1.04883 1.11645e-06C0.857472 0.000420716 0.669902 0.037347 0.506307 0.106803C0.342711 0.176259 0.209287 0.275614 0.120398 0.394177C0.0315084 0.512738 -0.00947862 0.646018 0.00184339 0.779666C0.0131673 0.913315 0.0763711 1.04227 0.184657 1.15266L9.63492 10.703C10.0266 11.099 10.9695 11.099 11.3622 10.703L20.8125 1.15266C20.9219 1.0425 20.986 0.913482 20.998 0.779611C21.0099 0.64574 20.9692 0.51214 20.8802 0.393327C20.7912 0.274514 20.6574 0.17503 20.4933 0.105687C20.3292 0.0363435 20.1411 -0.000207976 19.9494 2.76915e-06Z"
              fill="#2A2B2A"
            />
          </svg>
        </div>

        {/* Dropdown content container. Visibility toggled based on 'isActive' state. */}
        <div
          className={styles.dropdown_content}
          style={{ display: isActive ? "block" : "none" }}
          ref={ref}
        >
          <div>
            {/* Individual dropdown items. Clicking an item triggers 'handleSelectedItem' and toggles 'isActive' state. */}
            <div
              onClick={(e) => {
                handleSelectedItem(e.target);
                setIsActive(!isActive);
              }}
              className={styles.item}
            >
              Street Politics
            </div>
            <div
              onClick={(e) => {
                handleSelectedItem(e.target);
                setIsActive(!isActive);
              }}
              className={styles.item}
            >
              Twitter
            </div>
            <div
              onClick={(e) => {
                handleSelectedItem(e.target);
                setIsActive(!isActive);
              }}
              className={styles.item}
            >
              PST
            </div>
            <div
              onClick={(e) => {
                handleSelectedItem(e.target);
                setIsActive(!isActive);
              }}
              className={styles.item}
            >
              ST Suite
            </div>
            {/* Special dropdown item with an icon. Commented out functionality for selection handling. */}
            <div
              onClick={(e) => {
                // handleSelectedItem(e.target);
                // setIsActive(!isActive);
              }}
              className={styles.item + " flex items-center gap-2"}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.59196 10.1285C4.58691 10.6348 4.99319 11.0492 5.49944 11.0543C6.00569 11.0593 6.42016 10.653 6.4252 10.1468L6.46176 6.48032L10.1282 6.51687C10.6345 6.52192 11.049 6.11564 11.054 5.60939C11.059 5.10314 10.6528 4.68867 10.1465 4.68363L6.48003 4.64707L6.51658 0.980589C6.52163 0.474348 6.11535 0.0598763 5.6091 0.0548292C5.10285 0.0497822 4.68839 0.456071 4.68334 0.962312L4.64679 4.6288L0.980305 4.59224C0.474074 4.5872 0.0595928 4.99348 0.0545458 5.49973C0.0494987 6.00598 0.455797 6.42044 0.962029 6.42549L4.62851 6.46204L4.59196 10.1285Z"
                  fill="#2A2B2A"
                />
              </svg>
              <span onClick={handleOpen}>Add Website</span>
            </div>
          </div>

          {/* Additional children components passed as props to the dropdown content. */}
          {props.children}
        </div>
      </div>

      {/* ===== End Select Input ===== */}
    </>
  );
};

export default WebsiteToCheckSelectInput;
