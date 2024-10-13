"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./ChooseFootagePage.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { videoEditingContext } from "@/app/_context/videoEditingContext";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import useSessionStorage from "@/app/_hooks/useSessionStorage";
import { on } from "node:events";

const ImageCard = dynamic(() => import("./ImageCard"), { ssr: false });

interface KeywordsAndImage {
  keyword: string;
  imageUrl: string[];
}

interface ScriptSegment {
  index: number;
  title?: string;
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

function TitleEdit({
  title,
  onSubmit,
}: {
  title: string;
  onSubmit: (title: string) => void;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [textValue, setTextValue] = useState<string>(title);

  useEffect(() => {
    setTextValue(title);
  }, [title]);

  useEffect(() => {
    if (!isEditing) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <form
      className="flex items-center gap-[--10px]"
      onSubmit={(e) => {
        e.preventDefault();
        setIsEditing(false);
        onSubmit(textValue);
      }}
    >
      <span className="font-bold text-[--15px] text-[#1e40af]">Title:</span>
      <div
        className={`w-fit grow-0 border group-hover:opacity-100
                          aborder-indigo-300 gap-[--5px] bg-[#dbeafe] flex justify-center items-center rounded-md px-[--8px] py-[--4px]`}
        onClick={() => {
          setIsEditing(true);
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="Add keyword"
          className={`outline-none bg-transparent text-[--15px] text-[#2563eb] transform transition-all duration-300`}
          onBlur={() => {
            setIsEditing(false);
            onSubmit(textValue);
          }}
        />
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          className="w-[--14px] h-[--14px] stroke-[#1e40af]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </div>
    </form>
  );
}

function AddChips({
  currentIndex,
  index,
}: {
  currentIndex: number;
  index: number;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className={`w-fit grow-0 border group-hover:opacity-100
                          ${currentIndex == index ? "opacity-100" : "opacity-0"}
                          ${isEditing ? "gap-[--10px]" : "gap-0"}
                          aborder-indigo-300 bg-[#dbeafe] flex justify-center items-center rounded-md px-[--8px] py-[--4px]`}
      onClick={() => {
        setIsEditing(true);
        inputRef.current?.focus();
      }}
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-[--14px] h-[--14px] stroke-[#2563eb]"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
      </span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Add keyword"
        className={`outline-none bg-[#dbeafe] text-[--15px] text-[#2563eb] 
        ${
          isEditing ? "w-[--100px]" : "w-0"
        } transform transition-all duration-300`}
        onBlur={() => setIsEditing(false)}
      />
    </form>
  );
}

const ChooseFootagePage = () => {
  const { handleSignOut } = useContext(globalContext);
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [enhancableLoading, setEnhancableLoading] = useState<boolean>(false);
  const {
    splitedContent,
    setSplitedContent,
    totalIntroSlides,
    setVideoUrl,
    videoUrl,
  } = useContext(videoEditingContext);
  const [pageState, setPageState] = useSessionStorage<{
    selectedScriptSegment: ScriptSegment | null;
    selectedScriptSegmentIndex: number | null;
    createVideoLoading: boolean;
    index: number | null;
  }>(
    "VideoEditing-pageState",
    {
      selectedScriptSegment: null,
      selectedScriptSegmentIndex: null,
      createVideoLoading: false,
      index: null,
    },
    {}
  );
  const [searchFootage, setSearchFootage] = useState<string[]>([]);

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
        selectedScriptSegmentIndex:
          pageState.selectedScriptSegment!.audioPath.index,
      }));
    }
  }, [pageState.selectedScriptSegment]);

  // useEffect(() => {
  //   console.log(`pageState.selectedScriptSegmentIndex`, pageState.selectedScriptSegmentIndex);
  // }, [pageState.selectedScriptSegmentIndex]);

  // Define selectedSegment using type guards
  const selectedSegment =
    splitedContent !== null && pageState.selectedScriptSegmentIndex !== null
      ? splitedContent[
          splitedContent.findIndex(
            (segment) =>
              segment.audioPath.index === pageState.selectedScriptSegmentIndex
          )
        ]
      : null;

