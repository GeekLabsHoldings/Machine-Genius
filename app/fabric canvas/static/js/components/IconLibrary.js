import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { fabric } from "fabric";
import { Flex, Input, ScrollArea } from "blocksin-system";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const IconLibrary = ({
  updateImageObjectsOrder,
  setSelectedObject,
  canvasInstance,
  setIconHeight,
  setIconWidth,
}) => {
  const [icons, setIcons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const canvas = canvasInstance.current;

    // Handle object selection
    canvas.on("selection:created", (e) => {
      if (e.selected && e.selected.length > 0) {
        setSelectedObject(e.selected[0]);
        // console.log("Selection created:", e.selected[0]);
      }
    });

    canvas.on("selection:updated", (e) => {
      if (e.selected && e.selected.length > 0) {
        setSelectedObject(e.selected[0]);
        // console.log("Selection updated:", e.selected[0]);
      }
    });

    canvas.on("selection:cleared", () => {
      setSelectedObject(null);
      //   console.log("Selection cleared");
    });
    // eslint-disable-next-line
  }, [canvasInstance.current]);

  // eslint-disable-next-line
  const fetchIcons = useCallback(
    debounce((term) => {
      if (term === "") {
        setIcons([]);
      } else {
        axios
          .get(
            `https://sebikoicons.netlify.app/.netlify/functions/fetch-icons?query=${term}`
          )
          .then((response) => {
            if (Array.isArray(response.data)) {
              const filteredIcons = response.data.filter((icon) =>
                icon.description.toLowerCase().includes(term.toLowerCase())
              );
              setIcons(filteredIcons);
            } else {
              console.error("Unexpected response format:", response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching icons:", error);
          });
      }
    }, 300),
    []
  );

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchIcons(term);
  };

  const setNestedElementIds = (element, prefix) => {
    element.set("id", `${prefix}-${element.id || "element"}`);
    if (element.getObjects) {
      element.getObjects().forEach((child, index) => {
        setNestedElementIds(child, `${prefix}-${index}`);
      });
    }
  };

  const replaceBlackWithCustomColor = (svgContent, color) => {
    return svgContent.replace(/black/g, color);
  };

  const handleAddIcon = (iconContent) => {
    const modifiedIconContent = replaceBlackWithCustomColor(
      iconContent,
      "#000000"
    );

    const date = new Date().toISOString(); // Get the current date in ISO format
    const iconId = `icon-${date}`;

    fabric.loadSVGFromString(modifiedIconContent, (objects, options) => {
      const svgElement = fabric.util.groupSVGElements(objects, options);
      svgElement.set({
        selectable: true, // Ensure SVG is selectable
        label: "Icon", // Add custom label
        id: iconId, // Add custom ID
        scaleY: 2,
        scaleX: 2,
        top: 100,
        left: 100,
      });

      // Ensure the viewBox is set correctly
      svgElement.set({
        width: 20,
        height: 20,
        viewBox: {
          x: 0,
          y: 0,
          width: 20,
          height: 20,
        },
      });

      // Set IDs for nested elements
      setNestedElementIds(svgElement, iconId);

      canvasInstance.current.add(svgElement);
      canvasInstance.current.renderAll();
      updateImageObjectsOrder();

      setIconWidth(svgElement.width);
      setIconHeight(svgElement.height);
    });
  };

  return (
    <Flex
      direction="column"
      style={{
        padding: "var(--size-400) var(--size-300) 0",
        overflow: "hidden",
      }}
      gap={300}
    >
      <Input
        type="text"
        placeholder="Search for icons..."
        value={searchTerm}
        onChange={handleSearch}
        label="Search"
      />
      <ScrollArea
        style={{
          maxHeight: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Flex fluid wrap="wrap" gap={100} customClass="icon-results">
          {icons.map((icon, index) => (
            <button
              key={index}
              className="sebikoicons-button"
              onClick={() => handleAddIcon(icon.content)}
            >
              <div
                className="icon"
                dangerouslySetInnerHTML={{ __html: icon.content }}
                style={{ width: "40px", height: "40px" }}
              />
            </button>
          ))}
        </Flex>
      </ScrollArea>
    </Flex>
  );
};

export default IconLibrary;
