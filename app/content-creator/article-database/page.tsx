"use client";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import styles from "./article-database.module.css";
import { ArticleNames, Brands, ContentTypeFilter } from "@/app/_data/data";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ContentDatabase = () => {
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

  useEffect(() => {
    getContentDatabase();
  }, []);

  const renderYourArticles = contentDatabase.map(
    (oneArticle: any, idx: any) => (
      <ul
        key={idx}
        className={`${styles.tableBody} borderBottom articleRow `}
        // onClick={(e)=>{handleSelectedBg(e)}}
      >
        <li className="w-[30%]">{oneArticle._id}</li>
        <li className="w-[40%]">{oneArticle.content_title}</li>
        <li className="w-[10%]">
          <span
            className={
              oneArticle.brand === "STP"
                ? "bg-[#31B2E9B2]"
                : oneArticle.brand === "Canada"
                ? "bg-[#E9313EB2]"
                : oneArticle.brand === "PST Asia"
                ? "bg-[#E1C655B2]"
                : oneArticle.brand === "Investocracy"
                ? "bg-[#5FA85BB5]"
                : "bg-[#F36F24B2]"
            }
          >
            {oneArticle.brand}
          </span>
        </li>
        <li className={`w-[10%]  ${styles.contentType}`}>
          {oneArticle.content_type}
        </li>

        <li className={` w-[10%] ${styles.edit}`}>
          <button
            onClick={() => {
              // todo: redirect to edit page
            }}
          >
            Edit
          </button>
        </li>
      </ul>
    )
  );

  return (
    <div className={`${styles.articleDatabase} w-full h-full pt-[0.5vw]`}>
      {/* filters options to filter and edit data in table */}
      <div className={`flex flex-col gap-[0.7vw] w-full pageHeader`}>
        <h3>Filter By:</h3>
        <div className={`${styles.filters} flex gap-[1vw]`}>
          <div className="flex flex-col w-2/12 gap-[0.3vw]">
            <h5>Content Title</h5>
            <CustomSelectInput label="All" options={ArticleNames} />
          </div>
          <div className="flex flex-col w-2/12 gap-[0.3vw]">
            <h5>Brand</h5>
            <CustomSelectInput label="All" options={Brands} />
          </div>
          <div className="flex flex-col w-2/12 gap-[0.3vw]">
            <h5>Content Type</h5>
            <CustomSelectInput label="All" options={ContentTypeFilter} />
          </div>
        </div>
      </div>

      {/* // table has all articles and its data  */}
      <div className={`${styles.box} w-full px-[0.5vw] `}>
        <div className={`${styles.tableContent}`}>
          <ul
            className={`${styles.tableHeader} flex justify-center items-center py-[2vh]`}
          >
            <li className="w-[30%]">#</li>
            <li className="w-[40%] ">Content Title</li>
            <li className="w-[10%] ">Brand</li>
            <li className="w-[10%] ">Content Type</li>
            <li className="w-[10%]">Edit</li>
          </ul>

          <div className={styles.tableBodyWrapper}>{renderYourArticles}</div>
        </div>
      </div>
    </div>
  );
};

export default ContentDatabase;
