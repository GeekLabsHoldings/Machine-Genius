"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./chooseArticles.module.css";
import TopicColapse from "@/app/_components/TopicCollapse/TopicCollapse";
// import ArticleWithCheck from "@/app/_components/ArticleWithCheck/ArticleWithCheck";
import { globalContext } from "@/app/_context/store";
import { useContext, useEffect, useState } from "react";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";
import { useRouter } from "next/navigation";



export default function ChooseArticlesPage() {
  const router = useRouter();

  // favorite icon
  const favIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" fill="none">
      <g filter="url(#filter0_i_623_11960)">
        <path d="M11.3675 3.38104C7.17949 -2.47623 0 -0.121939 0 5.8532C0 11.8284 11.9659 20 11.9659 20C11.9659 20 23.3333 11.5004 23.3333 5.8532C23.3333 0.205986 16.7522 -2.47621 12.5641 3.38104L11.9659 3.84887L11.3675 3.38104Z" />
      </g>
      <defs>
        <filter
          id="filter0_i_623_11960"
          x="0"
          y="0"
          width="23.333"
          height="21.1111"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.11111" />
          <feGaussianBlur stdDeviation="1.66667" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_623_11960"
          />
        </filter>
      </defs>
    </svg>
  );

  // const [isChoosedArticles, setIsChoosedArticles] = useState(false);
  const [previewText, setPreviewText] = useState<any>("");

  const {
    // previewText,
    // setPreviewText,
    choosedArticles,
    setChoosedArticles,    
    collectedData,
    setCollectedData,
  } = useContext(globalContext);

  useEffect(() => {
    console.log("collectedData:", collectedData);
    // reset choosedArticles
    setChoosedArticles([]);
    if (!collectedData && !sessionStorage.getItem("collectedData")) {
      // window.alert(
      //   "No data is available. You will be redirected to refetch new data!"
      // );
      // router.push("/content-creator/create/choose-brand");
    } else {
      if (typeof window !== "undefined") {
        const storedData = sessionStorage.getItem("collectedData");
        if (storedData) {
          setCollectedData(JSON.parse(storedData));
        }
      }
    }
  }, []);

  useEffect(() => {
    console.log("choosedArticles", choosedArticles);
    // if (choosedArticles.length > 0) {
    //   setIsChoosedArticles(true);
    // } else {
    //   setIsChoosedArticles(false);
    // }
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "choosedArticles",
        JSON.stringify(choosedArticles)
      );
    }
  }, [choosedArticles]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-start gap-[2rem] h-[75vh] py-[1.5vw]">
        {/* scripts wrapper */}
        <div className={styles.scripts_wrapper + " w-1/2"}>
          {/* scripts header that  */}
          <div className={styles.header}>
            <h6>Scripts</h6>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  d="M10.4999 0.000109476C8.42325 0.000109476 6.3932 0.61592 4.66649 1.76967C2.93979 2.92342 1.59398 4.56328 0.799265 6.4819C0.0045495 8.40051 -0.203384 10.5117 0.201758 12.5485C0.606901 14.5853 1.60692 16.4562 3.07537 17.9246C4.54381 19.3931 6.41472 20.3931 8.45151 20.7982C10.4883 21.2034 12.5995 20.9955 14.5181 20.2007C16.4367 19.406 18.0766 18.0602 19.2303 16.3335C20.3841 14.6068 20.9999 12.5767 20.9999 10.5001C21.0062 9.11941 20.7389 7.7512 20.2135 6.47443C19.6881 5.19767 18.9149 4.03765 17.9386 3.06138C16.9623 2.08511 15.8023 1.31193 14.5256 0.7865C13.2488 0.261066 11.8806 -0.00620935 10.4999 0.000109476ZM11.4545 15.2728C11.4545 15.5259 11.3539 15.7687 11.1749 15.9477C10.9959 16.1267 10.7531 16.2273 10.4999 16.2273C10.2468 16.2273 10.004 16.1267 9.82499 15.9477C9.64597 15.7687 9.54541 15.5259 9.54541 15.2728V9.54551C9.54541 9.29235 9.64597 9.04956 9.82499 8.87055C10.004 8.69154 10.2468 8.59097 10.4999 8.59097C10.7531 8.59097 10.9959 8.69154 11.1749 8.87055C11.3539 9.04956 11.4545 9.29235 11.4545 9.54551V15.2728ZM10.4999 6.68189C10.3112 6.68189 10.1266 6.62591 9.96963 6.52102C9.81266 6.41614 9.69031 6.26706 9.61807 6.09264C9.54582 5.91822 9.52692 5.72629 9.56375 5.54113C9.60058 5.35597 9.69149 5.18588 9.82499 5.05239C9.95848 4.91889 10.1286 4.82798 10.3137 4.79115C10.4989 4.75432 10.6908 4.77322 10.8652 4.84547C11.0397 4.91772 11.1887 5.04006 11.2936 5.19704C11.3985 5.35401 11.4545 5.53856 11.4545 5.72735C11.4545 5.98051 11.3539 6.2233 11.1749 6.40231C10.9959 6.58132 10.7531 6.68189 10.4999 6.68189Z"
                  fill="#2A2B2A"
                />
              </svg>
            </span>
          </div>

          {/* topics container */}
          <div className={styles.select_article_container}>
            {/* topic collapse */}

            {collectedData
              ?.filter((item: any) => item.articleJson.length > 0)
              .map((item: any, i: number) => (
                <TopicColapse
                  forComments={false}
                  svgBtn={favIcon}
                  title={item.generalTitle}
                  key={i} // Consider using a more unique key if possible
                  date={"April 16th 2024"}
                >
                  {item?.articleJson.map((ele: any, j: number) => (
                    <div
                      className={`${styles.article_with_check} group`}
                      style={{ "--module-color": "#2A2B2A" }}
                      key={j} // Consider using a more unique key if possible
                    >
                      <CustomCheckBox
                        name="select-articles"
                        value={ele?.title}
                        accentColor="#2A2B2A"
                        onChange={() => {
                          // setChoosedArticles((prevArticles: any) => [
                          //   ...prevArticles,
                          //   ele,
                          // ])

                          setChoosedArticles((prevArticles: any) => {
                            if (
                              prevArticles.some(
                                (article: any) => article.title === ele.title
                              )
                            ) {
                              return prevArticles.filter(
                                (article: any) => article.title !== ele.title
                              );
                            } else {
                              return [...prevArticles, ele];
                            }
                          });
                        }}
                      />
                      <label
                        className={`${styles.article}`}
                        onClick={() => setPreviewText(ele.content)}
                      >
                        {ele?.title}
                      </label>
                    </div>
                  ))}
                </TopicColapse>
              ))}
          </div>
        </div>

        {/* preview wrapper */}
        <div className={styles.preview_wrapper + " w-1/2"}>
          <div className={styles.header}>
            <h6>Preview</h6>
          </div>
          <div className={styles.selected_article_container}>{previewText}</div>
        </div>
      </div>

      {/* buttons to move to last or next page */}
      <div className="flex justify-between w-full">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          // href={"/content-creator/create/choose-content"}
          href={"/content-creator/create/choose-brand"}
        />

        {/* {isChoosedArticles ? (
          <CustomBtn
            word="Next"
            btnColor="black"
            href="/content-creator/create/create-article"
          />
        ) : (
          <CustomBtn
            word="Next"
            btnColor="black"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // window.alert("Please select at least one article");
            }}
          />
        )} */}

        <CustomBtn
          word="Next"
          btnColor="black"
          href="/content-creator/create/create-article"
        />
      </div>
    </div>
  );
}
