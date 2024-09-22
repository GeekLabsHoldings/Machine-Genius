"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./ChooseFootagePage.module.css";
import { useContext, useEffect, useState } from "react";
import { videoEditingContext } from "@/app/_context/videoEditingContext";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const ImageCard = dynamic(() => import("./ImageCard"), { ssr: false });

interface KeywordsAndImage {
  keyword: string;
  imageUrl: string[];
}

interface ScriptSegment {
  index: number;
  text: string;
  keywordsAndImages: KeywordsAndImage[];
  audioPath: {
    index: number;
    url: string;
    duration: number;
  };
}

interface SelectedFootage {
  index: number;
  imageUrl: string[];
}

const ChooseFootagePage = () => {
  const router = useRouter();
  const { splitedContent, setSplitedContent } = useContext(videoEditingContext);
  const [pageState, setPageState] = useState<{
    selectedScriptSegment: ScriptSegment | null;
    selectedScriptSegmentIndex: number | null;
  }>({
    selectedScriptSegment: null,
    selectedScriptSegmentIndex: null,
  });

  // State to hold selected footage
  function selectedFootageInitValue() {
    if (typeof window !== "undefined") {
      const selectedFootageInitValue = sessionStorage.getItem(
        "VideoEditing-selectedFootage"
      );
      return selectedFootageInitValue
        ? JSON.parse(selectedFootageInitValue)
        : [];
    } else {
      return [];
    }
  }

  const [selectedFootage, setSelectedFootage] = useState<SelectedFootage[]>(
    selectedFootageInitValue
  );

  useEffect(() => {
    sessionStorage.setItem(
      "VideoEditing-selectedFootage",
      JSON.stringify(selectedFootage)
    );
    console.log("VideoEditing-selectedFootage:", selectedFootage);
  }, [selectedFootage]);

  useEffect(() => {
    if (pageState.selectedScriptSegment !== null) {
      setPageState((prev) => ({
        ...prev,
        selectedScriptSegmentIndex: pageState.selectedScriptSegment!.index,
      }));
    }
  }, [pageState.selectedScriptSegment]);

  // useEffect(() => {
  //   console.log(`pageState.selectedScriptSegmentIndex`, pageState.selectedScriptSegmentIndex);
  // }, [pageState.selectedScriptSegmentIndex]);

  // Define selectedSegment using type guards
  const selectedSegment =
    splitedContent !== null &&
    pageState.selectedScriptSegmentIndex !== null &&
    pageState.selectedScriptSegmentIndex < splitedContent.length
      ? splitedContent[pageState.selectedScriptSegmentIndex]
      : null;

  // Function to handle selecting footage
  const handleSelectFootage = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const imageUrl = e.target.value;
    const isChecked = e.target.checked;

    setSelectedFootage((prevSelectedFootage) => {
      // Find if there is already an entry for this index
      const existingIndex = prevSelectedFootage.findIndex(
        (sf) => sf.index === index
      );

      if (existingIndex !== -1) {
        const existing = prevSelectedFootage[existingIndex];
        let updatedImageUrls: string[];

        if (isChecked) {
          // Add imageUrl if not already included
          if (!existing.imageUrl.includes(imageUrl)) {
            updatedImageUrls = [...existing.imageUrl, imageUrl];
          } else {
            updatedImageUrls = existing.imageUrl;
          }
        } else {
          // Remove imageUrl
          updatedImageUrls = existing.imageUrl.filter(
            (url) => url !== imageUrl
          );
        }

        const updatedFootage = { ...existing, imageUrl: updatedImageUrls };
        const newSelectedFootage = [...prevSelectedFootage];
        newSelectedFootage[existingIndex] = updatedFootage;
        return newSelectedFootage;
      } else {
        if (isChecked) {
          // Create new SelectedFootage for this index
          const newSelectedFootageItem: SelectedFootage = {
            index,
            imageUrl: [imageUrl],
          };
          return [...prevSelectedFootage, newSelectedFootageItem];
        } else {
          // Cannot uncheck when it was not checked before
          return prevSelectedFootage;
        }
      }
    });
  };

  useEffect(() => {
    console.log(`selectedFootage`, selectedFootage);
  }, [selectedFootage]);

  // Function to handle navigating to the next page
  const handleNextPage = () => {
    if (splitedContent) {
      const updatedParagraphJson: ScriptSegment[] = splitedContent.map(
        (paragraph) => {
          const selectedFootageItem = selectedFootage.find(
            (sf) => sf.index === paragraph.index
          );

          // Copy the existing keywordsAndImages
          let updatedKeywordsAndImages = [...paragraph.keywordsAndImages];

          if (selectedFootageItem) {
            // Update the imageUrl of the first keyword
            updatedKeywordsAndImages = updatedKeywordsAndImages.map(
              (kwi, idx) => {
                if (idx === 0) {
                  return {
                    ...kwi,
                    imageUrl: selectedFootageItem.imageUrl,
                  };
                }
                return kwi;
              }
            );
          }

          return {
            ...paragraph,
            keywordsAndImages: updatedKeywordsAndImages,
          };
        }
      );

      // Update the context with the new content including selected images
      // setSplitedContent(updatedParagraphJson);
      console.log(`updatedParagraphJson`, updatedParagraphJson);

      // Navigate to the next page
      // router.push("/video-editor/create/video-preview");
    }
  };

  return (
    <div className={`w-full h-full flex flex-col ${styles.footagePreview}`}>
      <div className="flex gap-[2vw] h-[75vh] py-[1.5vw]">
        <div className="w-1/2">
          <h3 className="font-bold !text-[--32px] mb-[--sy-10px]">
            Choose Footage
          </h3>

          {/* Script Preview */}
          <div className={` ${styles.articlePreview} h-[90%]`}>
            <div className={`${styles.articlePreviewData} `}>
              <div className={`${styles.articleHeader} `}>
                <h1 className="mx-auto pb-[--sy-15px]">Script Title</h1>
                <div className="cursor-pointer h-max"></div>
              </div>
              {Array.isArray(splitedContent) && splitedContent.length > 0 ? (
                splitedContent.map((scriptSegment: ScriptSegment) => (
                  <div
                    className={`${styles.articleContent} cursor-pointer`}
                    key={scriptSegment.index}
                  >
                    <p
                      className={`${
                        pageState.selectedScriptSegment?.index ===
                        scriptSegment.index
                          ? styles.active
                          : ""
                      }`}
                      onClick={() =>
                        setPageState((prevState) => ({
                          ...prevState,
                          selectedScriptSegment: scriptSegment,
                        }))
                      }
                    >
                      {scriptSegment.text}
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  <p>No data available!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-[1vw]">
          <div className="flex justify-between">
            <h3 className="font-bold text-[--24px]">Footage Found</h3>
          </div>
          {/* holds sample of footage */}

          <div className="w-full overflow-x-auto">
            <div className="flex gap-[1.25vw] pb-[--sy-5px]">
              {selectedSegment ? (
                selectedSegment.keywordsAndImages.length > 0 &&
                selectedSegment.keywordsAndImages[0].imageUrl.length > 0 ? (
                  selectedSegment.keywordsAndImages[0].imageUrl.map(
                    (imageUrl) => (
                      <div className="!w-[194px]" key={uuidv4()}>
                        <ImageCard
                          inputName="select-footage"
                          imgSrc={imageUrl}
                          checked={selectedFootage.some(
                            (sf) =>
                              sf.index ===
                                pageState.selectedScriptSegmentIndex &&
                              sf.imageUrl.includes(imageUrl)
                          )}
                          onChange={(e) => {
                            if (pageState.selectedScriptSegmentIndex !== null) {
                              handleSelectFootage(
                                e,
                                pageState.selectedScriptSegmentIndex
                              );
                            }
                          }}
                        />
                      </div>
                    )
                  )
                ) : (
                  <div>
                    <p>No footage found!</p>
                  </div>
                )
              ) : (
                <div>
                  <p>Please select a paragraph!</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-[--24px]">Out Sourced Footage</p>

            <CustomBtn
              word="Insert Source"
              btnColor={"black"}
              paddingVal="py-[--8px] px-[--24px]"
            />
          </div>
        </div>
      </div>

      {/* buttons lead you to last and next page */}
      <div className="flex justify-between mt-[--sy-30px]">
        <CustomBtn
          word="Back"
          btnColor={"white"}
          href="/video-editor/create/converted-script"
        />
        <CustomBtn
          word="Next"
          btnColor={"black"}
          // href="/video-editor/create/video-preview"
          disabled={selectedFootage.length === 0}
          onClick={() => {
            console.log(`selectedFootage`, selectedFootage);
            handleNextPage();
          }}
        />
      </div>
    </div>
  );
};

export default ChooseFootagePage;
