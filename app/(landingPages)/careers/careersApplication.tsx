import Footer from "@/app/_components/Footer/Footer";
import Navbar from "@/app/_components/Navbar/Navbar";
import Link from "next/link";
import React from "react";

const CareersApplication = () => {
  return (
    <>
      <div className=" flex gap-[--33px] mb-[--sy-251px]">
            <div className=" px-[--80px] py-[--sy-60px] bg-[#FFFFFB33] rounded-[--20px]  w-[clamp(30vw,_calc(55vw_+_0.1rem),_1097px)]">
              <h3 className=" uppercase font-extrabold text-[--40px] leading-[--sy-50px] text-nowrap mb-[--sy-38px] text-[#FFFFFB]">
                UX/UI Application
              </h3>
              <div>
                <div className=" flex flex-col gap-[--sy-15px] text-[#FFFFFB] mb-[--sy-30px]">
                  <label htmlFor="name" className="font-semibold">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    className="h-[--sy-38px] rounded-[--6px] bg-[#FFFFFB] px-[--14px] text-[#2A2B2A] outline-none focus:outline-none"
                  />
                </div>
                <div className=" flex flex-col gap-[--sy-15px] text-[#FFFFFB] mb-[--sy-30px]">
                  <label htmlFor="email" className="font-semibold">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="h-[--sy-38px] rounded-[--6px] bg-[#FFFFFB] px-[--14px] text-[#2A2B2A] outline-none focus:outline-none"
                  />
                </div>
                <div className=" flex flex-col gap-[--sy-15px] text-[#FFFFFB] mb-[--sy-30px]">
                  <label htmlFor="portfolio" className="font-semibold">
                    Portfolio link*
                  </label>
                  <input
                    type="text"
                    name="portfolio"
                    id="portfolio"
                    placeholder="Enter your email"
                    className="h-[--sy-38px] rounded-[--6px] bg-[#FFFFFB] px-[--14px] text-[#2A2B2A] outline-none focus:outline-none"
                  />
                </div>
                <div className=" flex flex-col gap-[--sy-15px] text-[#FFFFFB] mb-[--sy-40px]">
                  <span className="font-semibold">Upload CV*</span>
                  <div className=" relative">
                    <input
                      name="cv"
                      id="cv"
                      type="file"
                      className=" px-[--14px] py-[--sy-6px] outline-none focus:outline-none"
                    />
                    <label
                      htmlFor="cv"
                      className="rounded-[--6px] absolute inset-0 bg-[#3b3b3a] flex justify-center items-center text-[--13px] leading-[--sy-17px] border-[1px] border-[#FFFFFB5E]"
                    >
                      Attach PDF
                    </label>
                  </div>
                </div>
                <button className=" bg-[#FFFFFB] px-[--60px] py-[--sy-10px] font-bold text-[--20px] rounded-[--sy-7px] mx-auto block text-[#2A2B2A]">
                  Submit
                </button>
              </div>
            </div>
            <div className=" flex flex-col gap-y-[--20px] text-[#FFFFFB] w-fit self-end">
              <h6 className=" mb-[--sy-w0px] text-[--18px] leading-[--sy-28px] font-bold">
                Social Media
              </h6>
              <Link href={"#"}>@Twitter</Link>
              <Link href={"#"}>@Instagram</Link>
              <Link href={"#"}>hello@machinegenius.com</Link>
              <p>+00 33884848991828</p>
            </div>
          </div>
    </>
  );
};

export default CareersApplication;
