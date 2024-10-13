"use client";
import React, { useEffect, useRef } from "react";
import styles from "./CustomCheckBox.module.css";

interface CustomCheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  accentColor?: string;
  indeterminate?: boolean; // Added indeterminate prop
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  indeterminate = false, // Default to false
  className,
  ...props
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={checkboxRef}
      className={`${styles.custom_checkbox} ${className ?? ""}`}
      type="checkbox"
      style={
        {
          "--module-color": props.accentColor ?? "var(--dark)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export default CustomCheckBox;
