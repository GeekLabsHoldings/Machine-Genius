"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const initialContextState = {
  // ===== 00. Start Authentication =====
  token: "" as any,
  setToken: (token: any) => {},
  decodedToken: null as any,
  setDecodedToken: (token: any) => {},
  // ===== 00. End Authentication =====

  // ===== 01. Start Content Creator =====
  selectedContentType: "" as any,
  setSelectedContentType: (contentType: any) => {},
  selectedBrand: "" as any,
  setSelectedBrand: (brand: any) => {},
  collectedData: null as any,
  setCollectedData: (data: any) => {},
  twitterData: null as any,
  setTwitterData: (data: any) => {},
  choosedArticles: [] as any,
  setChoosedArticles: (articles: any) => {},
  checkStatus: {
    grammar: "waiting",
    // todo: temp until backend fix it
    plagiarism: "pass",
    ai: "waiting",
    isGrammerChecked: false,
  },
  setCheckStatus: (status: any) => {},
  checkGrammer: () => {},
  checkPlagiarism: () => {},
  checkAi: () => {},
  startChecks: () => {},
  generateTitles: () => {},
  generatedTitles: [] as any,
  setGeneratedTitles: (titles: any) => {},
  lockedGeneratedTitles: [] as any,
  setLockedGeneratedTitles: (titles: any) => {},

  generatedThumbnails: [] as any,
  setGeneratedThumbnails: (thumbnails: any) => {},
  generateThumbnails: () => {},
  selectedContentThumbnail: "",
  setSelectedContentThumbnail: (thumbnail: any) => {},

  selectedContentTitle: "",
  setSelectedContentTitle: (title: any) => {},
  editContentData: null as any,
  setEditContentData: (id: any) => {},
  // ===== 01. End Content Creator =====
};

// 1- create context, export it
export const globalContext = createContext(initialContextState);

