"use client";
import React, { useState } from "react";
import styles from "./AddSubBrandModal.module.css";
import "../newBrand.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import toast from "react-hot-toast";
import CustomDatePicker from "@/app/_components/DatePicker/CustomDatePicker";
import {
  IAccount,
  IAddNewBrandPageState,
  IFacebookInAccountData,
  ILinkedInAccountData,
  IRedditAccountData,
  ISubBrand,
  ITelegramAccountData,
  ITwetterAccountData,
  IYoutubeAccountData,
} from "../page";

// ===== Start Props Data Types =====
interface IProps {
  btnWord?: string; // Button text.
  btnIcon?: React.ReactElement; // Optional button icon.
  btnColor: "black" | "white"; // Button color.
  modalTitle: string; // Modal title text.
  setSubBrandInPageState: React.Dispatch<
    React.SetStateAction<IAddNewBrandPageState>
  >;
}
// ===== End Props Data Types =====

export default function AddSubBrandModal({
  modalTitle,
  btnWord,
  btnColor,
  btnIcon,
  setSubBrandInPageState,
}: IProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pageState, setPageState] = useState<{
    subBrandName: string;
    subBrandDescription: string;
    subBrandAquisitionDate: number;
    accounts: IAccount[];
  }>({
    subBrandName: "",
    subBrandDescription: "",
    subBrandAquisitionDate: new Date().getTime(),
    accounts: [],
  });

  // ===== Start Social Media Accounts Data =====
  // Reddit account data
  const [redditAccountData, setRedditAccountData] =
    useState<IRedditAccountData>({
      appID: "",
      appSecret: "",
      username: "",
      password: "",
    });

  // Telegram account data
  const [telegramAccountData, setTelegramAccountData] =
    useState<ITelegramAccountData>({
      token: "",
    });

  // Twitter account data
  const [twitterAccountData, setTwitterAccountData] =
    useState<ITwetterAccountData>({
      ConsumerKey: "",
      ConsumerSecret: "",
      AccessToken: "",
      TokenSecret: "",
      BearerToken: "",
    });

  // LinkedIn account data
  const [linkedInAccountData, setLinkedInAccountData] =
    useState<ILinkedInAccountData>({
      token: "",
      owner: "",
    });

  // Facebook account data
  const [facebookAccountData, setFacebookAccountData] =
    useState<IFacebookInAccountData>({
      tokenPage: "",
      longAccessToken: "",
      pageID: "",
      client_id: "",
      client_secret: "",
      email: "",
      password: "",
    });

  // YouTube account data
  const [youtubeAccountData, setYoutubeAccountData] =
    useState<IYoutubeAccountData>({
      client_id: "",
      client_secret: "",
      redirect_uris: "",
      token: "",
    });
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

  function handleAddSubBrand() {
    if (!pageState.subBrandName) {
      toast.error("Brand name is required!");
      setPageState((prev) => ({ ...prev, isLoading: false }));
      return;
    }
    if (!pageState.subBrandDescription) {
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

    // Build sub-brand object
    const subBrandObject: ISubBrand = {
      subbrand: {
        brand_name: pageState.subBrandName,
        description: pageState.subBrandDescription,
        aquisition_date: pageState.subBrandAquisitionDate,
      },
      accounts: accounts,
    };

    // Update page state
    setSubBrandInPageState((prev) => ({
      ...prev,
      subBrands: [...prev.subBrands, subBrandObject],
    }));
    handleClose();
  }
  return (
    <>
      <CustomBtn
        word={btnWord}
        btnColor={btnColor}
        icon={btnIcon}
        onClick={handleOpen}
        paddingVal="py-[0.2vw] px-[0.2vw]"
      />

      <Modal
        className={`${styles.modal} ${styles.newBrand} newBrand`}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className={`${styles.modalBox}`}>
            {/* 1. Modal Head */}
            <div className={`flex justify-between ${styles.createTicket}`}>
              {/* Modal title */}
              <h2>{modalTitle}</h2>
              {/* Close button */}
              <div
                onClick={() => {
                  handleClose();
                }}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.0125 13.9613L18.4214 21.3616C18.8145 21.7543 19.3477 21.9749 19.9037 21.9749C20.4597 21.9749 20.9929 21.7543 21.386 21.3616C21.7791 20.969 22 20.4364 22 19.881C22 19.3257 21.7791 18.7931 21.386 18.4004L13.9744 11L21.3846 3.59962C21.5792 3.40518 21.7335 3.17437 21.8388 2.92035C21.944 2.66634 21.9982 2.39411 21.9981 2.11919C21.998 1.84428 21.9438 1.57207 21.8384 1.3181C21.733 1.06414 21.5786 0.833399 21.3839 0.639051C21.1892 0.444703 20.9582 0.290556 20.7039 0.185411C20.4496 0.0802654 20.177 0.026181 19.9018 0.0262458C19.6266 0.0263106 19.354 0.080523 19.0998 0.185788C18.8455 0.291053 18.6145 0.445309 18.42 0.639749L11.0125 8.04013L3.6037 0.639749C3.41048 0.439732 3.17931 0.280156 2.92369 0.170331C2.66806 0.0605069 2.3931 0.00263317 2.11484 8.77827e-05C1.83659 -0.0024576 1.56061 0.0503759 1.30301 0.155506C1.04541 0.260635 0.811359 0.415956 0.614501 0.612405C0.417642 0.808853 0.261924 1.0425 0.156431 1.2997C0.0509388 1.5569 -0.00221519 1.83252 7.07167e-05 2.11046C0.00235662 2.3884 0.0600364 2.6631 0.169745 2.91854C0.279454 3.17398 0.438994 3.40503 0.639057 3.59823L8.05068 11L0.640455 18.4018C0.440392 18.595 0.280852 18.826 0.171143 19.0815C0.0614341 19.3369 0.00375362 19.6116 0.00146772 19.8895C-0.000818188 20.1675 0.0523358 20.4431 0.157828 20.7003C0.263321 20.9575 0.419039 21.1911 0.615898 21.3876C0.812756 21.584 1.04681 21.7394 1.30441 21.8445C1.562 21.9496 1.83798 22.0025 2.11624 21.9999C2.3945 21.9974 2.66946 21.9395 2.92508 21.8297C3.18071 21.7198 3.41188 21.5603 3.6051 21.3603L11.0125 13.9613Z"
                    fill="#BDBDBD"
                  />
                </svg>
              </div>
            </div>

            {/* 2. Modal Body */}
            <div className="grid grid-cols-5 w-full gap-[5vw] px-[1vw]">
              <div className={`${styles.form} col-span-2`}>
                <h4 className="mb-[1vw]">Brand Details</h4>

                <label htmlFor="brand_name">Brand Name*</label>
                <input
                  type="text"
                  id="brand_name"
                  name="brand_name"
                  // placeholder="Juice Box"
                  className="py-[0.6vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  value={pageState.subBrandName}
                  onChange={(e) => {
                    setPageState((prev) => ({
                      ...prev,
                      subBrandName: e.target.value,
                    }));
                  }}
                />

                <label htmlFor="brand_description">Description*</label>
                <input
                  type="text"
                  id="brand_description"
                  name="brand_description"
                  // placeholder="51640615651463254"
                  className=" py-[0.4vw] border-b-[1px] w-full border-b-[var(--dark)] outline-none block placeholder:text-black mb-[1.2vw]"
                  value={pageState.subBrandDescription}
                  onChange={(e) => {
                    setPageState((prev) => ({
                      ...prev,
                      subBrandDescription: e.target.value,
                    }));
                  }}
                />

                <label htmlFor="brand_acquisition_date">
                  Acquisition Date*
                </label>
                <CustomDatePicker
                  getDateTimeValue={(value: any) => {
                    setPageState((prev: any) => ({
                      ...prev,
                      subBrandAquisitionDate: value,
                    }));
                  }}
                />
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

                        <label htmlFor="twitter_access_token">
                          Access Token*
                        </label>

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

                        <label htmlFor="twitter_token_secret">
                          Token Secret*
                        </label>

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

                        <label htmlFor="twitter_bearer_token">
                          Bearer Token*
                        </label>

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
                  </div>
                </div>
              </div>
            </div>

            {/* Add Sub-brand button */}
            <div className="flex justify-end">
              <CustomBtn
                word="Add Sub-brand"
                btnColor="black"
                paddingVal="py-[--10px] px-[--22px]"
                onClick={handleAddSubBrand}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
