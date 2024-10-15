"use client";
import styles from "./TwitterCommentCampaign.module.css";
import {
  runningClockIcon,
  finishedCheckIcon,
  pausedIcon,
  sortIcon,
} from "@/app/_utils/svgIcons";
import { useMemo, useState } from "react";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { TwitterSharingAccount } from "../PostCommentsPage";

const TwitterCommentCampaign = ({
  twitterAccountsData,
}: {
  twitterAccountsData: TwitterSharingAccount[] | null;
}) => {
  const [filterBy, setFilterBy] = useState({
    accountName: "none",
    userName: "none",
    comments: "none",
    status: "",
    campaignType: "",
  });

  const filteredAndSortedAccounts = useMemo(() => {
    if (
      !Array.isArray(twitterAccountsData) ||
      twitterAccountsData.length === 0
    ) {
      return [];
    }

    return twitterAccountsData
      .filter((item) => {
        return (
          (filterBy.status === "" || item.status === filterBy.status) &&
          (filterBy.campaignType === "" ||
            item.campaignType === filterBy.campaignType)
        );
      })
      .sort((a, b) => {
        if (filterBy.accountName === "asc") {
          return a.accountName.localeCompare(b.accountName);
        }
        if (filterBy.accountName === "desc") {
          return b.accountName.localeCompare(a.accountName);
        }
        if (filterBy.userName === "asc") {
          return a.userName.localeCompare(b.userName);
        }
        if (filterBy.userName === "desc") {
          return b.userName.localeCompare(a.userName);
        }
        if (filterBy.comments === "asc") {
          return a.comments - b.comments;
        }
        if (filterBy.comments === "desc") {
          return b.comments - a.comments;
        }
        return 0;
      });
  }, [twitterAccountsData, filterBy]);

  const handleSortChange = (field: "accountName" | "userName" | "comments") => {
    setFilterBy((prev) => {
      // Determine the next sort order for the selected field
      let newSortOrder: "asc" | "desc" | "none" = "asc";
      if (prev[field] === "asc") newSortOrder = "desc";
      else if (prev[field] === "desc") newSortOrder = "none";

      // Reset all sort fields except the one being toggled
      return {
        ...prev,
        accountName: field === "accountName" ? newSortOrder : "none",
        userName: field === "userName" ? newSortOrder : "none",
        comments: field === "comments" ? newSortOrder : "none",
      };
    });
  };

  // Helper function to get sort label
  const getSortLabel = (field: "accountName" | "userName" | "comments") => {
    switch (filterBy[field]) {
      case "asc":
        return "Ascending";
      case "desc":
        return "Descending";
      default:
        return "Not sorted";
    }
  };

  //   return data about account , number of comments and campaign type
  const renderAccounts =
    Array.isArray(filteredAndSortedAccounts) &&
    filteredAndSortedAccounts.length > 0 ? (
      filteredAndSortedAccounts.map((oneAccount, idx) => (
        <ul key={idx} className={`${styles.tableBody} borderBottom articleRow`}>
          <li className="w-[20%] flex justify-center text-center gap-[1vw]">
            <p>{oneAccount.accountName}</p>
          </li>
          <li className={`w-[20%] `}>{oneAccount.userName}</li>

          <li className="w-[20%]">{oneAccount.comments + " " + "comments"}</li>
          <li className="w-[20%] flex justify-center items-center">
            <span
              className={`flex gap-[0.5vw] items-center w-fit ${
                oneAccount.status === "Finished"
                  ? "bg-[#5FA85BB5]"
                  : oneAccount.status === "Running"
                  ? "bg-[#E9313EB2]"
                  : "bg-[#E1C655B2]"
              }`}
            >
              {oneAccount.status === "Finished"
                ? finishedCheckIcon
                : oneAccount.status === "Paused"
                ? pausedIcon
                : runningClockIcon}
              <p>{oneAccount.status}</p>
            </span>
          </li>
          <li className="w-[20%] flex justify-center">
            <span
              className={`flex gap-[0.5vw] items-center w-fit ${
                oneAccount.campaignType === "Auto Comment"
                  ? "bg-[#5FA85BB5]"
                  : "bg-[#E1C655B2]"
              }`}
            >
              <p>{oneAccount.campaignType}</p>
            </span>
          </li>
        </ul>
      ))
    ) : (
      <div className="flex justify-center items-center h-full">
        <span className="custom-loader"></span>
      </div>
    );

  return (
    <div className={`${styles.wrapper} w-full h-full pt-[0.5vw]`}>
      {/* filters options to filter and edit data in table */}

      <div className="flex justify-between w-full pageHeader">
        <div
          className={`${styles.filters} flex-grow flex items-center gap-[0.75vw]`}
        >
          <div className="flex flex-col w-[15%] gap-[0.3vw]">
            <h5>Account Name</h5>
            <div
              className={`${styles.changeOrder} `}
              onClick={() => {
                handleSortChange("accountName");
              }}
            >
              <p>{getSortLabel("accountName")}</p>
              {sortIcon}
            </div>
          </div>

          <div className="flex flex-col w-[15%] gap-[0.3vw]">
            <h5>Username</h5>
            <div
              className={`${styles.changeOrder} `}
              onClick={() => {
                handleSortChange("userName");
              }}
            >
              <p>{getSortLabel("userName")}</p>
              {sortIcon}
            </div>
          </div>

          <div className="flex flex-col w-[15%] gap-[0.3vw]">
            <h5>Comments</h5>
            <div
              className={`${styles.changeOrder} `}
              onClick={() => {
                handleSortChange("comments");
              }}
            >
              <p>{getSortLabel("comments")}</p>
              {sortIcon}
            </div>
          </div>

          <div className="flex flex-col w-[15%] gap-[0.3vw]">
            <h5>Status</h5>
            <CustomSelectInput
              label="All"
              options={[
                "All",
                ...new Set(
                  twitterAccountsData?.map((item) => item.status) || []
                ),
              ]}
              getValue={(value: string) =>
                setFilterBy((prev) => ({
                  ...prev,
                  status: value === "All" ? "" : value,
                }))
              }
            />
          </div>

          <div className="flex flex-col w-[15%] gap-[0.3vw]">
            <h5>Campaign Type</h5>
            <CustomSelectInput
              label="All"
              options={[
                "All",
                ...new Set(
                  twitterAccountsData?.map((item) => item.campaignType) || []
                ),
              ]}
              getValue={(value: string) =>
                setFilterBy((prev) => ({
                  ...prev,
                  campaignType: value === "All" ? "" : value,
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* // table has all comments  */}
      <div className="flex w-full">
        <div className={`${styles.box} w-full px-[0.5vw] `}>
          <div className={`${styles.tableContent}`}>
            <ul
              className={`${styles.tableHeader} flex justify-center items-center py-[2vh]`}
            >
              <li className="w-[20%] flex justify-center">
                <div className="flex items-center gap-[0.7vw]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M10.032 0C11.3623 0 12.6382 0.526784 13.5788 1.46447C14.5195 2.40215 15.048 3.67392 15.048 5C15.048 6.32608 14.5195 7.59785 13.5788 8.53553C12.6382 9.47322 11.3623 10 10.032 10C8.70167 10 7.42584 9.47322 6.48515 8.53553C5.54447 7.59785 5.016 6.32608 5.016 5C5.016 3.67392 5.54447 2.40215 6.48515 1.46447C7.42584 0.526784 8.70167 0 10.032 0ZM10.032 12.5C15.5747 12.5 20.064 14.7375 20.064 17.5V20H0V17.5C0 14.7375 4.48932 12.5 10.032 12.5Z"
                      fill="black"
                    />
                  </svg>
                  <p>Account Name</p>
                </div>
              </li>

              <li className="w-[20%] flex justify-center">
                <div className="flex items-center gap-[0.7vw]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M20.064 9.99695V10.1431C20.0312 11.5143 19.5209 13.0739 17.3631 13.0739C15.131 13.0739 14.6622 11.4008 14.6622 9.99695V6.1508C14.6624 6.04535 14.6409 5.94097 14.5989 5.84416C14.557 5.74735 14.4955 5.66017 14.4184 5.58803C14.3412 5.51589 14.25 5.46034 14.1504 5.42482C14.0508 5.3893 13.9449 5.37458 13.8393 5.38157C13.6406 5.39858 13.4557 5.49011 13.3219 5.63769C13.1882 5.78527 13.1156 5.97791 13.1188 6.17676V6.56138C12.4221 5.939 11.5527 5.54157 10.625 5.42144C9.69728 5.30131 8.75484 5.46412 7.92179 5.88841C7.08874 6.31271 6.40416 6.97859 5.95824 7.79834C5.51231 8.61809 5.32595 9.55327 5.42371 10.4807C5.52147 11.4081 5.89876 12.2842 6.50588 12.9937C7.113 13.7031 7.92147 14.2126 8.8248 14.4551C9.72813 14.6975 10.6839 14.6615 11.5663 14.3518C12.4487 14.042 13.2163 13.4732 13.768 12.72C13.8644 12.8882 13.9734 13.0489 14.094 13.2008C14.612 13.8431 15.5988 14.6123 17.3631 14.6123C17.661 14.6133 17.9586 14.5892 18.2525 14.5402C18.3251 14.5281 18.3997 14.5371 18.4675 14.5659C18.5352 14.5947 18.5932 14.6423 18.6347 14.703C18.6762 14.7636 18.6994 14.8349 18.7016 14.9083C18.7038 14.9817 18.6848 15.0541 18.647 15.1171C17.74 16.6336 16.4466 17.8839 14.8982 18.7409C13.3497 19.598 11.6012 20.0313 9.8304 19.997C4.54623 19.8912 0.212215 15.6566 0.00771685 10.3921C-0.0445894 9.06357 0.169421 7.73794 0.637228 6.4928C1.10504 5.24766 1.81725 4.10802 2.7322 3.14054C3.64714 2.17305 4.74646 1.39716 5.96583 0.858251C7.1852 0.31934 8.50015 0.0282305 9.83374 0.00195328C11.1673 -0.024324 12.4928 0.214759 13.7326 0.705214C14.9723 1.19567 16.1016 1.92765 17.0542 2.85833C18.0067 3.78902 18.7636 4.89972 19.2804 6.12546C19.7972 7.35119 20.0636 8.66736 20.064 9.99695ZM6.94523 9.99695C6.94523 10.6055 7.12627 11.2004 7.46545 11.7064C7.80462 12.2124 8.28671 12.6068 8.85074 12.8397C9.41478 13.0725 10.0354 13.1335 10.6342 13.0148C11.233 12.896 11.783 12.603 12.2147 12.1727C12.6464 11.7423 12.9404 11.1941 13.0595 10.5972C13.1786 10.0004 13.1174 9.3817 12.8838 8.81946C12.6502 8.25723 12.2545 7.77668 11.7469 7.43858C11.2393 7.10049 10.6425 6.92003 10.032 6.92003C9.21334 6.92003 8.42821 7.2442 7.84932 7.82124C7.27044 8.39827 6.94523 9.1809 6.94523 9.99695Z"
                      fill="black"
                    />
                  </svg>
                  <p>Username</p>
                </div>
              </li>

              <li className="w-[20%] flex justify-center">
                <div className="flex items-center gap-[0.7vw]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                  >
                    <path
                      d="M3.5 11V3C3.5 1.34315 2.15685 0 0.5 0C0.22386 0 0 0.22386 0 0.5V13.5C0 13.7761 0.22386 14 0.5 14C2.15685 14 3.5 12.6569 3.5 11Z"
                      fill="#2A2B2A"
                    />
                    <path
                      d="M10.5 0C12.3856 0 13.3284 2.28882e-07 13.9142 0.58579C14.5 1.17157 14.5 2.11438 14.5 4V10C14.5 11.8856 14.5 12.8284 13.9142 13.4142C13.3284 14 12.3856 14 10.5 14H9.5C7.61438 14 6.67157 14 6.08579 13.4142C5.5 12.8284 5.5 11.8856 5.5 10V4C5.5 2.11438 5.5 1.17157 6.08579 0.58579C6.67157 2.28882e-07 7.61438 0 9.5 0H10.5Z"
                      fill="#2A2B2A"
                    />
                    <path
                      d="M16.5 3V11C16.5 12.6569 17.8431 14 19.5 14C19.7761 14 20 13.7761 20 13.5V0.5C20 0.22386 19.7761 0 19.5 0C17.8431 0 16.5 1.34315 16.5 3Z"
                      fill="#2A2B2A"
                    />
                  </svg>
                  <p>Comments</p>
                </div>
              </li>

              <li className="w-[20%] flex justify-center">
                <div className="flex items-center gap-[0.7vw]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0ZM10 2.85714C10.4736 2.85714 10.9278 3.04528 11.2627 3.38017C11.5976 3.71505 11.7857 4.16926 11.7857 4.64286C11.7857 5.11646 11.5976 5.57066 11.2627 5.90555C10.9278 6.24043 10.4736 6.42857 10 6.42857C9.5264 6.42857 9.0722 6.24043 8.73731 5.90555C8.40242 5.57066 8.21429 5.11646 8.21429 4.64286C8.21429 4.16926 8.40242 3.71505 8.73731 3.38017C9.0722 3.04528 9.5264 2.85714 10 2.85714ZM8.57143 10C8.57143 9.21102 9.21102 8.57143 10 8.57143C10.789 8.57143 11.4286 9.21102 11.4286 10V15.7143C11.4286 16.5033 10.789 17.1429 10 17.1429C9.21102 17.1429 8.57143 16.5033 8.57143 15.7143V10Z"
                      fill="black"
                    />
                  </svg>
                  <p>Status</p>
                </div>
              </li>

              <li className="w-[20%] flex justify-center">
                <div className="flex items-center gap-[0.7vw]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.25 12.5H13.125V3.75H11.25V12.5ZM18.75 0L14.375 2.91687V13.3331L18.75 16.25C19.44 16.25 20 15.69 20 15V1.25C20 0.56 19.44 0 18.75 0ZM0 8.125C0 10.4581 1.60062 11.9675 3.76187 12.3812L3.75 12.5V17.5C3.75 18.19 4.31 18.75 5 18.75H6.875C7.565 18.75 8.125 18.19 8.125 17.5V12.5H10V3.75H5C2.23875 3.75 0 5.36375 0 8.125Z"
                      fill="#2A2B2A"
                    />
                  </svg>
                  <p>Campaign Type</p>
                </div>
              </li>
            </ul>
            <div className={styles.tableBodyWrapper}>{renderAccounts}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterCommentCampaign;
