import React from "react";
import styles from "./quarterCircles.module.css";

interface QuarterCirclesProps {
  color: string;
  translate: number;
}

const QuarterCircles: React.FC<QuarterCirclesProps> = ({
  color,
  translate,
}) => {
  return (
    <>
      <span
        className={` w-[0.693vw] h-[0.876vw] rounded-tr-3xl rounded-tl-sm rounded-br-sm rounded-bl-sm inline-block p-0 m-0`}
        style={{ background: color, transform: `translateX(${translate}%)` }}
      ></span>
    </>
  );
};

export default QuarterCircles;
