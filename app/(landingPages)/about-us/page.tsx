"use client";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  return (
    <div className=" pt-[--sy-320px] mx-[--235px]">
      <div className=" w-fit mx-auto relative mb-[--sy-227px]">
        <h2 className="uppercase font-extrabold text-[--163px] text-[#FFFFFB] text-center mb-[--sy-64px]">
          Machine genius
        </h2>
        <span className=" absolute bottom-full text-[#FFFFFB] translate-y-[--sy-28px] left-0 font-medium text-[--102px] uppercase">
          About
        </span>
        <span className=" absolute bottom-full text-[#FFFFFB] translate-y-[--sy-10px] right-0 font-bold text-[--36px]">
          EST. 2024
        </span>
      </div>
      <div>
        <h2 className=" font-extrabold text-[--98px] uppercase text-[#FFFFFB]">
          What is Machine
        </h2>
        <div className=" flex gap-[--68px] mb-[--sy-160px]">
          <span className=" uppercase font-extrabold text-[--98px] text-[#FFFFFB]">
            Genius?
          </span>
          <div className="text-[#FFFFFB] pt-[--sy-30px] max-w-[clamp(25vw,_calc(31.64vw_+_0.1rem),_100vw)]">
            <p className=" mb-[--sy-30px] text-[--24px]">
              Lorem ipsum dolor sit amet consectetur. Neque tellus vitae
              volutpat iaculis nunc dui. Habitant sit bibendum feugiat
              suspendisse eget feugiat auctor in non. Massa rhoncus ultrices
              egestas egestas vitae lorem viverra. Donec non non donec at
              mattis.{" "}
            </p>
            <p className="text-[--24px]">
              Eget et elementum tellus tempor et a nibh nulla. Arcu vel felis in
              est. Est semper integer eleifend viverra non convallis leo.
            </p>
            <p className="text-[--24px]">
              Pellentesque dignissim egestas nunc montes sit sem. Venenatis
              suspendisse id non donec aliquam in interdum. Nibh leo hac
              pellentesque.
            </p>
          </div>
        </div>
        <div className=" w-fit ml-auto mr-[--64px] mb-[--sy-243px] relative">
          <h3 className=" text-center text-[#FFFFFB] text-[--36px] font-bold">
            Choose the Module and let Genius <br /> do the rest
          </h3>
          <svg
          className="w-[--43px] absolute top-full left-1/2 -translate-x-1/2 translate-y-1/2"
            viewBox="0 0 43 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8334 24.2222L21.5 30.8889M21.5 30.8889L28.1667 24.2222M21.5 30.8889L21.5 13.1111M1.50003 22C1.50003 10.9542 10.4542 2.00003 21.5 2.00003C32.5457 2.00003 41.5 10.9542 41.5 22C41.5 33.0457 32.5457 42 21.5 42C10.4542 42 1.50003 33.0457 1.50003 22Z"
              stroke="#FFFFFB"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className=" w-full flex gap-[--80px] mb-[--sy-243px]">
        <h2 className="font-extrabold text-[--98px] uppercase text-[#FFFFFB]">
          Current <br /> Modules
        </h2>
        <ul className=" shadow-[0px_2.23px_12.85px_0px_#00000040] w-full mt-[--sy-20px] self-start">
          <li className="py-[--sy-24px] px-[--30px] rounded-t-[--5px] group hover:bg-[#FFFFFB] flex justify-between items-center">
            <span className=" uppercase text-[--55px] font-extrabold text-[#FFFFFB] group-hover:text-[#2A2B2A]">
              SEO
            </span>
            <button className=" rounded-[--8px] py-[--sy-20px] px-[--29px] bg-[#2A2B2A] text-[#FFFFFB] text-[--20px] font-bold hidden group-hover:inline-block">
              Check Module
            </button>
          </li>
          <li className="py-[--sy-24px] px-[--30px] rounded-t-[--5px] group hover:bg-[#FFFFFB] flex justify-between items-center">
            <span className=" uppercase text-[--55px] font-extrabold text-[#FFFFFB] group-hover:text-[#2A2B2A]">
              HR
            </span>
            <button className=" rounded-[--8px] py-[--sy-20px] px-[--29px] bg-[#2A2B2A] text-[#FFFFFB] text-[--20px] font-bold hidden group-hover:inline-block">
              Check Module
            </button>
          </li>
          <li className="py-[--sy-24px] px-[--30px] rounded-t-[--5px] group hover:bg-[#FFFFFB] flex justify-between items-center">
            <span className=" uppercase text-[--55px] font-extrabold text-[#FFFFFB] group-hover:text-[#2A2B2A]">
              Video Editing
            </span>
            <button className=" rounded-[--8px] py-[--sy-20px] px-[--29px] bg-[#2A2B2A] text-[#FFFFFB] text-[--20px] font-bold hidden group-hover:inline-block">
              Check Module
            </button>
          </li>
          <li className="py-[--sy-24px] px-[--30px] rounded-t-[--5px] group hover:bg-[#FFFFFB] flex justify-between items-center">
            <span className=" uppercase text-[--55px] font-extrabold text-[#FFFFFB] group-hover:text-[#2A2B2A]">
              Content Creation
            </span>
            <button className=" rounded-[--8px] py-[--sy-20px] px-[--29px] bg-[#2A2B2A] text-[#FFFFFB] text-[--20px] font-bold hidden group-hover:inline-block">
              Check Module
            </button>
          </li>
          <li className="py-[--sy-24px] px-[--30px] rounded-t-[--5px] group hover:bg-[#FFFFFB] flex justify-between items-center">
            <span className=" uppercase text-[--55px] font-extrabold text-[#FFFFFB] group-hover:text-[#2A2B2A]">
              Social MEdia
            </span>
            <button className=" rounded-[--8px] py-[--sy-20px] px-[--29px] bg-[#2A2B2A] text-[#FFFFFB] text-[--20px] font-bold hidden group-hover:inline-block">
              Check Module
            </button>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-extrabold text-[--98px] uppercase text-[#FFFFFB] mb-[--sy-64px]">
          Launching
        </h2>
        <div className=" relative mx-auto max-w-[clamp(50vw,_calc(68.5vw_+_0.1rem),_100vw)] mb-[--sy-710px]">
          <div className="py-[--sy-48px]  px-[--50px] shadow-[0px_-16.72px_29.48px_0px_#00000047] bg-[#2A2B2A] h-[clamp(40vh,_calc(52.37vh_+_0.1rem),_70vh)] hover:-translate-y-[--sy-40px] rounded-[--27px]">
            <p className=" text-[--55px] font-extrabold text-[#FFFFFB] ml-auto w-fit">
              Operational
            </p>
          </div>
          <div className="absolute top-[clamp(10vh,_calc(13vh_+_0.1rem),_40vh)] py-[--sy-48px] px-[--50px] inset-0 bg-[#2A2B2A] shadow-[0px_-16.72px_29.48px_0px_#00000047] h-[clamp(40vh,_calc(52.37vh_+_0.1rem),_70vh)] hover:-translate-y-[--sy-40px] rounded-[--27px]">
            <p className=" text-[--55px] font-extrabold text-[#FFFFFB] ml-auto w-fit">
              Administrative
            </p>
          </div>
          <div className="absolute top-[clamp(20vh,_calc(26vh_+_0.1rem),_40vh)] py-[--sy-48px] px-[--50px] inset-0 bg-[#2A2B2A] shadow-[0px_-16.72px_29.48px_0px_#00000047] h-[clamp(40vh,_calc(52.37vh_+_0.1rem),_70vh)] hover:-translate-y-[--sy-40px] rounded-[--27px]">
            <p className=" text-[--55px] font-extrabold text-[#FFFFFB] ml-auto w-fit">
              Customer Service
            </p>
          </div>
          <div className="absolute top-[clamp(20vh,_calc(39vh_+_0.1rem),_40vh)] py-[--sy-48px] px-[--50px] inset-0 bg-[#2A2B2A] shadow-[0px_-16.72px_29.48px_0px_#00000047] h-[clamp(40vh,_calc(52.37vh_+_0.1rem),_70vh)] hover:-translate-y-[--sy-40px] rounded-[--27px]">
            <p className=" text-[--55px] font-extrabold text-[#FFFFFB] ml-auto w-fit">
              Social Media Specialist
            </p>
            <span className=" leading-[304px] font-extrabold text-[--235px] absolute top-full -translate-y-1/2 right-0 translate-x-[19%] text-[#FFFFFB]">
              SOON
            </span>
          </div>
        </div>
      </div>
      <div className=" py-[--sy-80px] text-[#FFFFFB] px-[--102px] rounded-[--20px] bg-[#373837] mb-[--sy-80px]">
        <div className=" flex justify-between items-center gap-[--100px]">
          <div>
            <h5 className=" text-[--40px] text-[#FFFFFB] font-extrabold mb-[--sy-48px]">
              Get started now
            </h5>
            <p className=" text-[--32px] leading-[--sy-40px]">
              Lorem ipsum dolor sit amet consectetur. <br /> Pellentesque ut est
              volutpat viverra. Amet velit.
            </p>
            <div className=" flex flex-col gap-y-[--sy-15px] mb-[--sy-50px]">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className=" px-[--11px] w-full h-[--sy-38px] bg-[#FFFFFB] rounded-[--7px] placeholder:text-[#979797] text-[#2A2B2A] outline-none focus:outline-none"
              />
            </div>
            <button className=" bg-[#FFFFFB] rounded-[--8px] text-[#2A2B2A] text-[--20px] font-bold px-[--64px] py-[--sy-18px]">
              Sign Up
            </button>
          </div>
          <svg
            className=" w-[--167px]"
            viewBox="0 0 167 216"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M146.475 206.581C141.633 209.714 135.498 211.517 127.822 211.836H125.314C116.685 211.836 109.535 210.324 103.695 207.45C97.8637 204.581 93.5099 200.522 90.5092 195.157C87.4886 189.756 85.9542 183.329 85.9542 175.639C85.9542 173.705 86.0042 171.789 86.1928 169.856L86.1969 169.814L86.2 169.772C86.345 167.79 86.5885 165.785 86.8885 163.684L87.4592 159.69H83.4237C71.0536 159.69 60.0375 157.662 50.2675 153.628C40.4166 149.56 32.0496 144.001 25.1123 136.87L25.1039 136.861C18.1388 129.75 12.7816 121.474 9.0733 112.057C5.3637 102.637 3.5 92.6136 3.5 81.9599C3.5 71.2952 5.36744 61.0742 9.06871 51.7723C12.7754 42.4568 18.1329 34.2267 25.1039 27.1094C32.0516 20.0159 40.4252 14.4075 50.2675 10.3432C60.0423 6.30687 71.0087 4.28125 83.1685 4.28125C95.3384 4.28125 106.321 6.25924 116.111 10.156C125.96 14.076 134.321 19.4853 141.25 26.4633L141.259 26.4719C148.23 33.4434 153.582 41.4739 157.283 50.4817C160.975 59.4692 162.837 69.2186 162.837 79.7148V171.557C162.837 179.127 161.441 185.986 158.698 192.183C156.008 198.257 151.963 203.03 146.475 206.581ZM91.6165 137.657L91.0417 137.082C92.8012 136.854 94.5169 136.529 96.2335 136.143L97.6003 135.836L98.3774 134.67C100.935 130.833 103.945 126.934 107.407 123.076C110.847 119.243 114.852 115.432 119.385 111.645C123.878 107.943 129.034 104.322 134.808 100.887L136.519 99.8698V97.8793V79.6638C136.519 72.155 135.219 65.1705 132.534 58.5946L132.53 58.585C129.861 52.1034 126.139 46.4554 121.309 41.6255L121.302 41.6184L121.295 41.6114C116.475 36.8465 110.79 33.0805 104.321 30.3627C97.7868 27.617 90.7395 26.2627 83.1685 26.2627C75.5792 26.2627 68.5251 27.6749 61.9926 30.4745C55.4817 33.2649 49.8426 37.2093 44.9875 42.2281L44.9806 42.2352L44.9738 42.2423C40.1563 47.2787 36.3906 53.2353 33.7801 60.0294C31.1081 66.8502 29.8184 74.1727 29.8184 81.9599C29.8184 89.7514 31.1096 97.0778 33.7846 103.902C36.4371 110.668 40.143 116.627 44.9738 121.677C49.7937 126.716 55.4928 130.66 61.9926 133.445C68.5251 136.245 75.5792 137.657 83.1685 137.657H91.6165ZM136.519 131.3V123.727L130.751 128.634C127.2 131.654 124.094 134.756 121.448 137.942C118.758 141.18 116.618 144.584 114.919 148.092L114.905 148.121L114.891 148.151C113.255 151.696 111.994 155.419 111.172 159.419C110.356 163.337 109.926 167.504 109.926 171.915C109.926 175.131 110.374 178.118 111.468 180.756C112.524 183.301 114.067 185.496 116.338 187.042C118.374 188.462 120.689 189.293 123.222 189.293C127.57 189.293 131.183 187.5 133.517 183.853C135.62 180.568 136.519 176.531 136.519 171.915V131.3Z"
              fill="#FFFFFB"
              stroke="#373737"
              stroke-width="7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default page;
