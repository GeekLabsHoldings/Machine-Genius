"use client";
import React, { useState, useEffect, useContext } from "react";
import CustomBtn from "@/app/_components/Button/CustomBtn";
import styles from "./uploadMovie.module.css";
import { useRouter } from "next/navigation";
import LogoAndTitle from "@/app/_components/LogoAndTitle/LogoAndTitle";
import { useDispatch } from "react-redux";
import { contentCreatorActions } from "@/app/_redux/contentCreator/contentCreatorSlice";
import toast from "react-hot-toast";
import { contentCreatorContext } from "@/app/_context/contentCreatorContext";

const MovieMyth = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setEditContentData,presignedURLData, setPresignedURLData } = useContext(contentCreatorContext);

  const [pageState, setPageState] = useState<{
    triggerUploadVideo: boolean;
    triggerTranscriptAudio: boolean;
    file: File | null;
  }>({
    triggerUploadVideo: false,
    triggerTranscriptAudio: false,
    file: null,
  });

  // reset all the data
  useEffect(() => {
    dispatch(contentCreatorActions.setVideoTranscription(null));
    setEditContentData(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("videoTranscription");
      sessionStorage.removeItem("editContentData");
    }
  }, []);











// ===== 01. get Presigned URL =====
  async function getPresignedURL() {

    try {
      const res = await fetch(
        `https://api.machinegenius.io/content-creation/get-presignedURL`
      );
      const json = await res.json();
      if (!json) {
        toast.error("Something went wrong! Contact backend department");
        return;
      } else {
        setPresignedURLData(json);
        setPageState(prev => ({...prev, triggerUploadVideo: true}))
      }
    } catch (error) {
      toast.error("Something went wrong! Contact backend department");
      console.error("Error getPresignedURL:", error);
    }

   



  }


  // ===== 02. upload video =====
  // async function uploadVideo() {
  //   setIsLoading(true);
  //   setError(null);
  //   setUploadPercentage(0);
  //   try {
  //     const formData = new FormData();
  //     if (pageState.file) {
  //       formData.append("file", pageState.file);
  //     }
  //     // const videoElement = document.createElement("video");
  //     // videoElement.src = URL.createObjectURL(file);
  //     // await new Promise((resolve) => {
  //     //   videoElement.onloadedmetadata = () => {
  //     //     resolve(videoElement.duration);
  //     //   };
  //     // });
  //     // const duration = videoElement.duration;
  //     // formData.append("duration", duration.toString());

  //     // console.log("duration", duration.toString());

  //     const xhr = new XMLHttpRequest();
  //     xhr.open(
  //       "PUT",
  //       presignedURLData.preSignedURL,
  //       true
  //     );

  //     xhr.upload.onprogress = (event) => {
  //       if (event.lengthComputable) {
  //         const percentComplete = (event.loaded / event.total) * 100;
  //         setUploadPercentage(percentComplete);
  //       }
  //     };

  //     xhr.onload = () => {
  //       if (xhr.status >= 200 && xhr.status < 300) {
  //         const response = JSON.parse(xhr.responseText);
  //         setPageState(prev => ({...prev, triggerTranscriptAudio: true}))
  //         // 
  //       } else {
  //         toast.error(`Upload failed with status: ${xhr.status}`);
  //         setError(`Upload failed with status: ${xhr.status}`);
  //         setIsLoading(false);
  //       }
  //     };

  //     xhr.onerror = () => {
  //       toast.error("Something went wrong! Contact backend department");
  //       setError("Upload failed due to an error.");
  //       setIsLoading(false);
  //     };

  //     xhr.send(formData);
  //   } catch (error: any) {
  //     toast.error("Something went wrong! Contact backend department");
  //     setError(error?.message);
  //     console.error("Error in uploadVideo:", error);
  //     setIsLoading(false);
  //   }
  // }


  async function uploadVideo() {
    setIsLoading(true);
    setError(null);
    // setUploadPercentage(0);
    try {
      const formData = new FormData();
      if (pageState.file) {
        formData.append("file", pageState.file);
      }
  
      // If you need to get video duration, uncomment and adapt the following lines:
      // const videoElement = document.createElement("video");
      // videoElement.src = URL.createObjectURL(file);
      // await new Promise((resolve) => {
      //   videoElement.onloadedmetadata = () => {
      //     resolve(videoElement.duration);
      //   };
      // });
      // const duration = videoElement.duration;
      // formData.append("duration", duration.toString());
  
      const response = await fetch(presignedURLData.preSignedURL, {
        method: "PUT",
        body: formData,
        // headers: {
        //   // Include any headers needed here (if any).
        // },
      });
  
      if (response.ok) {
        // const data = await response.json(); // Only needed if the response has a body with JSON content
        setPageState(prev => ({...prev, triggerTranscriptAudio: true}));
      } else {
        toast.error(`Upload failed with status: ${response.status}`);
        setError(`Upload failed with status: ${response.status}`);
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error("Something went wrong! Contact backend department");
      setError(error?.message);
      console.error("Error in uploadVideo:", error);
      setIsLoading(false);
    }
  }
  


// ===== 03. transcript-audio =====
async function transcriptAudio() {
  try {
    const res = await fetch(`https://api.machinegenius.io/content-creation/transcript-audio`, {
      method: "POST",
      body: JSON.stringify({
"s3BucketURL" : presignedURLData.s3BucketURL
      }),
    });

    const json = await res.json();

    if (json && json?.transcriptionResults) {
          dispatch(contentCreatorActions.setVideoTranscription(json));
          router.replace("/content-creator/create/movie-myth/create-movie");
    }else {
      toast.error("Something went wrong! Error transcriptAudio");
    }
  } catch (error) {
    toast.error("Something went wrong! Error transcriptAudio");
    console.error("Error transcriptAudio:", error);
  }
}













// ===== 00. handleFileChange =====
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0){
      toast.error("Please select a file");
      return;
    }
    setPageState(prev => ({...prev, file: files[0]}))
    await getPresignedURL();
    
  };


  
      useEffect(() => {
        if (pageState.triggerUploadVideo) {
          uploadVideo(); 
        }
        if (pageState.triggerTranscriptAudio) {
          transcriptAudio(); 
        }
      }, [pageState.triggerUploadVideo, pageState.triggerTranscriptAudio]);

  // await uploadVideo(files[0]); 
  // await transcriptAudio();



































  return (
    <div className="flex flex-col h-full">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center w-[40vw] min-w-[24rem] mx-auto h-[75vh] py-[1.5vw]">
          <LogoAndTitle
            needTxt={true}
            textNeeded="Hold on tight."
            title="Genius is uploading your video..."
          />
          <div className="mt-4">
            Upload Progress: {uploadPercentage.toFixed(2)}%
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center w-[40vw] min-w-[30rem] mx-auto h-[75vh] py-[1.5vw]">
            <label className={styles.select_label}>Upload Movie</label>
            <div className={"w-full flex " + styles.uploud_movie}>
              <input type="file" accept="video/*" onChange={handleFileChange} />
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        </>
      )}
      <div className="flex justify-start items-center">
        <CustomBtn
          word="Back"
          btnColor="white"
          href="/content-creator/create/choose-brand"
        />
      </div>
    </div>
  );
};

export default MovieMyth;
