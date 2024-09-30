import React from "react";
import styles from "./RecentNotificationCard.module.css";
import Image from "next/image";
import profileImg1 from "@/public/assets/man-img.svg";

interface IRecentNotificationCard {
  profileImg?: string;
  name: string;
  username: string;
  text: string;
  isVerified?: boolean;
}

const VerifiedIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.21234 0.91996C6.08846 -0.306653 7.91149 -0.306653 8.78768 0.91996L8.92718 1.11524C9.08132 1.33112 9.34026 1.44671 9.60389 1.41742L10.2256 1.34833C11.6249 1.19287 12.8071 2.37516 12.6517 3.77437L12.5826 4.3961C12.5533 4.65976 12.6689 4.91865 12.8848 5.07285L13.0801 5.21234C14.3066 6.08846 14.3066 7.91149 13.0801 8.78768L12.8848 8.92718C12.6689 9.08132 12.5533 9.34026 12.5826 9.60389L12.6517 10.2256C12.8071 11.6249 11.6249 12.8071 10.2256 12.6517L9.60389 12.5826C9.34026 12.5533 9.08132 12.6689 8.92718 12.8848L8.78768 13.0801C7.91149 14.3066 6.08853 14.3066 5.21234 13.0801L5.07285 12.8848C4.91865 12.6689 4.65976 12.5533 4.39609 12.5826L3.77437 12.6517C2.37516 12.8071 1.19287 11.6249 1.34833 10.2256L1.41742 9.60389C1.44671 9.34026 1.33112 9.08132 1.11524 8.92718L0.91996 8.78768C-0.306653 7.91149 -0.306653 6.08853 0.91996 5.21234L1.11524 5.07285C1.33112 4.91865 1.44671 4.65976 1.41742 4.39609L1.34833 3.77437C1.19287 2.37516 2.37516 1.19287 3.77437 1.34833L4.3961 1.41742C4.65976 1.44671 4.91865 1.33112 5.07285 1.11524L5.21234 0.91996ZM9.71468 5.01762C10.0006 5.3036 10.0006 5.76728 9.71468 6.05323L6.91814 8.84977C6.55895 9.20903 5.97649 9.20903 5.6173 8.84977L4.28533 7.51781C3.99936 7.23185 3.99936 6.76817 4.28533 6.48221C4.57132 6.19625 5.03497 6.19625 5.32095 6.48221L6.26772 7.42899L8.67908 5.01762C8.96504 4.73165 9.42872 4.73165 9.71468 5.01762Z"
      fill="#31B2E9"
    />
  </svg>
);

export default function RecentNotificationCard({
  profileImg = profileImg1,
  name,
  username,
  text,
  isVerified,
}: IRecentNotificationCard) {
  return (
    <div className={styles.item}>
      <div className={styles.avatar}>
        <Image src={profileImg} alt="avatar" />
        <div className={styles.avatar_info}>
          <p>
            {name}
            {isVerified && VerifiedIcon}
          </p>
          <span>{username}</span>
        </div>
      </div>
      <p>{text}</p>
    </div>
  );
}
