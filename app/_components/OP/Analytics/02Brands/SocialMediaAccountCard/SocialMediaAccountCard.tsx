import React from "react";
import styles from "./SocialMediaAccountCard.module.css";
export default function SocialMediaAccountCard() {
  return (
    <div
      className={`${styles.card} px-[1vw] pt-[0.6vw] pb-[1vw] rounded-xl group hover:bg-[var(--dark)] hover:text-[var(--white)] cursor-pointer`}
    >
      <div className="flex justify-between items-center pb-[0.5vw] border-b-[1px] border-b-[#2A2B2A] group-hover:border-b-[var(--white)] mb-[0.5vw]">
        <h3 className="grow font-bold text-center">Twitter</h3>
      </div>
      <div className="grid mx-auto w-fit grid-cols-2 ">
        <span className="font-bold">Name:</span>
        <span>Mega Dose</span>
        <span className="font-bold">Username:</span>
        <span>@MEGADOSE</span>
        <span className="font-bold">Followers:</span>
        <span>20.1 K</span>
      </div>
    </div>
  );
}
