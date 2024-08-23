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
// import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
// import dynamic from "next/dynamic";

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

  const [pageState, setPageState] = useState({
    selectedBgPath: "/bg-inv/bg-0.jpg",
    searchImgKeyword: "",
  });

  const getSelectedContentThumbnailValue = useCallback((value) => {
    setSelectedContentThumbnail(value);
  }, []);

  // useEffect(() => {
  //   console.log(`selectedBgPath`, selectedBgPath);
  // }, [selectedBgPath]);

  useEffect(() => {
    if (!canvasEl.current) {
      toast.error("Canvas not found!");
      return;
    }

    const canvas = new fabric.Canvas(canvasEl.current);
    fabricCanvasRef.current = canvas;

    // Add a background image
    fabric.Image.fromURL(pageState.selectedBgPath, function (img) {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    // Add another image
    fabric.Image.fromURL("/2.png", function (img) {
      img.left = canvas.width - img.width;
      img.top = canvas.height - img.height;
      canvas.add(img);
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
  }, [pageState.selectedBgPath, selectedContentThumbnail, canvasEl]);

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
    console.log(`searchImgKeyword`, pageState.searchImgKeyword);
    try {
      const res = await fetch(
        `https://serpapi.com/search.json?q=${pageState.searchImgKeyword}&engine=google_images&ijn=0&api_key=1af5ce540feb70a718d1bc3038d05229fc3439667054d2e9ed4c272256468f2d`
      );

      const json = await res.json();

      if (json) {
        //   setGeneratedTitles(json.Titles);
        console.log(`json`, json);
      } else {
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handleSearchImg:", error);
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
                  src={`/bg-inv/bg-${i}.jpg`}
                  alt="bg-inv"
                  className="w-[70%] hover:opacity-80 cursor-pointer"
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

            <div className="flex gap-[--20px] overflow-scroll p-[--5px]">
              {/* {Array.from({ length: 10 }, (_, i) => (
                <img
                  src={`/bg-inv/bg-${i}.jpg`}
                  alt="bg-inv"
                  className="w-[70%] hover:opacity-80 cursor-pointer"
                  onClick={() => setSelectedBgPath(`/bg-inv/bg-${i}.jpg`)}
                />
              ))} */}
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
