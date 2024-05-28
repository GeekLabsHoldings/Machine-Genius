import React from "react";
import styles from "./timelineProgress.module.css";

const TimelineProgress = () => {
  return (
    <div className={`${styles.timelineProgress}`}>
      <div className=" flex items-center gap-4 mb-6">
        <span
          className={`${styles.completed} before:h-7`}
        >
          <svg
            className={`${styles.completed}`}
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 4L4 7L10 1" stroke="#FFFFFB" strokeWidth="1.5" />
          </svg>
          <svg
            className={`${styles.current}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="#2A2B2A" />
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="11.5" stroke="#ACACAC" />
          </svg>
        </span>
        <h4>UX Research</h4>
      </div>
      <div className=" flex items-center gap-4  mb-6">
        <span
          className={`${styles.completed} before:h-7`}
        >
          <svg
            className={`${styles.completed}`}
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 4L4 7L10 1" stroke="#FFFFFB" strokeWidth="1.5" />
          </svg>
          <svg
            className={`${styles.current}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="#2A2B2A" />
          </svg>
          
        </span>
        <h4>Site Maps</h4>
      </div>
      <div className=" flex items-center gap-4  mb-6">
        <span className={`${styles.current} before:h-7`}>
          <svg
            className={`${styles.completed}`}
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 4L4 7L10 1" stroke="#FFFFFB" strokeWidth="1.5" />
          </svg>
          <svg
            className={`${styles.current}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="#2A2B2A" />
          </svg>
          
        </span>
        <h4>User Journeys </h4>
      </div>
      <div className=" flex items-center gap-4  mb-6">
        <span className={`${styles.step} before:h-7`}>
          <svg
            className={`${styles.completed}`}
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 4L4 7L10 1" stroke="#FFFFFB" strokeWidth="1.5" />
          </svg>
          <svg
            className={`${styles.current}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="#2A2B2A" />
          </svg>
          
        </span>
        <h4>Design System (Style guides & Components)</h4>
      </div>
      <div className=" flex items-center gap-4  mb-6">
        <span className={`${styles.step} before:h-7`}>
          <svg
            className={`${styles.completed}`}
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 4L4 7L10 1" stroke="#FFFFFB" strokeWidth="1.5" />
          </svg>
          <svg
            className={`${styles.current}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="#2A2B2A" />
          </svg>
        </span>
        <h4>UI Design</h4>
      </div>
      <div className=" flex items-center gap-4  mb-6">
        <span className={`${styles.step} before:h-7`}>
          <svg
            className={`${styles.completed}`}
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 4L4 7L10 1" stroke="#FFFFFB" strokeWidth="1.5" />
          </svg>
          <svg
            className={`${styles.current}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="#2A2B2A" />
          </svg>
          
        </span>
        <h4>Prototype</h4>
      </div>
      <div className=" flex items-center gap-4">
        <span className={`${styles.last} ${styles.step}`}>
          <svg
            className={`${styles.completed}`}
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 4L4 7L10 1" stroke="#FFFFFB" strokeWidth="1.5" />
          </svg>
          <svg
            className={`${styles.current}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="#2A2B2A" />
          </svg>
          
        </span>
        <h4>Handover</h4>
      </div>
    </div>
  );
};

export default TimelineProgress;
