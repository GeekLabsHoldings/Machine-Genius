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
};

const ImageOption = memo(function ImageOption({
  imageSrc,
  imageAlt = "post image",
  name,
  onChange,
  checked,
  disabled,
  ...rest
}: IProps) {
  return (
    <label className={styles.image_option}>
      <input
        type="checkbox"
        name={name}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        {...rest}
      />
      <div className={styles.selectedOverlay}></div>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        style={{ objectFit: "cover" }}
      />
    </label>
  );
});

export default ImageOption;
