import React from "react";

interface QuarterCirclesProps {
  color: string;
  translate: number;
}

const QuarterCircles = ({ color, translate }: QuarterCirclesProps) => {
  return (
    <span
      className={`w-[0.693vw] h-[0.876vw] rounded-sm rounded-tr-3xl inline-block p-0 m-0`}
      style={{ background: color, transform: `translateX(${translate}%)` }}
    ></span>
  );
};

export default QuarterCircles;
