import Link from "next/link";
import React from "react";
import styles from "./blog.module.css";
import Footer from "@/app/_components/Footer/Footer";
import Navbar from "@/app/_components/Navbar/Navbar";

const Page = () => {
  return (
    <div className="w-full pt-[--sy-251px]">
      <div className=" w-full px-[--98px]">

        <div className=" grid grid-cols-3 gap-[--202px] mb-[--sy-80px]">
          <div className=" col-span-1">
            <h2 className=" font-extrabold text-[--116px] leading-[--sy-160px] text-[#FFFFFB] uppercase">
              Latest <br /> Blog
            </h2>
          </div>
          <div className=" col-span-2 pt-4">
            <ul className=" border-b-[1px] border-b-[#FFFFFB] w-full text-[#FFFFFB] flex gap-[--50px] items-center pb-[--sy-31px]">
              <li className=" font-extrabold text-[--20px] leading-[--26px] cursor-pointer uppercase underline underline-offset-2">
                All
              </li>
              <li className=" font-extrabold text-[--20px] leading-[--26px] cursor-pointer uppercase">
                NEWS
              </li>
              <li className=" font-extrabold text-[--20px] leading-[--26px] cursor-pointer uppercase">
                written by genius
              </li>
            </ul>
            {Array.from({ length: 5 }).map((e, i) => {
              return (
                <Link href={`/blog/${i+1}`}>
                  <div
                  key={i}
                  className={`px-[--19px] hover:rounded-[--5px] w-full flex gap-[--291px] ${
                    i < 4 ? "border-b-[1px] border-b-[#FFFFFB]" : null
                  } py-[--sy-48px] text-[#FFFFFB] hover:text-[#2A2B2A] transition-colors duration-200 hover:bg-[#FFFFFB]`}
                >
                  <div className=" flex flex-col gap-y-[--sy-18px]">
                    <p className=" text-[--20px] font-light leading-[--sy-26px] ">
                      20.3.2024 - News
                    </p>
                    <p className=" text-[--20px] font-light leading-[--sy-26px] ">
                      20 min read
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-[--sy-35px]">
                    <h3 className=" font-extrabold text-[--64px] leading-[--sy-80px] uppercase">
                      how does <br />
                      seo work?
                    </h3>
                    <p className=" text-[--16px] font-light leading-[--sy-20px]">
                      Written by Machine Genius
                    </p>
                  </div>
                </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
