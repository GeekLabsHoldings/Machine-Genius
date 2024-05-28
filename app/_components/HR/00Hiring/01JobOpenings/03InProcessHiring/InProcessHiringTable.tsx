"use client";
import React from "react";
import styles from "./InProcessHiringTable.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";

export default function InProcessHiringTable() {
  // An array of objects representing the rows of the table body.
  const taleData = [
    {
      job_title: "Front-End",
      level: "Beginner",
      department: "Front-End",
      candidates: "45",
      hiringStatus: "Continue",
    },
    {
      job_title: "Video Editor",
      level: "Beginner",
      department: "Video Editing",
      candidates: "75",
      hiringStatus: "Continue",
    },
    {
      job_title: "Video Editor",
      level: "Beginner",
      department: "Video Editing",
      candidates: "23",
      hiringStatus: "Continue",
    },
    {
      job_title: "Video Editor",
      level: "Beginner",
      department: "Video Editing",
      candidates: "43",
      hiringStatus: "Continue",
    },
    {
      job_title: "Front-End",
      level: "Beginner",
      department: "Front-End",
      candidates: "45",
      hiringStatus: "Continue",
    },
    {
      job_title: "Video Editor",
      level: "Beginner",
      department: "Video Editing",
      candidates: "75",
      hiringStatus: "Continue",
    },
    {
      job_title: "Video Editor",
      level: "Beginner",
      department: "Video Editing",
      candidates: "23",
      hiringStatus: "Continue",
    },
    {
      job_title: "Video Editor",
      level: "Beginner",
      department: "Video Editing",
      candidates: "43",
      hiringStatus: "Continue",
    },
    {
      job_title: "Front-End",
      level: "Beginner",
      department: "Front-End",
      candidates: "45",
      hiringStatus: "Continue",
    },
    {
      job_title: "Video Editor",
      level: "Beginner",
      department: "Video Editing",
      candidates: "75",
      hiringStatus: "Continue",
    },
    {
      job_title: "Video Editor",
      level: "Beginner",
      department: "Video Editing",
      candidates: "23",
      hiringStatus: "Continue",
    },
    {
      job_title: "Video Editor",
      level: "Beginner",
      department: "Video Editing",
      candidates: "43",
      hiringStatus: "Continue",
    },
    {
      job_title: "Front-End",
      level: "Beginner",
      department: "Front-End",
      candidates: "45",
      hiringStatus: "Continue",
    },
    {
      job_title: "Video Editor",
      level: "Beginner",
      department: "Video Editing",
      candidates: "75",
      hiringStatus: "Continue",
    },
    {
      job_title: "Video Editor",
      level: "Beginner",
      department: "Video Editing",
      candidates: "23",
      hiringStatus: "Continue",
    },
    {
      job_title: "Video Editor",
      level: "Beginner",
      department: "Video Editing",
      candidates: "43",
      hiringStatus: "Continue",
    },
  ];
  return (
    <div className={styles.database_table}>
      {/* Table Header */}
      <ul className={styles.table_header}>
        <li className="w-[20%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="25"
            viewBox="0 0 36 25"
            fill="none"
          >
            <path
              d="M32.431 0H3.2832C1.47014 0 0 1.54727 0 3.45676V21.5433C0 23.4521 1.47014 25 3.2832 25H32.4311C34.2441 25 35.7143 23.4521 35.7143 21.5433V3.45676C35.7142 1.54727 34.2441 0 32.431 0ZM8.5975 5.99299C10.4087 5.99299 11.8778 7.5396 11.8778 9.44725C11.8778 11.3548 10.4087 12.9008 8.5975 12.9008C6.7857 12.9008 5.3173 11.3548 5.3173 9.44725C5.3173 7.5396 6.7857 5.99299 8.5975 5.99299ZM8.5975 19.3239C6.34409 19.3239 4.03633 18.5023 4.39627 16.2281C4.54289 15.3045 5.26875 14.01 5.81974 13.4298C5.89061 13.3552 6.21399 13.3358 6.30209 13.3931C6.97069 13.8269 7.7557 14.0808 8.5975 14.0808C9.4393 14.0808 10.2237 13.8269 10.8923 13.3931C10.9804 13.3358 11.3037 13.3552 11.3753 13.4298C11.9256 14.01 12.6515 15.3045 12.7981 16.2281C13.1582 18.5023 10.8504 19.3239 8.5975 19.3239ZM25.5597 18.1911H16.1965V16.2082H25.5596V18.1911H25.5597ZM31.1583 13.3129H16.1965V11.3299H31.1583V13.3129ZM31.1583 8.43456H16.1965V6.45163H31.1583V8.43456Z"
              fill="#2A2B2A"
            />
          </svg>
          <span>Job Title</span>
        </li>
        <li className="w-[20%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="25"
            viewBox="0 0 26 25"
            fill="none"
          >
            <path
              d="M1.1932 9.2123L12.6513 16.5038C12.8222 16.6121 13.0169 16.6663 13.2107 16.6663C13.4054 16.6663 13.5992 16.6121 13.77 16.5038L25.2281 9.2123C25.5281 9.02065 25.7104 8.68941 25.7104 8.33316C25.7104 7.97692 25.5281 7.64568 25.2281 7.45506L13.77 0.162484C13.4283 -0.0541615 12.9929 -0.0541615 12.6513 0.162484L1.1932 7.45506C0.893209 7.64568 0.710938 7.97692 0.710938 8.33316C0.710889 8.68941 0.893209 9.02065 1.1932 9.2123Z"
              fill="#2A2B2A"
            />
            <path
              d="M25.2281 15.7875L22.0021 13.7344L14.8888 18.2614C14.3836 18.5811 13.8044 18.7499 13.2107 18.7499C12.6169 18.7499 12.0378 18.5811 11.5357 18.2624L4.41916 13.7344L1.1932 15.7875C0.893209 15.9791 0.710938 16.3103 0.710938 16.6666C0.710938 17.0228 0.893209 17.3541 1.1932 17.5447L12.6513 24.8373C12.8222 24.9456 13.0159 24.9998 13.2107 24.9998C13.4044 24.9998 13.5992 24.9456 13.77 24.8373L25.2281 17.5447C25.5281 17.3541 25.7104 17.0228 25.7104 16.6666C25.7104 16.3103 25.5281 15.9791 25.2281 15.7875Z"
              fill="#2A2B2A"
            />
          </svg>
          <span>Level</span>
        </li>
        <li className="w-[20%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="23"
            viewBox="0 0 28 23"
            fill="none"
          >
            <path
              d="M20.2752 0C20.7652 0 21.2178 0.253098 21.4628 0.663951L27.5272 10.836C27.7722 11.2469 27.7722 11.7531 27.5272 12.1639L21.4628 22.336C21.2178 22.7469 20.7652 23 20.2754 23H8.14653C7.65666 23 7.20398 22.7469 6.95904 22.336L0.894652 12.1639C0.649699 11.7531 0.649699 11.2469 0.894652 10.836L6.95902 0.663951C7.20398 0.253098 7.65664 0 8.14653 0H20.2752Z"
              fill="#2A2B2A"
            />
          </svg>
          <span>Department</span>
        </li>
        <li className="w-[20%]">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 0C15.9531 0 18.75 2.79688 18.75 6.25C18.75 9.70312 15.9531 12.5 12.5 12.5C9.04688 12.5 6.25 9.70312 6.25 6.25C6.25 2.79688 9.04688 0 12.5 0ZM12.5 25C12.5 25 25 25 25 21.875C25 18.125 18.9062 14.0625 12.5 14.0625C6.09375 14.0625 0 18.125 0 21.875C0 25 12.5 25 12.5 25Z"
              fill="#2A2B2A"
            />
          </svg>

          <span>Candidates</span>
        </li>
        <li className="w-[20%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="25"
            viewBox="0 0 26 25"
            fill="none"
          >
            <path
              d="M8.21109 4.16667H9.87776C9.98076 4.1711 10.0815 4.1357 10.1591 4.06781C10.2367 3.99992 10.2851 3.90476 10.2944 3.80208V2.5H16.1278V3.75C16.1233 3.853 16.1587 3.95375 16.2266 4.03134C16.2945 4.10893 16.3897 4.15739 16.4923 4.16667H18.2111C18.3141 4.1711 18.4148 4.1357 18.4924 4.06781C18.57 3.99992 18.6185 3.90476 18.6278 3.80208V2.5C18.6183 1.83989 18.3519 1.20947 17.8851 0.742653C17.4183 0.275839 16.7879 0.00942193 16.1278 0H10.2944C9.63432 0.00942193 9.00389 0.275839 8.53708 0.742653C8.07027 1.20947 7.80385 1.83989 7.79443 2.5V3.75C7.79373 3.80491 7.80403 3.85941 7.82472 3.91028C7.84541 3.96114 7.87607 4.00736 7.91491 4.04619C7.95374 4.08502 7.99995 4.11568 8.05082 4.13638C8.10169 4.15707 8.15618 4.16737 8.21109 4.16667Z"
              fill="#2A2B2A"
            />
            <path
              d="M23.2109 6.66666H3.21094C2.55083 6.67608 1.9204 6.9425 1.45359 7.40932C0.986777 7.87613 0.720359 8.50655 0.710938 9.16666V22.5C0.720359 23.1601 0.986777 23.7905 1.45359 24.2573C1.9204 24.7242 2.55083 24.9906 3.21094 25H23.2109C23.871 24.9906 24.5015 24.7242 24.9683 24.2573C25.4351 23.7905 25.7015 23.1601 25.7109 22.5V9.16666C25.7015 8.50655 25.4351 7.87613 24.9683 7.40932C24.5015 6.9425 23.871 6.67608 23.2109 6.66666ZM11.8568 16.0938L8.67969 19.375C8.59295 19.4263 8.49402 19.4534 8.39323 19.4534C8.29244 19.4534 8.19351 19.4263 8.10677 19.375L4.8776 16.0938C4.61719 15.8854 4.82552 15.5208 5.24219 15.5208H7.22135C7.20756 14.7 7.3556 13.8846 7.65701 13.121C7.95842 12.3574 8.40731 11.6607 8.97802 11.0707C9.54874 10.4806 10.2301 10.0087 10.9832 9.68205C11.7363 9.35536 12.5464 9.18023 13.3672 9.16666H13.5755V11.5625C12.5401 11.622 11.5618 12.0566 10.8237 12.7852C10.0855 13.5138 9.63811 14.4863 9.56511 15.5208H11.4401C11.8568 15.5208 12.0651 15.8854 11.8568 16.0938ZM21.9609 16.0938H19.9818C19.9873 17.7717 19.3268 19.3832 18.1452 20.5745C16.9636 21.7659 15.3576 22.4396 13.6797 22.4479H13.5234V20.0521C15.9193 20.0521 17.5859 18.4896 17.5859 16.0938H15.6589C15.2422 16.0938 15.0859 15.7812 15.2943 15.5208L18.5234 12.2396C18.6102 12.1883 18.7091 12.1612 18.8099 12.1612C18.9107 12.1612 19.0096 12.1883 19.0964 12.2396L22.3255 15.5208C22.5339 15.7292 22.3255 16.0938 21.9609 16.0938Z"
              fill="#2A2B2A"
            />
          </svg>
          <span>Hiring</span>
        </li>
      </ul>

      {/* Table Body */}
      <div className={styles.table_body}>
        {taleData.map((ele, idx) => (
          <ul className="w-[100%]" key={idx}>
            <li className="w-[20%]">{ele.job_title}</li>
            <li className="w-[20%]">{ele.level}</li>
            <li className="w-[20%]">{ele.department}</li>
            <li className="w-[20%]">{ele.candidates}</li>
            <li className={`w-[20%]`}>
              <CustomBtn
                btnColor="black"
                word={ele.hiringStatus}
                href={`/hr/hiring/job-openings/prospects`}
              />
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
