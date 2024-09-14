"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
  memo,
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
import ImageCard from "./ImageCard";
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks";

const LoadingOverlay = memo(({ title }) => (
  <div className="fixed top-0 left-0 w-full h-full z-[999999999] bg-white flex flex-col gap-8 justify-center items-center min-w-[24rem] mx-auto py-[1.5vw]">
    <LogoAndTitle needTxt={false} title={title} />
  </div>
));

export default function ThumbnailCanvas() {
  const canvasEl = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [canvasState, setCanvasState] = useState(null);
  const { authState, handleSignOut } = useContext(globalContext);
  const {
    selectedContentType,
    selectedBrand,
    selectedContentTitle,
    generatedThumbnails,
    generateThumbnails,
    selectedContentThumbnail,
    setSelectedContentThumbnail,
    editContentData,
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
    handleGenerateThumbnails();
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

  function pageStateSearchBgDataInit() {
    if (typeof window !== "undefined") {
      const searchBgDataValue = sessionStorage.getItem(
        "ThumbnailCanvasPageState"
      );
      return searchBgDataValue
        ? JSON.parse(searchBgDataValue).searchBgData
        : [];
    } else {
      return [];
    }
  }

  function pageStateInit() {
    return {
      generateThumbnailsLoading: false,
      thumbnailFontSize: selectedBrand.includes("Street Politics")
        ? 105.66
        : 90,
      selectedBgPath: selectedBrand.includes("Street Politics")
        ? "/generated-thumbnails/sp/bg/bg-0.jpg"
        : "/generated-thumbnails/inv/bg/bg-0.jpg",
      selectedIconPath: "/generated-thumbnails/sp/icons/illustration-0.png",
      searchImgKeyword: "",
      searchBgKeyword: "",
      searchImgLoading: false,
      searchBgLoading: false,
      searchImgData: pageStateSearchImgDataInit(),
      searchBgData: pageStateSearchBgDataInit(),
      removeBgLoading: false,
      isSendLoading: false,
      triggerSendContent: false,
      triggerSearchImg: false,
      highlightedWords: [],
      showRecentBg: true,
      showRecentImg: true,
    };
  }

  const [pageState, setPageState] = useState(pageStateInit);

  useEffect(() => {
    sessionStorage.setItem(
      "ThumbnailCanvasPageState",
      JSON.stringify(pageState)
    );
  }, [pageState.searchImgData, pageState.searchBgData]);

  const getSelectedContentThumbnailValue = useCallback((value) => {
    setSelectedContentThumbnail(value);
  }, []);

  const loadingStates = useMemo(
    () => [
      { key: "generateThumbnailsLoading", title: "Generating Thumbnails..." },
      { key: "isSendLoading", title: "Sending Content..." },
      { key: "searchImgLoading", title: "searching for images..." },
      { key: "searchBgLoading", title: "searching for backgrounds..." },
      { key: "removeBgLoading", title: "removing image background..." },
    ],
    []
  );

  const handleTriggerSearchImg = useCallback(() => {
    setPageState((prev) => ({
      ...prev,
      searchImgKeyword: prev.searchImgKeyword.replace(/[^a-zA-Z0-9\s]/g, ""),
      triggerSearchImg: true,
    }));
  }, []);

  useEffect(() => {
    if (pageState.triggerSearchImg && pageState.searchImgKeyword) {
      handleSearchImg();
    }
  }, [pageState.triggerSearchImg, pageState.searchImgKeyword]);

  const getThumbnailFontSizeValue = useCallback((value) => {
    setPageState((prev) => ({
      ...prev,
      thumbnailFontSize: Number(value),
    }));
  }, []);

  const getHighlightedWordsValue = useCallback((value) => {
    setPageState((prev) => ({
      ...prev,
      highlightedWords: value,
    }));
  }, []);

  // useEffect(() => {
  //   console.log("pageState.highlightedWords", pageState.highlightedWords);
  // }, [pageState.highlightedWords]);

  // ============= Start Canvas =================
  // ==============================================================
  const blockedUrls = JSON.parse(localStorage.getItem("blockedUrls")) || [];
  const isBlocked = (url) => blockedUrls.includes(url);

  const addToBlockedUrls = (url) => {
    if (!blockedUrls.includes(url)) {
      blockedUrls.push(url);
      setPageState((prev) => ({
        ...prev,
        // searchImgData: prev.searchImgData.filter((img) => img !== url),
        searchBgData: prev.searchBgData.filter((img) => img !== url),
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
          // toast.error(
          //   `Failed to load image from ${url}. Please select another image.`
          // );

          toast(`Image is corrupt. Please select another image!`);
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

  useEffect(() => {
    if (!canvasEl.current) {
      toast.error("Canvas not found!");
      return;
    }

    const canvas = new fabric.Canvas(canvasEl.current);
    fabricCanvasRef.current = canvas;

    canvas.renderAll();
    setCanvasState(canvas);

    // Cleanup
    return () => {
      canvas.dispose();
      setCanvasState(null);
      fabricCanvasRef.current = null;
    };
  }, []);

  function loadBackgroundImage() {
    const objects = canvasState.getObjects();
    console.log("objects", objects);
    // ===== Load background image =====
    if (!isBlocked(pageState.selectedBgPath)) {
      loadImage(pageState.selectedBgPath, (img) => {
        // Set the image to fit the canvas dimensions
        img.set({
          scaleX: 1280 / img.width,
          scaleY: 720 / img.height,
          left: 0, // Position the image at the left edge
          top: 0, // Position the image at the top edge
          isBackground: true,
        });

        canvasState.setBackgroundImage(
          img,
          canvasState.renderAll.bind(canvasState)
        );
      });
    }
  }

  useEffect(() => {
    if (canvasState) {
      loadBackgroundImage();
    }
  }, [canvasState, pageState.selectedBgPath]);

  function loadOverlayImage() {
    const objects = canvasState.getObjects();
    console.log("objects", objects);
    // ===== Add overlay image =====
    if (selectedBrand.includes("Street Politics")) {
      fabric.Image.fromURL(
        "/generated-thumbnails/sp/blackOverlay.png",
        function (img, error) {
          if (error) {
            // toast.error("Failed to load overlay image.");
            return;
          }

          img.set({
            crossOrigin: "anonymous", // Set crossOrigin attribute
            left: -2,
            top: -2,
            selectable: false, // Make the image non-selectable (non-movable, non-resizable)
            evented: false, // Disable interaction events (prevents drag, resize)
            lockMovementX: true, // Prevent horizontal movement
            lockMovementY: true, // Prevent vertical movement
            lockScalingX: true, // Prevent horizontal scaling
            lockScalingY: true, // Prevent vertical scaling
            lockRotation: true, // Prevent rotation
          });

          canvasState.add(img);
          // Send the image to the back
          img.sendToBack();
        },
        { crossOrigin: "anonymous" }
      );
    }
  }

  useEffect(() => {
    if (canvasState && selectedBrand.includes("Street Politics")) {
      loadOverlayImage();
    }
  }, [canvasState, selectedBrand]);

  function loadIconImages() {
    // Remove existing icons before adding a new one
    const objects = canvasState.getObjects();
    console.log("objects", objects);
    objects.forEach((obj) => {
      if (obj.isIcon) {
        canvasState.remove(obj);
      }
    });

    // ===== Add icon image =====
    if (selectedBrand.includes("Street Politics")) {
      fabric.Image.fromURL(
        pageState.selectedIconPath,
        function (img, error) {
          if (error) {
            // toast.error("Failed to load icon image.");
            return;
          }
          img.scaleToWidth(185); // Optional: scale the image if needed
          img.set({
            crossOrigin: "anonymous", // Set crossOrigin attribute
            left: 75,
            top: 75,
            isIcon: true, // Mark this object as an icon
          });

          canvasState.add(img);
        },
        { crossOrigin: "anonymous" }
      );
    }
  }

  useEffect(() => {
    if (canvasState) {
      loadIconImages();
    }
  }, [canvasState, pageState.selectedIconPath]);

  function loadText() {
    // Remove existing text before adding a new one
    const objects = canvasState.getObjects();
    console.log("objects", objects);
    objects.forEach((obj) => {
      if (obj.isText || obj.isTextGroup) {
        canvasState.remove(obj);
      }
    });

    // ===== Add text =====
    if (selectedBrand.includes("Street Politics")) {
      // Set the starting position (bottom-left corner)
      let left = 19.4;
      let top = canvasState.height - (pageState.thumbnailFontSize + 11.8); // Start near the bottom of the canvas

      // Add each word as a separate text object
      for (let i = words.length - 1; i >= 0; i--) {
        const text = new fabric.Text(words[i].toUpperCase(), {
          left: left,
          top: top,
          fontSize: pageState.thumbnailFontSize,
          fill: pageState.highlightedWords.includes(words[i])
            ? "#ff0000"
            : "#ffffff",
          fontFamily: "Hellix",
          // fontWeight: "600",
          stroke: "black", // Set the stroke color to black
          strokeWidth: 2.266, // Set the stroke width to 3px
          shadow: {
            color: "rgba(0, 0, 0, 0.5)", // Shadow color with opacity
            blur: 5, // Blur level of the shadow
            offsetX: 3, // Horizontal shadow offset
            offsetY: 3, // Vertical shadow offset
          },
          isText: true,
          selectable: false, // Make the image non-selectable (non-movable, non-resizable)
          lockMovementX: true, // Prevent horizontal movement
          lockMovementY: true, // Prevent vertical movement
          lockScalingX: true, // Prevent horizontal scaling
          lockScalingY: true, // Prevent vertical scaling
          lockRotation: true, // Prevent rotation
        });
        canvasState.add(text);
        text.bringToFront();
        canvasState.renderAll();
        // top -= text.height * 0.7; // Move the next word up by the height of the text
        top -= 83.3;
      }
    } else {
      // Calculate the total height of all text objects
      let totalHeight = 0;

      const textGroups = words.map((word) => {
        const text = new fabric.Text(word.toUpperCase().replace(/\+/g, " "), {
          fontSize: pageState.thumbnailFontSize,
          fill: pageState.highlightedWords.includes(word)
            ? "#C0FE15"
            : "#ffffff",
          fontFamily: "Acumin Pro Bold Italic",
          fontWeight: "800",
          fontStyle: "italic",
          isText: true,
          originX: "center",
          originY: "center",
          scaleY: 1.2,
        });

        // Create a background rectangle
        const padding = pageState.thumbnailFontSize / 3.5; // Adjust this value for more or less padding
        const rect = new fabric.Rect({
          fill: "#1E2329",
          width: text.width + padding * 2,
          height: text.height,
        });

        // Center the text within the rectangle
        text.set({
          left: rect.width / 2 - padding / 2,
          top: rect.height / 2,
        });

        // Group the rectangle and text
        const group = new fabric.Group([rect, text], {
          originX: "center",
          originY: "center",
          isTextGroup: true,
          scaleY: 1.2,
        });

        totalHeight += group.height * 1.05; // Include the spacing
        return group;
      });

      // Calculate the starting top position to center vertically
      let startTop = (canvasState.height - totalHeight) / 2;

      // Set the starting position
      let left = 79;
      let top = startTop;

      // Add each word group to the canvas
      for (const group of textGroups) {
        group.set({
          left: left + group.width / 2,
          top: top + group.height / 2,
          selectable: false, // Make the image non-selectable (non-movable, non-resizable)
          lockMovementX: true, // Prevent horizontal movement
          lockMovementY: true, // Prevent vertical movement
          lockScalingX: true, // Prevent horizontal scaling
          lockScalingY: true, // Prevent vertical scaling
          lockRotation: true, // Prevent rotation
        });
        canvasState.add(group);
        group.bringToFront();
        top += group.height * 1.05; // Move the next word down by the height of the group plus spacing
      }

      canvasState.renderAll();
    }
  }

  useEffect(() => {
    function bringAllTextToFront() {
      const objects = canvasState.getObjects();
      objects.forEach((obj) => {
        if (obj.isText || obj.isTextGroup) {
          obj.bringToFront();
        }
      });
    }

    if (canvasState) {
      // Add the listener after the canvas is rendered
      canvasState.on("after:render", bringAllTextToFront);

      // Initial text load
      // loadText();

      if (typeof window !== "undefined") {
        // Check if document.fonts is supported
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready
            .then(() => {
              loadText();
            })
            .catch((error) => {
              console.error("Font loading failed:", error);
              loadText();
            });
        } else {
          // Fallback for browsers that don't support document.fonts
          loadText();
        }
      }

      // Clean up the event listener on unmount
      return () => {
        canvasState.off("after:render", bringAllTextToFront);
      };
    }
  }, [
    canvasState,
    selectedContentThumbnail,
    pageState.thumbnailFontSize,
    pageState.highlightedWords,
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

  // ============= End Canvas =================

  // ============= Start Search Background & Search Image =================
  const uploadBackgroundRef = useRef(null);
  const uploadIconRef = useRef(null);
  const uploadImageRef = useRef(null);

  function handleSearchBgError() {
    // toast.error("Something went wrong!");
    toast("Please update search-images key!");
    setPageState((prev) => ({
      ...prev,
      searchBgLoading: false,
    }));
  }

  async function handleSearchBg() {
    if (!pageState.searchBgKeyword) {
      toast.error("Please provide a keyword to search for a background!");
      return;
    }
    try {
      const keyword = pageState.searchBgKeyword
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, "");
      setPageState((prev) => ({
        ...prev,
        searchBgLoading: true,
      }));
      const res = await fetch(
        `https://api.machinegenius.io/content-creation/get-images`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
          body: JSON.stringify({
            searchImgKeyword: keyword,
            api_key: process.env.NEXT_PUBLIC_SERPAPI_API_KEY,
          }),
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json = await res.json();
      if (!json) {
        handleSearchBgError();
        return;
      } else if (json && json.success === false) {
        handleSearchBgError();
        return;
      } else if (json && json.success === true && json.images) {
        setPageState((prev) => ({
          ...prev,
          searchBgData: json.images.map((img) => img.original),
          searchBgLoading: false,
        }));
      } else {
        handleSearchBgError();
        return;
      }
    } catch (error) {
      handleSearchBgError();
      console.error("Error generateThumbnails:", error);
    }
  }

  async function getProxiedImageUrl(originalUrl) {
    const encodedUrl = encodeURIComponent(originalUrl);
    const proxyUrl = `/api/proxy-image?url=${encodedUrl}`;

    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        // toast.error(
        //   "Error fetching proxied image. Please select another image."
        // );
        toast(`Image is corrupt. Please select another image!`);
        addToBlockedUrls(originalUrl);
        // throw new Error(`HTTP error! status: ${response.status}`);
        return null;
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      addToBlockedUrls(originalUrl);
      // toast.error("Error fetching proxied image. Please select another image.");
      toast(`Image is corrupt. Please select another image!`);
      console.error("Error fetching proxied image:", error);
      return null;
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
        // toast.error("Something went wrong!");
        toast("Please update remove-bg key!");
        console.error("Error handleRemoveBg:", res.status);
        return;
      }
      // Convert the response to a Blob
      const blob = await res.blob();
      // Create a URL for the Blob
      const imageUrl = URL.createObjectURL(blob);
      // Use the imageUrl in your application
      return imageUrl; // You can set this as the src of an img tag
    } catch (error) {
      // toast.error("Something went wrong!");
      toast("Please update remove-bg key!");
      console.error("Error handleRemoveBg:", error);
    } finally {
      setPageState((prev) => ({
        ...prev,
        removeBgLoading: false,
      }));
    }
  }

  async function handleSearchImg() {
    if (!pageState.searchImgKeyword) {
      toast.error("Please provide a keyword to search for an image!");
      return;
    }
    try {
      setPageState((prev) => ({
        ...prev,
        searchImgLoading: true,
        triggerSearchImg: false,
      }));
      const res = await fetch(
        `https://api.machinegenius.io/content-creation/get-images`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `barrer ${
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : authState.token
            }`,
          },
          body: JSON.stringify({
            searchImgKeyword: pageState.searchImgKeyword,
            api_key: process.env.NEXT_PUBLIC_SERPAPI_API_KEY,
          }),
        }
      );
      if (res.status === 401) {
        handleSignOut();
      }
      const json = await res.json();
      if (!json) {
        // toast.error("Something went wrong!");
        toast("Please update search-images key!");
        return;
      } else if (json && json.success === false) {
        // toast.error("Something went wrong!");
        toast("Please update search-images key!");
        return;
      } else if (json && json.success === true && json.images) {
        setPageState((prev) => ({
          ...prev,
          searchImgData: json.images.map((img) => img.original),
        }));
      } else {
        // toast.error("Something went wrong!");
        toast("Please update search-images key!");
        return;
      }
    } catch (error) {
      // toast.error("Something went wrong!");
      toast("Please update search-images key!");
      console.error("Error generateThumbnails:", error);
    } finally {
      setPageState((prev) => ({
        ...prev,
        searchImgLoading: false,
      }));
    }
  }

  function handleLoadImage(img) {
    loadImage(img, (fabricImg) => {
      fabricImg.scaleToWidth(500); // Optional: scale the image if needed

      // Position the new image
      const canvasWidth = canvasState.getWidth();
      const canvasHeight = canvasState.getHeight();

      fabricImg.set({
        left: canvasWidth - fabricImg.getScaledWidth() - 40,
        top: canvasHeight - fabricImg.getScaledHeight() - 40,
        isImage: true,
        imageId: uuidv4(),
      });

      canvasState.add(fabricImg);
      // canvasState.setActiveObject(fabricImg);
      canvasState.renderAll();
    });
  }

  async function handleSelectImg(img) {
    const removedBgImg = await handleRemoveBg(img, "select");
    // const proxiedImg = await getProxiedImageUrl(img);
    // const imgToAdd = removedBgImg || proxiedImg;
    const imgToAdd = removedBgImg;
    handleLoadImage(imgToAdd);
  }

  function handleUploadBackground(e) {
    // console.log(`e`, e);
    const file = e.target.files[0];
    // console.log(`file`, file);
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        // console.log(`event`, event);
        const dataUrl = event.target.result; // Data URL of the uploaded image
        setPageState((prev) => ({
          ...prev,
          selectedBgPath: dataUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  function handleUploadIcon(e) {
    // console.log(`e`, e);
    const file = e.target.files[0];
    // console.log(`file`, file);
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        // console.log(`event`, event);
        const dataUrl = event.target.result; // Data URL of the uploaded image
        setPageState((prev) => ({
          ...prev,
          selectedIconPath: dataUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  function handleUploadImage(e) {
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

        handleLoadImage(removedBgImgUrl);
      };

      reader.readAsDataURL(file);
    }
  }

  // ============= End Search Background & Search Image =================

  // ============= Start Layer Controls ==================

  const [layerList, setLayerList] = useState([]);

  useEffect(() => {
    if (canvasState) {
      // Update layer controls when objects change
      const handleCanvasChange = () => {
        setLayerList([...canvasState.getObjects()]); // Update layer list
      };

      canvasState.on("object:added", handleCanvasChange);
      canvasState.on("object:removed", handleCanvasChange);

      // Clean up listeners on unmount
      return () => {
        canvasState.off("object:added", handleCanvasChange);
        canvasState.off("object:removed", handleCanvasChange);
      };
    }
  }, [canvasState]);

  const [selectedLayer, setSelectedLayer] = useState(null);

  // useEffect(() => {
  //   console.log(`selectedLayer`, selectedLayer);
  // }, [selectedLayer]);

  useEffect(() => {
    if (canvasState) {
      // Handler for object selection
      const handleObjectSelected = (event) => {
        const selectedObject = event.target; // Get the selected object
        if (selectedObject) {
          // const objects = canvasState.getObjects();
          // const index = objects.indexOf(selectedObject); // Get the index of the selected object
          setSelectedLayer(selectedObject); // Update the selected layer index
        }
      };

      // Add event listeners for object selection
      canvasState.on("selection:created", handleObjectSelected);
      canvasState.on("selection:updated", handleObjectSelected);

      // Clear selection when objects are deselected
      canvasState.on("selection:cleared", () => {
        setSelectedLayer(null); // Reset selected layer index when selection is cleared
      });

      // Cleanup event listeners on component unmount
      return () => {
        canvasState.off("selection:created", handleObjectSelected);
        canvasState.off("selection:updated", handleObjectSelected);
        canvasState.off("selection:cleared", () => setSelectedLayer(null));
      };
    }
  }, [canvasState]);

  function handleDiscardActiveObject() {
    if (selectedLayer) {
      setSelectedLayer(null);
      canvasState.discardActiveObject();
      canvasState.renderAll();
    } else {
      toast("Please select a layer!");
    }
  }

  function moveLayerUp() {
    // const object = canvasState.getObjects()[index];
    if (selectedLayer) {
      canvasState.bringForward(selectedLayer); // Move the object one level up
      handleDiscardActiveObject();
      // canvasState.renderAll();
    } else {
      toast("Please select a layer!");
    }
  }

  function moveLayerDown() {
    // const object = canvasState.getObjects()[index];
    if (selectedLayer) {
      canvasState.sendBackwards(selectedLayer); // Move the object one level down
      handleDiscardActiveObject();
      // canvasState.renderAll();
    } else {
      toast("Please select a layer!");
    }
  }

  function deleteLayer() {
    // const object = canvasState.getObjects()[index];
    if (selectedLayer) {
      canvasState.remove(selectedLayer); // Remove the object from the canvas
      handleDiscardActiveObject();
      // canvasState.renderAll();
    } else {
      toast("Please select a layer!");
    }
  }

  function flipLayer() {
    if (selectedLayer) {
      // Flip the selected layer vertically
      selectedLayer.flipX = !selectedLayer.flipX; // Toggles flip state
      handleDiscardActiveObject();
      // canvasState.renderAll(); // Re-render the canvas
    } else {
      toast("Please select a layer!");
    }
  }

  const handleLayerClick = (obj) => {
    const objImageId = obj.imageId;
    function findObjectIndex(objImageId) {
      return canvasState
        .getObjects()
        .findIndex((obj) => obj.imageId === objImageId);
    }
    const objIndex = findObjectIndex(objImageId);

    console.log(objIndex, `objIndex`);

    setSelectedLayer(obj); // Update the selected layer index state

    canvasState.setActiveObject(obj); // Set the clicked layer as the active object on the canvas
    canvasState.renderAll(); // Re-render the canvas

    console.log(`obj---1`, obj);
  };

  useEffect(() => {
    function handleKeyDown(event) {
      if (!canvasState || !selectedLayer) return;
      // Check if the active element is an input or textarea
      if (
        ["input", "textarea"].includes(
          document.activeElement?.tagName.toLowerCase() || ""
        )
      ) {
        return; // Don't trigger shortcuts when typing in form fields
      }

      const MOVE_DISTANCE = 1; // pixels to move

      switch (event.key) {
        case "Escape":
          handleDiscardActiveObject();
          break;
        case "Delete":
          deleteLayer();
          break;

        case "ArrowLeft":
          selectedLayer.set("left", selectedLayer.left - MOVE_DISTANCE);
          break;
        case "ArrowRight":
          selectedLayer.set("left", selectedLayer.left + MOVE_DISTANCE);
          break;
        case "ArrowUp":
          selectedLayer.set("top", selectedLayer.top - MOVE_DISTANCE);
          break;
        case "ArrowDown":
          selectedLayer.set("top", selectedLayer.top + MOVE_DISTANCE);
          break;

        // Add more shortcuts here as needed
        default:
          break;
      }
    }

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedLayer]); // Dependencies array

  useEffect(() => {
    const handleObjectSelection = () => {
      const activeObject = canvasState.getActiveObject();
      if (activeObject) {
        const index = canvasState.getObjects().indexOf(activeObject); // Get the index of the selected object
        setSelectedLayer(activeObject); // Highlight the corresponding layer in the list
      }
    };

    if (canvasState) {
      // Listen to selection events on the canvas
      canvasState.on("selection:created", handleObjectSelection);
      canvasState.on("selection:updated", handleObjectSelection);
    }

    return () => {
      if (canvasState) {
        // Clean up event listeners
        canvasState.off("selection:created", handleObjectSelection);
        canvasState.off("selection:updated", handleObjectSelection);
      }
    };
  }, [canvasState]);

  // ============= End Layer Controls ==================

  // ============= Start Send Content =================
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
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    return today;
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
        if (res.status === 401) {
          handleSignOut();
        }
        json = await res.json();
        if (json) {
          break;
        } else {
          setPageState((prev) => ({
            ...prev,
            isSendLoading: false,
            triggerSendContent: false,
          }));
          toast.error("Something went wrong!");
          return;
        }
      } catch (error) {
        toast.error("Something went wrong!");
        setPageState((prev) => ({
          ...prev,
          isSendLoading: false,
          triggerSendContent: false,
        }));
        console.error("Error handleSendContent:", error);
      } finally {
        attempts++;
      }
    }

    if (json.message === "Content already exists") {
      toast.error("Content already exists");
      setPageState((prev) => ({
        ...prev,
        isSendLoading: false,
        triggerSendContent: false,
      }));
    } else if (
      (method === "POST" && json.message === "successfully") ||
      (method === "PATCH" && json.user_name)
    ) {
      toast.success("Content sent successfully");
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
  // ============= End Send Content ==================

  // =========== Start Assets ===============
  const searchIcon = (
    <svg
      className="w-[--24px] h-[--24px] text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>
  );

  const buttonClass = `
  px-3 py-2 rounded
  ${
    selectedLayer
      ? "bg-[#2a2b2a] text-white hover:bg-blue-600 cursor-pointer"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }
  transition-colors duration-200 ease-in-out
`;
  // =========== End Assets ===============

  return (
    <main className="relative">
      {loadingStates.map(
        ({ key, title }) =>
          pageState[key] && <LoadingOverlay key={key} title={title} />
      )}

      <nav className="my-[--sy-5px] w-4/5 max-w-3xl mx-auto">
        <div className="flex justify-between items-center w-full bg-gray-100 border border-gray-300 rounded-lg p-2">
          <button
            className={buttonClass}
            onClick={flipLayer}
            disabled={!selectedLayer}
          >
            Flip
          </button>
          <button
            className={buttonClass}
            onClick={moveLayerUp}
            disabled={!selectedLayer}
          >
            Forwards
          </button>
          <button
            className={buttonClass}
            onClick={moveLayerDown}
            disabled={!selectedLayer}
          >
            Backwards
          </button>

          <button
            className={buttonClass}
            onClick={handleDiscardActiveObject}
            disabled={!selectedLayer}
          >
            Deselect
          </button>

          <button
            className={` ${
              selectedLayer
                ? "bg-red-500 active:bg-red-700 hover:bg-red-600"
                : ""
            } ${buttonClass}`}
            onClick={deleteLayer}
            disabled={!selectedLayer}
          >
            Delete
          </button>
        </div>
      </nav>

      <section
        className={`${
          (pageState.generateThumbnailsLoading ||
            pageState.isSendLoading ||
            pageState.searchImgLoading ||
            pageState.searchBgLoading ||
            pageState.removeBgLoading) &&
          "!hidden"
        }`}
      >
        <div className="thumbnailCanvas">
          <div className="border-[--1px] border-[--gray-300] rounded-[--20px] overflow-hidden">
            <div className="thumbnailCanvas_actionsBar max-h-[720px] p-[--10px] overflow-y-auto overflow-x-hidden">
              {/* 01 Select Thumbnail */}
              <div className="flex flex-col gap-[--10px] w-full">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[--17px]">Select Thumbnail</h3>

                  {selectedBrand === "Investorcracy" && (
                    <div className="w-[45%]" title="Font Size">
                      <CustomSelectInput
                        paddingVal={"py-[0.2vw] pl-[0.3vw] pr-0"}
                        label={"Font Size"}
                        options={Array.from({ length: 41 }, (_, i) => i + 80)}
                        getValue={getThumbnailFontSizeValue}
                      />
                    </div>
                  )}
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

                <div className="flex flex-col gap-[--5px]">
                  <input
                    className="flex-1 border-[--1px] border-[--gray-300] rounded-[--5px] p-[--5px]"
                    type="text"
                    name="thumbnail-title"
                    id="thumbnail-title"
                    placeholder="Edit thumbnail title ..."
                    value={selectedContentThumbnail}
                    onChange={(e) =>
                      setSelectedContentThumbnail(e.target.value)
                    }
                    title="Edit thumbnail title ..."
                  />

                  {selectedBrand === "Investorcracy" && (
                    <div className="flex flex-col gap-[--5px]">
                      <span className="text-sm text-gray-500">
                        Note: enter + to group words in one line
                      </span>
                      <span className="text-sm text-gray-500">
                        Note: enter space to break line
                      </span>
                    </div>
                  )}
                </div>

                <MultipleSelectCheckmarks
                  words={words}
                  getHighlightedWordsValue={getHighlightedWordsValue}
                />
              </div>

              <hr className="border-[--1px] border-[--gray-300] overflow-hidden w-[calc(100%+20px)] my-[--sy-15px]" />

              {/* 02 Select Background */}
              <div className="flex flex-col gap-[--5px] w-full">
                {/* 02-01 Select Background */}

                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[--17px]">Select Background</h3>

                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        checked={pageState.showRecentBg}
                        className="checkbox checkbox-sm"
                        onChange={(e) => {
                          setPageState((prev) => ({
                            ...prev,
                            showRecentBg: e.target.checked,
                          }));
                        }}
                      />
                      <span className="label-text ml-[--5px]">Show Recent</span>
                    </label>
                  </div>
                </div>

                {/* 02-02 Search Background */}
                <div className="flex gap-[--10px]">
                  <input
                    className="flex-1 border-[--1px] border-[--gray-300] rounded-[--5px] p-[--5px]"
                    type="text"
                    name="bg-search"
                    id="bg-search"
                    placeholder="Search for a background ..."
                    value={pageState.searchBgKeyword}
                    onChange={(e) =>
                      setPageState((prev) => ({
                        ...prev,
                        searchBgKeyword: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={() => {
                      console.log(`searchBgKeyword`, pageState.searchBgKeyword);
                      if (pageState.searchBgKeyword.trim() === "") {
                        toast.error(
                          "Please enter a keyword to search for a background."
                        );
                      } else {
                        handleSearchBg();
                      }
                    }}
                    title="Search Background"
                  >
                    {searchIcon}
                  </button>
                </div>

                {/* 02-03 Preview Backgrounds */}
                <div className="flex gap-[--50px-1] overflow-x-auto custom-scrollbar pb-[--sy-7px] pr-[--5px]">
                  <div className="!w-1/2">
                    <div
                      className="w-[--194px] h-[--102px] rounded-[--10px] border-[--1px] border-[--dark] overflow-hidden relative flex flex-col justify-center items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                      onClick={() => uploadBackgroundRef.current.click()}
                    >
                      <span className="text-lg font-medium text-gray-600">
                        Upload
                      </span>
                      <span className="text-2xl text-gray-400">+</span>
                    </div>
                    <input
                      type="file"
                      ref={uploadBackgroundRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleUploadBackground}
                    />
                  </div>

                  {selectedBrand === "Investorcracy" &&
                    Array.from({ length: 10 }, (_, i) => (
                      <div className="!w-1/2" key={uuidv4()}>
                        <ImageCard
                          inputType="radio"
                          inputName="select-bg"
                          imgSrc={`/generated-thumbnails/inv/bg/bg-${i}.jpg`}
                          checked={
                            pageState.selectedBgPath ===
                            `/generated-thumbnails/inv/bg/bg-${i}.jpg`
                          }
                          onChange={(e) => {
                            // console.log(`e.target.value`, e.target.value);
                            setPageState((prev) => ({
                              ...prev,
                              selectedBgPath: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    ))}

                  {selectedBrand.includes("Street Politics") && (
                    <div className="!w-1/2">
                      <ImageCard
                        inputType="radio"
                        inputName="select-bg"
                        imgSrc={`/generated-thumbnails/sp/bg/bg-0.jpg`}
                        checked={
                          pageState.selectedBgPath ===
                          `/generated-thumbnails/sp/bg/bg-0.jpg`
                        }
                        onChange={(e) => {
                          // console.log(`e.target.value`, e.target.value);
                          setPageState((prev) => ({
                            ...prev,
                            selectedBgPath: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  )}

                  {Array.isArray(pageState.searchBgData) &&
                    pageState.searchBgData.length > 0 &&
                    pageState.searchBgData.map((img) => (
                      <div className="!w-1/2" key={uuidv4()}>
                        <ImageCard
                          imgSrc={img}
                          inputType="radio"
                          inputName={"select-bg"}
                          checked={pageState.selectedBgPath === img}
                          onChange={async (e) => {
                            const url = await getProxiedImageUrl(
                              e.target.value
                            );

                            // console.log(`e.target.value`, e.target.value);
                            setPageState((prev) => ({
                              ...prev,
                              selectedBgPath: url,
                            }));
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>

              <hr className="border-[--1px] border-[--gray-300] overflow-hidden w-[calc(100%+20px)] my-[--sy-15px]" />

              {/* 03 Select Icon */}
              {selectedBrand.includes("Street Politics") && (
                <div className="flex flex-col gap-[--5px] w-full">
                  <h3 className="font-bold text-[--17px]">Select Icon</h3>

                  <div className="flex gap-[--50px-1] overflow-x-auto custom-scrollbar pb-[--sy-7px] pr-[--5px]">
                    <div className="!w-1/2">
                      <div
                        className="w-[--194px] h-[--102px] rounded-[--10px] border-[--1px] border-[--dark] overflow-hidden relative flex flex-col justify-center items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                        onClick={() => uploadIconRef.current.click()}
                      >
                        <span className="text-lg font-medium text-gray-600">
                          Upload
                        </span>
                        <span className="text-2xl text-gray-400">+</span>
                      </div>
                      <input
                        type="file"
                        ref={uploadIconRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleUploadIcon}
                      />
                    </div>

                    {Array.from({ length: 39 }, (_, i) => (
                      <div className="!w-1/2" key={uuidv4()}>
                        <ImageCard
                          inputType="radio"
                          inputName="select-icon"
                          imgSrc={`/generated-thumbnails/sp/icons/illustration-${i}.png`}
                          imgProps="!object-contain"
                          checked={
                            pageState.selectedIconPath ===
                            `/generated-thumbnails/sp/icons/illustration-${i}.png`
                          }
                          onChange={(e) => {
                            setPageState((prev) => ({
                              ...prev,
                              selectedIconPath: e.target.value,
                            }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedBrand.includes("Street Politics") && (
                <hr className="border-[--1px] border-[--gray-300] overflow-hidden w-[calc(100%+20px)] my-[--sy-15px]" />
              )}

              {/* 04 Select Image */}
              <div className="flex flex-col gap-[--5px] w-full">
                {/* 03-01 Select Image */}

                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[--17px]">Select Image</h3>
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        checked={pageState.showRecentImg}
                        onChange={(e) => {
                          setPageState((prev) => ({
                            ...prev,
                            showRecentImg: e.target.checked,
                          }));
                        }}
                        className="checkbox checkbox-sm"
                      />
                      <span className="label-text ml-[--5px]">Show Recent</span>
                    </label>
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
                    title="Search Image"
                    onClick={() => {
                      console.log(
                        `searchImgKeyword`,
                        pageState.searchImgKeyword
                      );
                      // handleSearchImg();
                      if (pageState.searchImgKeyword.trim() === "") {
                        toast.error(
                          "Please enter a keyword to search for an image."
                        );
                      } else {
                        handleTriggerSearchImg();
                      }
                    }}
                  >
                    {searchIcon}
                  </button>
                </div>

                {/* 03-03 Preview Images */}
                <div className="flex gap-[--15px] overflow-x-auto custom-scrollbar w-full py-[--sy-7px] pr-[--5px]">
                  <div>
                    <div
                      className="w-[--102px] h-full rounded-[--10px] border-[--1px] border-[--dark] overflow-hidden relative flex flex-col justify-center items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                      onClick={() => uploadImageRef.current.click()}
                    >
                      <span className="text-lg font-medium text-gray-600">
                        Upload
                      </span>
                      <span className="text-2xl text-gray-400">+</span>
                    </div>
                    <input
                      type="file"
                      ref={uploadImageRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleUploadImage}
                    />
                  </div>

                  {Array.isArray(pageState.searchImgData) &&
                    pageState.searchImgData.length > 0 &&
                    pageState.searchImgData.map((img) => (
                      <img
                        key={uuidv4()}
                        loading="lazy"
                        src={img}
                        alt="searchImg"
                        className="w-[60%] h-auto aspect-square object-cover hover:opacity-80 transition-none cursor-pointer"
                        onClick={() => handleSelectImg(img)}
                      />
                    ))}
                </div>
              </div>

              <hr className="border-[--1px] border-[--gray-300] overflow-hidden w-[calc(100%+20px)] my-[--sy-15px]" />

              {/* 05 Layers */}
              <div className="flex flex-col gap-[--5px] w-full">
                {/* 05-01 Header */}

                <h3 className="font-bold text-[--17px]">Layers</h3>

                {/* 05-02 Layers */}
                <div className="flex flex-col gap-[--5px] p-[--5px] rounded-[--15px] border border-[--gray-300]">
                  {Array.isArray(layerList) &&
                  layerList?.filter((obj) => obj.isImage).length ? (
                    layerList
                      ?.filter((obj) => obj.isImage)
                      .map((obj, index) => (
                        <div
                          key={index}
                          className={`flex justify-between items-center cursor-pointer rounded-[--15px] p-[--5px] ${
                            selectedLayer &&
                            obj.imageId === selectedLayer?.imageId
                              ? "bg-[#E5E6E6B3]"
                              : ""
                          }`} // Highlight selected layer
                          onClick={() => handleLayerClick(obj)} // Handle layer click
                        >
                          {/* <span className="flex justify-between items-center gap-[--20px]"> */}
                          {/* {`${index + 1}. ${obj.type} ${obj.text} ${obj.text}`} */}

                          <span>{`${index + 1}. ${obj.type} `}</span>

                          {obj.type === "text" ? (
                            // Display the text content
                            <span>{obj.text}</span>
                          ) : obj.type === "image" ? (
                            // Display the image
                            <img
                              src={obj.toDataURL() || obj.src}
                              alt={`Layer ${index + 1}`}
                              style={{ width: 50, height: 50 }} // Adjust size for preview
                              // crossOrigin={"anonymous"}
                            />
                          ) : null}

                          {/* </span> */}
                        </div>
                      ))
                  ) : (
                    <div className="flex justify-center items-center">
                      <p>No Layers Found</p>
                    </div>
                  )}
                </div>

                {/* 05-03 Layers Actions */}
              </div>
            </div>
          </div>

          <div className="canvas-container relative">
            <canvas id="c" width="1280" height="720" ref={canvasEl}></canvas>
          </div>
        </div>

        <div className="flex justify-between items-center mt-[--sy-5px]">
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
    </main>
  );
}
