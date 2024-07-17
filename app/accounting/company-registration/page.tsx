"use client";
import React, { useState } from "react";
import styles from "./registration.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

const Page = () => {
//   const [sorting1, setSorting1] = useState("Ascend");
//   const [sorting2, setSorting2] = useState("Ascend");
//   const [sorting3, setSorting3] = useState("Ascend");
//   const [sorting4, setSorting4] = useState("Ascend");

//   function getRandomBackgroundColor() {
//     const colors = [
//       "#F36F24B2",
//       "#9B5FBFB2",
//       "#E1C655B2",
//       "#31B2E9B2",
//       "#E9313EB2",
//     ];

//     // Select a random index from the array of colors
//     const randomIndex = Math.floor(Math.random() * colors.length);

//     // Return the color at the random index
//     return colors[randomIndex];
//   }

 




  return (
    <div className={`${styles.assets} pt-[1vw] overflow-hidden`}>
      <div className={"tabs " + styles.tabs}>
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="US Formation"
          defaultChecked
        />
        <div className={`tab-content `}>
          
        </div>

        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="UK Formation"
        />
        <div className={`tab-content `}>
          
        </div>

        
      </div>
    </div>
  );
};

export default Page;
