"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./OptionsDropdown.module.css";
import $ from "jquery";

/**
 * Props for the OptionsDropdown component.
 */
interface OptionsDropdownProps {
  icon: any;
  options: string[];
  openIndecator?: boolean;
}

/**
 * A dropdown component that displays a list of options when clicked.
 * @param icon The icon to display in the dropdown button.
 * @param options The list of options to display in the dropdown menu.
 */
function OptionsDropdown({
  icon,
  options,
  openIndecator,
}: OptionsDropdownProps) {
  const [open, setOpen] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState<"left" | "right">(
    "right"
  );

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        $(ref.current!).find(e.target as any).length === 0 &&
        !$(ref.current!).is(e.target as any)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (open && ref.current) {
      const boundingRect = ref.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const spaceToLeft = boundingRect.left;
      const spaceToRight = viewportWidth - boundingRect.right;

      if (spaceToLeft > spaceToRight) {
        setDropdownDirection("left");
      } else {
        setDropdownDirection("right");
      }
    }
  }, [open]);

  return (
    <div
      className={`flex items-center p-2 space-x-2 ${
        open ? "bg-gray-200" : ""
      } rounded hover:bg-gray-200 relative cursor-pointer h-fit gap-3`}
      ref={ref}
      onClick={() => setOpen(!open)}
    >
      <button className="flex items-center space-x-2">{icon}</button>
      {openIndecator && (
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
      )}

      <div
        className={`absolute top-11 min-w-40 bg-white rounded-[10px] shadow-lg transform ${
          open
            ? "opacity-100 z-10 translate-y-0"
            : "opacity-0 -z-10 invisible -translate-y-16"
        } ${dropdownDirection === "left" ? "-right-3" : "-left-3"} ${
          styles.dropdown__items__container
        }`}
      >
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              className={`py-2 px-4 font-bold min-w-max w-full hover:bg-gray-200 ${styles.dropdown__item}`}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OptionsDropdown;
