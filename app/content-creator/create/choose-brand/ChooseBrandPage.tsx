"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./ChooseBrand.module.css";
import CustomSelectInput from "../../../_components/CustomSelectInput/CustomSelectInput";
import {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { globalContext } from "@/app/_context/store";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";

export default function ChooseBrandPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const abortControllerRef = useRef<AbortController | null>(null); // Store the AbortController in a ref

  const {
    setSelectedBrand,
    collectedData,
    setCollectedData,
    // setTwitterData,
    setChoosedArticles,
    setCheckStatus,
    selectedBrand,
    setGeneratedTitles,
    setLockedGeneratedTitles,
    setEditContentData,
  } = useContext(globalContext);

  // reset all the data
  useEffect(() => {
    function resetStateAndSessionStorage() {
      setSelectedBrand("");
      setCollectedData(null);
      // setTwitterData(null);
      setChoosedArticles([]);
      dispatch(contentCreatorActions.setFinalArticle(null));
      setCheckStatus({
        grammar: "waiting",
        // todo: temp until backend fix it
        plagiarism: "pass",
        ai: "waiting",
      });
      dispatch(contentCreatorActions.setCheckGrammerResults([]));
      dispatch(contentCreatorActions.setCheckAiResults([]));
      setGeneratedTitles([]);
      setLockedGeneratedTitles([]);
      dispatch(contentCreatorActions.setVideoTranscription(null));
      setEditContentData(null);
      if (typeof window !== "undefined") {
        const keysToRemove = [
          "selectedBrand",
          "collectedData",
          "twitterData",
          "choosedArticles",
          "selectedText",
          "finalArticle",
          "checkGrammerResults",
          "checkAiResults",
          "generatedTitles",
          "lockedGeneratedTitles",
          "videoTranscription",
          "editContentData",
        ];

        keysToRemove.forEach((key) => sessionStorage.removeItem(key));
      }
    }
    resetStateAndSessionStorage();
    return () => {
      // Cleanup function to abort any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const [pageState, setPageState] = useState<{
    isLoading: boolean;
    isRetry: boolean;
    triggerNav: boolean | null;
  }>({
    isLoading: false,
    isRetry: false,
    triggerNav: null,
  });

  const [stockNameValue, setStockNameValue] = useState("PLTR");
  // select options
  const options = useMemo(
    () => [
      "PST Canada",
      "Street Politics UK",
      "Street Politics Africa",
      "Investorcracy",
      "Movie Myth",
    ],
    []
  );
  const stockOptions = useMemo(
    () => [
      { value: "NVDA", label: "NVIDIA" },
      { value: "AAPL", label: "Apple" },
      { value: "AMD", label: "AMD" },
      { value: "AMZN", label: "Amazon" },
      { value: "PLTR", label: "Palantir" },
      { value: "TSLA", label: "Tesla" },
    ],
    []
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setStockNameValue((event.target as HTMLInputElement).value);
    },
    []
  ); // No dependencies, function reference is stable

  // function that get select value by sending to custom select as a prop
  const getValue = useCallback((value: string | number) => {
    setSelectedBrand(value);
  }, []); // No dependencies, function reference is stable

  // useEffect(() => {
  //   console.log(`selectedBrand:`, selectedBrand);
  // }, [selectedBrand]);

  function handleGetCollectedDataFailure() {
    toast.error("Something went wrong! Contact backend department");
    setPageState((prevState) => ({
      ...prevState,
      triggerNav: false,
      isRetry: true,
    }));
    return;
  }

  async function getCollectedData() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController(); // Initialize the AbortController
    const { signal } = abortControllerRef.current;

    let postBody: any = {};
    if (selectedBrand === "PST Canada") {
      postBody.brandName = "STP";
    } else if (selectedBrand === "Investorcracy") {
      postBody.brandName = "INV";
      postBody.stockName = stockNameValue;
    }

    try {
      const res = await fetch(
        `https://backendmachinegenius.onrender.com/generate-content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
          signal, // Pass the signal to the fetch request
        }
      );
      const json = await res.json();
      if (!json) {
        handleGetCollectedDataFailure();
        return;
      } else if (json.success === false) {
        handleGetCollectedDataFailure();
        return;
      } else if (json && json.organizedArticles) {
        setCollectedData(json.organizedArticles);
        setPageState((prevState) => ({
          ...prevState,
          triggerNav: true,
        }));
      }
    } catch (error) {
      console.error("Error getCollectedData:", error);
      handleGetCollectedDataFailure();
    }
  }

  // async function setTwitterDataAsync(json: any) {
  //   setTwitterData(json);
  //   return Promise.resolve(); // Ensure this function is awaited properly
  // }

  // async function getTwitterData() {
  //   try {
  //     const res = await fetch(
  //       `https://backendmachinegenius.onrender.com/collect/twitter/PLTR`
  //     );

  //     const json = await res.json();
  //     await setTwitterDataAsync(json.allArticles);
  //   } catch (error) {
  //     toast.error("Something went wrong! Contact backend department");
  //     console.error("Error getCollectedData:", error);
  //   }
  // }

  async function generateContent() {
    setPageState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    await getCollectedData();
    // if (selectedBrand === "Investorcracy") {
    // await getTwitterData();
    // }
  }

  useEffect(() => {
    if (pageState.triggerNav === true) {
      router.replace("/content-creator/create/choose-articles");
    } else if (pageState.triggerNav === false) {
      toast.error("Something went wrong! Contact backend department");
    }

    return () => {
      // Abort the fetch request if the component unmounts
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [pageState.triggerNav]);

  if (pageState.isLoading) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={true}
          textNeeded={!pageState.isRetry ? "Hold on tight." : ""}
          title={
            !pageState.isRetry
              ? "Genius is collecting data..."
              : "Data collection failed. Please retry."
          }
        />
        {pageState.isRetry && (
          <CustomBtn
            btnColor="black"
            word="Retry"
            onClick={() => {
              getCollectedData();
              setPageState((prevState) => ({
                ...prevState,
                isRetry: false,
              }));
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* choose brand select */}
      <div className="flex flex-col justify-center items-center w-[30vw] min-w-[20rem] mx-auto h-[75vh] py-[1.5vw] ">
        <label className={styles.select_label}>For This Brand</label>

        <CustomSelectInput
          label="Select Brand"
          options={options}
          getValue={getValue}
        />

        {selectedBrand === "Investorcracy" && (
          <FormControl sx={{ marginTop: "2vh" }}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={stockNameValue}
              onChange={handleChange}
            >
              {stockOptions.map((stock: any) => (
                <FormControlLabel
                  key={stock.value}
                  value={stock.value}
                  control={<Radio />}
                  label={stock.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </div>

      {/* buttons to move to last or next page */}
      <div className="flex justify-between items-center">
        <CustomBtn
          word="Back"
          btnColor="white"
          href="/content-creator/create"
        />
        <CustomBtn
          word="Next"
          btnColor="black"
          onClick={() => {
            if (!selectedBrand) {
              toast.error("Please select a brand!");
              return;
            } else if (selectedBrand === "Movie Myth") {
              router.replace("/content-creator/create/movie-myth");
            } else if (
              selectedBrand === "Street Politics UK" ||
              selectedBrand === "Street Politics Africa"
            ) {
              toast.success("Coming Soon...");
            } else {
              generateContent();
            }
          }}
        />
      </div>
    </div>
  );
}
