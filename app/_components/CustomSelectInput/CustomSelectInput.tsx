"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./CustomSelectInput.module.css";
import { v4 as uuidv4 } from "uuid";

interface Iprops<T> {
  label?: string | number;
  options: string[] | number[];
  icon?: any;
  theme?: "dark";
  whenSideNavClosed?: boolean;
  getValue?: (value: T) => void;
  paddingVal?: string;
  children?: React.ReactNode;
}

const CustomSelectInput = <T,>(props: Iprops<T>) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState(
    props.label ? props.label : props.options[0]
  );
  // const [CurrentRole, setCurrentRole] = useState(localStorage.getItem('selected-role'));
  useEffect(() => {
    setIsSelected(props.label ? props.label : props.options[0]);
  }, [props.label]);

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

  const handleSelectedItem = (e: any) => {
    console.log(`CustomSelectInput:`, e.innerText);
    setIsSelected(e.innerText);
    setIsActive(false);
    if (props.getValue) {
      props.getValue(e.innerText);
    }
  };

  return (
    <div
      className={`${styles.dropdown} ${
        props.theme === "dark" ? styles.dark : null
      } ${props.whenSideNavClosed ? styles.onClose : null}`}
    >
      <div
        onClick={(e) => {
          setIsActive(!isActive);
        }}
        className={`${styles.dropdown_btn} ${
          props.paddingVal ? props.paddingVal : `py-[0.2vw] px-[1.2vw]`
        } ${isActive ? styles.open : ""} `}
        ref={clickableContainer}
      >
        {props.icon}
        <span>
          {/* {props.theme
            ? typeof window !== "undefined" &&
              localStorage.getItem("selected-role") === null
              ? "Content Creator"
              : localStorage.getItem("selected-role")
            : selected} */}
          {selected ? selected : props.label}
        </span>
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
      <div
        className={styles.dropdown_content}
        style={{ display: isActive ? "block" : "none" }}
        ref={ref}
      >
        <div>
          {props.options.map((ele, idx) => (
            <div
              onClick={(e) => {
                handleSelectedItem(e.target);
                setIsActive(!isActive);
              }}
              className={styles.item}
              key={uuidv4()}
            >
              {ele}
            </div>
          ))}
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default CustomSelectInput;