// 2- provide context, export it
export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();

  // ===== 00. Start Authentication =====
  function handleSetRouteToDirect(role: string) {
    switch (role) {
      case "ContentCreator":
        return "/content-creator/dashboard";
      case "Video Editing":
        return "/video-editor/dashboard";
      case "Social Media":
        return "/social-media/dashboard";
      case "Administrative":
        return "/administrative/dashboard";
      case "Customer Service":
        return "/customer-service/dashboard";
      case "Creative":
        return "/creative/dashboard";
      case "HR":
        return "/hr/dashboard";
      case "Accounting":
        return "/accounting/dashboard";
      case "Newsletter":
        return "/newsletter/dashboard";
      case "Out Reach":
        return "/outreach/dashboard";
      case "SEO":
        return "/seo/dashboard";
      case "OP":
        return "/op/dashboard";
      default:
        return "/";
    }
  }

  function tokenInit() {
    if (typeof window !== "undefined") {
      const tokenInitValue = localStorage.getItem("token");
      return tokenInitValue ? tokenInitValue : "";
    } else {
      return "";
    }
  }

  function decodedTokenInit() {
    if (typeof window !== "undefined") {
      const decodedTokenInitValue = localStorage.getItem("decodedToken");
      return decodedTokenInitValue ? JSON.parse(decodedTokenInitValue) : null;
    } else {
      return null;
    }
  }

  const [token, setToken] = useState<any>(tokenInit);
  const [decodedToken, setDecodedToken] = useState<any>(decodedTokenInit);

  async function checkIfUserOnCorrespondingRoute() {
    // if (decodedToken) {
    const role = decodedToken?.department[0];
    const correspondingRoutePath = handleSetRouteToDirect(role).split("/")[1];
    console.log(`correspondingRoutePath:`, correspondingRoutePath);
    console.log(`currentpath:`, path);
    if (
      !path.includes(correspondingRoutePath) &&
      !decodedToken?.department.includes("CEO")
    ) {
      const correspondingRoute = handleSetRouteToDirect(role);
      router.replace(correspondingRoute);
      console.log("~~~---***INvalid path***---~~~", path);
    } else {
      console.log("~~~---valid path---~~~");
    }
    // }
  }

  function signOut() {
    // toast("signOut ...");
    // localStorage.removeItem("token");
    // localStorage.removeItem("decodedToken");
    // setToken("");
    // setDecodedToken(null);
    // localStorage.removeItem("token");
    // localStorage.removeItem("decodedToken");
  }

  async function checkAuth() {
    // // toast("Checking authentication...");
    // const storedToken = localStorage.getItem("token");
    // const authToken = token || storedToken;
    // if (!authToken) {
    //   toast.error("No token found, redirecting to signin...");
    //   router.replace("/");
    //   return;
    // }
    // try {
    //   const res = await fetch(
    //     "https://machine-genius.onrender.com/authentication/check-auth",
    //     {
    //       headers: {
    //         Authorization: `Bearer ${authToken}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   const data = await res.json();
    //   // console.log("checkAuth data:", data);
    //   if (data.result) {
    //     // setToken(data.result.token);
    //     // setDecodedToken(data.result);
    //     // toast.success("Token is valid");
    //   } else if (data.message && data.message.name === "TokenExpiredError") {
    //     toast.error("Session expired, redirecting to signin...");
    //     // console.log('Token expired, redirecting to signin...');
    //     signOut();
    //     router.replace("/");
    //   } else if (data.message === "USER_TOKEN_IS_INVALID") {
    //     toast.error("Session expired, redirecting to signin...");
    //     // console.log('Token is invalid, Contact Technical Support!');
    //     signOut();
    //     router.replace("/");
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong! Contact Technical Support!");
    //   // console.error('Error checking auth:', error);
    //   signOut();
    //   router.replace("/");
    // }
  }

  useEffect(() => {
    if (token) {
      console.log("=+==+==There is Token=+==+==");
      // checkAuth();
    } else {
      console.log("=x==x==There is No Token==x==x=");
      console.log("Redirecting to signin...");
      router.replace("/");
    }
  }, [token]);

  useEffect(() => {
    console.log("---currentPath:", path);
    checkIfUserOnCorrespondingRoute();
  }, [path]);

  // ===== 00. End Authentication =====

  // ===== 01. Start Content Creator =====

  // ===== Start selectedContentType =====
  function selectedContentTypeInit() {
    if (typeof window !== "undefined") {
      const selectedContentTypeInitValue = sessionStorage.getItem(
        "selectedContentType"
      );
      return selectedContentTypeInitValue ? selectedContentTypeInitValue : "";
    } else {
      return "";
    }
  }
  const [selectedContentType, setSelectedContentType] = useState<any>(
    selectedContentTypeInit
  );
  useEffect(() => {
    sessionStorage.setItem("selectedContentType", selectedContentType);
  }, [selectedContentType]);
  // ===== End selectedContentType =====

  // ===== Start selectedBrand =====
  function selectedBrandInit() {
    if (typeof window !== "undefined") {
      const selectedBrandInitValue = sessionStorage.getItem("selectedBrand");
      return selectedBrandInitValue ? selectedBrandInitValue : "";
    } else {
      return "";
    }
  }
  const [selectedBrand, setSelectedBrand] = useState<any>(selectedBrandInit);
  useEffect(() => {
    sessionStorage.setItem("selectedBrand", selectedBrand);
  }, [selectedBrand]);
  // ===== End selectedBrand =====

  // ===== Start collectedData =====
  function collectedDataInit() {
    if (typeof window !== "undefined") {
      const collectedDataInitValue = sessionStorage.getItem("collectedData");
      return collectedDataInitValue ? JSON.parse(collectedDataInitValue) : null;
    } else {
      return null;
    }
  }
  const [collectedData, setCollectedData] = useState<any>(collectedDataInit);
  useEffect(() => {
    sessionStorage.setItem("collectedData", JSON.stringify(collectedData));
  }, [collectedData]);

  function twitterDataInit() {
    if (typeof window !== "undefined") {
      const twitterDataInitValue = sessionStorage.getItem("twitterData");
      return twitterDataInitValue ? JSON.parse(twitterDataInitValue) : null;
    } else {
      return null;
    }
  }
  const [twitterData, setTwitterData] = useState<any>(twitterDataInit);
  useEffect(() => {
    sessionStorage.setItem("twitterData", JSON.stringify(twitterData));
  }, [twitterData]);
  // ===== End collectedData =====

  // ===== Start choosedArticles =====
  function choosedArticlesInit() {
    if (typeof window !== "undefined") {
      const choosedArticlesInitValue =
        sessionStorage.getItem("choosedArticles");
      return choosedArticlesInitValue
        ? JSON.parse(choosedArticlesInitValue)
        : [];
    } else {
      return [];
    }
  }
  const [choosedArticles, setChoosedArticles] =
    useState<any>(choosedArticlesInit);
  useEffect(() => {
    sessionStorage.setItem("choosedArticles", JSON.stringify(choosedArticles));
  }, [choosedArticles]);
  // ===== End choosedArticles =====

  // ===== Start finalArticle =====
  // function finalArticleInit() {
  //   if (typeof window !== "undefined") {
  //     const finalArticleInitValue = sessionStorage.getItem("finalArticle");
  //     return finalArticleInitValue ? JSON.parse(finalArticleInitValue) : null;
  //   } else {
  //     return null;
  //   }
  // }
  // const [finalArticle, setFinalArticle] = useState<any>(finalArticleInit);
  const finalArticle = useSelector(
    (state: any) => state.contentCreator.finalArticle
  );
  useEffect(() => {
    sessionStorage.setItem("finalArticle", JSON.stringify(finalArticle));
  }, [finalArticle]);
  // ===== End finalArticle =====

  // ===== Start Checks =====
  const [checkStatus, setCheckStatus] = useState({
    grammar: "waiting",
    // todo: temp until backend fix it
    plagiarism: "pass",
    ai: "waiting",
    isGrammerChecked: false,
  });
  // const [checkGrammerResults, setCheckGrammerResults] = useState<any>(
  //   checkGrammerResultsInit
  // );
  const checkGrammerResults = useSelector(
    (state: any) => state.contentCreator.checkGrammerResults
  );
  useEffect(() => {
    sessionStorage.setItem(
      "checkGrammerResults",
      JSON.stringify(checkGrammerResults)
    );
  }, [checkGrammerResults]);

  function handleGrammerFetchError() {
    setCheckStatus((prev: any) => ({ ...prev, grammar: "fetchError" }));
    toast.error("Something went wrong! Contact backend department");
    // reset checkGrammerResults
    dispatch(contentCreatorActions.setCheckGrammerResults([]));
    return;
  }

  async function checkGrammer() {
    if (!finalArticle?.articles[0]?.content) {
      toast.error("No content found!");
      return;
    }
    if (checkStatus.isGrammerChecked === true) {
      setCheckStatus((prev: any) => ({ ...prev, grammar: "pass" }));
      dispatch(contentCreatorActions.setCheckGrammerResults([]));
      return;
    }
    try {
      const res = await fetch(
        `https://backendmachinegenius.onrender.com/grammar-check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            document: finalArticle?.articles[0]?.content,
          }),
        }
      );

      const json = await res.json();

      if (!json) {
        handleGrammerFetchError();
        return;
      } else if (json && json.success === false) {
        handleGrammerFetchError();
        return;
      } else if (json && json.success === true && json.grammarIssues) {
        const filteredJson = json?.grammarIssues.filter(
          (item: any) => item.general_error_type === "Grammar"
        );
        if (filteredJson.length > 0) {
          setCheckStatus((prev: any) => ({
            ...prev,
            grammar: "fail",
            isGrammerChecked: true,
          }));
        } else {
          setCheckStatus((prev: any) => ({
            ...prev,
            grammar: "pass",
            isGrammerChecked: true,
          }));
        }
        dispatch(contentCreatorActions.setCheckGrammerResults(filteredJson));
      } else {
        handleGrammerFetchError();
      }
    } catch (error) {
      handleGrammerFetchError();
      console.error("Error checkGrammer:", error);
    }
  }

  async function checkPlagiarism() {
    const maxRetries = 1; // Define the maximum number of retries
    let attempts = 0;
    let json = null;

    while (attempts < maxRetries) {
      try {
        const res = await fetch(
          `https://backendmachinegenius.onrender.com/plagiarism-check`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: finalArticle?.articles[0]?.content,
            }),
          }
        );

        json = await res.json();

        if (json) {
          // If content is found, break the loop
          break;
        }
      } catch (error) {
        // setCheckStatus((prev:any) => ({ ...prev, plagiarism: "fetchError" }));
        toast.error("Something went wrong! Contact backend department");
        console.error("Error checkPlagiarism:", error);
      } finally {
        attempts++;
      }
    }

    if (json) {
      // todo
      if (json) {
        // setCheckStatus((prev:any) => ({ ...prev, plagiarism: "fail" }));
        // todo: temp until backend fix it
        setCheckStatus((prev: any) => ({ ...prev, plagiarism: "pass" }));
      } else {
        setCheckStatus((prev: any) => ({ ...prev, plagiarism: "pass" }));
      }
      console.log("checkPlagiarismResult", json);
    } else {
      // todo: uncomment after backend fix it
      // setCheckStatus((prev:any) => ({ ...prev, plagiarism: "fetchError" }));
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }
  // const [checkAiResults, setCheckAiResults] = useState<any>(
  //   checkAiResultsInit
  // );
  const checkAiResults = useSelector(
    (state: any) => state.contentCreator.checkAiResults
  );
  useEffect(() => {
    sessionStorage.setItem("checkAiResults", JSON.stringify(checkAiResults));
  }, [checkAiResults]);

  function handleAiFetchError() {
    setCheckStatus((prev: any) => ({ ...prev, ai: "fetchError" }));
    toast.error("Something went wrong! Contact backend department");
    // reset checkGrammerResults
    dispatch(contentCreatorActions.setCheckAiResults([]));
    return;
  }

  async function checkAi() {
    if (
      !finalArticle.articles[0].content ||
      finalArticle.articles[0].content.length < 1
    ) {
      toast.error("No content found!");
      return;
    }
    if (finalArticle.articles[0].content.length > 50000) {
      toast.error("Content length must be between 1 and 50000 characters!");
      return;
    }

    try {
      const res = await fetch(`https://api.gptzero.me/v2/predict/text`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_GPTZERO_API_KEY as string,
        },
        body: JSON.stringify({
          document: finalArticle?.articles[0]?.content,
          version: "",
          multilingual: false,
        }),
      });

      const json = await res.json();

      if (!json) {
        handleAiFetchError();
        return;
      } else if (json && json.documents[0]) {
        // console.log("checkAiResult", json);
        const filteredJson = json?.documents[0]?.sentences.filter(
          (sentence: any) =>
            sentence.highlight_sentence_for_ai && sentence.generated_prob >= 0.9
        );
        if (
          // json.documents[0].class_probabilities.human < 0.8
          filteredJson.length > 0
        ) {
          setCheckStatus((prev: any) => ({ ...prev, ai: "fail" }));
        } else {
          setCheckStatus((prev: any) => ({ ...prev, ai: "pass" }));
        }
        dispatch(contentCreatorActions.setCheckAiResults(filteredJson));
      } else {
        handleAiFetchError();
      }
    } catch (error) {
      handleAiFetchError();
      console.error("Error checkAi:", error);
    }
  }

  async function startChecks() {
    if (checkStatus.ai !== "pass") {
      await checkAi();
    }
    if (checkStatus.grammar !== "pass" && checkStatus.isGrammerChecked === false) {
      await checkGrammer();
    } else {
      setCheckStatus((prev: any) => ({ ...prev, grammar: "pass" }));
      dispatch(contentCreatorActions.setCheckGrammerResults([]));
    }
    // await checkPlagiarism();
    return Promise.resolve();
  }
  // ===== End Checks =====

  // ===== Start generateTitles =====

  function generatedTitlesInit() {
    if (typeof window !== "undefined") {
      const generatedTitlesInitValue =
        sessionStorage.getItem("generatedTitles");
      return generatedTitlesInitValue
        ? JSON.parse(generatedTitlesInitValue)
        : [];
    } else {
      return [];
    }
  }

  const [generatedTitles, setGeneratedTitles] =
    useState<any>(generatedTitlesInit);
  useEffect(() => {
    sessionStorage.setItem("generatedTitles", JSON.stringify(generatedTitles));
    console.log("generatedTitles:", generatedTitles);
  }, [generatedTitles]);

  async function generateTitles() {
    if (!selectedBrand || !finalArticle?.articles[0]?.content) {
      toast.error("No content or brand name provided");
      return;
    }
    let brandNamePayload: string = "";
    if (selectedBrand === "Street Politics Canada") {
      brandNamePayload = "streetPoliticsCanada";
    } else if (selectedBrand === "Investorcracy") {
      brandNamePayload = "investocracy";
    } else if (selectedBrand === "Movie Myth") {
      brandNamePayload = "movieMyth";
    }

    try {
      const res = await fetch(
        `https://backendmachinegenius.onrender.com/generate-titles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            brandName: brandNamePayload,
            content: finalArticle?.articles[0]?.content,
          }),
        }
      );

      const json = await res.json();

      if (!json) {
        toast.error("Something went wrong! Contact backend department");
        return;
      } else if (json && json.success === false) {
        toast.error("Something went wrong! Contact backend department");
        return;
      } else if (json && json.success === true && json.Titles) {
        setGeneratedTitles(json.Titles);
      } else {
        toast.error("Something went wrong! Contact backend department");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong! Contact backend department");
      console.error("Error generateTitles:", error);
    }
  }

  function selectedContentTitleInit() {
    if (typeof window !== "undefined") {
      const selectedContentTitleInitValue = sessionStorage.getItem(
        "selectedContentTitle"
      );
      return selectedContentTitleInitValue ? selectedContentTitleInitValue : "";
    } else {
      return "";
    }
  }
  const [selectedContentTitle, setSelectedContentTitle] = useState<any>(
    selectedContentTitleInit
  );
  useEffect(() => {
    sessionStorage.setItem("selectedContentTitle", selectedContentTitle);
  }, [selectedContentTitle]);

  function lockedGeneratedTitlesInit() {
    if (typeof window !== "undefined") {
      const lockedGeneratedTitlesInitValue = sessionStorage.getItem(
        "lockedGeneratedTitles"
      );
      return lockedGeneratedTitlesInitValue
        ? JSON.parse(lockedGeneratedTitlesInitValue)
        : [];
    } else {
      return [];
    }
  }
  const [lockedGeneratedTitles, setLockedGeneratedTitles] = useState<any>(
    lockedGeneratedTitlesInit
  );
  useEffect(() => {
    sessionStorage.setItem(
      "lockedGeneratedTitles",
      JSON.stringify(lockedGeneratedTitles)
    );
    console.log("lockedGeneratedTitles:", lockedGeneratedTitles);
  }, [generatedTitles, lockedGeneratedTitles]);
  // ===== End generateTitles =====

  // ===== Start generatedThumbnails =====

  function generatedThumbnailsInit() {
    if (typeof window !== "undefined") {
      const generatedThumbnailsInitValue = sessionStorage.getItem(
        "generatedThumbnails"
      );
      return generatedThumbnailsInitValue
        ? JSON.parse(generatedThumbnailsInitValue)
        : [];
    } else {
      return [];
    }
  }
  const [generatedThumbnails, setGeneratedThumbnails] = useState<any>(
    generatedThumbnailsInit
  );
  useEffect(() => {
    sessionStorage.setItem(
      "generatedThumbnails",
      JSON.stringify(generatedThumbnails)
    );
    // console.log("generatedThumbnails:", generatedThumbnails);
  }, [generatedThumbnails]);

  async function generateThumbnails() {
    if (!selectedBrand || !finalArticle?.articles[0]?.content) {
      toast.error("No content or brand name provided");
      return;
    }
    let brandNamePayload: string = "";
    if (selectedBrand === "Street Politics Canada") {
      brandNamePayload = "streetPoliticsCanada";
    } else if (selectedBrand === "Investorcracy") {
      brandNamePayload = "investocracy";
    } else if (selectedBrand === "Movie Myth") {
      brandNamePayload = "movieMyth";
    }
    try {
      const res = await fetch(
        `https://backendmachinegenius.onrender.com/generate-thumbnails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            brandName: brandNamePayload,
            content: finalArticle?.articles[0]?.content,
          }),
        }
      );
      const json = await res.json();
      if (!json) {
        toast.error("Something went wrong! Contact backend department");
        return;
      } else if (
        json &&
        json.success === false &&
        json.error === "No content or brand name provided"
      ) {
        toast.error("No content or brand name provided");
        return;
      } else if (
        json &&
        json.success === false &&
        json.error === "brandName Not correct"
      ) {
        toast.error("brandName Not correct");
        return;
      } else if (json && json.success === false) {
        toast.error("Something went wrong! Contact backend department");
        return;
      } else if (json && json.success === true && json.Thumbnail) {
        setGeneratedThumbnails(json.Thumbnail);
      } else {
        toast.error("Something went wrong! Contact backend department");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong! Contact backend department");
      console.error("Error generateThumbnails:", error);
    }
  }

  function selectedContentThumbnailInit() {
    if (typeof window !== "undefined") {
      const selectedContentThumbnailInitValue = sessionStorage.getItem(
        "selectedContentThumbnail"
      );
      return selectedContentThumbnailInitValue
        ? selectedContentThumbnailInitValue
        : "";
    } else {
      return "";
    }
  }
  const [selectedContentThumbnail, setSelectedContentThumbnail] = useState<any>(
    selectedContentThumbnailInit
  );
  useEffect(() => {
    sessionStorage.setItem(
      "selectedContentThumbnail",
      selectedContentThumbnail
    );
  }, [selectedContentThumbnail]);

  // ===== End generatedThumbnails =====

  // ===== Start videoTranscription =====
  const videoTranscription = useSelector(
    (state: any) => state.contentCreator.videoTranscription
  );
  useEffect(() => {
    sessionStorage.setItem(
      "videoTranscription",
      JSON.stringify(videoTranscription)
    );
  }, [videoTranscription]);
  // ===== End videoTranscription =====

  // ===== Start editContentData =====
  function editContentDataInit() {
    if (typeof window !== "undefined") {
      const editContentDataInitValue =
        sessionStorage.getItem("editContentData");
      return editContentDataInitValue
        ? JSON.parse(editContentDataInitValue)
        : null;
    } else {
      return null;
    }
  }
  const [editContentData, setEditContentData] =
    useState<any>(editContentDataInit);
  useEffect(() => {
    sessionStorage.setItem("editContentData", JSON.stringify(editContentData));
  }, [editContentData]);
  // ===== End editContentData =====

  // ===== 01. End Content Creator =====

  // Create a context value object
  const contextValue = {
    // ===== 00. Start Authentication =====
    token,
    setToken,
    decodedToken,
    setDecodedToken,
    // ===== 00. End Authentication =====

    // ===== 01. Start Content Creator =====
    selectedContentType,
    setSelectedContentType,
    selectedBrand,
    setSelectedBrand,
    collectedData,
    setCollectedData,
    twitterData,
    setTwitterData,
    choosedArticles,
    setChoosedArticles,
    checkStatus,
    setCheckStatus,
    checkGrammer,
    checkPlagiarism,
    checkAi,
    startChecks,
    generateTitles,
    generatedTitles,
    setGeneratedTitles,
    lockedGeneratedTitles,
    setLockedGeneratedTitles,
    generatedThumbnails,
    setGeneratedThumbnails,
    generateThumbnails,
    selectedContentThumbnail,
    setSelectedContentThumbnail,
    selectedContentTitle,
    setSelectedContentTitle,
    editContentData,
    setEditContentData,
    // ===== 01. End Content Creator =====
  };

  return (
    // to provide what i created
    <globalContext.Provider value={contextValue}>
      {children}
    </globalContext.Provider>
  );
}
