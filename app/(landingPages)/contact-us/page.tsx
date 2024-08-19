import Footer from "@/app/_components/Footer/Footer";
import Navbar from "@/app/_components/Navbar/Navbar";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full pt-[--sy-251px]">
      <div className=" w-full px-[--98px]">
        <div>
            <div className=" w-fit relative"><h2 className=" uppercase font-extrabold text-[--175px] text-[#FFFFFB] mb-[--sy-64px]">Contact <br />Us</h2>
                <div className="absolute left-1/2 top-1/2 -translate-x-[10%] translate-y-[10%]">
                <div className=" px-[--115px] py-[--sy-60px] bg-[#FFFFFB33] rounded-[--20px]  w-[clamp(50vw,_calc(69vw_+_0.1rem),_1597px)] mb-[--sy-30px]">
                    <h3 className=" uppercase font-extrabold text-[--40px] leading-[--sy-50px] text-nowrap mb-[--sy-38px] text-[#FFFFFB]">Get in touch</h3>
                    <div>
                        <div className=" flex flex-col gap-[--sy-15px] text-[#FFFFFB] mb-[--sy-30px]">
                            <label htmlFor="name" className="font-semibold">Full Name*</label>
                            <input type="text" name="name" id="name" placeholder="Enter your name" className="h-[--sy-38px] rounded-[--6px] bg-[#FFFFFB] px-[--14px] text-[#2A2B2A] outline-none focus:outline-none"/>
                        </div>
                        <div className=" flex flex-col gap-[--sy-15px] text-[#FFFFFB] mb-[--sy-30px]">
                            <label htmlFor="email" className="font-semibold">Email*</label>
                            <input type="email" name="email" id="email" placeholder="Enter your email" className="h-[--sy-38px] rounded-[--6px] bg-[#FFFFFB] px-[--14px] text-[#2A2B2A] outline-none focus:outline-none"/>
                        </div>
                        <div className=" flex flex-col gap-[--sy-15px] text-[#FFFFFB] mb-[--sy-30px]">
                            <label htmlFor="message" className="font-semibold">Message</label>
                            <textarea name="message" id="message"  placeholder="......" className="resize-none rounded-[--6px] bg-[#FFFFFB] px-[--14px] py-[--sy-6px] text-[#2A2B2A] outline-none focus:outline-none"/>
                        </div>
                        <button className=" bg-[#FFFFFB] px-[--60px] py-[--sy-10px] font-bold text-[--20px] rounded-[--sy-7px] mx-auto block">Submit</button>
                    </div>
                </div>
                <div className=" flex gap-[--60px] items-center text-[#FFFFFB] w-fit ml-auto">
                    <Link href={"#"}>hello@machinegenius.com</Link>
                    <p>+00 33884848991828</p>
                </div>
                </div>
            </div>
            <div className=" text-[#FFFFFB] mb-[--sy-680px]">
            <h6 className=" mb-[--sy-40px] text-[--18px] leading-[--sy-28px] font-bold">Social Media</h6>
                  <ul>
                    <li><Link href={"/"} className=" text-[--18px] leading-[--sy-28px]">@Twitter</Link></li>
                    <li><Link href={"/"} className=" text-[--18px] leading-[--sy-28px]">@Instagram</Link></li>
                  </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default page;
