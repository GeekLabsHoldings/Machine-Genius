import React from "react";
import styles from "../CardStyles.module.css";

interface IProps {
  platformName: "TELEGRAM" | "FACEBOOK" | "REDDIT" | "TWITTER";
  brandName: string;
  username: string;
  followersCount: number;
  isActive: boolean;
  onClick?: () => void;
}

export default function SocialMediaAccountCard({
  platformName,
  brandName,
  username,
  followersCount,
  isActive,
  onClick,
}: IProps) {
  return (
    <div
      className={`${
        styles.card
      } px-[1vw] pt-[0.6vw] pb-[1vw] rounded-xl group overflow-hidden ${
        isActive ? "bg-[var(--dark)] text-[var(--white)]" : ""
      } hover:bg-[var(--dark)] hover:text-[var(--white)] cursor-pointer`}
      onClick={onClick}
    >
      <div
        className={`flex justify-between items-center pb-[0.5vw] border-b-[1px] ${
          isActive ? "border-b-[var(--white)]" : "border-b-[#2A2B2A]"
        } group-hover:border-b-[var(--white)] mb-[0.5vw]`}
      >
        <h3 className="grow font-bold text-center">
          {platformName[0] + platformName.slice(1).toLowerCase()}
        </h3>
      </div>
      <div className="grid mx-auto w-full grid-cols-2">
        <span className="font-bold text-left">Name:</span>
        <span className="text-right">{brandName}</span>
        <span className="font-bold text-left">Username:</span>
        <span className="text-right">{username}</span>
        <span className="font-bold text-left">Followers:</span>
        <span className="text-right">{followersCount}</span>
      </div>
    </div>
  );
}
