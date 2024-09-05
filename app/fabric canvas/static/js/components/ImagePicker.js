import React, { useState } from "react";
// import unsplash from "./Unsplash";
import { Input, Flex, ScrollArea, Paragraph, Loader } from "blocksin-system"; // Import your components
import { fabric } from "fabric";
import { PlusIcon } from "sebikostudio-icons";
import StockImages from "../assets/stockimages.png";

const UnsplashImagePicker = ({ canvas, updateImageObjectsOrder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const MAX_DIMENSION = 2880;
  const APP_NAME = "SebikostudioApp";

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   if (!searchTerm.trim()) {
  //     return; // Exit if search term is empty
  //   }
  //   setLoading(true);
  //   try {
  //     const result = await unsplash.search.getPhotos({
  //       query: searchTerm,
  //       perPage: 10,
  //     });
  //     setImages(result.response.results);
  //   } catch (error) {
  //     console.error("Error fetching images:", error);
  //     setImages([]); // Clear images on error
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const apiBaseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8888/api"
      : "/nf-functions";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      return; // Exit if search term is empty
    }
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/unsplash`, {
        method: "POST",
        body: JSON.stringify({ query: searchTerm }),
      });
      const result = await response.json();
      setImages(result.results);
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]); // Clear images on error
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = async (image) => {
    const url = `${image.urls.raw}&w=${MAX_DIMENSION}&h=${MAX_DIMENSION}&fit=max`;
    const photographer = image.user.name;

    // Trigger the download endpoint
    // await unsplash.photos.trackDownload({
    //   downloadLocation: image.links.download_location,
    // });
    // Trigger the download endpoint
    await fetch(image.links.download_location);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      // Adjust the texture size if necessary
      const imageTextureSize = Math.max(img.width, img.height);
      if (imageTextureSize > fabric.textureSize) {
        fabric.textureSize = imageTextureSize;
      }

      const fabricImg = new fabric.Image(img, {
        crossOrigin: "anonymous",
        objectCaching: true,
      });

      const canvasWidth = canvas.getWidth();
      const scaleFactor = (canvasWidth * 0.7) / fabricImg.width;
      const newImageId = `image-unsplash-${Date.now()}`;

      fabricImg.set({
        id: newImageId,
        name: photographer,
        scaleX: scaleFactor,
        scaleY: scaleFactor,
        label: `Image ${searchTerm}`,
      });

      if (canvas && typeof canvas.add === "function") {
        canvas.add(fabricImg);
        canvas.renderAll();
        updateImageObjectsOrder();
      } else {
        console.error("Canvas is not initialized or not a Fabric.js instance.");
      }
    };
  };

  return (
    <>
      <Flex direction="column" gap={400} customClass="UnsplashImages">
        <form onSubmit={handleSearch}>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Unsplash"
            label="Search"
          />
        </form>
        <ScrollArea
          style={{
            maxHeight: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {loading ? (
            <Loader />
          ) : (
            <Flex
              wrap="wrap"
              gap={400}
              style={{ paddingBottom: "var(--size-400)" }}
            >
              {images.map((image) => (
                <div key={image.id} className="UnsplashImage">
                  <div>
                    <PlusIcon className="AddImageIcon" />
                    <img
                      src={image.urls.small}
                      alt={image.alt_description}
                      onClick={() => handleImageClick(image)}
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                  <Paragraph>
                    Photo by{" "}
                    <a
                      href={`https://unsplash.com/@${image.user.username}?utm_source=${APP_NAME}&utm_medium=referral`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {image.user.name}
                    </a>{" "}
                    on{" "}
                    <a
                      href={`https://unsplash.com/?utm_source=${APP_NAME}&utm_medium=referral`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unsplash
                    </a>
                  </Paragraph>
                </div>
              ))}
            </Flex>
          )}
        </ScrollArea>
      </Flex>
      {images.length === 0 && <img src={StockImages} alt="Unsplash Images" />}
    </>
  );
};

export default UnsplashImagePicker;
