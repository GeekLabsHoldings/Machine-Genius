"use client"; // Directive to indicate that this file is a client component in a Next.js application.

import React from "react"; // Import the React library for building the component.
import CustomBtn from "../../Button/CustomBtn"; // Import the CustomBtn component from the specified path.
import styles from "./NotificationsCard.module.css"; // Import CSS module for component-specific styles.

// Define the props interface for the NotificationsCard component
interface IProps {
  bgColor: string; // Background color for the notification card
  btnText: string; // Text to display on the button
}

/**
 * Renders a notifications card component with the given props.
 *
 * @param {IProps} props - The props object containing the background color and button text.
 * @return {JSX.Element} The rendered notifications card component.
 */
export default function NotificationsCard(props: IProps) {
  return (
    // Main container for the notifications card with dynamic background color and styling
    <div
      className={`w-full rounded-[11px] border border-[#2A2B2A] py-[15px] px-[25px] ${props.bgColor} ${styles.NotificationsCard}`}
    >
      {/* Inner container with vertical layout and spacing between elements */}
      <div className="flex flex-col gap-[10px]">
        {/* Section for displaying the user name */}
        <p className="font-bold">John Doe</p>
        {/* Container for displaying the date and time in a horizontal layout */}
        <div className="flex justify-between">
          {/* Date section */}
          <div>
            <span className="font-bold">Date:</span>
            <br />
            <span>20 March</span>
          </div>
          {/* Time section */}
          <div>
            <span className="font-bold">Time:</span>
            <br />
            <span>9:45:20 AM</span>
          </div>
        </div>
        {/* Container for the custom button with margin-top applied */}
        <div className={`mt-1 ${styles.NotificationsCardBtn}`}>
          {/* Custom button with dynamic text and styling */}
          <CustomBtn
            word={props.btnText} // Text to display on the button
            btnColor="black" // Button color
            width="w-full" // Button width
            paddingVal={"py-[0.5vw] px-[1.5vw]"} // Button padding
          />
        </div>
      </div>
    </div>
  );
}
