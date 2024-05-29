"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import "./slider.css";
import Slider from "react-slick";
import styles from "@/app/outreach/templates/template-title/email-preview.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

function SampleNextArrow(props: any) {
  const { onClick, className } = props;
  return (
    <div onClick={onClick} className={`custom_arrows ${className}`}>
      <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  const { onClick, className } = props;
  return (
    <div onClick={onClick} className={`custom_arrows ${className}`}>
      <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5059 23.9434C16.9213 23.529 16.9213 22.8565 16.5059 22.441L12.1274 18.0625L23.375 18.0625C23.9594 18.0625 24.4375 17.5865 24.4375 17C24.4375 16.4124 23.9594 15.9375 23.375 15.9375L12.1274 15.9375L16.5059 11.559C16.9213 11.1435 16.9213 10.4699 16.5059 10.0566C16.0926 9.64115 15.419 9.64115 15.0035 10.0566L8.99409 16.066C8.73909 16.321 8.65939 16.6696 8.71783 17C8.65939 17.3304 8.73909 17.679 8.99409 17.934L15.0035 23.9434C15.419 24.3588 16.0926 24.3588 16.5059 23.9434ZM1.30041e-06 29.75L1.85773e-07 4.25C8.318e-08 1.90294 1.90294 -8.318e-08 4.25 -1.85773e-07L29.75 -1.30041e-06C32.0981 -1.40305e-06 34 1.90294 34 4.25L34 29.75C34 32.0971 32.0981 34 29.75 34L4.25 34C1.90294 34 1.40301e-06 32.0971 1.30041e-06 29.75Z"
        />
      </svg>
    </div>
  );
}

const icon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.74821 10.3268C4.74316 10.833 5.14944 11.2475 5.65569 11.2525C6.16194 11.2576 6.57641 10.8513 6.58145 10.345L6.61801 6.67856L10.2845 6.71511C10.7907 6.72016 11.2052 6.31388 11.2102 5.80763C11.2153 5.30138 10.809 4.88692 10.3028 4.88187L6.63628 4.84532L6.67283 1.17883C6.67788 0.67259 6.2716 0.258118 5.76535 0.253071C5.2591 0.248024 4.84464 0.654314 4.83959 1.16055L4.80304 4.82704L1.13656 4.79049C0.630324 4.78544 0.215843 5.19172 0.210796 5.69797C0.205749 6.20422 0.612047 6.61868 1.11828 6.62373L4.78476 6.66028L4.74821 10.3268Z"
      fill="#2A2B2A"
    />
  </svg>
);

function page() {
  const settings: any = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding: 30,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: true,
  };
  return (
    <div className="flex flex-col email__preview">
      <div
        className={`flex flex-col gap-1 w-full h-[75vh] py-[1.5vw] ${styles.email__preview}`}
      >
        <div className="flex justify-between items-center w-full">
          <input
            type="text"
            placeholder="Templates Title*"
            required
            className={`py-2 px-4 text-[2rem] font-bold ${styles.input}`}
          />
          <div className="flex gap-4">
            <span className="text-xl text-[#ACACAC] font-[500]">Assign to</span>
            <div className="w-[15rem]">
              <CustomSelectInput
                label="Select Account"
                options={[
                  "Instagram",
                  "Reddit",
                  "Twitter",
                  "TikTok",
                  "Facebook",
                ]}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center grow mt-14 gap-2">
          {/* scripts wrapper */}
          <div className={` ${styles.audience}`}>
            <div className="">
              <div className="sliderAudience w-[87vw]">
                <div className="slider-container">
                  <Slider {...settings}>
                    {Array(12)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          className={`${styles.card} px-[1vw] pt-[1.1vw] pb-[2vw] rounded-xl`}
                        >
                          <div className=" flex justify-between items-center pb-[0.7vw] border-b-[1px] border-b-[#2A2B2A] mb-[1vw]">
                            <h3 className="font-bold text-2xl">
                              Sequence Introduction*
                            </h3>
                          </div>
                          <div className={`flex flex-col gap-[0.2vw]`}>
                            <label
                              htmlFor="tiketDescription"
                              className="font-[600] text-xl"
                            >
                              Subject Line
                            </label>
                            <input
                              type="text"
                              id="subjectLine"
                              required
                              className={`${styles.input}`}
                            />
                          </div>
                          <div className={`flex flex-col gap-[0.2vw]`}>
                            <h3 className="font-bold text-xl">Message</h3>
                            <p className="border-b border-[var(--border)] pb-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                            <div className="mt-5 ml-auto">
                              <CustomBtn word="Save" btnColor="black" />
                            </div>
                          </div>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* buttons to move to last or next page */}
      <div className="flex gap-5 justify-end w-full">
        <CustomBtn
          word={"New Sequence"}
          btnColor="white"
          paddingVal="py-2 px-4"
          icon={icon}
        />
        <CustomBtn
          word={"Save Template"}
          btnColor="black"
          paddingVal="py-2 px-4"
        />
      </div>
    </div>
  );
}

export default page;
