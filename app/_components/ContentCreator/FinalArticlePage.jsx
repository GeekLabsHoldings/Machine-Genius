"use client";
import { useEffect, useRef, useState, useContext } from "react";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import dynamic from "next/dynamic";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import SpecificChecker from "@/app/_components/SpecificChecker/SpecificChecker";
import { useSelector, useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { contentCreatorContext } from "@/app/_context/contentCreatorContext";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
const DynamicCKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  {
    ssr: false,

    loading: () => (
      <div className="flex flex-col gap-8 justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={true}
          textNeeded="Hold on tight."
          title={"Document is loading..."}
        />
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
  const dispatch = useDispatch();
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(false);
  const [startNav, setStartNav] = useState(false);

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
  const finalArticle = useSelector(
    (state) => state.contentCreator.finalArticle
  );

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
    const finalArticleContent = finalArticle?.articles[0]?.content
      .replace(/[*#]/g, "") // Remove asterisks and hash symbols
      .replace(/[’]/g, "'") // Replace right single quotes with regular single quotes
      .replace(/[‘]/g, "'") // Replace left single quotes with regular single quotes
      .replace(/[“]/g, '"') // Replace left double quotes with regular double quotes
      .replace(/[”]/g, '"') // Replace right double quotes with regular double quotes
      .replace(/\s+/g, " ") // Normalize whitespace to a single space
      .trim() // Trim leading and trailing whitespace
      .replace(/<\/?[^>]+(>|$)/g, "") // Remove all HTML tags
      .replace(/[`]/g, "'");

    const updatedArticle = {
      ...finalArticle,
      articles: [
        {
          ...finalArticle.articles[0],
          content: finalArticleContent,
        },
      ],
    };

    dispatch(contentCreatorActions.setFinalArticle(updatedArticle));
    console.log("+++++++++++++++++-finalArticle is updated-+++++++++++++++");

    setStartNav(true);
  }

  useEffect(() => {
    if (startNav) {
      setIsLoading(true);
      console.log("finalArticle right before startChecks()", finalArticle);
      startChecks();
    }
  }, [startNav]);

  if (IsLoading) {
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
      <div className="flex flex-col mx-auto !h-[75vh] py-[1.5vw] w-11/12">
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
