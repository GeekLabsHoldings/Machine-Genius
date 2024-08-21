"use client";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [selected, setSelected] = useState("monthly");

  const accordions = [
    {
      name: "seo",
      content:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing non pellentesque urna sed vel id. Pharetra libero mauris donec id duis feugiat magna tincidunt. A eget arcu faucibus magna. Nibh quis a proin sed amet fames venenatis bibendum. Id mollis volutpat risus eget pharetra. Euismod ac quam sagittis vitae eu sed interdum id malesuada. Enim ultrices ullamcorper ac pellentesque magna morbi. Etiam ut orci lorem amet scelerisque tincidunt sit lorem quam.",
    },
    {
      name: "HR",
      content:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing non pellentesque urna sed vel id. Pharetra libero mauris donec id duis feugiat magna tincidunt. A eget arcu faucibus magna. Nibh quis a proin sed amet fames venenatis bibendum. Id mollis volutpat risus eget pharetra. Euismod ac quam sagittis vitae eu sed interdum id malesuada. Enim ultrices ullamcorper ac pellentesque magna morbi. Etiam ut orci lorem amet scelerisque tincidunt sit lorem quam.",
    },
    {
      name: "Video Editing",
      content:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing non pellentesque urna sed vel id. Pharetra libero mauris donec id duis feugiat magna tincidunt. A eget arcu faucibus magna. Nibh quis a proin sed amet fames venenatis bibendum. Id mollis volutpat risus eget pharetra. Euismod ac quam sagittis vitae eu sed interdum id malesuada. Enim ultrices ullamcorper ac pellentesque magna morbi. Etiam ut orci lorem amet scelerisque tincidunt sit lorem quam.",
    },
    {
      name: "Content Creation",
      content:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing non pellentesque urna sed vel id. Pharetra libero mauris donec id duis feugiat magna tincidunt. A eget arcu faucibus magna. Nibh quis a proin sed amet fames venenatis bibendum. Id mollis volutpat risus eget pharetra. Euismod ac quam sagittis vitae eu sed interdum id malesuada. Enim ultrices ullamcorper ac pellentesque magna morbi. Etiam ut orci lorem amet scelerisque tincidunt sit lorem quam.",
    },
    {
      name: "Social MEdia",
      content:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing non pellentesque urna sed vel id. Pharetra libero mauris donec id duis feugiat magna tincidunt. A eget arcu faucibus magna. Nibh quis a proin sed amet fames venenatis bibendum. Id mollis volutpat risus eget pharetra. Euismod ac quam sagittis vitae eu sed interdum id malesuada. Enim ultrices ullamcorper ac pellentesque magna morbi. Etiam ut orci lorem amet scelerisque tincidunt sit lorem quam.",
    },
  ];

  return (
    <div className=" pt-[--sy-320px]">
      <h2 className=" font-extrabold text-[--175px] text-[#FFFFFB] text-center mb-[--sy-64px]">
        Careers
      </h2>
      <div className=" flex gap-[--15px] items-center justify-center w-fit mx-auto mb-[--sy-64px]">
        <button
          className={`${
            selected == "monthly"
              ? "text-[#2A2B2A] bg-[#FFFFFB]"
              : "text-[#FFFFFB] bg-transparent"
          } px-[--17px] py-[--sy-11px] rounded-[--3px] cursor-pointer uppercase`}
          onClick={() => setSelected("monthly")}
        >
          monthly
        </button>
        <div className=" w-[1px] bg-[#FFFFFB] self-stretch"></div>
        <button
          className={`${
            selected == "Yearly"
              ? "text-[#2A2B2A] bg-[#FFFFFB]"
              : "text-[#FFFFFB] bg-transparent"
          } px-[--17px] py-[--sy-11px] rounded-[--3px] cursor-pointer uppercase`}
          onClick={() => setSelected("Yearly")}
        >
          Yearly
        </button>
      </div>
      <div className=" flex gap-[--38px] justify-center w-fit mx-auto mb-[--sy-196px]">
        <div className=" rounded-[--11px] px-[--38px] py-[--sy-40px] text-[#FFFFFB] group hover:bg-[#FFFFFB] hover:text-[#2A2B2A] min-w-[clamp(25vw,_calc(27.9vw_+_0.1rem),_40vw)]">
          <h3 className=" font-extrabold text-[--50px] uppercase mb-[--sy-33px]">
            1 week trial
          </h3>
          <p className=" w-[clamp(14vw,_calc(17vw_+_0.1rem),_25vw)] text-[--22px] mb-[--sy-60px]">
            Try out Machine Genius’ modules for 1 week for FREE
          </p>
          <div className=" flex flex-col gap-y-[--sy-17px] font-medium text-[--33px] mb-[--sy-60px]">
            <span>$0</span>
            <span>Unlimited Users</span>
          </div>
          <button className=" py-[--sy-17px] w-full uppercase rounded-[--3px] bg-[#FFFFFB] text-[#2A2B2A] group-hover:text-[#FFFFFB] group-hover:bg-[#2A2B2A] text-[--18px] font-semibold">
            Get started
          </button>
        </div>
        <div className=" rounded-[--11px] px-[--38px] py-[--sy-40px] text-[#FFFFFB] group hover:bg-[#FFFFFB] hover:text-[#2A2B2A] min-w-[clamp(25vw,_calc(27.9vw_+_0.1rem),_40vw)]">
          <h3 className=" font-extrabold text-[--50px] uppercase mb-[--sy-33px]">
            All modules
          </h3>
          <p className=" w-[clamp(14vw,_calc(17vw_+_0.1rem),_25vw)] text-[--22px] mb-[--sy-60px]">
            Try out Machine Genius’ modules for 1 week for FREE
          </p>
          <div className=" flex flex-col gap-y-[--sy-17px] font-medium text-[--33px] mb-[--sy-60px]">
            <span>$100/User</span>
            <span>Monthly</span>
          </div>
          <button className=" py-[--sy-17px] w-full uppercase rounded-[--3px] bg-[#FFFFFB] text-[#2A2B2A] group-hover:text-[#FFFFFB] group-hover:bg-[#2A2B2A] text-[--18px] font-semibold">
            Get started
          </button>
        </div>
        <div className=" rounded-[--11px] px-[--38px] py-[--sy-40px] text-[#FFFFFB] group hover:bg-[#FFFFFB] hover:text-[#2A2B2A] min-w-[clamp(25vw,_calc(27.9vw_+_0.1rem),_40vw)]">
          <div className=" flex flex-col justify-between h-full ">
            <div>
              <h3 className=" font-extrabold text-[--50px] uppercase mb-[--sy-33px]">
                Enterprise
              </h3>
              <p className=" w-[clamp(14vw,_calc(17vw_+_0.1rem),_25vw)] text-[--22px] mb-[--sy-60px]">
                Try out Machine Genius’ modules for 1 week for FREE
              </p>
            </div>
            <button className="mt-auto py-[--sy-17px] w-full uppercase rounded-[--3px] bg-[#FFFFFB] text-[#2A2B2A] group-hover:text-[#FFFFFB] group-hover:bg-[#2A2B2A] text-[--18px] font-semibold">
              Contact us
            </button>
          </div>
        </div>
      </div>
      <div className="relative w-fit text-[--98px] font-extrabold text-[#FFF] ml-[--98px] mb-[--sy-136px]">
        <h2 className="">Available</h2>
        <h2 className=" absolute top-full left-1/4 -translate-y-1/4">
          Modules
        </h2>
      </div>
      <p className=" ml-auto mb-[--sy-50px] text-[--22px] w-fit text-[#FFFFFB] mr-[--98px]">
        All updates and new modules included
      </p>
      <div className=" mx-[--98px] mb-[--sy-196px]">
        {accordions.map((e, i) => {
          return (
            <div
              className={`collapse shadow-[0px_4px_17.7px_0px_#00000040] bg-[#2A2B2A] ${
                i == 0 ? "rounded-none rounded-t-[--9px]" : "rounded-none"
              } text-[#fffffb]`}
            >
              <input
                type="radio"
                name="my-accordion-1"
                defaultChecked={i == 0}
                className="peer"
              />
              <div className="collapse-title text-xl font-extrabold text-[--98px] peer-hover:bg-[#FFFFFB] peer-hover:text-[#2A2B2A]">
                <h2 className="ml-[--51px] uppercase font-extrabold text-[--98px]">{e.name}</h2>
              </div>
              <div className="collapse-content ">
                <p className=" text-[--22px] mb-[--sy-50px] mx-[--98px] mt-[--sy-44px]">
                  {e.content}
                </p>
                <Link
                  href={"#"}
                  className=" bg-[#FFFFFB] rounded-[--8px] py-[--sy-20px] px-[--29px] text-[#2A2B2A] text-[--20px] w-fit block ml-auto mr-[--98px] font-bold mb-[--sy-44px]"
                >
                  Check Module
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mx-[--98px] mb-[--sy-196px]">
        <h2 className=" text-[--98px] font-extrabold mb-[--sy-80px] text-[#FFFFFB]">
          FAQ
        </h2>
        <div className="text-[#FFFFFB]">
          <div className=" flex justify-between pt-[--sy-64px] pb-[--sy-80px] border-b-[1px] border-b-[#FFFFFB] items-center">
            <h5 className="text-[--50px] font-[900] uppercase">
              What's not included <br /> in the pricing?
            </h5>
            <div className=" text-[--36px] font-normal">
              <p className="leading-[--sy-40px]">One-time Implementation service</p>
              <p className="leading-[--sy-40px]">
                (Template creation, Data service, Training, and <br /> access to
                expert services).
              </p>
            </div>
          </div>
          <div className=" flex justify-between pt-[--sy-64px] pb-[--sy-80px] border-b-[1px] border-b-[#FFFFFB] items-center">
            <h5 className="text-[--50px] font-[900] uppercase">
            How much does the 1- <br /> time implementation service cost?
            </h5>
            <div className="leading-[--sy-40px] text-[--36px] font-normal">
              <p className="leading-[--sy-40px]">Lorem ipsum dolor sit amet consectetur. <br /> Mattis in arcu interdum neque et orci turpis. <br /> Cursus scelerisque congue odio id sed. </p>
             
            </div>
          </div>
          <div className=" flex justify-between pt-[--sy-64px] pb-[--sy-80px] items-center">
            <h5 className="text-[--50px] font-[900] uppercase">
            Can i freeze my plan if <br /> im not going to use it?
            </h5>
            <div className="leading-[--sy-40px] text-[--36px] font-normal">
              <p className="leading-[--sy-40px]">Yes, you can freeze your plan up to three times <br /> per year.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
