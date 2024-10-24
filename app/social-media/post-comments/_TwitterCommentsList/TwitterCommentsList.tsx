"use client";
import { useState, useContext, useMemo } from "react";
import SocialMediaModal from "@/app/_components/SocialMedia/SocialMediaModal/SocialMediaModal";
import styles from "./TwitterCommentsList.module.css";
import { globalContext } from "@/app/_context/store";
import { addIcon, sortIcon } from "@/app/_utils/svgIcons";
import { TwitterSharingAccount } from "../PostCommentsPage";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";

const verticalDots = (
  <svg
    className="cursor-pointer w-[--7px] h-[--25px]"
    viewBox="0 0 7 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.41797 2.77778C6.41797 2.04107 6.1019 1.33453 5.53929 0.813592C4.97668 0.292658 4.21362 0 3.41797 0C2.62232 0 1.85926 0.292658 1.29665 0.813592C0.73404 1.33453 0.417969 2.04107 0.417969 2.77778C0.417969 3.51449 0.73404 4.22103 1.29665 4.74196C1.85926 5.2629 2.62232 5.55556 3.41797 5.55556C4.21362 5.55556 4.97668 5.2629 5.53929 4.74196C6.1019 4.22103 6.41797 3.51449 6.41797 2.77778ZM3.41797 9.72222C4.21362 9.72222 4.97668 10.0149 5.53929 10.5358C6.1019 11.0567 6.41797 11.7633 6.41797 12.5C6.41797 13.2367 6.1019 13.9433 5.53929 14.4642C4.97668 14.9851 4.21362 15.2778 3.41797 15.2778C2.62232 15.2778 1.85926 14.9851 1.29665 14.4642C0.73404 13.9433 0.417969 13.2367 0.417969 12.5C0.417969 11.7633 0.73404 11.0567 1.29665 10.5358C1.85926 10.0149 2.62232 9.72222 3.41797 9.72222ZM3.41797 19.4444C4.21362 19.4444 4.97668 19.7371 5.53929 20.258C6.1019 20.779 6.41797 21.4855 6.41797 22.2222C6.41797 22.9589 6.1019 23.6655 5.53929 24.1864C4.97668 24.7073 4.21362 25 3.41797 25C2.62232 25 1.85926 24.7073 1.29665 24.1864C0.73404 23.6655 0.417969 22.9589 0.417969 22.2222C0.417969 21.4855 0.73404 20.779 1.29665 20.258C1.85926 19.7371 2.62232 19.4444 3.41797 19.4444Z"
      fill="#2A2B2A"
    />
  </svg>
);

