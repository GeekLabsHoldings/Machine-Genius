"use client";
// import dynamic from "next/dynamic";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { globalContext } from "@/app/_context/store";
import { fabric } from "fabric";
import "./thumbnailCanvas.css";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import CustomSelectInput from "@/app/_components/CustomSelectInput/CustomSelectInput";
import toast from "react-hot-toast";

export default function Page() {
  const {
    token,
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

  const [selectedBgPath, setSelectedBgPath] = useState("/bg-inv/bg-0.jpg");
  const [searchImgKeyword, setSearchImgKeyword] = useState("");

  const getSelectedContentThumbnailValue = useCallback((value) => {
    if (value !== selectedContentThumbnail) {
      setSelectedContentThumbnail(value);
    }
  }, []);

  useEffect(()=>{
    console.log(`selectedBgPath`, selectedBgPath)
  }, [selectedBgPath]);

  async function handleSearchImg(){
    console.log(`searchImgKeyword`, searchImgKeyword)
    try {
        const res = await fetch(
          `https://serpapi.com/search.json?q=${searchImgKeyword}&engine=google_images&ijn=0&api_key=1af5ce540feb70a718d1bc3038d05229fc3439667054d2e9ed4c272256468f2d`
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



  useEffect(() => {
    const canvas = new fabric.Canvas("c");

    // Add a background image
    fabric.Image.fromURL(selectedBgPath, function (img) {
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

    // Download the canvas content as an image
    document.getElementById("downloadBtn").addEventListener("click", () => {
      const dataURL = canvas.toDataURL({ format: "png" });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "thumbnail.png";
      link.click();
    });
  }, [selectedBgPath, selectedContentThumbnail]);

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
                <img src={`/bg-inv/bg-${i}.jpg`} alt="bg-inv" className="w-[70%] hover:opacity-80 cursor-pointer" onClick={() => setSelectedBgPath(`/bg-inv/bg-${i}.jpg`)} />
            ))}
            </div>
          </div>

          {/* 03 Select Image */}
          <div className="flex flex-col gap-[--10px] w-full">
          <h3>Select Image</h3>
          <div className="flex gap-[--10px]">
            <input className="flex-1 border-[--1px] border-[--gray-300] rounded-[--5px] p-[--5px]" type="text" 
            name="img-search" 
            id="img-search" 
            placeholder="Search for an image ..."
            value={searchImgKeyword}
            onChange={(e) => setSearchImgKeyword(e.target.value)}
            />
            <button
            onClick={() => {
              console.log(`searchImgKeyword`, searchImgKeyword)
              handleSearchImg();
            }}
            >Search</button>
          </div>
          

          <div className="flex gap-[--20px] overflow-scroll p-[--5px]">
            {Array.from({ length: 10 }, (_, i) => (
                <img src={`/bg-inv/bg-${i}.jpg`} alt="bg-inv" className="w-[70%] hover:opacity-80 cursor-pointer" onClick={() => setSelectedBgPath(`/bg-inv/bg-${i}.jpg`)} />
            ))}
            </div>


          </div>






          <button id="downloadBtn">Download Thumbnail</button>
        </div>














        <div class="canvas-container">
          <canvas id="c" width="1280" height="720"></canvas>
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
