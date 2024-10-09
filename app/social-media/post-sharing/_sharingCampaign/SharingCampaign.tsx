"use client";
import styles from "./SharingCampaign.module.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import { socialMediaPostSharingContext } from "../_context/socialMediaPostSharingContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";
import { truncateText } from "@/app/_utils/text";
import { useRouter } from "next/navigation";

interface Content {
  _id: string;
  user_id: string;
  content_title: string;
  content: string;
  brand: string;
  content_type: string;
  date: string;
  approvals: string;
}

interface IGetAllContentResponse {
  message: string;
  content: Content[];
}

// topics about campaigns
const SharingCampaign = () => {
  const router = useRouter();
  const { authState, handleSignOut } = useContext(globalContext);
  const { selectedContent, setSelectedContent } = useContext(
    socialMediaPostSharingContext
  );
  const [pageState, setPageState] = useState<{
    fetchedContent: Content[];
  }>({
    fetchedContent: [],
  });

  const getAllContent = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/VideoEditing/get-all-content`,
      {
        headers: {
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
      toast.error("Failed to fetch content");
      return;
    }

    const data: IGetAllContentResponse = await res.json();
    if (data && data.message === "successfully" && data.content.length > 0) {
      setPageState((prevState) => ({
        ...prevState,
        fetchedContent: data.content,
      }));
    } else {
      toast.error("Failed to fetch content");
    }
  };

  useEffect(() => {
    // reset data
    setSelectedContent("");
    getAllContent();
  }, []);

  useEffect(() => {
    if (selectedContent !== "") {
      router.replace("/social-media/post-sharing/campaign-details");
    }
  }, [selectedContent]);

  // return campaigns topics
  const renderTopics =
    Array.isArray(pageState.fetchedContent) &&
    pageState.fetchedContent.length > 0 ? (
      [...pageState.fetchedContent].reverse().map((oneCampaign, idx) => (
        <ul
          key={oneCampaign._id}
          className={`${styles.tableBody} borderBottom articleRow`}
        >
          <li className="w-[5%]">{idx + 1}</li>
          <li className="w-[30%] ">
            {truncateText(oneCampaign.content_title, 50)}
          </li>
          <li className={`w-[25%]  ${styles.contentType}`}>
            {oneCampaign.brand}
          </li>

          <li className="w-[20%] ">{oneCampaign.date.split("T")[0]}</li>
          <li className={` w-[20%] flex justify-center`}>
            <CustomBtn
              onClick={() => {
                setSelectedContent(oneCampaign.content);
              }}
              class="videoStatusBtn"
              word={"Start Campaign"}
              btnColor="black"
              paddingVal="py-[--6px] px-[--20px]"
            />
          </li>
        </ul>
      ))
    ) : (
      <ul className={`${styles.tableBody} borderBottom articleRow flex justify-center items-center h-full`}>
        <span className="custom-loader"></span>
      </ul>
    );

  return (
    <div className={`${styles.box} w-full px-[0.5vw] !h-full`}>
      <div className="!h-[77vh]">
        <ul
          className={`${styles.tableHeader} flex justify-center items-center py-[2vh]`}
        >
          <li className="w-[5%]">#</li>
          <li className="w-[30%] flex items-center justify-center gap-[0.7vw]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
            >
              <path
                d="M0 3.33301H17.7778C19.0051 3.33301 20 4.32793 20 5.55523H0V3.33301Z"
                fill="#222222"
              />
              <path
                d="M0 7.77734H20V12.444C20 14.3109 20 15.2442 19.6367 15.9573C19.3171 16.5846 18.8072 17.0945 18.18 17.414C17.4669 17.7773 16.5336 17.7773 14.6667 17.7773H5.33333C3.46649 17.7773 2.53307 17.7773 1.82003 17.414C1.19282 17.0945 0.682889 16.5846 0.363311 15.9573C1.32455e-07 15.2442 0 14.3109 0 12.444V7.77734Z"
                fill="#222222"
              />
              <path
                d="M0 3.33333C0 2.29791 4.96705e-08 1.7802 0.169156 1.37181C0.3947 0.827311 0.827311 0.3947 1.37181 0.169155C1.7802 -2.15239e-07 2.29791 0 3.33333 0H5.93683C6.84517 0 7.29933 -2.15239e-07 7.70771 0.169155C8.11611 0.338311 8.43722 0.659455 9.07956 1.30174L11.1111 3.33333H0Z"
                fill="#222222"
              />
            </svg>
            <p>Content</p>
          </li>
          <li className="w-[25%] flex items-center justify-center gap-[0.7vw]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="18"
              viewBox="0 0 21 18"
              fill="none"
            >
              <path
                d="M9.09794 13.8545C9.19468 13.9506 9.27143 14.0647 9.3238 14.1905C9.37617 14.3162 9.40312 14.451 9.40312 14.5871C9.40312 14.7232 9.37617 14.858 9.3238 14.9837C9.27143 15.1094 9.19468 15.2236 9.09794 15.3197L8.65523 15.761C8.18528 16.2312 7.62648 16.6039 7.01115 16.8574C6.39582 17.111 5.73616 17.2405 5.07032 17.2383C4.06759 17.2387 3.08729 16.9425 2.25345 16.3873C1.41961 15.8322 0.769695 15.043 0.385924 14.1195C0.00215327 13.1961 -0.0982264 12.18 0.0974847 11.1997C0.293196 10.2194 0.776203 9.31894 1.4854 8.61233L4.49012 5.61719C5.12923 4.98022 5.92752 4.52509 6.80235 4.29894C7.67717 4.07279 8.59674 4.08383 9.46585 4.33092C10.335 4.578 11.122 5.05215 11.7456 5.70428C12.3691 6.35641 12.8064 7.16282 13.0123 8.04002C13.0464 8.17339 13.0534 8.31221 13.033 8.44834C13.0126 8.58446 12.9652 8.71515 12.8934 8.83276C12.8217 8.95036 12.7271 9.05252 12.6153 9.13323C12.5034 9.21394 12.3766 9.27158 12.2421 9.30279C12.1076 9.33399 11.9682 9.33813 11.8321 9.31495C11.696 9.29177 11.5659 9.24175 11.4494 9.16781C11.333 9.09387 11.2325 8.99751 11.1539 8.88437C11.0752 8.77122 11.0201 8.64357 10.9916 8.5089C10.8694 7.99109 10.6107 7.5152 10.2422 7.13043C9.87377 6.74566 9.40889 6.46597 8.89566 6.32028C8.38243 6.17458 7.83947 6.16818 7.32292 6.30171C6.80637 6.43525 6.33498 6.70389 5.95747 7.07985L2.95274 10.075C2.53391 10.4922 2.24858 11.0238 2.13285 11.6026C2.01712 12.1814 2.07619 12.7814 2.30258 13.3268C2.52897 13.8721 2.91251 14.3383 3.40471 14.6663C3.8969 14.9944 4.47564 15.1696 5.06772 15.1697C5.46112 15.1708 5.85084 15.0942 6.21432 14.9442C6.5778 14.7941 6.90782 14.5738 7.1853 14.2958L7.62714 13.8545C7.72355 13.7579 7.83815 13.6813 7.96435 13.629C8.09056 13.5767 8.22588 13.5498 8.36254 13.5498C8.49921 13.5498 8.63453 13.5767 8.76073 13.629C8.88693 13.6813 9.00153 13.7579 9.09794 13.8545ZM18.579 1.48002C17.628 0.532362 16.3384 0 14.9937 0C13.649 0 12.3593 0.532362 11.4083 1.48002L10.9665 1.92046C10.7716 2.11476 10.6621 2.37829 10.6621 2.65308C10.6621 2.92787 10.7716 3.1914 10.9665 3.3857C11.1614 3.58001 11.4258 3.68917 11.7015 3.68917C11.9771 3.68917 12.2415 3.58001 12.4364 3.3857L12.8791 2.94441C13.441 2.38435 14.203 2.06972 14.9976 2.06972C15.7921 2.06972 16.5542 2.38435 17.116 2.94441C17.6779 3.50446 17.9935 4.26405 17.9935 5.05609C17.9935 5.84812 17.6779 6.60771 17.116 7.16777L14.1061 10.1586C13.8287 10.4367 13.4987 10.6571 13.1352 10.8071C12.7717 10.9571 12.3819 11.0338 11.9885 11.0326C11.3137 11.0321 10.6587 10.8044 10.13 10.3863C9.6012 9.96832 9.22961 9.38449 9.07546 8.72955C9.01309 8.46232 8.84677 8.23074 8.6131 8.08575C8.37943 7.94076 8.09756 7.89424 7.82947 7.95641C7.56139 8.01859 7.32907 8.18438 7.18362 8.4173C7.03816 8.65022 6.99149 8.9312 7.05387 9.19843C7.31422 10.3076 7.94284 11.2966 8.83776 12.005C9.73268 12.7134 10.8414 13.0996 11.9842 13.1012H11.9885C12.6547 13.103 13.3146 12.9731 13.9301 12.7191C14.5456 12.4651 15.1044 12.0919 15.5743 11.6213L18.579 8.62612C19.0498 8.15694 19.4233 7.5999 19.6781 6.98683C19.9329 6.37376 20.064 5.71667 20.064 5.05307C20.064 4.38947 19.9329 3.73238 19.6781 3.11931C19.4233 2.50624 19.0498 1.9492 18.579 1.48002Z"
                fill="black"
              />
            </svg>
            <p>Brand</p>
          </li>
          <li className="w-[20%] flex items-center justify-center gap-[0.7vw]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.33333 12H10.6667V10.6667H9.33333V12ZM9.33333 17.3333H10.6667V16H9.33333V17.3333ZM14.6667 12H16V10.6667H14.6667V12ZM14.6667 17.3333H16V16H14.6667V17.3333ZM4 17.3333H5.33333V16H4V17.3333ZM18.6667 5.33333H1.33333V4C1.33333 3.264 1.93067 2.66667 2.66667 2.66667H5.33333V3.33333C5.33333 3.702 5.63133 4 6 4C6.36867 4 6.66667 3.702 6.66667 3.33333V2.66667H13.3333V3.33333C13.3333 3.702 13.6313 4 14 4C14.3687 4 14.6667 3.702 14.6667 3.33333V2.66667H17.3333C18.0693 2.66667 18.6667 3.264 18.6667 4V5.33333ZM17.3333 12C17.3333 12.736 16.736 13.3333 16 13.3333H14.6667C13.9307 13.3333 13.3333 12.736 13.3333 12V10.6667C13.3333 9.93067 13.9307 9.33333 14.6667 9.33333H16C16.736 9.33333 17.3333 9.93067 17.3333 10.6667V12ZM17.3333 17.3333C17.3333 18.0693 16.736 18.6667 16 18.6667H14.6667C13.9307 18.6667 13.3333 18.0693 13.3333 17.3333V16C13.3333 15.264 13.9307 14.6667 14.6667 14.6667H16C16.736 14.6667 17.3333 15.264 17.3333 16V17.3333ZM12 12C12 12.736 11.4027 13.3333 10.6667 13.3333H9.33333C8.59733 13.3333 8 12.736 8 12V10.6667C8 9.93067 8.59733 9.33333 9.33333 9.33333H10.6667C11.4027 9.33333 12 9.93067 12 10.6667V12ZM12 17.3333C12 18.0693 11.4027 18.6667 10.6667 18.6667H9.33333C8.59733 18.6667 8 18.0693 8 17.3333V16C8 15.264 8.59733 14.6667 9.33333 14.6667H10.6667C11.4027 14.6667 12 15.264 12 16V17.3333ZM6.66667 12C6.66667 12.736 6.06933 13.3333 5.33333 13.3333H4C3.264 13.3333 2.66667 12.736 2.66667 12V10.6667C2.66667 9.93067 3.264 9.33333 4 9.33333H5.33333C6.06933 9.33333 6.66667 9.93067 6.66667 10.6667V12ZM6.66667 17.3333C6.66667 18.0693 6.06933 18.6667 5.33333 18.6667H4C3.264 18.6667 2.66667 18.0693 2.66667 17.3333V16C2.66667 15.264 3.264 14.6667 4 14.6667H5.33333C6.06933 14.6667 6.66667 15.264 6.66667 16V17.3333ZM17.3333 1.33333H14.6667V0.666667C14.6667 0.298667 14.3687 0 14 0C13.6313 0 13.3333 0.298667 13.3333 0.666667V1.33333H6.66667V0.666667C6.66667 0.298667 6.36867 0 6 0C5.63133 0 5.33333 0.298667 5.33333 0.666667V1.33333H2.66667C1.194 1.33333 0 2.52733 0 4V18.6667C0 20.1393 1.194 21.3333 2.66667 21.3333H17.3333C18.806 21.3333 20 20.1393 20 18.6667V4C20 2.52733 18.806 1.33333 17.3333 1.33333ZM4 12H5.33333V10.6667H4V12Z"
                fill="#2A2B2A"
              />
            </svg>
            <p>Date</p>
          </li>
          {/* button to lead you to share about this campaign */}
          <li className="w-[20%] flex items-center justify-center gap-[0.7vw]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.8333 13.3333C14.3583 13.3333 13.0708 14.1042 12.33 15.26L7.86751 12.71C8.15584 12.1433 8.33333 11.5117 8.33333 10.8333C8.33333 10.4142 8.25251 10.0175 8.13751 9.63582L12.78 6.98334C13.5408 7.80834 14.6225 8.33333 15.8333 8.33333C18.135 8.33333 20 6.46833 20 4.16667C20 1.865 18.135 0 15.8333 0C13.5317 0 11.6667 1.865 11.6667 4.16667C11.6667 4.58583 11.7475 4.98249 11.8625 5.36499L7.22 8.01666C6.45917 7.1925 5.3775 6.66667 4.16667 6.66667C1.865 6.66667 0 8.53167 0 10.8333C0 13.135 1.865 15 4.16667 15C5.11667 15 5.98249 14.67 6.68332 14.135L11.7125 17.05C11.6958 17.2 11.6667 17.345 11.6667 17.5C11.6667 19.8017 13.5317 21.6667 15.8333 21.6667C18.135 21.6667 20 19.8017 20 17.5C20 15.1983 18.135 13.3333 15.8333 13.3333Z"
                fill="black"
              />
            </svg>
            <p>Share</p>
          </li>
        </ul>

        <div className={styles.tableContentWrapper}>{renderTopics}</div>
      </div>
    </div>
  );
};

export default SharingCampaign;
