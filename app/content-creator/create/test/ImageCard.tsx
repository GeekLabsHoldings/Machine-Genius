import React from "react";
import styles from "./ImageCard.module.css";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";

export default function ImageCard() {
  return (
    <div className={`${styles.box}`}>
      <CustomCheckBox value=" " type="checkbox" name="select-image" />
      <div className={`${styles.selectedOverlay}`}></div>
      <img src="/blogDet.png" alt="" />
    </div>
  );
}
