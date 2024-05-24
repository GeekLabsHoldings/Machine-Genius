"use client"; // Directive to indicate that this file is a client component in a Next.js application.

import React from "react"; // Import the React library for building the component.
import styles from "./TemplateBox.module.css"; // Import CSS module for component-specific styles.
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Import the CustomBtn component from the specified path.

// Define the props interface for the TemplateBox component
interface IProps {
  title: string; // Title to be displayed in the TemplateBox
  children?: React.ReactNode; // Optional children elements to be rendered inside the TemplateBox
}

/**
 * Renders a Template Box component with the given title and children.
 *
 * @param {IProps} props - The props object containing the title and children.
 * @param {string} props.title - The title to be displayed in the TemplateBox.
 * @param {React.ReactNode} props.children - The content to be rendered inside the TemplateBox.
 * @return {JSX.Element} The rendered TemplateBox component.
 */
export default function TemplateBox({ title, children }: IProps) {
  return (
    // Main container for the TemplateBox with applied styles
    <div className={styles.box}>
      {/* Header section of the TemplateBox */}
      <div className={styles.header}>
        {/* Container for the title and a static subtitle */}
        <div className="space-y-[1vw]">
          {/* Title passed as a prop */}
          <p>{title}</p>
          {/* Static subtitle */}
          <p>Interview Questions</p>
        </div>
      </div>
      {/* Body section of the TemplateBox with applied spacing */}
      <div className={styles.body + " space-y-[0.6vw]"}>
        {/* Render children elements passed as props */}
        {children}
      </div>
      {/* Conditional rendering of a line divider if children are present */}
      {children && <div className={styles.line}></div>}
      {/* Custom button at the bottom of the TemplateBox */}
      <CustomBtn
        btnColor="black" // Button color
        word="View Template" // Button text
        width="w-full" // Button width
        paddingVal="py-[16px] px-[14px]" // Button padding
        // href="/hr/" // Uncomment and modify to add a link to the button
      />
    </div>
  );
}
