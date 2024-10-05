import React, { useContext } from "react";
import profileImg from "@/public/assets/post-profile.svg"; // Profile image
import Image from "next/image"; // Next.js Image component for optimized image loading
import styles from "./PostViewScreens.module.css";
import { socialMediaPostCreationContext } from "@/app/social-media/post-creation/_context/socialMediaPostCreationContext";

export default function PostViewScreens() {
  const { postCaption } = useContext(socialMediaPostCreationContext);

  return (
    <div className={styles.post_view_screens + " flex gap-[1vw] h-[70%]"}>
      {/* Desktop view */}
      <div className={styles.desctop_screen + " w-2/3 h-full"}>
        <h6>Desktop View</h6>
        <div className={styles.desctop_view}>
          <div className={styles.avatar}>
            <Image src={profileImg} alt="avatar" />
            <div className={styles.avatar_info}>
              <p>Investocracy</p>
              <span>@Investocrasy</span>
            </div>
          </div>
          <p>{postCaption}</p>
        </div>
      </div>

      {/* Mobile view */}
      <div className={styles.mobile_screen + " w-1/3"}>
        <h6>Mobile View</h6>
        <div className={styles.mobile_view}>
          <div className={styles.avatar}>
            <Image src={profileImg} alt="avatar" />
            <div className={styles.avatar_info}>
              <p>Investocracy</p>
              <span>@Investocrasy</span>
            </div>
          </div>
          <p>{postCaption}</p>
        </div>
      </div>
    </div>
  );
}
