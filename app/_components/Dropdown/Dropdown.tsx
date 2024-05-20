"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  title: string;
  items: string[];
}
/**
 * Dropdown component that displays a dropdown menu with a title and a list of items.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the dropdown.
 * @param {string[]} props.items - The list of items to display in the dropdown menu.
 * @returns {JSX.Element} The rendered Dropdown component.
 */
function Dropdown({ title, items }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
  // Close the dropdown when clicking outside of it
  // const handelOnOutsideClick = (e: any) => {
  //   if (!ref.current?.contains(e.target))
  //    return 
  //   setOpen(false);
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handelOnOutsideClick);
  //   return () => {
  //     document.removeEventListener("click", handelOnOutsideClick);
  //   };
  // }, []);

  return (
    <div className={`relative inline-block text-left ${styles.dropdown}`} ref={ref}
      onMouseLeave={() => setOpen(false)}
      >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full justify-between px-4 py-2 border [border-color:var(--dark)] rounded-[5px] dropdown__button"
      >
        <span>{title}</span>
        <svg
          className={`w-5  ${open ? "[transform:rotateX(180deg)]" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 10"
          fill="currentColor"
        >
          <path
            d="M17.0995 -1.0324e-06L0.898999 -2.44869e-06C0.734977 0.00034086 0.574202 0.0305532 0.433978 0.0873808C0.293753 0.144208 0.179391 0.225499 0.1032 0.322504C0.0270088 0.41951 -0.00812266 0.528557 0.00158192 0.637905C0.0112865 0.747255 0.0654628 0.852764 0.158278 0.94308L8.25851 8.75702C8.59422 9.08099 9.40244 9.08099 9.73905 8.75702L17.8393 0.943082C17.933 0.852955 17.988 0.747392 17.9983 0.63786C18.0085 0.52833 17.9736 0.419021 17.8973 0.32181C17.8211 0.224599 17.7064 0.143203 17.5657 0.0864677C17.425 0.0297327 17.2638 -0.000173633 17.0995 -1.0324e-06Z"
            fill="#2A2B2A"
          />
        </svg>
      </button>
      <div
        className={`absolute w-full bg-white rounded-[10px] transform ${
          open
            ? "opacity-100 z-10 translate-y-0"
            : "opacity-0 -z-10 invisible -translate-y-16"
        } overflow-clip ${styles.dropdown__items__container}`}
      >
        <div className="">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            >
            {items.map((item, index) => (
              <a
              key={index}
              href="#"
              className={`block py-2 w-full text-sm [text-color:var(--dark)] font-bold
              hover:bg-gray-100 hover:text-gray-900 ${styles.dropdown__item}`}
              role="menuitem"
              onClick={() => setOpen(false)}
              >
                <span className="block px-4">{item}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
