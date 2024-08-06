"use client";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "./article-database.module.css";
// import { ArticleNames, Brands, ContentTypeFilter } from "@/app/_data/data";
import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { truncateText } from "@/app/_utils/text";
import { globalContext } from "@/app/_context/store";
import { useRouter } from "next/navigation";

const ContentDatabase = () => {
  const router = useRouter();
  const [contentDatabase, setContentDatabase] = useState<any>([]);

  async function getContentDatabase() {
    const maxRetries = 2; // Define the maximum number of retries
    let attempts = 0;
    let json = null;

    while (attempts < maxRetries) {
      try {
        const res = await fetch(
          `https://backendmachinegenius.onrender.com/content`
        );
        json = await res.json();
        if (json) {
          // If valid data is found, break the loop
          break;
        }
      } catch (error) {
        toast.error("Something went wrong! Contact backend department");
        console.error("Error getContentDatabase:", error);
      } finally {
        attempts++;
      }
    }

    if (json) {
      setContentDatabase(json);
    } else {
      // setIsRetry(true);
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }

  const { editContentData, setEditContentData } = useContext(globalContext);

  useEffect(() => {
    setEditContentData(null);
    sessionStorage.removeItem("editContentData");
    getContentDatabase();
  }, []);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  const renderYourArticles = contentDatabase.map(
    (oneArticle: any, idx: any) => (
      <ul
        key={idx}
        className={`${styles.tableBody} borderBottom articleRow `}
        // onClick={(e)=>{handleSelectedBg(e)}}
      >
        <li className="w-[5%]">{idx + 1}</li>
        <li className="w-[60%]">{oneArticle?.content_title}</li>
        <li className="w-[10%]">
          <span
            className={
              oneArticle?.brand === "PST Canada"
                ? "bg-[#31B2E9B2]"
                : oneArticle?.brand === "PST USA"
                ? "bg-[#E9313EB2]"
                : oneArticle?.brand === "Movie Myth"
                ? "bg-[#E1C655B2]"
                : oneArticle?.brand === "Investorcracy"
                ? "bg-[#5FA85BB5]"
                : "bg-[#F36F24B2]"
            }
          >
            {oneArticle?.brand}
          </span>
        </li>
        <li className={`w-[10%]  ${styles.contentType}`}>
          {oneArticle?.content_type}
        </li>
        <li className="w-[10%]">
          {oneArticle?.date ? formatDate(oneArticle?.date) : "-"}
        </li>
        <li className={` w-[5%] ${styles.edit}`}>
          <button
            onClick={() => {
              setEditContentData(oneArticle);
            }}
          >
            Edit
          </button>
        </li>
      </ul>
    )
  );

  useEffect(() => {
    // console.log("editContentData", editContentData);
    if (editContentData) {
      editContentData.brand === "Movie Myth"
        ? router.replace("/content-creator/create/movie-myth/final-movie")
        : router.replace("/content-creator/create/final-article");
    }
  }, [editContentData]);

  return (
    <div className={`${styles.articleDatabase} w-full h-full pt-[0.5vw]`}>
      {/* filters options to filter and edit data in table */}
      <div className={`flex flex-col gap-[0.7vw] w-full pageHeader`}>
        <h3>Filter By:</h3>
        <div className={`${styles.filters} flex gap-[1vw]`}>
          <div className="flex flex-col w-2/12 gap-[0.3vw]">
            <h5>Brand</h5>
            <CustomSelectInput
              label="All"
              options={contentDatabase
                .map((item: any) => item.brand)
                .filter(
                  (item: any, index: any, self: any) =>
                    self.indexOf(item) === index
                )}
            />
          </div>
          <div className="flex flex-col w-2/12 gap-[0.3vw]">
            <h5>Content Type</h5>
            <CustomSelectInput
              label="All"
              options={contentDatabase
                .map((item: any) => item.content_type)
                .filter(
                  (item: any, index: any, self: any) =>
                    self.indexOf(item) === index
                )}
            />
          </div>
          <div className="flex flex-col w-[10%] gap-[0.3vw]">
            <h5>Date</h5>
            <div className={`${styles.changeOrder} `}>
              <h5>Date</h5>
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
      </div>

      {/* // table has all articles and its data  */}
      <div className={`${styles.box} w-full px-[0.5vw] `}>
        <div className={`${styles.tableContent}`}>
          <ul
            className={`${styles.tableHeader} flex justify-center items-center py-[2vh]`}
          >
            <li className="w-[5%]">#</li>
            <li className="w-[60%] ">Content Title</li>
            <li className="w-[10%] ">Brand</li>
            <li className="w-[10%] ">Content Type</li>
            <li className="w-[10%] ">Date</li>
            <li className="w-[5%]">Edit</li>
          </ul>

          <div className={styles.tableBodyWrapper}>{renderYourArticles}</div>
        </div>
      </div>
    </div>
  );
};

export default ContentDatabase;
