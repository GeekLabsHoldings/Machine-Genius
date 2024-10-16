"use client";
import { ArticleNames, Brands } from "@/app/_data/data";
// import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import BasicModal from "@/app/_components/SocialMedia/Modal/modal";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";
import styles from "./setting.module.css";
import { addIcon } from "@/app/_utils/svgIcons";
import { globalContext } from "@/app/_context/store";
import toast from "react-hot-toast";

//
interface IBrand {
  _id: string;
  brand_name: string;
  description: string;
  aquisition_date: string;
  niche: string;
  type?: string;
  parentId?: string;
  __v: number;
}

interface IGroup {
  _id: string;
  group_name: string;
  link: string;
  group_id: string;
  subscribers: number;
  niche?: string;
  platform: string;
  brand: string;
  engagement: number;
  __v: number;
}

interface IBrandWithGroups {
  brand: IBrand;
  groups: IGroup[];
}

const Setting = () => {
  const { authState, handleSignOut } = useContext(globalContext);
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
  // for storing the order of subscribers and engagement (descending or ascending)
  const [subscriberOrder, setsubscriberOrder] = useState<boolean>(true);
  const [engagementOrder, setengagementOrder] = useState<boolean>(true);
  const [pageState, setPageState] = useState<{
    fetchedAccounts: IGroup[];
  }>({ fetchedAccounts: [] });

  async function getAccounts() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/settings/get-groups`,
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
      const json: IBrandWithGroups[] = await res.json();
      if (!json) {
        toast.error("Something went wrong!");
        return;
      } else if (json && Array.isArray(json) && json.length > 0) {
        setPageState((prev) => ({
          ...prev,
          fetchedAccounts: json.flatMap((brand) => brand?.groups),
        }));
      } else {
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error getAccounts:", error);
    }
  }

  useEffect(() => {
    getAccounts();
  }, []);

  // return all accounts
  const renderAccounts =
    Array.isArray(pageState.fetchedAccounts) &&
    pageState.fetchedAccounts.length > 0 ? (
      pageState.fetchedAccounts.map((oneAccount) => (
        <ul
          key={oneAccount._id}
          className={`${styles.tableBody} borderBottom articleRow`}
        >
          <li className="w-[5%] flex justify-center items-center">
            <CustomCheckBox
              name="test"
              value={oneAccount._id}
              checked={selectedAccountIds.includes(oneAccount._id)}
              onChange={(e) => handleCheckboxChange(e, oneAccount._id)}
            />
          </li>
          <li className="w-[22%]">
            <p>{oneAccount.group_name}</p>
          </li>
          <li className={`w-[22%] flex justify-center text-center gap-[1vw]`}>
            {oneAccount.platform[0] +
              oneAccount.platform.toLowerCase().slice(1)}
            {/* <span>
            {oneAccount.platform === "facebook"
              ? facebookIconSm
              : oneAccount.platform === "reddit"
              ? redditIconSm
              : telegramIconSm}
            </span> */}
          </li>
          <li className="w-[22%]">
            <a href={oneAccount.link} target="_blank">
              {oneAccount.link}
            </a>
          </li>
          <li className="w-[22%]">
            {oneAccount.subscribers > 999
              ? oneAccount.subscribers / 100 / 10.0 + "k"
              : oneAccount.subscribers}
          </li>
          <li className="w-[22%]">{oneAccount.engagement}</li>
        </ul>
      ))
    ) : (
      <ul className={`${styles.tableBody} borderBottom articleRow h-full`}>
        <span className="custom-loader w-fit m-auto"></span>
      </ul>
    );

  // Function to handle individual checkbox change
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    accountId: string
  ) => {
    if (e.target.checked) {
      setSelectedAccountIds((prev) => [...prev, accountId]);
    } else {
      setSelectedAccountIds((prev) => prev.filter((id) => id !== accountId));
    }
  };

  // Function to handle "Select All" checkbox
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = pageState.fetchedAccounts.map((account) => account._id);
      setSelectedAccountIds(allIds);
    } else {
      setSelectedAccountIds([]);
    }
  };

  const selectedAccounts = pageState.fetchedAccounts.filter((account) =>
    selectedAccountIds.includes(account._id)
  );

  return (
    <div className={`${styles.wrapper} w-full h-full pt-[0.5vw]`}>
      {/* filters options to filter and edit data in table */}
      <div className={`flex flex-col gap-[0.7vw] w-full pageHeader`}>
        <h3>Accounts</h3>
        <div className="flex justify-between items-end">
          <div className={`${styles.filters} w-8/12 flex gap-[1vw]`}>
            <div className="flex flex-col w-1/3 gap-[0.3vw]">
              <h5>Account Name</h5>
              <CustomSelectInput label="All" options={ArticleNames} />
            </div>
            <div className="flex flex-col w-1/3 gap-[0.3vw]">
              <h5>Platform</h5>
              <CustomSelectInput label="All" options={Brands} />
            </div>
            <div className="flex flex-col w-[25%] gap-[0.3vw]">
              <h5>Followers</h5>
              <div
                className={`${styles.changeOrder} `}
                onClick={() => {
                  setengagementOrder(!engagementOrder);
                }}
              >
                <p>{engagementOrder ? "Ascend" : "Descend"}</p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721067 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139324 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139324 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>

            <div className={`flex flex-col w-[25%] gap-[0.3vw] `}>
              <h5>Engagement</h5>
              <div
                className={`${styles.changeOrder} `}
                onClick={() => {
                  setsubscriberOrder(!subscriberOrder);
                }}
              >
                <p>{subscriberOrder ? "Ascend" : "Descend"}</p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.80002 10.2959C8.7281 10.1444 8.61483 10.0164 8.47327 9.92664C8.33171 9.83684 8.16764 9.78889 8 9.78834H5.33327V0.889318C5.33327 0.653584 5.23961 0.427504 5.07291 0.260815C4.90621 0.0941257 4.68011 0.000481606 4.44436 0.000481606C4.2086 0.000481606 3.9825 0.0941257 3.8158 0.260815C3.6491 0.427504 3.55544 0.653584 3.55544 0.889318V9.78834H0.888709C0.721067 9.78889 0.556998 9.83684 0.41544 9.92664C0.273883 10.0164 0.160607 10.1444 0.0886892 10.2959C0.0155567 10.4455 -0.0132581 10.613 0.00564103 10.7785C0.0245402 10.944 0.0903656 11.1007 0.195359 11.23L3.751 15.6795C3.83646 15.78 3.94272 15.8607 4.06244 15.916C4.18215 15.9713 4.31247 16 4.44436 16C4.57624 16 4.70656 15.9713 4.82627 15.916C4.94599 15.8607 5.05225 15.78 5.13771 15.6795L8.69335 11.23C8.79834 11.1007 8.86417 10.944 8.88307 10.7785C8.90197 10.613 8.87315 10.4455 8.80002 10.2959ZM15.9113 5.70414C15.8394 5.85556 15.7261 5.98356 15.5846 6.07336C15.443 6.16316 15.2789 6.21111 15.1113 6.21166H12.4446V15.1107C12.4446 15.3464 12.3509 15.5725 12.1842 15.7392C12.0175 15.9059 11.7914 15.9995 11.5556 15.9995C11.3199 15.9995 11.0938 15.9059 10.9271 15.7392C10.7604 15.5725 10.6667 15.3464 10.6667 15.1107V6.21166H8C7.83236 6.21111 7.66829 6.16316 7.52673 6.07336C7.38517 5.98356 7.2719 5.85556 7.19998 5.70414C7.12685 5.55446 7.09803 5.387 7.11693 5.22148C7.13583 5.05597 7.20166 4.89931 7.30665 4.76997L10.8623 0.320463C10.9477 0.22001 11.054 0.139324 11.1737 0.083992C11.2934 0.0286589 11.4238 0 11.5556 0C11.6875 0 11.8178 0.0286589 11.9376 0.083992C12.0573 0.139324 12.1635 0.22001 12.249 0.320463L15.8046 4.76997C15.9096 4.89931 15.9755 5.05597 15.9944 5.22148C16.0133 5.387 15.9844 5.55446 15.9113 5.70414Z"
                    fill="#2A2B2A"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex gap-[0.5vw]">
            {/* open modal to enable you to add account  */}
            <BasicModal
              btnWord={"Add Account"}
              btnIcon={addIcon}
              btnColor={"black"}
              modalTitle={"Add Account"}
              forWhat={"add_account"}
              getData={getAccounts}
            />
            {/* open modal to enable you to remove selected accounts  */}
            <BasicModal
              btnWord={"Remove Accounts"}
              btnColor={"white"}
              modalTitle={"Remove Accounts?"}
              forWhat={"remove_account"}
              getData={getAccounts}
              dataToRemove={selectedAccountIds}
              selectedAccounts={selectedAccounts}
              onRemoveSuccess={() => setSelectedAccountIds([])} // Callback to clear selection
            />
          </div>
        </div>
      </div>

      {/* // table has all accounts  */}
      <div className="flex w-full">
        <div className={`${styles.box} w-full px-[0.5vw] `}>
          <div className={`${styles.tableContent}`}>
            <ul
              className={`${styles.tableHeader} flex justify-center items-center py-[2vh]`}
            >
              <li className="w-[5%] flex justify-center items-center">
                <CustomCheckBox
                  onChange={handleSelectAll}
                  checked={
                    selectedAccountIds.length ===
                      pageState.fetchedAccounts.length &&
                    pageState.fetchedAccounts.length > 0
                  }
                  indeterminate={
                    selectedAccountIds.length > 0 &&
                    selectedAccountIds.length < pageState.fetchedAccounts.length
                  }
                />
              </li>

              <li className="w-[22%] flex justify-center">
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

              <li className="w-[22%] flex justify-center">
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
                  <p>Platform</p>
                </div>
              </li>

              <li className="w-[22%] flex justify-center">
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

              <li className="w-[22%] flex justify-center">
                <div className="flex items-center gap-[0.7vw]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="18"
                    viewBox="0 0 21 18"
                    fill="none"
                  >
                    <path
                      d="M12.8096 2.78437C12.8096 2.04591 12.5153 1.3377 11.9915 0.815524C11.4676 0.293353 10.7572 0 10.0163 0C9.2755 0 8.56502 0.293353 8.04117 0.815524C7.51733 1.3377 7.22304 2.04591 7.22304 2.78437C7.22304 3.52284 7.51733 4.23105 8.04117 4.75323C8.56502 5.2754 9.2755 5.56875 10.0163 5.56875C10.7572 5.56875 11.4676 5.2754 11.9915 4.75323C12.5153 4.23105 12.8096 3.52284 12.8096 2.78437ZM0.64581 11.2631H4.39527V7.53062L4.4053 7.30562C4.43791 6.93437 4.55327 6.58687 4.73134 6.28062H1.27406L1.12735 6.28937C0.822309 6.3252 0.541069 6.47137 0.336969 6.70016C0.132869 6.92895 0.0201046 7.22446 0.020064 7.53062V10.6381C0.020064 10.8039 0.0861226 10.9629 0.203708 11.0801C0.321293 11.1973 0.479519 11.2631 0.64581 11.2631ZM20.0527 10.6381C20.0527 10.8039 19.9867 10.9629 19.8691 11.0801C19.7515 11.1973 19.592 11.2631 19.4257 11.2631H15.6437V7.53062L15.6361 7.34437C15.6082 6.96969 15.4959 6.60609 15.3076 6.28062H18.7987C19.1061 6.2807 19.4027 6.39328 19.6322 6.59699C19.8618 6.80069 20.0083 7.08133 20.0439 7.38562L20.0527 7.53062V10.6381ZM14.3809 7.38562C14.3452 7.08112 14.1985 6.8003 13.9687 6.59657C13.7389 6.39284 13.442 6.28039 13.1344 6.28062H6.90452L6.75781 6.28937C6.45277 6.3252 6.17153 6.47137 5.96743 6.70016C5.76333 6.92895 5.65056 7.22446 5.65052 7.53062V11.2631H14.3897V7.53062L14.3809 7.38562ZM16.2719 0.785625C16.9081 0.785625 17.5183 1.03756 17.9682 1.48601C18.4181 1.93445 18.6708 2.54268 18.6708 3.17688C18.6708 3.81107 18.4181 4.4193 17.9682 4.86774C17.5183 5.31619 16.9081 5.56812 16.2719 5.56812C15.6355 5.56812 15.0252 5.31612 14.5752 4.86756C14.1252 4.419 13.8724 3.81061 13.8724 3.17625C13.8724 2.54189 14.1252 1.9335 14.5752 1.48494C15.0252 1.03638 15.6355 0.785625 16.2719 0.785625ZM6.18097 3.17563C6.18097 2.54143 5.92823 1.9332 5.47834 1.48476C5.02846 1.03631 4.41829 0.784375 3.78206 0.784375C3.14584 0.784375 2.53567 1.03631 2.08578 1.48476C1.6359 1.9332 1.38316 2.54143 1.38316 3.17563C1.38316 3.80982 1.6359 4.41805 2.08578 4.86649C2.53567 5.31494 3.14584 5.56687 3.78206 5.56687C4.41829 5.56687 5.02846 5.31494 5.47834 4.86649C5.92823 4.41805 6.18097 3.80982 6.18097 3.17563ZM0.627 12.5131C0.460709 12.5131 0.301229 12.579 0.183644 12.6962C0.0660589 12.8134 0 12.9724 0 13.1381V14.3881C0 15.2169 0.330294 16.0118 0.91822 16.5978C1.50615 17.1839 2.30355 17.5131 3.135 17.5131H16.929C17.7605 17.5131 18.5579 17.1839 19.1458 16.5978C19.7337 16.0118 20.064 15.2169 20.064 14.3881V13.1381C20.064 12.9724 19.9979 12.8134 19.8804 12.6962C19.7628 12.579 19.6033 12.5131 19.437 12.5131H0.627Z"
                      fill="black"
                    />
                  </svg>
                  <p>Followers</p>
                </div>
              </li>

              <li className="w-[22%] flex justify-center">
                <div className="flex items-center gap-[0.7vw]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="18"
                    viewBox="0 0 21 18"
                    fill="none"
                  >
                    <path
                      d="M3.135 5.85938H0.78375C0.350885 5.85938 0 6.20914 0 6.64062V16.4062C0 16.8377 0.350885 17.1875 0.78375 17.1875H3.135C3.56787 17.1875 3.91875 16.8377 3.91875 16.4062V6.64062C3.91875 6.20914 3.56787 5.85938 3.135 5.85938Z"
                      fill="#2A2B2A"
                    />
                    <path
                      d="M13.2111 5.85938C12.6076 5.85938 12.2217 5.21832 12.5057 4.6875L13.9335 2.01902C14.4228 1.10449 13.7579 0 12.7182 0C12.3529 0 12.0026 0.144648 11.7443 0.402109L7.18773 4.9441C6.59984 5.53016 6.26953 6.325 6.26953 7.15379V14.0625C6.26953 15.7884 7.67311 17.1875 9.40453 17.1875H15.8957C16.9657 17.1875 17.9007 16.4674 18.1708 15.4354L19.9961 8.46098C20.0408 8.28977 20.0635 8.11355 20.0635 7.93664C20.0635 6.78941 19.1305 5.85938 17.9796 5.85938H13.2111Z"
                      fill="#2A2B2A"
                    />
                  </svg>
                  <p>Engagement</p>
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

export default Setting;
