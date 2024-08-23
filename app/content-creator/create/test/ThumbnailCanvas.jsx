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

export default function ThumbnailCanvas() {
  const canvasEl = useRef(null);
  const fabricCanvasRef = useRef(null);
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
  } = useContext(globalContext);

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
      selectedBgPath: "/bg-inv/bg-0.jpg",
      searchImgKeyword: "",
      searchImgLoading: false,
      searchImgData: pageStateSearchImgDataInit(),
      selectedImgPath: "",
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

  // useEffect(() => {
  //   console.log(`selectedBgPath`, selectedBgPath);
  // }, [selectedBgPath]);

  useEffect(() => {
    console.log(`selectedImgPath`, pageState.selectedImgPath);
  }, [pageState.selectedImgPath]);

  useEffect(() => {
    if (!canvasEl.current) {
      toast.error("Canvas not found!");
      return;
    }

    const canvas = new fabric.Canvas(canvasEl.current);
    fabricCanvasRef.current = canvas;

    // Add a background image
    fabric.Image.fromURL(pageState.selectedBgPath, function (img) {
      // img.set({ crossOrigin: "anonymous" }); // Set crossOrigin attribute
      // canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));

      img.setSrc(
        pageState.selectedBgPath,
        function () {
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        },
        { crossOrigin: "anonymous" }
      ); // Set crossOrigin attribute here
    });

    // Add another image
    fabric.Image.fromURL(pageState.selectedImgPath, function (img) {
      // img.set({ crossOrigin: "anonymous" }); // Set crossOrigin attribute
      // img.left = canvas.width - img.width;
      // img.top = canvas.height - img.height;
      // canvas.add(img);

      img.setSrc(
        pageState.selectedImgPath,
        function () {
          img.left = canvas.width - img.width;
          img.top = canvas.height - img.height;
          canvas.add(img);
        },
        { crossOrigin: "anonymous" }
      ); // Set crossOrigin attribute here
    });

    // Add text
    const text = new fabric.Text(selectedContentThumbnail, {
      left: 150,
      top: 200,
      fontSize: 30,
      fill: "white",
    });
    canvas.add(text);

    // Cleanup
    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [
    pageState.selectedBgPath,
    selectedContentThumbnail,
    pageState.selectedImgPath,
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

  return (
    <section>
      <div className="thumbnailCanvas">
        <div className="thumbnailCanvas_actionsBar">
          {/* 01 Select Thumbnail */}
          <div className="flex flex-col gap-[--10px] w-full">
            <h3>Select Thumbnail</h3>
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
          <div className="flex flex-col gap-[--10px] w-full">
            <h3>Select Background</h3>

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
            <h3>Select Image</h3>
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
              {!pageState.searchImgData ? (
                <p>No images found</p>
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
          </div>

          <button onClick={handleDownload} id="downloadBtn">
            Download Thumbnail
          </button>
        </div>

        <div className="canvas-container relative">
          <canvas id="c" width="1280" height="720" ref={canvasEl}></canvas>
        </div>
      </div>

      <div className="flex justify-between items-center mt-[--sy-10px]">
        <CustomBtn
          word={"Back"}
          btnColor="white"
          href={"/content-creator/create/generated-titles"}
        />
        <CustomBtn
          word={"Send"}
          btnColor="black"
          onClick={() => {
            // handleSelectThumbnail();
          }}
        />
      </div>
    </section>
  );
}
