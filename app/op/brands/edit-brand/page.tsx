"use client";
import React, { useContext, useState } from "react";
import styles from "./editBrand.module.css";
import "./editBrand.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { backIcon } from "@/app/_utils/svgIcons";
import { useRouter } from "next/navigation";
import CustomDatePicker from "@/app/_components/DatePicker/CustomDatePicker";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";

// ===== Start Page State Data Types =====
export interface IAddNewBrandPageState {
  isLoading: boolean;
  brandId: string;
  brandName: string;
  brandDescription: string;
  brandNiche: "" | "politics" | "entertainment" | "finance";
  brandAquisitionDate: number;
}
// ===== End Page State Data Types =====

const Page = () => {
  const { authState, handleSignOut, globalBrands, brandMap } =
    useContext(globalContext);
  const router = useRouter();
  const [pageState, setPageState] = useState<IAddNewBrandPageState>({
    isLoading: false,
    brandId: "",
    brandName: "",
    brandDescription: "",
    brandNiche: "",
    brandAquisitionDate: 0,
  });

  async function handleEditBrand() {
    if (!pageState.brandId) {
      toast.error("Brand is required!");
      return;
    }
    try {
      // setPageState((prev) => ({ ...prev, isLoading: true }));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/${pageState.brandId}/edit-brand`,
        {
          method: "POST",
          body: JSON.stringify({
            ...(pageState.brandName !== "" && {
              brand_name: pageState.brandName,
            }),
            ...(pageState.brandDescription !== "" && {
              description: pageState.brandDescription,
            }),
            ...(pageState.brandNiche !== "" && { niche: pageState.brandNiche }),
            ...(pageState.brandAquisitionDate !== 0 && {
              aquisition_date: pageState.brandAquisitionDate,
            }),
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      if (!res.ok) {
        toast.error("Something went wrong!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
      const json: any = await res.json();
      if (json && json.brand_name) {
        toast.success("Brand edited successfully!", {
          duration: 3000,
        });
        router.replace("/op/brands");
        setPageState((prev) => ({ ...prev, isLoading: false }));
      } else {
        toast.error("Something went wrong!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleEditBrand:", error);
      setPageState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  return (
    <div className={`${styles.newBrand} newBrand`}>
      <div className="flex items-center gap-[--10px] my-[0.8vw]">
        <span onClick={() => router.replace("/op/brands")}>{backIcon}</span>
        <h3>Edit New Brand</h3>
      </div>

      <div className="grid grid-cols-5 w-full gap-[5vw] px-[1vw]">
        <div className={`${styles.form} col-span-2`}>
          <h4 className="mb-[1vw]">Brand Details</h4>

          <div className="mb-[1vw]">
            <label htmlFor="brand" className="!mb-[0.30vw] block">
              Brand*
            </label>
            <div className={`${styles.inputWrapper}`}>
              {Array.isArray(globalBrands) && globalBrands.length > 0 ? (
                <CustomSelectInput
                  label={"Select Brand"}
                  options={globalBrands.map((brand) => brand.brandName) || []}
                  getValue={(value: string) => {
                    setPageState((prev) => ({
                      ...prev,
                      brandId: brandMap[value],
                    }));
                  }}
                />
              ) : (
                <span className="custom-loader"></span>
              )}
            </div>
          </div>

          <label htmlFor="brand_name">Brand Name</label>
          <input
            type="text"
            id="brand_name"
            name="brand_name"
            // placeholder="Juice Box"
            className=" py-[0.6vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
            value={pageState.brandName}
            onChange={(e) => {
              setPageState((prev) => ({ ...prev, brandName: e.target.value }));
            }}
          />

          <label className="mb-[0.7vw] inline-block" htmlFor="brand_niche">
            Niche
          </label>
          <div className=" w-[15vw] mb-[1.2vw]">
            <CustomSelectInput
              label={"Select Niche"}
              options={["Politics", "Entertainment", "Finance"]}
              getValue={(value: any) => {
                setPageState((prev: any) => ({
                  ...prev,
                  brandNiche: value.toLowerCase(),
                }));
              }}
            />
          </div>

          <label htmlFor="brand_description">Description</label>
          <input
            type="text"
            id="brand_description"
            name="brand_description"
            // placeholder="51640615651463254"
            className=" py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
            value={pageState.brandDescription}
            onChange={(e) => {
              setPageState((prev) => ({
                ...prev,
                brandDescription: e.target.value,
              }));
            }}
          />

          <label htmlFor="brand_acquisition_date">Acquisition Date</label>
          <CustomDatePicker
            getDateTimeValue={(value: any) => {
              setPageState((prev: any) => ({
                ...prev,
                brandAquisitionDate: value,
              }));
            }}
          />
        </div>
      </div>

      <div className="w-fit ms-auto">
        <CustomBtn
          btnColor="black"
          word="Save"
          onClick={handleEditBrand}
          disabled={pageState.isLoading}
        />
      </div>
    </div>
  );
};

export default Page;
