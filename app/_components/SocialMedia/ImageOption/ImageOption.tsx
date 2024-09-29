"use client";
import React, { memo } from "react";
import Image from "next/image";
import styles from "./ImageOption.module.css";

type IProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  imageSrc: string;
  imageAlt?: string;
  inputName: string;
};

const ImageOption = memo(function ImageOption({
  imageSrc,
  imageAlt = "post image",
  inputName,
  onChange,
  checked,
  disabled,
  ...rest
}: IProps) {
  return (
    <label className={styles.image_option}>
      <input
        type="checkbox"
        name={inputName}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        {...rest}
      />
      <div className={styles.selectedOverlay}></div>
      <Image src={imageSrc} alt={imageAlt} layout="fill" objectFit="cover" />
    </label>
  );
});

export default ImageOption;
