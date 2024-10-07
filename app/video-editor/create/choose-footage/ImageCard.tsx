"use client";
import React, { memo } from "react";
import styles from "./ImageCard.module.css";

type IProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  imgSrc: string;
  inputName: string;
  imgProps?: string;
};

const ImageCard = memo(function ImageCard({
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
        type="checkbox"
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
});

export default ImageCard;