const TwitterCommentsList = ({
  twitterAccountsData,
  getTwitterAccountsData,
  brandsOptions,
}: {
  twitterAccountsData: TwitterSharingAccount[] | null;
  getTwitterAccountsData: () => void;
  brandsOptions: string[];
}) => {
  const { brandIdMap } = useContext(globalContext);
  const [filterBy, setFilterBy] = useState({
    accountName: "none",
    userName: "none",
    brand: "",
    niche: "",
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
          (filterBy.brand === "" ||
            brandIdMap[item.brand] === filterBy.brand) &&
          (filterBy.niche === "" || item.niche === filterBy.niche) &&
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
        return 0;
      });
  }, [twitterAccountsData, filterBy]);

  const handleSortChange = (field: "accountName" | "userName") => {
    setFilterBy((prev) => ({
      ...prev,
      [field]:
        prev[field] === "asc"
          ? "desc"
          : prev[field] === "desc"
          ? "none"
          : "asc",
      [field === "accountName" ? "userName" : "accountName"]: "none",
    }));
  };

  const renderAccounts =
    Array.isArray(filteredAndSortedAccounts) &&
    filteredAndSortedAccounts.length > 0 ? (
      filteredAndSortedAccounts.map((oneAccount) => (
        <ul
          key={oneAccount._id}
          className={`${styles.tableBody} borderBottom articleRow`}
        >
          <li className="w-[16%] flex justify-center text-center gap-[1vw]">
            <p>{oneAccount.accountName}</p>
          </li>
          <li className={`w-[16%] `}>{oneAccount.userName}</li>
          <li className="w-[16%]">
            <a href={oneAccount.accountLink} target="_blank">
              {oneAccount.accountLink}
            </a>
          </li>
          <li className="w-[16%]">
            <span
              className={
                brandIdMap[oneAccount.brand] === "Street Polotics"
                  ? "bg-[#31B2E9B2]"
                  : brandIdMap[oneAccount.brand] === "Movie Myth"
                  ? "bg-[#E9313EB2]"
                  : brandIdMap[oneAccount.brand] === "Investocracy"
                  ? "bg-[#5FA85BB5]"
                  : "bg-[#F36F24B2]"
              }
            >
              {brandIdMap[oneAccount.brand]}
            </span>
          </li>
          <li className="w-[16%]">{oneAccount.niche}</li>
          <li className="w-[16%] flex justify-center">
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
          <li className="w-[4%] flex justify-center">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                {verticalDots}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content bg-white menu rounded-[--16px] z-[1] w-fit p-[--8px] shadow-md"
              >
                <li>
                  <a>
                    <SocialMediaModal
                      btnWord={"Edit"}
                      btnColor={"black"}
                      modalTitle={"Edit Account"}
                      forWhat={"edit_account1"}
                      dataToEdit={oneAccount}
                      getData={getTwitterAccountsData}
                      brandsOptions={brandsOptions}
                    />
                  </a>
                </li>
                {/* <li>
                  <SocialMediaModal
                    btnWord={"Delete"}
                    btnColor={"black"}
                    modalTitle={"Delete Account"}
                    forWhat={"delete_account1"}
                    dataToEdit={oneAccount}
                    getData={getTwitterAccountsData}
                  />
                </li> */}
              </ul>
            </div>
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
      <div className={`flex justify-between w-full pageHeader`}>
        <div
          className={
            `${styles.filters}` + " flex-grow flex items-center gap-[0.75vw]"
          }
        >
          <div className="flex flex-col w-[15%] gap-[0.3vw]">
            <h5>Account Name</h5>
            <div
              className={`${styles.changeOrder} `}
              onClick={() => {
                handleSortChange("accountName");
              }}
            >
              <p>
                {filterBy.accountName === "asc"
                  ? "Ascending"
                  : filterBy.accountName === "desc"
                  ? "Descending"
                  : "Not sorted"}
              </p>
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
              <p>
                {filterBy.userName === "asc"
                  ? "Ascending"
                  : filterBy.userName === "desc"
                  ? "Descending"
                  : "Not sorted"}
              </p>
              {sortIcon}
            </div>
          </div>

          <div className="flex flex-col w-[15%] gap-[0.3vw]">
            <h5>Brand</h5>
            <CustomSelectInput
              label="All"
              options={["All", ...brandsOptions]}
              getValue={(value: string) =>
                setFilterBy((prev) => ({
                  ...prev,
                  brand: value === "All" ? "" : value,
                }))
              }
            />
          </div>

          <div className="flex flex-col w-[15%] gap-[0.3vw]">
            <h5>Niche</h5>
            <CustomSelectInput
              label="All"
              options={[
                "All",
                ...new Set(
                  twitterAccountsData?.map((item) => item.niche) || []
                ),
              ]}
              getValue={(value: string) =>
                setFilterBy((prev) => ({
                  ...prev,
                  niche: value === "All" ? "" : value,
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

        <div className="flex gap-[0.5vw] items-end ">
          <SocialMediaModal
            btnWord={"Add Account"}
            btnIcon={addIcon}
            btnColor={"black"}
            modalTitle={"Add Account"}
            forWhat={"add_account1"}
            getData={getTwitterAccountsData}
            brandsOptions={brandsOptions}
          />
        </div>
      </div>

      {/* // table has all accounts data  */}
      <div className="flex w-full">
        <div className={`${styles.box} w-full px-[0.5vw] `}>
          <div className={`${styles.tableContent}`}>
            <ul
              className={`${styles.tableHeader} flex justify-center items-center py-[2vh]`}
            >
              <li className="w-[16%] flex justify-center">
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

              <li className="w-[16%] flex justify-center">
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

              <li className="w-[16%] flex justify-center">
                <div className="flex items-center gap-[0.7vw]">
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
                  <p>Link</p>
                </div>
              </li>

              <li className="w-[16%] flex justify-center">
                <div className="flex items-center gap-[0.7vw]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M9.09889 11.2856L10.6333 20H1.11111C0.497778 20 0 19.5022 0 18.8889V12.8911L9.09889 11.2856ZM18.8889 0C19.5022 0 20 0.497778 20 1.11111V18.8889C20 19.5022 19.5022 20 18.8889 20H12.8911L9.36445 0H18.8889ZM7.10778 0L8.71222 9.09778L0 10.6333V1.11111C0 0.497778 0.497778 0 1.11111 0H7.10778Z"
                      fill="#2A2B2A"
                    />
                  </svg>
                  <p>Brand</p>
                </div>
              </li>

              <li className="w-[16%] flex justify-center">
                <div className="flex items-center gap-[0.7vw]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="25"
                    viewBox="0 0 21 25"
                    fill="none"
                  >
                    <path
                      d="M9.4475 5.25409C9.57794 5.25409 9.6432 5.17839 9.67581 5.05948C10.0128 3.25406 9.9911 3.21084 11.8828 2.85405C12.0132 2.83247 12.0893 2.75677 12.0893 2.62702C12.0893 2.49731 12.0132 2.42162 11.8828 2.39999C10.002 2.02166 10.0563 1.97839 9.67581 0.194606C9.6432 0.0756929 9.57794 0 9.4475 0C9.31702 0 9.2518 0.0756929 9.21919 0.194606C8.83869 1.97839 8.90391 2.02166 7.01224 2.39999C6.89266 2.42162 6.80569 2.49731 6.80569 2.62702C6.80569 2.75677 6.89266 2.83247 7.01224 2.85405C8.90391 3.23247 8.88215 3.25406 9.21919 5.05948C9.2518 5.17839 9.31702 5.25409 9.4475 5.25409ZM4.18563 12.6919C4.39218 12.6919 4.53352 12.5622 4.55523 12.3676C4.94663 9.48108 5.04446 9.48108 8.04507 8.90815C8.24077 8.87568 8.38206 8.74597 8.38206 8.54057C8.38206 8.34596 8.24077 8.20542 8.04507 8.17299C5.04446 7.76219 4.93573 7.66487 4.55523 4.72433C4.53352 4.52977 4.39218 4.38922 4.18563 4.38922C3.98993 4.38922 3.84859 4.52977 3.82683 4.73517C3.46809 7.63244 3.31585 7.62165 0.33704 8.17299C0.141338 8.21626 0 8.34596 0 8.54057C0 8.75676 0.141338 8.87568 0.380503 8.90815C3.3376 9.3838 3.46809 9.45949 3.82683 12.346C3.84859 12.5622 3.98993 12.6919 4.18563 12.6919ZM11.5566 24.6595C11.8393 24.6595 12.0459 24.4541 12.1002 24.1622C12.8721 18.2378 13.7092 17.3406 19.6016 16.6919C19.9061 16.6595 20.1126 16.4324 20.1126 16.1514C20.1126 15.8703 19.9061 15.654 19.6016 15.6108C13.7092 14.9622 12.8721 14.0649 12.1002 8.14056C12.0459 7.84868 11.8393 7.65407 11.5566 7.65407C11.2739 7.65407 11.0674 7.84868 11.0239 8.14056C10.252 14.0649 9.40404 14.9622 3.5224 15.6108C3.20716 15.654 3.00061 15.8703 3.00061 16.1514C3.00061 16.4324 3.20716 16.6595 3.5224 16.6919C9.39314 17.4595 10.2085 18.2487 11.0239 24.1622C11.0674 24.4541 11.2739 24.6595 11.5566 24.6595Z"
                      fill="#2A2B2A"
                    />
                  </svg>
                  <p>Niche</p>
                </div>
              </li>

              <li className="w-[16%] flex justify-center">
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

              <li className="w-[4%] flex justify-center"></li>
            </ul>
            <div className={styles.tableBodyWrapper}>{renderAccounts}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterCommentsList;
