"use client"; // Next.js directive to enable client-side rendering

import React, { useRef, useState } from "react";
import styles from "./boards.module.css"; // Importing CSS module for styling
import Slider from "react-slick"; // Importing Slider component from react-slick
import Link from "next/link"; // Next.js Link component for client-side navigation
import QuarterCircles from '@/app/_components/QuarterCircles/QuarterCircles'; // Custom component import
import CustomBtn from "@/app/_components/Button/CustomBtn"; // Custom button component import

// Interface defining the properties for the Arrow component
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Page = () => {
  // References to HTML elements and components
  const btnRef = useRef<any>(null); // Reference for the button element
  const sliderRef = useRef<Slider>(null); // Reference for the slider component

  // State variables to track the position of the button
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  // Variable to track the current position of the slider
  let position = 0;

  // Function to navigate to the next slide in the slider
  const next = () => {
    if (sliderRef.current) {
      position++;
      sliderRef.current.slickNext(); // Move to the next slide
      console.log(sliderRef.current); // Log the current state of the slider
    }
  };

  // Function to navigate to the previous slide in the slider
  const previous = () => {
    if (sliderRef.current) {
      if (position !== 0) {
        sliderRef.current.slickPrev(); // Move to the previous slide
        position--;
      }
    }
  };

  // Data for the projects to be displayed in the slider

  const project = [
    {
      name: "ST Suite",
      state: "In progress",
      icon: (
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
      ),
      stateColor: "#F49864",
      stateText: "#2A2B2A",
    },
    {
      name: "ST Suite",
      state: "In progress",
      icon: (
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
      ),
      stateColor: "#F49864",
      stateText: "#2A2B2A",
    },
    {
      name: "Build Fire",
      state: "Paused",
      icon: (
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
      ),
      stateColor: "#E1C655",
      stateText: "#2A2B2A",
    },
    {
      name: "Build Fire",
      state: "Paused",
      icon: (
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
      ),
      stateColor: "#E1C655",
      stateText: "#2A2B2A",
    },
    {
      name: "Juice Box",
      state: "Finished",
      icon: (
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
      ),
      stateColor: "#5FA85B",
      stateText: "#2A2B2A",
    },
    {
      name: "Juice Box",
      state: "Finished",
      icon: (
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
      ),
      stateColor: "#5FA85B",
      stateText: "#2A2B2A",
    },
    {
      name: "Juice Box",
      state: "Finished",
      icon: (
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
      ),
      stateColor: "#5FA85B",
      stateText: "#2A2B2A",
    },
    {
      name: "Juice Box",
      state: "Finished",
      icon: (
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
      ),
      stateColor: "#5FA85B",
      stateText: "#2A2B2A",
    },
  ];

  const settings = {
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
    centerPadding: "60px",
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          speed: 600,
          rows: 2,
          centerPadding: "60px",
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
        },
      },
    ],
  };
  return (
    <>
      {/* Container for the boards */}
      <div className={`${styles.boards} boards w-full`}>
        {/* Section for displaying members */}
        <div className=" flex justify-between my-[1vw]">
          <h3>All Projects</h3>
          {/* Container for member icons */}
          <div
            className={`bg-[var(--dark)] ${styles.members} h-fit rounded-md flex items-center`}
          >
            {/* Text indicating the number of members */}
            <p className=" text-white text-[0.568vw] font-medium me-2">
              Members (4)
            </p>{" "}
            {/* Member icons */}
            <div className=" flex items-center">
              <QuarterCircles color={"#EAD787"} translate={0} /> <QuarterCircles color={"#6FC9EE"} translate={-40}/>  <QuarterCircles color={"#8DC189"} translate={-80}/>  <QuarterCircles color={"#F06F77"} translate={-120}/> {" "}
            </div>{" "}
            {/* Empty div */}
            <div></div>
          </div>
        </div>
        
        {/* Section for current projects */}
        <div className=" flex justify-between items-center">
          {" "}
          {/* Container for project title and navigation buttons */}
          <div className=" flex justify-between gap-2 items-center mb-[1.3vh]">
            <h4>Current Projects</h4>{" "}
            {/* Navigation buttons */}
            <div className=" flex items-center gap-2">
              <svg
              onClick={()=>{previous()}}
                width="29"
                height="28"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" cursor-pointer"
              >
                {/* SVG path for previous button */}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.3587 19.7181C14.7009 19.3768 14.7009 18.823 14.3587 18.4808L10.7529 14.875L20.0156 14.875C20.4969 14.875 20.8906 14.483 20.8906 14C20.8906 13.5161 20.4969 13.125 20.0156 13.125L10.7529 13.125L14.3587 9.51915C14.7009 9.17702 14.7009 8.62227 14.3587 8.2819C14.0184 7.93977 13.4636 7.93977 13.1215 8.2819L8.17252 13.2308C7.96252 13.4408 7.89689 13.7279 7.94502 14C7.89689 14.2721 7.96252 14.5591 8.17252 14.7691L13.1215 19.7181C13.4636 20.0602 14.0184 20.0602 14.3587 19.7181ZM0.765626 24.5L0.765625 3.5C0.765625 1.56712 2.33275 -6.85012e-08 4.26562 -1.5299e-07L25.2656 -1.07093e-06C27.1994 -1.15546e-06 28.7656 1.56712 28.7656 3.5L28.7656 24.5C28.7656 26.4329 27.1994 28 25.2656 28L4.26563 28C2.33275 28 0.765626 26.4329 0.765626 24.5Z"
                  fill="#D9D9D9"
                />
              </svg>

              <svg
              onClick={()=>next()}
                width="28"
                height="28"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" cursor-pointer"
              >
                {/* SVG path for next button */}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.6413 19.7181C14.2991 19.3768 14.2991 18.823 14.6413 18.4808L18.2471 14.875L8.98438 14.875C8.50313 14.875 8.10938 14.483 8.10938 14C8.10938 13.5161 8.50313 13.125 8.98438 13.125L18.2471 13.125L14.6413 9.51915C14.2991 9.17702 14.2991 8.62227 14.6413 8.2819C14.9816 7.93977 15.5364 7.93977 15.8785 8.2819L20.8275 13.2308C21.0375 13.4408 21.1031 13.7279 21.055 14C21.1031 14.2721 21.0375 14.5591 20.8275 14.7691L15.8785 19.7181C15.5364 20.0602 14.9816 20.0602 14.6413 19.7181ZM28.2344 24.5L28.2344 3.5C28.2344 1.56712 26.6673 -6.85012e-08 24.7344 -1.5299e-07L3.73438 -1.07093e-06C1.80063 -1.15546e-06 0.234377 1.56712 0.234377 3.5L0.234376 24.5C0.234376 26.4329 1.80063 28 3.73438 28L24.7344 28C26.6672 28 28.2344 26.4329 28.2344 24.5Z"
                  fill="#2A2B2A"
                />
              </svg>
            </div>
          </div>{" "}
          {/* Link to view all archived projects */}
          <Link
            href="/creative/boards/archivedProjects"
            className="text-[#595958] underline border-[#595958] text-[16px]"
          >
            View All Archived Projects
          </Link>
        </div>

        {/* Container for project slider */}

        <div className="slider-container py-[1vh]">
          <Slider ref={sliderRef} {...settings}>
            {project.map((e, i) => (
              <div className={`pe-[1.25vw] ${styles.sliderCard} py-3`} key={i}>
                <Link href={`/creative/boards/projectDetails`}>
                <div className={`mb-[0.6vw] ${styles.cards} p-4 rounded-3xl cursor-pointer`}>
                  <div className=" mb-[0.8vh] flex items-center">
                    <h3 className=" pe-[0.662vw]">{e.name}</h3>
                    <QuarterCircles color={"#EAD787"} translate={0} /> <QuarterCircles color={"#6FC9EE"} translate={-40}/>  <QuarterCircles color={"#8DC189"} translate={-80}/>  <QuarterCircles color={"#F06F77"} translate={-120}/>
                  </div>
                  <div
                    className={`bg-[${e.stateColor}] rounded-sm px-2 py-1 ${styles.state} flex items-center gap-2 w-fit`}
                    style={{ background: e.stateColor }}
                  >
                    {e.icon}{" "}
                    <p
                    className="text-xs font-medium"
                     
                    >
                      {e.state}
                    </p>
                  </div>
                </div>
                </Link>
                <span
                  className={`${styles.lastUpdate} text-[#ACACAC] block text-end`}
                >
                  Last Update 24 Hours Ago
                </span>
              </div>
            ))}
          </Slider>
        </div>
        <div>
          <div className="w-fit ms-auto">
            <button className=" bg-[var(--dark)] text-[var(--white)] rounded-md px-[0.757vw] py-[0.946vw] flex items-center h-[4.5vh]">
              <svg
                className="me-[0.61vw]"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.31852 10.3277C5.31348 10.834 5.71976 11.2485 6.22601 11.2535C6.73226 11.2585 7.14672 10.8523 7.15177 10.346L7.18832 6.67953L10.8548 6.71609C11.3611 6.72113 11.7755 6.31485 11.7806 5.8086C11.7856 5.30235 11.3793 4.88789 10.8731 4.88284L7.20659 4.84629L7.24315 1.17981C7.24819 0.673567 6.84191 0.259095 6.33566 0.254048C5.82941 0.249001 5.41495 0.65529 5.4099 1.16153L5.37335 4.82802L1.70687 4.79146C1.20064 4.78642 0.786155 5.1927 0.781108 5.69895C0.776061 6.2052 1.18236 6.61966 1.68859 6.6247L5.35508 6.66126L5.31852 10.3277Z"
                  fill="#FFFFFB"
                />
              </svg>
              Create New Board
            </button>
          </div>
        </div>
        <h3 className="mb-[2.8vh]">Templates</h3>
        <div className="flex gap-[0.946vw] mb-[1.6vw]">
          <div
            className={`${styles.templateCards} rounded-xl p-4 flex items-center ${styles.templateCards}`}
          >
            <h4>Design Sprint</h4>
          </div>
          <div
            className={`${styles.templateCards} rounded-xl p-4 flex items-center ${styles.templateCards}`}
          >
            <h4>Application Design Project</h4>
          </div>
          <div
            className={`${styles.templateCards} rounded-xl p-4 flex items-center ${styles.templateCards}`}
          >
            <h4>Saas Product</h4>
          </div>
          <div
            className={`${styles.templateCards} rounded-xl p-4 flex items-center ${styles.templateCards}`}
          >
            <h4>Research Project</h4>
          </div>
        </div>
      </div>
      <div>
        <div className="w-fit ms-auto">
          <CustomBtn btnColor="black" word="New Template" icon={<svg
              className="me-[0.61vw]"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.31852 10.3277C5.31348 10.834 5.71976 11.2485 6.22601 11.2535C6.73226 11.2585 7.14672 10.8523 7.15177 10.346L7.18832 6.67953L10.8548 6.71609C11.3611 6.72113 11.7755 6.31485 11.7806 5.8086C11.7856 5.30235 11.3793 4.88789 10.8731 4.88284L7.20659 4.84629L7.24315 1.17981C7.24819 0.673567 6.84191 0.259095 6.33566 0.254048C5.82941 0.249001 5.41495 0.65529 5.4099 1.16153L5.37335 4.82802L1.70687 4.79146C1.20064 4.78642 0.786155 5.1927 0.781108 5.69895C0.776061 6.2052 1.18236 6.61966 1.68859 6.6247L5.35508 6.66126L5.31852 10.3277Z"
                fill="#FFFFFB"
              />
            </svg>} />
          {/* <button ref={btnRef} onMouseMove={(e)=>{
            console.log(btnRef.current.offsetTop);
            console.log(e.pageY - btnRef.current.offsetTop);
            console.log(e.pageX - btnRef.current.offsetLeft);
            
            const x = e.pageX - btnRef.current.offsetLeft - 67
            const Y = e.pageY - btnRef.current.offsetTop
            setLeft(prevLeft => e.pageX - btnRef.current.offsetLeft - 67);
            setTop(prevTop => e.pageY - btnRef.current.offsetTop);
            
            
           
            
          }} className={`fillBtn bg-[var(--dark)] text-[var(--white)] rounded-md px-[0.757vw] py-[0.946vw] flex items-center h-[4.5vh] relative before:left-[${left}] before:top-[${top}]`} >
            <span className=" flex items-center justify-center z-[1] relative "><svg
              className="me-[0.61vw]"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.31852 10.3277C5.31348 10.834 5.71976 11.2485 6.22601 11.2535C6.73226 11.2585 7.14672 10.8523 7.15177 10.346L7.18832 6.67953L10.8548 6.71609C11.3611 6.72113 11.7755 6.31485 11.7806 5.8086C11.7856 5.30235 11.3793 4.88789 10.8731 4.88284L7.20659 4.84629L7.24315 1.17981C7.24819 0.673567 6.84191 0.259095 6.33566 0.254048C5.82941 0.249001 5.41495 0.65529 5.4099 1.16153L5.37335 4.82802L1.70687 4.79146C1.20064 4.78642 0.786155 5.1927 0.781108 5.69895C0.776061 6.2052 1.18236 6.61966 1.68859 6.6247L5.35508 6.66126L5.31852 10.3277Z"
                fill="#FFFFFB"
              />
            </svg>
            Create New Board</span>
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Page;
