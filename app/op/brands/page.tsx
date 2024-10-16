"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./brands.module.css";
import "./brands.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import Slider from "react-slick";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { addIcon } from "@/app/_utils/svgIcons";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";

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

const settings: any = {
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const settings2: any = {
  ...settings,
  slidesToShow: 4,
  slidesToScroll: 1,
};

function InnerInfoCard({
  subBrandTitle,
  subBrandNiche,
  subBrandDescription,
  subBrandAcquisitionDate,
  brandColor,
}: {
  subBrandTitle: string;
  subBrandNiche: string;
  subBrandDescription: string;
  subBrandAcquisitionDate: string;
  brandColor: string;
}) {
  return (
    <div className={`${styles.info} p-[1vw] rounded-3xl`}>
      {/* Header section with flex layout, justified content, centered items, padding bottom, bottom margin, and bottom border */}
      <div className="flex justify-between items-center pb-[0.6vw] mb-[0.5vw] border-b-[var(--dark)] border-b-[1px]">
        <h4 style={{ color: brandColor }}>{subBrandTitle}</h4>
        <span
          style={{ backgroundColor: brandColor }}
          className={`px-[0.4vw] py-[0.1vw] font-medium rounded-[--4px]`}
        >
          {subBrandNiche}
        </span>
      </div>
      {/* Description heading */}
      <h5 className=" mb-[0.5vw]">Description</h5>
      <p className=" mb-[0.5vw]">{subBrandDescription}</p>
      {/* Acquisition date section with flex layout, justified content, and centered items */}
      <div className=" flex justify-between items-center">
        <h5>Acquisition Date</h5>
        <span className={`${styles.dateSpan} text-[#ACACAC]`}>
          {subBrandAcquisitionDate}
        </span>
      </div>
    </div>
  );
}

function MainCard({
  mainBrandTitle,
  mainBrandNiche,
  brandColor,
  subBrands,
}: {
  mainBrandTitle: string;
  mainBrandNiche: string;
  brandColor: string;
  subBrands: SubBrand[];
}) {
  return (
    <div className={`${styles.card} px-[1vw] pt-[1.1vw] rounded-3xl`}>
      {/* Header section with flex layout, justified content, centered items, padding bottom, bottom border, and bottom margin */}
      <div className=" flex justify-between items-center pb-[0.7vw] border-b-[1px] border-b-[#2A2B2A] mb-[0.8vw]">
        <h3>{mainBrandTitle}</h3>
        <span
          style={{ backgroundColor: brandColor }}
          className={`px-[0.4vw] py-[0.1vw] font-medium rounded-[--4px]`}
        >
          {mainBrandNiche}
        </span>
      </div>
      {/* Scrollable content area with fixed height, padding right, and padding */}
      <div className=" overflow-y-scroll h-[32vh] pr-2 py-[0.2vw]">
        {/* Inner card with padding and rounded corners */}
        {subBrands.map((subBrand, index) => (
          <InnerInfoCard
            key={index}
            subBrandTitle={subBrand.brand_name}
            subBrandNiche={
              subBrand.niche[0].toUpperCase() +
              subBrand.niche.toLowerCase().slice(1)
            }
            subBrandDescription={subBrand.description}
            subBrandAcquisitionDate={subBrand.aquisition_date.split("T")[0]}
            brandColor="#F36F24B2"
          />
        ))}
      </div>
    </div>
  );
}

// ===== Start Types =====
interface BrandWithDetails {
  brand: Brand;
  subBrands: SubBrand[];
  accounts: Account[];
}

interface Brand {
  _id: string;
  brand_name: string;
  description: string;
  aquisition_date: string;
  niche: string;
  __v: number;
}

interface SubBrand extends Brand {
  type: string;
  parentId: string;
}

interface Account {
  platform: string;
  account:
    | TwitterAccount
    | LinkedInAccount
    | TelegramAccount
    | RedditAccount
    | FacebookAccount;
}

interface TwitterAccount {
  ConsumerKey: string;
  ConsumerSecret: string;
  AccessToken: string;
  TokenSecret: string;
  BearerToken: string;
}

interface LinkedInAccount {
  token: string;
  owner: string;
}

interface TelegramAccount {
  token: string;
}

interface RedditAccount {
  appID: string;
  appSecret: string;
  username: string;
  password: string;
}

interface FacebookAccount {
  client_id: string;
  client_secret: string;
  tokenPage: string;
  longAccessToken: string;
  pageID: string;
  email: string;
  password: string;
  cookies: string;
}

type BrandsWithDetailsArray = BrandWithDetails[];
// ===== End Types =====

const Page = () => {
  const { authState, handleSignOut } = useContext(globalContext);

  const [pageState, setPageState] = useState<{
    isLoading: boolean;
    brandsWithSubBrands: BrandsWithDetailsArray;
    brandsWithoutSubBrands: BrandsWithDetailsArray;
  }>({
    isLoading: false,
    brandsWithSubBrands: [],
    brandsWithoutSubBrands: [],
  });

  const getBrands = async () => {
    setPageState((prevState: any) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/get-brands?limit=9999`,
        {
          headers: {
            Authorization: `bearer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
        }
      );

      if (res.status === 401) {
        handleSignOut();
        return;
      }

      if (!res.ok) {
        toast.error("Failed to fetch brands!");

        return;
      }

      const data: BrandsWithDetailsArray[] = await res.json();

      if (data && Array.isArray(data) && data.length > 0) {
        setPageState((prevState: any) => ({
          ...prevState,
          brandsWithSubBrands: data.filter(
            (brand: any) => brand.subBrands.length > 0
          ),
          brandsWithoutSubBrands: data.filter(
            (brand: any) => brand.subBrands.length === 0
          ),
          isLoading: false,
        }));
      } else {
        toast.error("Failed to fetch brands!");
        setPageState((prevState: any) => ({
          ...prevState,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch brands!"
      );
      setPageState((prevState: any) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <section className={`${styles.brands} brands pt-[0.7vw] overflow-hidden`}>
      {/* 01- Filters */}
      <div className="w-1/6 mb-[--sy-15px]">
        <h4 className="mb-[0.5vw]">Brand Groups</h4>
        <CustomSelectInput
          options={pageState.brandsWithSubBrands.map(
            (brand: any) => brand.brand.brand_name
          )}
          label={"All"}
        />
      </div>

      {/* 02- Brands Slider */}
      <div className="sliderAudience w-[87vw] mb-[--sy-25px]">
        <div className="slider-container">
          {/* Slider component with specified settings */}
          <Slider {...settings}>
            {pageState.isLoading ? (
              <div className="!w-[87vw] !h-[40vh] flex justify-center items-center ">
                <div className="h-full flex justify-center items-center">
                  <span className="custom-loader"></span>
                </div>
              </div>
            ) : Array.isArray(pageState.brandsWithSubBrands) &&
              pageState.brandsWithSubBrands.length > 0 ? (
              pageState.brandsWithSubBrands.map((brand: any, index: number) => (
                <MainCard
                  key={index}
                  mainBrandTitle={brand.brand.brand_name}
                  mainBrandNiche={
                    brand.brand.niche[0].toUpperCase() +
                    brand.brand.niche.toLowerCase().slice(1)
                  }
                  brandColor="#F36F24B2"
                  subBrands={brand.subBrands}
                />
              ))
            ) : (
              <div className="!w-[87vw] !h-[40vh] flex justify-center items-center ">
                <div className="h-full flex justify-center items-center">
                  <span>No brands found!</span>
                </div>
              </div>
            )}
          </Slider>
        </div>
      </div>

      {/* 03- Brands Slider */}
      <div>
        <div className="relative mb-[--sy-10px]">
          <h4>Brands</h4>
        </div>

        <div className="sliderAudience w-[87vw]">
          {/* Slider container */}
          <div className="slider-container custom-slider-container">
            <Slider {...settings2}>
              {pageState.isLoading ? (
                <div className="!w-[87vw] !h-[23vh] flex justify-center items-center">
                  <div className="h-full flex justify-center items-center">
                    <span className="custom-loader"></span>
                  </div>
                </div>
              ) : Array.isArray(pageState.brandsWithoutSubBrands) &&
                pageState.brandsWithoutSubBrands.length > 0 ? (
                pageState.brandsWithoutSubBrands.map(
                  (brand: any, index: number) => (
                    <InnerInfoCard
                      key={index}
                      subBrandTitle={brand.brand.brand_name}
                      subBrandNiche={
                        brand.brand.niche[0].toUpperCase() +
                        brand.brand.niche.toLowerCase().slice(1)
                      }
                      subBrandDescription={brand.brand.description}
                      subBrandAcquisitionDate={
                        brand.brand.aquisition_date.split("T")[0]
                      }
                      brandColor="#F36F24B2"
                    />
                  )
                )
              ) : (
                <div className="!w-[87vw] !h-[23vh] flex justify-center items-center">
                  <div className="h-full flex justify-center items-center">
                    <span>No brands found!</span>
                  </div>
                </div>
              )}
            </Slider>
          </div>
        </div>
      </div>

      {/* 04- Container for the "New Brand" button, aligned to the right */}
      <div className="w-fit ms-auto mt-[--sy-15px]">
        <CustomBtn
          href="/op/brands/new-brand"
          paddingVal="py-[0.4vw] px-[0.9vw]"
          btnColor="black"
          icon={addIcon}
          word="New Brand"
        />
      </div>
    </section>
  );
};

export default Page;
