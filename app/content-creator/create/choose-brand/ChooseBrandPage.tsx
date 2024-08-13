"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./ChooseBrand.module.css";
import CustomSelectInput from "../../../_components/CustomSelectInput/CustomSelectInput";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { globalContext } from "@/app/_context/store";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";

export default function ChooseBrandPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    setSelectedBrand,
    collectedData,
    setCollectedData,
    setTwitterData,
    setChoosedArticles,
    setCheckStatus,
    selectedBrand,
    setGeneratedTitles,
    setLockedGeneratedTitles,
    setEditContentData,
  } = useContext(globalContext);

  // reset all the data
  useEffect(() => {
    setSelectedBrand("");
    setCollectedData(null);
    setTwitterData(null);
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
      sessionStorage.removeItem("selectedBrand");
      sessionStorage.removeItem("collectedData");
      sessionStorage.removeItem("twitterData");
      sessionStorage.removeItem("choosedArticles");
      sessionStorage.removeItem("selectedText");
      sessionStorage.removeItem("finalArticle");
      sessionStorage.removeItem("checkGrammerResults");
      sessionStorage.removeItem("checkAiResults");
      sessionStorage.removeItem("generatedTitles");
      sessionStorage.removeItem("lockedGeneratedTitles");
      sessionStorage.removeItem("videoTranscription");
      sessionStorage.removeItem("editContentData");
    }
  }, []);

  const [IsLoading, setIsLoading] = useState(false);
  const [IsRetry, setIsRetry] = useState(false);
  // select options
  const options = [
    // "PST USA",
    "PST Canada",
    "Investorcracy",
    "Movie Myth",
    // "Mega Projects",
  ];

  const [stockNameValue, setStockNameValue] = useState("PLTR");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStockNameValue((event.target as HTMLInputElement).value);
  };
  // function that get select value by sending to custom select as a prop
  const getValue = (value: string | number) => {
    setSelectedBrand(value);
  };

  useEffect(() => {
    console.log(`selectedBrand:`, selectedBrand);
  }, [selectedBrand]);

  async function setCollectedDataAsync(json: any) {
    setCollectedData(json.organizedArticles);
    return Promise.resolve(); // Ensure this function is awaited properly
  }

  async function getCollectedData() {
    let postBody: any = {};
    if (selectedBrand === "PST Canada") {
      postBody.brandName = "STP";
    } else if (selectedBrand === "Investorcracy") {
      postBody.brandName = "INV";
      postBody.stockName = stockNameValue;
    }

    const maxRetries = 2; // Define the maximum number of retries
    let attempts = 0;
    let json = null;

    while (attempts < maxRetries) {
      try {
        const res = await fetch(
          `https://backendmachinegenius.onrender.com/generate-content`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postBody),
          }
        );
        json = await res.json();
        if (json.success === false) {
          toast.error("Something went wrong! Contact backend department");
        }
        if (json?.organizedArticles) {
          // If valid data is found, break the loop
          break;
        }
      } catch (error) {
        toast.error("Something went wrong! Contact backend department");
        console.error("Error getCollectedData:", error);
      } finally {
        attempts++;
      }
    }

    if (json?.organizedArticles) {
      await setCollectedDataAsync(json);
      // setCollectedData(json.organizedArticles);
    } else {
      setIsRetry(true);
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }

  async function setTwitterDataAsync(json: any) {
    setTwitterData(json);
    return Promise.resolve(); // Ensure this function is awaited properly
  }

  async function getTwitterData() {
    try {
      const res = await fetch(
        `https://backendmachinegenius.onrender.com/collect/twitter/PLTR`
      );

      const json = await res.json();
      await setTwitterDataAsync(json.allArticles);
    } catch (error) {
      toast.error("Something went wrong! Contact backend department");
      console.error("Error getCollectedData:", error);
    }
  }

  async function generateContent() {
    setIsLoading(true);
    await getCollectedData();
    if (selectedBrand === "Investorcracy") {
      // await getTwitterData();
    }
    router.replace("/content-creator/create/choose-articles");
  }

  if (IsLoading) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={true}
          textNeeded="Hold on tight."
          title="Genius is working on your article.."
        />
        {IsRetry && (
          <CustomBtn
            btnColor="black"
            word="Retry"
            onClick={() => {
              // getCollectedData();
              setIsRetry(false);
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
              <FormControlLabel
                value="NVDA"
                control={<Radio />}
                label="NVIDIA"
              />
              <FormControlLabel
                value="AAPL"
                control={<Radio />}
                label="Apple"
              />
              <FormControlLabel value="AMD" control={<Radio />} label="AMD" />
              <FormControlLabel
                value="AMZN"
                control={<Radio />}
                label="Amazon"
              />
              <FormControlLabel
                value="PLTR"
                control={<Radio />}
                label="Palantir"
              />
              <FormControlLabel
                value="TSLA"
                control={<Radio />}
                label="Tesla"
              />
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
            } else if (selectedBrand === "Movie Myth") {
              router.replace("/content-creator/create/movie-myth");
            } else {
              generateContent();
            }
          }}
        />
      </div>
    </div>
  );
}
