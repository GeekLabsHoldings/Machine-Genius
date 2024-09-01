"use client";
// import ArticlePreview from "@/app/_components/ArticlePreview/ArticlePreview";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./show-errors.module.css";
import ErrorCollapse from "@/app/_components/ErrorCollapse/ErrorCollapse";
import { useEffect, useRef, useState, useContext } from "react";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
// import HighlightedContent from "@/app/_components/HighlightedContent/HighlightedContent";
import { useSelector, useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { contentCreatorContext } from "@/app/_context/contentCreatorContext";
import dynamic from "next/dynamic";
const DynamicCKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col justify-center items-center w-[50vw] mx-auto h-[75vh]">
        <p className="font-bold text-[--24px] p-[--20px]">
          Document is loading...
        </p>
      </div>
    ),
  }
);
import {
  DecoupledEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  Bold,
  CloudServices,
  Code,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import "./CKEDITOR.css";
import { formatToText } from "@/app/_utils/contentFormatter";

export default function ShowErrorsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    selectedContentType,
    checkStatus,
    setCheckStatus,
    startChecks,
    selectedBrand,
  } = useContext(contentCreatorContext);
  const checkGrammerResults = useSelector(
    (state) => state.contentCreator.checkGrammerResults
  );
  const checkAiResults = useSelector(
    (state) => state.contentCreator.checkAiResults
  );
  const finalArticle = useSelector(
    (state) => state.contentCreator.finalArticle
  );

  const [pageState, setPageState] = useState({
    isLayoutReady: false,
    isLoading: false,
    isLoadingParaphrase: false,
    isLoadingFormatToHtml: false,
    triggerStartChecks: false,
    progressCounter: checkAiResults ? checkAiResults?.length : 0,
  });

  useEffect(() => {
    // ===== log data =====
    // console.log("finalArticle:", finalArticle);
    // ===== if there is no data, redirect to the choose brand page =====
    if (!finalArticle) {
      toast.error(
        "No data is available. You will be redirected to refetch new data!"
      );
      setTimeout(() => {
        router.replace("/content-creator/create/choose-brand");
      }, 1500);
    }
  }, []);

  useEffect(() => {
    if (pageState.triggerStartChecks === false) {
      setCheckStatus({
        grammar: checkStatus.grammar !== "pass" ? "waiting" : "pass",
        plagiarism: "pass",
        ai: checkStatus.ai !== "pass" ? "waiting" : "pass",
      });
    } else {
      setPageState({
        ...pageState,
        isLoading: true,
      });
      console.log("finalArticle right before startChecks()", finalArticle);
      startChecks();
    }
  }, [pageState.triggerStartChecks]);

  useEffect(() => {
    if (pageState.isLoading === false) {
      if (pageState.triggerStartChecks === true) {
        setPageState({
          ...pageState,
          triggerStartChecks: false,
        });
      }
      setCheckStatus({
        grammar: checkStatus.grammar !== "pass" ? "waiting" : "pass",
        plagiarism: "pass",
        ai: checkStatus.ai !== "pass" ? "waiting" : "pass",
      });
    }
  }, [pageState.isLoading]);

  useEffect(() => {
    if (checkAiResults && checkAiResults?.length) {
      setPageState({
        ...pageState,
        progressCounter: checkAiResults?.length,
      });
    }
  }, [checkAiResults]);

  // =======================================
  async function handleFixAndCheck() {
    if (checkAiResults.length) {
      await handleFixAiIssues();
    }
    if (checkGrammerResults.length) {
      await handleFixGrammerIssues();
    }
    setPageState({
      ...pageState,
      triggerStartChecks: true,
    });
  }
  // =======================================

  function highlightText(text, start, end) {
    return [text.slice(0, start), text.slice(start, end), text.slice(end)];
  }

  async function handleFixGrammerIssues() {
    // const storedFinalArticle = sessionStorage.getItem("finalArticle");
    const storedFinalArticle = JSON.parse(JSON.stringify(finalArticle));
    if (storedFinalArticle) {
      // let parsedStoredFinalArticle = JSON.parse(storedFinalArticle);
      // let storedFinalArticleContent = formatToText(
      //   parsedStoredFinalArticle.articles[0].content
      // );
      let storedFinalArticleContent = formatToText(
        storedFinalArticle.articles[0].content
      );

      for (let i = 0; i < checkGrammerResults.length; i++) {
        let item = checkGrammerResults[i];

        let replacedSentence =
          item.sentence.slice(0, item.start) +
          item.replacement +
          item.sentence.slice(item.end);

        storedFinalArticleContent = storedFinalArticleContent.replace(
          item.sentence,
          replacedSentence
        );
      }

      const updatedFinalArticle = {
        ...storedFinalArticle,
        articles: [
          {
            ...storedFinalArticle.articles[0],
            content: storedFinalArticleContent,
          },
        ],
      };

      dispatch(contentCreatorActions.setFinalArticle(updatedFinalArticle));
    }
  }

  async function paraphraseSentence(sentence) {
    try {
      const res = await fetch(`https://api.ai21.com/studio/v1/paraphrase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIPARAPHRASE_API_KEY}`,
        },
        body: JSON.stringify({
          text: sentence,
          style: "casual",
          startIndex: 0,
        }),
      });

      const json = await res.json();

      if (json) {
        return json?.suggestions[0].text;
      }
    } catch (error) {
      toast.error("Something went wrong! Error Paraphrase AI");
      console.error("Error paraphraseSentence:", error);
    }
  }

  async function handleFixAiIssues() {
    setPageState({
      ...pageState,
      isLoadingParaphrase: true,
    });
    // const storedFinalArticle = sessionStorage.getItem("finalArticle");
    const storedFinalArticle = JSON.parse(JSON.stringify(finalArticle));
    if (storedFinalArticle) {
      // let parsedStoredFinalArticle = JSON.parse(storedFinalArticle);
      // let storedFinalArticleContent = formatToText(
      //   parsedStoredFinalArticle.articles[0].content
      // );
      let storedFinalArticleContent = formatToText(
        storedFinalArticle.articles[0].content
      );
      for (let i = 0; i < checkAiResults.length; i++) {
        let item = checkAiResults[i];

        let replacedSentence = await paraphraseSentence(item.sentence);

        storedFinalArticleContent = storedFinalArticleContent.replace(
          item.sentence,
          replacedSentence
        );

        // decrease the progressCounter
        if (pageState.progressCounter > 0) {
          setPageState((prev) => ({
            ...prev,
            progressCounter: prev.progressCounter - 1,
          }));
        }

        // Add a delay between requests to avoid hitting the rate limit
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const updatedFinalArticle = {
        ...storedFinalArticle,
        articles: [
          {
            ...storedFinalArticle.articles[0],
            content: storedFinalArticleContent,
          },
        ],
      };

      dispatch(contentCreatorActions.setFinalArticle(updatedFinalArticle));
    }
    setPageState({
      ...pageState,
      isLoadingParaphrase: false,
    });
  }

  // ========================
  async function formatToHtml() {
    try {
      setPageState((prev) => ({
        ...prev,
        // isLayoutReady: false,
        isLoadingFormatToHtml: true,
      }));
      const res = await fetch(
        `https://api.machinegenius.io/content-creation/format-to-html`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contentBody: finalArticle?.articles[0]?.content,
          }),
        }
      );

      const json = await res.json();

      if (!json) {
        toast.error("Something went wrong! Contact backend department");
        return finalArticle?.articles[0]?.content || "";
      } else if (json && json.success === false) {
        toast.error("Something went wrong! Contact backend department");
        return finalArticle?.articles[0]?.content || "";
      } else if (json && json.success === true && json?.articles[0]?.content) {
        const data = json?.articles[0]?.content.replace(/\n/g, "");
        const updatedArticle = {
          ...finalArticle,
          articles: [
            {
              ...finalArticle.articles[0],
              content: data,
            },
          ],
        };

        dispatch(contentCreatorActions.setFinalArticle(updatedArticle));
      } else {
        toast.error("Something went wrong! Contact backend department");
        return finalArticle?.articles[0]?.content || "";
      }
    } catch (error) {
      toast.error("Something went wrong! Contact backend department");
      console.error("Error formatToHtml:", error);
      return finalArticle?.articles[0]?.content || "";
    } finally {
      setPageState((prev) => ({
        ...prev,
        // isLayoutReady: true,
        isLoadingFormatToHtml: false,
        isLoading: false,
      }));
    }
  }

  const editorContainerRef = useRef(null);
  const editorMenuBarRef = useRef(null);
  const editorToolbarRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    setPageState((prev) => ({
      ...prev,
      isLayoutReady: true,
    }));

    return () =>
      setPageState((prev) => ({
        ...prev,
        isLayoutReady: false,
      }));
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "link",
        "insertTable",
        "highlight",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      Bold,
      CloudServices,
      Code,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Heading,
      Highlight,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      PageBreak,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      SelectAll,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo,
    ],
    balloonToolbar: [
      "bold",
      "italic",
      "|",
      "link",
      "|",
      "bulletedList",
      "numberedList",
    ],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, "default", 18, 20, 22],
      supportAllValues: true,
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    initialData: `${finalArticle?.articles[0]?.content || ""}`,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    menuBar: {
      isVisible: true,
    },
    placeholder: "Type or paste your content here!",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
  };
  // ========================

  // todo
  if (pageState.isLoadingFormatToHtml) {
    return (
      <div className="flex flex-col justify-center items-center min-w-[24rem] gap-[--sy-15px] h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={false}
          title="Genius is formatting your content..."
        />
      </div>
    );
  }

  if (pageState.isLoading) {
    return (
      <div className="flex flex-col justify-center items-center m-auto h-[75vh] py-[1.5vw]">
        <div className={`${styles.genuisWorking} m-auto`}>
          <LogoAndTitle
            needTxt={false}
            title={
              checkStatus.grammar === "waiting" ||
              checkStatus.plagiarism === "waiting" ||
              checkStatus.ai === "waiting"
                ? `Genius is checking your content...`
                : checkStatus.grammar === "pass" &&
                  checkStatus.plagiarism === "pass" &&
                  checkStatus.ai === "pass"
                ? "Hooray! No issues found!"
                : "Check is finished. View the results"
            }
          />
          <div className={`${styles.allCheckers} w-full`}>
            <SpecificChecker checkStatus={checkStatus.ai} word="AI Checker" />
            <SpecificChecker
              checkStatus={checkStatus.grammar}
              word="Grammar Checker"
            />
            <SpecificChecker
              checkStatus={checkStatus.plagiarism}
              word="Plagiarism Checker"
            />
          </div>

          {(checkStatus.grammar === "fail" ||
            checkStatus.plagiarism === "fail" ||
            checkStatus.ai === "fail" ||
            checkStatus.grammar === "fetchError" ||
            checkStatus.plagiarism === "fetchError" ||
            checkStatus.ai === "fetchError") &&
          checkStatus.grammar !== "waiting" &&
          checkStatus.plagiarism !== "waiting" &&
          checkStatus.ai !== "waiting" ? (
            <CustomBtn
              word={"Results"}
              btnColor="black"
              onClick={() => {
                // formatToHtml();
                setPageState({
                  ...pageState,
                  isLoading: false,
                });
              }}
            />
          ) : (
            ""
          )}

          {checkStatus.grammar === "pass" &&
            checkStatus.plagiarism === "pass" &&
            checkStatus.ai === "pass" &&
            (selectedBrand === "Movie Myth" ? (
              <CustomBtn
                word={"Generate Titles"}
                btnColor="black"
                href="/content-creator/create/movie-myth/generated-titles"
              />
            ) : (
              <CustomBtn
                word={"Generate Titles"}
                btnColor="black"
                href="/content-creator/create/generated-titles"
              />
            ))}
        </div>
      </div>
    );
  }

  if (pageState.isLoadingParaphrase) {
    return (
      <div className="flex flex-col justify-center items-center min-w-[24rem] gap-[--sy-15px] h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={false}
          title="Genius is fixing content issues..."
        />
        {checkAiResults &&
          checkAiResults?.length &&
          pageState.progressCounter > 0 && (
            <p className="space-x-[--5px]">
              <span className="text-[--35px] font-extrabold">
                {pageState.progressCounter}
              </span>
              <span className="text-[--30px]">remaining sentences...</span>
            </p>
          )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* 01. Article Preview & Errors */}
      <div className="flex justify-center items-start h-[75vh] py-[1.5vw] gap-[2rem]">
        {/* 01-1. Article Preview */}
        <div className={"w-3/5 h-full"}>
          <div>
            <div className="main-container">
              <div
                className="editor-container editor-container_document-editor"
                ref={editorContainerRef}
              >
                <div
                  className="editor-container__menu-bar"
                  ref={editorMenuBarRef}
                ></div>
                <div
                  className="editor-container__toolbar"
                  ref={editorToolbarRef}
                ></div>
                <div className="editor-container__editor-wrapper">
                  <div className="editor-container__editor">
                    <div ref={editorRef}>
                      {pageState.isLayoutReady && (
                        <DynamicCKEditor
                          onReady={(editor) => {
                            editorToolbarRef.current.appendChild(
                              editor.ui.view.toolbar.element
                            );
                            editorMenuBarRef.current.appendChild(
                              editor.ui.view.menuBarView.element
                            );
                          }}
                          onAfterDestroy={() => {
                            Array.from(
                              editorToolbarRef.current?.children || []
                            ).forEach((child) => child.remove());
                            Array.from(
                              editorMenuBarRef.current?.children || []
                            ).forEach((child) => child.remove());
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();

                            const updatedArticle = {
                              ...finalArticle,
                              articles: [
                                {
                                  ...finalArticle.articles[0],
                                  content: data,
                                },
                              ],
                            };

                            dispatch(
                              contentCreatorActions.setFinalArticle(
                                updatedArticle
                              )
                            );
                          }}
                          editor={DecoupledEditor}
                          config={editorConfig}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 01-2. Preview Errors */}
        <div className={styles.scripts_wrapper + " w-2/5"}>
          <div className={styles.header}>
            <h6>Issues</h6>
            <h6>({checkGrammerResults.length + checkAiResults.length})</h6>
          </div>

          <div className={styles.errors_container}>
            {checkGrammerResults.map((item, index) => {
              return (
                <ErrorCollapse key={index} title="Grammar">
                  <>
                    <p>
                      <span className="font-bold">Grammar Issue:</span>{" "}
                      {item.description}
                    </p>
                    <p>
                      <span className="font-bold">
                        In the following sentence:
                      </span>
                      "
                      <span>
                        {highlightText(item.sentence, item.start, item.end)[0]}
                      </span>
                      <span className="bg-red-200">
                        {highlightText(item.sentence, item.start, item.end)[1]}
                      </span>
                      <span>
                        {highlightText(item.sentence, item.start, item.end)[2]}
                      </span>
                      "
                    </p>
                    <p>
                      <span className="font-bold">Replace:</span> "
                      {item.sentence.slice(item.start, item.end)}"{" "}
                      <span className="font-bold">With:</span>{" "}
                      {item.replacement}
                    </p>
                    {/* <div className="flex justify-end">
                      <CustomBtn
                        word={"Fix"}
                        btnColor="black"
                        paddingVal={"py-[0.5vw] px-[1vw]"}
                        onClick={() => {
                          handleFixGrammerIssue(item);
                        }}
                      ></CustomBtn>
                    </div> */}
                  </>
                </ErrorCollapse>
              );
            })}

            {checkAiResults.map((item, index) => {
              return (
                <ErrorCollapse key={index} title="AI">
                  <>
                    <p>
                      <span className="font-bold">
                        In the following sentence:{" "}
                      </span>
                      "<span>{item.sentence}</span>"
                    </p>
                  </>
                </ErrorCollapse>
              );
            })}

            {/* error Collapse */}
            {/* <ErrorCollapse title="Plagiarism">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
                doloribus ratione non similique velit modi eum repudiandae, nam
                saepe amet quaerat quasi placeat, dolore molestiae magnam iure
                earum ipsam. Soluta.
              </ErrorCollapse> */}
          </div>
        </div>
      </div>

      {/* 02. Buttons lead you to last or next page */}
      <div className="flex justify-between w-full">
        {selectedBrand === "Movie Myth" ? (
          <CustomBtn
            word={"Back"}
            btnColor="black"
            href="/content-creator/create/movie-myth/final-movie"
          />
        ) : (
          <CustomBtn
            word={"Back"}
            btnColor="white"
            href="/content-creator/create/final-article"
          />
        )}
        <CustomBtn
          word={"Fix & Check"}
          btnColor="black"
          onClick={() => {
            handleFixAndCheck();
          }}
          disabled={pageState.isLoadingParaphrase}
        />
      </div>
    </div>
  );
}
