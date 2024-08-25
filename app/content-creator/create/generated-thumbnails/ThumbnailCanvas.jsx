"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import { globalContext } from "@/app/_context/store";
import { contentCreatorContext } from "@/app/_context/contentCreatorContext";
import "./thumbnailCanvas.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useRouter } from "next/navigation";

export default function ThumbnailCanvas() {
  const canvasEl = useRef(null);
  const fabricCanvasRef = useRef(null);
  const { authState } = useContext(globalContext);
  const {
    selectedContentType,
    selectedBrand,
    selectedContentTitle,
    generatedThumbnails,
    generateThumbnails,
    selectedContentThumbnail,
    setSelectedContentThumbnail,
    editContentData,
    setEditContentData,
  } = useContext(contentCreatorContext);

  const finalArticle = useSelector(
    (state) => state.contentCreator.finalArticle
  );

  const router = useRouter();

  async function handleGenerateThumbnails() {
    setPageState((prev) => ({
      ...prev,
      generateThumbnailsLoading: true,
    }));
    await generateThumbnails();
    setPageState((prev) => ({
      ...prev,
      generateThumbnailsLoading: false,
    }));
  }

  useEffect(() => {
    // handleGenerateThumbnails();
    // Cleanup
    return () => {
      setEditContentData(null);
      sessionStorage.removeItem("editContentData");
    };
  }, []);

  function pageStateSearchImgDataInit() {
    if (typeof window !== "undefined") {
      const searchImgDataValue = sessionStorage.getItem(
        "ThumbnailCanvasPageState"
      );
      return searchImgDataValue
        ? JSON.parse(searchImgDataValue).searchImgData
        : [];
    } else {
      return [];
    }
  }

  function pageStateInit() {
    return {
      generateThumbnailsLoading: false,
      thumbnailFontSize: 90,
      selectedBgPath: "/bg-inv/bg-0.jpg",
      searchImgKeyword: "",
      searchImgLoading: false,
      searchImgData: pageStateSearchImgDataInit(),
      selectedImageNumber: "image-1",
      selectedImgPath: "",
      selectedImgPath2: "",
      removeBgLoading: false,
      isSendLoading: false,
      triggerSendContent: false,
    };
  }

  const [pageState, setPageState] = useState(pageStateInit);

  useEffect(() => {
    sessionStorage.setItem(
      "ThumbnailCanvasPageState",
      JSON.stringify(pageState)
    );
  }, [pageState.searchImgData]);

  const getSelectedContentThumbnailValue = useCallback((value) => {
    setSelectedContentThumbnail(value);
  }, []);

  const getThumbnailFontSizeValue = useCallback((value) => {
    setPageState((prev) => ({
      ...prev,
      thumbnailFontSize: Number(value),
    }));
  }, []);

  const getSelectedImageNumberValue = useCallback((value) => {
    setPageState((prev) => ({
      ...prev,
      selectedImageNumber: value,
    }));
  }, []);

  useEffect(() => {
    if (!canvasEl.current) {
      toast.error("Canvas not found!");
      return;
    }

    const canvas = new fabric.Canvas(canvasEl.current);
    fabricCanvasRef.current = canvas;

    // ==============================================================
    const blockedUrls = JSON.parse(localStorage.getItem("blockedUrls")) || [];
    const isBlocked = (url) => blockedUrls.includes(url);

    const addToBlockedUrls = (url) => {
      if (!blockedUrls.includes(url)) {
        blockedUrls.push(url);
        setPageState((prev) => ({
          ...prev,
          searchImgData: prev.searchImgData.filter((img) => img !== url),
        }));
        localStorage.setItem("blockedUrls", JSON.stringify(blockedUrls));
      }
    };

    // Function to handle image loading
    const loadImage = (url, onSuccess) => {
      fabric.Image.fromURL(
        url,
        function (img, error) {
          if (error) {
            toast.error(`Failed to load image from ${url}.`);
            addToBlockedUrls(url);
            return;
          }
          img.set({ crossOrigin: "anonymous" });
          onSuccess(img);
        },
        { crossOrigin: "anonymous" }
      );
    };

    function splitSentenceIntoWords() {
      if (selectedContentThumbnail) {
        return selectedContentThumbnail.split(" ");
      } else {
        return [];
      }
    }
    // Get the words from the sentence
    const words = splitSentenceIntoWords();
    // ==============================================================

    // Load background image
    if (!isBlocked(pageState.selectedBgPath)) {
      loadImage(pageState.selectedBgPath, (img) => {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    }

    // Add another image
    fabric.Image.fromURL(
      "/assest.png",
      function (img, error) {
        if (error) {
          toast.error("Failed to load overlay image.");
          return;
        }

        img.set({
          crossOrigin: "anonymous", // Set crossOrigin attribute
          left: -1,
          top: 0,
          selectable: false, // Make the image non-selectable (non-movable, non-resizable)
          evented: false, // Disable interaction events (prevents drag, resize)
          lockMovementX: true, // Prevent horizontal movement
          lockMovementY: true, // Prevent vertical movement
          lockScalingX: true, // Prevent horizontal scaling
          lockScalingY: true, // Prevent vertical scaling
          lockRotation: true, // Prevent rotation
        });

        canvas.add(img);
        // Send the image to the back
        img.sendToBack();
      },
      { crossOrigin: "anonymous" }
    );

    // Load another image
    const imagePath = pageState.selectedImgPath;
    if (!isBlocked(imagePath)) {
      loadImage(imagePath, (img) => {
        img.scaleToWidth(500); // Optional: scale the image if needed
        img.left = canvas.width - img.width * img.scaleX - 40; // Position on the right edge
        img.top = canvas.height - img.height * img.scaleY - 40; // Position on the bottom edge

        canvas.add(img);
      });
    }

    // Load another image
    const imagePath2 = pageState.selectedImgPath2;
    if (!isBlocked(imagePath2)) {
      loadImage(imagePath2, (img) => {
        img.scaleToWidth(500); // Optional: scale the image if needed
        img.left = canvas.width - img.width * img.scaleX - 80; // Position on the right edge
        img.top = canvas.height - img.height * img.scaleY - 80; // Position on the bottom edge

        canvas.add(img);
      });
    }

    // Add text
    // Set the starting position (bottom-left corner)
    let left = 40;
    let top = canvas.height - (pageState.thumbnailFontSize + 40); // Start near the bottom of the canvas

    // Add each word as a separate text object
    for (let i = words.length - 1; i >= 0; i--) {
      const text = new fabric.Text(words[i], {
        left: left,
        top: top,
        fontSize: pageState.thumbnailFontSize,
        fill: i === 0 ? "red" : "#ffffff",
        fontFamily: "Hellix-Black",
        fontWeight: "600",
        shadow: {
          color: "rgba(0, 0, 0, 0.5)", // Shadow color with opacity
          blur: 5, // Blur level of the shadow
          offsetX: 3, // Horizontal shadow offset
          offsetY: 3, // Vertical shadow offset
        },
      });
      canvas.add(text);
      top -= text.height; // Move the next word up by the height of the text
    }

    // Cleanup
    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [
    pageState.selectedBgPath,
    selectedContentThumbnail,
    pageState.selectedImgPath,
    pageState.selectedImgPath2,
    pageState.thumbnailFontSize,
    canvasEl,
  ]);

  const handleDownload = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL({ format: "png" });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "thumbnail.png";
      link.click();
    }
  };

  async function handleSearchImg() {
    if (!pageState.searchImgKeyword) {
      toast.error("Please provide a keyword to search for an image!");
      return;
    }
    try {
      setPageState((prev) => ({
        ...prev,
        searchImgLoading: true,
      }));
      const res = await fetch(
        `https://machine-genius.onrender.com/content-creation/get-images`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchImgKeyword: pageState.searchImgKeyword,
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
      } else if (json && json.success === true && json.images) {
        setPageState((prev) => ({
          ...prev,
          searchImgData: json.images.map((img) => img.original),
        }));
      } else {
        toast.error("Something went wrong! Contact backend department");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong! Contact backend department");
      console.error("Error generateThumbnails:", error);
    } finally {
      setPageState((prev) => ({
        ...prev,
        searchImgLoading: false,
      }));
    }
  }

  async function handleRemoveBg(img, type) {
    try {
      setPageState((prev) => ({
        ...prev,
        removeBgLoading: true,
      }));
      const res = await fetch(`https://api.remove.bg/v1.0/removebg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.NEXT_PUBLIC_REMOVEBG_API_KEY,
        },
        body: JSON.stringify({
          ...(type === "select" ? { image_url: img } : { image_file_b64: img }),
          size: "auto",
        }),
      });

      if (!res.ok) {
        toast.error("Something went wrong! Contact backend department");
        console.error("Error handleRemoveBg:", error);
        return;
      }

      // Convert the response to a Blob
      const blob = await res.blob();
      // Create a URL for the Blob
      const imageUrl = URL.createObjectURL(blob);
      // Use the imageUrl in your application
      return imageUrl; // You can set this as the src of an img tag
    } catch (error) {
      toast.error("Something went wrong! Contact backend department");
      console.error("Error handleRemoveBg:", error);
    } finally {
      setPageState((prev) => ({
        ...prev,
        removeBgLoading: false,
      }));
    }
  }

  function handleUploadImg(e) {
    // console.log(`e`, e);
    const file = e.target.files[0];
    // console.log(`file`, file);
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        // console.log(`event`, event);
        const dataUrl = event.target.result; // Data URL of the uploaded image
        // Call handleRemoveBg with the uploaded image's Data URL
        const removedBgImgUrl = await handleRemoveBg(dataUrl, "upload");

        const imgPath =
          pageState.selectedImageNumber === "image-1"
            ? "selectedImgPath"
            : "selectedImgPath2";

        setPageState((prev) => ({
          ...prev,
          [imgPath]: removedBgImgUrl || dataUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSelectImg(img) {
    const removedBgImg = await handleRemoveBg(img, "select");

    const imgPath =
      pageState.selectedImageNumber === "image-1"
        ? "selectedImgPath"
        : "selectedImgPath2";

    setPageState((prev) => ({
      ...prev,
      [imgPath]: removedBgImg || img,
    }));
  }

  // =======================================================================
  function handleSelectThumbnail() {
    if (selectedContentThumbnail) {
      setPageState((prev) => ({
        ...prev,
        triggerSendContent: true,
      }));
    } else {
      toast.error("Please select a thumbnail!");
    }
    // todo: delete this condition after backend add Movie Myth brand
    if (selectedBrand === "Movie Myth") {
      setPageState((prev) => ({
        ...prev,
        triggerSendContent: true,
      }));
    }
  }

  useEffect(() => {
    if (pageState.triggerSendContent) {
      handleSendContent();
    }
  }, [pageState.triggerSendContent]);

  function generateData() {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", options);

    // toLocaleDateString returns month abbreviation, convert to full month name
    const monthAbbreviations = {
      Jan: "January",
      Feb: "February",
      Mar: "March",
      Apr: "April",
      May: "May",
      Jun: "June",
      Jul: "July",
      Aug: "August",
      Sep: "September",
      Oct: "October",
      Nov: "November",
      Dec: "December",
    };
    const [day, monthAbbrev, year] = formattedDate.split(" ");
    const month = monthAbbreviations[monthAbbrev];

    return `${day} ${month} ${year}`;
  }

  async function handleSendContent() {
    let endpoint = editContentData
      ? `https://api.machinegenius.io/content-creation/content/${editContentData._id}`
      : "https://api.machinegenius.io/content-creation/content";
    let method = editContentData ? "PATCH" : "POST";
    setPageState((prev) => ({
      ...prev,
      isSendLoading: true,
    }));
    let postBody = {
      content_title: selectedContentTitle,
      content: finalArticle?.articles[0]?.content,
      brand: selectedBrand,
      content_type: selectedContentType,
      ...(method === "POST" && { date: generateData() }),
    };

    const maxRetries = 1; // Define the maximum number of retries
    let attempts = 0;
    let json = null;

    while (attempts < maxRetries) {
      try {
        const res = await fetch(endpoint, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
          body: JSON.stringify(postBody),
        });
        json = await res.json();
        if (json) {
          // If valid data is found, break the loop
          break;
        }
      } catch (error) {
        toast.error("Something went wrong! Contact backend department");
        console.error("Error handleSendContent:", error);
      } finally {
        attempts++;
      }
    }

    if (json) {
      // toast.success("Content sent successfully");
      if (selectedBrand === "Movie Myth") {
        router.replace("/content-creator/create/movie-myth/article-ready");
      } else {
        router.replace("/content-creator/create/schedule-script");
      }
    } else {
      // setIsRetry(true);
      // window.alert("Failed to generate content after multiple attempts");
      // router.push("/content-creator/create/choose-brand");
    }
  }
  // =======================================================================

  if (pageState.generateThumbnailsLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-w-[24rem] gap-[2vw] h-[75vh] py-[1.5vw]">
        <LogoAndTitle needTxt={false} title="Generating Thumbnails..." />
      </div>
    );
  }

  if (pageState.isSendLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-w-[24rem] gap-[2vw] h-[75vh] py-[1.5vw]">
        <LogoAndTitle needTxt={false} title="Sending Content..." />
      </div>
    );
  }

  if (pageState.searchImgLoading) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={true}
          textNeeded="Hold on tight."
          title={"Genius is searching for images..."}
        />
      </div>
    );
  }

  if (pageState.removeBgLoading) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={true}
          textNeeded="Hold on tight."
          title={"Genius is removing image background..."}
        />
      </div>
    );
  }

  return (
    <section>
      <div className="thumbnailCanvas">
        <div className="thumbnailCanvas_actionsBar">
          {/* 01 Select Thumbnail */}
          <div className="flex flex-col gap-[--10px] w-full">
            <div className="flex justify-between items-center pt-[--10px]">
              <h3 className="font-bold text-[--17px]">Select Thumbnail</h3>

              <div className="w-1/2">
                <CustomSelectInput
                  label={"Font Size"}
                  options={Array.from({ length: 71 }, (_, i) => i + 60)}
                  getValue={getThumbnailFontSizeValue}
                />
              </div>
            </div>

            <CustomSelectInput
              label={"Select Thumbnail"}
              options={
                generatedThumbnails && generatedThumbnails?.length > 0
                  ? generatedThumbnails?.map((e) => e.Thumbnail)
                  : ["No Thumbnails Found"]
              }
              getValue={getSelectedContentThumbnailValue}
            />
          </div>

          {/* 02 Select Background */}
          <div className="flex flex-col gap-[--5px] w-full">
            <h3 className="font-bold text-[--17px] border-t-[--2px] border-[--gray-300] pt-[--7px]">
              Select Background
            </h3>

            <div className="flex gap-[--20px] overflow-scroll p-[--5px]">
              {Array.from({ length: 10 }, (_, i) => (
                <img
                  key={uuidv4()}
                  loading="lazy"
                  src={`/bg-inv/bg-${i}.jpg`}
                  alt="bg-inv"
                  className="w-[70%] hover:opacity-80 hover:outline hover:outline-3 hover:outline-black transition-none cursor-pointer"
                  onClick={() =>
                    setPageState((prev) => ({
                      ...prev,
                      selectedBgPath: `/bg-inv/bg-${i}.jpg`,
                    }))
                  }
                />
              ))}
            </div>
          </div>

          {/* 03 Select Image */}
          <div className="flex flex-col gap-[--12px] w-full">
            {/* 03-01 Select Image */}
            <div className="flex justify-between items-center pt-[--10px] border-t-[--2px] border-[--gray-300]">
              <h3 className="font-bold text-[--17px]">Select Image</h3>

              <div className="w-1/2">
                <CustomSelectInput
                  label={"Image No."}
                  options={["image-1", "image-2"]}
                  getValue={getSelectedImageNumberValue}
                />
              </div>
            </div>

            {/* 03-02 Search Image */}
            <div className="flex gap-[--10px]">
              <input
                className="flex-1 border-[--1px] border-[--gray-300] rounded-[--5px] p-[--5px]"
                type="text"
                name="img-search"
                id="img-search"
                placeholder="Search for an image ..."
                value={pageState.searchImgKeyword}
                onChange={(e) =>
                  setPageState((prev) => ({
                    ...prev,
                    searchImgKeyword: e.target.value,
                  }))
                }
              />
              <button
                onClick={() => {
                  console.log(`searchImgKeyword`, pageState.searchImgKeyword);
                  handleSearchImg();
                }}
              >
                Search
              </button>
            </div>

            {/* 03-03 Preview Images */}
            <div className="flex gap-[--20px] overflow-scroll p-[--5px] w-full">
              {!pageState.searchImgData.length ? (
                <img
                  src="/img-placeholder.jpg"
                  alt="img-placeholder"
                  className="w-[55%] h-auto aspect-square object-cover"
                />
              ) : (
                pageState.searchImgData.map((img) => (
                  <img
                    key={uuidv4()}
                    loading="lazy"
                    src={img}
                    alt="searchImg"
                    className="w-[55%] h-auto aspect-square object-cover hover:opacity-80 hover:outline hover:outline-3 hover:outline-black transition-none cursor-pointer"
                    onClick={() => handleSelectImg(img)}
                  />
                ))
              )}
            </div>

            {/* 03-04 UploadImg */}
            <div>
              <h3 className="font-bold text-[--17px]">or: Upload Image</h3>
              <div
                className={"w-full flex thumbnailCanvas_actionsBar_uploadImg"}
              >
                <input
                  type="file"
                  // accept="image/*"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleUploadImg}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="canvas-container relative">
          <canvas id="c" width="1280" height="720" ref={canvasEl}></canvas>
        </div>
      </div>

      <div className="flex justify-between items-center mt-[--sy-20px]">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/content-creator/create/generated-titles"}
        />
        <button onClick={handleDownload} id="downloadBtn">
          Download Thumbnail
        </button>
        <CustomBtn
          word={"Send"}
          btnColor="black"
          onClick={() => {
            handleSelectThumbnail();
          }}
        />
      </div>
    </section>
  );
}
