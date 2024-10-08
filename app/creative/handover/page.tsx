"use client";
import React, { useRef, useState, useEffect } from "react";
import Slider, { Settings } from "react-slick"; // Importing Slider component and Settings type from react-slick
import styles from "./handover.module.css";
import Link from "next/link";
import QuarterCircles from "@/app/_components/Creative/QuarterCircles/QuarterCircles";

// Define an interface for arrow props
interface ArrowProps {
  onClick?: () => void;
  isDisabled: boolean;
}

// Define NextArrow component
const NextArrow: React.FC<ArrowProps> = ({ onClick, isDisabled }) => {
  return (
    <svg
      onClick={isDisabled ? undefined : onClick}
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-[--30px] h-[--30px] cursor-pointer`}
      style={{ pointerEvents: isDisabled ? "none" : "auto" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6413 19.7181C14.2991 19.3768 14.2991 18.823 14.6413 18.4808L18.2471 14.875L8.98438 14.875C8.50313 14.875 8.10938 14.483 8.10938 14C8.10938 13.5161 8.50313 13.125 8.98438 13.125L18.2471 13.125L14.6413 9.51915C14.2991 9.17702 14.2991 8.62227 14.6413 8.2819C14.9816 7.93977 15.5364 7.93977 15.8785 8.2819L20.8275 13.2308C21.0375 13.4408 21.1031 13.7279 21.055 14C21.1031 14.2721 21.0375 14.5591 20.8275 14.7691L15.8785 19.7181C15.5364 20.0602 14.9816 20.0602 14.6413 19.7181ZM28.2344 24.5L28.2344 3.5C28.2344 1.56712 26.6673 -6.85012e-08 24.7344 -1.5299e-07L3.73438 -1.07093e-06C1.80063 -1.15546e-06 0.234377 1.56712 0.234377 3.5L0.234376 24.5C0.234376 26.4329 1.80063 28 3.73438 28L24.7344 28C26.6672 28 28.2344 26.4329 28.2344 24.5Z"
        fill={isDisabled ? "#D9D9D9" : "#2A2B2A"}
      />
    </svg>
  );
};

// Define PrevArrow component
const PrevArrow: React.FC<ArrowProps> = ({ onClick, isDisabled }) => {
  return (
    <svg
      onClick={isDisabled ? undefined : onClick}
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-[--30px] h-[--30px] cursor-pointer`}
      style={{ pointerEvents: isDisabled ? "none" : "auto" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3587 19.7181C14.7009 19.3768 14.7009 18.823 14.3587 18.4808L10.7529 14.875L20.0156 14.875C20.4969 14.875 20.8906 14.483 20.8906 14C20.8906 13.5161 20.4969 13.125 20.0156 13.125L10.7529 13.125L14.3587 9.51915C14.7009 9.17702 14.7009 8.62227 14.3587 8.2819C14.0184 7.93977 13.4636 7.93977 13.1215 8.2819L8.17252 13.2308C7.96252 13.4408 7.89689 13.7279 7.94502 14C7.89689 14.2721 7.96252 14.5591 8.17252 14.7691L13.1215 19.7181C13.4636 20.0602 14.0184 20.0602 14.3587 19.7181ZM0.765626 24.5L0.765625 3.5C0.765625 1.56712 2.33275 -6.85012e-08 4.26562 -1.5299e-07L25.2656 -1.07093e-06C27.1994 -1.15546e-06 28.7656 1.56712 28.7656 3.5L28.7656 24.5C28.7656 26.4329 27.1994 28 25.2656 28L4.26563 28C2.33275 28 0.765626 26.4329 0.765626 24.5Z"
        fill={isDisabled ? "#D9D9D9" : "#2A2B2A"}
      />
    </svg>
  );
};

const inProgressIcon = (
  <svg
    width="10"
    height="11"
    viewBox="0 0 10 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 0.5C2.23 0.5 0 2.73 0 5.5C0 8.27 2.23 10.5 5 10.5C7.77 10.5 10 8.27 10 5.5C10 2.73 7.77 0.5 5 0.5ZM4.98923 1.20421C5.08479 1.20277 5.17966 1.22052 5.26823 1.2564C5.3568 1.29229 5.43728 1.34558 5.50488 1.41312C5.57249 1.48066 5.62586 1.56108 5.66183 1.64962C5.6978 1.73816 5.71563 1.83302 5.71429 1.92857V4.78571H7.14286C7.23751 4.78438 7.33148 4.80186 7.41932 4.83716C7.50715 4.87245 7.58709 4.92485 7.6545 4.99131C7.72191 5.05777 7.77543 5.13697 7.81197 5.2243C7.8485 5.31162 7.86732 5.40534 7.86732 5.5C7.86732 5.59466 7.8485 5.68838 7.81197 5.7757C7.77543 5.86303 7.72191 5.94223 7.6545 6.00869C7.58709 6.07515 7.50715 6.12755 7.41932 6.16284C7.33148 6.19814 7.23751 6.21562 7.14286 6.21429H5C4.81057 6.21427 4.6289 6.13901 4.49494 6.00506C4.36099 5.87111 4.28573 5.68943 4.28571 5.5V1.92857C4.28304 1.73925 4.35564 1.55661 4.48756 1.42079C4.61947 1.28497 4.79991 1.20707 4.98923 1.20421Z"
      fill="#2A2B2A"
    />
  </svg>
);

const pausedIcon = (
  <svg
    width="10"
    height="11"
    viewBox="0 0 10 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 5.5C10 6.82608 9.47322 8.09785 8.53553 9.03553C7.59785 9.97322 6.32608 10.5 5 10.5C3.67392 10.5 2.40215 9.97322 1.46447 9.03553C0.526784 8.09785 0 6.82608 0 5.5C0 4.17392 0.526784 2.90215 1.46447 1.96447C2.40215 1.02678 3.67392 0.5 5 0.5C6.32608 0.5 7.59785 1.02678 8.53553 1.96447C9.47322 2.90215 10 4.17392 10 5.5ZM2.5 3.41667C2.5 3.30616 2.5439 3.20018 2.62204 3.12204C2.70018 3.0439 2.80616 3 2.91667 3H3.75C3.86051 3 3.96649 3.0439 4.04463 3.12204C4.12277 3.20018 4.16667 3.30616 4.16667 3.41667V7.58333C4.16667 7.69384 4.12277 7.79982 4.04463 7.87796C3.96649 7.9561 3.86051 8 3.75 8H2.91667C2.80616 8 2.70018 7.9561 2.62204 7.87796C2.5439 7.79982 2.5 7.69384 2.5 7.58333V3.41667ZM6.25 3C6.13949 3 6.03351 3.0439 5.95537 3.12204C5.87723 3.20018 5.83333 3.30616 5.83333 3.41667V7.58333C5.83333 7.69384 5.87723 7.79982 5.95537 7.87796C6.03351 7.9561 6.13949 8 6.25 8H7.08333C7.19384 8 7.29982 7.9561 7.37796 7.87796C7.4561 7.79982 7.5 7.69384 7.5 7.58333V3.41667C7.5 3.30616 7.4561 3.20018 7.37796 3.12204C7.29982 3.0439 7.19384 3 7.08333 3H6.25Z"
      fill="#2A2B2A"
    />
  </svg>
);

const finishedIcon = (
  <svg
    width="10"
    height="11"
    viewBox="0 0 10 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 0.5C3.67392 0.5 2.40215 1.02678 1.46447 1.96447C0.526784 2.90215 0 4.17392 0 5.5C0 6.82608 0.526784 8.09785 1.46447 9.03553C2.40215 9.97322 3.67392 10.5 5 10.5C6.32608 10.5 7.59785 9.97322 8.53553 9.03553C9.47322 8.09785 10 6.82608 10 5.5C10 4.17392 9.47322 2.90215 8.53553 1.96447C7.59785 1.02678 6.32608 0.5 5 0.5ZM7.11377 2.88021C7.36798 2.56239 7.84144 2.53459 8.1311 2.82048C8.38128 3.0674 8.40426 3.4635 8.18433 3.7377L4.62621 8.17381C4.24596 8.6479 3.53422 8.67599 3.11779 8.23335L1.1845 6.17838C0.923006 5.90043 0.93108 5.4646 1.20269 5.19652C1.47641 4.92636 1.91644 4.92636 2.19017 5.19652L3.11622 6.11054C3.53858 6.5274 4.22893 6.48687 4.59961 6.02345L7.11377 2.88021Z"
      fill="#2A2B2A"
    />
  </svg>
);

const stateColors = {
  "In progress": "#F49864",
  Paused: "#E1C655",
  Finished: "#5FA85B",
};

const stateIcons = {
  "In progress": inProgressIcon,
  Paused: pausedIcon,
  Finished: finishedIcon,
};

// Data for the projects to be displayed in the slider
const project = [
  { name: "ST Suite", state: "In progress" },
  { name: "ST Suite", state: "In progress" },
  { name: "Juice Box", state: "Finished" },
  { name: "Juice Box", state: "Finished" },
  { name: "Build Fire", state: "Paused" },
  { name: "Build Fire", state: "Paused" },
  { name: "Juice Box", state: "Finished" },
  { name: "Juice Box", state: "Finished" },
  { name: "Juice Box", state: "Finished" },
  { name: "Juice Box", state: "Finished" },
];

const Page = () => {
  // References to HTML elements and components
  const sliderRef = useRef<Slider>(null); // Reference for the slider component

  // State variables to manage slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  // Fetch the total number of slides after the first render
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider && (slider as any).innerSlider) {
      setSlideCount((slider as any).innerSlider.state.slideCount);
    }
  }, []);

  // Function to get the current slidesToShow value considering responsive settings
  const getSlidesToShow = (): number => {
    const slider = sliderRef.current;
    if (slider && (slider as any).innerSlider) {
      return (slider as any).innerSlider.props.slidesToShow || 1;
    }
    return 1;
  };

  // Slider settings with arrows disabled
  const settings: Settings = {
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
    centerPadding: "60px",
    swipeToSlide: false,
    arrows: false, // Disable default arrows
    afterChange: (index) => setCurrentSlide(index), // Update current slide index
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          speed: 600,
          rows: 2,
          centerPadding: "60px",
          arrows: false, // Disable default arrows for responsive settings
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 600,
          rows: 2,
          centerPadding: "60px",
          arrows: false, // Disable default arrows for responsive settings
        },
      },
    ],
  };

  // Determine if previous and next arrows should be disabled
  const slidesToShow = getSlidesToShow();
  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < slideCount - slidesToShow;

  return (
    <div className={`${styles.handover} boards w-full`}>
      <div className=" flex justify-between my-[1vw]">
        {/* Title: All Projects */}
        <h3 className="!text-[--32px]">All Projects</h3>
        <div
          className={`bg-[--dark]  h-fit rounded-md flex items-center py-[0.3vw] px-[0.328vw]`}
        >
          <p className="text-white text-[--12px] font-medium mr-2 whitespace-nowrap">
            Members (4)
          </p>

          <div className="flex-shrink-0">
            <QuarterCircles
              colors={["#EAD787", "#6FC9EE", "#8DC189", "#F06F77"]}
            />
          </div>
        </div>
      </div>
      <div className=" flex justify-between items-center">
        {/* Flex container for title and navigation */}
        {/* Flex container for title and navigation */}
        <div className=" flex justify-between gap-[--30px] items-center mb-[1.3vh]">
          {/* Title: Current Projects */}
          <h4>Current Projects</h4> {/* Navigation arrows */}
          <div className="flex items-center gap-[--15px]">
            {/* Arrows are shown here */}
            <PrevArrow
              onClick={() => sliderRef.current?.slickPrev()}
              isDisabled={!canGoPrev}
            />
            <NextArrow
              onClick={() => sliderRef.current?.slickNext()}
              isDisabled={!canGoNext}
            />
          </div>
        </div>
        {/* View All Archived Projects link */}
        <Link
          href=""
          className="text-[#595958] underline border-[#595958] text-[16px]"
        >
          View All Archived Projects
        </Link>
      </div>

      <div className="slider-container py-[1vh]">
        <Slider ref={sliderRef} {...settings}>
          {project.map((e, i) => (
            <div className={`py-3 pr-[1.25vw] ${styles.sliderCard}`} key={i}>
              <Link href={`/creative/handover/handoverDetails`}>
                <div
                  className={`mb-[0.6vw] ${styles.cards} py-[--25px] px-[--19px] rounded-[--20px]`}
                >
                  <div className="mb-[--sy-26px] flex items-center">
                    <h3 className="pr-[0.662vw] !text-[--20px]">{e.name}</h3>

                    <div className="flex-shrink-0">
                      <QuarterCircles
                        colors={["#EAD787", "#6FC9EE", "#8DC189", "#F06F77"]}
                      />
                    </div>
                  </div>

                  <div
                    className={`rounded-[--3px] p-[--4px] px-[--10px] ${styles.state} flex items-center gap-[--8px] w-fit`}
                    style={{
                      backgroundColor:
                        stateColors[e.state as keyof typeof stateColors],
                    }}
                  >
                    {stateIcons[e.state as keyof typeof stateIcons]}

                    <p className="!text-[--16px] font-medium">{e.state}</p>
                  </div>
                </div>
              </Link>

              <span
                className={`${styles.lastUpdate} text-[#ACACAC] block text-end`}
              >
                Last Updated: 24 hours ago
              </span>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Page;
