"use client";
import {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import dynamic from "next/dynamic";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
import { useSelector, useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { globalContext } from "@/app/_context/store";
import { contentCreatorContext } from "@/app/_context/contentCreatorContext";
import debounce from "debounce";
import { formatHtml } from "@/app/_utils/htmlFormatter";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
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

export default function FinalArticlePage() {
  const finalArticle = useSelector(
    (state) => state.contentCreator.finalArticle
  );
  const { authState, handleSignOut } = useContext(globalContext);
  const {
    selectedContentType,
    checkStatus,
    startChecks,
    setCheckStatus,
    editContentData,
    setEditContentData,
    selectedBrand,
    setSelectedBrand,
    setSelectedContentType,
  } = useContext(contentCreatorContext);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleDisplayContentDataToEdit() {
    const updatedArticle = {
      ...finalArticle,
      articles: [
        {
          title: editContentData.content_title,
          content: editContentData.content,
        },
      ],
    };
    dispatch(contentCreatorActions.setFinalArticle(updatedArticle));
    setSelectedBrand(editContentData.brand);
    setSelectedContentType(editContentData.content_type);
  }

  useEffect(() => {
    if (editContentData) {
      // console.log("editContentData11", editContentData);
      handleDisplayContentDataToEdit();
    }
  }, [editContentData]);

  const [pageState, setPageState] = useState({
    isLoading: false,
    isLoadingExpandContent: false,
    wordCount: "Loading ...",
  });
  const [startNav, setStartNav] = useState(false);

  useEffect(() => {
    // console.log("finalArticle", finalArticle);
    // todo: remove after backend is ready
    if (selectedContentType === "Article") {
      toast.error(
        "Please note that the prompt for 'Article' is not ready yet!"
      );
      toast.error(
        "Please note that the prompt for 'Article' is not ready yet!"
      );
      toast.error(
        "Please note that the prompt for 'Article' is not ready yet!"
      );
    }
    // reset the checkStatus
    setCheckStatus({
      grammar: "waiting",
      plagiarism: "pass",
      ai: "waiting",
      isGrammerChecked: false,
    });
  }, []);

  useEffect(() => {
    if (!finalArticle && !editContentData) {
      toast.error(
        "No data is available. You will be redirected to refetch new data!"
      );
      setTimeout(() => {
        router.replace("/content-creator/create/choose-brand");
      }, 1500);
    }
  }, []);

  const countWords = useCallback((text) => {
    if (text) {
      // Remove HTML tags and trim whitespace
      const plainText = text.replace(/<[^>]*>/g, " ").trim();
      // Split by whitespace and filter out empty strings
      const words = plainText.split(/\s+/).filter((word) => word.length > 0);
      return words.length;
    } else {
      return 0;
    }
  }, []);

  const updateWordCount = useCallback(
    (editor) => {
      if (editor) {
        const data = editor.getData();
        setPageState((prevState) => ({
          ...prevState,
          wordCount: countWords(data),
        }));
      }
    },
    [countWords, setPageState]
  );

  const debouncedUpdateWordCount = useMemo(
    () => debounce(updateWordCount, 100),
    [updateWordCount]
  );

  const handleEditorOnChange = useCallback(
    (event, editor) => {
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
      dispatch(contentCreatorActions.setFinalArticle(updatedArticle));
      // updateWordCount(editor);
      debouncedUpdateWordCount(editor);
    },
    [finalArticle, dispatch, updateWordCount, debouncedUpdateWordCount]
  );

  // ========================
  const editorContainerRef = useRef(null);
  const editorMenuBarRef = useRef(null);
  const editorToolbarRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
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

  function handleNavigate() {
    setStartNav(true);
  }

  useEffect(() => {
    if (startNav) {
      setPageState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      console.log("finalArticle right before startChecks()", finalArticle);
      startChecks();
    }
  }, [startNav]);

  function handleExpandContentFailure() {
    toast.error("Something went wrong!");
    setPageState((prevState) => ({
      ...prevState,
      isLoadingExpandContent: false,
    }));
    return;
  }

  async function handleExpandContent() {
    setPageState((prevState) => ({
      ...prevState,
      isLoadingExpandContent: true,
    }));

    try {
      const res = await fetch(
        `https://api.machinegenius.io/content-creation/expand-script`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
          body: JSON.stringify({
            // selectedContent: formatToText(finalArticle.articles[0].content),
            selectedContent: finalArticle.articles[0].content,
          }),
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json = await res.json();
      if (!json) {
        handleExpandContentFailure();
        return;
      } else if (json.success === false) {
        handleExpandContentFailure();
        return;
      } else if (json && json?.articles[0]?.content) {
        const updatedArticle = {
          ...json,
          articles: [
            {
              ...json.articles[0],
              content: formatHtml(json.articles[0].content),
            },
          ],
        };

        dispatch(contentCreatorActions.setFinalArticle(updatedArticle));
      }
    } catch (error) {
      // console.error("Error handleExpandContent:", error);
      handleExpandContentFailure();
    } finally {
      setPageState((prevState) => ({
        ...prevState,
        isLoadingExpandContent: false,
      }));
    }
  }

  if (pageState.isLoadingExpandContent) {
    return (
      <div className="flex flex-col justify-center items-center mx-auto h-[75vh] py-[1.5vw]">
        <div className={"genuisWorking"}>
          <LogoAndTitle needTxt={false} title={"Expanding Content..."} />
        </div>
      </div>
    );
  }

  if (pageState.isLoading) {
    return (
      <div className="flex flex-col justify-center items-center mx-auto h-[75vh] py-[1.5vw]">
        <div className={"genuisWorking"}>
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
          <div className={`allCheckers w-full`}>
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
            checkStatus.ai !== "waiting" &&
            (selectedBrand === "Movie Myth" ? (
              <CustomBtn
                word={"Results"}
                btnColor="black"
                href="/content-creator/create/movie-myth/show-errors"
              />
            ) : (
              <CustomBtn
                word={"Results"}
                btnColor="black"
                href="/content-creator/create/show-errors/"
              />
            ))}

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

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mx-auto !h-[75vh] py-[1vw] w-11/12">
        {/* section to display article */}
        <div className="w-4/5 mx-auto !h-[70vh] ">
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
                      {isLayoutReady && (
                        <>
                          <p className="ml-[72px] font-semibold !my-[--sy-5px]">
                            Word Count:
                            <span className="text-[--17px] ml-[3px]">
                              {pageState.wordCount}
                            </span>
                          </p>

                          <DynamicCKEditor
                            onReady={(editor) => {
                              editorToolbarRef.current.appendChild(
                                editor.ui.view.toolbar.element
                              );
                              editorMenuBarRef.current.appendChild(
                                editor.ui.view.menuBarView.element
                              );
                              updateWordCount(editor);
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
                              handleEditorOnChange(event, editor);
                            }}
                            editor={DecoupledEditor}
                            config={editorConfig}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* buttons to move to last or next page */}
      <div className="flex justify-between items-center">
        {editContentData ? (
          <CustomBtn
            word={"Back"}
            btnColor="white"
            href={"/content-creator/article-database"}
          />
        ) : selectedBrand === "Movie Myth" ? (
          <CustomBtn
            word={"Back"}
            btnColor="white"
            href="/content-creator/create/movie-myth/create-movie"
          />
        ) : (
          <CustomBtn
            word={"Back"}
            btnColor="white"
            href="/content-creator/create/create-article"
          />
        )}

        <CustomBtn
          word={"Expand Content"}
          btnColor="black"
          onClick={() => {
            handleExpandContent();
          }}
        />

        <CustomBtn
          word={"Next"}
          btnColor="black"
          onClick={() => {
            handleNavigate();
          }}
        />
      </div>
    </div>
  );
}
