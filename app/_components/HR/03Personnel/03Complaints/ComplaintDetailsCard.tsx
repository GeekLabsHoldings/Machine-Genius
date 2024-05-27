"use client"; // Directive to indicate that this file is a client component in a Next.js application.

import React from "react"; // Import the React library for building the component.
import styles from "./ComplaintDetailsCard.module.css"; // Import CSS module for component-specific styles.

/**
 * Renders a card component displaying the details of a complaint.
 *
 * @return {JSX.Element} The rendered card component.
 */
export default function ComplaintDetailsCard() {
  return (
    // Main container for the ComplaintDetailsCard with border and padding styles
    <div
      className={`border-2 border-[#DBDBD7] rounded-[20px] p-8 ${styles.card}`}
    >
      {/* Card Header - Displays the main details of the complaint in a grid layout */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-1 mb-4">
        {/* Requested By */}
        <span className="font-semibold">Requested By</span>
        <span>Shahenda El Naggar</span>
        {/* Request Date */}
        <span className="font-semibold">Request Date</span>
        <span>20th March 2024</span>
        {/* Complaint Issue */}
        <span className="font-semibold">Complaint Issue</span>
        <span>Bullying</span>
        {/* Urgency Level */}
        <span className="font-semibold">Urgency Level</span>
        <span>High</span>
      </div>
      {/* Card Body - Contains the description of the complaint */}
      <div className="mt-[7vh]">
        {/* Complaint Description Header */}
        <div className="font-semibold mb-2">Complaint Description</div>
        {/* Complaint Description Text */}
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p className="text-gray-700 mt-2">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
    </div>
  );
}
