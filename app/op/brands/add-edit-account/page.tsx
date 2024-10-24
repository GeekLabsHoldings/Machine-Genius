"use client";
import React, { useContext, useState } from "react";
import styles from "./newBrand.module.css";
import "./newBrand.css";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { backIcon } from "@/app/_utils/svgIcons";
import { useRouter } from "next/navigation";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";
import useSessionStorage from "@/app/_hooks/useSessionStorage";
const platformsOptions = [
  "Facebook",
  "Reddit",
  "Telegram",
  "Twitter",
  "LinkedIn",
  "Youtube",
  // "Instagram",
];
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
  selectedBrandId: string;
  selectedPlatform: string;
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
  const { authState, handleSignOut, globalBrands, brandMap } =
    useContext(globalContext);
  const router = useRouter();
  const [pageState, setPageState] = useState<IAddNewBrandPageState>({
    selectedBrandId: "",
    selectedPlatform: "",
    isLoading: false,
    brandName: "",
    brandDescription: "",
    brandNiche: "",
    brandAquisitionDate: new Date().getTime(),
    accounts: [],
    subBrands: [],
  });

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

  async function handleAddChangeAccount() {
    if (pageState.selectedPlatform === "FACEBOOK") {
      if (
        !facebookAccountData.tokenPage ||
        !facebookAccountData.longAccessToken
      ) {
        toast.error("Facebook token and long access token are required!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
      if (!facebookAccountData.pageID) {
        toast.error("Page ID is required for Facebook!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
      if (
        !facebookAccountData.client_id ||
        !facebookAccountData.client_secret
      ) {
        toast.error("Client ID and client secret are required for Facebook!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
    } else if (pageState.selectedPlatform === "REDDIT") {
      if (
        !redditAccountData.appID ||
        !redditAccountData.appSecret ||
        !redditAccountData.username ||
        !redditAccountData.password
      ) {
        toast.error(
          "App ID, App Secret, Username, and Password are required for Reddit!"
        );
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
    } else if (pageState.selectedPlatform === "TELEGRAM") {
      if (!telegramAccountData.token) {
        toast.error("Token is required for Telegram!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
    } else if (pageState.selectedPlatform === "TWETTER") {
      if (
        !twitterAccountData.ConsumerKey ||
        !twitterAccountData.ConsumerSecret ||
        !twitterAccountData.AccessToken ||
        !twitterAccountData.TokenSecret ||
        !twitterAccountData.BearerToken
      ) {
        toast.error(
          "All Twitter credentials are required: Consumer Key, Consumer Secret, Access Token, Token Secret, and Bearer Token!"
        );
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
    } else if (pageState.selectedPlatform === "LINKEDIN") {
      if (!linkedInAccountData.token || !linkedInAccountData.owner) {
        toast.error("Token and Owner are required for LinkedIn!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
    } else if (pageState.selectedPlatform === "YOUTUBE") {
      if (
        !youtubeAccountData.client_id ||
        !youtubeAccountData.client_secret ||
        !youtubeAccountData.redirect_uris
      ) {
        toast.error(
          "Client ID, Client Secret, and Redirect URIs are required for YouTube!"
        );
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
    }
    try {
      setPageState((prev) => ({ ...prev, isLoading: true }));
      // ===== Start Validation =====
      if (!pageState.selectedBrandId) {
        toast.error("Brand is required!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }
      if (!pageState.selectedPlatform) {
        toast.error("Platform is required!");
        setPageState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      // ===== End Validation =====

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ceo/brand/${pageState.selectedBrandId}/add-change-account`,
        {
          method: "POST",
          body: JSON.stringify({
            platform: pageState.selectedPlatform,
            // add data for the selected platform
            ...(pageState.selectedPlatform === "REDDIT" && {
              appID: redditAccountData.appID,
              appSecret: redditAccountData.appSecret,
              username: redditAccountData.username,
              password: redditAccountData.password,
            }),
            ...(pageState.selectedPlatform === "TELEGRAM" && {
              token: telegramAccountData.token,
            }),
            ...(pageState.selectedPlatform === "TWETTER" && {
              ConsumerKey: twitterAccountData.ConsumerKey,
              ConsumerSecret: twitterAccountData.ConsumerSecret,
              AccessToken: twitterAccountData.AccessToken,
              TokenSecret: twitterAccountData.TokenSecret,
              BearerToken: twitterAccountData.BearerToken,
            }),
            ...(pageState.selectedPlatform === "LINKEDIN" && {
              token: linkedInAccountData.token,
              owner: linkedInAccountData.owner,
            }),
            ...(pageState.selectedPlatform === "FACEBOOK" && {
              tokenPage: facebookAccountData.tokenPage,
              longAccessToken: facebookAccountData.longAccessToken,
              pageID: facebookAccountData.pageID,
              client_id: facebookAccountData.client_id,
              client_secret: facebookAccountData.client_secret,
              email: facebookAccountData.email,
              password: facebookAccountData.password,
            }),
            ...(pageState.selectedPlatform === "YOUTUBE" && {
              client_id: youtubeAccountData.client_id,
              client_secret: youtubeAccountData.client_secret,
              redirect_uris: youtubeAccountData.redirect_uris,
              token: youtubeAccountData.token,
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
      } else {
        toast.success("Account added successfully!", {
          duration: 3000,
        });
        router.replace("/op/brands");
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
        <h3>Add/Edit Account</h3>
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
                      selectedBrandId: brandMap[value],
                    }));
                  }}
                />
              ) : (
                <span className="custom-loader"></span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="platform" className="!mb-[0.30vw] block">
              Platform*
            </label>
            <div className={`${styles.inputWrapper}`}>
              <CustomSelectInput
                label="Select Platform"
                options={platformsOptions}
                hoverColor="hover:bg-[#E1C655]"
                getValue={(value: string) => {
                  setPageState((prev) => ({
                    ...prev,
                    selectedPlatform: value.toUpperCase(),
                  }));
                }}
              />
            </div>
          </div>
        </div>

        <div className={`${styles.socialAccordions} col-span-3`}>
          <div className="flex justify-between items-center mb-[1vw]">
            <h4>Social Media</h4>
          </div>

          <div className="flex justify-between h-[62vh] overflow-y-scroll px-[0.5vw] gap-[1.5vw]">
            <div className="w-full">
              {pageState.selectedPlatform === "" && (
                <span>Please select a platform!</span>
              )}

              {pageState.selectedPlatform === "REDDIT" && (
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
              )}

              {pageState.selectedPlatform === "TELEGRAM" && (
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
              )}

              {pageState.selectedPlatform === "TWITTER" && (
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
              )}
            </div>

            <div className="w-full">
              {pageState.selectedPlatform === "LINKEDIN" && (
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
              )}

              {pageState.selectedPlatform === "FACEBOOK" && (
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

                    <label htmlFor="facebook_client_secret">
                      Client Secret*
                    </label>

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
              )}

              {pageState.selectedPlatform === "YOUTUBE" && (
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

                    <label htmlFor="youtube_client_secret">
                      Client Secret*
                    </label>

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

                    <label htmlFor="youtube_redirect_uris">
                      Redirect URIs*
                    </label>

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
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-fit ms-auto">
        <CustomBtn
          btnColor="black"
          word="Save"
          onClick={handleAddChangeAccount}
          // disabled={pageState.isLoading}
        />
      </div>
    </div>
  );
};

export default Page;
