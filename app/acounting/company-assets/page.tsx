import React from "react";
import styles from "./companyAssets.module.css";

const page = () => {
  return (
    <div className="flex flex-col h-full py-[1.5vw]">
      <div className={"tabs " + styles.tabs}>
        <input type="radio" name="tabs" className="tab" aria-label="Lists" />
        <div className="tab-content h-[75vh] py-[1.5vw] "></div>

        <input type="radio" name="tabs" className="tab" aria-label="Sharing" />
        <div className="tab-content h-[75vh] py-[1.5vw] "></div>

        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Campaigns"
          defaultChecked
        />
        <div className="tab-content h-[75vh] py-[1.5vw] "></div>
      </div>
    </div>
  );
};

export default page;
