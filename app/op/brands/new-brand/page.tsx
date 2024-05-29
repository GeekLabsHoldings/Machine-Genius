"use client";
import React from "react";
import styles from "./newBrand.module.css";
import { useRouter } from "next/navigation";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";

const page = () => {
  const router = useRouter();
  return (
    <div className={`${styles.newBrand} pt-[1.5vw]`}>
      <div
        onClick={() => router.back()}
        className=" flex items-center cursor-pointer mb-[1.2vw]"
      >
        <svg
          className=" mr-[0.6vw]"
          width="11"
          height="22"
          viewBox="0 0 11 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 20.8993L11 1.09878C10.9996 0.898304 10.9627 0.701801 10.8932 0.530416C10.8237 0.359031 10.7244 0.219253 10.6058 0.126133C10.4873 0.03301 10.354 -0.00993011 10.2203 0.0019317C10.0867 0.0137935 9.95773 0.080009 9.84734 0.19345L0.296979 10.0937C-0.0989937 10.504 -0.0989937 11.4919 0.296979 11.9033L9.84734 21.8036C9.9575 21.9182 10.0865 21.9854 10.2204 21.9979C10.3543 22.0104 10.4879 21.9677 10.6067 21.8745C10.7255 21.7813 10.825 21.6411 10.8943 21.4692C10.9637 21.2973 11.0002 21.1002 11 20.8993Z"
            fill="#2A2B2A"
          />
        </svg>
        <h3>Add New Brand</h3>
      </div>

      <div className=" grid grid-cols-3 w-full gap-[2vw]">
        <div className={`${styles.form} col-span-1`}>
          <h4 className=" mb-[1vw]">Brand Details</h4>
          <label htmlFor="">Brand Name*</label>
          <input
            type="text"
            placeholder="Juice Box"
            className=" py-[0.6vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
          />
          <label className=" mb-[0.7vw] inline-block" htmlFor="">
            Niche
          </label>
          <div className=" w-[15vw] mb-[1.2vw]">
            <CustomSelectInput label={"All"} options={["Niche", "Niches"]} />
          </div>
          <label htmlFor="">Description*</label>
          <input
            type="text"
            placeholder="51640615651463254"
            className=" py-[0.6vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
          />
          <label htmlFor="">Acquisition Date*</label>
          <input
            type="text"
            placeholder="20 April 2024"
            className=" py-[0.6vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
          />
          <div className=" flex justify-between">
            {" "}
            <h4>Sub-brand</h4>
            <CustomBtn
              btnColor="black"
              paddingVal="py-[0.2vw] px-[0.2vw]"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.58333 16.5C7.58333 17.3284 8.21757 18 9 18C9.78242 18 10.4167 17.3284 10.4167 16.5V10.5H16.0833C16.8658 10.5 17.5 9.82845 17.5 9C17.5 8.17155 16.8658 7.5 16.0833 7.5H10.4167V1.5C10.4167 0.671565 9.78242 0 9 0C8.21757 0 7.58333 0.671565 7.58333 1.5V7.5H1.91667C1.13427 7.5 0.5 8.17155 0.5 9C0.5 9.82845 1.13427 10.5 1.91667 10.5H7.58333V16.5Z"
                    fill="#FFFFFB"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
