"use client";
import React, { useRef, useState } from "react";
import styles from "./emailList.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import Slider from "react-slick"; // Importing Slider component from react-slick

const page = () => {

  let sliderRef:any = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };


  function SampleNextArrow(props: any) {
    const {onClick } = props;
    return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onClick}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.4941 23.9434C17.0787 23.529 17.0787 22.8565 17.4941 22.441L21.8726 18.0625L10.625 18.0625C10.0406 18.0625 9.5625 17.5865 9.5625 17C9.5625 16.4124 10.0406 15.9375 10.625 15.9375L21.8726 15.9375L17.4941 11.559C17.0787 11.1435 17.0787 10.4699 17.4941 10.0566C17.9074 9.64115 18.581 9.64115 18.9965 10.0566L25.0059 16.066C25.2609 16.321 25.3406 16.6696 25.2822 17C25.3406 17.3304 25.2609 17.679 25.0059 17.934L18.9965 23.9434C18.581 24.3588 17.9074 24.3588 17.4941 23.9434ZM34 29.75L34 4.25C34 1.90294 32.0971 -8.318e-08 29.75 -1.85773e-07L4.25 -1.30041e-06C1.90187 -1.40305e-06 -8.318e-08 1.90294 -1.85773e-07 4.25L-1.30041e-06 29.75C-1.40301e-06 32.0971 1.90187 34 4.25 34L29.75 34C32.0971 34 34 32.0971 34 29.75Z"
            fill="black"
          />
        </svg>
    );
  }
  function SamplePrevArrow(props: any) {
    const {onClick } = props;
    return (
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onClick}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.5059 23.9434C16.9213 23.529 16.9213 22.8565 16.5059 22.441L12.1274 18.0625L23.375 18.0625C23.9594 18.0625 24.4375 17.5865 24.4375 17C24.4375 16.4124 23.9594 15.9375 23.375 15.9375L12.1274 15.9375L16.5059 11.559C16.9213 11.1435 16.9213 10.4699 16.5059 10.0566C16.0926 9.64115 15.419 9.64115 15.0035 10.0566L8.99409 16.066C8.73909 16.321 8.65939 16.6696 8.71783 17C8.65939 17.3304 8.73909 17.679 8.99409 17.934L15.0035 23.9434C15.419 24.3588 16.0926 24.3588 16.5059 23.9434ZM1.30041e-06 29.75L1.85773e-07 4.25C8.318e-08 1.90294 1.90294 -8.318e-08 4.25 -1.85773e-07L29.75 -1.30041e-06C32.0981 -1.40305e-06 34 1.90294 34 4.25L34 29.75C34 32.0971 32.0981 34 29.75 34L4.25 34C1.90294 34 1.40301e-06 32.0971 1.30041e-06 29.75Z"
            fill="#D9D9D9"
          />
        </svg>
    );
  }

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className={`${styles.emailList} pt-[1vw] overflow-hidden`}>
      <div className={"tabs " + styles.tabs}>
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Audience"
          defaultChecked
        />
        <div className={`tab-content pt-[1vw] relative`}>
          <div className="mb-[1.3vw]">
            <div className=" flex justify-between w-[87vw] mb-[1.1vw]">
              <div className=" min-w-[20vw]">
                <h4 className="mb-[0.5vw]">Brand</h4>
                <CustomSelectInput
                  options={[
                    "All",
                    "ST Suite",
                    "Street Politics",
                    "ST Suite",
                    "Street Politics",
                  ]}
                />
              </div>
              <div className=" flex items-end gap-3">
                <SamplePrevArrow  onClick={previous} />
                <SampleNextArrow  onClick={next} />
              </div>
            </div>
            <div className="sliderAudience w-[87vw]">
              <div className="slider-container ">
                <Slider ref={slider => {sliderRef = slider}} {...settings}>
                  <div
                    className={`${styles.card} px-[1vw] pt-[1.1vw] rounded-xl`}
                  >
                    <div className=" flex justify-between items-center pb-[0.7vw] border-b-[1px] border-b-[#2A2B2A] mb-[1vw]">
                      <h3>Street Politics</h3>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_902_2705)">
                          <rect width="30" height="30" rx="6" fill="#2A2B2A" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.5833 22.5C13.5833 23.3284 14.2176 24 15 24C15.7824 24 16.4167 23.3284 16.4167 22.5V16.5H22.0833C22.8658 16.5 23.5 15.8285 23.5 15C23.5 14.1715 22.8658 13.5 22.0833 13.5H16.4167V7.5C16.4167 6.67156 15.7824 6 15 6C14.2176 6 13.5833 6.67156 13.5833 7.5V13.5H7.91667C7.13427 13.5 6.5 14.1715 6.5 15C6.5 15.8285 7.13427 16.5 7.91667 16.5H13.5833V22.5Z"
                            fill="#FFFFFB"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_902_2705">
                            <rect width="30" height="30" rx="6" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className=" overflow-y-scroll h-[55vh] pr-2">
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.card} px-[1vw] pt-[1.1vw] rounded-xl`}
                  >
                    <div className=" flex justify-between items-center pb-[0.7vw] border-b-[1px] border-b-[#2A2B2A] mb-[1vw]">
                      <h3>Street Politics</h3>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_902_2705)">
                          <rect width="30" height="30" rx="6" fill="#2A2B2A" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.5833 22.5C13.5833 23.3284 14.2176 24 15 24C15.7824 24 16.4167 23.3284 16.4167 22.5V16.5H22.0833C22.8658 16.5 23.5 15.8285 23.5 15C23.5 14.1715 22.8658 13.5 22.0833 13.5H16.4167V7.5C16.4167 6.67156 15.7824 6 15 6C14.2176 6 13.5833 6.67156 13.5833 7.5V13.5H7.91667C7.13427 13.5 6.5 14.1715 6.5 15C6.5 15.8285 7.13427 16.5 7.91667 16.5H13.5833V22.5Z"
                            fill="#FFFFFB"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_902_2705">
                            <rect width="30" height="30" rx="6" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className=" overflow-y-scroll h-[55vh] pr-2">
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.card} px-[1vw] pt-[1.1vw] rounded-xl`}
                  >
                    <div className=" flex justify-between items-center pb-[0.7vw] border-b-[1px] border-b-[#2A2B2A] mb-[1vw]">
                      <h3>Street Politics</h3>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_902_2705)">
                          <rect width="30" height="30" rx="6" fill="#2A2B2A" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.5833 22.5C13.5833 23.3284 14.2176 24 15 24C15.7824 24 16.4167 23.3284 16.4167 22.5V16.5H22.0833C22.8658 16.5 23.5 15.8285 23.5 15C23.5 14.1715 22.8658 13.5 22.0833 13.5H16.4167V7.5C16.4167 6.67156 15.7824 6 15 6C14.2176 6 13.5833 6.67156 13.5833 7.5V13.5H7.91667C7.13427 13.5 6.5 14.1715 6.5 15C6.5 15.8285 7.13427 16.5 7.91667 16.5H13.5833V22.5Z"
                            fill="#FFFFFB"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_902_2705">
                            <rect width="30" height="30" rx="6" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className=" overflow-y-scroll h-[55vh] pr-2">
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.card} px-[1vw] pt-[1.1vw] rounded-xl`}
                  >
                    <div className=" flex justify-between items-center pb-[0.7vw] border-b-[1px] border-b-[#2A2B2A] mb-[1vw]">
                      <h3>Street Politics</h3>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_902_2705)">
                          <rect width="30" height="30" rx="6" fill="#2A2B2A" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.5833 22.5C13.5833 23.3284 14.2176 24 15 24C15.7824 24 16.4167 23.3284 16.4167 22.5V16.5H22.0833C22.8658 16.5 23.5 15.8285 23.5 15C23.5 14.1715 22.8658 13.5 22.0833 13.5H16.4167V7.5C16.4167 6.67156 15.7824 6 15 6C14.2176 6 13.5833 6.67156 13.5833 7.5V13.5H7.91667C7.13427 13.5 6.5 14.1715 6.5 15C6.5 15.8285 7.13427 16.5 7.91667 16.5H13.5833V22.5Z"
                            fill="#FFFFFB"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_902_2705">
                            <rect width="30" height="30" rx="6" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className=" overflow-y-scroll h-[55vh] pr-2">
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                      <div className={`${styles.info} p-[1vw] rounded-lg`}>
                        <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                        <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                          List of people who unsubscribed to our newsletter
                        </p>
                        <CustomBtn
                          btnColor="black"
                          word="View List"
                          width="100%"
                        />
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Email Cleaning"
        />
        <div className={`tab-content `}></div>
      </div>
    </div>
  );
};

export default page;
