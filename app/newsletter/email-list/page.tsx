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
          <div
            className={`${styles.cleaningTable} tab-content px-2 pt-[1.5vw] w-full overflow-hidden`}
          >
            <div className=" flex gap-2">
              <div className="mb-[3vh]">
                {/* Staff Member */}
                <h5 className=" mb-[1vh] font-semibold">Sources</h5>
                <div className="w-[11.927vw]">
                  {/* CustomSelectInput for staff members */}
                  <CustomSelectInput
                    options={["All", ...dataRealEstate.map((e, i) => e.Source)]}
                  />
                </div>
              </div>
              <div className="mb-[3vh]">
                <h5 className=" mb-[1vh] font-semibold">Ratings</h5>
                <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                  <span>{sorting}</span>
                  <svg
                    onClick={() => {
                      sorting == "Ascend"
                        ? setSorting("Descend")
                        : setSorting("Ascend");
                    }}
                    className="cursor-pointer"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                      fill="#2A2B2A"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* Outer container for the table with specific styles applied */}
            <div
              className={`${styles.table} w-[85vw] rounded-xl overflow-y-hidden overflow-x-scroll px-2 max-w-full`}
            >
              {/* Header section of the table */}
              <div className={`${styles.tableHead} w-fit`}>
                <ul className="flex justify-between items-center border-b-2 border-b-[var(--dark)] w-fit">
                  {/* Mapping over the dataHeadRealEstate array to create table header columns */}
                  {dataHeadRealEstate.map((e, i) => (
                    // Each header item has a minimum width and is evenly distributed
                    <li className={`w-[12.5%] min-w-[200px]`} key={i}>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Body section of the table with scrollable content */}
              <div
                className={`${styles.tableBody} w-fit overflow-y-scroll rounded-xl h-[53vh]`}
              >
                {/* Mapping over the dataRealEstate array to create table rows */}
                {dataRealEstate.map((e, i) => (
                  // Each row with styling applied and a border at the bottom
                  <ul
                    className="flex justify-between items-center border-b-2 border-b-[#2A2B2A4A] w-fit"
                    key={i}
                  >
                    {/* Property address column */}
                    <li className={`w-[16.6666%] min-w-[200px]`}>
                      {e.emailAddress}
                    </li>
                    {/* Property type column with dynamic background color */}
                    <li className={`w-[16.6666%] min-w-[200px]`}>
                      <span className="p-2 rounded-md">{e.emailMarketing}</span>
                    </li>
                    {/* Space column */}
                    <li
                      className={`w-[16.6666%] min-w-[200px]`}
                      style={{
                        backgroundColor: `${getRandomBackgroundColor()}`,
                      }}
                    >
                      {e.Source}
                    </li>
                    {/* Ratings column with custom star rating component */}

                    <li className={`w-[16.6666%] min-w-[200px]`}>
                      {rating(e.contactRating)}
                    </li>
                    {/* Market rate column */}
                    <li className={`w-[16.6666%] min-w-[200px]`}>
                      {e.dateAdded}
                    </li>
                    <li className={`w-[16.6666%] min-w-[200px]`}>{e.Niche}</li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" absolute top-[1.3vw] right-1 w-fit">
          <CustomBtn
            onClick={() => {
              setIsOpen(true);
            }}
            word="New Brand"
            btnColor="black"
            icon={
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z"
                  fill="#FFFFFB"
                />
              </svg>
            }
          />
        </div>
      </div>
      <div
        className={`absolute left-0 right-0 top-0 bottom-0 justify-center items-center bg-[#FFFFFB] bg-opacity-[58%] z-20 flex ${
          isOpen ? "flex" : "hidden" // Conditional rendering based on isOpen state
        }`}
      >
        <div className={`${styles.overlayBox} px-[1.8vw] py-[2vw] rounded-xl`}>
          <h5 className=" px-[2.3] pb-[1.2vw] border-b-[1px] border-b-[#2A2B2A] mb-[1.1vw] text-center">
            Create New Brand
          </h5>
          <label className="text-[#999997] mb-[0.2vw]">Brand Name*</label>
          <input
            type="text"
            className=" border-b-[1px] border-b-[var(--dark)] py-[0.5vw] placeholder:text-[var(--dark)] focus-visible:outline-none"
            placeholder="Street Suite"
          />
          <div className=" flex gap-2 items-center justify-center">
            <CustomBtn
              onClick={() => {
                setIsOpen(false);
              }}
              word="Cancel"
              btnColor="white"
            />
            <CustomBtn word="Create" btnColor="black" />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
