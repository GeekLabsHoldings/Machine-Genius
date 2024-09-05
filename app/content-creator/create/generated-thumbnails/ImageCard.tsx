import React from "react";
import styles from "./ImageCard.module.css";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";

type IProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  imgSrc: string;
  inputType: string;
  inputName: string;
};

export default function ImageCard({
  imgSrc,
  inputType,
  inputName,
  onChange,
  checked,
  disabled,
}: IProps) {
  return (
    <label className={`${styles.box} cursor-pointer`}>
      {inputType === "checkbox" ? (
        <CustomCheckBox
          type="checkbox"
          name={inputName}
          value={imgSrc}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
      ) : (
        <input
          type="radio"
          className={`${styles.custom_checkbox} `}
          name={inputName}
          value={imgSrc}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
      )}
      <div className={`${styles.selectedOverlay}`}></div>
      <img loading="lazy" src={imgSrc} alt="image" />
    </label>
  );
}
