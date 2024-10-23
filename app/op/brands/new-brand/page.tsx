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

function InnerInfoCard({ brand }: { brand: ISubBrand }) {
  return (
    <div className={`${styles.info} p-[1vw] rounded-3xl`}>
      <div className="flex justify-between items-center pb-[0.6vw] mb-[0.5vw] border-b-[var(--dark)] border-b-[1px]">
        <h4>{brand.subbrand.brand_name}</h4>
      </div>
      <h5 className=" mb-[0.5vw]">Description</h5>
      <p className=" mb-[0.5vw]">{brand.subbrand.description}</p>
      <div className=" flex justify-between items-center">
        <h5>Acquisition Date</h5>
        <span className={`${styles.dateSpan} text-[#ACACAC]`}>
          {new Date(brand.subbrand.aquisition_date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

// ===== Start Account Data Types =====
export interface IRedditAccountData {
  appID: string;
  appSecret: string;
  username: string;
  password: string;
}
export interface ITelegramAccountData {
  token: string;
}
export interface ITwetterAccountData {
  ConsumerKey: string;
  ConsumerSecret: string;
  AccessToken: string;
  TokenSecret: string;
  BearerToken: string;
}
export interface ILinkedInAccountData {
  token: string;
  owner: string;
}
export interface IFacebookInAccountData {
  tokenPage?: string;
  longAccessToken?: string;
  pageID?: string;
  client_id?: string;
  client_secret?: string;
  email?: string;
  password?: string;
}
export interface IYoutubeAccountData {
  client_id: string;
  client_secret: string;
  redirect_uris: string;
  token?: string;
}
export interface IAccount {
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
// ===== Start SubBrand Data Types =====
export interface ISubBrandData {
  brand_name: string;
  description: string;
  aquisition_date: number;
}

export interface ISubBrand {
  subbrand: ISubBrandData;
  accounts: IAccount[];
}
// ===== End SubBrand Data Types =====
// ===== Start Brand Data Types =====
export interface IBrandData {
  brand_name: string;
  description: string;
  niche: "" | "politics" | "entertainment" | "finance";
  aquisition_date: number;
  accounts: IAccount[];
  subBrands: ISubBrand[];
}
// ===== End Brand Data Types =====
// ===== Start Page State Data Types =====
export interface IAddNewBrandPageState {
  isLoading: boolean;
  brandName: string;
  brandDescription: string;
  brandNiche: "" | "politics" | "entertainment" | "finance";
  brandAquisitionDate: number;
  accounts: IAccount[];
  subBrands: ISubBrand[];
}
// ===== End Page State Data Types =====

const Page = () => {
  const { authState, handleSignOut } = useContext(globalContext);
  const router = useRouter();
  const [pageState, setPageState] = useSessionStorage<IAddNewBrandPageState>(
    "OP-addNewBrand",
    {
      isLoading: false,
      brandName: "",
      brandDescription: "",
      brandNiche: "",
      brandAquisitionDate: new Date().getTime(),
      accounts: [],
      subBrands: [],
    }
  );

  // ===== Start Social Media Accounts Data =====
  // Reddit account data
  const [redditAccountData, setRedditAccountData] =
    useSessionStorage<IRedditAccountData>(
      "OP-addNewBrand-mainBrand-redditAccountData",
      {
        appID: "",
        appSecret: "",
        username: "",
        password: "",
      }
    );

  // Telegram account data
  const [telegramAccountData, setTelegramAccountData] =
    useSessionStorage<ITelegramAccountData>(
      "OP-addNewBrand-mainBrand-telegramAccountData",
      {
        token: "",
      }
    );

  // Twitter account data
  const [twitterAccountData, setTwitterAccountData] =
    useSessionStorage<ITwetterAccountData>(
      "OP-addNewBrand-mainBrand-twitterAccountData",
      {
        ConsumerKey: "",
        ConsumerSecret: "",
        AccessToken: "",
        TokenSecret: "",
        BearerToken: "",
      }
    );

  // LinkedIn account data
  const [linkedInAccountData, setLinkedInAccountData] =
    useSessionStorage<ILinkedInAccountData>(
      "OP-addNewBrand-mainBrand-linkedInAccountData",
      {
        token: "",
        owner: "",
      }
    );

  // Facebook account data
  const [facebookAccountData, setFacebookAccountData] =
    useSessionStorage<IFacebookInAccountData>(
      "OP-addNewBrand-mainBrand-facebookAccountData",
      {
        tokenPage: "",
        longAccessToken: "",
        pageID: "",
        client_id: "",
        client_secret: "",
        email: "",
        password: "",
      }
    );

  // YouTube account data
  const [youtubeAccountData, setYoutubeAccountData] =
    useSessionStorage<IYoutubeAccountData>(
      "OP-addNewBrand-mainBrand-youtubeAccountData",
      {
        client_id: "",
        client_secret: "",
        redirect_uris: "",
        token: "",
      }
    );
  // ===== End Social Media Accounts Data =====

  // ===== Start Validation Functions =====
  function isRedditAccountDataValid(data: IRedditAccountData) {
    return !!(data.appID && data.appSecret && data.username && data.password);
  }

  function isTelegramAccountDataValid(data: ITelegramAccountData) {
    return !!data.token;
  }

  function isTwitterAccountDataValid(data: ITwetterAccountData) {
    return !!(
      data.ConsumerKey &&
      data.ConsumerSecret &&
      data.AccessToken &&
      data.TokenSecret &&
      data.BearerToken
    );
  }

  function isLinkedInAccountDataValid(data: ILinkedInAccountData) {
    return !!(data.token && data.owner);
  }

  function isFacebookAccountDataValid(data: IFacebookInAccountData) {
    return !!(
      data.tokenPage &&
      data.longAccessToken &&
      data.pageID &&
      data.client_id &&
      data.client_secret &&
      data.email &&
      data.password
    );
  }

  function isYoutubeAccountDataValid(data: IYoutubeAccountData) {
    return !!(data.client_id && data.client_secret && data.redirect_uris);
  }
  // ===== End Validation Functions =====

  async function handleAddNewBrand() {
    setPageState((prev) => ({ ...prev, isLoading: true }));
    try {
      // ===== Start Validation =====
      if (!pageState.brandName) {
        toast.error("Brand name is required!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
      if (!pageState.brandNiche) {
        toast.error("Brand niche is required!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
      if (!pageState.brandDescription) {
        toast.error("Brand description is required!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      // Build accounts array
      let accounts: IAccount[] = [];

      if (isRedditAccountDataValid(redditAccountData)) {
        accounts.push({
          platform: "REDDIT",
          account: redditAccountData,
        });
      }

      if (isTelegramAccountDataValid(telegramAccountData)) {
        accounts.push({
          platform: "TELEGRAM",
          account: telegramAccountData,
        });
      }

      if (isTwitterAccountDataValid(twitterAccountData)) {
        accounts.push({
          platform: "TWETTER",
          account: twitterAccountData,
        });
      }

      if (isLinkedInAccountDataValid(linkedInAccountData)) {
        accounts.push({
          platform: "LINKEDIN",
          account: linkedInAccountData,
        });
      }

      if (isFacebookAccountDataValid(facebookAccountData)) {
        accounts.push({
          platform: "FACEBOOK",
          account: facebookAccountData,
        });
      }

      if (isYoutubeAccountDataValid(youtubeAccountData)) {
        accounts.push({
          platform: "YOUTUBE",
          account: youtubeAccountData,
        });
      }

      // Build brandData object
      const brandData: IBrandData = {
        brand_name: pageState.brandName,
        description: pageState.brandDescription,
        niche: pageState.brandNiche,
        aquisition_date: pageState.brandAquisitionDate,
        accounts: accounts,
        subBrands: pageState.subBrands,
      };

      // ===== End Validation =====

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/add-brand-all-data`,
        {
          method: "POST",
          body: JSON.stringify({
            brandData,
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
        toast.success("Brand added successfully!", {
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
            value={pageState.brandName}
            onChange={(e) => {
              setPageState((prev) => ({ ...prev, brandName: e.target.value }));
            }}
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
            value={pageState.brandDescription}
            onChange={(e) => {
              setPageState((prev) => ({
                ...prev,
                brandDescription: e.target.value,
              }));
            }}
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
                setSubBrandInPageState={setPageState}
              />
            </div>

            <div className=" overflow-y-scroll h-[23vh] pr-2 py-[0.2vw]">
              {pageState.subBrands.length > 0 ? (
                pageState.subBrands.map((brand, index) => (
                  <InnerInfoCard key={index} brand={brand} />
                ))
              ) : (
                <span className="text-center block w-full">
                  No sub-brands found!
                </span>
              )}
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
                    htmlFor="reddit_app_id"
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    App ID*
                  </label>

                  <input
                    type="text"
                    id="reddit_app_id"
                    // placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={redditAccountData.appID}
                    onChange={(e) => {
                      setRedditAccountData((prev) => ({
                        ...prev,
                        appID: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="reddit_app_secret">App Secret*</label>

                  <input
                    type="text"
                    id="reddit_app_secret"
                    // placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={redditAccountData.appSecret}
                    onChange={(e) => {
                      setRedditAccountData((prev) => ({
                        ...prev,
                        appSecret: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="reddit_username">Username*</label>

                  <input
                    type="text"
                    id="reddit_username"
                    // placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={redditAccountData.username}
                    onChange={(e) => {
                      setRedditAccountData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="reddit_password">Password*</label>

                  <input
                    type="text"
                    id="reddit_password"
                    // placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={redditAccountData.password}
                    onChange={(e) => {
                      setRedditAccountData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                <input type="radio" name="my-accordion-2" />

                <div className="collapse-title text-xl font-semibold">
                  Telegram
                </div>

                <div className="collapse-content">
                  <label
                    htmlFor="telegram_token"
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Token*
                  </label>

                  <input
                    type="text"
                    id="telegram_token"
                    // placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={telegramAccountData.token}
                    onChange={(e) => {
                      setTelegramAccountData((prev) => ({
                        ...prev,
                        token: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                <input type="radio" name="my-accordion-2" />

                <div className="collapse-title text-xl font-semibold">
                  Twitter
                </div>

                <div className="collapse-content">
                  <label
                    htmlFor="twitter_consumer_key"
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Consumer Key*
                  </label>

                  <input
                    type="text"
                    id="twitter_consumer_key"
                    // placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={twitterAccountData.ConsumerKey}
                    onChange={(e) => {
                      setTwitterAccountData((prev) => ({
                        ...prev,
                        ConsumerKey: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="twitter_consumer_secret">
                    Consumer Secret*
                  </label>

                  <input
                    type="text"
                    id="twitter_consumer_secret"
                    // placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={twitterAccountData.ConsumerSecret}
                    onChange={(e) => {
                      setTwitterAccountData((prev) => ({
                        ...prev,
                        ConsumerSecret: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="twitter_access_token">Access Token*</label>

                  <input
                    type="text"
                    id="twitter_access_token"
                    // placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={twitterAccountData.AccessToken}
                    onChange={(e) => {
                      setTwitterAccountData((prev) => ({
                        ...prev,
                        AccessToken: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="twitter_token_secret">Token Secret*</label>

                  <input
                    type="text"
                    id="twitter_token_secret"
                    // placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={twitterAccountData.TokenSecret}
                    onChange={(e) => {
                      setTwitterAccountData((prev) => ({
                        ...prev,
                        TokenSecret: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="twitter_bearer_token">Bearer Token*</label>

                  <input
                    type="text"
                    id="twitter_bearer_token"
                    // placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={twitterAccountData.BearerToken}
                    onChange={(e) => {
                      setTwitterAccountData((prev) => ({
                        ...prev,
                        BearerToken: e.target.value,
                      }));
                    }}
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
                  LinkedIn
                </div>

                <div className="collapse-content">
                  <label
                    htmlFor="linkedin_token"
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Token*
                  </label>

                  <input
                    type="text"
                    id="linkedin_token"
                    // placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={linkedInAccountData.token}
                    onChange={(e) => {
                      setLinkedInAccountData((prev) => ({
                        ...prev,
                        token: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="linkedin_owner">Owner*</label>

                  <input
                    type="text"
                    id="linkedin_owner"
                    // placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={linkedInAccountData.owner}
                    onChange={(e) => {
                      setLinkedInAccountData((prev) => ({
                        ...prev,
                        owner: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                <input type="radio" name="my-accordion-2" />

                <div className="collapse-title text-xl font-semibold">
                  Facebook
                </div>

                <div className="collapse-content">
                  <label
                    htmlFor="facebook_token_page"
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Token Page*
                  </label>

                  <input
                    type="text"
                    id="facebook_token_page"
                    // placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={facebookAccountData.tokenPage}
                    onChange={(e) => {
                      setFacebookAccountData((prev) => ({
                        ...prev,
                        tokenPage: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="facebook_long_access_token">
                    Long Access Token*
                  </label>

                  <input
                    type="text"
                    id="facebook_long_access_token"
                    // placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={facebookAccountData.longAccessToken}
                    onChange={(e) => {
                      setFacebookAccountData((prev) => ({
                        ...prev,
                        longAccessToken: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="facebook_page_id">Page ID*</label>

                  <input
                    type="text"
                    id="facebook_page_id"
                    // placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={facebookAccountData.pageID}
                    onChange={(e) => {
                      setFacebookAccountData((prev) => ({
                        ...prev,
                        pageID: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="facebook_client_id">Client ID*</label>

                  <input
                    type="text"
                    id="facebook_client_id"
                    // placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={facebookAccountData.client_id}
                    onChange={(e) => {
                      setFacebookAccountData((prev) => ({
                        ...prev,
                        client_id: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="facebook_client_secret">Client Secret*</label>

                  <input
                    type="text"
                    id="facebook_client_secret"
                    // placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={facebookAccountData.client_secret}
                    onChange={(e) => {
                      setFacebookAccountData((prev) => ({
                        ...prev,
                        client_secret: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="facebook_email">Email*</label>

                  <input
                    type="email"
                    id="facebook_email"
                    // placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={facebookAccountData.email}
                    onChange={(e) => {
                      setFacebookAccountData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="facebook_password">Password*</label>

                  <input
                    type="password"
                    id="facebook_password"
                    // placeholder="@username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={facebookAccountData.password}
                    onChange={(e) => {
                      setFacebookAccountData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div
                className={`${styles.accordion} collapse collapse-arrow bg-base-200`}
              >
                <input type="radio" name="my-accordion-2" />

                <div className="collapse-title text-xl font-semibold">
                  Youtube
                </div>

                <div className="collapse-content">
                  <label
                    htmlFor="youtube_client_id"
                    className="pt-[0.8vw] border-t-[1px] border-t-[var(--dark)] w-full block"
                  >
                    Client ID*
                  </label>

                  <input
                    type="text"
                    id="youtube_client_id"
                    // placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={youtubeAccountData.client_id}
                    onChange={(e) => {
                      setYoutubeAccountData((prev) => ({
                        ...prev,
                        client_id: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="youtube_client_secret">Client Secret*</label>

                  <input
                    type="text"
                    id="youtube_client_secret"
                    // placeholder="username"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={youtubeAccountData.client_secret}
                    onChange={(e) => {
                      setYoutubeAccountData((prev) => ({
                        ...prev,
                        client_secret: e.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="youtube_redirect_uris">Redirect URIs*</label>

                  <input
                    type="text"
                    id="youtube_redirect_uris"
                    // placeholder="Account url"
                    className="py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                    value={youtubeAccountData.redirect_uris}
                    onChange={(e) => {
                      setYoutubeAccountData((prev) => ({
                        ...prev,
                        redirect_uris: e.target.value,
                      }));
                    }}
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
