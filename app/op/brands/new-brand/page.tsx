"use client";
import React, { useContext } from "react";
import styles from "./newBrand.module.css";
import "./newBrand.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { addIcon, backIcon } from "@/app/_utils/svgIcons";
import { useRouter } from "next/navigation";
import CustomDatePicker from "@/app/_components/DatePicker/CustomDatePicker";
import AddSubBrandModal from "./_AddSubBrandModal/AddSubBrandModal";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import useSessionStorage from "@/app/_hooks/useSessionStorage";

const subBrands = Array.from(
  { length: 20 },
  (_, index) => `Sub-brand ${index + 1}`
);

function InnerInfoCard({}: {}) {
  return (
    <div className={`${styles.info} p-[1vw] rounded-3xl`}>
      <div className="flex justify-between items-center pb-[0.6vw] mb-[0.5vw] border-b-[var(--dark)] border-b-[1px]">
        <h4>subBrandTitle</h4>
        <span className={`px-[0.4vw] py-[0.1vw] font-medium rounded-[--4px]`}>
          subBrandNiche
        </span>
      </div>
      <h5 className=" mb-[0.5vw]">Description</h5>
      <p className=" mb-[0.5vw]">subBrandDescription</p>
      <div className=" flex justify-between items-center">
        <h5>Acquisition Date</h5>
        <span className={`${styles.dateSpan} text-[#ACACAC]`}>
          subBrandAcquisitionDate
        </span>
      </div>
    </div>
  );
}

// ===== Start Account Data Types =====
interface IRedditAccountData {
  appID: string;
  appSecret: string;
  username: string;
  password: string;
}
interface ITelegramAccountData {
  token: string;
}
interface ITwetterAccountData {
  ConsumerKey: string;
  ConsumerSecret: string;
  AccessToken: string;
  TokenSecret: string;
  BearerToken: string;
}
interface ILinkedInAccountData {
  token: string;
  owner: string;
}
interface IFacebookInAccountData {
  tokenPage?: string;
  longAccessToken?: string;
  pageID?: string;
  client_id?: string;
  client_secret?: string;
  email?: string;
  password?: string;
  cookies?: string;
}
interface IYoutubeAccountData {
  client_id: string;
  client_secret: string;
  redirect_uris: string;
  token?: string;
}
interface IAccount {
  platform:
    | "REDDIT"
    | "TELEGRAM"
    | "TWETTER"
    | "LINKEDIN"
    | "FACEBOOK"
    | "YOUTUBE";
  account:
    | IRedditAccountData
    | ITelegramAccountData
    | ITwetterAccountData
    | ILinkedInAccountData
    | IFacebookInAccountData
    | IYoutubeAccountData;
}
// ===== End Account Data Types =====

