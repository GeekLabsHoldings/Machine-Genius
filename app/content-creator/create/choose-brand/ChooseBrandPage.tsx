"use client";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./ChooseBrand.module.css";
import CustomSelectInput from "../../../_components/CustomSelectInput/CustomSelectInput";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { globalContext } from "@/app/_context/store";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

export default function ChooseBrandPage() {
  const router = useRouter();

  const {
    setCollectedData,
    setChoosedArticles,
    setPreviewText,
    setSelectedArticle,
    setSelectedText,
    setFinalArticle,
    collectedData,
    selectedBrand,
    setSelectedBrand,
  } = useContext(globalContext);

  // reset all the data
  useEffect(() => {
    setCollectedData(null);
    setChoosedArticles([]);
    setPreviewText("");
    setSelectedArticle(null);
    setSelectedText([]);
    setFinalArticle(null);
  }, []);

  // loading state that show and hide loading
  const [IsLoading, setIsLoading] = useState(false);
  const [IsRetry, setIsRetry] = useState(false);
  // selected option from custom select
  const [SelectedValue, setSelectedValue] = useState<any>("");
  // function that get select value by sending to custom select as a prop
  const getValue = (value: string | number) => {
    setSelectedValue(value);
    setSelectedBrand(value);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedBrand", value.toString());
    }
  };

  const [stockNameValue, setStockNameValue] = useState("NVDA");
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setStockNameValue((event.target as HTMLInputElement).value);
  // };

  // select options
  const options = [
    "PST USA",
    "PST Canada",
    "Movie Myth",
    "Investorcracy",
    "Mega Projects",
  ];


  async function setCollectedDataAsync(json:any) {
    setCollectedData(json.organizedArticles);
    return Promise.resolve(); // Ensure this function is awaited properly
  }

  async function getCollectedData(selectedValue: any) {
    let brandNameValue;
    let postBody: any = {};
    if (selectedValue === "PST Canada") {
      brandNameValue = "STP";
      postBody.brandName = brandNameValue;
    } else if (selectedValue === "Investorcracy") {
      brandNameValue = "INV";
      postBody.brandName = brandNameValue;
      postBody.stockName = stockNameValue;
    }

    setIsLoading(true);
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
          // cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
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
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "collectedData",
          JSON.stringify(json.organizedArticles)
        );
      }
      router.push("/content-creator/create/choose-articles");
    } else {
      setIsRetry(true);
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }

  useEffect(() => {
    console.log(SelectedValue);
    console.log(`selectedBrand`, selectedBrand);
    // navigate to movie myth if user select movie myth option
    // if (SelectedValue === "Movie Myth") {
    //   router.push("/content-creator/create/movie-myth");
    // }
  }, [SelectedValue]);

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
              getCollectedData(SelectedValue);
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

        {/* {SelectedValue === "Investorcracy" && (
  <FormControl sx={{marginTop: "2vh"}}>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={stockNameValue}
        onChange={handleChange}
      >
        <FormControlLabel value="NVDA" control={<Radio />} label="NVIDIA" />
        <FormControlLabel value="AAPL" control={<Radio />} label="Apple" />
        <FormControlLabel value="AMD" control={<Radio />} label="AMD" />
        <FormControlLabel value="AMZN" control={<Radio />} label="Amazon" />
        <FormControlLabel value="PLTR" control={<Radio />} label="Palantir" />
        <FormControlLabel value="TSLA" control={<Radio />} label="Tesla" />
      </RadioGroup>
    </FormControl>
)} */}
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
              SelectedValue !== "PST Canada" &&
              SelectedValue !== "Investorcracy"
            ) {
              // window.alert("Please select PST Canada or Investorcracy!");
            } else {
              getCollectedData(SelectedValue);
            }
          }}
        />
      </div>
    </div>
  );
}
