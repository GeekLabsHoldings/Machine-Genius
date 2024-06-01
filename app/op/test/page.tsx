"use client";
import React, { useState } from "react";
import styles from "./test.module.css";
import "./test.css";

function page() {
  const [selectedValue, setSelectedValue] = useState<string>("option1");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const accordionWhiteArrow = (
    <svg
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.076 0.0130668L0.843283 0.0130681C0.699184 0.0133699 0.557936 0.0399126 0.434744 0.0898379C0.311551 0.139763 0.211079 0.21118 0.144142 0.296403C0.077206 0.381627 0.0463412 0.477428 0.0548671 0.573495C0.063393 0.669563 0.110989 0.762258 0.192531 0.841604L7.3089 7.70645C7.60384 7.99108 8.31389 7.99108 8.60962 7.70645L15.726 0.841602C15.8084 0.762422 15.8567 0.66968 15.8657 0.573453C15.8746 0.477226 15.844 0.381194 15.777 0.29579C15.71 0.210387 15.6092 0.138877 15.4856 0.0890332C15.3621 0.0391889 15.2204 0.0129152 15.076 0.0130668Z"
        fill="#FFFFFB"
      />
    </svg>
  );

  const upArrow = (
    <svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.447347 4.54895L8.35443 4.54895C8.43448 4.54878 8.51295 4.53403 8.58139 4.5063C8.64983 4.47856 8.70565 4.43888 8.74284 4.39154C8.78002 4.34419 8.79717 4.29097 8.79243 4.2376C8.7877 4.18423 8.76126 4.13273 8.71595 4.08865L4.76242 0.274844C4.59856 0.116718 4.20409 0.116718 4.0398 0.274844L0.0862574 4.08865C0.0404952 4.13264 0.0136591 4.18416 0.00866495 4.23762C0.00367078 4.29108 0.0207095 4.34443 0.0579299 4.39188C0.0951503 4.43933 0.151129 4.47905 0.219784 4.50674C0.288438 4.53444 0.367143 4.54903 0.447347 4.54895Z"
        fill="#5FA85B"
      />
    </svg>
  );

  const downArrow = (
    <svg
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.35734 0.71863L0.450262 0.718631C0.370207 0.718799 0.291736 0.733545 0.223296 0.761281C0.154856 0.789017 0.0990374 0.828693 0.0618508 0.87604C0.0246641 0.923386 0.00751614 0.976609 0.012253 1.02998C0.01699 1.08335 0.0434315 1.13485 0.088733 1.17893L4.04227 4.99273C4.20612 5.15086 4.6006 5.15086 4.76489 4.99273L8.71843 1.17893C8.76419 1.13494 8.79103 1.08342 8.79602 1.02996C8.80102 0.976496 8.78398 0.923145 8.74676 0.875699C8.70954 0.828252 8.65356 0.788525 8.5849 0.760833C8.51625 0.733142 8.43754 0.718545 8.35734 0.71863Z"
        fill="#E9313E"
      />
    </svg>
  );

  const accordionItems = [
    { title: "Creative Juice Box" },
    { title: "Mega Dose" },
    { title: "PST Canada" },
    { title: "PST USA" },
    { title: "Creative Juice Box" },
    { title: "Mega Dose" },
    { title: "PST Canada" },
    { title: "PST USA" },
    { title: "Creative Juice Box" },
    { title: "Mega Dose" },
    { title: "PST Canada" },
    { title: "PST USA" },
  ];

  function AccordionItem({ title, option }: { title: string; option: number }) {
    return (
      <div
        className={`collapse ${
          selectedValue === `option${option}` ? "bg-[#404140]" : ""
        }`}
      >
        <input
          type="radio"
          name="my-accordion-1"
          value={`option${option}`}
          onChange={handleRadioChange}
          checked={selectedValue === `option${option}`}
        />
        <div className="collapse-title font-bold flex justify-between items-center">
          <p>{title}</p>
          {accordionWhiteArrow}
        </div>
        <div className="collapse-content space-y-1">
          <div className="flex justify-between">
            <p>Instagram</p>
            <p className="flex items-center gap-[12px]">
              <span>100K</span>
              {upArrow}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Twitter</p>
            <p className="flex items-center gap-[12px]">
              <span>20K</span>
              {upArrow}
            </p>
          </div>
          <div className="flex justify-between">
            <p>YouTube</p>
            <p className="flex items-center gap-[12px]">
              <span>3.2M</span>
              {downArrow}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Website</p>
            <p className="flex items-center gap-[12px]">
              <span>400k</span>
              {upArrow}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Reddit</p>
            <p className="flex items-center gap-[12px]">
              <span>1M</span>
              {upArrow}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Discord</p>
            <p className="flex items-center gap-[12px]">
              <span>20K</span>
              {downArrow}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Telegram</p>
            <p className="flex items-center gap-[12px]">
              <span>150K</span>
              {upArrow}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-[1vw] h-[85vh]`}>
      <div className={styles.dashboard}>
        <div className={styles.mainContent}>Main Content</div>
        <div className={styles.sidebar}>
          <p className="text-[14px] font-bold mt-[6px] mb-[20px] text-center">
            Brand/Accounts
          </p>
          <section className="">
            <div className={styles.accord}>
              {/* Accordion Item */}
              <div
                className={`collapse ${
                  selectedValue === "option1" ? "bg-[#404140]" : ""
                }`}
              >
                <input
                  type="radio"
                  name="my-accordion-1"
                  defaultChecked
                  value="option1"
                  onChange={handleRadioChange}
                  checked={selectedValue === "option1"}
                />
                <div className="collapse-title font-bold flex justify-between items-center">
                  <p>Street Politics</p>
                  {accordionWhiteArrow}
                </div>
                <div className="collapse-content space-y-1">
                  <div className="flex justify-between">
                    <p>Instagram</p>
                    <p className="flex items-center gap-[12px]">
                      <span>100K</span>
                      {upArrow}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Twitter</p>
                    <p className="flex items-center gap-[12px]">
                      <span>20K</span>
                      {upArrow}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>YouTube</p>
                    <p className="flex items-center gap-[12px]">
                      <span>3.2M</span>
                      {downArrow}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Website</p>
                    <p className="flex items-center gap-[12px]">
                      <span>400k</span>
                      {upArrow}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Reddit</p>
                    <p className="flex items-center gap-[12px]">
                      <span>1M</span>
                      {upArrow}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Discord</p>
                    <p className="flex items-center gap-[12px]">
                      <span>20K</span>
                      {downArrow}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Telegram</p>
                    <p className="flex items-center gap-[12px]">
                      <span>150K</span>
                      {upArrow}
                    </p>
                  </div>
                </div>
              </div>

              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  option={index + 2}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default page;
