import React from "react";

interface QuarterCirclesProps {
  colors: string[];
}

const QuarterCircles: React.FC<QuarterCirclesProps> = ({ colors }) => {
  return (
    <div className="flex">
      {colors.map((color, index) => (
        <div
          key={index}
          className="w-[0.693vw] h-[0.876vw] relative"
          style={{
            marginLeft: index > 0 ? "-0.2vw" : "0",
            zIndex: index + 1,
          }}
        >
          <div
            className="absolute inset-0 rounded-[--3px] rounded-tr-[--21px]"
            style={{ backgroundColor: color }}
          />
        </div>
      ))}
    </div>
  );
};

export default QuarterCircles;
