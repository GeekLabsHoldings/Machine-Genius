import React from "react";
import styles from "./ImageCard.module.css";

type IProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  imgSrc: string;
  inputName: string;
  imgProps?: string;
};

export default function ImageCard({
  imgSrc,
  inputName,
  onChange,
  checked,
  disabled,
  imgProps,
}: IProps) {
  return (
    <label className={`${styles.box} cursor-pointer`}>
      <input
        type="radio"
        className={`${styles.custom_checkbox} `}
        name={inputName}
        value={imgSrc}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <div className={`${styles.selectedOverlay}`}></div>
      <img
        loading="lazy"
        src={imgSrc}
        alt="image"
        className={imgProps ? imgProps : ""}
      />
    </label>
  );
}