const Page = () => {
  const { authState, handleSignOut } = useContext(globalContext);
  const router = useRouter();
  const [pageState, setPageState] = useSessionStorage<{
    isLoading: boolean;
    brandName: string;
    brandDescription: string;
    brandNiche: "" | "politics" | "entertainment" | "finance";
    brandAquisitionDate: number;
    accounts: IAccount[];
  }>("OP-addNewBrand", {
    isLoading: false,
    brandName: "",
    brandDescription: "",
    brandNiche: "",
    brandAquisitionDate: new Date().getTime(),
    accounts: [],
  });

  async function handleAddNewBrand() {
    // if (!postCaption) {
    //   toast.error("No post caption provided!");
    //   return;
    // } else if (!selectedBrandId) {
    //   toast.error("No brand selected!");
    //   return;
    // }
    setPageState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/add-brand-all-data`,
        {
          method: "POST",
          body: JSON.stringify({}),
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
        toast.success("Brand added successfully!", {
          duration: 3000,
        });
        router.replace("/op/brands");
      } else {
        toast.error("Something went wrong!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleAddNewBrand:", error);
      setPageState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  return (
    <div className={`${styles.newBrand} newBrand`}>
      <div className="flex items-center gap-[--10px] my-[0.8vw]">
        <span onClick={() => router.replace("/op/brands")}>{backIcon}</span>
        <h3>Add New Brand</h3>
      </div>

      <div className="grid grid-cols-5 w-full gap-[5vw] px-[1vw]">
        <div className={`${styles.form} col-span-2`}>
          <h4 className="mb-[1vw]">Brand Details</h4>

          <label htmlFor="brand_name">Brand Name*</label>
          <input
            type="text"
            id="brand_name"
            name="brand_name"
            // placeholder="Juice Box"
            className=" py-[0.6vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
          />

          <label className="mb-[0.7vw] inline-block" htmlFor="brand_niche">
            Niche*
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

          <label htmlFor="brand_description">Description*</label>
          <input
            type="text"
            id="brand_description"
            name="brand_description"
            // placeholder="51640615651463254"
            className=" py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
          />

          <label htmlFor="brand_acquisition_date">Acquisition Date*</label>
          <CustomDatePicker
            getDateTimeValue={(value: any) => {
              setPageState((prev: any) => ({
                ...prev,
                brandAquisitionDate: value,
              }));
            }}
          />

          {/* Sub-brands */}
          <div
            className={`${styles.card} px-[1vw] pt-[0.8vw] rounded-3xl mt-[0.9vw]`}
          >
            <div className="flex justify-between items-center pb-[0.7vw] border-b-[1px] border-b-[#2A2B2A] mb-[0.8vw]">
              <h3>Sub-brand</h3>
              <AddSubBrandModal
                btnColor="black"
                modalTitle="Add Sub-brand"
                btnIcon={addIcon}
              />
            </div>

            <div className=" overflow-y-scroll h-[23vh] pr-2 py-[0.2vw]">
              {subBrands.map((brand, index) => (
                <InnerInfoCard key={index} />
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.socialAccordions} col-span-3`}>
          <div className="flex justify-between items-center mb-[1vw]">
            <h4>Social Media</h4>
          </div>

          <div className="flex justify-between h-[62vh] overflow-y-scroll px-[0.5vw] gap-[1.5vw]">
            <div className="w-full">
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                <input type="radio" name="my-accordion-2" />

                <div className="collapse-title text-xl font-semibold">
                  Reddit
                </div>

                <div className="collapse-content">
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Username*
                  </label>

                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Password*</label>

                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Link*</label>

                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Handle*</label>

                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>

              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                <input type="radio" name="my-accordion-2" />

                <div className="collapse-title text-xl font-semibold">
                  Reddit
                </div>

                <div className="collapse-content">
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Username*
                  </label>

                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Password*</label>

                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Link*</label>

                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Handle*</label>

                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>

              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                <input type="radio" name="my-accordion-2" />

                <div className="collapse-title text-xl font-semibold">
                  Reddit
                </div>

                <div className="collapse-content">
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Username*
                  </label>

                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Password*</label>

                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Link*</label>

                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Handle*</label>

                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                <input type="radio" name="my-accordion-2" />

                <div className="collapse-title text-xl font-semibold">
                  Reddit
                </div>

                <div className="collapse-content">
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Username*
                  </label>

                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Password*</label>

                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Link*</label>

                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Handle*</label>

                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>

              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                <input type="radio" name="my-accordion-2" />

                <div className="collapse-title text-xl font-semibold">
                  Reddit
                </div>

                <div className="collapse-content">
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Username*
                  </label>

                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Password*</label>

                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Link*</label>

                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Handle*</label>

                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>

              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                <input type="radio" name="my-accordion-2" />

                <div className="collapse-title text-xl font-semibold">
                  Reddit
                </div>

                <div className="collapse-content">
                  <label
                    htmlFor=""
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Username*
                  </label>

                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Password*</label>

                  <input
                    type="text"
                    placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Link*</label>

                  <input
                    type="text"
                    placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />

                  <label htmlFor="">Handle*</label>

                  <input
                    type="text"
                    placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-fit ms-auto">
        <CustomBtn
          btnColor="black"
          word="Save"
          onClick={handleAddNewBrand}
          disabled={pageState.isLoading}
        />
      </div>
    </div>
  );
};

export default Page;
