"use client";
import React from "react";

interface IProps {
  name: string;
  color: string;
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
    <div className="flex items-center gap-2 border-[1px] border-[#2A2B2A] rounded-[5px] px-[9px] py-[5px] min-w-[160px]">
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 1.14286C0 0.511675 0.511675 0 1.14286 0H2.07143C9.76397 0 16 6.23603 16 13.9286C16 14.5203 15.5203 15 14.9286 15H3C1.34315 15 0 13.6569 0 12V1.14286Z"
          fill={color}
        />
      </svg>

      <span>{name}</span>
    </div>
  );
}
