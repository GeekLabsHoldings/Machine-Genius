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
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import toast from "react-hot-toast";
import { globalContext } from "@/app/_context/store";
import { createNewsletterContext } from "../_context/createNewsletterContext";

export default function ChooseBrandPage() {
  const router = useRouter();
  const abortControllerRef = useRef<AbortController | null>(null); // Store the AbortController in a ref
  const { authState, handleSignOut } = useContext(globalContext);
  const {
    setSelectedBrand,
    selectedBrand,
    setCollectedData,
    setChoosedArticles,
    setGeneratedTitles,
    setLockedGeneratedTitles,
  } = useContext(createNewsletterContext);

  // reset all the data
  useEffect(() => {
    function resetStateAndSessionStorage() {
      setSelectedBrand("");
      setCollectedData(null);
      setChoosedArticles([]);

      setGeneratedTitles([]);
      setLockedGeneratedTitles([]);
      if (typeof window !== "undefined") {
        const keysToRemove = [
          "Newsletter-selectedBrand",
          "Newsletter-collectedData",
          "Newsletter-choosedArticles",
          "Newsletter-generatedTitles",
          "Newsletter-selectedContentTitle",
          "Newsletter-generalTitles",
          "Newsletter-lockedGeneratedTitles",
          "Newsletter-subjectLine",
          "Newsletter-openingLine",
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
      "Street Politics Canada",
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
      { value: "ALPHA", label: "Alphabet" },
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
  }, []); // No dependencies, function reference is stable/

  function handleGetCollectedDataFailure() {
    toast.error("Something went wrong!");
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

    let postBody: any = {};
    if (selectedBrand === "Street Politics Canada") {
      postBody.brandName = "streetPoliticsCanada";
    } else if (selectedBrand === "Street Politics UK") {
      postBody.brandName = "streetPoliticsUK";
    } else if (selectedBrand === "Street Politics Africa") {
      postBody.brandName = "streetPoliticsAfrica";
    } else if (selectedBrand === "Investorcracy") {
      postBody.brandName = "investocracy";
      postBody.stockName = stockNameValue;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/social-media/news-letter/get-generated-news-letter?brand=${
          postBody.brandName
        }${
          selectedBrand === "Investorcracy"
            ? `&stockName=${stockNameValue}`
            : ""
        }
      
        `,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json = await res.json();
      if (!json) {
        handleGetCollectedDataFailure();
        return;
      } else if (json.success === false) {
        handleGetCollectedDataFailure();
        return;
      } else if (json && json.result) {
        console.log(`json.organizedArticles:`, json.result);
        setCollectedData(json.result);
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

  async function generateContent() {
    setPageState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    await getCollectedData();
  }

  useEffect(() => {
    if (pageState.triggerNav === true) {
      router.replace("/newsletter/create/choose-newsletter");
    } else if (pageState.triggerNav === false) {
      toast.error("Something went wrong!");
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
        <CustomBtn word="Back" btnColor="white" href="/newsletter/create/" />
        <CustomBtn
          word="Next"
          btnColor="black"
          onClick={() => {
            if (!selectedBrand) {
              toast.error("Please select a brand!");
              return;
            } else if (selectedBrand === "Investorcracy" && !stockNameValue) {
              // router.replace("/newsletter/subjectline");
            } else {
              generateContent();
            }
          }}
        />
      </div>
    </div>
  );
}
