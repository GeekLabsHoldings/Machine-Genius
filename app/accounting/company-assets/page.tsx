"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./companyAssets.module.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { globalContext } from "@/app/_context/store";

enum AssetsTypeEnum {
  RealEstate = "realState",
  Equipment = "equipment",
  DigitalAsset = "digital-asset",
}

interface IAssetsModel {
  propertyType: string;
  amountPaid: number;
  sellerPhoneNumber: string;
  dateAcquired: number;
}

interface IRealEstateModel extends IAssetsModel {
  assetAddress: string;
  space: number;
  marketRate: number;
  ratings: number;
}

interface IEquipmentModel extends IAssetsModel {
  equipmentName: string;
}

interface IDigitalAssetModel extends IRealEstateModel {
  assetName: string;
  TTMProfit: number;
  TTMRevenue: number;
}

type AssetsTypes = IRealEstateModel | IEquipmentModel | IDigitalAssetModel;

const Page = () => {
  const [sorting1, setSorting1] = useState("Ascend");
  const [sorting2, setSorting2] = useState("Ascend");
  const [sorting3, setSorting3] = useState("Ascend");
  const [sorting4, setSorting4] = useState("Ascend");

  const [assetsType, setAssetsType] = useState<AssetsTypeEnum>(
    AssetsTypeEnum.RealEstate
  );
  const [assets, setAssets] = useState<AssetsTypes[]>([]);
  const { handleSignOut } = useContext(globalContext);

  function getRandomBackgroundColor() {
    const colors = [
      "#F36F24B2",
      "#9B5FBFB2",
      "#E1C655B2",
      "#31B2E9B2",
      "#E9313EB2",
    ];

    // Select a random index from the array of colors
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the color at the random index
    return colors[randomIndex];
  }

  // Define the maximum number of stars to display

  const STAR_COUNT = 5;

  // Function to generate star rating SVG elements based on a given value

  const rating = (value: number) => {
    // Create an array of length STAR_COUNT, each element is a default (empty) star SVG

    const stars = Array.from({ length: STAR_COUNT }, () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.0225353 7.23255C0.0764637 7.07602 0.213829 6.96299 0.377325 6.94122L6.67488 6.10642L9.61063 0.221093C9.75672 -0.0736975 10.2428 -0.0736975 10.3889 0.221093L13.3246 6.10646L19.6222 6.94126C19.7857 6.96299 19.9239 7.07606 19.9769 7.23259C20.03 7.38911 19.99 7.56215 19.8726 7.67954L15.2542 12.2979L16.5125 18.5911C16.5447 18.7546 16.4821 18.9207 16.3499 19.0224C16.2177 19.1233 16.0386 19.1398 15.8916 19.0659L9.99929 16.1197L4.10696 19.0659C4.0452 19.0963 3.97913 19.112 3.91305 19.112C3.81999 19.112 3.72608 19.0815 3.64871 19.0224C3.51742 18.9216 3.45391 18.7546 3.48611 18.5911L4.74439 12.2979L0.12603 7.67958C0.0103874 7.563 -0.0296402 7.38997 0.0225353 7.23255ZM3.84873 8.94129L6.63314 11.7266L5.91226 15.331C5.88096 15.391 5.86355 15.4589 5.86355 15.5311C5.86355 15.7711 6.05835 15.9659 6.29836 15.9659H6.31576C6.38184 15.9659 6.44795 15.9502 6.51056 15.9198L10.0011 14.1754L13.4916 15.9198C13.6403 15.9937 13.8186 15.978 13.9499 15.8763C14.0812 15.7754 14.1447 15.6084 14.1125 15.445L13.369 11.7257L16.1534 8.94043C16.2708 8.82304 16.3108 8.65 16.2578 8.49347C16.2038 8.33695 16.0665 8.22392 15.903 8.20215L12.1829 7.70909L10.3906 4.11769C10.2446 3.8229 9.75847 3.8229 9.61238 4.11769L7.82016 7.70909L4.10007 8.20215C3.93657 8.22388 3.79831 8.33695 3.74528 8.49347C3.69135 8.65086 3.73134 8.82389 3.84873 8.94129Z"
          fill="#E1C655"
        />
      </svg>
    ));
    let i;
    for (i = 0; i < value; i++) {
      // this will loop Math.floor(value) times
      stars[i] = (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.85846 0.00390625L10.738 5.3874L15.8711 6.13858L12.4908 9.89451V15.278L7.85846 13.2748L2.85056 14.652L4.22773 9.89451L0.722199 6.13858L5.10411 5.01181L7.85846 0.00390625Z"
            fill="#E1C655"
          />
        </svg>
      );
    }

    if (value % 1 != 0)
      // if value is a decimal, add a half star
      stars[i - 1] = (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.0225353 7.23255C0.0764637 7.07602 0.213829 6.96299 0.377325 6.94122L6.67488 6.10642L9.61063 0.221093C9.75672 -0.0736975 10.2428 -0.0736975 10.3889 0.221093L13.3246 6.10646L19.6222 6.94126C19.7857 6.96299 19.9239 7.07606 19.9769 7.23259C20.03 7.38911 19.99 7.56215 19.8726 7.67954L15.2542 12.2979L16.5125 18.5911C16.5447 18.7546 16.4821 18.9207 16.3499 19.0224C16.2177 19.1233 16.0386 19.1398 15.8916 19.0659L9.99929 16.1197L4.10696 19.0659C4.0452 19.0963 3.97913 19.112 3.91305 19.112C3.81999 19.112 3.72608 19.0815 3.64871 19.0224C3.51742 18.9216 3.45391 18.7546 3.48611 18.5911L4.74439 12.2979L0.12603 7.67958C0.0103874 7.563 -0.0296402 7.38997 0.0225353 7.23255ZM9.56538 13.6892C9.56538 13.8536 9.65844 14.0049 9.80539 14.0779L13.4898 15.9197C13.5516 15.9502 13.6176 15.9658 13.6846 15.9658C13.7777 15.9658 13.8716 15.9354 13.949 15.8763C14.0803 15.7754 14.1438 15.6084 14.1116 15.445L13.3681 11.7257L16.1525 8.94043C16.2699 8.82304 16.3099 8.65 16.2569 8.49347C16.2029 8.33695 16.0656 8.22392 15.9021 8.20215L12.182 7.70909L10.3898 4.11769C10.3002 3.93683 10.0976 3.84291 9.90106 3.88811C9.70365 3.93422 9.56538 4.10986 9.56538 4.31159V13.6892Z"
            fill="#E1C655"
          />
        </svg>
      );

    return <div className="rating">{stars}</div>;
  };

  const dataHeadRealEstate = [
    "Property Address",
    "Property Type",
    "Space",
    "Amount Paid",
    "Market Rate",
    "Ratings",
    "Seller",
    "Date Acquired",
  ];
  const dataHeadDigitalAsset = [
    "Asset Name",
    "Address",
    "Amount Paid",
    "Market Rate",
    "Seller",
    "Ratings",
    "TTM Profit",
    "TTM Revenue",
    "Date Acquired",
  ];

  // const dataRealEstate = [
  //   {
  //     PropertyAddress: "123, Internet St",
  //     PropertyType: "Commercial",
  //     Space: "15000 sq",
  //     AmountPaid: "8,000,000 EGP",
  //     MarketRate: "8,000,000 EGP",
  //     Ratings: 3.5,
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     PropertyAddress: "123, Internet St",
  //     PropertyType: "Commercial",
  //     Space: "23000 sq",
  //     AmountPaid: "5,000,000 EGP",
  //     MarketRate: "5,000,000 EGP",
  //     Ratings: 3.5,
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     PropertyAddress: "123, Internet St",
  //     PropertyType: "Residential",
  //     Space: "30000 sq",
  //     AmountPaid: "12,000,000 EGP",
  //     MarketRate: "12,000,000 EGP",
  //     Ratings: 3.5,
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     PropertyAddress: "123, Internet St",
  //     PropertyType: "Commercial",
  //     Space: "45000 sq",
  //     AmountPaid: "8,000,000 EGP",
  //     MarketRate: "8,000,000 EGP",
  //     Ratings: 3.5,
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     PropertyAddress: "123, Internet St",
  //     PropertyType: "Residential",
  //     Space: "15000 sq",
  //     AmountPaid: "5,000,000 EGP",
  //     MarketRate: "5,000,000 EGP",
  //     Ratings: 3.5,
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     PropertyAddress: "123, Internet St",
  //     PropertyType: "Residential",
  //     Space: "30000 sq",
  //     AmountPaid: "12,000,000 EGP",
  //     MarketRate: "12,000,000 EGP",
  //     Ratings: 3.5,
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     PropertyAddress: "123, Internet St",
  //     PropertyType: "Commercial",
  //     Space: "30000 sq",
  //     AmountPaid: "12,000,000 EGP",
  //     MarketRate: "12,000,000 EGP",
  //     Ratings: 3.5,
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     PropertyAddress: "123, Internet St",
  //     PropertyType: "Commercial",
  //     Space: "15000 sq",
  //     AmountPaid: "8,000,000 EGP",
  //     MarketRate: "8,000,000 EGP",
  //     Ratings: 3.5,
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     PropertyAddress: "123, Internet St",
  //     PropertyType: "Commercial",
  //     Space: "15000 sq",
  //     AmountPaid: "12,000,000 EGP",
  //     MarketRate: "12,000,000 EGP",
  //     Ratings: 3.5,
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     PropertyAddress: "123, Internet St",
  //     PropertyType: "Residential",
  //     Space: "45000 sq",
  //     AmountPaid: "5,000,000 EGP",
  //     MarketRate: "5,000,000 EGP",
  //     Ratings: 3.5,
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     PropertyAddress: "123, Internet St",
  //     PropertyType: "Commercial",
  //     Space: "30000 sq",
  //     AmountPaid: "8,000,000 EGP",
  //     MarketRate: "8,000,000 EGP",
  //     Ratings: 3.5,
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     PropertyAddress: "123, Internet St",
  //     PropertyType: "Residential",
  //     Space: "15000 sq",
  //     AmountPaid: "5,000,000 EGP",
  //     MarketRate: "5,000,000 EGP",
  //     Ratings: 3.5,
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  // ];

  const headEquipment = [
    "Equipments",
    "Property Type",
    "Amount Paid",
    "Seller",
    "Date Acquired",
  ];
  // const dataEquipment = [
  //   {
  //     Equipments: "123, Internet St",
  //     PropertyType: "Commercial",
  //     AmountPaid: "8,000,000 EGP",
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     Equipments: "123, Internet St",
  //     PropertyType: "Commercial",
  //     AmountPaid: "5,000,000 EGP",
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     Equipments: "123, Internet St",
  //     PropertyType: "Residential",
  //     AmountPaid: "12,000,000 EGP",
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     Equipments: "123, Internet St",
  //     PropertyType: "Commercial",
  //     AmountPaid: "8,000,000 EGP",
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     Equipments: "123, Internet St",
  //     PropertyType: "Residential",
  //     AmountPaid: "5,000,000 EGP",
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     Equipments: "123, Internet St",
  //     PropertyType: "Residential",
  //     AmountPaid: "12,000,000 EGP",
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     Equipments: "123, Internet St",
  //     PropertyType: "Commercial",
  //     AmountPaid: "12,000,000 EGP",
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     Equipments: "123, Internet St",
  //     PropertyType: "Commercial",
  //     AmountPaid: "8,000,000 EGP",
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     Equipments: "123, Internet St",
  //     PropertyType: "Commercial",
  //     AmountPaid: "12,000,000 EGP",
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     Equipments: "123, Internet St",
  //     PropertyType: "Residential",
  //     AmountPaid: "5,000,000 EGP",
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     Equipments: "123, Internet St",
  //     PropertyType: "Commercial",
  //     AmountPaid: "8,000,000 EGP",
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  //   {
  //     Equipments: "123, Internet St",
  //     PropertyType: "Residential",
  //     AmountPaid: "5,000,000 EGP",
  //     Seller: "01148996574",
  //     DateAcquired: "12 March 2024",
  //   },
  // ];

  useEffect(() => {
    // Fetch data from API
    const getAssetsData = async () => {
      const response = await fetch(
        `https://api.machinegenius.io/accounting/assets/get?limit=10&page=0&assetType=${assetsType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // check if the fetch request is an array of objects
      if (response.status === 401) {
        handleSignOut();
      } else {
        const data = await response.json();
        if (Array.isArray(data)) {
          console.log(data);
          setAssets(data);
        }
      }
    };

    try {
      getAssetsData();
    } catch (error) {
      console.log(error);
    }
  }, [assetsType]);

  return (
    <div className={`${styles.assets} pt-[1vw] overflow-hidden`}>
      <div className={"tabs " + styles.tabs}>
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Real Estate"
          defaultChecked
          onClick={() => setAssetsType(AssetsTypeEnum.RealEstate)}
        />
        <div className={`tab-content px-2 pt-[1.5vw] w-full overflow-hidden`}>
          <div className=" flex gap-2">
            <div className="mb-[3vh]">
              {/* Staff Member */}
              <h5 className=" mb-[1vh] font-semibold">Property Type</h5>
              <div className="w-[11.927vw]">
                {/* CustomSelectInput for staff members */}
                <CustomSelectInput
                  options={[
                    "All",
                    ...new Set(assets.map((asset) => asset.propertyType)),
                  ]}
                />
              </div>
            </div>
            <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Space</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>{sorting1}</span>
                <svg
                  onClick={() => {
                    sorting1 == "Ascend"
                      ? setSorting1("Descend")
                      : setSorting1("Ascend");
                  }}
                  className="cursor-pointer"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Amount Paid</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>{sorting2}</span>
                <svg
                  onClick={() => {
                    sorting2 == "Ascend"
                      ? setSorting2("Descend")
                      : setSorting2("Ascend");
                  }}
                  className="cursor-pointer"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Market Rate</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>{sorting3}</span>
                <svg
                  onClick={() => {
                    sorting3 == "Ascend"
                      ? setSorting3("Descend")
                      : setSorting3("Ascend");
                  }}
                  className="cursor-pointer"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Date Acquired</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>{sorting4}</span>
                <svg
                  onClick={() => {
                    sorting4 == "Ascend"
                      ? setSorting4("Descend")
                      : setSorting4("Ascend");
                  }}
                  className="cursor-pointer"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* Outer container for the table with specific styles applied */}
          <div
            className={`${styles.table} w-[85vw] rounded-xl overflow-y-hidden overflow-x-scroll px-2 max-w-full`}
          >
            {/* Header section of the table */}
            <div className={`${styles.tableHead} w-fit`}>
              <ul className="flex justify-between items-center border-b-2 border-b-[var(--dark)] w-full">
                {/* Mapping over the dataHeadRealEstate array to create table header columns */}
                {dataHeadRealEstate.map((e, i) => (
                  // Each header item has a minimum width and is evenly distributed
                  <li className={`w-[12.5%] min-w-[200px]`} key={i}>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            {/* Body section of the table with scrollable content */}
            <div
              className={`${styles.tableBody} w-fit overflow-y-scroll rounded-xl h-[53vh]`}
            >
              {/* Mapping over the dataRealEstate array to create table rows */}
              {assets.map((e: AssetsTypes, i) => {
                // Each row with styling applied and a border at the bottom
                const isRealEstate = (
                  asset: AssetsTypes
                ): asset is IRealEstateModel => "assetAddress" in asset;
                return isRealEstate(e) ? (
                  <ul
                    className="flex justify-between items-center border-b-2 border-b-[#2A2B2A4A] w-full"
                    key={i}
                  >
                    {/* Property address column */}
                    <li className={`w-[12.5%] min-w-[200px]`}>
                      {e.assetAddress}
                    </li>
                    {/* Property type column with dynamic background color */}
                    <li className={`w-[12.5%] min-w-[200px]`}>
                      <span
                        className="p-2 rounded-md"
                        style={{
                          backgroundColor: `${getRandomBackgroundColor()}`,
                        }}
                      >
                        {e.propertyType}
                      </span>
                    </li>
                    {/* Space column */}
                    <li className={`w-[12.5%] min-w-[200px]`}>{e.space}</li>
                    {/* Amount paid column */}
                    <li className={`w-[12.5%] min-w-[200px]`}>
                      {e.amountPaid}
                    </li>
                    {/* Market rate column */}
                    <li className={`w-[12.5%] min-w-[200px]`}>
                      {e.marketRate}
                    </li>
                    {/* Date acquired column */}
                    {/* Ratings column with custom star rating component */}
                    <li className={`w-[12.5%] min-w-[200px] text-[#E1C655]`}>
                      {rating(e.ratings)}
                    </li>
                    {/* Seller column */}
                    <li className={`w-[12.5%] min-w-[200px]`}>
                      {e.sellerPhoneNumber}
                    </li>
                    {/* Date acquired column */}
                    <li className={`w-[12.5%] min-w-[200px]`}>
                      {e.dateAcquired}
                    </li>
                  </ul>
                ) : null;
              })}
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Equipments"
          onClick={() => setAssetsType(AssetsTypeEnum.Equipment)}
        />
        <div className={`tab-content px-2 pt-[1.5vw] overflow-hidden`}>
          <div className=" flex gap-2">
            <div className="mb-[3vh]">
              {/* Staff Member */}
              <h5 className=" mb-[1vh] font-semibold">Property Type</h5>
              <div className="w-[11.927vw]">
                {/* CustomSelectInput for staff members */}
                <CustomSelectInput
                  options={[
                    "All",
                    ...new Set(assets.map((asset) => asset.propertyType)),
                  ]}
                />
              </div>
            </div>
            <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Space</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>Ascend</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Amount Paid</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>Ascend</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Market Rate</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>Ascend</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Date Acquired</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>Ascend</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* Outer container for the table with specific styles applied */}
          <div
            className={`${styles.table} w-[85vw] rounded-xl overflow-y-hidden overflow-x-scroll px-2 max-w-full`}
          >
            {/* Header section of the table */}
            <div className={`${styles.tableHead} w-fit`}>
              <ul className=" flex justify-between items-center border-b-2 border-b-[var(--dark)] w-full">
                {/* Each header item has a minimum width and is evenly
                distributed */}
                {headEquipment.map((e, i) => (
                  <li className="w-[20%] min-w-[320px]">{e}</li>
                ))}
              </ul>
            </div>
            <div
              className={`${styles.tableBody} w-fit overflow-y-auto h-[53vh]`}
            >
              {assets.map((e: AssetsTypes, i) => {
                const isEquipment = (
                  asset: AssetsTypes
                ): asset is IEquipmentModel => "equipmentName" in asset;
                return isEquipment(e) ? (
                  <ul className=" flex justify-between items-center border-b-2 border-b-[#2A2B2A4A] w-full">
                    <li className="w-[20%] min-w-[320px]">{e.equipmentName}</li>
                    <li className="w-[20%] min-w-[320px]">
                      <span
                        className="p-2 rounded-md"
                        style={{
                          backgroundColor: `${getRandomBackgroundColor()}`,
                        }}
                      >
                        {e.propertyType}
                      </span>
                    </li>
                    <li className="w-[20%] min-w-[320px]">{e.amountPaid}</li>
                    <li className="w-[20%] min-w-[320px]">
                      {e.sellerPhoneNumber}
                    </li>
                    <li className="w-[20%] min-w-[320px]">{e.dateAcquired}</li>
                  </ul>
                ) : null;
              })}
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Digital Assets"
          onClick={() => setAssetsType(AssetsTypeEnum.DigitalAsset)}
        />
        <div className={`tab-content px-2 pt-[1.5vw] overflow-hidden`}>
          <div className=" flex gap-2">
            <div className="mb-[3vh]">
              {/* Staff Member */}
              <h5 className=" mb-[1vh] font-semibold">Property Type</h5>
              <div className="w-[11.927vw]">
                {/* CustomSelectInput for staff members */}
                <CustomSelectInput
                  options={[
                    "All",
                    ...new Set(assets.map((asset) => asset.propertyType)),
                  ]}
                />
              </div>
            </div>
            <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Space</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>Ascend</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Amount Paid</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>Ascend</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Market Rate</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>Ascend</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
            <div className="mb-[3vh]">
              <h5 className=" mb-[1vh] font-semibold">Date Acquired</h5>
              <div className="border-[var(--dark)] border-[1px] rounded-md flex justify-between items-center px-[0.677vw] w-[11.927vw] py-[0.3vw]">
                <span>Ascend</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721066 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139325 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139325 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* Outer container for the table with specific styles applied */}
          <div
            className={`${styles.table} w-[85vw] rounded-xl overflow-y-hidden overflow-x-scroll px-2 max-w-full`}
          >
            {/* Header section of the table */}
            <div className={`${styles.tableHead} w-fit`}>
              <ul className="flex justify-between items-center border-b-2 border-b-[var(--dark)] w-full">
                {/* Mapping over the dataHeadRealEstate array to create table header columns */}
                {dataHeadDigitalAsset.map((e, i) => (
                  // Each header item has a minimum width and is evenly distributed
                  <li className={`w-[12.5%] min-w-[200px]`} key={i}>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            {/* Body section of the table with scrollable content */}
            <div className={`${styles.tableBody} w-full rounded-xl h-[53vh]`}>
              {/* Mapping over the dataRealEstate array to create table rows */}
              {assets.map((e: AssetsTypes, i) => {
                // Each row with styling applied and a border at the bottom
                const isDigitalAsset = (
                  asset: AssetsTypes
                ): asset is IDigitalAssetModel => "TTMRevenue" in asset;
                return isDigitalAsset(e) ? (
                  <ul
                    className="flex justify-between items-center border-b-2 border-b-[#2A2B2A4A] w-fit"
                    key={i}
                  >
                    <li className="w-[12.5%] min-w-[200px]">{e.assetName}</li>
                    <li className="w-[12.5%] min-w-[200px]">
                      {e.assetAddress}
                    </li>
                    <li className="w-[12.5%] min-w-[200px]">{e.amountPaid}</li>
                    <li className="w-[12.5%] min-w-[200px]">{e.marketRate}</li>
                    <li className="w-[12.5%] min-w-[200px]">
                      {e.sellerPhoneNumber}
                    </li>
                    <li className="w-[12.5%] min-w-[200px]">
                      {rating(e.ratings)}
                    </li>
                    <li className="w-[12.5%] min-w-[200px]">{e.TTMProfit}</li>
                    <li className="w-[12.5%] min-w-[200px]">{e.TTMRevenue}</li>
                    <li className="w-[12.5%] min-w-[200px]">
                      {e.dateAcquired}
                    </li>
                  </ul>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
