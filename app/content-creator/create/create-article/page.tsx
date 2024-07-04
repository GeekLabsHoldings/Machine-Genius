"use client";
import { useState } from "react";
import styles from "./create-article.module.css";
import ArticleWithCheck from "../../../_components/ArticleWithCheck/ArticleWithCheck";
import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomCheckBox from "@/app/_components/CustomCheckBox/CustomCheckBox";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import { SelectArticleData } from "@/app/_data/data";
import { globalContext } from "@/app/_context/store";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";

// page for article creation so you can highlight text and keep it in selection section
const CreateArticle = () => {
  // const [selectedText, setSelectedText] = useState<string[]>([]);

  // state keeps selected text to display them in selection section
  const {
    selectedText,
    setSelectedText,
    setFinalArticle,
    choosedArticles,
    collectedData,
    selectedArticle,
  } = useContext(globalContext);

  // state to enable text selection when click on highlight button
  const [beginSelect, setBeginSelect] = useState(false);
  // const [selectedArticle, setSelectedArticle] = useState<string | number>();

  // return selected text in selections
  // @ts-ignore
  const renderSelectedTxt = selectedText.map((oneTxt) => (
    <div>
      <div className={`${styles.singleArticle}`}>
        <ArticleWithCheck
          accsentColor="#2A2B2A"
          article={oneTxt}
          name="selected-articles"
        />
      </div>
    </div>
  ));

  const handleCheckAllSelectedText = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Get all checkbox elements
    var checkboxes = document.querySelectorAll(
      'input[name="selected-articles"]'
    );

    if (e.target.checked) {
      // Loop through each checkbox and set checked property to true
      checkboxes.forEach(function (checkbox: any) {
        checkbox.checked = true;
      });
    } else {
      // Loop through each checkbox and set checked property to false
      checkboxes.forEach(function (checkbox: any) {
        checkbox.checked = false;
      });
    }
  };

  // state to handle content while page is loading its content
  const [IsLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function finalizeContent() {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/finalize-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectContent: selectedText.join(" "),
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await res.json();
      setFinalArticle(json.articles);
      router.push("/content-creator/create/final-article");
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelectedText = () => {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString();
      // @ts-ignore
      setSelectedText((prev) => [...prev, selectedText]);
    }
  };

  // function that get role value from select option by send it as a prop
  //   const getSelectedArticle = (value: string | number) => {
  //     setSelectedArticle(value)
  //     console.log(selectedArticle);
  // }

  function previewSelectedArticle() {
    const article = collectedData?.allContent.find(
      (e: any) => e.text.split("\n")[0] === selectedArticle
    );
    return article?.content.join(" ");
  }

  return (
    <div className="flex flex-col">
      {/* check on loading state to render the correct content based on it */}
      {IsLoading ? (
        <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
          <LogoAndTitle
            needTxt={true}
            textNeeded="Hold on tight."
            title="Genius is working on your article.."
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[75vh] py-[1.5vw]">
          <div className="flex justify-between gap-[2vw] h-full w-full">
            <div className="w-7/12 flex flex-col gap-[3vh] h-full">
              <div className={`${styles.articlesToSelect} h-[15%]`}>
                <h3>Articles</h3>
                <div className="flex items-center gap-3">
                  <div className="w-11/12">
                    {/* select article to read */}
                    <CustomSelectInput
                      label="Select Article"
                      // options={SelectArticleData}
                      // options={collectedData.allContent
                      //   ?.filter((item: any) => item.text !== "")
                      //   .map((e: any) => e.text.split("\n")[0])}
                      options={choosedArticles
                        ?.filter((item: any) => item.text !== "")
                        .map((item: any) => item.text.split("\n")[0])}
                      // getValue={getSelectedArticle}
                    />
                  </div>
                  {/* highlighting button */}
                  <div
                    className={`w-1/12 flex justify-end cursor-pointern ${styles.highlightSvg}`}
                    onClick={() => {
                      setBeginSelect(true);
                    }}
                  >
                    <svg
                      viewBox="0 0 30 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 26.6436L5.51027 28.4211L7.46523 26.4532L3.76819 22.7319L0 26.6436ZM6.87185 13.3208C6.58154 13.5787 6.37108 13.9153 6.26557 14.2903C6.16006 14.6653 6.16396 15.0629 6.27682 15.4357L6.99648 17.8132L4.18785 20.6409L9.49463 25.9825L12.2994 23.1593L14.6564 23.8854C15.4135 24.1185 16.2363 23.8848 16.7602 23.287L18.7207 20.9756L9.16155 11.3536L6.87185 13.3208ZM29.1131 4.40048L25.6279 0.892285C24.4979 -0.245102 22.6841 -0.302276 21.4852 0.761838L10.5082 10.1962L19.8705 19.6206L29.2427 8.5709C30.3004 7.36412 30.2436 5.53842 29.1131 4.40048Z"
                        fill={`${beginSelect ? "#F36F24" : "#2A2B2A"}`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* display chosen article  */}
              {/* <ArticlePreview
                yourNewArticle={false}
                height="h-[80%]"
                beginSelect={beginSelect}
                withEdit={false}
                isEditable={true}
              /> */}

              <div className={` ${styles.articlePreview} !h-[57vh]`}>
                <div className={`${styles.articlePreviewData} `}>
                  <div>
                    <div className={`${styles.articleContent} `}>
                      <p
                        contentEditable={true}
                        className={beginSelect ? styles.beginSelection : ""}
                        onMouseUp={handleSelectedText}
                      >
                        {previewSelectedArticle()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className={` ${styles.articlePreview}  `}>
                <div className={`${styles.articlePreviewData} `}>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque nesciunt in mollitia amet. Optio impedit sed
                    voluptates, facilis cum provident nihil magnam. Omnis
                    voluptates ipsam rem. Architecto placeat harum dolorem
                    laboriosam consequuntur blanditiis libero quisquam ad neque
                    modi eos sint, odio inventore impedit exercitationem quae
                    iure ex, maxime laudantium similique.
                  </p>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque nesciunt in mollitia amet. Optio impedit sed
                    voluptates, facilis cum provident nihil magnam. Omnis
                    voluptates ipsam rem. Architecto placeat harum dolorem
                    laboriosam consequuntur blanditiis libero quisquam ad neque
                    modi eos sint, odio inventore impedit exercitationem quae
                    iure ex, maxime laudantium similique.
                  </p>{" "}
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque nesciunt in mollitia amet. Optio impedit sed
                    voluptates, facilis cum provident nihil magnam. Omnis
                    voluptates ipsam rem. Architecto placeat harum dolorem
                    laboriosam consequuntur blanditiis libero quisquam ad neque
                    modi eos sint, odio inventore impedit exercitationem quae
                    iure ex, maxime laudantium similique.
                  </p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque nesciunt in mollitia amet. Optio impedit sed voluptates, facilis cum provident nihil magnam. Omnis voluptates ipsam rem. Architecto placeat harum dolorem laboriosam consequuntur blanditiis libero quisquam ad neque modi eos sint, odio inventore impedit exercitationem quae iure ex, maxime laudantium similique.</p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque nesciunt in mollitia amet. Optio impedit sed voluptates, facilis cum provident nihil magnam. Omnis voluptates ipsam rem. Architecto placeat harum dolorem laboriosam consequuntur blanditiis libero quisquam ad neque modi eos sint, odio inventore impedit exercitationem quae iure ex, maxime laudantium similique.</p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque nesciunt in mollitia amet. Optio impedit sed voluptates, facilis cum provident nihil magnam. Omnis voluptates ipsam rem. Architecto placeat harum dolorem laboriosam consequuntur blanditiis libero quisquam ad neque modi eos sint, odio inventore impedit exercitationem quae iure ex, maxime laudantium similique.</p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque nesciunt in mollitia amet. Optio impedit sed voluptates, facilis cum provident nihil magnam. Omnis voluptates ipsam rem. Architecto placeat harum dolorem laboriosam consequuntur blanditiis libero quisquam ad neque modi eos sint, odio inventore impedit exercitationem quae iure ex, maxime laudantium similique.</p>
                </div>
              </div> */}
            </div>

            {/* selections part */}
            <div className={`w-5/12 ${styles.selectionsHeader}`}>
              <div className="flex justify-between items-center">
                <div className={`${styles.checkSelection} items-center flex`}>
                  {/* to select all of highlighted text */}
                  <CustomCheckBox
                    value={""}
                    onChange={(e) => handleCheckAllSelectedText(e)}
                    accentColor="#2A2B2A"
                  />
                  <h2>Selections</h2>
                </div>
                {/* delete button to delete selected highlighted text */}
                <div className={styles.deleteSvg}>
                  <svg
                    viewBox="0 0 22 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.6 1.1V2.2H1.1C0.492492 2.2 0 2.69249 0 3.3V4.4C0 5.00751 0.492492 5.5 1.1 5.5H20.9C21.5075 5.5 22 5.00751 22 4.4V3.3C22 2.69249 21.5075 2.2 20.9 2.2H15.4V1.1C15.4 0.492487 14.9075 0 14.3 0H7.7C7.09249 0 6.6 0.492487 6.6 1.1Z"
                      fill="#2A2B2A"
                    />
                    <path
                      d="M2.11538 7.7H19.8843L18.8478 21.6938C18.7201 23.417 17.2848 24.75 15.5568 24.75H6.44294C4.71497 24.75 3.2796 23.417 3.15196 21.6938L2.11538 7.7Z"
                      fill="#2A2B2A"
                    />
                  </svg>
                </div>
              </div>
              {/* return highlighted text */}
              <div className={`${styles.selectionsParent}`}>
                {renderSelectedTxt}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* buttons to move to last or next page */}
      <div className="flex justify-between items-center">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/content-creator/create/choose-articles"}
        />
        <CustomBtn word={"Next"} btnColor="black" onClick={finalizeContent} />
      </div>
    </div>
  );
};
export default CreateArticle;
