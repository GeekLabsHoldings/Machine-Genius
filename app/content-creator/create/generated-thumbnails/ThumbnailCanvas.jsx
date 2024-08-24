"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { globalContext } from "@/app/_context/store";
import "./thumbnailCanvas.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";

export default function ThumbnailCanvas() {
  const canvasEl = useRef(null);
  const fabricCanvasRef = useRef(null);
  const {
    // selectedContentType,
    // selectedBrand,
    // selectedContentTitle,
    generatedThumbnails,
    generateThumbnails,
    selectedContentThumbnail,
    setSelectedContentThumbnail,
    // editContentData,
    setEditContentData,
  } = useContext(globalContext);

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
    handleGenerateThumbnails();
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
      selectedImgPath: "",
      triggerFilterImages: false,
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

  // useEffect(() => {
  //   console.log(`selectedBgPath`, selectedBgPath);
  // }, [selectedBgPath]);

  // useEffect(() => {
  //   console.log(`selectedImgPath`, pageState.selectedImgPath);
  // }, [pageState.selectedImgPath]);

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

    // Load another image
    const imagePath = pageState.selectedImgPath || "/img-placeholder.jpg";
    if (!isBlocked(imagePath)) {
      loadImage(imagePath, (img) => {
        img.scaleToWidth(500); // Optional: scale the image if needed
        img.left = canvas.width - img.width * img.scaleX - 40; // Position on the right edge
        img.top = canvas.height - img.height * img.scaleY - 40; // Position on the bottom edge

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
          triggerFilterImages: true,
        }));
      } else {
        toast.error("Something went wrong! Contact backend department");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong! Contact backend department");
      console.error("Error generateThumbnails:", error);
    }
  }

  async function testImageUrl(url) {
    // toast("Testing image url...");
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;

      img.onload = () => {
        // Create a canvas to attempt to draw the image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        try {
          // Attempt to read pixel data from the canvas
          ctx.getImageData(0, 0, 1, 1);
          resolve(url); // Image loaded and CORS is okay
        } catch (e) {
          reject("CORS issue or image data blocked: " + url);
        }
      };

      img.onerror = () => reject("Image load error: " + url);
    });
  }

  async function handleFilterImages() {
    const urlsToCheck = pageState.searchImgData;
    if (!urlsToCheck.length) {
      toast.error("No images to check!");
      return;
    }
    const validUrls = [];
    const blocked = [];

    for (const url of urlsToCheck) {
      try {
        await testImageUrl(url);
        validUrls.push(url);
      } catch {
        blocked.push(url);
      }
    }

    // Update with blocked URLs
    const blockedUrls = JSON.parse(localStorage.getItem("blockedUrls")) || [];
    const newBlockedUrls = [...new Set([...blockedUrls, ...blocked])];
    localStorage.setItem("blockedUrls", JSON.stringify(newBlockedUrls));

    // Update with valid URLs
    setPageState((prev) => ({
      ...prev,
      searchImgLoading: false,
      searchImgData: validUrls,
    }));
  }

  useEffect(() => {
    if (pageState.triggerFilterImages) {
      handleFilterImages();
    }
  }, [pageState.triggerFilterImages]);

  function handleUploadImg(e) {
    // console.log(`e`, e);
    const file = e.target.files[0];
    // console.log(`file`, file);
    if (file) {
      const reader = new FileReader();
      // moved after reader.onload
      // reader.readAsDataURL(file);
      reader.onload = (event) => {
        // console.log(`event`, event);
        setPageState((prev) => ({
          ...prev,
          selectedImgPath: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  if (pageState.generateThumbnailsLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-w-[24rem] gap-[2vw] h-[75vh] py-[1.5vw]">
        <LogoAndTitle needTxt={false} title="Generating Thumbnails..." />
      </div>
    );
  }

  if (pageState.searchImgLoading) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
        <LogoAndTitle
          needTxt={true}
          textNeeded="Hold on tight."
          title={
            !pageState.triggerFilterImages
              ? "Genius is searching for images..."
              : "Genius is filtering images..."
          }
        />
      </div>
    );
  }

  return (
    <section>
      <div className="thumbnailCanvas">
        <div className="thumbnailCanvas_actionsBar">
          {/* 01 Select Thumbnail */}
          <div className="flex flex-col gap-[--10px] w-full mt-[--sy-20px]">
            <h3 className="font-bold text-[--17px]">Select Thumbnail</h3>
            <CustomSelectInput
              label={"Select Thumbnail"}
              options={
                generatedThumbnails && generatedThumbnails?.length > 0
                  ? generatedThumbnails?.map((e) => e.Thumbnail)
                  : ["No Thumbnails Found"]
              }
              getValue={getSelectedContentThumbnailValue}
            />

            <div className="w-1/2">
              <CustomSelectInput
                label={"Font Size"}
                options={Array.from({ length: 71 }, (_, i) => i + 60)}
                getValue={getThumbnailFontSizeValue}
              />
            </div>
          </div>

          {/* 02 Select Background */}
          <div className="flex flex-col gap-[--10px] w-full">
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
          <div className="flex flex-col gap-[--10px] w-full">
            <h3 className="font-bold text-[--17px] border-t-[--2px] border-[--gray-300] pt-[--7px]">
              Select Image
            </h3>
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

            <div className="flex gap-[--20px] overflow-scroll p-[--5px] w-full">
              {!pageState.searchImgData.length ? (
                <img
                  src="/img-placeholder.jpg"
                  alt="img-placeholder"
                  className="w-[70%] h-auto aspect-square object-cover"
                />
              ) : (
                pageState.searchImgData.map((img) => (
                  <img
                    key={uuidv4()}
                    loading="lazy"
                    src={img}
                    alt="searchImg"
                    className="w-[70%] h-auto aspect-square object-cover hover:opacity-80 hover:outline hover:outline-3 hover:outline-black transition-none cursor-pointer"
                    onClick={() =>
                      setPageState((prev) => ({
                        ...prev,
                        selectedImgPath: img,
                      }))
                    }
                  />
                ))
              )}
            </div>

            {/* UploadImg */}
            <h3 className="font-bold text-[--17px]">or: Upload Image</h3>
            <div className={"w-full flex thumbnailCanvas_actionsBar_uploadImg"}>
              <input type="file" accept="image/*" onChange={handleUploadImg} />
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
        <CustomBtn word={"Send"} btnColor="black" onClick={() => {}} />
      </div>
    </section>
  );
}
