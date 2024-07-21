"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./ChooseBrand.module.css";
import CustomSelectInput from "../../../_components/CustomSelectInput/CustomSelectInput";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { globalContext } from "@/app/_context/store";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";

export default function ChooseBrandPage() {
  const router = useRouter();

  const {
    setSelectedBrand,
    setCollectedData,
    setTwitterData,
    setChoosedArticles,
    setFinalArticle,
    setCheckGrammerResults,
    setCheckAiResults,
    selectedBrand,
  } = useContext(globalContext);

  // reset all the data
  useEffect(() => {
    setSelectedBrand("");
    setCollectedData(null);
    setTwitterData(null);
    setChoosedArticles([]);
    setFinalArticle(null);
    setCheckGrammerResults([]);
    setCheckAiResults([]);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("selectedBrand");
      sessionStorage.removeItem("collectedData");
      sessionStorage.removeItem("twitterData");
      sessionStorage.removeItem("choosedArticles"); 
      sessionStorage.removeItem("finalArticle");
      sessionStorage.removeItem("checkGrammerResults");
      sessionStorage.removeItem("checkAiResults");
    }
  }, []);

  const [IsLoading, setIsLoading] = useState(false);
  const [IsRetry, setIsRetry] = useState(false);
  // select options
  const options = [
    "PST USA",
    "PST Canada",
    "Movie Myth",
    "Investorcracy",
    "Mega Projects",
  ];

  const [stockNameValue, setStockNameValue] = useState("PLTR");
  // function that get select value by sending to custom select as a prop
  const getValue = (value: string | number) => {
    setSelectedBrand(value);
  };

  useEffect(() => {
    console.log(`selectedBrand:`, selectedBrand);
    // navigate to movie myth if user select movie myth option
    // if (selectedBrand === "Movie Myth") {
    //   router.push("/content-creator/create/movie-myth");
    // }
  }, [selectedBrand]);


  async function setCollectedDataAsync(json:any) {
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
        const res = await fetch(`http://localhost:3000/generate-content`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        json = await res.json();

        if (json?.organizedArticles) {
          // If valid data is found, break the loop
          break;
        }
      } catch (error) {
        console.error("Error getCollectedData:", error);
      } finally {
        attempts++;
      }
    }

    if (json?.organizedArticles) {
      await setCollectedDataAsync(json);
    } else {
      setIsRetry(true);
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }


  async function setTwitterDataAsync(json:any) {
    setTwitterData(json);
    return Promise.resolve(); // Ensure this function is awaited properly
  }

  async function getTwitterData() {
    try {
      const res = await fetch(`http://localhost:3000/collect/twitter/PLTR`);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const json = await res.json();
      await setTwitterDataAsync(json.allArticles);
    } catch (error) {
      console.error("Error getCollectedData:", error);
    }
  }

  async function generateContent(){
    setIsLoading(true);
    await getCollectedData();
    if (selectedBrand === "Investorcracy"){
      await getTwitterData();
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
              getCollectedData();
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
            if (
              selectedBrand !== "PST Canada" &&
              selectedBrand !== "Investorcracy"
            ) {
              // window.alert("Please select PST Canada or Investorcracy!");
            } else {
              generateContent();
            }
          }}
        />
      </div>
    </div>
  );
}
