"use client"; // Indicate that this file is a client-side component

// Import the React library
import React from "react";
// Import CSS module styles for the AdministrativeCard component
import styles from "./AdministrativeCard.module.css";

// Define the Item interface specifying the structure of an item object
interface Item {
  title: string; // The title of the item
  info?: any; // Optional additional information about the item
}

// Define the props interface for the AdministrativeCard component
interface AdministrativeCardProps {
  icon: JSX.Element; // The icon to be displayed in the card
  addIcon: boolean; // Flag indicating whether to add an icon to the card header
  title: string; // The title of the card
  items: Item[]; // The list of items to be displayed in the card body
}

/**
 * Renders an administrative card component with a title, icon, and a list of items.
 *
 * @param {Object} props - The properties for the administrative card component.
 * @param {React.ReactElement} props.icon - The icon to be displayed in the card.
 * @param {boolean} props.addIcon - Flag indicating whether to add an icon to the card header.
 * @param {string} props.title - The title of the card.
 * @param {Array<Object>} props.items - The list of items to be displayed in the card body.
 * @param {string} props.items[].title - The title of the item.
 * @param {any} props.items[].info - Additional information about the item (optional).
 * @return {React.ReactElement} The rendered administrative card component.
 */
export default function AdministrativeCard({
  icon,
  addIcon,
  title,
  items,
}: AdministrativeCardProps) {
  return (
    <div className={styles.card}>
      {/* Card header containing the title and optional icon */}
      <div className="card-head flex justify-between">
        <div className={`${styles.cardTitle} flex gap-3`}>
          {/* Display the provided icon */}
          {icon}
          {/* Display the card title */}
          <div>{title}</div>
        </div>
        {/* Conditionally render an additional icon in the header if addIcon is true */}
        {addIcon && (
          <div className="card-head-icon cursor-pointer">
            {/* SVG icon for adding a new item */}
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_951_2939)">
                <rect
                  y="0.00585938"
                  width="30"
                  height="30"
                  rx="6"
                  fill="#2A2B2A"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.5833 22.5059C13.5833 23.3343 14.2176 24.0059 15 24.0059C15.7824 24.0059 16.4167 23.3343 16.4167 22.5059V16.5059H22.0833C22.8658 16.5059 23.5 15.8343 23.5 15.0059C23.5 14.1774 22.8658 13.5059 22.0833 13.5059H16.4167V7.50586C16.4167 6.67742 15.7824 6.00586 15 6.00586C14.2176 6.00586 13.5833 6.67742 13.5833 7.50586V13.5059H7.91667C7.13427 13.5059 6.5 14.1774 6.5 15.0059C6.5 15.8343 7.13427 16.5059 7.91667 16.5059H13.5833V22.5059Z"
                  fill="#FFFFFB"
                />
              </g>
              <defs>
                <clipPath id="clip0_951_2939">
                  <rect
                    y="0.00585938"
                    width="30"
                    height="30"
                    rx="6"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        )}
      </div>
      {/* Horizontal rule separating the header and body */}
      <hr className={styles.cardHr} />
      {/* Card body containing the list of items */}
      <div className={styles.cardBody}>
        {items.map((item, index) => (
          <div
            key={index} // Unique key for each item
            className={`${styles.cardItem} flex justify-between`}
          >
            {/* Display the item's title */}
            {item.title}
            {/* Display additional information about the item if available */}
            <span>{item?.info}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
