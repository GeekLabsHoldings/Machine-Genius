"use client";
import Footer from "@/app/_components/Footer/Footer";
import Navbar from "@/app/_components/Navbar/Navbar";
import React, { useState } from "react";
import CareersApplication from "./careersApplication";
import CareersVacancies from "./CareersVacancies";
const page = () => {
  const [apply, setApply] = useState(false);
  const [selected, setSelected] = useState("ux/ui designer");

  return (
    <div className=" w-full pt-[--sy-251px]">
      <div className=" mt-[--sy-35px] mx-[--175px] text-[#FFFFFB]">
        <h2 className=" font-extrabold text-[--175px] mb-[--sy-44px]">
          Careers
        </h2>
        <p className=" text-[--32px] leading-[--sy-40px]">
          Think you’re a good fit?
        </p>
        <p className=" text-[--32px] leading-[--sy-40px] mb-[--sy-50px]">
          Hit us up and show us your potential!
        </p>
        <div className={`${apply ? "block" : "hidden"}`}>
          <CareersApplication />
        </div>
        <div className={`${apply ? "hidden":"block"} mt-[--sy-20px] text-[#FFFFFB]`}>
          <div className=" flex justify-between mb-[--sy-100px]">
            <div className=" flex flex-col gap-y-[--sy-30px]">
              <h2 className=" text-[--64px] font-extrabold uppercase">
                UX/UI <br /> Designer
              </h2>
              <span>Entry Level</span>
            </div>
            <button onClick={()=>setApply(true)} className=" bg-[#FFFFFB] text-[#2A2B2A] uppercase rounded-[--4px] self-start px-[--28px] py-[--sy-19px] font-semibold">
              apply now
            </button>
          </div>
          <div className=" flex justify-between">
            <div className=" max-w-[clamp(30vw,_calc(42.71vw_+_0.1rem),_1200px)]">
              <div className=" flex flex-col gap-[--sy-50px] mb-[--sy-100px]">
                <h3 className=" text-[--24px] font-bold">Job Description</h3>
                <p>
                  As a UX/UI Designer at [Your Company Name], you will be
                  responsible for designing intuitive and engaging user
                  interfaces for our web and mobile applications. <br /> <br />
                  You will collaborate closely with product managers,
                  developers, and other stakeholders to create user-centered
                  designs that meet both user needs and business goals.
                </p>
              </div>
              <div className=" flex flex-col gap-[--sy-50px] mb-[--sy-100px]">
                <h3 className=" text-[--24px] font-bold">Responsibilities</h3>
                <ul className=" list-disc list-inside gap-y-[--sy-20px] flex flex-col">
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Augue nunc magna
                    diam turpis sit cursus nulla sagittis id.{" "}
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Augue nunc magna
                    diam turpis sit cursus nulla sagittis id.{" "}
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Augue nunc magna
                    diam turpis sit cursus nulla sagittis id.{" "}
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Augue nunc magna
                    diam turpis sit cursus nulla sagittis id.{" "}
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Augue nunc magna
                    diam turpis sit cursus nulla sagittis id.{" "}
                  </li>
                </ul>
              </div>
              <div className=" flex flex-col gap-[--sy-50px] mb-[--sy-100px]">
                <h3 className=" text-[--24px] font-bold">Benefits</h3>
                <ul className=" list-disc list-inside gap-y-[--sy-20px] flex flex-col">
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Augue nunc magna
                    diam turpis sit cursus nulla sagittis id.{" "}
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Augue nunc magna
                    diam turpis sit cursus nulla sagittis id.{" "}
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Augue nunc magna
                    diam turpis sit cursus nulla sagittis id.{" "}
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Augue nunc magna
                    diam turpis sit cursus nulla sagittis id.{" "}
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur. Augue nunc magna
                    diam turpis sit cursus nulla sagittis id.{" "}
                  </li>
                </ul>
              </div>
            </div>
            <div className=" flex flex-col gap-y-[--sy-40px]">
              <h3 className=" text-[--24px] font-bold">Open Vacancies</h3>
              <ul className="flex flex-col gap-y-[--sy-30px] list-none">
                <li
                  className={`cursor-pointer ${
                    selected == "ux/ui designer"
                      ? "underline underline-offset-2"
                      : null
                  }`}
                >
                  UX/UI Designer
                </li>
                <li className=" cursor-pointer">Senior Developer</li>
                <li className=" cursor-pointer">Graphic Design</li>
                <li className=" cursor-pointer">Content Writer</li>
                <li className=" cursor-pointer">Front End</li>
                <li className=" cursor-pointer">Product Manager</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