  // Function to handle selecting footage
  const handleSelectFootage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const imageUrl = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // call endpoint to check if the image is enhancable
      setEnhancableLoading(true);
      const isEnhancable = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/video-editing/enhance-img`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ input: imageUrl }),
        }
      );

      if (isEnhancable.status === 401) {
        handleSignOut();
        return;
      }
      if (!isEnhancable.ok) {
        // remove the image from selectedSegment.keywordsAndImages
        const updatedKeywordsAndImages = selectedSegment!.keywordsAndImages.map(
          (kwi) => {
            if (kwi.imageUrl.includes(imageUrl)) {
              return {
                ...kwi,
                imageUrl: kwi.imageUrl.filter((url) => url !== imageUrl),
              };
            }
            return kwi;
          }
        );
        console.log(`
                  -------------------------------------
                  -------------------------------------
                  -------------------------------------
                  -------------------------------------
                  -------------------------------------
                  ${updatedKeywordsAndImages}
                  -------------------------------------
                  -------------------------------------
                  -------------------------------------
                  -------------------------------------
                `);
        console.log(updatedKeywordsAndImages);
        // @ts-ignore
        // setSplitedContent((prev) => {
        //   const updatedContent = [...prev];
        //   updatedContent[
        //     pageState.selectedScriptSegmentIndex!
        //   ].keywordsAndImages = updatedKeywordsAndImages;
        //   return updatedContent;
        // });
        setEnhancableLoading(false);
        toast.error("Image is not enhancable");
        return;
      }

      const data = await isEnhancable.json();
      if (data.imgurl) {
        if (searchFootage.length > 0) {
          console.log(`searchFootage`, searchFootage);
          setSearchFootage((prev) =>
            prev.map((url) => {
              if (url === imageUrl) {
                return data.imgurl;
              }
              return url;
            })
          );
        }
        // replce the imageUrl with the new data.imgurl
        const updatedKeywordsAndImages = selectedSegment!.keywordsAndImages.map(
          (kwi) => {
            if (index === pageState.selectedScriptSegmentIndex) {
              if (kwi.imageUrl.includes(imageUrl)) {
                return {
                  ...kwi,
                  imageUrl: kwi.imageUrl.map((url) => {
                    if (url === imageUrl) {
                      return data.imgurl;
                    }
                    return url;
                  }),
                };
              }

              return {
                ...kwi,
                imageUrl: [...kwi.imageUrl, data.imgurl],
              };
            }
            return kwi;
          }
        );

        console.log(`
          -------------------------------------
          -------------------------------------
          -------------------------------------
          -------------------------------------
          -------------------------------------
          ${updatedKeywordsAndImages}
          -------------------------------------
          -------------------------------------
          -------------------------------------
          `);
        console.log(`updatedKeywordsAndImages`, updatedKeywordsAndImages);
        // @ts-ignore
        setSplitedContent((prev) => {
          const updatedContent = [...prev];
          // console.log("pageState.selectedScriptSegmentIndex", pageState

          console.log(`updatedContent`, updatedContent[pageState.index!]);
          updatedContent[pageState.index!].keywordsAndImages[0].imageUrl =
            updatedKeywordsAndImages[0].imageUrl;

          console.log(`updatedContent`, updatedContent);

          // setPageState((prev) => {
          //   return {
          //     ...prev,
          //     selectedScriptSegment:
          //       updatedContent[pageState.selectedScriptSegment?.index!],
          //   };
          // });
          return updatedContent;
        });
      } else {
        // remove the image from selectedSegment.keywordsAndImages
        const updatedKeywordsAndImages = selectedSegment!.keywordsAndImages.map(
          (kwi) => {
            if (kwi.imageUrl.includes(imageUrl)) {
              return {
                ...kwi,
                imageUrl: kwi.imageUrl.filter((url) => url !== imageUrl),
              };
            }
            return kwi;
          }
        );
        console.log(`updatedKeywordsAndImages`, updatedKeywordsAndImages);
        // @ts-ignore
        setSplitedContent((prev) => {
          const updatedContent = [...prev];
          updatedContent[pageState.index!].keywordsAndImages[0].imageUrl =
            updatedKeywordsAndImages[0].imageUrl;
          return updatedContent;
        });
        setEnhancableLoading(false);
        toast.error("Image is not enhancable");
        return;
      }

      setSelectedFootage((prevSelectedFootage) => {
        // Find if there is already an entry for this index
        const existingIndex = prevSelectedFootage.findIndex(
          (sf) => sf.index === index
        );

        if (existingIndex !== -1) {
          const existing = prevSelectedFootage[existingIndex];
          let updatedImageUrls: string[];
          // Add imageUrl if not already included
          if (!existing.imageUrl.includes(imageUrl || data.imgurl)) {
            updatedImageUrls = [...existing.imageUrl, data.imgurl];
          } else {
            updatedImageUrls = existing.imageUrl;
          }

          const updatedFootage = { ...existing, imageUrl: updatedImageUrls };
          const newSelectedFootage = [...prevSelectedFootage];
          newSelectedFootage[existingIndex] = updatedFootage;
          return newSelectedFootage;
        } else {
          // Create new SelectedFootage for this index
          const newSelectedFootageItem: SelectedFootage = {
            index,
            imageUrl: [data.imgurl],
          };
          return [...prevSelectedFootage, newSelectedFootageItem];
        }
      });

      setEnhancableLoading(false);
    } else {
      setSelectedFootage((prevSelectedFootage) => {
        // Find if there is already an entry for this index
        const existingIndex = prevSelectedFootage.findIndex(
          (sf) => sf.index === index
        );

        if (existingIndex !== -1) {
          const existing = prevSelectedFootage[existingIndex];
          let updatedImageUrls: string[];

          // Remove imageUrl
          updatedImageUrls = existing.imageUrl.filter(
            (url) => url !== imageUrl
          );

          const updatedFootage = { ...existing, imageUrl: updatedImageUrls };
          const newSelectedFootage = [...prevSelectedFootage];
          newSelectedFootage[existingIndex] = updatedFootage;
          return newSelectedFootage;
        } else {
          // Cannot uncheck when it was not checked before
          return prevSelectedFootage;
        }
      });
    }
  };

  async function handleCreateVideo() {
    setPageState((prev) => ({ ...prev, createVideoLoading: true }));

    if (!splitedContent) {
      toast.error("No data available!");
      setPageState((prev) => ({ ...prev, createVideoLoading: false }));
      return;
    }

    let introSlides = splitedContent?.slice(0, totalIntroSlides);
    let bodySlides = splitedContent?.slice(totalIntroSlides);

    console.log(`introSlides`, introSlides);
    console.log(`bodySlides`, bodySlides);

    // check if the imageUrl includes the imageUrl from selectedFootage don't use index
    introSlides = introSlides?.map((slide) => {
      const selectedFootageItem = selectedFootage.find((sf) =>
        sf.imageUrl.some((url) =>
          slide.keywordsAndImages[0].imageUrl.includes(url)
        )
      );
      return {
        ...slide,
        keywordsAndImages: [
          {
            ...slide.keywordsAndImages[0],
            imageUrl: selectedFootageItem?.imageUrl || [],
          },
        ],
      };
    });

    bodySlides = bodySlides?.map((slide) => {
      const selectedFootageItem = selectedFootage.find((sf) =>
        sf.imageUrl.some((url) =>
          slide.keywordsAndImages[0].imageUrl.includes(url)
        )
      );
      return {
        ...slide,
        keywordsAndImages: [
          {
            ...slide.keywordsAndImages[0],
            imageUrl: selectedFootageItem?.imageUrl || [],
          },
        ],
      };
    });

    console.log(`introSlides`, introSlides);
    console.log(`bodySlides`, bodySlides);

    const introSlidesJson = introSlides?.reduce<Record<string, any[]>>(
      (acc, slide, index) => {
        acc[`slide${index + 1}Json`] = [slide];
        return acc;
      },
      {}
    );

    // console.log("introSlidesJson", introSlidesJson);

    const requestBody = {
      paragraphJson: bodySlides,
      slideJson: { ...introSlidesJson },
    };

    console.log("requestBody", requestBody);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/video-editing/render-video`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.status === 401) {
        handleSignOut();
      }

      if (!response.ok) {
        toast.error("Failed to create video");
        setPageState((prev) => ({ ...prev, createVideoLoading: false }));
        return;
      }

      const data = await response.json();
      if (data.success) {
        setVideoUrl(data.videoUrl);
      } else {
        toast.error("Failed to create video");
        setPageState((prev) => ({ ...prev, createVideoLoading: false }));
      }
    } catch (error) {
      console.error(`Error creating video:`, error);
      toast.error("Failed to create video");
      setPageState((prev) => ({ ...prev, createVideoLoading: false }));
    }
  }

  useEffect(() => {
    if (videoUrl && pageState.createVideoLoading) {
      toast.success("Video created successfully");
      router.replace("/video-editor/create/video-preview");
    }
  }, [videoUrl]);

  useEffect(() => {
    console.log(`selectedFootage`, selectedFootage);
  }, [selectedFootage]);

  // Function to handle navigating to the next page
  // const handleNextPage = () => {
  //   if (splitedContent) {
  //     const updatedParagraphJson: ScriptSegment[] = splitedContent.map(
  //       (paragraph) => {
  //         const selectedFootageItem = selectedFootage.find(
  //           (sf) => sf.index === paragraph.index
  //         );

  //         // Copy the existing keywordsAndImages
  //         let updatedKeywordsAndImages = [...paragraph.keywordsAndImages];

  //         if (selectedFootageItem) {
  //           // Update the imageUrl of the first keyword
  //           updatedKeywordsAndImages = updatedKeywordsAndImages.map(
  //             (kwi, idx) => {
  //               if (idx === 0) {
  //                 return {
  //                   ...kwi,
  //                   imageUrl: selectedFootageItem.imageUrl,
  //                 };
  //               }
  //               return kwi;
  //             }
  //           );
  //         }

  //         return {
  //           ...paragraph,
  //           keywordsAndImages: updatedKeywordsAndImages,
  //         };
  //       }
  //     );

  // Update the context with the new content including selected images
  // setSplitedContent(updatedParagraphJson);
  //     console.log(`updatedParagraphJson`, updatedParagraphJson);

  //     // Navigate to the next page
  //     // router.push("/video-editor/create/video-preview");
  //     sessionStorage.setItem(
  //       "VideoEditing-splitedContent",
  //       JSON.stringify(updatedParagraphJson)
  //     );
  //     router.replace("/video-editor/create/video-preview");
  //   } else {
  //     toast.error("No data available!");
  //   }
  // };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      toast.error("Please enter a keyword to search for footage!");
    }

    const fetchFootage = async (search: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/video-editing/get-img`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ searchImgKeyword: search }),
        }
      );

      if (response.status === 401) {
        toast.error("Session expired");
        handleSignOut();
        return;
      }

      if (!response.ok) {
        toast.error("Failed to fetch footage");
        return;
      }

      const data = await response.json();

      if (data.success && data.images.length > 0) {
        console.log(`data`, data);
        setSearchFootage(data.images);
      } else {
        toast.error("Failed to fetch footage");
      }
    };

    try {
      fetchFootage(search);
    } catch (error) {
      console.error(`Error fetching footage:`, error);
    }
  };

  const handleRemoveFootage = (imageUrl: string) => {
    setSelectedFootage(
      (prevSelectedFootage) =>
        prevSelectedFootage
          .map((sf) => {
            if (sf.imageUrl.includes(imageUrl)) {
              const updatedImageUrls = sf.imageUrl.filter(
                (url) => url !== imageUrl
              );
              if (updatedImageUrls.length === 0) {
                return null;
              } else {
                return {
                  ...sf,
                  imageUrl: updatedImageUrls,
                };
              }
            }
            return sf;
          })
          .filter((sf) => sf !== null) as SelectedFootage[]
    );
  };

  if (pageState.createVideoLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-w-[24rem] gap-[2vw] h-[75vh] py-[1.5vw]">
        <LogoAndTitle needTxt={false} title="Generating Video..." />
      </div>
    );
  }

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
                splitedContent.map(
                  (scriptSegment: ScriptSegment, index: number) => (
                    <>
                      {index === 0 && (
                        <div className="mb-[--10px]">
                          <h1 className="text-[--24px] font-bold">Intro</h1>
                        </div>
                      )}
                      {index === totalIntroSlides && (
                        <div className="mb-[--10px]">
                          <hr />
                          <h1 className="mt-[--sy-20px] text-[--24px] font-bold">
                            Body
                          </h1>
                        </div>
                      )}

                      <div
                        className={`${styles.articleContent} cursor-pointer mb-[--10px] group`}
                        key={scriptSegment.index}
                      >
                        <p
                          className={`transition-none ${
                            pageState.selectedScriptSegment?.audioPath.index ===
                            scriptSegment.audioPath.index
                              ? styles.active
                              : ""
                          }`}
                          onClick={() => {
                            setPageState((prevState) => ({
                              ...prevState,
                              index,
                              selectedScriptSegment: scriptSegment,
                            }));
                            setSearchFootage([]);
                          }}
                        >
                          {/* {scriptSegment.text.split(" ").map((word, idx) => (
                            <span key={idx}>
                              {scriptSegment.keywordsAndImages[0].keyword ===
                              word ? (
                                <span className="text-[#1e40af] group-hover:text-[#6077c2]">
                                  {word}{" "}
                                </span>
                              ) : (
                                <span>{word} </span>
                              )}
                            </span>
                          ))} */}
                          {scriptSegment.text}
                        </p>
                        <div
                          className={`flex flex-col justify-center gap-[--10px] w-[95%] ${
                            totalIntroSlides > index
                              ? "group-hover:h-[--120px]"
                              : "group-hover:h-[--50px]"
                          }
                            px-[--10px] rounded-b-md bg-gray-100 shadow-md overflow-clip
                            ${
                              pageState.selectedScriptSegment?.audioPath
                                .index === scriptSegment.audioPath.index
                                ? totalIntroSlides > index
                                  ? "h-[--120px]"
                                  : "h-[--50px]"
                                : "h-0"
                            }`}
                        >
                          {totalIntroSlides > index ? (
                            <>
                              <TitleEdit
                                title={scriptSegment?.title!}
                                onSubmit={(title: string) => {
                                  // @ts-ignore
                                  setSplitedContent((prev) => {
                                    const updatedContent = [...prev];
                                    updatedContent[index].title = title;
                                    return updatedContent;
                                  });
                                }}
                              />
                              <hr className="w-full" />
                            </>
                          ) : null}

                          {/* add chips */}
                          <div className="flex gap-[--10px]">
                            <div
                              className={`w-fit grow-0 border group-hover:opacity-100
                          ${
                            pageState.selectedScriptSegment?.audioPath.index ===
                            scriptSegment.audioPath.index
                              ? "opacity-100"
                              : "opacity-0"
                          }
                          aborder-indigo-300 bg-[#dbeafe] flex justify-center items-center gap-[--10px] rounded-md px-[--8px] py-[--4px]`}
                            >
                              <span className="font-semibold text-[--15px] text-[#1e40af]">
                                {scriptSegment.keywordsAndImages[0].keyword}
                              </span>
                              <span>
                                {/* close / x icon */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className="w-[--14px] h-[--14px] stroke-[#1e40af]"
                                >
                                  <path d="M18 6 6 18"></path>
                                  <path d="m6 6 12 12"></path>
                                </svg>
                              </span>
                            </div>
                            <AddChips
                              currentIndex={
                                pageState.selectedScriptSegment?.audioPath
                                  .index as number
                              }
                              index={scriptSegment.audioPath.index! as number}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )
                )
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
            <CustomBtn
              icon={
                <svg
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[--14px] h-[--13px]"
                >
                  <path
                    d="M1.26254 6.49635C0.81827 6.55953 0.509357 6.97089 0.572489 7.41516C0.765701 8.77361 1.38385 10.0362 2.33838 11.0219C3.29298 12.0075 4.53497 12.6659 5.88657 12.9026C7.23816 13.1392 8.62998 12.9421 9.86269 12.3394C10.1497 12.1991 10.4247 12.0385 10.6858 11.8593C11.1298 11.5546 11.74 11.5579 12.1208 11.9387C12.6326 12.4506 13.5078 12.088 13.5078 11.3642V9.12498C13.5078 8.57269 13.0601 8.12498 12.5078 8.12498H10.2686C9.54474 8.12498 9.18223 9.00013 9.69408 9.51201C10.0176 9.83548 10.0074 10.3701 9.62118 10.6153C9.46934 10.7117 9.31173 10.8 9.14895 10.8796C8.22442 11.3316 7.18056 11.4794 6.16687 11.3019C5.1532 11.1244 4.22167 10.6307 3.50578 9.89137C2.7898 9.15207 2.32619 8.20527 2.18132 7.18636C2.11811 6.7421 1.70674 6.43317 1.26254 6.49635ZM4.15293 0.660543C3.86389 0.801857 3.58708 0.963766 3.32436 1.14447C2.88225 1.44855 2.27425 1.44537 1.89483 1.06594C1.38296 0.554093 0.507812 0.916605 0.507812 1.64047V3.875C0.507812 4.42729 0.955528 4.875 1.50781 4.875H3.74238C4.46623 4.875 4.82877 3.99983 4.31689 3.48799C3.99455 3.16564 4.00455 2.63303 4.38905 2.38813C4.54255 2.29037 4.70195 2.20093 4.86663 2.1204C5.79121 1.6684 6.83507 1.52056 7.84876 1.69807C8.86245 1.87558 9.79396 2.36934 10.5099 3.10861C11.2258 3.84788 11.6894 4.79476 11.8343 5.81363C11.8975 6.25789 12.3089 6.56681 12.7531 6.50363C13.1974 6.44045 13.5063 6.02909 13.4431 5.58483C13.2499 4.22635 12.6318 2.96385 11.6772 1.97815C10.7227 0.992452 9.48064 0.334114 8.12905 0.0974319C6.77747 -0.139249 5.38565 0.0578646 4.15293 0.660543Z"
                    fill="#FFFFFB"
                  />
                </svg>
              }
              word="Load More"
              btnColor="black"
              paddingVal="py-[--8px] px-[--24px]"
            />
          </div>
          {/* holds sample of footage */}
          {/* Search bar */}
          <form
            className="flex w-full border border-solid border-[#ACACAC] rounded-[--10px]"
            onSubmit={(e) => {
              handleSearch(e);
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="outline-none flex-1 pl-[--16px]"
            />
            <CustomBtn
              icon={
                <svg
                  className="w-[--24px] h-[--24px] text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              }
              btnColor="black"
              paddingVal="py-[--8px] px-[--20px]"
              type="submit"
            />
          </form>

          <div className="relative">
            <div
              className={`${styles.custom_scrollbar} w-full overflow-x-auto select-none`}
            >
              <div className="flex gap-[1.25vw] pb-[--sy-5px]">
                {selectedSegment ? (
                  searchFootage.length > 0 ? (
                    searchFootage.map((imageUrl: string, idx) => (
                      <div className="!w-[194px]" key={uuidv4()}>
                        <ImageCard
                          inputName="select-footage"
                          imgSrc={imageUrl}
                          checked={selectedFootage.some((sf) => {
                            return (
                              sf.index ===
                                pageState.selectedScriptSegmentIndex &&
                              sf.imageUrl.includes(imageUrl)
                            );
                          })}
                          onChange={(e) => {
                            if (pageState.selectedScriptSegmentIndex !== null) {
                              handleSelectFootage(
                                e,
                                pageState.selectedScriptSegmentIndex
                              );
                            } else {
                              toast.error("Please select a paragraph!");
                            }
                          }}
                        />
                      </div>
                    ))
                  ) : selectedSegment.keywordsAndImages.length > 0 &&
                    selectedSegment.keywordsAndImages[0].imageUrl.length > 0 ? (
                    selectedSegment.keywordsAndImages[0].imageUrl.map(
                      (imageUrl: string) => (
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
                              if (
                                pageState.selectedScriptSegmentIndex !== null
                              ) {
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
                ) : searchFootage.length > 0 ? (
                  searchFootage.map((imageUrl: string) => (
                    <div className="!w-[194px]" key={uuidv4()}>
                      <ImageCard
                        inputName="select-footage"
                        imgSrc={imageUrl}
                        checked={selectedFootage.some((sf) => {
                          return (
                            sf.index === pageState.selectedScriptSegmentIndex &&
                            sf.imageUrl.includes(imageUrl)
                          );
                        })}
                        onChange={(e) => {
                          if (pageState.selectedScriptSegmentIndex !== null) {
                            handleSelectFootage(
                              e,
                              pageState.selectedScriptSegmentIndex
                            );
                          } else {
                            toast.error("Please select a paragraph!");
                          }
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div>
                    <p>Please select a paragraph!</p>
                  </div>
                )}
              </div>
            </div>
            {enhancableLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#000000ab] z-30 rounded-[--10px]">
                <p className="text-[--20px] text-white font-bold text-shadow-lg">
                  Enhancing...
                </p>
              </div>
            ) : null}
          </div>
          <div className="flex w-full flex-col gap-[--sy-10px] mt-[--sy-10px]">
            <div className="flex justify-between">
              <h3 className="font-bold text-[--24px]">Selected Footage</h3>

              <div className="rounded-full bg-[--dark] text-[--white] font-bold text-[--16px] px-[--10px] py-[--5px]">
                {selectedFootage.length > 0 &&
                selectedFootage[pageState.index!]?.imageUrl.length > 0
                  ? selectedFootage[pageState.index!]?.imageUrl.length
                  : 0}
              </div>
            </div>
            <div
              className={`${styles.custom_scrollbar} w-full overflow-x-auto select-none`}
            >
              <div className="flex gap-[1.25vw] pb-[--sy-5px]">
                {selectedSegment?.keywordsAndImages[0].imageUrl &&
                selectedSegment?.keywordsAndImages[0].imageUrl?.filter(
                  (imageUrl) =>
                    selectedFootage.some((sf) => sf.imageUrl.includes(imageUrl))
                ).length > 0 ? (
                  selectedSegment?.keywordsAndImages[0].imageUrl
                    ?.filter((imageUrl) =>
                      selectedFootage.some((sf) =>
                        sf.imageUrl.includes(imageUrl)
                      )
                    )
                    .map((imageUrl, idx) => (
                      <div
                        className="!w-[194px] h-[--102px] flex-shrink-0 relative rounded-[--10px] border border-solid border-[#ACACAC] overflow-hidden"
                        key={uuidv4()}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div
                            className="absolute cursor-pointer top-[--5px] right-[--10px] bg-[--white] opacity-75 w-[--20px] h-[--20px] rounded-full flex items-center justify-center"
                            onClick={() => {
                              handleRemoveFootage(imageUrl);
                            }}
                          >
                            <svg
                              fill="#000000"
                              height="200px"
                              width="200px"
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              // xmlns:="http://www.w3.org/1999/xlink"
                              viewBox="0 0 1792 1792"
                              // xml:space="preserve"
                              className="w-[--15px] h-[--15px]"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path d="M1082.2,896.6l410.2-410c51.5-51.5,51.5-134.6,0-186.1s-134.6-51.5-186.1,0l-410.2,410L486,300.4 c-51.5-51.5-134.6-51.5-186.1,0s-51.5,134.6,0,186.1l410.2,410l-410.2,410c-51.5,51.5-51.5,134.6,0,186.1 c51.6,51.5,135,51.5,186.1,0l410.2-410l410.2,410c51.5,51.5,134.6,51.5,186.1,0c51.1-51.5,51.1-134.6-0.5-186.2L1082.2,896.6z"></path>{" "}
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div>
                    <p className="pl-[--30px]">No footage selected!</p>
                  </div>
                )}
              </div>
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
            handleCreateVideo();
          }}
        />
      </div>
    </div>
  );
};

export default ChooseFootagePage;
