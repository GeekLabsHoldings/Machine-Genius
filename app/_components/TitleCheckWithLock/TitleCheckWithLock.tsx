"use client";
import { useState, useEffect, use, useRef } from "react";
import styles from "./TitleCheckWithLock.module.css";
import { contentCreatorContext } from "@/app/_context/contentCreatorContext";
import { useContext } from "react";
import { createNewsletterContext } from "@/app/newsletter/create/_context/createNewsletterContext";
import { usePathname } from "next/navigation";

interface IProps {
  checkName?: string;
  title?: string;
  id?: string;
  order?: number;
  setAsLocked?: boolean;
}
const TitleCheckWithLock = ({
  checkName,
  title,
  id,
  order,
  setAsLocked,
}: IProps) => {
  const path = usePathname();

  //! Todo: Fix the type of the context
  const {
    lockedGeneratedTitles,
    setLockedGeneratedTitles,
    selectedContentTitle,
    setSelectedContentTitle,
  } = useContext(
    (path.includes("newsletter")
      ? createNewsletterContext
      : contentCreatorContext) as React.Context<any>
  );
  const [isLocked, setIsLocked] = useState<boolean>();

  useEffect(() => {
    if (isLocked) {
      // handle check
      if (!lockedGeneratedTitles.some((item: any) => item.title === title)) {
        setLockedGeneratedTitles((prev: any) => [
          ...prev,
          { title: title, id: id, order: order },
        ]);
      }
    } else {
      // handle uncheck
      let filteredLockedGeneratedTitles = lockedGeneratedTitles.filter(
        (item: any) => item.title !== title
      );
      setLockedGeneratedTitles(filteredLockedGeneratedTitles);
    }
  }, [isLocked]);

  useEffect(() => {
    if (setAsLocked) {
      setIsLocked(true);
    }
  }, []);

  return (
    <label className={styles.title_check}>
      <input
        type="radio"
        name={checkName}
        value={title}
        checked={selectedContentTitle === title}
        onChange={() => {
          setSelectedContentTitle(title);
        }}
      />
      {title}
      <label
        htmlFor={`toggle-locked-${id}`}
        className={`${styles.toggle_locked} toggle_locked`}
      >
        <input
          type="checkbox"
          name="toggle-locked"
          id={`toggle-locked-${id}`}
          onChange={() => {
            setIsLocked((prev) => !prev);
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="25"
          viewBox="0 0 22 25"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.85 10.3607V7.08889C3.85 5.2088 4.6033 3.40571 5.94419 2.07629C7.28507 0.746864 9.10371 0 11 0C12.8963 0 14.7149 0.746864 16.0558 2.07629C17.3967 3.40571 18.15 5.2088 18.15 7.08889V10.3607H18.7C20.5226 10.3607 22 11.8255 22 13.6325V21.2667C22 23.0737 20.5226 24.5385 18.7 24.5385H3.3C1.47747 24.5385 0 23.0737 0 21.2667V13.6325C0 11.8255 1.47747 10.3607 3.3 10.3607H3.85ZM8.27764 4.3898C8.99965 3.67395 9.97887 3.2718 11 3.2718C12.0211 3.2718 13.0004 3.67395 13.7224 4.3898C14.4444 5.10564 14.85 6.07653 14.85 7.08889V10.3607H7.15V7.08889C7.15 6.07653 7.55563 5.10564 8.27764 4.3898Z"
            fill={isLocked ? "#F36F24" : "#DFDFDF"}
          />
        </svg>
      </label>
    </label>
  );
};

export default TitleCheckWithLock;
