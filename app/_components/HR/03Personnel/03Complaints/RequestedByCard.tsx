"use client"; // Directive to indicate that this file is a client component in a Next.js application.

import React from "react"; // Import the React library for building the component.

interface IProps {
  name: string; // The name of the person to be displayed.
  color: string; // The color associated with the person, used to fill the SVG path.
}

/**
 * Renders a card component displaying the name and color of a person.
 *
 * @param {IProps} props - The properties for the component.
 * @param {string} props.name - The name of the person.
 * @param {string} props.color - The color of the person.
 * @return {JSX.Element} The rendered card component.
 */
export default function RequestedByCard({ name, color }: IProps) {
  return (
    // Main container for the RequestedByCard with flexbox layout, border, padding, and minimum width styles
    <div className="flex items-center gap-2 border-[1px] border-[#2A2B2A] rounded-[5px] px-[9px] py-[5px] min-w-[160px]">
      {/* SVG Icon - Represents a graphical element with the specified color */}
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          // Defines the shape of the SVG icon with the provided color
          d="M0 1.14286C0 0.511675 0.511675 0 1.14286 0H2.07143C9.76397 0 16 6.23603 16 13.9286C16 14.5203 15.5203 15 14.9286 15H3C1.34315 15 0 13.6569 0 12V1.14286Z"
          fill={color}
        />
      </svg>
      {/* Span Element - Displays the name of the person */}
      <span>{name}</span>
    </div>
  );
}

