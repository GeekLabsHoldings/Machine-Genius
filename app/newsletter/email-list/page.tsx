"use client";
import React, { useRef, useState } from "react";
import styles from "./emailList.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import Slider from "react-slick"; // Importing Slider component from react-slick
  const dataHeadEmailCleaning = [
    "Email Address",
    "Email Marketing",
    "Source",
    "Contact Rating",
    "Date Added",
    "Niche",
  ];


  const dataEmailCleaning = [
    {
      emailAddress: "johndoe@gmail.com",
      emailMarketing: "Cleaned",
      Source: "Twitter",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      emailMarketing: "Cleaned",
      Source: "Twitter",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      emailMarketing: "Cleaned",
      Source: "Twitter",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      emailMarketing: "Cleaned",
      Source: "Twitter",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      emailMarketing: "Cleaned",
      Source: "Twitter",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      emailMarketing: "Cleaned",
      Source: "Twitter",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      emailMarketing: "Cleaned",
      Source: "Twitter",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      emailMarketing: "Cleaned",
      Source: "Twitter",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      emailMarketing: "Cleaned",
      Source: "Twitter",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
    {
      emailAddress: "johndoe@gmail.com",
      emailMarketing: "Cleaned",
      Source: "Twitter",
      contactRating: 3.5,
      dateAdded: "20 March 2024",
      Niche: "",
    },
  ];
const page = () => {

  const [isShowed,setIsShowed] = useState(true)

  const [sorting, setSorting] = useState("Ascend");

  function getRandomBackgroundColor() {
    const colors = [
      "#F36F24B2",
      "#9B5FBFB2",
      "#E1C655B2",
      "#31B2E9B2",
      "#E9313EB2",
    ];

    // Select a random index from the array of colors
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the color at the random index
    return colors[randomIndex];
  }

  // State for handling modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // Define the maximum number of stars to display

  const STAR_COUNT = 5;

  // Function to generate star rating SVG elements based on a given value

  const rating = (value: number) => {
    // Create an array of length STAR_COUNT, each element is a default (empty) star SVG

    const stars = Array.from({ length: STAR_COUNT }, () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.0225353 7.23255C0.0764637 7.07602 0.213829 6.96299 0.377325 6.94122L6.67488 6.10642L9.61063 0.221093C9.75672 -0.0736975 10.2428 -0.0736975 10.3889 0.221093L13.3246 6.10646L19.6222 6.94126C19.7857 6.96299 19.9239 7.07606 19.9769 7.23259C20.03 7.38911 19.99 7.56215 19.8726 7.67954L15.2542 12.2979L16.5125 18.5911C16.5447 18.7546 16.4821 18.9207 16.3499 19.0224C16.2177 19.1233 16.0386 19.1398 15.8916 19.0659L9.99929 16.1197L4.10696 19.0659C4.0452 19.0963 3.97913 19.112 3.91305 19.112C3.81999 19.112 3.72608 19.0815 3.64871 19.0224C3.51742 18.9216 3.45391 18.7546 3.48611 18.5911L4.74439 12.2979L0.12603 7.67958C0.0103874 7.563 -0.0296402 7.38997 0.0225353 7.23255ZM3.84873 8.94129L6.63314 11.7266L5.91226 15.331C5.88096 15.391 5.86355 15.4589 5.86355 15.5311C5.86355 15.7711 6.05835 15.9659 6.29836 15.9659H6.31576C6.38184 15.9659 6.44795 15.9502 6.51056 15.9198L10.0011 14.1754L13.4916 15.9198C13.6403 15.9937 13.8186 15.978 13.9499 15.8763C14.0812 15.7754 14.1447 15.6084 14.1125 15.445L13.369 11.7257L16.1534 8.94043C16.2708 8.82304 16.3108 8.65 16.2578 8.49347C16.2038 8.33695 16.0665 8.22392 15.903 8.20215L12.1829 7.70909L10.3906 4.11769C10.2446 3.8229 9.75847 3.8229 9.61238 4.11769L7.82016 7.70909L4.10007 8.20215C3.93657 8.22388 3.79831 8.33695 3.74528 8.49347C3.69135 8.65086 3.73134 8.82389 3.84873 8.94129Z"
          fill="#E1C655"
        />
      </svg>
    ));
    let i;
    for (i = 0; i < value; i++) {
      // this will loop Math.floor(value) times
      stars[i] = (
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.85846 0.00390625L10.738 5.3874L15.8711 6.13858L12.4908 9.89451V15.278L7.85846 13.2748L2.85056 14.652L4.22773 9.89451L0.722199 6.13858L5.10411 5.01181L7.85846 0.00390625Z"
            fill="#E1C655"
          />
        </svg>
      );
    }

    if (value % 1 != 0)
      // if value is a decimal, add a half star
      stars[i - 1] = (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.0225353 7.23255C0.0764637 7.07602 0.213829 6.96299 0.377325 6.94122L6.67488 6.10642L9.61063 0.221093C9.75672 -0.0736975 10.2428 -0.0736975 10.3889 0.221093L13.3246 6.10646L19.6222 6.94126C19.7857 6.96299 19.9239 7.07606 19.9769 7.23259C20.03 7.38911 19.99 7.56215 19.8726 7.67954L15.2542 12.2979L16.5125 18.5911C16.5447 18.7546 16.4821 18.9207 16.3499 19.0224C16.2177 19.1233 16.0386 19.1398 15.8916 19.0659L9.99929 16.1197L4.10696 19.0659C4.0452 19.0963 3.97913 19.112 3.91305 19.112C3.81999 19.112 3.72608 19.0815 3.64871 19.0224C3.51742 18.9216 3.45391 18.7546 3.48611 18.5911L4.74439 12.2979L0.12603 7.67958C0.0103874 7.563 -0.0296402 7.38997 0.0225353 7.23255ZM9.56538 13.6892C9.56538 13.8536 9.65844 14.0049 9.80539 14.0779L13.4898 15.9197C13.5516 15.9502 13.6176 15.9658 13.6846 15.9658C13.7777 15.9658 13.8716 15.9354 13.949 15.8763C14.0803 15.7754 14.1438 15.6084 14.1116 15.445L13.3681 11.7257L16.1525 8.94043C16.2699 8.82304 16.3099 8.65 16.2569 8.49347C16.2029 8.33695 16.0656 8.22392 15.9021 8.20215L12.182 7.70909L10.3898 4.11769C10.3002 3.93683 10.0976 3.84291 9.90106 3.88811C9.70365 3.93422 9.56538 4.10986 9.56538 4.31159V13.6892Z"
            fill="#E1C655"
          />
        </svg>
      );

    return <div className="rating">{stars}</div>;
  };



  // Variable to track the current position of the slider

  function SampleNextArrow(props: any) {
    const {onClick , className } = props;
    return (
      <div
        onClick={onClick}
        className={`custom_arrows ${className}`}
      >
        <svg
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.4941 23.9434C17.0787 23.529 17.0787 22.8565 17.4941 22.441L21.8726 18.0625L10.625 18.0625C10.0406 18.0625 9.5625 17.5865 9.5625 17C9.5625 16.4124 10.0406 15.9375 10.625 15.9375L21.8726 15.9375L17.4941 11.559C17.0787 11.1435 17.0787 10.4699 17.4941 10.0566C17.9074 9.64115 18.581 9.64115 18.9965 10.0566L25.0059 16.066C25.2609 16.321 25.3406 16.6696 25.2822 17C25.3406 17.3304 25.2609 17.679 25.0059 17.934L18.9965 23.9434C18.581 24.3588 17.9074 24.3588 17.4941 23.9434ZM34 29.75L34 4.25C34 1.90294 32.0971 -8.318e-08 29.75 -1.85773e-07L4.25 -1.30041e-06C1.90187 -1.40305e-06 -8.318e-08 1.90294 -1.85773e-07 4.25L-1.30041e-06 29.75C-1.40301e-06 32.0971 1.90187 34 4.25 34L29.75 34C32.0971 34 34 32.0971 34 29.75Z"
          />
        </svg>
      </div>
    );
  }
  function SamplePrevArrow(props: any) {
    const {onClick , className} = props;
    return (
      <div
        onClick={onClick}
        className={`custom_arrows ${className}`}
      >
        <svg
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.5059 23.9434C16.9213 23.529 16.9213 22.8565 16.5059 22.441L12.1274 18.0625L23.375 18.0625C23.9594 18.0625 24.4375 17.5865 24.4375 17C24.4375 16.4124 23.9594 15.9375 23.375 15.9375L12.1274 15.9375L16.5059 11.559C16.9213 11.1435 16.9213 10.4699 16.5059 10.0566C16.0926 9.64115 15.419 9.64115 15.0035 10.0566L8.99409 16.066C8.73909 16.321 8.65939 16.6696 8.71783 17C8.65939 17.3304 8.73909 17.679 8.99409 17.934L15.0035 23.9434C15.419 24.3588 16.0926 24.3588 16.5059 23.9434ZM1.30041e-06 29.75L1.85773e-07 4.25C8.318e-08 1.90294 1.90294 -8.318e-08 4.25 -1.85773e-07L29.75 -1.30041e-06C32.0981 -1.40305e-06 34 1.90294 34 4.25L34 29.75C34 32.0971 32.0981 34 29.75 34L4.25 34C1.90294 34 1.40301e-06 32.0971 1.30041e-06 29.75Z"
          />
        </svg>
      </div>
    );
  }

  const settings:any = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding:30,
    nextArrow: <SampleNextArrow  />,
    prevArrow: <SamplePrevArrow  />,
  };


  return (
    <>
      <div className={`${styles.emailList} pt-[1vw] overflow-hidden relative w-full`}>
        <div className={"tabs " + styles.tabs}>
          <input
            type="radio"
            name="tabs"
            className="tab"
            aria-label="Audience"
            defaultChecked
            onClick={()=>{
              if (!isShowed) {
                setIsShowed(true)
              }
            }}
          />
          <div className={`tab-content pt-[1vw] ${styles.audience}`}>
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
              </div>
              <div className="sliderAudience w-[87vw]">
                <div className="slider-container ">
                  <Slider {...settings}>
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
                            <rect
                              width="30"
                              height="30"
                              rx="6"
                              fill="#2A2B2A"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.5833 22.5C13.5833 23.3284 14.2176 24 15 24C15.7824 24 16.4167 23.3284 16.4167 22.5V16.5H22.0833C22.8658 16.5 23.5 15.8285 23.5 15C23.5 14.1715 22.8658 13.5 22.0833 13.5H16.4167V7.5C16.4167 6.67156 15.7824 6 15 6C14.2176 6 13.5833 6.67156 13.5833 7.5V13.5H7.91667C7.13427 13.5 6.5 14.1715 6.5 15C6.5 15.8285 7.13427 16.5 7.91667 16.5H13.5833V22.5Z"
                              fill="#FFFFFB"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_902_2705">
                              <rect
                                width="30"
                                height="30"
                                rx="6"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className=" overflow-y-scroll h-[57vh] pr-2">
                        <div className={`${styles.info} p-[1vw] rounded-lg`}>
                          <h4 className="mb-[0.8vw]">Last Opened 3M</h4>
                          <p className="mb-[0.8vw] pb-[0.8vw] border-b-[1px] border-b-[#2A2B2A]">
                            List of people who unsubscribed to our newsletter
                          </p>
                          <CustomBtn
                            btnColor="black"
                            word="View List"
                            width="100%"
                            href="/newsletter/email-list/listDetails"
                            
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
                            <rect
                              width="30"
                              height="30"
                              rx="6"
                              fill="#2A2B2A"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.5833 22.5C13.5833 23.3284 14.2176 24 15 24C15.7824 24 16.4167 23.3284 16.4167 22.5V16.5H22.0833C22.8658 16.5 23.5 15.8285 23.5 15C23.5 14.1715 22.8658 13.5 22.0833 13.5H16.4167V7.5C16.4167 6.67156 15.7824 6 15 6C14.2176 6 13.5833 6.67156 13.5833 7.5V13.5H7.91667C7.13427 13.5 6.5 14.1715 6.5 15C6.5 15.8285 7.13427 16.5 7.91667 16.5H13.5833V22.5Z"
                              fill="#FFFFFB"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_902_2705">
                              <rect
                                width="30"
                                height="30"
                                rx="6"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className=" overflow-y-scroll h-[57vh] pr-2">
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
                            <rect
                              width="30"
                              height="30"
                              rx="6"
                              fill="#2A2B2A"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.5833 22.5C13.5833 23.3284 14.2176 24 15 24C15.7824 24 16.4167 23.3284 16.4167 22.5V16.5H22.0833C22.8658 16.5 23.5 15.8285 23.5 15C23.5 14.1715 22.8658 13.5 22.0833 13.5H16.4167V7.5C16.4167 6.67156 15.7824 6 15 6C14.2176 6 13.5833 6.67156 13.5833 7.5V13.5H7.91667C7.13427 13.5 6.5 14.1715 6.5 15C6.5 15.8285 7.13427 16.5 7.91667 16.5H13.5833V22.5Z"
                              fill="#FFFFFB"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_902_2705">
                              <rect
                                width="30"
                                height="30"
                                rx="6"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className=" overflow-y-scroll h-[57vh] pr-2">
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
                            <rect
                              width="30"
                              height="30"
                              rx="6"
                              fill="#2A2B2A"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.5833 22.5C13.5833 23.3284 14.2176 24 15 24C15.7824 24 16.4167 23.3284 16.4167 22.5V16.5H22.0833C22.8658 16.5 23.5 15.8285 23.5 15C23.5 14.1715 22.8658 13.5 22.0833 13.5H16.4167V7.5C16.4167 6.67156 15.7824 6 15 6C14.2176 6 13.5833 6.67156 13.5833 7.5V13.5H7.91667C7.13427 13.5 6.5 14.1715 6.5 15C6.5 15.8285 7.13427 16.5 7.91667 16.5H13.5833V22.5Z"
                              fill="#FFFFFB"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_902_2705">
                              <rect
                                width="30"
                                height="30"
                                rx="6"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className=" overflow-y-scroll h-[57vh] pr-2">
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
            onClick={()=>setIsShowed(false)}
          />
          <div
            className={`${styles.cleaningTable} tab-content px-2 pt-[1.5vw] w-full overflow-hidden`}
          >
            <div className=" flex justify-between">
            <div className=" flex gap-2">
              <div className="mb-[3vh]">
                {/* Sources */}
                <h5 className=" mb-[1vh] font-semibold">Sources</h5>
                <div className="w-[11.927vw]">
                  {/* CustomSelectInput for Sources */}
                  <CustomSelectInput
                    options={["All", ...dataEmailCleaning.map((e, i) => e.Source)]}
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
            <div className=" w-fit flex items-end pb-[1vw] justify-end">
              <CustomBtn btnColor="black" word="Clean Emails"/>
            </div>
            </div>
            {/* Outer container for the table with specific styles applied */}
            <div
              className={`${styles.table} w-full rounded-xl overflow-y-hidden overflow-x-auto px-2 mb-1`}
            >
              {/* Header section of the table */}
              <div className={`${styles.tableHead}`}>
                <ul className="flex justify-between items-center border-b-2 border-b-[var(--dark)]">
                  {/* Mapping over the dataHeadEmailCleaning array to create table header columns */}
                  {dataHeadEmailCleaning.map((e, i) => (
                    // Each header item is evenly distributed
                    <li className={`w-[16.6666%]`} key={i}>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Body section of the table with scrollable content */}
              <div
                className={`${styles.tableBody} overflow-y-scroll h-[53vh] `}
              >
                {/* Mapping over the dataEmailCleaning array to create table rows */}
                {dataEmailCleaning.map((e, i) => (
                  // Each row with styling applied and a border at the bottom
                  <ul
                    className="flex justify-between items-center border-b-2 border-b-[#2A2B2A4A]"
                    key={i}
                  >
                    {/* Property address column */}
                    <li className={`w-[16.6666%]`}>
                      {e.emailAddress}
                    </li>
                    {/* Property type column with dynamic background color */}
                    <li className={`w-[16.6666%]`}>
                      <span className="p-2 rounded-sm bg-[#ACACAC] text-white">{e.emailMarketing}</span>
                    </li>
                    {/* Space column */}
                    <li
                      className={`w-[16.6666%]`}
                     
                    >
                     <span className="p-2 rounded-sm bg-[#ACACAC] text-white"  style={{
                        backgroundColor: `${getRandomBackgroundColor()}`,
                      }}>{e.Source}</span>
                    </li>
                    {/* Ratings column with custom star rating component */}

                    <li className={`w-[16.6666%]`}>
                      {rating(e.contactRating)}
                    </li>
                    {/* Market rate column */}
                    <li className={`w-[16.6666%]`}>
                      {e.dateAdded}
                    </li>
                    <li className={`w-[16.6666%]`}>{e.Niche}</li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`${isShowed ? "block" : "hidden"} absolute top-[1.3vw] right-1 w-fit `}>
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
        className={`absolute left-0 right-0 top-0 bottom-0 justify-center items-center bg-[#FFFFFB] bg-opacity-[58%] z-20 flex ${styles.overlay} ${
          isOpen ? "flex" : "hidden" // Conditional rendering based on isOpen state
        }`}
      >
        <div className={`${styles.overlayBox} px-[1.8vw] py-[2vw] rounded-xl bg-[#FFFFFB]`}>
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
