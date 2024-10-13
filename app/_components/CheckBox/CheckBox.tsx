"use client";

import { forwardRef, useState } from "react";
import styles from "./CheckBox.module.css";



const CheckBox = forwardRef<HTMLInputElement>((props, ref) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      onClick={() => {
        document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
          (checkbox as HTMLInputElement).checked = false;
        });
        setChecked((prev) => !prev);
      }}
      className="w-4 h-4 shrink-0 aspect-square relative z-[3] flex items-center justify-center border-[0.67px] [border-color:var(--dark)] rounded-[1.33px] cursor-pointer group-hover:border-white"
    >
      <label
        htmlFor="check"
        className={`border-[0.67px] shrink-0 w-2 h-2 [border-color:var(--dark)] aspect-square rounded-[0.67px] cursor-pointer group-hover:border-white ${styles.checkbox__label}`}
      >
        <input
          checked={checked}
          type="checkbox"
          className="absolute inset-0 opacity-0 cursor-pointer"
          id="check"
          ref={ref}
        />
      </label>
    </div>
  );
}
)
export default CheckBox;
