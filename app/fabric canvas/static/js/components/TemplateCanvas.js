import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { createRoot } from "react-dom/client";

import { HexColorPicker } from "react-colorful";
import { saveAs } from "file-saver";
// import * as Accordion from "@radix-ui/react-accordion";
import { jsPDF } from "jspdf";
import ColorStylePicker from "./ColorStylePicker";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ImagePicker from "./ImagePicker";
import { MapInteractionCSS } from "react-map-interaction";
import IconLibrary from "./IconLibrary";
import PaletteManager from "./PaletteManager";
import GoogleSheetDataImg from "../assets/googlesheetdata.png";

import {
  UnsplashIcon,
  QRCodeIcon,
  VectorIcon,
  AlignCenterHorizontallyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignCenterVerticallyIcon,
  AlignTopIcon,
  AlignBottomIcon,
  SpaceBetweenVerticallyIcon,
  SpaceBetweenHorizontallyIcon,
  CircleIcon,
  TextIcon,
  SquareIcon,
  FontBoldIcon,
  FontItalicIcon,
  CopyIcon,
  LightningBoltIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIcon,
  TriangleIcon,
  ImageIcon,
  Pencil1Icon,
  LayoutIcon,
  TableIcon,
  LayersIcon,
  ViewVerticalIcon,
  PinLeftIcon,
  CaretSortIcon,
  SizeIcon,
  ChevronDownIcon,
  StarIcon,
  HeartIcon,
  FileIcon,
  AngleIcon,
  ZoomInIcon,
  ZoomOutIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  BorderWidthIcon,
  BorderSolidIcon,
  PlusIcon,
  // HamburgerMenuIcon,
  Cross2Icon,
  CornersIcon,
  SparklesIcon,
  TrashIcon,
  DownloadIcon,
  FontSizeIcon,
  DesktopIcon,
  Camera2Icon,
  LineHeightIcon,
  RepeatIcon,
  TransformIcon,
  TransparencyGridIcon,
  DotsHorizontalIcon,
  Half2Icon,
  ClipboardCopyIcon,
  UnderlineIcon,
} from "sebikostudio-icons";
import SebikoLogo from "./SebikoLogo";
import randomColor from "randomcolor";
import UTIF from "utif";
import LayerPanel from "./LayerPanel";
import QRCode from "react-qr-code";
import { debounce } from "lodash";
import CsvUploadDownload from "./CsvUploadDownload";
import HtmlPreview from "./HtmlPreview";

import {
  ValueIcon,
  Pencil2Icon,
  RowsIcon,
  ColumnsIcon,
} from "@radix-ui/react-icons";
import { parse } from "papaparse";
import "./TemplateCanvas.scss";
import PhotoMode from "./photoMode";
import JSZip from "jszip";
// import DialogWelcome from "../dialogs/DialogWelcome";
import DialogTemplate from "../dialogs/DialogTemplate";
import DialogExport from "../dialogs/DialogExport";
import CanvasConstraints from "./CanvasConstraints";
import OpacityInput from "./OpacityInput";
import Keyboard from "./Keyboard";
import ShadowInput from "./ShadowInput";
import PatternInput from "./PatternInput";

import {
  Flex,
  Button,
  Heading,
  Paragraph,
  IconButton,
  Separator,
  Input,
  DropdownMenu,
  Select,
  ToggleGroup,
  Tooltip,
  Toggle,
  Toolbar,
  ScrollArea,
  Card,
  Checkbox,
  Tabs,
  Toast,
} from "blocksin-system";
import Table from "./Table";

import WebFont from "webfontloader";
import FontFaceObserver from "fontfaceobserver";
import CanvasAutolayout from "./CanvasAutolayout";
import CanvasToPpt from "./CanvasToPpt";
import ChatGPTInput from "./ChatGPTInput";
import RestoreDialog from "../dialogs/RestoreDialog";
import DialogTemplates from "../dialogs/DialogTemplates";
// eslint-disable-next-line
import GenerateTemplate from "./GenerateTemplate";

const ColorBox1 = () => (
  <div
    style={{
      backgroundColor: "var(--gray-100)",
      width: 20,
      height: 20,
      borderRadius: "50%",
    }}
  />
);
const ColorBox2 = () => (
  <div
    style={{
      backgroundColor: "var(--gray-200)",
      width: 20,
      height: 20,
      borderRadius: "50%",
    }}
  />
);
const ColorBox3 = () => (
  <div
    style={{
      backgroundColor: "var(--black-100)",
      width: 20,
      height: 20,
      borderRadius: "50%",
    }}
  />
);
const ColorBox4 = () => (
  <div
    style={{
      backgroundColor: "var(--black-400)",
      width: 20,
      height: 20,
      borderRadius: "50%",
    }}
  />
);

const App = ({
  darkmodeChecked,
  handleFeedbackClick,
  handleShortcutsClick,
  setDarkmodeChecked,
  setPageColor,
  pageColor,
  pagePattern,
  setPagePattern,
  showDev,
  showDevModal,
  showSpot,
}) => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Pacifico", "Lobster", "Lora", "RedHatDisplay"], // Specify the Pacifico font
      },
      active: () => {
        // console.log("Fonts have been loaded");
        setFontsLoaded(true); // Update state to indicate fonts are loaded
      },
      inactive: () => {
        // console.error("Fonts could not be loaded");
        setFontsLoaded(false);
      },
    });
  }, []);
  //

  const [brightness, setBrightness] = useState([0]);
  const [contrast, setContrast] = useState([0]);
  const [saturation, setSaturation] = useState([0]);
  const [hue, setHue] = useState([0]);
  const [blur, setBlur] = useState([0]);
  const [noise, setNoise] = useState([0]);
  const [isMonochrome, setIsMonochrome] = useState(false);
  const [histogramData, setHistogramData] = useState({
    labels: [],
    values: [],
  });
  const [redChannel, setRedChannel] = useState([1]);
  const [greenChannel, setGreenChannel] = useState([1]);
  const [blueChannel, setBlueChannel] = useState([1]);
  //
  const qrRef = useRef(null);
  const [qrValue, setQrValue] = useState("https://yourwebsite.com");
  //
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  //
  const [autoLayout, setAutoLayout] = useState(false);
  const [layoutDirection, setLayoutDirection] = useState("row");
  const [gap, setGap] = useState(24);
  const [alignment, setAlignment] = useState("top");
  //
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setToastText("Style ID copied to clipboard!");
        setShowToast(true);
        // console.log("Copying to clipboard was successful!");
        // Optionally show some feedback to the user
        // alert("Style ID copied to clipboard!");
      },
      (err) => {
        // console.error("Could not copy text: ", err);
        // Optionally show some feedback to the user
        setToastText("Failed to copy Style ID.");
        setShowToast(true);
        // alert("Failed to copy Style ID.");
      }
    );
  };
  const [styles, setStyles] = useState(() => {
    const localData = localStorage.getItem("styles");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("styles", JSON.stringify(styles));
  }, [styles]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(styles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setStyles(items);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    userSelect: "none",
    opacity: isDragging ? 0.8 : 1,
    position: "static",
    backgroundColor: isDragging ? "var(--background-neutral-hover)" : "",
    zIndex: isDragging ? 1000 : undefined,
    boxShadow: isDragging ? "0px 10px 15px rgba(0,0,0,0.2)" : undefined,
  });

  const [colorName, setColorName] = useState("Color");
  const [visibilityText, setVisibilityText] = useState(true);
  const [visibilityShapes, setVisibilityShapes] = useState(true);
  const [editingColorId, setEditingColorId] = useState(null); // Tracks the ID of the color being edited
  const [currentColorId, setCurrentColorId] = useState(null);
  const [currentStrokeColorId, setCurrentStrokeColorId] = useState(null);

  const loadColorForEditing = (style) => {
    setCurrentColor(style.hexColor);
    setColorName(style.colorName);
    setVisibilityText(style.visibility.text);
    setVisibilityShapes(style.visibility.shapes);
    setEditingColorId(style.id); // Set the ID to indicate editing mode
  };

  const saveColorChanges = () => {
    if (!colorName.trim()) {
      alert("Please enter a color name.");
      return;
    }
    const updatedStyle = {
      hexColor: currentColor,
      visibility: {
        text: visibilityText,
        shapes: visibilityShapes,
      },
      colorName: colorName,
      id: editingColorId || Date.now(),
    };

    setStyles((prevStyles) => {
      const index = prevStyles.findIndex(
        (style) => style.id === editingColorId
      );
      if (index !== -1) {
        prevStyles[index] = updatedStyle;
        updateObjectsWithStyle(updatedStyle.id, updatedStyle.hexColor);
      } else {
        prevStyles.push(updatedStyle);
      }
      return [...prevStyles];
    });

    // Reset form and exit editing mode
    setColorName("");
    setCurrentColor("#ffffff");
    setEditingColorId(null);
  };

  const handleNameChange = (event) => {
    setColorName(event.target.value);
  };

  const deleteColor = (id) => {
    setStyles((prevStyles) => prevStyles.filter((style) => style.id !== id));
    setEditingColorId(null);
  };

  const addColor = () => {
    if (!colorName.trim()) {
      alert("Please enter a color name.");
      return;
    }
    const newStyle = {
      hexColor: currentColor,
      visibility: {
        text: visibilityText,
        shapes: visibilityShapes,
      },
      colorName: colorName,
      id: Date.now(),
      order: Date.now(), // Using timestamp to keep it unique and sequential
    };
    setStyles((prevStyles) =>
      [...prevStyles, newStyle].sort((a, b) => a.order - b.order)
    );
    setColorName("Color");
    setCurrentColor("#ffffff");
  };

  const downloadStyles = () => {
    const jsonBlob = new Blob([JSON.stringify(styles)], {
      type: "application/json",
    });
    saveAs(jsonBlob, "customStyles.json");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const newStyles = JSON.parse(e.target.result);
          setStyles((prev) => [
            ...prev,
            ...newStyles.filter((ns) => !prev.some((ps) => ps.id === ns.id)),
          ]); // Merge ensuring no ID conflicts
        } catch (error) {
          console.error("Failed to load styles:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  //

  const [viewMode, setViewMode] = useState(() => {
    // Retrieve the view mode from local storage if it exists
    return localStorage.getItem("viewMode") || "Design";
  });

  useEffect(() => {
    // Store the view mode in local storage whenever it changes
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const [isGenerateBanners, setIsGenerateBanners] = useState(true);
  const [isUnsplash, setIsUnplash] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setIsGenerateBanners(true);
    setIsUnplash(false);
    setIsIcons(false);
  };
  // const [isSplitViewOn, setIsSplitViewOn] = useState(false);
  // const toggleSplitView = () => {
  //   // setIsSplitViewOn(!isSplitViewOn);
  //   setViewMode((prevMode) => (prevMode === "Split" ? "Design" : "Split"));
  // };
  const toggleUnsplash = () => {
    setIsUnplash(true);
    setIsGenerateBanners(false);
    setIsIcons(false);
    setIsSidebarVisible(true);
  };

  const toggleIcons = () => {
    setIsIcons(true);
    setIsUnplash(false);
    setIsGenerateBanners(false);
    setIsSidebarVisible(true);
  };

  const [fileName, setFileName] = useState("Upload Image");
  const fileInputRef = useRef(null);
  const fileInputSVGRef = useRef(null);
  const fileInputIMGRef = useRef(null);

  const [imageObjects, setImageObjects] = useState([]); // New state to keep track of image objects
  const [selectedImageObject, setSelectedImageObject] = useState(null);
  const imageObjectInputRef = useRef(null);

  const [templateNameUploaded, setTemplateNameUploaded] =
    useState("Upload Template");
  const templateInputRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const [backgroundImage, setBackgroundImage] = useState(null);
  // eslint-disable-next-line
  const [backgroundImageSource, setBackgroundImageSource] = useState("none");

  // const [canvasIDs, setCanvasIDs] = useState([]);
  const [templateName, setTemplateName] = useState("MyTemplate");

  const canvasRef = useRef(null);

  const canvasInstance = useRef(null);

  const [sheetUrl, setSheetUrl] = useState("");
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  const [dataLoaded, setDataLoaded] = useState(false);
  // const [sheetData, setSheetData] = useState([]);
  const populatedCanvasRefs = useRef([]);

  const [isObjSelected, setIsObjSelected] = useState(false);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //

  const [activeLayerId, setActiveLayerId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const setActiveLayer = (object) => {
    if (object) {
      setActiveLayerId(object.id); // Assuming each object has a unique ID
    } else {
      setActiveLayerId(null);
    }
  };

  const [isTextSelected, setIsTextSelected] = useState(false);
  const [isShapeSelected, setIsShapeSelected] = useState(false);
  const [isRectangleSelected, setIsRectangleSelected] = useState(false);
  const [isStarSelected, setIsStarSelected] = useState(false);
  const [isCircleSelected, setIsCircleSelected] = useState(false);
  const [isTriangleSelected, setIsTriangleSelected] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isLineSelected, setIsLineSelected] = useState(false);
  const [isVectorElementSelected, setIsVectorElementSelected] = useState(false);
  const [isGroupSelected, setIsGroupSelected] = useState(false);
  const [selectedObjectType, setSelectedObjectType] = useState(false);
  const [textAlignment, setTextAlignment] = useState("");
  //
  const [activeTab, setActiveTab] = useState("tab1"); // Default tab
  useEffect(() => {
    if (selectedObjectType) {
      setActiveTab("tab1"); // Switch to Settings tab whenever an object is selected
    }
  }, [selectedObjectType]);
  //
  // eslint-disable-next-line
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentStrokeColor, setCurrentStrokeColor] = useState("#000000");
  const [lastColor, setLastColor] = useState(currentColor);
  const [isColorVisible, setIsColorVisible] = useState(true);
  // eslint-disable-next-line
  const [shadow, setShadow] = useState({
    color: "rgba(0, 0, 0, 1)",
    blur: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const handleShadowChange = (newShadow) => {
    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set("shadow", newShadow);
      canvas.renderAll();
    }
  };
  // Parent component's function to handle pattern change
  const handlePatternChange = (pattern) => {
    const canvas = canvasInstance.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set({
          fill: pattern,
        });
        canvas.renderAll();
      }
    }
  };

  const [textWeight, setTextWeight] = useState("400");
  const [textStyle, setTextStyle] = useState("regular");
  const [textSize, setTextSize] = useState("16");
  const [textFontFamily, setTextFontFamily] = useState("OpenSans");
  const fonts = [
    {
      value: "OpenSans",
      label: "Open Sans",
      style: { fontFamily: "OpenSans" },
    },
    { value: "Arial", label: "Arial", style: { fontFamily: "Arial" } },
    { value: "Lora", label: "Lora", style: { fontFamily: "Lora" } },
    {
      value: "IBMPlexSans",
      label: "IBM Plex Sans",
      style: { fontFamily: "IBMPlexSans" },
    },
    { value: "Pacifico", label: "Pacifico", style: { fontFamily: "Pacifico" } },
    {
      value: "RedHatDisplay",
      label: "Red Hat Display",
      style: { fontFamily: "RedHatDisplay" },
    },
    { value: "Lobster", label: "Lobster", style: { fontFamily: "Lobster" } },
    { value: "Spectral", label: "Spectral", style: { fontFamily: "Spectral" } },
    { value: "Verdana", label: "Verdana", style: { fontFamily: "Verdana" } },
    { value: "Impact", label: "Impact", style: { fontFamily: "Impact" } },
    { value: "Calibri", label: "Calibri", style: { fontFamily: "Calibri" } },
    { value: "Lato", label: "Lato", style: { fontFamily: "Lato" } },
    {
      value: "DarkerGrotesque",
      label: "Darker Grotesque",
      style: { fontFamily: "DarkerGrotesque" },
    },
    {
      value: "Helvetica",
      label: "Helvetica",
      style: { fontFamily: "Helvetica" },
    },
  ];
  const sortedFonts = fonts.sort((a, b) => a.label.localeCompare(b.label));

  const [textLineHeight, setTextLineHeight] = useState("1.2");
  const [textUnderline, setTextUnderline] = useState(false);
  const [textId, setTextId] = useState(null);
  const [id, setId] = useState(null);
  const [opacity, setOpacity] = useState(100);
  const [borderRadius, setBorderRadius] = useState(0);
  const [initialRadius, setInitialRadius] = useState(0);
  const [objHeight, setObjHeight] = useState(0); // State to store the height of the selected rectangle
  const [objWidth, setObjWidth] = useState(0);
  // const [objScaleX, setObjScaleX] = useState(1);
  // const [objScaleY, setObjScaleY] = useState(1);
  const [circleRadius, setCircleRadius] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [scaleMode, setScaleMode] = useState(false); // State to track reshape mode
  const [canvasWidth, setCanvasWidth] = useState(540);
  const [canvasHeight, setCanvasHeight] = useState(540);
  const [constraints, setConstraints] = useState({
    right: false,
    bottom: false,
  });
  const [prevCanvasSize, setPrevCanvasSize] = useState({
    width: canvasWidth,
    height: canvasHeight,
  });

  const [lineThickness, setLineThickness] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [line, setLine] = useState(null);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Capture the original method
  const originalToObject = fabric.Object.prototype.toObject;

  // Override the method
  fabric.Object.prototype.toObject = function () {
    const base = originalToObject.call(this);
    return {
      ...base,
      label: this.label || `${this.type}`,
      zIndex: this.canvas ? this.canvas.getObjects().indexOf(this) : -1,
      fillColorStyleId: this.fillColorStyleId || null,
      strokeColorStyleId: this.strokeColorStyleId || null,
      constraints: this.constraints || ["left", "top"],
    };
  };

  // Extend fabric.Group to include auto layout properties
  fabric.Group.prototype.toObject = function (propertiesToInclude) {
    return {
      ...fabric.Object.prototype.toObject.call(this, propertiesToInclude),
      autoLayout: this.autoLayout || false,
      layoutDirection: this.layoutDirection || "row",
      gap: this.gap || 0,
      alignment: this.alignment || "top",
    };
  };

  // When needed, restore the original method
  fabric.Object.prototype.toObject = originalToObject;

  const updateImageObjectsOrder = () => {
    const canvas = canvasInstance.current;
    if (canvas) {
      const allObjects = canvas.getObjects();
      const filteredObjects = allObjects.filter(
        (obj) => !obj.id?.startsWith("grid-line-")
      ); // Filter out grid lines

      const processObjects = (objs, depth = 0) => {
        return objs.flatMap((obj, index) => {
          if (obj.type === "group") {
            // Process child objects first
            const childObjects = processObjects(obj._objects, depth + 1);
            const objectDetails = {
              id: obj.id,
              type: obj.type,
              label: obj.label || `${obj.type}`,
              visible: obj.visible,
              selectable: obj.selectable,
              depth: depth,
            };
            return [...childObjects, objectDetails]; // Append the group after its children
          } else {
            // Handle non-group objects
            return [
              {
                id: obj.id,
                type: obj.type,
                label: obj.label || `${obj.type}`,
                visible: obj.visible,
                selectable: obj.selectable,
                depth: depth,
              },
            ];
          }
        });
      };

      const updatedObjects = processObjects(filteredObjects);
      console.log("Updated Object List:", updatedObjects); // Debug log to see the updated list
      setImageObjects(updatedObjects); // Update state to reflect current objects
    }
  };

  const moveSelectedObjectUp = () => {
    const canvas = canvasInstance.current;
    const selectedObject = canvas.getActiveObject();
    if (selectedObject) {
      let currentIndex = canvas.getObjects().indexOf(selectedObject);
      if (currentIndex < canvas.getObjects().length - 1) {
        canvas.moveTo(selectedObject, currentIndex + 1);
        // Ensure the label is set correctly after move
        selectedObject.set(
          "label",
          selectedObject.label || `${selectedObject.type}`
        );
        canvas.renderAll();
        updateImageObjectsOrder();
        updateLayerPanel();
      }
    }
  };

  const moveSelectedObjectDown = () => {
    const canvas = canvasInstance.current;
    const selectedObject = canvas.getActiveObject();
    if (selectedObject) {
      let currentIndex = canvas.getObjects().indexOf(selectedObject);
      if (currentIndex > 0) {
        canvas.moveTo(selectedObject, currentIndex - 1);
        // Ensure the label is set correctly after move
        selectedObject.set(
          "label",
          selectedObject.label || `${selectedObject.type}`
        );
        canvas.renderAll();
        updateImageObjectsOrder();
        updateLayerPanel();
      }
    }
  };

  const startEditing = (id, currentLabel) => {
    setEditingId(id);
    setEditInput(currentLabel);
  };

  const saveEdits = (id) => {
    const canvas = canvasInstance.current;
    const updatedObjects = imageObjects.map((obj) => {
      if (obj.id === id) {
        // Manually find the object on the canvas
        const canvasObj = canvas.getObjects().find((o) => o.id === id);
        if (canvasObj) {
          canvasObj.set("label", editInput); // Update the label on the canvas object
          canvas.renderAll();
        }
        return { ...obj, label: editInput }; // Update the object in the state
      }
      return obj;
    });
    setImageObjects(updatedObjects); // Update the React state
    setEditingId(null);
    setEditInput("");
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const loadFonts = async () => {
      const canvas = canvasInstance.current;
      if (!canvas) return;

      const textObjects = canvas
        .getObjects()
        .filter((obj) => obj.type === "textbox");

      const fontsToLoad = new Set();
      textObjects.forEach((textObj) => {
        const font = textObj.fontFamily;
        if (font && font !== "Arial") {
          fontsToLoad.add(font);
        }
      });

      let allFontsLoaded = true;
      for (const font of fontsToLoad) {
        try {
          await new FontFaceObserver(font).load();
          console.log(`${font} font has been loaded`);
        } catch (error) {
          console.error(`Error loading ${font} font:`, error);
          allFontsLoaded = false;
        }
      }

      setFontsLoaded(allFontsLoaded);
    };

    loadFonts();
    // eslint-disable-next-line
  }, [canvasInstance.current]);

  const handleOpacityChange = (percentageString) => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      // Check if the input is empty or not a number, and use 0 if so
      const inputPercentage = parseInt(percentageString.replace("%", ""), 10);
      const decimalOpacity = isNaN(inputPercentage) ? 0 : inputPercentage / 100;

      // Clamp the decimalOpacity between 0 and 1
      const clampedOpacity = Math.max(0, Math.min(1, decimalOpacity));

      // Set the new opacity
      activeObject.set("opacity", clampedOpacity);
      // Re-render the canvas to reflect the change
      canvas.requestRenderAll();
    } else {
      console.log("No object selected or multiple objects selected.");
    }
  };

  // Input handlers for changing the canvas size
  const handleCanvasWidthChange = (e) => {
    const inputVal = e.target.value;
    const newWidth = parseInt(inputVal, 10);
    if (!isNaN(newWidth) && newWidth >= 1) {
      setCanvasWidth(newWidth);
    } else {
      setCanvasWidth(1); // Set canvas width to 1 if input is empty or less than 1
      e.target.value = 1; // Reset the input field to 1
    }
  };

  const handleCanvasHeightChange = (e) => {
    const inputVal = e.target.value;
    const newHeight = parseInt(inputVal, 10);
    if (!isNaN(newHeight) && newHeight >= 1) {
      setCanvasHeight(newHeight);
    } else {
      setCanvasHeight(1); // Set canvas height to 1 if input is empty or less than 1
      e.target.value = 1; // Reset the input field to 1
    }
  };

  const [selectedSize, setSelectedSize] = useState("");

  const bannerSizes = {
    "Business Card": { width: 525, height: 300 },
    "Slide 16:9": { width: 720, height: 405 },
    "LinkedIn Carousel": { width: 1080, height: 1080 },
    A4: { width: 1241, height: 1754 },
    Instagram: { width: 540, height: 540 },
    // Instagram: { width: 1080, height: 1080 },
    Facebook: { width: 820, height: 312 },
    LinkedIn: { width: 1128, height: 191 },
    Twitter: { width: 1500, height: 500 },
    // YouTube: { width: 2560, height: 1440 },
    Google: { width: 336, height: 280 },
  };

  const handleBannerSizeChange = (value) => {
    setSelectedSize(value);
    const size = bannerSizes[value];
    if (size) {
      setCanvasWidth(size.width);
      setCanvasHeight(size.height);
    }
  };
  //
  const [gridVisible, setGridVisible] = useState(() => {
    return JSON.parse(localStorage.getItem("gridVisible")) || false;
  });
  const [gridLines, setGridLines] = useState([]);

  const [gridCols, setGridCols] = useState(() => {
    return JSON.parse(localStorage.getItem("grid_columns")) || 12;
  });
  const [gridRows, setGridRows] = useState(() => {
    return JSON.parse(localStorage.getItem("grid_rows")) || 12;
  });

  const handleGridColumnsChange = (e) => {
    const newColumns = Number(e.target.value);
    setGridCols(newColumns);
    localStorage.setItem("grid_columns", JSON.stringify(newColumns));
    const canvas = canvasInstance.current;

    if (canvas) {
      createGrid(canvas);
    }
  };

  const handleGridRowsChange = (e) => {
    const newRows = Number(e.target.value);
    setGridRows(newRows);
    localStorage.setItem("grid_rows", JSON.stringify(newRows));
    const canvas = canvasInstance.current;

    if (canvas) {
      createGrid(canvas);
    }
  };

  const createGrid = () => {
    const canvas = canvasInstance.current;

    const verticalGridSize = Math.ceil(canvas.width / gridCols);
    const horizontalGridSize = Math.ceil(canvas.height / gridRows);
    const lines = [];

    for (let i = 0; i <= gridCols; i++) {
      lines.push(
        new fabric.Line(
          [i * verticalGridSize, 0, i * verticalGridSize, canvas.height],
          {
            stroke: "#00ebff",
            selectable: false,
            evented: false,
            id: `grid-line-vertical-${i}`,
          }
        )
      );
    }

    for (let j = 0; j <= gridRows; j++) {
      lines.push(
        new fabric.Line(
          [0, j * horizontalGridSize, canvas.width, j * horizontalGridSize],
          {
            stroke: "#00ebff",
            selectable: false,
            evented: false,
            id: `grid-line-horizontal-${j}`,
          }
        )
      );
    }

    return lines;
  };

  function clearGrid(canvas, lines) {
    lines.forEach((line) => {
      canvas.remove(line);
    });
  }

  const toggleGrid = () => {
    setGridVisible((prev) => {
      const newValue = !prev;
      localStorage.setItem("gridVisible", JSON.stringify(newValue));
      return newValue;
    });
  };
  //
  // eslint-disable-next-line

  const saveCanvasToLocalStorage = () => {
    downloadTemplate(true);
  };

  const loadCanvasFromLocalStorage = () => {
    const savedCanvasState = localStorage.getItem("fabricCanvas");
    if (savedCanvasState && canvasInstance.current) {
      const templateData = JSON.parse(savedCanvasState);
      const { objects, backgroundColor, backgroundImage, width, height } =
        templateData;

      applyTemplateData(
        objects,
        backgroundColor,
        backgroundImage,
        width,
        height
      );
      // loadTemplate(templateData);
    }
  };

  useEffect(() => {
    // Initialize the canvas only once
    fabric.Object.prototype.set({
      cornerColor: "white",
      cornerStrokeColor: "#4880f0",
      cornerSize: 10,
      borderColor: "#4880f0",
      cornerStyle: "rect", // Sets the style of the corner handles to rectangles
      transparentCorners: false,
      // You can also set other properties like cornerStyle, transparentCorners, etc.
    });
    //
    const rotationIcon =
      "data:image/svg+xml;utf8,<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z' fill='%234880f0'/></svg>";
    var img = new Image();

    img.src = rotationIcon;

    fabric.Object.prototype.controls.mtr = new fabric.Control({
      x: 0,
      y: -0.5,
      offsetY: -40,
      cursorStyle: "crosshair",
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      actionName: "rotate",
      render: renderIcon,
      cornerSize: 20,
      withConnection: false,
    });

    fabric.Textbox.prototype.controls.mtr = new fabric.Control({
      x: 0,
      y: -0.5,
      offsetY: -40, // Adjust as necessary
      cursorStyle: "crosshair",
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      actionName: "rotate",
      render: renderIcon, // Ensure this is defined as shown in your setup
      cornerSize: 20, // Adjust size as necessary
      withConnection: false,
    });

    // here's where the render action for the control is defined
    function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      var size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
    //
    if (!fontsLoaded) return;

    if (!canvasInstance.current) {
      canvasInstance.current = new fabric.Canvas(canvasRef.current, {
        width: 540,
        height: 540,
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage,
        stopContextMenu: true,
        fireRightClick: true,
        // fontFamily: fontFamily,
      });

      // Adding initial text objects
      const headline = new fabric.Textbox("Headline Text", {
        id: "title",
        label: "Headline",
        left: 32,
        top: 32,
        width: 476,
        fontSize: 32,
        fill: "#000000",
        fontFamily: "Pacifico",
        textAlign: "left",
        lineHeight: "1.2",
        strokeWidth: 0,
      });

      const description = new fabric.Textbox("Description Text", {
        id: "text",
        label: "Description",
        left: 32,
        top: 80,
        width: 476,
        fontSize: 24,
        fill: "#000000",
        fontFamily: "OpenSans",
        textAlign: "left",
        lineHeight: "1.2",
        strokeWidth: 0,
      });

      canvasInstance.current.add(headline, description);

      // Store the initial background color
      //  const initialInteractions = JSON.parse(localStorage.getItem('interactions')) || [];
      //  initialInteractions.push({ type: 'canvas', backgroundColor: backgroundColor, timestamp: Date.now() });
      //  localStorage.setItem('interactions', JSON.stringify(initialInteractions));

      // Add event listeners for tracking interactions
      // canvasInstance.current.on("object:moving", handleObjectInteraction);
      // canvasInstance.current.on("object:scaling", handleObjectInteraction);
      // canvasInstance.current.on("object:rotating", handleObjectInteraction);
      // canvasInstance.current.on("object:modified", handleObjectInteraction);

      updateImageObjectsOrder();
      //
    }
    // Disable native context menu across the entire document
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    // // Disable native context menu
    canvasInstance.current.upperCanvasEl.oncontextmenu = (e) => {
      e.preventDefault();
    };

    canvasInstance.current.on("mouse:up", (e) => {
      if (e.button === 3) {
        const activeObject = canvasInstance.current.getActiveObject();
        if (activeObject) {
          console.log("Active object selected");
          setContextMenuPosition({ x: e.e.clientX + 48, y: e.e.clientY });
          setContextMenuOpen(true);
        } else {
          setContextMenuOpen(false);
          console.log("No active object selected");
        }
      } else {
        setContextMenuOpen(false);
      }
    });

    canvasInstance.current.on("object:selected", (e) => {
      setIsObjSelected(e.target);
    });

    const updateSelectionStates = (selectedObject) => {
      if (!selectedObject) return; // Check if selectedObject is defined

      const getSelectedObjectType = (selectedObject) => {
        switch (selectedObject.type) {
          case "path":
            return "Path";
          case "polyline":
            return "Polyline";
          case "polygon":
            return "Polygon";
          default:
            return null;
        }
      };

      const isTextbox = selectedObject.type === "textbox";
      const isStar =
        selectedObject.type === "path" && selectedObject.id.startsWith("star-");
      const isCircle = selectedObject.type === "circle";
      const isTriangle = selectedObject.type === "triangle";
      const isRect = selectedObject.type === "rect";
      const isImage = selectedObject.type === "image";
      const isLine = selectedObject.type === "line";
      const isGroup = selectedObject.type === "group";
      const isVectorElement =
        (selectedObject.type === "path" ||
          selectedObject.type === "polyline" ||
          selectedObject.type === "polygon") &&
        !selectedObject.id.startsWith("star-");

      setIsVectorElementSelected(isVectorElement);
      setIsTextSelected(isTextbox);
      setIsShapeSelected(isCircle || isRect || isTriangle || isStar);
      setIsRectangleSelected(isRect);
      setIsTriangleSelected(isTriangle);
      setIsCircleSelected(isCircle);
      setIsStarSelected(isStar);
      setIsImageSelected(isImage);
      setIsGroupSelected(isGroup);
      setIsLineSelected(isLine);

      if (isTextbox) {
        setSelectedObjectType("text");
      } else if (isCircle || isRect || isLine || isTriangle || isStar) {
        setSelectedObjectType("shape");
      } else if (isVectorElement) {
        setSelectedObjectType(getSelectedObjectType(selectedObject));
      } else if (isImage) {
        setSelectedObjectType("image");
        setSelectedImageObject(selectedObject); // Set or update the selected image object
      } else {
        setSelectedObjectType(null); // No selection or unsupported type
      }

      if (isRect) {
        setObjHeight(selectedObject.height); // Update the height state when a rectangle is selected
      }

      if (isImage) {
        setSelectedImageObject(selectedObject); // Set or update the selected image object
      }

      setTextAlignment(isTextbox ? selectedObject.textAlign : "");
      // console.log(selectedObject.id);
    };

    const handleSelectionCreated = (event) => {
      if (event.selected && event.selected.length > 0) {
        updateSelectionStates(event.selected[0]);
      }
      setIsObjSelected(true);
      setActiveLayer(event.selected[0]);
    };

    const handleSelectionUpdated = (event) => {
      if (event.selected && event.selected.length > 0) {
        updateSelectionStates(event.selected[0]);
      }
      setIsObjSelected(true);
      setActiveLayer(event.selected[0]);
    };

    const handleSelectionCleared = () => {
      setIsObjSelected(false); // No object is selected
      setActiveLayer(null); // Clear the active layer
      setIsTextSelected(false);
      setIsShapeSelected(false);
      setIsRectangleSelected(false);
      setIsCircleSelected(false);
      setIsStarSelected(false);
      setIsTriangleSelected(false);
      setIsImageSelected(false);
      setIsLineSelected(false);
      setIsGroupSelected(false);
      setSelectedObjectType(false);
      setIsVectorElementSelected(false);
      deselectAllObjects();
    };

    canvasInstance.current.on("selection:created", handleSelectionCreated);
    canvasInstance.current.on("selection:updated", handleSelectionUpdated);
    canvasInstance.current.on("selection:cleared", handleSelectionCleared);
    //

    if (gridVisible) {
      const lines = createGrid(canvasInstance.current);
      setGridLines(lines);
      lines.forEach((line) => canvasInstance.current.add(line));
    } else {
      clearGrid(canvasInstance.current, gridLines);
      setGridLines([]);
    }

    const handleObjectMoving = (options) => {
      const verticalGridSize = Math.ceil(
        canvasInstance.current.width / gridCols
      );
      const horizontalGridSize = Math.ceil(
        canvasInstance.current.height / gridRows
      );
      const snapDistance = 6;
      const target = options.target;

      if (gridVisible) {
        if (Math.abs(target.left % verticalGridSize) < snapDistance) {
          target.set({
            left: Math.round(target.left / verticalGridSize) * verticalGridSize,
          });
        }
        if (Math.abs(target.top % horizontalGridSize) < snapDistance) {
          target.set({
            top:
              Math.round(target.top / horizontalGridSize) * horizontalGridSize,
          });
        }
      } else {
        target.set({
          left: Math.round(target.left),
          top: Math.round(target.top),
        });
      }
    };

    canvasInstance.current.on("object:moving", handleObjectMoving);

    return () => {
      canvasInstance.current.off("object:moving", handleObjectMoving);
      clearGrid(canvasInstance.current, gridLines);
      //
      canvasInstance.current.off("selection:created", handleSelectionCreated);
      canvasInstance.current.off("selection:updated", handleSelectionUpdated);
      canvasInstance.current.off("selection:cleared", handleSelectionCleared);
    };
    // eslint-disable-next-line
  }, [
    backgroundColor,
    backgroundImage,
    fontsLoaded,
    activeLayerId,
    gridVisible,
  ]);

  //
  // Constraints
  useEffect(() => {
    const canvas = canvasInstance.current;
    if (canvas) {
      canvas.setWidth(canvasWidth);
      canvas.setHeight(canvasHeight);
      canvas.renderAll();
    }
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (canvas) {
      const prevWidth = prevCanvasSize.width;
      const prevHeight = prevCanvasSize.height;

      canvas.getObjects().forEach((obj) => {
        if (obj.constraints?.includes("right")) {
          const rightGap = prevWidth - (obj.left + obj.width);
          obj.set("left", canvasWidth - (obj.width + rightGap));
        }
        if (obj.constraints?.includes("bottom")) {
          const bottomGap = prevHeight - (obj.top + obj.height);
          obj.set("top", canvasHeight - (obj.height + bottomGap));
        }
        obj.setCoords();
      });

      canvas.renderAll();

      setPrevCanvasSize({ width: canvasWidth, height: canvasHeight });
    }
    // eslint-disable-next-line
  }, [canvasWidth, canvasHeight, canvasInstance.current]);

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (canvas) {
      const updateConstraints = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          setConstraints({
            right: activeObject.constraints?.includes("right") || false,
            bottom: activeObject.constraints?.includes("bottom") || false,
          });
        } else {
          setConstraints({
            right: false,
            bottom: false,
          });
        }
      };

      canvas.on("selection:created", updateConstraints);
      canvas.on("selection:updated", updateConstraints);
      canvas.on("selection:cleared", updateConstraints);

      return () => {
        canvas.off("selection:created", updateConstraints);
        canvas.off("selection:updated", updateConstraints);
        canvas.off("selection:cleared", updateConstraints);
      };
    }
    // eslint-disable-next-line
  }, [canvasInstance.current]);

  const handleConstraintChange = (name, checked) => {
    const canvas = canvasInstance.current;

    setConstraints((prev) => ({ ...prev, [name]: checked }));

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      if (!activeObject.constraints) {
        activeObject.constraints = [];
      }
      if (checked) {
        if (!activeObject.constraints.includes(name)) {
          activeObject.constraints.push(name);
        }
      } else {
        activeObject.constraints = activeObject.constraints.filter(
          (constraint) => constraint !== name
        );
      }
      canvas.renderAll();
    }
  };

  const handleToggleChange = (name, value) => {
    handleConstraintChange(name, value === name);
  };

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (canvas) {
      // Clear and recreate the grid lines if the grid is visible
      clearGrid(canvas, gridLines);
      setGridLines([]);

      if (gridVisible) {
        const lines = createGrid(canvas);
        setGridLines(lines);
        lines.forEach((line) => canvas.add(line));
      }
      canvas.renderAll();
      // Temporarily toggle the grid visibility to force re-render HACK
      setGridVisible((prev) => !prev);
      setTimeout(() => {
        setGridVisible((prev) => !prev);
      }, 0);
    }
    // eslint-disable-next-line
  }, [canvasWidth, canvasHeight, gridCols, gridRows]);
  //
  useEffect(() => {
    if (!canvasInstance.current) return;

    const canvas = canvasInstance.current;
    canvas.on("object:added", saveCanvasToLocalStorage);
    canvas.on("object:modified", saveCanvasToLocalStorage);
    canvas.on("object:removed", saveCanvasToLocalStorage);

    return () => {
      canvas.off("object:added", saveCanvasToLocalStorage);
      canvas.off("object:modified", saveCanvasToLocalStorage);
      canvas.off("object:removed", saveCanvasToLocalStorage);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]);
  //
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (canvas) {
      const handleSelection = (e) => {
        if (e.selected && e.selected.length > 0) {
          setSelectedObject(e.selected[0]);
        } else {
          setSelectedObject(null);
        }
      };

      canvas.on("selection:created", handleSelection);
      canvas.on("selection:updated", handleSelection);
      canvas.on("selection:cleared", handleSelection);

      return () => {
        canvas.off("selection:created", handleSelection);
        canvas.off("selection:updated", handleSelection);
        canvas.off("selection:cleared", handleSelection);
      };
    }
    // eslint-disable-next-line
  }, [canvasInstance.current]);

  const displayProperties = (obj) => {
    if (!obj) {
      return <div>No object selected</div>;
    }

    let properties = [];

    // Display bounding box for activeSelection
    if (obj.type === "activeSelection") {
      const bbox = obj.getBoundingRect();
      properties.push(
        <div key="boundingBox">
          <strong>Bounding Box:</strong>
          {` Width: ${bbox.width.toFixed(2)}px, Height: ${bbox.height.toFixed(
            2
          )}px, Left: ${bbox.left.toFixed(2)}px, Top: ${bbox.top.toFixed(2)}px`}
        </div>
      );
    }

    // Additional properties
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && key !== "type") {
        properties.push(
          <div key={key}>
            <strong>{key}:</strong> {JSON.stringify(obj[key], null, 2)}
          </div>
        );
      }
    }

    return <div>{properties}</div>;
  };

  //

  const generateColorPalette = () => {
    const numberOfColors = getRandomSize(2, 4);
    return randomColor({ count: numberOfColors });
  };

  const getRandomSize = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000000" : "#FFFFFF";
  };

  const hexToRgba = (hex, alpha = 1) => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const applyColorPalette = (palette) => {
    if (!canvasInstance.current) return;
    const objects = canvasInstance.current.getObjects();

    // Apply background color
    const newBackgroundColor = palette[0];
    canvasInstance.current.setBackgroundColor(
      newBackgroundColor,
      canvasInstance.current.renderAll.bind(canvasInstance.current)
    );

    // Update the backgroundColor state
    setBackgroundColor(newBackgroundColor);

    // Helper function to apply color to an object
    const applyColorToObject = (obj, index) => {
      // Skip grid lines
      if (obj.id && obj.id.startsWith("grid-line")) return;
      if (obj.id && obj.id.startsWith("icon-")) return;

      const color1 = palette[index % palette.length];
      const color2 = palette[(index + 1) % palette.length];
      const useGradient = Math.random() > 0.5;

      if (obj.type === "textbox" || obj.type === "text") {
        if (useGradient) {
          const gradient = new fabric.Gradient({
            type: "linear",
            gradientUnits: "pixels",
            coords: { x1: 0, y1: 0, x2: obj.width, y2: obj.height },
            colorStops: [
              { offset: 0, color: hexToRgba(color1) },
              { offset: 1, color: hexToRgba(color2) },
            ],
          });
          obj.set({ fill: gradient });
        } else {
          obj.set({
            fill: getContrastColor(newBackgroundColor),
          });
        }
      } else {
        if (useGradient) {
          const gradient = new fabric.Gradient({
            type: "linear",
            gradientUnits: "pixels",
            coords: { x1: 0, y1: 0, x2: obj.width, y2: obj.height },
            colorStops: [
              { offset: 0, color: hexToRgba(color1) },
              { offset: 1, color: hexToRgba(color2) },
            ],
          });
          obj.set({ fill: gradient });
        } else {
          obj.set({ fill: color1 });
        }
      }
    };

    // Recursive function to handle grouped objects
    const applyColorToGroup = (group, index) => {
      group.forEach((groupObj, groupIndex) => {
        if (groupObj.type === "group") {
          applyColorToGroup(groupObj._objects, groupIndex);
        } else {
          applyColorToObject(groupObj, groupIndex);
        }
      });
    };

    objects.forEach((obj, index) => {
      if (obj.type === "group") {
        applyColorToGroup(obj._objects, index);
      } else {
        applyColorToObject(obj, index);
      }
    });

    canvasInstance.current.renderAll();
  };

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const updateSelectedColor = () => {
      const activeObjects = canvas.getActiveObjects();
      let commonFillColor = null;
      let commonStrokeColor = null;
      let fillId = null;
      let strokeId = null;

      if (activeObjects.length) {
        commonFillColor = activeObjects[0].fill;
        commonStrokeColor = activeObjects[0].stroke;
        fillId = activeObjects[0].fillColorStyleId || null;
        strokeId = activeObjects[0].strokeColorStyleId || null;

        activeObjects.forEach((obj) => {
          if (obj.fill !== commonFillColor) {
            commonFillColor = null;
            fillId = null;
          }
          if (obj.stroke !== commonStrokeColor) {
            commonStrokeColor = null;
            strokeId = null;
          }
        });
      }

      setCurrentColor(commonFillColor || "#000000");
      setCurrentStrokeColor(commonStrokeColor || "#000000");
      setCurrentColorId(fillId);
      setCurrentStrokeColorId(strokeId);
      setIsColorVisible(commonFillColor !== "transparent");
    };

    canvas.on("selection:created", updateSelectedColor);
    canvas.on("selection:updated", updateSelectedColor);
    canvas.on("selection:cleared", () => {
      setCurrentColor("#000000");
      setCurrentStrokeColor("#000000");
      setCurrentColorId(null);
      setCurrentStrokeColorId(null);
    });

    return () => {
      canvas.off("selection:created", updateSelectedColor);
      canvas.off("selection:updated", updateSelectedColor);
      canvas.off("selection:cleared");
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]);

  // Handler for color change
  const handleColorChange = (color, isStroke = false) => {
    const canvas = canvasInstance.current;
    const activeSelection = canvas.getActiveObject();

    // Always update the component state regardless of whether an object is selected
    if (isStroke) {
      setCurrentStrokeColor(color);
    } else {
      setCurrentColor(color);
    }

    // Function to apply color to an object
    const applyColor = (object) => {
      if (isStroke) {
        object.set("stroke", color);
        // Ensure we update the strokeColorStyleId only if it's already set
        if (object.strokeColorStyleId) {
          object.strokeColorStyleId = object.colorStyleId;
        }
      } else {
        object.set("fill", color);
        // Ensure we update the fillColorStyleId only if it's already set
        if (object.fillColorStyleId) {
          object.fillColorStyleId = object.colorStyleId;
        }
      }
    };

    // If there is an active selection, update its properties
    if (activeSelection) {
      if (activeSelection.type === "activeSelection") {
        // Apply color to all objects in the active selection
        activeSelection.getObjects().forEach((obj) => applyColor(obj));
      } else {
        // It's a single object, apply color directly
        applyColor(activeSelection);
      }
      canvas.renderAll();
    }
    setIsColorVisible(true);
  };

  const applyColorToSelectedObject = (color, id, isStroke = false) => {
    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();

    const applyColor = (object) => {
      if (isStroke) {
        object.set("stroke", color);
        object.strokeColorStyleId = id; // Associate with a style ID
      } else {
        object.set("fill", color);
        object.fillColorStyleId = id; // Associate with a style ID
      }
    };

    if (activeObject) {
      if (activeObject.type === "activeSelection") {
        activeObject.getObjects().forEach((obj) => applyColor(obj));
      } else {
        applyColor(activeObject);
      }
      canvas.renderAll();
    }

    // Update state regardless of selection
    if (isStroke) {
      setCurrentStrokeColor(color);
      setCurrentStrokeColorId(id);
    } else {
      setCurrentColor(color);
      setCurrentColorId(id);
    }
    setIsColorVisible(true);
  };

  const handleInputChange = (event, isStroke = false) => {
    let color = event.target.value;
    if (color && !color.startsWith("#")) {
      color = `#${color}`;
    }

    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();

    const applyColor = (object) => {
      if (isStroke) {
        object.set("stroke", color);
      } else {
        object.set("fill", color);
      }
    };

    if (activeObject) {
      if (activeObject.type === "activeSelection") {
        activeObject.getObjects().forEach((obj) => applyColor(obj));
      } else {
        applyColor(activeObject);
      }
      canvas.renderAll();
    }

    // Update state regardless of selection
    if (isStroke) {
      setCurrentStrokeColor(color);
    } else {
      setCurrentColor(color);
    }
    setIsColorVisible(true);
  };

  const updateObjectsWithStyle = () => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    styles.forEach((style) => {
      const objects = canvas.getObjects();
      objects.forEach((obj) => {
        if (obj.fillColorStyleId === style.id) {
          obj.set("fill", style.hexColor);
        }
        if (obj.strokeColorStyleId === style.id) {
          obj.set("stroke", style.hexColor);
        }
      });
    });
    canvas.renderAll();
  };

  const handleInputBGChange = (event) => {
    let color = event.target.value;
    // Ensure that the input starts with "#" if not empty
    if (color && !color.startsWith("#")) {
      color = `#${color}`;
    }

    // Update state with the corrected color value
    setBackgroundColor(color);

    // Additional validation or processing can be done here if necessary
    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set("fill", color);
      canvas.renderAll();
    }
  };

  // Update bold toggle state when a text object is selected
  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const updateTextProperties = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "textbox") {
        setTextWeight(activeObject.fontWeight);
        setTextSize(String(activeObject.fontSize));
        setTextLineHeight(String(activeObject.lineHeight));
        setTextStyle(activeObject.fontStyle);
        setTextFontFamily(activeObject.fontFamily);
        setTextUnderline(activeObject.underline);
        setTextId(activeObject.id); // Update textId with the ID of the selected object
      } else {
        // Reset text properties when no text box is selected
        setTextWeight("400");
        setTextSize("16");
        setTextStyle("regular");
        setTextLineHeight("1.2");
        setTextFontFamily("OpenSans");
        setTextUnderline(false);
        setTextId(null); // Reset textId when no object is selected
      }
    };

    // Attach event listeners
    canvas.on("selection:created", updateTextProperties);
    canvas.on("selection:updated", updateTextProperties);
    canvas.on("selection:cleared", updateTextProperties);

    // Clean up function to remove event listeners
    return () => {
      canvas.off("selection:created", updateTextProperties);
      canvas.off("selection:updated", updateTextProperties);
      canvas.off("selection:cleared", updateTextProperties);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]);
  //
  const handleUnderlineChange = () => {
    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const isUnderlined = activeObject.underline;
      activeObject.set("underline", !isUnderlined);
      canvas.renderAll();
      setTextUnderline(!isUnderlined); // Update the textUnderline state to reflect the change
    }
  };

  // Handler for text weight change
  const handleTextWeightChange = () => {
    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const newWeight = activeObject.fontWeight === "700" ? "400" : "700";

      // Apply the new font weight
      activeObject.set("fontWeight", newWeight);
      canvas.renderAll();
      setTextWeight(newWeight); // Update the textWeight state to reflect the change
    }
  };

  const handleTextSizeChange = (newSize) => {
    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fontSize", parseInt(newSize, 10));
      canvas.renderAll();
    }
    setTextSize(newSize);
  };

  const handleTextLineHeightChange = (newLineHeight) => {
    const lineHeightValue = parseFloat(newLineHeight);
    if (!isNaN(lineHeightValue) && lineHeightValue > 0) {
      // Ensuring it's a positive number
      const canvas = canvasInstance.current;
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "textbox") {
        activeObject.set("lineHeight", lineHeightValue);
        canvas.renderAll();
      }
      setTextLineHeight(newLineHeight);
    } else {
      console.error("Invalid input for line height.");
    }
  };

  const handleTextAlignmentChange = (alignment) => {
    const canvas = canvasInstance.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "textbox") {
        activeObject.set("textAlign", alignment);
        canvas.renderAll();
        setTextAlignment(alignment); // Update the alignment state
      }
    }
  };

  const handleFontFamilyChange = (newFontFamily) => {
    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fontFamily", newFontFamily);
      canvas.renderAll();
      setTextFontFamily(newFontFamily); // Update the state to reflect the change
    }
  };

  const handleTextStyleChange = () => {
    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      const newStyle =
        activeObject.fontStyle === "italic" ? "normal" : "italic"; // Toggle between 'italic' and 'normal'
      activeObject.set("fontStyle", newStyle);
      canvas.renderAll();
      setTextStyle(newStyle); // Update the state to reflect the change
    }
  };

  // Dedicated handler function for text ID changes
  const handleTextIdChange = (event) => {
    const newId = event.target.value;
    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("id", newId); // Set new ID to the active object
      canvas.renderAll();
      setTextId(newId); // Update state
    }
  };
  const handleIdChange = (event) => {
    const newId = event.target.value;
    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set("id", newId); // Set new ID to the active object
      canvas.renderAll();
      setId(newId); // Update state
    }
  };

  //

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const updateObjSize = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        // Set padding and strokeWidth to zero to avoid extra space
        activeObject.set({
          padding: 0,
          // strokeWidth: 0,
        });

        // Update width and height based on the scaling factors
        setObjWidth(Math.round(activeObject.getScaledWidth()));
        setObjHeight(Math.round(activeObject.getScaledHeight()));

        // Update object size to reflect changes immediately
        activeObject.setCoords();
        canvas.renderAll();
      }
    };

    canvas.on("object:modified", updateObjSize);
    canvas.on("object:scaling", updateObjSize);
    canvas.on("selection:created", updateObjSize);
    canvas.on("selection:updated", updateObjSize);

    return () => {
      // Clean up event listeners
      canvas.off("object:modified", updateObjSize);
      canvas.off("object:scaling", updateObjSize);
      canvas.off("selection:created", updateObjSize);
      canvas.off("selection:updated", updateObjSize);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]);

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const updateSelectedObjectId = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        setId(activeObject.id || ""); // Update state with the active object's ID
      } else {
        setId(""); // Clear ID if no object is selected
      }
    };

    canvas.on("selection:created", updateSelectedObjectId);
    canvas.on("selection:updated", updateSelectedObjectId);
    canvas.on("selection:cleared", updateSelectedObjectId);

    return () => {
      // Clean up event listeners
      canvas.off("selection:created", updateSelectedObjectId);
      canvas.off("selection:updated", updateSelectedObjectId);
      canvas.off("selection:cleared", updateSelectedObjectId);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current, id]);

  const handleObjHeightChange = (event) => {
    const newHeight = parseInt(event.target.value, 10);
    if (!isNaN(newHeight)) {
      setObjHeight(newHeight); // Assuming there's a corresponding state setter like setHeight
      const canvas = canvasInstance.current;
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set({ height: newHeight / activeObject.scaleY }); // Adjust height considering the scale
        canvas.renderAll();
      }
    }
  };

  const handleObjWidthChange = (event) => {
    const newWidth = parseInt(event.target.value, 10);
    if (!isNaN(newWidth)) {
      setObjWidth(newWidth); // Assuming there's a corresponding state setter like setWidth
      const canvas = canvasInstance.current;
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set({ width: newWidth / activeObject.scaleX }); // Adjust width considering the scale
        canvas.renderAll();
      }
    }
  };

  // const handleObjScaleXChange = (event) => {
  //   const newScaleX = parseFloat(event.target.value);
  //   if (!isNaN(newScaleX)) {
  //     const roundedScaleX = Math.round(newScaleX * 100) / 100; // Round to two decimal places
  //     setObjScaleX(roundedScaleX); // Assuming there's a corresponding state setter
  //     const canvas = canvasInstance.current;
  //     const activeObject = canvas.getActiveObject();
  //     if (activeObject) {
  //       activeObject.set({ scaleX: roundedScaleX });
  //       canvas.renderAll();
  //     }
  //   }
  // };

  // const handleObjScaleYChange = (event) => {
  //   const newScaleY = parseFloat(event.target.value);
  //   if (!isNaN(newScaleY)) {
  //     const roundedScaleY = Math.round(newScaleY * 100) / 100; // Round to two decimal places
  //     setObjScaleY(roundedScaleY); // Assuming there's a corresponding state setter
  //     const canvas = canvasInstance.current;
  //     const activeObject = canvas.getActiveObject();
  //     if (activeObject) {
  //       activeObject.set({ scaleY: roundedScaleY });
  //       canvas.renderAll();
  //     }
  //   }
  // };

  //

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const updateCircleRadius = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "circle") {
        // Update radius based on the scaling factor, assuming uniform scaling
        setCircleRadius(Math.round(activeObject.radius * activeObject.scaleX)); // Assuming uniform scaling
      }
    };

    canvas.on("object:modified", updateCircleRadius);
    canvas.on("object:scaling", updateCircleRadius);
    canvas.on("selection:created", updateCircleRadius);
    canvas.on("selection:updated", updateCircleRadius);

    return () => {
      // Clean up event listeners
      canvas.off("object:modified", updateCircleRadius);
      canvas.off("object:scaling", updateCircleRadius);
      canvas.off("selection:created", updateCircleRadius);
      canvas.off("selection:updated", updateCircleRadius);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]); // Dependency on the canvas instance

  const handleCircleRadiusChange = (event) => {
    const newRadius = parseInt(event.target.value, 10);
    if (!isNaN(newRadius) && newRadius > 0) {
      setCircleRadius(newRadius); // Update the state
      const canvas = canvasInstance.current;
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "circle") {
        activeObject.set({
          radius:
            newRadius / Math.max(activeObject.scaleX, activeObject.scaleY), // Adjust radius considering the scale
        });
        canvas.renderAll();
      }
    }
  };

  //

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const updateObjectProperties = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        setPositionX(activeObject.left); // Update X position
        setPositionY(activeObject.top); // Update Y position
        setRotationAngle(activeObject.angle); // Update rotation angle
        setOpacity(Math.round(activeObject.opacity * 100));
        // setObjScaleX(activeObject.scaleX);
        // setObjScaleY(activeObject.scaleY);
      }
    };

    canvas.on("object:modified", updateObjectProperties);
    canvas.on("object:moving", updateObjectProperties);
    canvas.on("object:rotating", updateObjectProperties);
    canvas.on("selection:created", updateObjectProperties);
    canvas.on("selection:updated", updateObjectProperties);

    return () => {
      canvas.off("object:modified", updateObjectProperties);
      canvas.off("object:moving", updateObjectProperties);
      canvas.off("object:rotating", updateObjectProperties);
      canvas.off("selection:created", updateObjectProperties);
      canvas.off("selection:updated", updateObjectProperties);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]); // Ensuring this runs only when the canvas instance changes

  const handlePositionXChange = (event) => {
    const inputVal = event.target.value;
    const newX = parseInt(inputVal, 10);
    if (!isNaN(newX)) {
      setPositionX(newX);
    } else if (inputVal === "") {
      setPositionX(0); // Set position to 0 if input is empty
    }

    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set({ left: isNaN(newX) ? 0 : newX });
      canvas.renderAll();
    }
  };

  const handlePositionYChange = (event) => {
    const inputVal = event.target.value;
    const newY = parseInt(inputVal, 10);
    if (!isNaN(newY)) {
      setPositionY(newY);
    } else if (inputVal === "") {
      setPositionY(0); // Set position to 0 if input is empty
    }

    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set({ top: isNaN(newY) ? 0 : newY });
      canvas.renderAll();
    }
  };

  const handleRotationAngleChange = (event) => {
    const inputVal = event.target.value;
    const newAngle = parseFloat(inputVal);
    if (!isNaN(newAngle)) {
      setRotationAngle(newAngle);
    } else if (inputVal === "") {
      setRotationAngle(0); // Set rotation angle to 0 if input is empty
    }

    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set({ angle: isNaN(newAngle) ? 0 : newAngle });
      canvas.renderAll();
    }
  };

  //

  // Highlighting function, called when a layer item is clicked
  const highlightObjectInCanvas = (id) => {
    const canvas = canvasInstance.current;
    if (canvas) {
      const objectToHighlight = canvas
        .getObjects()
        .find((obj) => obj.id === id);
      if (objectToHighlight) {
        if (objectToHighlight.selectable) {
          canvas.setActiveObject(objectToHighlight);
          canvas.renderAll();
        } else {
          // Optionally clear the active object or handle differently if the object is not selectable
          canvas.discardActiveObject(); // This will remove any active selection
          canvas.renderAll();
        }
        setActiveLayerId(id); // Still set this to reflect the focus in UI even if not selectable
      }
    }
  };

  const addCircle = () => {
    const fillColor = getRandomColor();

    const circle = new fabric.Circle({
      radius: 50,
      fill: fillColor,
      left: 100,
      top: 100,
      label: "Circle", // Label to show in layer list
      id: `circle-${Date.now()}`,
      strokeUniform: true,
    });

    canvasInstance.current.add(circle);
    updateImageObjectsOrder(); // Update layer names
  };

  // Toggle drawing mode for lines
  const toggleDrawingMode = () => {
    setIsDrawing(!isDrawing);
    const canvas = canvasInstance.current;
    if (canvas) {
      canvas.isDrawingMode = false;
    }
  };
  // useEffect to attach scaling behavior to all line objects on the canvas
  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const updateLineScaling = (line) => {
      line.on("scaling", function (e) {
        // Calculate new endpoints from the current pointer position
        const pointer = canvas.getPointer(e.e);
        this.set({
          x2: pointer.x,
          y2: pointer.y,
          scaleX: 1, // Reset scaling to prevent actual scaling
          scaleY: 1,
        });
      });
    };

    canvas.forEachObject((obj) => {
      if (obj.type === "line") {
        updateLineScaling(obj);
      }
    });

    // Attach this behavior to line objects when they are added
    canvas.on("object:added", (e) => {
      if (e.target.type === "line") {
        updateLineScaling(e.target);
      }
    });

    return () => {
      // Clean up event listeners if the component unmounts
      canvas.off("object:added");
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]); // Dependency on the canvas instance

  // Your existing startDrawing function
  const startDrawing = (options) => {
    const strokeColor = getRandomColor();

    if (!isDrawing) return;
    const canvas = canvasInstance.current;
    const pointer = canvas.getPointer(options.e);
    const points = [pointer.x, pointer.y, pointer.x, pointer.y];
    const newLine = new fabric.Line(points, {
      strokeWidth: lineThickness || 4,
      stroke: strokeColor,
      selectable: true,
      hasBorders: false,
      hasControls: true,
      perPixelTargetFind: true,
      label: "Line",
      id: `line-${Date.now()}`,
    });

    canvas.add(newLine);
    setLine(newLine);
  };

  // Update the line as the mouse moves
  const drawLine = (options) => {
    if (!line) return;
    const pointer = canvasInstance.current.getPointer(options.e);
    line.set({ x2: pointer.x, y2: pointer.y });
    line.setCoords();
    canvasInstance.current.renderAll();
  };

  // Finish drawing when the mouse is released
  const finishDrawing = () => {
    if (line) {
      line.setCoords();
      setLine(null);
      updateImageObjectsOrder();
      setLineThickness(4);
      setIsDrawing(false);
    }
  };

  // Add event listeners for drawing
  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    // Attach mouse event listeners
    canvas.on("mouse:down", startDrawing);
    canvas.on("mouse:move", drawLine);
    canvas.on("mouse:up", finishDrawing);

    return () => {
      // Clean up event listeners
      canvas.off("mouse:down", startDrawing);
      canvas.off("mouse:move", drawLine);
      canvas.off("mouse:up", finishDrawing);
    };
    // eslint-disable-next-line
  }, [finishDrawing]);

  // Change line thickness
  const handleLineThicknessChange = (event) => {
    const canvas = canvasInstance.current;
    const thickness = parseInt(event.target.value, 10);

    if (!isNaN(thickness)) {
      setLineThickness(thickness); // Update the state regardless of selection status

      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        // Check if the object is one of the types that support stroke width
        const typesWithStroke = [
          "line",
          "rect",
          "circle",
          "textbox",
          "triangle",
          "path",
        ];
        if (typesWithStroke.includes(activeObject.type)) {
          activeObject.set({
            strokeWidth: thickness,
            strokeUniform: true,
          });
          canvas.renderAll();
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const updateBorderThickness = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        let thickness = 0;
        const typesWithStroke = [
          "line",
          "rect",
          "circle",
          "textbox",
          "triangle",
          "path",
        ];
        if (typesWithStroke.includes(activeObject.type)) {
          thickness =
            activeObject.strokeWidth !== undefined
              ? activeObject.strokeWidth
              : 0;
        }
        setLineThickness(thickness);
      } else {
        setLineThickness(0);
      }
    };

    // Attach event listeners for object selection and object modification
    canvas.on("selection:created", updateBorderThickness);
    canvas.on("selection:updated", updateBorderThickness);
    canvas.on("object:modified", updateBorderThickness);

    return () => {
      // Clean up event listeners
      canvas.off("selection:created", updateBorderThickness);
      canvas.off("selection:updated", updateBorderThickness);
      canvas.off("object:modified", updateBorderThickness);
    };
  }, [isObjSelected]);

  // /////////////////////////////////////
  // Generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  //
  const addRectangle = () => {
    const fillColor = getRandomColor();

    const rectangle = new fabric.Rect({
      width: 100,
      height: 60,
      fill: fillColor,
      left: 150,
      top: 150,
      label: "Rect", // Label to show in layer list
      id: `rect-${Date.now()}`,
      strokeUniform: true,
    });

    canvasInstance.current.add(rectangle);
    canvasInstance.current.sendToBack(rectangle);
    updateImageObjectsOrder(); // Update layer names
  };

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const selectAndUpdateRectRadius = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        let radius = 0;
        if (activeObject.type === "image") {
          radius = activeObject.clipPath ? activeObject.clipPath.rx : 0;
        } else if (activeObject.type === "rect") {
          radius = activeObject.rx !== undefined ? activeObject.rx : 0;
        }
        setBorderRadius(radius);
        setInitialRadius(radius);
        setObjHeight(activeObject.getScaledHeight());
      } else {
        setBorderRadius(0);
      }
    };

    // Attach event listeners for object selection and object modification
    canvas.on("selection:created", selectAndUpdateRectRadius);
    canvas.on("selection:updated", selectAndUpdateRectRadius);
    canvas.on("object:modified", selectAndUpdateRectRadius);

    return () => {
      // Clean up event listeners
      canvas.off("selection:created", selectAndUpdateRectRadius);
      canvas.off("selection:updated", selectAndUpdateRectRadius);
      canvas.off("object:modified", selectAndUpdateRectRadius);
    };
  }, [isObjSelected]);

  const handleBorderRadiusChange = (newRadiusInput) => {
    const newRadius = parseFloat(newRadiusInput);
    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const radius = isNaN(newRadius) ? 0 : newRadius;
      setBorderRadius(radius);

      if (activeObject.type === "image") {
        // Create a clipping path for images
        const clipPath = new fabric.Rect({
          width: activeObject.width,
          height: activeObject.height,
          scaleX: 1,
          scaleY: 1,
          rx: radius,
          ry: radius,
          originX: "center",
          originY: "center",
        });

        // Apply the clipping path to the active object
        activeObject.set({
          clipPath: clipPath,
          dirty: true,
        });
      } else if (activeObject.type === "rect") {
        // Directly set the border radius for rectangles
        activeObject.set({
          rx: radius,
          ry: radius,
        });
      }

      canvas.renderAll();
    }
  };

  useEffect(() => {
    // Update event listeners based on scaleMode
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const handleObjectModified = (options) => {
      const obj = options.target;

      if (!obj) return;

      if (obj.type === "rect" && !scaleMode) {
        // Directly adjust width and height, ensuring they are integers
        const newWidth = Math.round(obj.width * obj.scaleX);
        const newHeight = Math.round(obj.height * obj.scaleY);
        obj.set({
          width: newWidth,
          height: newHeight,
          scaleX: 1,
          scaleY: 1,
          left: Math.round(obj.left),
          top: Math.round(obj.top),
          rx: initialRadius,
          ry: initialRadius,
        });
        canvas.renderAll();
      }

      if (obj.type === "circle" && !scaleMode) {
        // Adjust the radius based on the scale, rounding to the nearest integer
        const newRadius = Math.round(
          obj.radius * Math.max(obj.scaleX, obj.scaleY)
        ); // Use the larger scale factor to preserve the circle's shape

        // Directly adjust the radius and reset the scales
        obj.set({
          radius: newRadius,
          scaleX: 1,
          scaleY: 1,
          left: Math.round(obj.left),
          top: Math.round(obj.top),
        });
        canvas.renderAll();
      }
    };

    // Handle object scaling to snap to pixel grid
    const handleObjectScaling = (e) => {
      const obj = e.target;
      if (obj) {
        const roundedWidth = Math.round(obj.width * obj.scaleX);
        const roundedHeight = Math.round(obj.height * obj.scaleY);

        obj.scaleX = roundedWidth / obj.width;
        obj.scaleY = roundedHeight / obj.height;
        obj.left = Math.round(obj.left);
        obj.top = Math.round(obj.top);

        setIconWidth(roundedWidth);
        setIconHeight(roundedHeight);

        canvasInstance.current.renderAll();
      }
    };

    canvas.on("object:modified", handleObjectModified);
    canvas.on("object:scaling", handleObjectScaling);

    return () => {
      canvas.off("object:modified", handleObjectModified);
      canvas.off("object:scaling", handleObjectScaling);
    };
    // eslint-disable-next-line
  }, [scaleMode, initialRadius, canvasInstance.current]);

  // useEffect(() => {
  //   // Update event listeners based on scaleMode
  //   const canvas = canvasInstance.current;
  //   if (!canvas) return;

  //   // Handle object scaling to snap to pixel grid
  //   const handleObjectScaling2 = (e) => {
  //     const obj = e.target;
  //     if (obj && obj.type === "image" && obj.clipPath) {
  //       const roundedWidth = Math.round(obj.width * obj.scaleX);
  //       const roundedHeight = Math.round(obj.height * obj.scaleY);

  //       obj.clipPath.set({
  //         width: roundedWidth,
  //         height: roundedHeight,
  //       });

  //       canvasInstance.current.renderAll();
  //     }
  //   };

  //   canvas.on("object:scaling", handleObjectScaling2);

  //   return () => {
  //     canvas.off("object:scaling", handleObjectScaling2);
  //   };
  //   // eslint-disable-next-line
  // }, [canvasInstance.current]);
  //
  // snap while rotating
  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const snapToPixelGrid = (obj) => {
      obj.left = Math.round(obj.left);
      obj.top = Math.round(obj.top);

      canvas.renderAll();
    };

    const snapAngle = (obj) => {
      obj.angle = Math.round(obj.angle);
      canvas.renderAll();
    };

    const handleObjectModified = (options) => {
      const obj = options.target;
      if (obj) {
        snapToPixelGrid(obj);
      }
    };

    const handleObjectRotating = (e) => {
      const obj = e.target;
      if (obj) {
        snapAngle(obj);
        snapToPixelGrid(obj);
      }
    };

    canvas.on("object:modified", handleObjectModified);
    canvas.on("object:rotating", handleObjectRotating);

    return () => {
      canvas.off("object:modified", handleObjectModified);
      canvas.off("object:rotating", handleObjectRotating);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]);

  const addText = () => {
    const text = new fabric.Textbox("Text", {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 20,
      fill: "#000000",
      fontFamily: "OpenSans",
      textAlign: "left",
      editable: true,
      id: `text-${Date.now()}`,
      label: "text",
      fontWeight: 400,
      lockScalingFlip: true,
      lockScalingX: false,
      lockScalingY: false,
      strokeWidth: 0,
    });

    canvasInstance.current.add(text);
    canvasInstance.current.bringToFront(text); // bring the text to the front if needed
    updateImageObjectsOrder(); // Update layer names
  };

  //

  const addNewImageObject = () => {
    fileInputIMGRef.current.click(); // Trigger file input when the menu item is clicked
  };
  // eslint-disable-next-line
  const [isStatic, setIsStatic] = useState(false);

  const handleFileIMGChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (fEvent) => {
        const img = new Image();
        img.onload = () => {
          // Calculate the scale factor to resize the image to 70% of the canvas width
          const canvasWidth = canvasInstance.current.width;
          const scaleFactor = (canvasWidth * 0.7) / img.width;

          const fabricImg = new fabric.Image(img, {
            left: 50,
            top: 50,
            angle: 0,
            rx: 0,
            ry: 0,
            selectable: true,
            id: `image-${Date.now()}`, // Unique ID based on the current timestamp
            label: "Image", // Label for the image
            scaleX: scaleFactor, // Scale the image to 70% of the canvas width
            scaleY: scaleFactor, // Maintain aspect ratio
          });
          canvasInstance.current.add(fabricImg);
          canvasInstance.current.renderAll();
          updateImageObjectsOrder();
        };
        img.src = fEvent.target.result;
      };
      reader.readAsDataURL(file);
    }
    event.target.value = ""; // Clear the input after processing
  };

  const handleCheckboxChange = () => {
    const canvas = canvasInstance.current;
    const activeObject = canvas.getActiveObject();
    const isChecked =
      activeObject && activeObject.id && !activeObject.id.endsWith("-static-");
    if (activeObject) {
      let newId = activeObject.id;
      if (isChecked) {
        if (!newId.endsWith("-static-")) {
          newId += "-static-";
        }
      } else {
        newId = newId.replace("-static-", "");
      }
      activeObject.set("id", newId);
      canvasInstance.current.renderAll();
      setIsStatic(isChecked);
    }
  };

  const updateSelectedImageObject = (imageUrl) => {
    if (selectedImageObject && selectedImageObject.type === "image") {
      fabric.Image.fromURL(imageUrl, (newImg) => {
        newImg.set({
          left: selectedImageObject.left,
          top: selectedImageObject.top,
          scaleX: selectedImageObject.scaleX,
          scaleY: selectedImageObject.scaleY,
          angle: selectedImageObject.angle,
        });
        canvasInstance.current.remove(selectedImageObject);
        canvasInstance.current.add(newImg);
        canvasInstance.current.renderAll();
        setSelectedImageObject(newImg);
      });
    }
  };

  // useEffect(() => {
  //   const onObjectSelected = () => {
  //     const activeObject = canvasInstance.current.getActiveObject();
  //     if (activeObject) {
  //       setIsStatic(activeObject.id.endsWith("-static-"));
  //     }
  //   };

  //   canvasInstance.current.on("selection:created", onObjectSelected);
  //   canvasInstance.current.on("selection:updated", onObjectSelected);

  //   return () => {
  //     canvasInstance.current.off("selection:created", onObjectSelected);
  //     canvasInstance.current.off("selection:updated", onObjectSelected);
  //   };
  // }, []);

  //
  useEffect(() => {
    // Update the canvas properties when related states change
    const canvas = canvasInstance.current;
    if (canvas) {
      canvas.backgroundColor = backgroundColor;

      if (backgroundImage) {
        fabric.Image.fromURL(backgroundImage, (img) => {
          img.scaleToWidth(canvas.width);
          img.scaleToHeight(canvas.height);
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        });
      } else {
        canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
      }

      canvas.renderAll();

      if (canvas) {
        canvas.on("selection:created", () => {
          setIsObjSelected(true); // Set true when an object is selected
        });

        canvas.on("selection:cleared", () => {
          setIsObjSelected(false); // Set false when no object is selected
        });

        canvas.on("selection:updated", () => {
          setIsObjSelected(true); // Keep true when selection is updated
        });
      }
    }
  }, [
    backgroundColor,
    backgroundImage,
    // fontFamily,
  ]);

  const handleBackgroundUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const imageTextureSize = Math.max(img.width, img.height);
          if (imageTextureSize > fabric.textureSize) {
            fabric.textureSize = imageTextureSize;
          }
          setBackgroundImage(e.target.result);
          setBackgroundImageSource("upload");
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadTemplate = (local) => {
    const canvas = canvasInstance.current;
    if (canvas) {
      const serializeObject = (obj) => {
        const commonProperties = {
          id: obj.id,
          type: obj.type,
          left: obj.left,
          top: obj.top,
          label: obj.label,
          angle: obj.angle,
          zIndex: obj.canvas ? obj.canvas.getObjects().indexOf(obj) : 1, // Include zIndex in the export
          fillColorStyleId: obj.fillColorStyleId,
          strokeColorStyleId: obj.strokeColorStyleId,
          selectable: obj.selectable,
          visible: obj.visible,
          opacity: obj.opacity,
          shadow: obj.shadow
            ? {
                color: obj.shadow.color,
                blur: obj.shadow.blur,
                offsetX: obj.shadow.offsetX,
                offsetY: obj.shadow.offsetY,
              }
            : undefined,
        };

        if (obj.type === "image") {
          const src = obj.originalSrc || obj.toDataURL();

          return {
            ...commonProperties,
            src: src,
            scaleX: 1,
            scaleY: 1,
            width: obj.width * obj.scaleX, // Adjusted for scale
            height: obj.height * obj.scaleY, // Adjusted for scale
            filters: obj.filters
              ? obj.filters.map((filter) => ({
                  type: filter.type,
                  ...filter, // include filter properties
                }))
              : [],
            globalCompositeOperation: obj.globalCompositeOperation,
            clipPath: obj.clipPath
              ? {
                  rx: obj.clipPath.rx,
                  ry: obj.clipPath.ry,
                  width: obj.clipPath.width,
                  height: obj.clipPath.height,
                  originX: obj.clipPath.originX,
                  originY: obj.clipPath.originY,
                }
              : undefined,
          };
        } else if (obj.type === "textbox") {
          return {
            ...commonProperties,
            fontSize: obj.fontSize,
            fontFamily: obj.fontFamily,
            lineHeight: obj.lineHeight,
            width: obj.width,
            fill: obj.fill,
            text: obj.text,
            textAlign: obj.textAlign,
            fontStyle: obj.fontStyle,
            fontWeight: obj.fontWeight,
            scaleX: obj.scaleX,
            scaleY: obj.scaleY,
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
            underline: obj.underline,
          };
        } else if (obj.type === "circle") {
          return {
            ...commonProperties,
            fill: obj.fill,
            stroke: obj.stroke, // Color of the line
            strokeWidth: obj.strokeWidth, // Width of the line
            scaleX: obj.scaleX,
            scaleY: obj.scaleY,
            radius: obj.radius,
          };
        } else if (obj.type === "rect") {
          return {
            ...commonProperties,
            fill: obj.fill,
            scaleX: obj.scaleX,
            scaleY: obj.scaleY,
            ry: obj.ry,
            rx: obj.rx,
            width: obj.width,
            height: obj.height,
            stroke: obj.stroke, // Color of the line
            strokeWidth: obj.strokeWidth, // Width of the line
          };
        } else if (obj.type === "triangle") {
          return {
            ...commonProperties,
            fill: obj.fill,
            scaleX: obj.scaleX,
            scaleY: obj.scaleY,
            width: obj.width,
            height: obj.height,
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
          };
        } else if (obj.type === "line") {
          return {
            ...commonProperties,
            x1: obj.x1,
            y1: obj.y1,
            x2: obj.x2,
            y2: obj.y2,
            stroke: obj.stroke, // Color of the line
            strokeWidth: obj.strokeWidth, // Width of the line
          };
        } else if (
          obj.type === "path" &&
          obj.id &&
          (obj.id.startsWith("star-") || obj.id.startsWith("icon-"))
        ) {
          const pathData = obj.toSVG();
          return {
            ...commonProperties,
            path: pathData, // SVG path data
            width: obj.width,
            height: obj.height,
            scaleX: obj.scaleX,
            scaleY: obj.scaleY,
            fill: obj.fill,
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
          };
        } else if (
          (obj.type === "path" &&
            obj.id &&
            (!obj.id.startsWith("star-") || !obj.id.startsWith("icon-"))) ||
          obj.type === "group"
        ) {
          const pathData = obj.toSVG();
          return {
            ...commonProperties,
            path: pathData, // SVG path data
            scaleX: 1,
            scaleY: 1,
            autoLayout: obj.autoLayout,
            alignment: obj.alignment,
            gap: obj.gap,
            layoutDirection: obj.layoutDirection,
            objects:
              obj.type === "group"
                ? obj._objects.map(serializeObject)
                : undefined,
          };
        } else {
          return commonProperties;
        }
      };

      const templateData = {
        width: canvas.width,
        height: canvas.height,
        objects: canvas
          .getObjects()
          .filter((obj) => !obj.id?.startsWith("grid-line-"))
          .map(serializeObject),
        backgroundColor: canvas.backgroundColor,
        ...(canvas.backgroundImage && {
          backgroundImage: canvas.backgroundImage.toDataURL(),
        }),
      };

      if (local) {
        localStorage.setItem("fabricCanvas", JSON.stringify(templateData));
        console.log("Canvas saved to local storage");
      } else {
        const jsonBlob = new Blob([JSON.stringify(templateData)], {
          type: "application/json",
        });
        saveAs(jsonBlob, `${templateName}-template.json`);
      }
    }
  };

  // for adding canvases

  // Function to handle Google Sheets URL change
  const handleSheetUrlChange = (e) => {
    setSheetUrl(e.target.value);
  };

  const handleSubmit = async () => {
    const csvUrl = convertToCsvUrl(sheetUrl);
    if (csvUrl) {
      try {
        const response = await fetch(csvUrl);
        const text = await response.text();
        parse(text, {
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              setDataLoaded(true);
              const dataWithIds = results.data.map((row, index) => ({
                id: index + 1,
                ...row,
              }));

              // Save data to local storage
              localStorage.setItem("tableData", JSON.stringify(dataWithIds));

              setTableData(dataWithIds);
              const headers = Object.keys(results.data[0]).map((key) => ({
                Header: key,
                accessor: key,
              }));
              // Ensure ID column is always included and not duplicated
              const idColumn = { Header: "ID", accessor: "id" };
              const updatedHeaders = headers.some(
                (header) => header.accessor === "id"
              )
                ? headers
                : [idColumn, ...headers];

              setColumns([
                ...updatedHeaders,
                {
                  Header: "Actions",
                  accessor: "actions",
                  Cell: (value, row) => (
                    <IconButton
                      onClick={() => handleDeleteRow(row)}
                      aria-label="Delete Row"
                      size="small"
                      variant="ghost"
                    >
                      <TrashIcon />
                    </IconButton>
                  ),
                  maxWidth: "40px",
                },
              ]);

              generateCanvases(dataWithIds);
            } else {
              setDataLoaded(false);
            }
          },
          header: true,
        });
      } catch (error) {
        setDataLoaded(false);
        console.error("Error loading data:", error);
        alert("Failed to load data. Please check the console for errors.");
      }
    } else {
      setDataLoaded(false);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("tableData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.length > 0) {
        setTableData(parsedData);
        const headers = Object.keys(parsedData[0]).map((key) => ({
          Header: key,
          accessor: key,
        }));

        // Ensure ID column is always included and not duplicated
        const idColumn = { Header: "ID", accessor: "id" };
        const updatedHeaders = headers.some(
          (header) => header.accessor === "id"
        )
          ? headers
          : [idColumn, ...headers];

        setColumns([
          ...updatedHeaders,
          {
            Header: "Actions",
            accessor: "actions",
            Cell: (value, row) => (
              <IconButton
                onClick={() => handleDeleteRow(row)}
                aria-label="Delete Row"
                size="small"
                variant="ghost"
              >
                <TrashIcon />
              </IconButton>
            ),
            maxWidth: "40px",
          },
        ]);
        // generateCanvases(parsedData);
        setDataLoaded(true);
      }
    }
    // eslint-disable-next-line
  }, []);

  const handleTableDataChange = (updatedData) => {
    setTableData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData)); // Update local storage
    generateCanvases(updatedData);
  };

  const handleRefresh = () => {
    generateCanvases(tableData);
  };

  const handleDownload = () => {
    const data = JSON.parse(localStorage.getItem("tableData"));
    const headers = Object.keys(data[0]);
    const csvData = data.map((row) => headers.map((key) => row[key]).join(","));
    const csvContent = [
      headers.join(","), // Join headers first
      ...csvData,
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data.csv");
  };

  const handleDeleteRow = (row) => {
    const storedData = JSON.parse(localStorage.getItem("tableData"));
    const newData = storedData.filter((dataRow) => dataRow.id !== row.id);
    localStorage.setItem("tableData", JSON.stringify(newData));
    setTableData(newData);
    if (newData.length === 0) {
      setColumns([]); // Clear columns when no data
    }
    generateCanvases(newData);
  };

  const handleAddRow = () => {
    // Ensure all current IDs are numeric and find the maximum ID value
    const maxId = tableData.reduce((max, row) => {
      const id = parseInt(row.id, 10);
      return !isNaN(id) && id > max ? id : max;
    }, 0);

    // Create a new row with sample text for all columns and the next ID
    const newRow = columns.reduce(
      (acc, col) => ({
        ...acc,
        [col.accessor]:
          col.accessor === "id" ? maxId + 1 : `Sample ${col.accessor}`,
      }),
      {}
    );

    // Update the table data
    const updatedData = [...tableData, newRow];
    setTableData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
    generateCanvases(updatedData);
  };

  const handleCellEdit = (row) => {
    document.querySelectorAll(".fabric-canvas-container").forEach((el) => {
      el.classList.remove("active");
    });
    const canvasContainer = document.getElementById(
      `canvas-container-${row.id}`
    );
    if (canvasContainer) {
      canvasContainer.classList.add("active");
      scrollToCanvas(canvasContainer);
    }
  };

  const scrollToCanvas = (canvasContainer) => {
    // Reset scale to a default (e.g., 1) and set initial translation to zero
    const initialScale = 1;
    const initialTranslation = { x: 0, y: 0 };
    setScale(initialScale);
    setTranslation(initialTranslation);

    // Recalculate positions after resetting
    setTimeout(() => {
      // Get the bounding rectangle of the canvas container within the viewport
      const rect = canvasContainer.getBoundingClientRect();

      // Calculate center position of the canvas container
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Get the bounding rectangle of the CanvasWrapper element
      const canvasWrapper = document.querySelector(".CanvasWrapper");
      const wrapperRect = canvasWrapper.getBoundingClientRect();

      // Calculate the desired center point using the CanvasWrapper's dimensions
      const desiredCenterX = wrapperRect.left + wrapperRect.width / 2;
      const desiredCenterY = wrapperRect.top + wrapperRect.height / 2;

      // Adjust translation based on the current scale
      const newTranslation = {
        x: initialTranslation.x + (desiredCenterX - centerX) / initialScale,
        y: initialTranslation.y + (desiredCenterY - centerY) / initialScale,
      };

      // Update the translation to recenter the map
      setTranslation(newTranslation);
    }, 0); // setTimeout to allow for scale and translation reset to take effect
  };

  const handleAddColumn = () => {
    const newColumn = {
      Header: `newColumn${columns.length + 1}`,
      accessor: `newColumn${columns.length + 1}`,
    };

    // Insert the new column before the last column
    const updatedColumns = [
      ...columns.slice(0, columns.length - 1),
      newColumn,
      columns[columns.length - 1],
    ];

    setColumns(updatedColumns);

    const updatedData = tableData.map((row) => ({
      ...row,
      [newColumn.accessor]: "",
    }));

    setTableData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
    generateCanvases(updatedData);
  };

  // Function to convert Google Sheets URL to CSV URL
  const convertToCsvUrl = (url) => {
    const matches = url.match(/\/d\/(.+)\/edit/);
    if (matches && matches[1]) {
      return `https://docs.google.com/spreadsheets/d/${matches[1]}/gviz/tq?tqx=out:csv`;
    }
    return null;
  };

  const toggleEditMode = (canvasID) => {
    // console.log(`Toggling edit mode for canvas: ${canvasID}`);
    const canvas = populatedCanvasRefs.current.find(
      (c) => c.lowerCanvasEl.id === canvasID
    );
    if (canvas) {
      const isSelectable = !canvas.getObjects()[0].selectable;
      // console.log(`Setting selectable to: ${isSelectable}`);
      canvas.getObjects().forEach((obj) => {
        obj.set({
          selectable: isSelectable,
          evented: isSelectable,
        });
        if (obj.type === "textbox") {
          obj.set({ editable: true }); // Lock text editing
        }
      });
      canvas.renderAll();
    }
  };

  // Function to generate multiple canvases with data from Google Sheets
  const populateCanvases = (data) => {
    if (!data || data.length === 0) return;

    const canvasContainer = document.getElementById("canvas-container");

    // Clear existing canvases before generating new ones
    canvasContainer.innerHTML = "";
    populatedCanvasRefs.current = [];

    data.forEach((row, index) => {
      // Create a new div for each fabric canvas
      const fabricCanvasContainer = document.createElement("div");
      fabricCanvasContainer.className = "fabric-canvas-container";
      fabricCanvasContainer.id = `canvas-container-${row.id}`;

      canvasContainer.appendChild(fabricCanvasContainer);

      // Create an IconButton element
      const toggle = document.createElement("div");
      toggle.className = "icon-button-container";
      fabricCanvasContainer.appendChild(toggle);

      const canvasID = `populated-canvas-${index}`;

      // Create a root using the newly created toggle element
      const root = createRoot(toggle);

      root.render(
        <Toggle
          onPressedChange={() => toggleEditMode(canvasID)}
          aria-label="Edit Canvas"
        >
          <Pencil2Icon />
        </Toggle>
      );

      // Create a new canvas element
      const canvasElement = document.createElement("canvas");
      canvasElement.id = canvasID;
      fabricCanvasContainer.appendChild(canvasElement);

      // Create a label for the canvas
      const canvasLabel = document.createElement("label");
      canvasLabel.innerHTML = `Row ${index + 1}`;
      canvasLabel.className = "canvas-label"; // Add a class if you need specific styling
      fabricCanvasContainer.appendChild(canvasLabel);

      // Initialize a new fabric canvas
      const canvas = new fabric.Canvas(canvasID, {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: backgroundColor,
      });

      const cloneObject = (obj, callback) => {
        if (obj.type === "group") {
          const originalObjects = obj.getObjects();
          const clonedObjects = [];

          originalObjects.forEach((childObj) => {
            cloneObject(childObj, (clonedChild) => {
              clonedObjects.push(clonedChild);
              if (clonedObjects.length === originalObjects.length) {
                const newGroup = new fabric.Group(clonedObjects, {
                  left: obj.left,
                  top: obj.top,
                  selectable: false,
                  evented: false,
                  scaleX: obj.scaleX,
                  scaleY: obj.scaleY,
                  autoLayout: obj.autoLayout,
                  layoutDirection: obj.layoutDirection,
                  gap: obj.gap,
                  alignment: obj.alignment,
                  angle: obj.angle,
                });

                // Check if the group ID starts with "svg-group-" and ensure the scale is set to 1:1
                if (obj.id?.startsWith("svg-group-copy-")) {
                  newGroup.set({
                    scaleX: 1,
                    scaleY: 1,
                  });
                }

                callback(newGroup);
              }
            });
          });
        } else {
          obj.clone((clonedObj) => {
            clonedObj.set({
              left: obj.left,
              top: obj.top,
              selectable: false,
              evented: false,
              scaleX: obj.scaleX,
              scaleY: obj.scaleY,
            });

            // Check if the object is a textbox and then dynamically match with row data
            if (obj.type === "textbox") {
              const matchingText = row[obj.id]; // Access the property using obj.id
              if (obj.id.startsWith("static-")) {
                // If the ID starts with "static-", always render the text
                clonedObj.set({ text: obj.text, opacity: 1 });
              } else if (matchingText && matchingText.trim() !== "") {
                // Render text if there is matching data
                clonedObj.set({ text: matchingText, opacity: 1 });
              } else {
                // Hide text if there is no matching data
                clonedObj.set({ opacity: 0 });
              }
            }
            if (obj.type === "image") {
              const matchingURL = row[obj.id];
              const imageURL = matchingURL
                ? matchingURL
                : obj.id.endsWith("-static-")
                ? row.imgSrc
                : null;

              if (imageURL) {
                fabric.Image.fromURL(
                  imageURL,

                  (img) => {
                    const originalWidth = obj.width * obj.scaleX;
                    const originalHeight = obj.height * obj.scaleY;

                    const aspectRatio = img.width / img.height;
                    let scaleX, scaleY;

                    if (originalWidth / originalHeight > aspectRatio) {
                      // Fit by width
                      scaleX = originalWidth / img.width;
                      scaleY = scaleX;
                    } else {
                      // Fit by height

                      scaleY = originalHeight / img.height;
                      scaleX = scaleY;
                    }

                    // Apply clipPath if it exists
                    if (obj.clipPath) {
                      img.set({
                        left: obj.left,
                        top: obj.top,
                        scaleX: scaleX,
                        scaleY: scaleY,
                        shadow: obj.shadow,
                        selectable: false,
                        evented: false,
                        crossOrigin: "anonymous",
                        clipPath: new fabric.Rect({
                          left: obj.left,
                          top: obj.top,
                          width: originalWidth,
                          height: originalHeight,
                          rx: obj.clipPath.rx,
                          ry: obj.clipPath.ry,
                          absolutePositioned: true,
                        }),
                      });
                    } else {
                      img.set({
                        left: obj.left,
                        top: obj.top,
                        scaleX: scaleX,
                        scaleY: scaleY,
                        shadow: obj.shadow,
                        selectable: false,
                        evented: false,
                        crossOrigin: "anonymous",
                      });
                    }

                    if (obj.filters && obj.filters.length > 0) {
                      img.filters = obj.filters
                        .map((filter) => {
                          switch (filter.type) {
                            case "Brightness":
                              return new fabric.Image.filters.Brightness(
                                filter
                              );
                            case "Contrast":
                              return new fabric.Image.filters.Contrast(filter);
                            case "Saturation":
                              return new fabric.Image.filters.Saturation(
                                filter
                              );
                            case "HueRotation":
                              return new fabric.Image.filters.HueRotation(
                                filter
                              );
                            case "Blur":
                              return new fabric.Image.filters.Blur(filter);
                            case "Noise":
                              return new fabric.Image.filters.Noise(filter);
                            case "Grayscale":
                              return new fabric.Image.filters.Grayscale(filter);
                            case "Gamma":
                              return new fabric.Image.filters.Gamma(filter);
                            default:
                              return null;
                          }
                        })
                        .filter(Boolean);
                      img.applyFilters();
                    }

                    img.globalCompositeOperation = obj.globalCompositeOperation;

                    callback(img);
                  },
                  { crossOrigin: "anonymous" }
                );
              } else {
                callback(clonedObj);
              }
            } else {
              // Replace style IDs with hex colors from the row data
              if (obj.fillColorStyleId && row[obj.fillColorStyleId]) {
                clonedObj.set("fill", row[obj.fillColorStyleId]);
              }
              if (obj.strokeColorStyleId && row[obj.strokeColorStyleId]) {
                clonedObj.set("stroke", row[obj.strokeColorStyleId]);
              }

              callback(clonedObj);
            }

            // callback(clonedObj);
          });
        }
      };

      canvasInstance.current.getObjects().forEach((obj) => {
        if (!obj.id?.startsWith("grid-line-")) {
          cloneObject(obj, (cloned) => {
            canvas.add(cloned);
            canvas.moveTo(cloned, obj.canvas.getObjects().indexOf(obj)); // Preserving zIndex
          });
        }
      });

      // Apply background image if any
      if (backgroundImage) {
        fabric.Image.fromURL(backgroundImage, (img) => {
          img.scaleToWidth(canvas.width);
          img.scaleToHeight(canvas.height);
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        });
      }

      populatedCanvasRefs.current.push(canvas); // Store the canvas instance
      console.log(`Canvas ${index} created`);
    });
  };

  const applyAutoLayoutToGroups = () => {
    populatedCanvasRefs.current.forEach((canvas) => {
      const objects = canvas.getObjects();
      objects.forEach((obj) => {
        obj.set({
          layoutDirection: obj.layoutDirection,
          gap: obj.gap,
          alignment: obj.alignment,
          angle: obj.angle,
        });
        if (obj.type === "group" && obj.autoLayout) {
          applyAutoLayout(obj, canvas);
        }
      });
      canvas.discardActiveObject();
      canvas.renderAll();
    });
  };

  const generateCanvases = (data) => {
    populateCanvases(data);
    setTimeout(applyAutoLayoutToGroups, 100);
  };

  //

  const updateCanvasFromTemplate = (templateData) => {
    if (canvasInstance.current) {
      const { objects, backgroundColor, backgroundImage, width, height } =
        templateData;
      applyTemplateData(
        objects,
        backgroundColor,
        backgroundImage,
        width,
        height
      );
    }
  };

  const loadSVGGroup = (objData, canvas) => {
    if (objData.path) {
      fabric.loadSVGFromString(objData.path, (objects, options) => {
        const processedObjects = objects.map((object) => {
          if (object.type === "text") {
            // Convert SVG text elements to Textbox objects
            // Match the text and fontSize to get the corresponding width
            const matchingObject = objData.objects.find(
              (o) => o.text === object.text && o.fontSize === object.fontSize
            );

            return new fabric.Textbox(object.text, {
              fontFamily: object.fontFamily,
              fontSize: object.fontSize,
              fontStyle: object.fontStyle,
              fontWeight: object.fontWeight,
              lineHeight: object.lineHeight,
              textAlign: object.textAlign,
              textDecoration: object.textDecoration,
              fill: object.fill,
              left: object.left,
              top: object.top,
              scaleX: object.scaleX,
              scaleY: object.scaleY,
              angle: object.angle,
              selectable: object.selectable || true,
              visible: object.visible || true,
              opacity: object.opacity || 1,
              label: matchingObject ? matchingObject.label : object.label,
              id: object.id,
              width: matchingObject ? matchingObject.width : object.width, // Set the width from matching object
            });
          } else {
            return object;
          }

          // return object;
        });

        const svgObj = fabric.util.groupSVGElements(processedObjects, {
          left: objData.left,
          top: objData.top,
          scaleX: objData.scaleX,
          scaleY: objData.scaleY,
          angle: objData.angle,
          selectable: objData.selectable || true,
          opacity: objData.opacity || 1,
          visible: objData.visible || true,
          label: objData.label,
          id: objData.id,
          autoLayout: objData.autoLayout,
          layoutDirection: objData.layoutDirection,
          alignment: objData.alignment,
          gap: objData.gap,
        });

        canvas.add(svgObj);
        canvas.moveTo(svgObj, objData.zIndex);
        canvas.renderAll();
        if (svgObj.id && !svgObj.id.startsWith("icon-")) {
          attachDoubleClickListener(svgObj);
        }
      });
    } else {
      console.error("SVG data missing for object", objData.id);
    }
  };

  const applyTemplateData = (
    objects,
    backgroundColor,
    backgroundImage,
    canvasWidth,
    canvasHeight
  ) => {
    const canvas = canvasInstance.current;
    canvas.clear(); // Clear existing canvas objects

    // Set canvas background color and dimensions
    canvas.backgroundColor = backgroundColor;
    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);

    // Update React state for width and height
    setCanvasWidth(canvasWidth);
    setCanvasHeight(canvasHeight);
    setBackgroundColor(backgroundColor);
    setBackgroundImage(backgroundImage);

    objects.forEach((objData) => {
      const options = {
        ...objData,
        top: objData.top,
        left: objData.left,
        scaleX: objData.scaleX,
        scaleY: objData.scaleY,
        angle: objData.angle,
        rx: objData.rx || 0, // Ensure rx is defined, default to 0
        ry: objData.ry || 0, // Ensure ry is defined, default to 0
        selectable: objData.selectable || true,
        visible: objData.visible || true,
        opacity: objData.opacity || 1,
        strokeColorStyleId: objData.strokeColorStyleId || null,
        fillColorStyleId: objData.fillColorStyleId || null,
        id: objData.id || null,
      };

      switch (objData.type) {
        case "image":
          fabric.Image.fromURL(objData.src, (img) => {
            img.set(options);
            if (objData.filters && objData.filters.length > 0) {
              img.filters = objData.filters
                .map((filter) => {
                  switch (filter.type) {
                    case "Brightness":
                      return new fabric.Image.filters.Brightness(filter);
                    case "Contrast":
                      return new fabric.Image.filters.Contrast(filter);
                    case "Saturation":
                      return new fabric.Image.filters.Saturation(filter);
                    case "HueRotation":
                      return new fabric.Image.filters.HueRotation(filter);
                    case "Blur":
                      return new fabric.Image.filters.Blur(filter);
                    case "Noise":
                      return new fabric.Image.filters.Noise(filter);
                    case "Grayscale":
                      return new fabric.Image.filters.Grayscale(filter);
                    case "Gamma":
                      return new fabric.Image.filters.Gamma(filter);
                    default:
                      return null;
                  }
                })
                .filter(Boolean);
              img.applyFilters();
            }
            img.globalCompositeOperation = objData.globalCompositeOperation;

            // Apply clipping path if it exists
            if (objData.clipPath) {
              const clipPath = new fabric.Rect({
                rx: objData.clipPath.rx,
                ry: objData.clipPath.ry,
                width: objData.clipPath.width,
                height: objData.clipPath.height,
                originX: objData.clipPath.originX,
                originY: objData.clipPath.originY,
              });
              img.set({ clipPath });
            }

            canvas.add(img);
            canvas.moveTo(img, objData.zIndex); // Set z-index
            canvas.renderAll();
            updateImageObjectsOrder();
          });
          break;
        case "textbox":
          const textbox = new fabric.Textbox(objData.text, options);
          if (!fontsLoaded) return;

          canvas.add(textbox);
          canvas.moveTo(textbox, objData.zIndex); // Set z-index
          break;
        case "circle":
          const circle = new fabric.Circle(options);
          canvas.add(circle);
          canvas.moveTo(circle, objData.zIndex); // Set z-index
          break;
        case "rect":
          const rect = new fabric.Rect(options);
          canvas.add(rect);
          canvas.moveTo(rect, objData.zIndex); // Set z-index
          break;
        case "line":
          const line = new fabric.Line(
            [objData.x1, objData.y1, objData.x2, objData.y2],
            {
              left: objData.left,
              top: objData.top,
              width: objData.width,
              height: objData.height,
              scaleX: 1,
              scaleY: 1,
              stroke: objData.stroke,
              strokeWidth: objData.strokeWidth,
              selectable: objData.selectable,
              visible: objData.visible,
              opacity: objData.opacity,
              id: objData.id,
              label: objData.label,
              strokeColorStyleId: objData.strokeColorStyleId || null,
            }
          );
          canvas.add(line);
          canvas.moveTo(line, objData.zIndex); // Set z-index
          break;
        case "triangle":
          const triangle = new fabric.Triangle(options);
          canvas.add(triangle);
          canvas.moveTo(triangle, objData.zIndex); // Set z-index
          break;
        case "path":
          if (
            objData.id &&
            (objData.id.startsWith("star-") || objData.id.startsWith("icon-"))
          ) {
            loadSVGGroup(objData, canvas);
          }
          break;
        case "group":
          if (objData.id && objData.id.startsWith("svg-group-")) {
            loadSVGGroup(objData, canvas);
          } else if (objData.id && objData.id.startsWith("group-")) {
            const groupObjects = objData.objects.map((object) => {
              const groupObjectOptions = {
                ...object,
                top: object.top,
                left: object.left,
                scaleX: object.scaleX,
                scaleY: object.scaleY,
                angle: object.angle,
                rx: object.rx || 0, // Ensure rx is defined, default to 0
                ry: object.ry || 0, // Ensure ry is defined, default to 0
                selectable: object.selectable || true,
                visible: object.visible || true,
                opacity: object.opacity || 1,
                strokeColorStyleId: object.strokeColorStyleId || null,
                fillColorStyleId: object.fillColorStyleId || null,
                autoLayout: object.autoLayout,
                layoutDirection: object.layoutDirection,
                alignment: object.alignment,
                gap: object.gap,
              };

              switch (object.type) {
                case "textbox":
                  return new fabric.Textbox(object.text, groupObjectOptions);
                case "circle":
                  return new fabric.Circle(groupObjectOptions);
                case "rect":
                  return new fabric.Rect(groupObjectOptions);
                // Add cases for other object types as needed
                default:
                  console.log("Unsupported group object type:", object.type);
                  return null;
              }
            });

            const group = new fabric.Group(groupObjects, {
              ...options,
              left: objData.left,
              top: objData.top,
              scaleX: objData.scaleX,
              scaleY: objData.scaleY,
              angle: objData.angle,
              selectable: objData.selectable || true,
              opacity: objData.opacity || 1,
              visible: objData.visible || true,
              autoLayout: objData.autoLayout,
              layoutDirection: objData.layoutDirection,
              alignment: objData.alignment,
              gap: objData.gap,
            });

            canvas.add(group);
            canvas.moveTo(group, objData.zIndex); // Set z-index
            canvas.renderAll();
            attachDoubleClickListener(group);
          } else {
            loadSVGGroup(objData, canvas);
          }
          break;

        default:
          console.log("Unsupported object type:", objData.type);
      }
    });

    if (backgroundImage) {
      fabric.Image.fromURL(backgroundImage, (img) => {
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
        canvas.setBackgroundImage(img, () => {
          canvas.renderAll(); // Render all changes including the background
        });
      });
    } else {
      canvas.setBackgroundImage(null);
    }
    canvas.renderAll();
    updateLayerPanel();
  };

  // Function to update the layer panel based on current objects in the canvas
  const processObjects = (objs, depth = 0) => {
    return objs.flatMap((obj, index) => {
      if (obj.type === "group") {
        // Process the children of the group first, and then the group itself
        const childObjects = processObjects(obj._objects, depth + 1);
        const objectDetails = {
          id: obj.id || `object-${index}`,
          label: obj.label || obj.type,
          type: obj.type,
          zIndex: canvasInstance.current.getObjects().indexOf(obj),
          visible: obj.visible,
          selectable: obj.selectable,
          depth: depth,
          width: obj.width,
        };
        return [...childObjects, objectDetails]; // Place the parent after its children
      } else {
        // Handle non-group objects
        return [
          {
            id: obj.id || `object-${index}`,
            label: obj.label || obj.type,
            type: obj.type,
            zIndex: canvasInstance.current.getObjects().indexOf(obj),
            visible: obj.visible,
            selectable: obj.selectable,
            depth: depth,
          },
        ];
      }
    });
  };

  const updateLayerPanel = () => {
    const objects = canvasInstance.current.getObjects();
    const filteredObjects = objects.filter(
      (obj) => obj.id && !obj.id?.startsWith("grid-line-")
    ); // Filter out grid lines

    const updatedObjects = processObjects(filteredObjects);
    setImageObjects(updatedObjects);
  };

  const handleUploadTemplate = (event) => {
    const file = event.target.files[0];
    setTemplateNameUploaded(file.name);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const templateData = JSON.parse(e.target.result);
          // Handle the loaded template data
          updateCanvasFromTemplate(templateData);
          setErrorMessage(""); // Clear any previous error messages
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setErrorMessage(
            "The uploaded file is not a valid Template file. Error: " +
              error.message
          );
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = async () => {
    const zip = new JSZip();

    for (let i = 0; i < populatedCanvasRefs.current.length; i++) {
      const canvas = populatedCanvasRefs.current[i];
      if (canvas) {
        // Scale the canvas to 2x size
        canvas.setDimensions({
          width: canvas.width * 2,
          height: canvas.height * 2,
        });
        canvas.setZoom(2);

        const dataURL = canvas.toDataURL({ format: "png", quality: 1 });
        const response = await fetch(dataURL);
        const blob = await response.blob();
        zip.file(`${templateName}-banner-${i}.png`, blob, { binary: true });

        // Reset the canvas to its original size after exporting
        canvas.setZoom(1);
        canvas.setDimensions({
          width: canvas.width / 2,
          height: canvas.height / 2,
        });
      }
    }

    const zipFileName = `${templateName}.zip`;
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, zipFileName);
    });
  };

  const handleExportAllSVG = async () => {
    const zip = new JSZip();

    for (let i = 0; i < populatedCanvasRefs.current.length; i++) {
      const canvas = populatedCanvasRefs.current[i];
      if (canvas) {
        // Temporarily hide grid lines
        const gridLines = canvas
          .getObjects()
          .filter((obj) => obj.id && obj.id.startsWith("grid-line-"));
        gridLines.forEach((line) => (line.visible = false));

        // Update the canvas after hiding grid lines
        canvas.renderAll();

        // Export the SVG
        const svg = canvas.toSVG();
        const blob = new Blob([svg], { type: "image/svg+xml" });
        zip.file(`${templateName}-banner-${i}.svg`, blob, { binary: true });

        // Restore visibility of grid lines
        gridLines.forEach((line) => (line.visible = true));
        canvas.renderAll();
      }
    }

    // Generate the zip file and download
    zip.generateAsync({ type: "blob" }).then(function (content) {
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${templateName}-export.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const exportPrimaryCanvas = async (format, multiplier = 2) => {
    const canvas = canvasInstance.current;
    if (!canvas) {
      console.error("No canvas available to export.");
      return;
    }

    // Deselect any active object to avoid exporting selection handles
    canvas.discardActiveObject();
    canvas.renderAll();

    // Filter out grid lines or specific objects before export
    const allObjects = canvas.getObjects();
    const exportObjects = allObjects.filter(
      (obj) => !obj.id?.startsWith("grid-line-")
    );
    const gridLines = allObjects.filter((obj) =>
      obj.id?.startsWith("grid-line-")
    );

    // Hide grid lines
    gridLines.forEach((line) => (line.visible = false));

    // Scaling canvas for higher resolution based on multiplier
    const originalWidth = canvas.width;
    const originalHeight = canvas.height;
    const scaledWidth = originalWidth * multiplier;
    const scaledHeight = originalHeight * multiplier;

    canvas.setWidth(scaledWidth);
    canvas.setHeight(scaledHeight);
    canvas.setZoom(multiplier);
    canvas.renderAll();

    // Handle different formats
    if (format === "pdf") {
      // PDF export logic
      exportObjects
        .filter((obj) => obj.type === "textbox")
        .forEach((text) => {
          text.toSVG = function (reviver) {
            return fabric.util
              .groupSVGElements(text.toPathGroup().getObjects(), {
                left: text.left,
                top: text.top,
                scaleX: text.scaleX,
                scaleY: text.scaleY,
                angle: text.angle,
              })
              .toSVG(reviver);
          };
        });
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [scaledWidth, scaledHeight],
      });

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        scaledWidth,
        scaledHeight
      );
      pdf.save(`${templateName}.pdf`);
    } else if (format === "tiff") {
      // TIFF export using the UTIF library
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, scaledWidth, scaledHeight);
      const tiff = UTIF.encodeImage(imageData.data, scaledWidth, scaledHeight);
      const tiffBlob = new Blob([tiff], { type: "image/tiff" });
      saveAs(tiffBlob, `${templateName}-${new Date().toISOString()}.tiff`);
    } else {
      // PNG or JPG export
      const dataUrl = canvas.toDataURL({
        format: format === "jpg" ? "jpeg" : "png",
        quality: 1.0,
      });
      saveAs(dataUrl, `${templateName}-${new Date().toISOString()}.${format}`);
    }

    // Resetting canvas zoom and dimensions after export
    canvas.setZoom(1);
    canvas.setWidth(originalWidth);
    canvas.setHeight(originalHeight);

    // Restore grid line visibility
    gridLines.forEach((line) => (line.visible = true));
    canvas.renderAll();
  };

  function exportSVG() {
    const canvas = canvasInstance.current;

    // Temporarily hide grid lines
    const gridLines = canvas
      .getObjects()
      .filter((obj) => obj.id && obj.id.startsWith("grid-line-"));
    gridLines.forEach((line) => (line.visible = false));

    // Update the canvas after hiding grid lines
    canvas.renderAll();

    // Export the SVG
    const svg = canvas.toSVG();
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${templateName}-${new Date().toISOString()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Restore visibility of grid lines
    gridLines.forEach((line) => (line.visible = true));
    canvas.renderAll();
  }

  useEffect(() => {
    // Ensure the canvas instance is available
    if (!canvasInstance.current) {
      console.log("Canvas is not initialized yet.");
      return;
    }

    const handleKeyDown = (event) => {
      const key = event.keyCode || event.which;
      // 46 is Delete, 8 is Backspace. Note: Be cautious with Backspace as it might interfere with text inputs.
      if (
        key === 46 ||
        (key === 8 &&
          event.target.tagName !== "INPUT" &&
          event.target.tagName !== "TEXTAREA")
      ) {
        event.preventDefault(); // Prevent the default backspace action (going back in history)
        deleteSelectedObject();
      }
    };

    // Add event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]); // Re-run this effect when canvasInstance.current changes

  const deleteSelectedObject = () => {
    const currentCanvas = canvasInstance.current;
    let objectDeleted = false;

    // Function to delete the selected object from a given canvas
    const deleteFromCanvas = (canvas) => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        // Check if the active object is a group
        if (activeObject.type === "activeSelection") {
          activeObject.forEachObject((obj) => {
            canvas.remove(obj);
          });
        } else {
          canvas.remove(activeObject);
        }

        canvas.discardActiveObject(); // Deselect current selection
        canvas.requestRenderAll();
        return true;
      }
      return false;
    };

    // Check the current canvas instance
    if (currentCanvas) {
      objectDeleted = deleteFromCanvas(currentCanvas);
      if (objectDeleted) {
        updateImageObjectsOrder();
        updateLayerPanel(); // Update the layer panel or other UI components if needed
      }
    }

    // Check the populated canvases
    if (populatedCanvasRefs.current && populatedCanvasRefs.current.length > 0) {
      populatedCanvasRefs.current.forEach((canvas) => {
        deleteFromCanvas(canvas);
      });
    }

    if (!objectDeleted) {
      console.log("No object selected on any canvas!");
    }
  };

  const handleImageUploadAndUpdate = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (selectedImageObject && selectedImageObject.type === "image") {
          fabric.Image.fromURL(e.target.result, (newImg) => {
            // Preserving original properties
            const imageTextureSize = Math.max(newImg.width, newImg.height);
            if (imageTextureSize > fabric.textureSize) {
              fabric.textureSize = imageTextureSize;
            }

            newImg.set({
              left: selectedImageObject.left,
              top: selectedImageObject.top,
              scaleX: selectedImageObject.scaleX,
              scaleY: selectedImageObject.scaleY,
              angle: selectedImageObject.angle,
              id: selectedImageObject.id, // Preserve the ID
              label: selectedImageObject.label, // Preserve any additional labels or custom properties
            });
            canvasInstance.current.remove(selectedImageObject); // Remove the old image
            canvasInstance.current.add(newImg); // Add the new image
            canvasInstance.current.renderAll();
            setSelectedImageObject(newImg); // Update the selected image object in state
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addCustomTriangle = () => {
    const fillColor = getRandomColor();

    const triangle = new fabric.Triangle({
      width: 100,
      height: 100,
      fill: fillColor,
      left: 200,
      top: 200,
      id: `triangle-${Date.now()}`,
      label: "Triangle",
      strokeUniform: true,
    });

    canvasInstance.current.add(triangle);
    canvasInstance.current.sendToBack(triangle);
    updateImageObjectsOrder();
  };

  const addCustomStar = () => {
    const fillColor = getRandomColor();

    const svgString = `
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 5L8.5 0L11 5L17 6L13 10L14 16L8.5 13L3 16L4 10L0 6L6 5Z" fill="#D9D9D9"/>
      </svg>
    `;

    fabric.loadSVGFromString(svgString, (objects, options) => {
      const svgGroup = fabric.util.groupSVGElements(objects, options);

      // Setting width and height of the svgGroup
      svgGroup.set({
        id: `star-${Date.now()}`,
        label: "Star",
        left: 200,
        top: 200,
        originX: "left",
        originY: "top",
        scaleX: 5, // scale if necessary to make it bigger
        scaleY: 5,
        strokeWidth: 0,
        fill: fillColor,
      });

      // Adjust the coordinates
      svgGroup.setCoords();

      // Add the svgGroup to the canvas
      canvasInstance.current.add(svgGroup);
      canvasInstance.current.sendToBack(svgGroup);

      // Optionally, update the order of image objects
      updateImageObjectsOrder();
    });
  };

  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // useEffect(() => {
  //   const showDialog = localStorage.getItem("welcomeDialogShown") !== "true";
  //   setIsDialogOpen(showDialog);
  // }, []);

  // const handleDialogClose = () => {
  //   setIsDialogOpen(false);
  //   localStorage.setItem("welcomeDialogShown", "true");
  // };

  //

  const [isDialogTemplateOpen, setIsDialogTemplateOpen] = useState(false);

  const handleDialogTemplateClose = () => {
    setIsDialogTemplateOpen(false);
  };

  const handleTemplateClick = () => {
    setIsDialogTemplateOpen(true);
  };
  //
  const [isDialogTemplatesOpen, setIsDialogTemplatesOpen] = useState(false);

  const handleDialogTemplatesClose = () => {
    setIsDialogTemplatesOpen(false);
  };

  const handleTemplatesClick = () => {
    setIsDialogTemplatesOpen(true);
  };
  //
  const [isDialogExportOpen, setIsDialogExportOpen] = useState(false);

  const handleDialogExportClose = () => {
    setIsDialogExportOpen(false);
  };
  // eslint-disable-next-line
  const handleExportClick = () => {
    setIsDialogExportOpen(true);
  };

  //
  const handleKeyPress = (e) => {
    // Check if the focused element is an input, textarea, or button
    const activeElement = document.activeElement;
    if (
      activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA" ||
      activeElement.tagName === "BUTTON"
    ) {
      return;
    }

    const moveBy = e.shiftKey ? 10 : 1;
    const activeObject = canvasInstance.current.getActiveObject();
    if (!activeObject) return;

    const moveSelection = (obj) => {
      switch (e.key) {
        case "ArrowUp":
          obj.set("top", obj.top - moveBy);
          break;
        case "ArrowDown":
          obj.set("top", obj.top + moveBy);
          break;
        case "ArrowLeft":
          obj.set("left", obj.left - moveBy);
          break;
        case "ArrowRight":
          obj.set("left", obj.left + moveBy);
          break;
        default:
          return;
      }
      obj.setCoords();
    };

    if (activeObject.type === "activeSelection") {
      activeObject.getObjects().forEach(moveSelection);

      switch (e.key) {
        case "ArrowUp":
          activeObject.set("top", activeObject.top - moveBy);
          setPositionY(activeObject.top);
          break;
        case "ArrowDown":
          activeObject.set("top", activeObject.top + moveBy);
          setPositionY(activeObject.top);
          break;
        case "ArrowLeft":
          activeObject.set("left", activeObject.left - moveBy);
          setPositionX(activeObject.left);
          break;
        case "ArrowRight":
          activeObject.set("left", activeObject.left + moveBy);
          setPositionX(activeObject.left);
          break;
        default:
          return;
      }
      activeObject.setCoords();
    } else {
      moveSelection(activeObject);
    }

    canvasInstance.current.requestRenderAll();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedObject]);

  // Function to duplicate the selected object
  const duplicateSelectedObject = () => {
    const canvas = canvasInstance.current;
    const activeObjects = canvas.getActiveObjects();

    if (activeObjects.length === 0) {
      console.log("No objects selected!");
      return;
    }

    const offsetX = 10;
    const offsetY = 10;
    const clonedObjects = [];

    const cloneObject = (obj, callback) => {
      obj.clone((clonedObj) => {
        const newId = `${obj.id || "obj"}-copy-${Date.now()}`; // Generating a unique ID
        clonedObj.set({
          id: newId,
          label: `${obj.label || obj.type}(copy)`,
          top: obj.top + offsetY,
          left: obj.left + offsetX,
          strokeColorStyleId: obj.strokeColorStyleId || null,
          fillColorStyleId: obj.fillColorStyleId || null,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
        });

        callback(clonedObj);
      });
    };

    const cloneAndAddObjects = (objects) => {
      objects.forEach((obj) => {
        if (obj.type === "group") {
          // Handle groups
          const objectsInGroup = obj.getObjects();
          const clonedGroupObjects = [];

          objectsInGroup.forEach((groupedObj) => {
            cloneObject(groupedObj, (clonedObj) => {
              clonedGroupObjects.push(clonedObj);
            });
          });

          const group = new fabric.Group(clonedGroupObjects, {
            top: obj.top + offsetY,
            left: obj.left + offsetX,
            scaleX: obj.scaleX,
            scaleY: obj.scaleY,
            autoLayout: obj.autoLayout,
            layoutDirection: obj.layoutDirection,
            gap: obj.gap,
            alignment: obj.alignment,
          });

          group.on("mousedblclick", () => {
            const activeObject = canvasInstance.current.getActiveObject();
            if (activeObject && activeObject.type === "group") {
              ungroupSVG(activeObject);
            }
          });

          canvas.add(group);
          clonedObjects.push(group);
        } else {
          // Handle individual objects
          cloneObject(obj, (clonedObj) => {
            canvas.add(clonedObj);
            clonedObjects.push(clonedObj);
          });
        }
      });
    };

    cloneAndAddObjects(activeObjects);

    setTimeout(() => {
      if (clonedObjects.length === 1) {
        canvas.setActiveObject(clonedObjects[0]);
      } else if (clonedObjects.length > 1) {
        const selection = new fabric.ActiveSelection(clonedObjects, {
          canvas: canvas,
        });
        canvas.setActiveObject(selection);
      }

      canvas.renderAll();
      updateImageObjectsOrder(); // Update order in layer panel
    }, 0);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Cmd (on Mac) or Ctrl (on Windows/Linux) is pressed along with 'D'
      if ((event.metaKey || event.ctrlKey) && event.key === "d") {
        event.preventDefault(); // Prevent the default action to avoid triggering browser bookmarks or other bindings
        duplicateSelectedObject(); // Call your duplication function
      }
    };

    // Add event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);
  // Clipboard for storing copied objects
  let clipboard = null;

  // Function to copy the selected object to the clipboard
  const copyObject = () => {
    const canvas = canvasInstance.current;
    const activeObjects = canvas.getActiveObjects();

    if (activeObjects.length === 0) {
      console.log("No objects selected!");
      return;
    }

    // Reset clipboard to store new copied objects
    clipboard = activeObjects.map((object) => {
      return {
        object: object.toObject([
          "id",
          "label",
          "strokeColorStyleId",
          "fillColorStyleId",
        ]), // Serialize with custom properties
        offsetX: 20, // Offset for pasting
        offsetY: 20,
      };
    });
    console.log("Objects copied to clipboard");
  };

  // Initialize a counter to track paste operations
  let pasteCount = 0; // Initialize paste count outside the component function

  const pasteObject = () => {
    if (!clipboard || clipboard.length === 0) {
      console.log("Clipboard is empty!");
      return;
    }

    const canvas = canvasInstance.current;
    const baseOffset = 10; // Base offset for each paste operation
    const offsetX = baseOffset * pasteCount; // Use pasteCount to calculate the offset
    const offsetY = baseOffset * pasteCount;

    clipboard.forEach((item, index) => {
      fabric.util.enlivenObjects([item.object], (enlivenedObjects) => {
        enlivenedObjects.forEach((obj) => {
          const uniqueSuffix = `-${Date.now()}-${index}`; // Unique suffix using timestamp and index
          obj.set({
            left: obj.left + offsetX,
            top: obj.top + offsetY,
            id: `${obj.id}${uniqueSuffix}`, // Append unique suffix to ID
            label: `${obj.label}(copy)`, // Ensure modified label
            strokeColorStyleId: obj.strokeColorStyleId || null,
            fillColorStyleId: obj.fillColorStyleId || null,
          });
          canvas.add(obj);
          canvas.setActiveObject(obj);
        });
      });
    });

    canvas.renderAll();
    updateImageObjectsOrder(); // Ensure the UI reflects the new state
    console.log("Objects pasted with unique IDs and labels");

    // Increment the paste counter after each paste operation
    pasteCount++;
  };

  //

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Early return if event is inside input or textarea
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      ) {
        return; // Do nothing if the event target is an input or textarea
      }

      const isCtrlDown = event.ctrlKey || event.metaKey;

      // Handle different keyboard shortcuts
      if (isCtrlDown) {
        switch (event.key.toLowerCase()) {
          case "a": // Ctrl+A for selecting all objects on the canvas
            event.preventDefault();
            selectAllObjects();
            break;
          case "c": // Ctrl+C for copying objects
            event.preventDefault();
            copyObject();
            break;
          case "v": // Ctrl+V for pasting objects
            event.preventDefault();
            pasteObject();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current, copyObject, pasteObject]);

  // Function to deactivate drawing and reshape tools
  const deactivateTools = () => {
    setIsDrawing(false); // Deactivate drawing mode
    setScaleMode(false); // Deactivate reshape mode
    const canvas = canvasInstance.current;
    if (canvas) {
      canvas.isDrawingMode = false; // Disable fabric.js drawing mode
      console.log("Drawing and reshape tools deactivated");
    }
  };

  const selectAllObjects = () => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    // Get only objects that are not locked
    const selectableObjects = canvas
      .getObjects()
      .filter((obj) => obj.selectable !== false);

    if (selectableObjects.length === 0) {
      return;
    }
    // Create a new active selection with all selectable objects
    const sel = new fabric.ActiveSelection(selectableObjects, {
      canvas: canvas,
    });
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
  };

  // Function to deselect all objects on the canvas
  const deselectAllObjects = () => {
    const canvas = canvasInstance.current;
    if (canvas) {
      canvas.discardActiveObject(); // Deselect any active object
      canvas.requestRenderAll(); // Re-render the canvas
      console.log("All objects deselected");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the event is in an input or textarea
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      ) {
        return; // Do nothing if the event target is an input or textarea
      }

      if (event.key === "v") {
        event.preventDefault(); // Prevent default action for key "v"
        deactivateTools(); // Deactivate drawing and reshape tools
      } else if (event.key === "d") {
        event.preventDefault(); // Prevent default action for key "d"
        deselectAllObjects(); // Deselect all objects in the canvas
      }
    };

    // Attach the event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  //
  // eslint-disable-next-line
  const addStar = () => {
    // SVG data as a string
    const svgData = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="2" fill="#F232C8"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 15C18.3137 15 21 12.3137 21 9C21 5.68629 18.3137 3 15 3C11.6863 3 9 5.68629 9 9H15V15Z" fill="white"/>
        <rect x="4" y="11" width="9" height="9" fill="white"/>
      </svg>
    `;

    // Loading the SVG string into Fabric.js
    fabric.loadSVGFromString(svgData, function (objects, options) {
      const svgObject = fabric.util.groupSVGElements(objects, options);
      svgObject.set({
        left: 50, // Centered more visibly
        top: 50, // Centered more visibly
        scaleX: 5, // Scaling up for visibility
        scaleY: 5, // Scaling up for visibility
        fill: "red", // Ensuring a visible fill color (though it will use SVG colors)
        stroke: "black", // Ensuring a visible stroke color
        strokeWidth: 1,
        id: `star-${Date.now()}`, // Unique ID for the star
        label: "Star", // Label to show in layer list
      });

      // Adding the SVG object to the canvas
      canvasInstance.current.add(svgObject);
      canvasInstance.current.setActiveObject(svgObject); // Optionally set as active to highlight
      canvasInstance.current.renderAll(); // Ensuring the canvas is updated
      updateLayerPanel(); // This function should update your UI layer panel
    });
  };

  //
  function alignObjects(canvas, alignment) {
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length === 0) return; // No object is selected

    function getFarthestCorners(obj) {
      const corners = obj.getCoords();
      const leftmost = corners.reduce((leftmost, corner) =>
        corner.x < leftmost.x ? corner : leftmost
      );
      const rightmost = corners.reduce((rightmost, corner) =>
        corner.x > rightmost.x ? corner : rightmost
      );
      const topmost = corners.reduce((topmost, corner) =>
        corner.y < topmost.y ? corner : topmost
      );
      const bottommost = corners.reduce((bottommost, corner) =>
        corner.y > bottommost.y ? corner : bottommost
      );
      return { leftmost, rightmost, topmost, bottommost };
    }

    function alignToCorner(obj, alignment) {
      const { leftmost, rightmost, topmost, bottommost } =
        getFarthestCorners(obj);
      switch (alignment) {
        case "left":
          obj.set({ left: obj.left - leftmost.x });
          break;
        case "right":
          obj.set({ left: canvas.width - (rightmost.x - obj.left) });
          break;
        case "top":
          obj.set({ top: obj.top - topmost.y });
          break;
        case "bottom":
          obj.set({ top: canvas.height - (bottommost.y - obj.top) });
          break;
        case "horizontalCenter":
          const horizontalCenter = (rightmost.x + leftmost.x) / 2;
          obj.set({ left: canvas.width / 2 - (horizontalCenter - obj.left) });
          break;
        case "verticalCenter":
          const verticalCenter = (topmost.y + bottommost.y) / 2;
          obj.set({ top: canvas.height / 2 - (verticalCenter - obj.top) });
          break;
        default:
          console.error("Unsupported alignment type:", alignment);
          break;
      }
      obj.setCoords();
    }

    function getBoundingRectIncludingRotation(objects) {
      const points = objects.flatMap((obj) => obj.getCoords());
      const minX = Math.min(...points.map((point) => point.x));
      const maxX = Math.max(...points.map((point) => point.x));
      const minY = Math.min(...points.map((point) => point.y));
      const maxY = Math.max(...points.map((point) => point.y));
      return { left: minX, top: minY, width: maxX - minX, height: maxY - minY };
    }

    if (activeObjects.length > 1) {
      const groupRect = getBoundingRectIncludingRotation(activeObjects);

      activeObjects.forEach((obj) => {
        const { leftmost, rightmost, topmost, bottommost } =
          getFarthestCorners(obj);

        switch (alignment) {
          case "left":
            obj.set({ left: groupRect.left - (leftmost.x - obj.left) });
            break;
          case "right":
            obj.set({
              left: groupRect.left + groupRect.width - (rightmost.x - obj.left),
            });
            break;
          case "top":
            obj.set({ top: groupRect.top - (topmost.y - obj.top) });
            break;
          case "bottom":
            obj.set({
              top: groupRect.top + groupRect.height - (bottommost.y - obj.top),
            });
            break;
          case "horizontalCenter":
            const groupHorizontalCenter = groupRect.left + groupRect.width / 2;
            const objHorizontalCenter = (leftmost.x + rightmost.x) / 2;
            obj.set({
              left: groupHorizontalCenter - (objHorizontalCenter - obj.left),
            });
            break;
          case "verticalCenter":
            const groupVerticalCenter = groupRect.top + groupRect.height / 2;
            const objVerticalCenter = (topmost.y + bottommost.y) / 2;
            obj.set({
              top: groupVerticalCenter - (objVerticalCenter - obj.top),
            });
            break;
          default:
            console.error("Unsupported alignment type:", alignment);
            break;
        }
        obj.setCoords();
      });
    } else {
      const obj = activeObjects[0];
      alignToCorner(obj, alignment);
    }

    canvas.requestRenderAll(); // Re-render the canvas to reflect changes
  }

  function distributeObjects(canvas, direction) {
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length < 3) {
      console.log("Need at least three objects selected for distribution.");
      return; // Distribution needs at least three objects to make sense
    }

    // Sort objects by their current position
    activeObjects.sort((a, b) => {
      if (direction === "horizontal") {
        return a.left - b.left;
      } else {
        // vertical
        return a.top - b.top;
      }
    });

    // Calculate the total size and the bounding box dimensions
    let totalObjectSize = 0;
    const boundingBoxes = activeObjects.map((obj) => {
      const boundingBox = obj.getBoundingRect();
      totalObjectSize +=
        direction === "horizontal" ? boundingBox.width : boundingBox.height;
      return boundingBox;
    });

    // Calculate the total space and the gaps
    const firstBox = boundingBoxes[0];
    const lastBox = boundingBoxes[boundingBoxes.length - 1];
    let totalSpace, start, end;

    if (direction === "horizontal") {
      start = firstBox.left;
      end = lastBox.left + lastBox.width;
      totalSpace = end - start - totalObjectSize;
    } else {
      start = firstBox.top;
      end = lastBox.top + lastBox.height;
      totalSpace = end - start - totalObjectSize;
    }

    const gap = totalSpace / (activeObjects.length - 1);

    // Distribute objects evenly within the total space
    let currentPosition = start;

    activeObjects.forEach((obj, index) => {
      if (direction === "horizontal") {
        obj.set({ left: currentPosition });
        currentPosition += boundingBoxes[index].width + gap;
      } else {
        obj.set({ top: currentPosition });
        currentPosition += boundingBoxes[index].height + gap;
      }
      obj.setCoords();
    });

    canvas.requestRenderAll(); // Re-render the canvas to reflect changes
  }

  // Add this function to a button or event listener to trigger alignment

  const handleAlignment = (type) => {
    alignObjects(canvasInstance.current, type);
  };

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const updateSelectionState = () => {
      const selectedObjects = canvas.getActiveObjects();
      setIsEnabled(selectedObjects.length >= 3);
    };

    canvas.on("selection:created", updateSelectionState);
    canvas.on("selection:updated", updateSelectionState);
    canvas.on("selection:cleared", updateSelectionState);

    return () => {
      canvas.off("selection:created", updateSelectionState);
      canvas.off("selection:updated", updateSelectionState);
      canvas.off("selection:cleared", updateSelectionState);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]);
  //
  const [isGroupingEnabled, setIsGroupingEnabled] = useState(false);

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const updateSelectionStateGR = () => {
      const selectedObjects = canvas.getActiveObjects();
      setIsGroupingEnabled(selectedObjects.length >= 2);
    };

    canvas.on("selection:created", updateSelectionStateGR);
    canvas.on("selection:updated", updateSelectionStateGR);
    canvas.on("selection:cleared", updateSelectionStateGR);

    return () => {
      canvas.off("selection:created", updateSelectionStateGR);
      canvas.off("selection:updated", updateSelectionStateGR);
      canvas.off("selection:cleared", updateSelectionStateGR);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]);
  //
  const [gradient, setGradient] = useState("");
  const [selectedGradient, setSelectedGradient] = useState(null);

  const fabricGradientToCSS = (gradient) => {
    if (!gradient) return null;

    const colorStops = gradient.colorStops
      .map((stop) => `${stop.color} ${stop.offset * 100}%`)
      .join(", ");

    if (gradient.type === "linear") {
      const angleRad = Math.atan2(
        gradient.coords.y2 - gradient.coords.y1,
        gradient.coords.x2 - gradient.coords.x1
      );
      const angle = (angleRad * 180) / Math.PI;
      return `linear-gradient(${angle}deg, ${colorStops})`;
    } else if (gradient.type === "radial") {
      return `radial-gradient(circle, ${colorStops})`;
    }

    return null;
  };

  // eslint-disable-next-line
  const handleSelectionChange = () => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const activeSelection = canvas.getActiveObject();
    if (activeSelection) {
      const object =
        activeSelection.type === "activeSelection"
          ? activeSelection.item(0)
          : activeSelection;
      const gradient = object.get("fill");
      if (gradient instanceof fabric.Gradient) {
        setSelectedGradient({
          type: gradient.type,
          coords: gradient.coords,
          colorStops: gradient.colorStops,
        });
        const cssGradient = fabricGradientToCSS(gradient);
        console.log(cssGradient);
        setGradient(cssGradient);
      } else {
        setSelectedGradient(null);
        setGradient("");
      }
    } else {
      setSelectedGradient(null);
      setGradient("");
    }
  };
  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    canvas.on("selection:created", handleSelectionChange);
    canvas.on("selection:updated", handleSelectionChange);
    canvas.on("selection:cleared", handleSelectionChange);

    return () => {
      canvas.off("selection:created", handleSelectionChange);
      canvas.off("selection:updated", handleSelectionChange);
      canvas.off("selection:cleared", handleSelectionChange);
    };
  }, [handleSelectionChange]);

  const handleGradientChange = (gradient) => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    const activeSelection = canvas.getActiveObject();
    if (!activeSelection) return;

    const cssGradient = gradient.cssGradient;

    const applyGradient = (object) => {
      object.set(
        "fill",
        new fabric.Gradient({
          type: gradient.fabricGradient.type,
          gradientUnits: "percentage",
          coords: gradient.fabricGradient.coords,
          colorStops: gradient.fabricGradient.colorStops,
        })
      );
    };

    if (activeSelection.type === "activeSelection") {
      activeSelection.forEachObject((object) => {
        applyGradient(object);
      });
    } else {
      applyGradient(activeSelection);
      setGradient(cssGradient);
    }
    canvas.renderAll();
  };

  //
  const [isResizing, setIsResizing] = useState(false);
  const [leftWidth, setLeftWidth] = useState(40);

  const [isPanningEnabled, setIsPanningEnabled] = useState(false);
  const [scale, setScale] = useState(1);
  const [translation, setTranslation] = useState({ x: 0, y: 0 });
  // probably no needed - you can delete later
  // const mapInteractionRef = useRef(null);

  const zoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1));
  };

  const resetZoom = () => {
    setScale(1);
    setTranslation({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " || e.key === "h") {
        setIsPanningEnabled(true);
        document.body.style.cursor = "grab";
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === " " || e.key === "h") {
        setIsPanningEnabled(false);
        document.body.style.cursor = "default";
      }
    };

    const handleMouseDown = (e) => {
      if (isPanningEnabled) {
        document.body.style.cursor = "grabbing";
      }

      // Set focus to null to prevent triggering the last pressed button
      document.activeElement.blur();
    };

    const handleMouseUp = (e) => {
      if (isPanningEnabled) {
        document.body.style.cursor = "grab";
      } else {
        document.body.style.cursor = "default";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPanningEnabled]);

  useEffect(() => {
    let animationFrame;

    const handleMouseMove = (e) => {
      const newLeftWidth = (e.clientX / window.innerWidth) * 100;
      if (newLeftWidth > 26 && newLeftWidth < 76) {
        setLeftWidth(newLeftWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };

    const handleResize = (e) => {
      if (!isResizing) return;

      animationFrame = requestAnimationFrame(() => handleMouseMove(e));
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleResize);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleMouseUp);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isResizing]);

  // probably no needed - you can delete later
  // useEffect(() => {
  //   const mapInteractionElement = mapInteractionRef.current;

  //   const updateScaleState = () => {
  //     if (mapInteractionElement) {
  //       const { scale, translation } = mapInteractionElement.state;
  //       setScale(scale);
  //       setTranslation(translation);
  //     }
  //   };

  //   if (mapInteractionElement) {
  //     mapInteractionElement.addEventListener("change", updateScaleState);
  //   }

  //   return () => {
  //     if (mapInteractionElement) {
  //       mapInteractionElement.removeEventListener("change", updateScaleState);
  //     }
  //   };
  // }, [mapInteractionRef]);

  //
  const [isEditingGroup, setIsEditingGroup] = useState(false);

  const handleSVGUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.includes("svg")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const svgString = e.target.result;

        // Use fabric's loadSVGFromString method to parse and create Fabric.js objects
        fabric.loadSVGFromString(svgString, (objects, options) => {
          // Assign custom IDs to each element within the group
          objects.forEach((obj, index) => {
            obj.set("id", `svg-element-${Date.now()}-${index}`);
          });
          // Create a group from the parsed objects
          const svgGroup = new fabric.Group(objects, {
            label: "SVG",
            id: `svg-group-${Date.now()}`, // Assign custom ID with timestamp
            selectable: true,
            hasBorders: true,
            hasControls: true,
            lockMovementX: false,
            lockMovementY: false,
            lockScalingX: false,
            lockScalingY: false,
            lockRotation: false,
          });

          // Maintain 1:1 ratio and fit to canvas
          const scaleX = canvasInstance.current.width / options.width;
          const scaleY = canvasInstance.current.height / options.height;
          const scale = Math.min(scaleX, scaleY);

          svgGroup.scale(scale);
          svgGroup.set({
            left:
              (canvasInstance.current.width - svgGroup.getScaledWidth()) / 2,
            top:
              (canvasInstance.current.height - svgGroup.getScaledHeight()) / 2,
          });

          // Add the group to the canvas
          canvasInstance.current.add(svgGroup);

          // Render the canvas
          canvasInstance.current.renderAll();
          updateImageObjectsOrder();

          // Add double-click event listener to ungroup the SVG elements
          svgGroup.on("mousedblclick", () => {
            const activeObject = canvasInstance.current.getActiveObject();
            if (activeObject && activeObject.type === "group") {
              ungroupSVG(activeObject);
            }
          });
        });
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid SVG file.");
    }
  };

  let originalOpacities = [];
  let ungroupedItems = []; // Array to store ungrouped items

  const ungroupSVG = (group) => {
    setIsEditingGroup(true);
    const items = group._objects;
    const autoLayout = group.autoLayout;
    const layoutDirection = group.layoutDirection;
    const gap = group.gap;
    const alignment = group.alignment;
    const id = group.id;
    group._restoreObjectsState();
    const groupIndex = canvasInstance.current.getObjects().indexOf(group); // Store the index of the group

    canvasInstance.current.remove(group);

    originalOpacities = canvasInstance.current
      .getObjects()
      .map((obj) => obj.opacity);

    ungroupedItems = [...items]; // Store the initial items

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      canvasInstance.current.add(item);
      item.setCoords();
    }

    canvasInstance.current.getObjects().forEach((obj, index) => {
      if (!items.includes(obj)) {
        obj.set({ opacity: 0.2, selectable: false });
      }
    });

    canvasInstance.current.renderAll();

    // Optionally, add event listener to regroup the elements
    canvasInstance.current.on("mouse:down", (e) => {
      if (!canvasInstance.current.getActiveObject()) {
        regroupSVG(
          ungroupedItems,
          groupIndex,
          autoLayout,
          layoutDirection,
          gap,
          alignment,
          id
        );
      }
    });
  };

  const regroupSVG = (
    items,
    groupIndex,
    autoLayout,
    layoutDirection,
    gap,
    alignment,
    id
  ) => {
    setIsEditingGroup(false);

    // Ensure the items array contains only the elements that are still on the canvas
    const filteredItems = items.filter((item) =>
      canvasInstance.current.contains(item)
    );

    const svgGroup = new fabric.Group(filteredItems, {
      label: "SVG",
      id,
      selectable: true,
      hasBorders: true,
      hasControls: true,
      lockMovementX: false,
      lockMovementY: false,
      lockScalingX: false,
      lockScalingY: false,
      lockRotation: false,
      autoLayout,
      layoutDirection,
      gap,
      alignment,
    });

    canvasInstance.current.insertAt(svgGroup, groupIndex, false);

    filteredItems.forEach((item) => {
      canvasInstance.current.remove(item);
    });

    canvasInstance.current.getObjects().forEach((obj, index) => {
      if (!filteredItems.includes(obj)) {
        obj.set({ opacity: originalOpacities[index], selectable: true });
      }
    });

    canvasInstance.current.renderAll();
    updateImageObjectsOrder();

    // Reattach the double-click event listener to the new group
    svgGroup.on("mousedblclick", () => {
      const activeObject = canvasInstance.current.getActiveObject();
      if (activeObject && activeObject.type === "group") {
        ungroupSVG(activeObject);
      }
    });

    // Apply auto layout if it was set to true
    if (autoLayout) {
      applyAutoLayout(svgGroup, canvasInstance.current);
    }

    // Remove the mouse:down event listener to avoid repeated regrouping
    canvasInstance.current.off("mouse:down");
  };

  // Attach the double-click event listener to group objects
  const attachDoubleClickListener = (group) => {
    group.on("mousedblclick", () => {
      const activeObject = canvasInstance.current.getActiveObject();
      if (activeObject && activeObject.type === "group") {
        ungroupSVG(activeObject);
      }
    });
  };

  //

  // const group = () => {
  //   const activeObject = canvasInstance.current.getActiveObject();
  //   if (activeObject && activeObject.type === "activeSelection") {
  //     const group = activeObject.toGroup();
  //     group.set({
  //       id: `group-${Date.now()}`,
  //       label: "Group",
  //     });

  //     canvasInstance.current.requestRenderAll();
  //     group.on("mousedblclick", () => {
  //       const activeObject = canvasInstance.current.getActiveObject();
  //       if (activeObject && activeObject.type === "group") {
  //         ungroupSVG(activeObject);
  //       }
  //     });
  //   }
  //   updateImageObjectsOrder();
  // };

  const group = () => {
    const activeObject = canvasInstance.current.getActiveObject();
    if (activeObject && activeObject.type === "activeSelection") {
      // Get all objects in the active selection
      const objects = activeObject._objects;

      // Check if any of the selected objects are groups
      // const hasGroup = objects.some((obj) => obj.type === "group");
      const hasNonQRCodeGroup = objects.some(
        (obj) =>
          obj.type === "group" &&
          obj.id &&
          !obj.id.startsWith("qrcode-") &&
          !obj.id.startsWith("icon-")
      );
      // If there are no groups, proceed with grouping
      // if (!hasGroup) {
      if (!hasNonQRCodeGroup) {
        const group = activeObject.toGroup();
        group.set({
          id: `group-${Date.now()}`,
          label: "Group",
          autoLayout: false,
        });

        canvasInstance.current.requestRenderAll();
        setIsTextSelected(false);
        setIsShapeSelected(false);
        setIsRectangleSelected(false);
        setIsCircleSelected(false);
        setIsImageSelected(false);
        setIsLineSelected(false);
        setSelectedObjectType(false);
        setIsVectorElementSelected(false);
        setIsGroupSelected(true);
        group.on("mousedblclick", () => {
          const activeObject = canvasInstance.current.getActiveObject();
          if (activeObject && activeObject.type === "group") {
            ungroupSVG(activeObject);
          }
        });
      } else {
        console.log(
          "Cannot group objects because one or more objects are already a group."
        );
      }
    }
    updateImageObjectsOrder();
  };

  // const ungroup = () => {
  //   const activeObject = canvasInstance.current.getActiveObject();
  //   if (activeObject && activeObject.type === "group") {
  //     activeObject.toActiveSelection();
  //     canvasInstance.current.discardActiveObject();
  //     canvasInstance.current.requestRenderAll();
  //   }
  //   updateImageObjectsOrder();
  // };
  const ungroup = () => {
    const activeObject = canvasInstance.current.getActiveObject();
    if (activeObject && activeObject.type === "group") {
      if (
        activeObject.id &&
        (activeObject.id.startsWith("qrcode-") ||
          activeObject.id.startsWith("icon-"))
      ) {
        console.log("Cannot ungroup objects with IDs starting with 'qrcode-'.");
        return;
      }

      activeObject.toActiveSelection();
      canvasInstance.current.discardActiveObject();
      canvasInstance.current.requestRenderAll();
    }
    updateImageObjectsOrder();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "g") {
          e.preventDefault();
          group();
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") {
          e.preventDefault();
          ungroup();
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "[") {
          e.preventDefault();
          moveSelectedObjectDown();
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "]") {
          e.preventDefault();
          moveSelectedObjectUp();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      canvasInstance.current.dispose();
    };
    // eslint-disable-next-line
  }, []);
  //
  // Autolayout starts here
  const applyAutoLayout = (group, canvasInstance) => {
    const layoutDirection = group.layoutDirection || "row";
    const defaultAlignment = layoutDirection === "row" ? "top" : "left";
    const alignment = group.alignment || defaultAlignment;
    const gap = group.gap || 0;

    group.set({
      autoLayout: group.autoLayout,
      layoutDirection: layoutDirection,
      gap: gap,
      alignment: alignment,
      label: group.label,
      angle: group.angle,
    });

    canvasInstance.remove(group); // Detach the group temporarily
    let offset = 0;

    let items = group.getObjects();

    items = items.sort((a, b) =>
      layoutDirection === "row" ? a.left - b.left : a.top - b.top
    );

    const maxDimension = items.reduce(
      (max, item) =>
        Math.max(
          max,
          layoutDirection === "row"
            ? item.getBoundingRect(true).height
            : item.getBoundingRect(true).width
        ),
      0
    );

    items.forEach((obj) => {
      const boundingRect = obj.getBoundingRect(true);

      if (layoutDirection === "row") {
        obj.set({
          left: offset,
          top:
            alignment === "center"
              ? (maxDimension - boundingRect.height) / 2
              : alignment === "bottom"
              ? maxDimension - boundingRect.height
              : 0,
        });
        offset += boundingRect.width + gap;
      } else {
        obj.set({
          top: offset,
          left:
            alignment === "center"
              ? (maxDimension - boundingRect.width) / 2
              : alignment === "right"
              ? maxDimension - boundingRect.width
              : 0,
        });
        offset += boundingRect.height + gap;
      }
    });

    const newGroup = new fabric.Group(items, {
      left: group.left,
      top: group.top,
      originX: "left",
      originY: "top",
      autoLayout: group.autoLayout,
      layoutDirection: layoutDirection,
      gap: gap,
      alignment: alignment,
      id: group.id,
      label: group.label,
      selectable: group.selectable,
      evented: group.evented,
      angle: group.angle,
    });

    canvasInstance.add(newGroup);
    canvasInstance.setActiveObject(newGroup);
    canvasInstance.requestRenderAll();
  };

  useEffect(() => {
    if (canvasInstance.current) {
      const canvas = canvasInstance.current;
      const activeObject = canvas.getActiveObject();
      if (autoLayout && activeObject && activeObject.type === "group") {
        applyAutoLayout(activeObject, canvas);

        // Create a reference to the new group
        const newGroup = canvas.getActiveObject();

        // Ensure the group exists before attaching the event listener
        if (newGroup && newGroup.type === "group") {
          const handleDoubleClick = () => {
            const activeObject = canvasInstance.current.getActiveObject();
            if (activeObject && activeObject.type === "group") {
              ungroupSVG(activeObject);
            }
          };

          // Attach the double-click event listener
          newGroup.on("mousedblclick", handleDoubleClick);

          // Clean up the event listener on component unmount
          return () => {
            newGroup.off("mousedblclick", handleDoubleClick);
          };
        }
      }
    }
    // eslint-disable-next-line
  }, [autoLayout, layoutDirection, gap, alignment]);

  useEffect(() => {
    if (canvasInstance.current) {
      const canvas = canvasInstance.current;
      const groups = canvas
        .getObjects("group")
        .filter((group) => group.autoLayout);

      groups.forEach((group) => {
        applyAutoLayout(group, canvas);

        const handleDoubleClick = () => {
          const activeObject = canvas.getActiveObject();
          if (activeObject && activeObject.type === "group") {
            ungroupSVG(activeObject);
          }
        };

        // Attach the double-click event listener
        group.on("mousedblclick", handleDoubleClick);

        // Clean up the event listener on component unmount
        return () => {
          group.off("mousedblclick", handleDoubleClick);
        };
      });
    }
    // eslint-disable-next-line
  }, [canvasWidth, canvasHeight, backgroundColor, backgroundImage]);

  useEffect(() => {
    if (canvasInstance.current) {
      const canvas = canvasInstance.current;

      const updateSelectedObjectPropertiesAL = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === "group") {
          setAutoLayout(activeObject.autoLayout || false);
          setLayoutDirection(activeObject.layoutDirection || "row");
          setGap(activeObject.gap || 0);
          setAlignment(
            activeObject.alignment ||
              (activeObject.layoutDirection === "row" ? "top" : "left")
          );
        } else {
          setAutoLayout(false);
          setLayoutDirection("row");
          setGap(0);
          setAlignment("top");
        }
      };

      canvas.on("selection:updated", updateSelectedObjectPropertiesAL);
      canvas.on("selection:created", updateSelectedObjectPropertiesAL);
      canvas.on("selection:cleared", updateSelectedObjectPropertiesAL);

      return () => {
        canvas.off("selection:updated", updateSelectedObjectPropertiesAL);
        canvas.off("selection:created", updateSelectedObjectPropertiesAL);
        canvas.off("selection:cleared", updateSelectedObjectPropertiesAL);
        console.log("Event listeners detached");
      };
    }
    // eslint-disable-next-line
  }, [canvasInstance.current]);

  useEffect(() => {
    if (canvasInstance.current) {
      const canvas = canvasInstance.current;

      const updateTextBoxWidthsAndReapplyAutoLayout = (group) => {
        const textItems = group
          .getObjects()
          .filter((item) => item.type === "textbox" || item.type === "text");

        const newGroupWidth = group.width * group.scaleX;

        textItems.forEach((textItem) => {
          textItem.set({
            scaleX: 1,
            scaleY: 1,
            width: newGroupWidth,
          });
        });

        group.set({
          scaleX: 1,
          scaleY: 1,
          width: newGroupWidth,
        });

        // Debounced reapply auto layout
        debouncedApplyAutoLayout(group, canvas);
        canvas.requestRenderAll();
      };

      const debouncedApplyAutoLayout = debounce((group, canvas) => {
        applyAutoLayout(group, canvas);
      }, 100);

      const handleObjectScaling = (e) => {
        const target = e.target;
        if (target && target.type === "group" && target.autoLayout) {
          // Check if layoutDirection is 'row'
          if (target.layoutDirection === "row") {
            // Prevent scaling and resizing if layoutDirection is 'row'
            target.set({
              scaleX: 1,
              scaleY: 1,
            });
            canvas.requestRenderAll();
            return;
          }

          updateTextBoxWidthsAndReapplyAutoLayout(target);
        }
      };

      const handleObjectModified = (e) => {
        const target = e.target;
        if (target && target.type === "group" && target.autoLayout) {
          // Check if layoutDirection is 'row'
          if (target.layoutDirection === "row") {
            // Prevent resizing if layoutDirection is 'row'
            target.set({
              scaleX: 1,
              scaleY: 1,
            });
            canvas.requestRenderAll();
            return;
          }

          updateTextBoxWidthsAndReapplyAutoLayout(target);
        }
      };

      canvas.on("object:scaling", handleObjectScaling);
      canvas.on("object:modified", handleObjectModified);

      return () => {
        canvas.off("object:scaling", handleObjectScaling);
        canvas.off("object:modified", handleObjectModified);
      };
    }
    // eslint-disable-next-line
  }, [canvasInstance.current]);

  // Update alignment based on layout direction change
  // useEffect(() => {
  //   if (layoutDirection === "row") {
  //     setAlignment("top");
  //   } else if (layoutDirection === "column") {
  //     setAlignment("left");
  //   }
  // }, [layoutDirection, setAlignment]);

  const triggerAutoLayout = () => {
    const canvas = canvasInstance.current;
    group(canvas);
    setAutoLayout(true);
    setLayoutDirection("column");
    setAlignment("left");
  };
  //
  // Generate QR code
  const addQrCodeToCanvas = () => {
    const canvas = canvasInstance.current;
    const svgElement = qrRef.current.querySelector("svg");
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().getTime(); // Get the current timestamp
    const groupId = `qrcode-${timestamp}`; // Generate a custom ID with timestamp

    fabric.loadSVGFromURL(url, (objects, options) => {
      const qrGroup = fabric.util.groupSVGElements(objects, options);
      qrGroup.scaleToWidth(100); // Adjust the size as needed
      qrGroup.scaleToHeight(100); // Adjust the size as needed
      qrGroup.set({ left: 150, top: 150, id: groupId, label: "QR code" }); // Set the custom ID and label for the group

      // Update child elements with custom IDs and labels
      qrGroup.forEachObject((obj, index) => {
        obj.set({ id: `${groupId}-child-${index}`, label: "QR code child" });
      });

      canvas.add(qrGroup);
      updateImageObjectsOrder();

      canvas.renderAll();
      // if (qrGroup && qrGroup.type === "group") {
      //   const handleDoubleClick = () => {
      //     const activeObject = canvasInstance.current.getActiveObject();
      //     if (activeObject && activeObject.type === "group") {
      //       ungroupSVG(activeObject);
      //     }
      //   };

      //   // Attach the double-click event listener
      //   qrGroup.on("mousedblclick", handleDoubleClick);

      //   // Clean up the event listener on component unmount
      //   return () => {
      //     qrGroup.off("mousedblclick", handleDoubleClick);
      //   };
      // }

      URL.revokeObjectURL(url); // Clean up the object URL
    });
  };

  const handleQRValueInputChange = (event) => {
    setQrValue(event.target.value);
  };
  //
  const [canvasJSON, setCanvasJSON] = useState("{}");
  const [showHTML, setShowHTML] = useState(false);

  const getCanvasJSON = () => {
    if (canvasInstance.current) {
      const canvasData = canvasInstance.current.toObject([
        "width",
        "height",
        "objects",
      ]);

      const processGroups = (objects) => {
        objects.forEach((object) => {
          if (object.type === "group" && object.objects) {
            object.objects = object.objects.map((innerObject) =>
              innerObject.toObject(["width", "height", "objects"])
            );
            processGroups(object.objects);
          }
        });
      };

      processGroups(canvasData.objects);

      canvasData.width = canvasInstance.current.width;
      canvasData.height = canvasInstance.current.height;

      const json = JSON.stringify(canvasData);
      setCanvasJSON(json);
      setShowHTML(true);
    }
  };

  // const addTextbox = () => {
  //   const textbox = new fabric.Textbox('Hello, World!', {
  //     left: 50,
  //     top: 50,
  //     fill: 'white', // Text color
  //     backgroundColor: 'red', // Background fill color
  //     textBackgroundColor: 'red', // Text background color
  //     padding: 20, // Padding
  //     borderRadius: 8, // Border radius
  //     textAlign: 'center',
  //     lockScalingY: true, // Lock scaling vertically
  //     id: 'text-button-' + Date.now() // Unique identifier
  //   });

  //   // Adding custom border radius logic
  //   textbox.on('added', () => {
  //     const ctx = canvasInstance.current.getContext();
  //     ctx.roundRect = (x, y, w, h, r) => {
  //       if (w < 2 * r) r = w / 2;
  //       if (h < 2 * r) r = h / 2;
  //       ctx.beginPath();
  //       ctx.moveTo(x + r, y);
  //       ctx.arcTo(x + w, y, x + w, y + h, r);
  //       ctx.arcTo(x + w, y + h, x, y + h, r);
  //       ctx.arcTo(x, y + h, x, y, r);
  //       ctx.arcTo(x, y, x + w, y, r);
  //       ctx.closePath();
  //     };

  //     textbox._renderBackground = function (ctx) {
  //       if (!this.backgroundColor) return;

  //       ctx.save();
  //       ctx.fillStyle = this.backgroundColor;
  //       const w = this.width + 2 * this.padding;
  //       const h = this.height + 2 * this.padding;
  //       const x = -this.width / 2 - this.padding;
  //       const y = -this.height / 2 - this.padding;

  //       // Create a clipping path to ensure the background does not overflow
  //       ctx.roundRect(x, y, w, h, this.borderRadius);
  //       ctx.clip();

  //       // Fill the background color within the clipped path
  //       ctx.fillRect(x, y, w, h);
  //       ctx.restore();
  //     };

  //     canvasInstance.current.renderAll();
  //   });

  //   // Custom control to resize width only for specific textbox
  //   textbox.controls = {
  //     ...fabric.Textbox.prototype.controls,
  //     ml: new fabric.Control({
  //       x: -0.5,
  //       y: 0,
  //       offsetX: -20,
  //       cursorStyle: 'w-resize',
  //       actionHandler: fabric.controlsUtils.scalingXHandler,
  //       getActionName: () => 'scale',
  //     }),
  //     mr: new fabric.Control({
  //       x: 0.5,
  //       y: 0,
  //       offsetX: 20,
  //       cursorStyle: 'e-resize',
  //       actionHandler: fabric.controlsUtils.scalingXHandler,
  //       getActionName: () => 'scale',
  //     }),
  //   };

  //   canvasInstance.current.add(textbox);
  // };

  //
  const [selectedColor, setSelectedColor] = useState("#000000");
  useEffect(() => {
    if (selectedObject) {
      const color = selectedObject.fill || selectedObject.stroke || "#000000";
      setSelectedColor(color);
      setIconWidth(selectedObject.width * selectedObject.scaleX);
      setIconHeight(selectedObject.height * selectedObject.scaleY);
    }
  }, [selectedObject]);
  useEffect(() => {
    const canvas = canvasInstance.current;

    if (!canvas) {
      return; // If canvas is not yet available, exit the effect early
    }

    // Handle object scaling
    const handleObjectScaling = (e) => {
      const obj = e.target;
      if (obj) {
        const roundedWidth = Math.round(obj.width * obj.scaleX);
        const roundedHeight = Math.round(obj.height * obj.scaleY);

        obj.scaleX = roundedWidth / obj.width;
        obj.scaleY = roundedHeight / obj.height;

        setIconWidth(roundedWidth);
        setIconHeight(roundedHeight);

        canvasInstance.current.renderAll();
      }
    };

    canvas.on("object:scaling", handleObjectScaling);

    return () => {
      canvas.off("object:scaling", handleObjectScaling);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]);

  const handleIconColorChange = (color) => {
    setSelectedColor(color);

    if (selectedObject) {
      //   console.log("Selected Object:", selectedObject);

      if (selectedObject.type === "group") {
        selectedObject.getObjects().forEach((obj) => {
          console.log("Group Object:", obj);
          if (
            obj.type === "path" ||
            obj.type === "rect" ||
            obj.type === "circle" ||
            obj.type === "polygon" ||
            obj.type === "line"
          ) {
            if (obj.fill) {
              obj.set("fill", color);
            }
            if (obj.stroke) {
              obj.set("stroke", color);
            }
          }
        });
      } else {
        // console.log("Single Object:", selectedObject);
        if (
          selectedObject.type === "path" ||
          selectedObject.type === "rect" ||
          selectedObject.type === "circle" ||
          selectedObject.type === "polygon" ||
          selectedObject.type === "line"
        ) {
          if (selectedObject.fill) {
            selectedObject.set("fill", color);
          }
          if (selectedObject.stroke) {
            selectedObject.set("stroke", color);
          }
        }
      }
      canvasInstance.current.renderAll();
    }
  };
  const handleIconInputChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);
    handleIconColorChange(color);
  };
  //
  const [iconWidth, setIconWidth] = useState(0);
  const [iconHeight, setIconHeight] = useState(0);

  const handleIconWidthChange = (e) => {
    const newWidth = parseFloat(e.target.value);
    setIconWidth(newWidth);
    if (selectedObject) {
      const scaleX = newWidth / selectedObject.width;
      selectedObject.scaleX = scaleX;
      canvasInstance.current.renderAll();
    }
  };

  const handleIconHeightChange = (e) => {
    const newHeight = parseFloat(e.target.value);
    setIconHeight(newHeight);
    if (selectedObject) {
      const scaleY = newHeight / selectedObject.height;
      selectedObject.scaleY = scaleY;
      canvasInstance.current.renderAll();
    }
  };
  //
  // eslint-disable-next-line
  const [slides, setSlides] = useState([]);
  const [template, setTemplate] = useState("slides");
  const [isSpot, setIsSpot] = useState(false);
  const toggleSpot = () => {
    setIsSpot(true);
  };
  const closeSpot = () => {
    setIsSpot(false);
  };
  const handleTemplateChange = (value) => {
    setTemplate(value);
  };

  const handleResponse = (response) => {
    const data = response.slides;
    let slideData = [];

    if (template === "linkedin") {
      data.forEach((item, index) => {
        const { text, imageSrc } = item;
        const slides = text.split(/Slide \d+:|Last Slide:/).slice(1); // Split the text into individual slides

        slides.forEach((slide, i) => {
          const titleMatch = slide.match(/Title:\s*(.+)/);
          const textMatch = slide.match(
            /Text:\s*([\s\S]+?)(?=\nTitle:|\nCall to Action:|$)/
          );
          const ctaMatch = slide.match(/Call to Action:\s*(.+)/);

          slideData.push({
            id: index * slides.length + i + 1,
            title: titleMatch ? titleMatch[1].trim() : "",
            text: textMatch ? textMatch[1].trim() : "",
            cta: ctaMatch ? ctaMatch[1].trim() : "",
            imgSrc: imageSrc,
          });
        });
      });

      // Remove empty title slides
      slideData = slideData.filter(
        (slide) => slide.title !== "" || slide.text !== ""
      );
    } else if (template === "instagram") {
      const { imageSrc } = data[0];

      const titleMatch = data[0].text.match(/Title: (.+)/);
      const textMatch = data[0].text.match(/Text: ([\s\S]+)/);

      slideData = [
        {
          id: 1,
          title: titleMatch ? titleMatch[1].trim() : "Instagram Post",
          text: textMatch ? textMatch[1].trim() : "",
          imgSrc: imageSrc,
        },
      ];
    } else if (template === "gamingcard") {
      data.forEach((item, index) => {
        const { text, imageSrc } = item;
        const cards = text.split(/Slide \d+:/).slice(1);

        cards.forEach((card, i) => {
          const lines = card.split("\n").filter((line) => line.trim() !== "");
          const fields = {};
          let cardText = "";

          lines.forEach((line) => {
            const [key, value] = line.split(":");
            if (value !== undefined) {
              fields[key.trim()] = value.trim();
            } else {
              cardText = key.trim();
            }
          });

          slideData.push({
            id: index * cards.length + i + 1,
            text: cardText,
            ...fields,
            imgSrc: imageSrc,
          });
        });
      });
    } else {
      data.forEach((item, index) => {
        const { text, imageSrc } = item;
        const slides = text.split(/Slide \d+:/).slice(1);

        slides.forEach((slide, i) => {
          const titleMatch = slide.match(/Title: (.+)/);
          const textMatch = slide.match(/Text: ([\s\S]+)/);

          slideData.push({
            id: index * slides.length + i + 1,
            title: titleMatch ? titleMatch[1].trim() : "",
            text: textMatch ? textMatch[1].trim() : slide.trim(),
            imgSrc: imageSrc,
          });
        });
      });
    }

    // Ensure slideData is correctly populated before storing
    if (slideData.length > 0) {
      setSlides(slideData);
      setTableData(slideData);
      localStorage.setItem("tableData", JSON.stringify(slideData));
      generateCanvases(slideData);
    } else {
      console.error("No slide data generated");
    }
  };
  //
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);

  useEffect(() => {
    const savedCanvasState = localStorage.getItem("fabricCanvas");
    if (savedCanvasState) {
      setIsRestoreDialogOpen(true);
    }
  }, []);
  //
  return (
    <>
      {/* {isDialogOpen && (
        <DialogWelcome open={isDialogOpen} onOpenChange={handleDialogClose} />
      )} */}
      <Toast
        showToast={showToast}
        setShowToast={setShowToast}
        simple
        text={toastText}
        time={3000}
      />
      {isRestoreDialogOpen && (
        <RestoreDialog
          open={isRestoreDialogOpen}
          onOpenChange={setIsRestoreDialogOpen}
          onRestore={() => {
            loadCanvasFromLocalStorage();
            setIsRestoreDialogOpen(false);
          }}
        />
      )}

      {isDialogTemplatesOpen && (
        <DialogTemplates
          open={isDialogTemplatesOpen}
          onOpenChange={handleDialogTemplatesClose}
          loadTemplate={updateCanvasFromTemplate}
        />
      )}

      {showHTML && <HtmlPreview json={canvasJSON} setShowHTML={setShowHTML} />}
      {showSpot && isSpot && viewMode === "Design" && (
        <ChatGPTInput
          onResponse={handleResponse}
          handleTemplateChange={handleTemplateChange}
          template={template}
          closeSpot={closeSpot}
        />
      )}

      {/* <div
        style={{
          position: "fixed",
          zIndex: "99",
          bottom: "16px",
          width: "50%",
          margin: "auto",
          left: "24px",
          transform: "scale(0.4)",
        }}
      >
        <div>
          {slides.map((slide) => (
            <div key={slide.id} className="slide">
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
              {slide.imgSrc && (
                <div>
                  <img
                    src={slide.imgSrc}
                    alt={slide.title}
                    style={{
                      width: "100%",
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <p>
                    Image URL:{" "}
                    <a
                      href={slide.imgSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {slide.imgSrc}
                    </a>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div> */}

      {contextMenuOpen && (
        <DropdownMenu open={contextMenuOpen} onOpenChange={setContextMenuOpen}>
          <DropdownMenu.Trigger />
          <DropdownMenu.Content
            style={{
              top: contextMenuPosition.y,
              left: contextMenuPosition.x,
              position: "absolute",
              zIndex: "999",
            }}
          >
            <DropdownMenu.Item onClick={moveSelectedObjectUp} hotkey="cmd + ]">
              Bring to Front
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={moveSelectedObjectDown}
              hotkey="cmd + ["
            >
              Send to Back
            </DropdownMenu.Item>
            <Separator />
            <DropdownMenu.Item onClick={selectAllObjects} hotkey="cmd + a">
              Select All
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={deselectAllObjects} hotkey="d">
              Deselect All
            </DropdownMenu.Item>
            <Separator />
            <DropdownMenu.Item
              disabled={!isGroupingEnabled}
              onClick={triggerAutoLayout}
            >
              Auto-layout
            </DropdownMenu.Item>
            <DropdownMenu.Item
              disabled={!isGroupingEnabled}
              onClick={group}
              hotkey="cmd + g"
            >
              Group Selection
            </DropdownMenu.Item>
            <DropdownMenu.Item
              disabled={!isGroupSelected}
              onClick={ungroup}
              hotkey="cmd + u"
            >
              Ungroup Selection
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={duplicateSelectedObject}
              hotkey="cmd + d"
            >
              Duplicate
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={deleteSelectedObject} hotkey="del">
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      )}

      {isDialogTemplateOpen && (
        <DialogTemplate
          open={isDialogTemplateOpen}
          onOpenChange={handleDialogTemplateClose}
          templateName={templateName}
          setTemplateName={setTemplateName}
          downloadTemplate={downloadTemplate}
        />
      )}

      {isDialogExportOpen && (
        <DialogExport
          open={isDialogExportOpen}
          onOpenChange={handleDialogExportClose}
          handleSheetUrlChange={handleSheetUrlChange}
          handleSubmit={handleSubmit}
          sheetUrl={sheetUrl}
        />
      )}
      <Flex
        fluid
        style={{ height: "100vh", overflow: "hidden" }}
        customClass={`${viewMode === "Split" && "SplitViewOn"}`}
      >
        <Flex
          gap={400}
          direction="column"
          customClass={`TableEditor nonmobile ${
            viewMode === "Split" && "SplitViewOn"
          }`}
          style={{ width: `${viewMode === "Split" ? `${leftWidth}` : 100}%` }}
        >
          <Flex
            fluid
            style={{
              marginTop: "var(--size-300)",
              padding: "0 var(--size-200)",
            }}
            gap={300}
            direction="column"
          >
            <Flex gap={200} fluid direction="column">
              <Heading level={4} weight="bold">
                Table Editor
              </Heading>
              <Paragraph>
                <ArrowUpIcon />
                Click on a row in the table to bring your design to the front.
              </Paragraph>
              <Paragraph>
                <Pencil1Icon />
                Double-click on any cell to edit its content, and you'll see the
                changes update instantly on the right side.
              </Paragraph>
            </Flex>
            {/* <Input
              type="text"
              value={sheetUrl}
              onChange={handleSheetUrlChange}
              placeholder="Enter your Google Sheet URL"
              label="Google Sheet URL"
              fluid
            />
            <Button fluid onClick={handleSubmit} size="small" variant="solid">
              <LightningBoltIcon />
              Render Banners
            </Button> */}
            <Flex gap={200}>
              <Button
                fluid
                onClick={handleDownload}
                size="small"
                variant="ghost"
              >
                <TableIcon />
                Download CSV
              </Button>
              <Button
                fluid
                onClick={handleRefresh}
                size="small"
                variant="solid"
              >
                <RepeatIcon />
                Refresh
              </Button>
            </Flex>
          </Flex>

          <Flex
            gap={100}
            style={{
              borderTop: "1px solid var(--border-neutral-subtle)",
              overflowY: "hidden",
            }}
            fluid
            direction="column"
          >
            {dataLoaded && (
              <Table
                onRowClick={(row) => handleCellEdit(row)}
                columns={columns}
                data={tableData}
                pageSize={99}
                // onRowClick={(row) => console.log(row)}
                // multiSelect={true}
                // onMultiSelect={(selectedRows) => {
                //   setSelectedRows(new Set(selectedRows.map((row) => row.index)));
                //   console.log(selectedRows);
                // }}
                maxPagination={5}
                fluid={true}
                search={true}
                // sorting={true}
                // large
                onDataChange={handleTableDataChange}
                editable={true}
              >
                <Flex gap={100}>
                  <Button
                    variant="outline"
                    size="medium"
                    onClick={handleAddRow}
                  >
                    Add Row
                  </Button>
                  <Button
                    variant="outline"
                    size="medium"
                    onClick={handleAddColumn}
                  >
                    Add Column
                  </Button>
                </Flex>
              </Table>
            )}
          </Flex>
          {viewMode === "Split" && (
            <div
              className="Resizer"
              onMouseDown={() => setIsResizing(true)}
            ></div>
          )}
        </Flex>

        <Flex
          direction="column"
          align="center"
          fluid
          customClass="CanvasWrapper"
          style={{ width: `${viewMode === "Split" ? 100 - leftWidth : 100}%` }}
        >
          <Flex
            direction="column"
            align="center"
            fluid
            style={{ paddingBottom: "var(--size-400)" }}
          >
            <Flex direction="column" customClass="TemplateCreator">
              {viewMode !== "Split" && (
                <Toolbar orientation="horizontal" id="ToolbarTopLeft">
                  <Flex gap={100} align="center">
                    <a
                      href="https://sebikostudio.com/"
                      rel="noreferrer"
                      target="_blank"
                      style={{ margin: "0 var(--size-200)", cursor: "pointer" }}
                      className="logoLink"
                    >
                      {/* <img
                        className="logo"
                        src={darkmodeChecked ? LogoWhite : Logo}
                        alt="Table Designer"
                      /> */}
                      <SebikoLogo className="logo" />
                    </a>
                    <Flex customClass="nonmobile" gap={100}>
                      {/* <Tooltip>
                        <Tooltip.Trigger asChild>
                          <div>
                            <Toggle
                              size="small"
                              variant="ghost"
                              pressed={isSidebarVisible}
                              onPressedChange={() => toggleSidebar()}
                            >
                              {isSidebarVisible ? (
                                <PinLeftIcon />
                              ) : (
                                <HamburgerMenuIcon />
                              )}
                            </Toggle>
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          {isSidebarVisible ? "Close sidebar" : "Open sidebar"}
                        </Tooltip.Content>
                      </Tooltip> */}

                      <DropdownMenu modal={false}>
                        <DropdownMenu.Trigger asChild>
                          <Button size="small" variant="ghost">
                            File
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content sideOffset={10} align="start">
                          <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger icon={LayersIcon}>
                              Export All
                            </DropdownMenu.SubTrigger>
                            <DropdownMenu.SubContent>
                              <DropdownMenu.Item
                                icon={ImageIcon}
                                onClick={handleExport}
                              >
                                as PNG 2x
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                icon={TransformIcon}
                                onClick={handleExportAllSVG}
                              >
                                as SVG
                              </DropdownMenu.Item>
                            </DropdownMenu.SubContent>
                          </DropdownMenu.Sub>
                          <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger icon={ImageIcon}>
                              Export
                            </DropdownMenu.SubTrigger>
                            <DropdownMenu.SubContent>
                              <DropdownMenu.Item
                                icon={ImageIcon}
                                onClick={() => exportPrimaryCanvas("png", 1)}
                              >
                                as PNG
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                icon={ImageIcon}
                                onClick={() => exportPrimaryCanvas("png", 2)}
                              >
                                as PNG 2x
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                icon={ImageIcon}
                                onClick={() => exportPrimaryCanvas("jpg", 1)}
                              >
                                as JPG
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                icon={ImageIcon}
                                onClick={() => exportPrimaryCanvas("jpg", 2)}
                              >
                                as JPG 2x
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                icon={ImageIcon}
                                onClick={() => exportPrimaryCanvas("TIFF", 1)}
                              >
                                as TIFF
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                icon={ImageIcon}
                                onClick={() => exportPrimaryCanvas("TIFF", 2)}
                              >
                                as TIFF 2x
                              </DropdownMenu.Item>

                              <DropdownMenu.Item
                                icon={TransformIcon}
                                onClick={() => exportSVG()}
                              >
                                as SVG
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                icon={FileIcon}
                                onClick={() => exportPrimaryCanvas("pdf", 2)}
                              >
                                as PDF
                              </DropdownMenu.Item>
                            </DropdownMenu.SubContent>
                          </DropdownMenu.Sub>
                          <Separator />
                          <DropdownMenu.Item
                            icon={TableIcon}
                            onClick={handleDownload}
                          >
                            Download CSV
                          </DropdownMenu.Item>
                          <CanvasToPpt
                            canvasInstance={canvasInstance}
                            populatedCanvasRefs={populatedCanvasRefs}
                          />
                          <Separator />
                          <DropdownMenu.Item
                            icon={LayoutIcon}
                            onSelect={handleTemplateClick}
                          >
                            Download Template
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            icon={ImageIcon}
                            onClick={() => templateInputRef.current.click()}
                          >
                            <span>{templateNameUploaded}</span>
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu>

                      <Separator vertical />
                    </Flex>
                    <Flex gap={100} customClass="nontablet">
                      <DropdownMenu>
                        <DropdownMenu.Trigger asChild>
                          <div>
                            <Tooltip>
                              <Tooltip.Trigger asChild>
                                <IconButton size="small" variant="ghost">
                                  <BoxIcon />
                                </IconButton>
                              </Tooltip.Trigger>
                              <Tooltip.Content>Add shapes</Tooltip.Content>
                            </Tooltip>
                          </div>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content style={{ minWidth: "1px" }}>
                          <Flex gap={100}>
                            <IconButton
                              size="small"
                              variant="ghost"
                              onClick={addCircle}
                            >
                              <CircleIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              variant="ghost"
                              onClick={addRectangle}
                            >
                              <SquareIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              variant="ghost"
                              onClick={addCustomTriangle}
                            >
                              <TriangleIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              variant="ghost"
                              onClick={addCustomStar}
                            >
                              <StarIcon />
                            </IconButton>
                          </Flex>
                        </DropdownMenu.Content>
                      </DropdownMenu>

                      <Tooltip>
                        <Tooltip.Trigger asChild>
                          <div>
                            <Toggle
                              size="small"
                              variant="ghost"
                              pressed={isDrawing}
                              onPressedChange={() => toggleDrawingMode()}
                            >
                              <BorderSolidIcon />
                            </Toggle>
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Drawing tool</Tooltip.Content>
                      </Tooltip>

                      <Tooltip>
                        <Tooltip.Trigger asChild>
                          <IconButton
                            size="small"
                            variant="ghost"
                            onClick={addText}
                          >
                            <TextIcon />
                          </IconButton>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Add Text</Tooltip.Content>
                      </Tooltip>

                      {/* <Tooltip>
                          <Tooltip.Trigger asChild>
                            <IconButton
                              size="small"
                              variant="ghost"
                              onClick={addNewImageObject}
                            >
                              <ImageIcon />
                            </IconButton>
                          </Tooltip.Trigger>
                          <Tooltip.Content>Add Image</Tooltip.Content>
                        </Tooltip> */}
                      <input
                        type="file"
                        ref={fileInputSVGRef}
                        onChange={handleSVGUpload}
                        accept=".svg"
                        style={{ display: "none" }}
                      />
                      <input
                        ref={fileInputIMGRef}
                        type="file"
                        accept="image/jpeg, image/png, image/svg+xml, image/gif"
                        style={{ display: "none" }}
                        onChange={handleFileIMGChange}
                      />
                      <DropdownMenu>
                        <DropdownMenu.Trigger asChild>
                          <div>
                            <Tooltip>
                              <Tooltip.Trigger asChild>
                                <IconButton size="small" variant="ghost">
                                  <ImageIcon />
                                </IconButton>
                              </Tooltip.Trigger>
                              <Tooltip.Content>Add Image</Tooltip.Content>
                            </Tooltip>
                          </div>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content>
                          <DropdownMenu.Item
                            icon={ImageIcon}
                            onClick={addNewImageObject}
                          >
                            Add Image
                          </DropdownMenu.Item>

                          <DropdownMenu.Item
                            icon={VectorIcon}
                            onClick={() => fileInputSVGRef.current.click()}
                          >
                            Add SVG
                          </DropdownMenu.Item>

                          {/* <Button
                        onClick={() => fileInputSVGRef.current.click()}
                        accept=".svg"
                      >
                        Upload
                      </Button> */}

                          <DropdownMenu.Item
                            icon={UnsplashIcon}
                            onClick={toggleUnsplash}
                          >
                            Unsplash
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            icon={HeartIcon}
                            onClick={toggleIcons}
                          >
                            Icons
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenu.Trigger asChild>
                          <div>
                            <Tooltip>
                              <Tooltip.Trigger asChild>
                                <IconButton size="small" variant="ghost">
                                  <QRCodeIcon />
                                </IconButton>
                              </Tooltip.Trigger>
                              <Tooltip.Content>Create QR Code</Tooltip.Content>
                            </Tooltip>
                          </div>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content>
                          <div ref={qrRef} style={{ display: "none" }}>
                            <QRCode value={qrValue} />
                          </div>
                          <Flex
                            direction="column"
                            gap={100}
                            style={{ padding: "var(--size-100)" }}
                          >
                            <Input
                              type="text"
                              value={qrValue}
                              onChange={handleQRValueInputChange}
                              placeholder="Enter text for QR code"
                              label={false}
                              fluid
                            />
                            <Button
                              size="small"
                              fluid
                              onClick={addQrCodeToCanvas}
                            >
                              Add QR Code
                            </Button>
                          </Flex>
                        </DropdownMenu.Content>
                      </DropdownMenu>

                      <Separator vertical />

                      <Tooltip>
                        <Tooltip.Trigger asChild>
                          <div>
                            <Toggle
                              size="small"
                              pressed={scaleMode}
                              onPressedChange={() => setScaleMode(!scaleMode)}
                              aria-label={
                                scaleMode
                                  ? "Exit Reshape Mode"
                                  : "Enter Reshape Mode"
                              }
                            >
                              {scaleMode ? <SizeIcon /> : <SizeIcon />}
                            </Toggle>
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Scale Tool</Tooltip.Content>
                      </Tooltip>

                      <Tooltip delayDuration={200}>
                        <Tooltip.Trigger asChild>
                          <div>
                            <IconButton
                              size="small"
                              variant="ghost"
                              onClick={duplicateSelectedObject}
                              disabled={!isObjSelected}
                            >
                              <CopyIcon />
                            </IconButton>
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content sideOffset={2}>
                          Duplicate selected element
                        </Tooltip.Content>
                      </Tooltip>

                      <Tooltip>
                        <Tooltip.Trigger asChild>
                          <div>
                            <Tooltip delayDuration={200}>
                              <Tooltip.Trigger asChild>
                                <IconButton
                                  size="small"
                                  variant="danger"
                                  onClick={deleteSelectedObject}
                                  disabled={!isObjSelected}
                                >
                                  <TrashIcon />
                                </IconButton>
                              </Tooltip.Trigger>
                              <Tooltip.Content sideOffset={2}>
                                Delete selected object
                              </Tooltip.Content>
                            </Tooltip>
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          Delete selected element
                        </Tooltip.Content>
                      </Tooltip>
                    </Flex>
                    <div className="tablet nonmobile">
                      <Flex align="center" gap={100}>
                        <DropdownMenu>
                          <DropdownMenu.Trigger asChild>
                            <IconButton size="small" variant="ghost">
                              <DotsHorizontalIcon />
                            </IconButton>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content align="start">
                            <DropdownMenu.Sub>
                              <DropdownMenu.SubTrigger icon={BoxIcon} asChild>
                                Add Shapes
                              </DropdownMenu.SubTrigger>
                              <DropdownMenu.SubContent>
                                <DropdownMenu.Item
                                  icon={CircleIcon}
                                  onClick={addCircle}
                                >
                                  Add Circle
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                  icon={SquareIcon}
                                  onClick={addRectangle}
                                >
                                  Add Rectangle
                                </DropdownMenu.Item>
                              </DropdownMenu.SubContent>
                            </DropdownMenu.Sub>

                            <DropdownMenu.CheckboxItem
                              icon={BorderSolidIcon}
                              checked={isDrawing}
                              onCheckedChange={() => toggleDrawingMode()}
                            >
                              Add Line
                            </DropdownMenu.CheckboxItem>
                            <DropdownMenu.Item
                              icon={TextIcon}
                              onClick={addText}
                            >
                              Add Text
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              icon={ImageIcon}
                              onClick={addNewImageObject}
                            >
                              Add Image
                            </DropdownMenu.Item>
                            <Separator />
                            <DropdownMenu.CheckboxItem
                              icon={SizeIcon}
                              checked={scaleMode}
                              onCheckedChange={() => setScaleMode(!scaleMode)}
                            >
                              Scale Tool
                            </DropdownMenu.CheckboxItem>

                            <DropdownMenu.Item
                              icon={CopyIcon}
                              onClick={duplicateSelectedObject}
                              disabled={!isObjSelected}
                            >
                              Duplicate
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              icon={TrashIcon}
                              onClick={deleteSelectedObject}
                              disabled={!isObjSelected}
                            >
                              Delete
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu>
                      </Flex>
                    </div>
                  </Flex>
                </Toolbar>
              )}
              <div className="nonmobile">
                <Toolbar orientation="horizontal" id="ToolbarTopRight">
                  <Flex direction="row" gap={100} align="center">
                    <DropdownMenu>
                      <DropdownMenu.Trigger asChild>
                        <Button size="small" variant="ghost">
                          <ChevronDownIcon />
                          {viewMode} Mode
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content side="bottom" align="start">
                        <DropdownMenu.RadioGroup
                          value={viewMode}
                          onValueChange={handleViewModeChange}
                        >
                          <DropdownMenu.RadioItem
                            icon={TransformIcon}
                            value="Design"
                          >
                            Design
                          </DropdownMenu.RadioItem>
                          <DropdownMenu.RadioItem
                            icon={ViewVerticalIcon}
                            value="Split"
                          >
                            Split
                          </DropdownMenu.RadioItem>
                          <DropdownMenu.RadioItem
                            icon={Camera2Icon}
                            value="Photo"
                          >
                            Photo
                          </DropdownMenu.RadioItem>
                        </DropdownMenu.RadioGroup>
                      </DropdownMenu.Content>
                    </DropdownMenu>

                    <DropdownMenu modal={false}>
                      <DropdownMenu.Trigger asChild>
                        <Button
                          size="small"
                          showBadge
                          badgeLabel="NEW"
                          variant="ghost"
                        >
                          Templates
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content side="bottom" align="start">
                        <DropdownMenu.Item
                          icon={LayoutIcon}
                          onClick={handleTemplatesClick}
                        >
                          Templates
                        </DropdownMenu.Item>
                        <Separator />
                        <DropdownMenu.Item
                          icon={DesktopIcon}
                          onClick={getCanvasJSON}
                        >
                          HTML preview
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu>

                    <DropdownMenu modal={false}>
                      <DropdownMenu.Trigger asChild>
                        <Button size="small" variant="ghost">
                          Preferences
                        </Button>
                      </DropdownMenu.Trigger>

                      <DropdownMenu.Content sideOffset={10} align="end">
                        <DropdownMenu.CheckboxItem
                          checked={darkmodeChecked}
                          onCheckedChange={setDarkmodeChecked}
                          icon={Half2Icon}
                        >
                          Dark mode
                        </DropdownMenu.CheckboxItem>
                        <DropdownMenu.CheckboxItem
                          checked={pagePattern}
                          onCheckedChange={setPagePattern}
                          icon={TransparencyGridIcon}
                        >
                          Pattern
                        </DropdownMenu.CheckboxItem>
                        <DropdownMenu.Sub>
                          <DropdownMenu.SubTrigger asChild icon={DesktopIcon}>
                            Page Color
                          </DropdownMenu.SubTrigger>
                          <DropdownMenu.SubContent>
                            <DropdownMenu.RadioGroup
                              value={pageColor}
                              onValueChange={setPageColor}
                            >
                              <DropdownMenu.RadioItem
                                icon={ColorBox1}
                                value="page-color-1"
                              >
                                Light Gray
                              </DropdownMenu.RadioItem>
                              <DropdownMenu.RadioItem
                                icon={ColorBox2}
                                value="page-color-2"
                              >
                                Gray
                              </DropdownMenu.RadioItem>
                              <DropdownMenu.RadioItem
                                icon={ColorBox3}
                                value="page-color-3"
                              >
                                Dark Gray
                              </DropdownMenu.RadioItem>
                              <DropdownMenu.RadioItem
                                icon={ColorBox4}
                                value="page-color-4"
                              >
                                Black
                              </DropdownMenu.RadioItem>
                            </DropdownMenu.RadioGroup>
                          </DropdownMenu.SubContent>
                        </DropdownMenu.Sub>
                        <DropdownMenu.Item
                          icon={LightningBoltIcon}
                          onSelect={handleShortcutsClick}
                        >
                          Shortcuts
                        </DropdownMenu.Item>
                        <Separator />
                        <DropdownMenu.Item onSelect={handleFeedbackClick}>
                          Feedback
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu>

                    <Separator vertical />

                    {/* <Tooltip>
                      <Tooltip.Trigger asChild>
                        <div>
                          <Toggle
                            size="medium"
                            variant="ghost"
                            pressed={viewMode === "Split"}
                            onPressedChange={() => toggleSplitView()}
                          >
                            <ViewVerticalIcon />
                          </Toggle>
                        </div>
                      </Tooltip.Trigger>
                      <Tooltip.Content>Split mode</Tooltip.Content>
                    </Tooltip> */}
                    <Tooltip>
                      <Tooltip.Trigger asChild>
                        <Button
                          size="small"
                          variant="solid"
                          // onClick={handleExportClick}
                          onClick={() => toggleSidebar()}
                        >
                          Connect
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>
                        Import data from GoogleSheet
                      </Tooltip.Content>
                    </Tooltip>
                  </Flex>
                </Toolbar>
              </div>

              {viewMode !== "Split" && (
                <Flex
                  gap={200}
                  align="center"
                  customClass={`LeftSidePanel nonmobile ${
                    isSidebarVisible ? "visible" : "hidden"
                  }`}
                >
                  <Card id="LeftSidePanel" noPadding direction="column">
                    {isGenerateBanners && (
                      <>
                        <Flex
                          style={{
                            position: "absolute",
                            right: "-20px",
                            top: "-20px",
                            overflow: "hidden",
                            borderRadius: "50%",
                            zIndex: "99",
                            backgroundColor:
                              "var(--background-neutral-container)",
                          }}
                          customClass="darkmode"
                        >
                          <Tooltip>
                            <Tooltip.Trigger asChild>
                              <div>
                                <IconButton
                                  size="medium"
                                  variant="ghost"
                                  onClick={() => toggleSidebar()}
                                >
                                  <PinLeftIcon />
                                </IconButton>
                              </div>
                            </Tooltip.Trigger>
                            <Tooltip.Content>Close sidebar</Tooltip.Content>
                          </Tooltip>
                        </Flex>
                        <ScrollArea style={{ height: "60vh" }}>
                          <Flex direction="column" fluid>
                            <Flex
                              direction="column"
                              gap={200}
                              style={{
                                padding: "var(--size-300) var(--size-300) 0",
                              }}
                            >
                              <Heading level={3} weight="bold">
                                Generate Graphics in&nbsp;Bulk
                              </Heading>
                              <Paragraph>
                                Obtain a link to your Google Sheet by clicking
                                the 'Share' button. Ensure that you've set the
                                visibility to 'Anyone with the link' as a
                                viewer.
                              </Paragraph>
                            </Flex>

                            <Flex
                              gap={200}
                              style={{
                                marginBottom: "var(--size-200)",
                                width: "100%",
                                // padding: "0 var(--size-300)",
                              }}
                              customClass="loadData"
                              direction="column"
                            >
                              <CsvUploadDownload
                                setTableData={setTableData}
                                setColumns={setColumns}
                                generateCanvases={generateCanvases}
                                handleDeleteRow={handleDeleteRow}
                                sheetUrl={sheetUrl}
                                handleSheetUrlChange={handleSheetUrlChange}
                                handleSubmit={handleSubmit}
                                handleExport={handleExport}
                                dataLoaded={dataLoaded}
                                // handleDownload={handleDownload}
                              />
                            </Flex>
                          </Flex>
                        </ScrollArea>
                      </>
                    )}

                    {isUnsplash && (
                      <Flex
                        style={{
                          overflow: "hidden",
                        }}
                        direction="column"
                      >
                        <Flex
                          style={{
                            position: "absolute",
                            right: "-20px",
                            top: "-20px",
                            overflow: "hidden",
                            borderRadius: "50%",
                            zIndex: "89",
                            backgroundColor:
                              "var(--background-neutral-container)",
                          }}
                          customClass="darkmode"
                        >
                          <IconButton
                            size="small"
                            variant="ghost"
                            onClick={toggleSidebar}
                          >
                            <Cross2Icon />
                          </IconButton>
                        </Flex>

                        <Flex
                          direction="column"
                          gap={200}
                          style={{
                            marginTop: "var(--size-300)",
                            padding: "0 var(--size-300)",
                          }}
                        >
                          <Heading level={3} weight="bold">
                            Unsplash Images
                          </Heading>
                          <Paragraph>
                            Enhance your projects effortlessly with a wide
                            selection of professional photos.
                          </Paragraph>
                        </Flex>
                        <ImagePicker
                          canvas={canvasInstance.current}
                          updateImageObjectsOrder={updateImageObjectsOrder}
                        />
                      </Flex>
                    )}

                    {isIcons && (
                      <Flex
                        style={{
                          overflow: "hidden",
                        }}
                        direction="column"
                      >
                        <Flex
                          style={{
                            position: "absolute",
                            right: "-20px",
                            top: "-20px",
                            overflow: "hidden",
                            borderRadius: "50%",
                            zIndex: "89",
                            backgroundColor:
                              "var(--background-neutral-container)",
                          }}
                          customClass="darkmode"
                        >
                          <IconButton
                            size="small"
                            variant="ghost"
                            onClick={toggleSidebar}
                          >
                            <Cross2Icon />
                          </IconButton>
                        </Flex>

                        <Flex
                          direction="column"
                          gap={200}
                          style={{
                            marginTop: "var(--size-300)",
                            padding: "0 var(--size-300)",
                          }}
                        >
                          <Heading level={3} weight="bold">
                            Sebikostudio Icons
                          </Heading>
                          <Paragraph>
                            Enhance your projects effortlessly with a wide
                            selection of professional icons.
                          </Paragraph>
                        </Flex>
                        <IconLibrary
                          canvasInstance={canvasInstance}
                          setSelectedObject={setSelectedObject}
                          updateImageObjectsOrder={updateImageObjectsOrder}
                          setIconWidth={setIconWidth}
                          setIconHeight={setIconHeight}
                        />
                      </Flex>
                    )}
                  </Card>
                  {(!isSidebarVisible ||
                    (isSidebarVisible && selectedObject)) && (
                    <Flex direction="column" customClass="layersPanel">
                      <Flex
                        align="center"
                        gap={200}
                        justify="between"
                        style={{ padding: "var(--size-100) var(--size-150) 0" }}
                      >



                        <Heading level={4} weight="bold">
                          Layers
                        </Heading>



                        <Flex style={{ gap: "var(--size-50)" }}>
                          <IconButton
                            variant="ghost"
                            size="mini"
                            onClick={moveSelectedObjectUp}
                            disabled={isEditingGroup}
                          >
                            <ArrowUpIcon />
                          </IconButton>
                          <IconButton
                            variant="ghost"
                            size="mini"
                            onClick={moveSelectedObjectDown}
                            disabled={isEditingGroup}
                          >
                            <ArrowDownIcon />
                          </IconButton>
                        </Flex>
                      </Flex>
                      <Separator />
                      <LayerPanel
                        imageObjects={imageObjects}
                        activeLayerId={activeLayerId}
                        highlightObjectInCanvas={highlightObjectInCanvas}
                        editingId={editingId}
                        editInput={editInput}
                        setEditInput={setEditInput}
                        saveEdits={saveEdits}
                        startEditing={startEditing}
                        deselectAllObjects={deselectAllObjects}
                        setImageObjects={setImageObjects}
                        canvasInstance={canvasInstance}
                      />








                      
                    </Flex>
                  )}
                </Flex>
              )}
              <Flex direction="column" align="center">
                <Flex
                  justify="between"
                  align="start"
                  customClass="TemplateCreatorHeading"
                >
                  <input
                    type="file"
                    onChange={handleUploadTemplate}
                    style={{ display: "none" }}
                    ref={templateInputRef}
                  />
                </Flex>

                {errorMessage && (
                  <Paragraph customClass="Error">{errorMessage}</Paragraph>
                )}

                <Flex gap={200} customClass="TemplateCreatorCanvas">
                  {viewMode !== "Split" && (
                    <Flex
                      direction="column"
                      customClass="configurator nonmobile"
                    >
                      {viewMode === "Design" && (
                        <Tabs
                          value={activeTab}
                          onValueChange={setActiveTab}
                          fluid
                        >
                          <Tabs.List aria-label="Manage your account">
                            <Tabs.Trigger value="tab1">Settings</Tabs.Trigger>
                            <Tabs.Trigger value="tab2">Styles</Tabs.Trigger>
                          </Tabs.List>
                          <Tabs.Content value="tab1">
                            <ScrollArea style={{ height: "60vh" }}>
                              <Flex direction="column" fluid>
                                {isObjSelected && (
                                  <>
                                    <Flex
                                      customClass="card"
                                      direction="column"
                                      gap={100}
                                    >
                                      <Flex gap={100}>
                                        <IconButton
                                          size="mini"
                                          variant="ghost"
                                          onClick={() =>
                                            handleAlignment("left")
                                          }
                                        >
                                          <AlignLeftIcon />
                                        </IconButton>
                                        <IconButton
                                          size="mini"
                                          variant="ghost"
                                          onClick={() =>
                                            handleAlignment("horizontalCenter")
                                          }
                                        >
                                          <AlignCenterHorizontallyIcon />
                                        </IconButton>
                                        <IconButton
                                          size="mini"
                                          variant="ghost"
                                          onClick={() =>
                                            handleAlignment("right")
                                          }
                                        >
                                          <AlignRightIcon />
                                        </IconButton>

                                        <IconButton
                                          size="mini"
                                          variant="ghost"
                                          onClick={() => handleAlignment("top")}
                                        >
                                          <AlignTopIcon />
                                        </IconButton>

                                        <IconButton
                                          size="mini"
                                          variant="ghost"
                                          onClick={() =>
                                            handleAlignment("verticalCenter")
                                          }
                                        >
                                          <AlignCenterVerticallyIcon />
                                        </IconButton>

                                        <IconButton
                                          size="mini"
                                          variant="ghost"
                                          onClick={() =>
                                            handleAlignment("bottom")
                                          }
                                        >
                                          <AlignBottomIcon />
                                        </IconButton>
                                      </Flex>

                                      <Flex gap={100}>
                                        <IconButton
                                          size="mini"
                                          variant="ghost"
                                          onClick={() =>
                                            distributeObjects(
                                              canvasInstance.current,
                                              "horizontal"
                                            )
                                          }
                                          disabled={!isEnabled}
                                          aria-label="Distribute Horizontally"
                                        >
                                          <SpaceBetweenHorizontallyIcon />
                                        </IconButton>
                                        <IconButton
                                          size="mini"
                                          variant="ghost"
                                          onClick={() =>
                                            distributeObjects(
                                              canvasInstance.current,
                                              "vertical"
                                            )
                                          }
                                          disabled={!isEnabled}
                                          aria-label="Distribute Vertically"
                                        >
                                          <SpaceBetweenVerticallyIcon />
                                        </IconButton>
                                      </Flex>
                                    </Flex>
                                    <Separator />
                                    {!isEditingGroup && (
                                      <>
                                        <CanvasConstraints
                                          canvasWidth={canvasWidth}
                                          canvasHeight={canvasHeight}
                                          canvasInstance={canvasInstance}
                                          constraints={constraints}
                                          setConstraints={setConstraints}
                                          prevCanvasSize={prevCanvasSize}
                                          setPrevCanvasSize={setPrevCanvasSize}
                                          handleToggleChange={
                                            handleToggleChange
                                          }
                                        />
                                        {/* <Separator /> */}
                                      </>
                                    )}
                                  </>
                                )}

                                {isVectorElementSelected &&
                                  selectedObject.id &&
                                  !selectedObject.id.startsWith("icon-") && (
                                    <>
                                      {selectedObject?.strokeWidth > 0 &&
                                        selectedObject?.stroke !== null && (
                                          <Flex
                                            customClass="card"
                                            direction="column"
                                            gap={100}
                                          >
                                            <Paragraph weight="bold">
                                              Stroke
                                            </Paragraph>
                                            <Flex customClass="inputGroup">
                                              <ColorStylePicker
                                                styles={styles}
                                                isStroke={true}
                                                selectedObjectType={
                                                  selectedObjectType
                                                }
                                                applyColorToSelectedObject={
                                                  applyColorToSelectedObject
                                                }
                                                currentColorId={currentColorId}
                                                currentStrokeColorId={
                                                  currentStrokeColorId
                                                }
                                                isColorVisible={isColorVisible}
                                                setIsColorVisible={
                                                  setIsColorVisible
                                                }
                                                lastColor={lastColor}
                                                setLastColor={setLastColor}
                                                currentColor={
                                                  currentStrokeColor
                                                }
                                                handleColorChange={
                                                  handleColorChange
                                                }
                                                handleInputChange={
                                                  handleInputChange
                                                }
                                              />
                                            </Flex>
                                          </Flex>
                                        )}
                                      {selectedObject?.fill !== "" && (
                                        <Flex
                                          customClass="card"
                                          direction="column"
                                          gap={100}
                                        >
                                          <Paragraph weight="bold">
                                            {selectedObjectType} Fill
                                          </Paragraph>
                                          <Flex customClass="inputGroup">
                                            <ColorStylePicker
                                              styles={styles}
                                              selectedObjectType={
                                                selectedObjectType
                                              }
                                              applyColorToSelectedObject={
                                                applyColorToSelectedObject
                                              }
                                              currentColorId={currentColorId}
                                              currentStrokeColorId={
                                                currentStrokeColorId
                                              }
                                              isColorVisible={isColorVisible}
                                              setIsColorVisible={
                                                setIsColorVisible
                                              }
                                              lastColor={lastColor}
                                              setLastColor={setLastColor}
                                              currentColor={currentColor}
                                              handleColorChange={
                                                handleColorChange
                                              }
                                              handleInputChange={
                                                handleInputChange
                                              }
                                              setCurrentColor={setCurrentColor}
                                              handleGradientChange={
                                                handleGradientChange
                                              }
                                              selectedGradient={
                                                selectedGradient
                                              }
                                              gradient={gradient}
                                            />
                                          </Flex>
                                        </Flex>
                                      )}
                                    </>
                                  )}

                                {isGroupSelected &&
                                  selectedObject.id &&
                                  !selectedObject.id.startsWith("icon-") && (
                                    <>
                                      <Separator />

                                      <Flex
                                        customClass="card"
                                        direction="column"
                                      >
                                        <Paragraph weight="bold">
                                          Group
                                        </Paragraph>
                                        <Flex
                                          gap={300}
                                          align="center"
                                          style={{
                                            marginTop: "var(--size-100)",
                                          }}
                                        >
                                          <Flex customClass="inputGroup">
                                            <Tooltip>
                                              <Tooltip.Trigger asChild>
                                                <div>
                                                  <Paragraph size="large">
                                                    X
                                                  </Paragraph>
                                                </div>
                                              </Tooltip.Trigger>
                                              <Tooltip.Content>
                                                Left position
                                              </Tooltip.Content>
                                            </Tooltip>
                                            <Input
                                              type="number"
                                              value={positionX}
                                              onChange={handlePositionXChange}
                                              label="Position X"
                                            />
                                          </Flex>

                                          <Flex customClass="inputGroup">
                                            <Tooltip>
                                              <Tooltip.Trigger asChild>
                                                <div>
                                                  <Paragraph size="large">
                                                    Y
                                                  </Paragraph>
                                                </div>
                                              </Tooltip.Trigger>
                                              <Tooltip.Content>
                                                Top position
                                              </Tooltip.Content>
                                            </Tooltip>
                                            <Input
                                              type="number"
                                              value={positionY}
                                              onChange={handlePositionYChange}
                                              label="Position Y"
                                            />
                                          </Flex>
                                        </Flex>
                                        {selectedObject.id &&
                                          !selectedObject.id.startsWith(
                                            "qrcode-"
                                          ) &&
                                          !selectedObject.id.startsWith(
                                            "icon-"
                                          ) && (
                                            <>
                                              <Separator />
                                              <CanvasAutolayout
                                                autoLayout={autoLayout}
                                                canvasInstance={canvasInstance}
                                                setAutoLayout={setAutoLayout}
                                                layoutDirection={
                                                  layoutDirection
                                                }
                                                setLayoutDirection={
                                                  setLayoutDirection
                                                }
                                                gap={gap}
                                                setGap={setGap}
                                                alignment={alignment}
                                                setAlignment={setAlignment}
                                                applyAutoLayout={
                                                  applyAutoLayout
                                                }
                                              />
                                            </>
                                          )}
                                      </Flex>
                                    </>
                                  )}

                                {isTextSelected && (
                                  <>
                                    <Separator />
                                    <Flex customClass="card" direction="column">
                                      <Paragraph weight="bold">Text</Paragraph>
                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  X
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Left position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionX}
                                            onChange={handlePositionXChange}
                                            label="Position X"
                                          />
                                        </Flex>

                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  Y
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Top position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionY}
                                            onChange={handlePositionYChange}
                                            label="Position Y"
                                          />
                                        </Flex>
                                      </Flex>

                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <AngleIcon />
                                          <Input
                                            type="number"
                                            value={rotationAngle}
                                            onChange={handleRotationAngleChange}
                                            label="Rotation Angle"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <Paragraph size="large">W</Paragraph>
                                          <Input
                                            type="number"
                                            value={objWidth}
                                            onChange={handleObjWidthChange}
                                            label="Width"
                                            min="0"
                                          />
                                        </Flex>
                                      </Flex>

                                      <Flex
                                        direction="column"
                                        gap={100}
                                        style={{ marginTop: "var(--size-200)" }}
                                      >
                                        <Flex
                                          fluid
                                          style={{ position: "relative" }}
                                          direction="column"
                                          gap={200}
                                        >
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div className="specialTooltip">
                                                <Paragraph>
                                                  About Text Id?
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content
                                              side="left"
                                              align="center"
                                            >
                                              The text element will be populated
                                              from a Google Sheet. The ID must
                                              match the column title exactly.
                                              <img
                                                style={{
                                                  width: "100%",
                                                  height: "auto",
                                                  borderRadius:
                                                    "var(--size-100)",
                                                  marginTop: "var(--size-150)",
                                                }}
                                                src={GoogleSheetDataImg}
                                                alt="Google Data Sheet must match the text field ID."
                                              />
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="text"
                                            value={textId || ""}
                                            onChange={handleTextIdChange}
                                            label="Text Id"
                                            fluid
                                          />
                                        </Flex>
                                        <Select
                                          value={textFontFamily}
                                          onValueChange={handleFontFamilyChange}
                                        >
                                          <Select.Trigger aria-label="Font Family">
                                            <Select.Value placeholder="Select font" />
                                          </Select.Trigger>
                                          <Select.Content
                                            sideOffset={8}
                                            align="start"
                                          >
                                            {sortedFonts.map((font) => (
                                              <Select.Item
                                                key={font.value}
                                                value={font.value}
                                                style={font.style}
                                              >
                                                {font.label}
                                              </Select.Item>
                                            ))}
                                          </Select.Content>
                                        </Select>
                                      </Flex>

                                      <Flex
                                        gap={300}
                                        style={{ marginTop: "var(--size-200)" }}
                                        align="center"
                                      >
                                        <Flex customClass="inputGroup">
                                          <FontSizeIcon />
                                          <Input
                                            type="number"
                                            value={textSize}
                                            onChange={(e) =>
                                              handleTextSizeChange(
                                                e.target.value
                                              )
                                            }
                                            label="Font size"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <LineHeightIcon />
                                          <Input
                                            step="0.1"
                                            type="number"
                                            value={textLineHeight}
                                            onChange={(e) =>
                                              handleTextLineHeightChange(
                                                e.target.value
                                              )
                                            }
                                            placeholder="Set line height"
                                          />
                                        </Flex>
                                      </Flex>
                                      <Separator />

                                      <Flex
                                        gap={100}
                                        fluid
                                        style={{
                                          marginTop: "var(--size-100)",
                                          marginBottom: "var(--size-100)",
                                        }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <ToggleGroup
                                            type="single"
                                            defaultValue="left"
                                            aria-label="Text alignment"
                                            value={textAlignment}
                                            size="mini"
                                          >
                                            <ToggleGroup.Item
                                              value="left"
                                              aria-label="Left aligned"
                                              onClick={() =>
                                                handleTextAlignmentChange(
                                                  "left"
                                                )
                                              }
                                            >
                                              <TextAlignLeftIcon />
                                            </ToggleGroup.Item>
                                            <ToggleGroup.Item
                                              value="center"
                                              aria-label="Center aligned"
                                              onClick={() =>
                                                handleTextAlignmentChange(
                                                  "center"
                                                )
                                              }
                                            >
                                              <TextAlignCenterIcon />
                                            </ToggleGroup.Item>
                                            <ToggleGroup.Item
                                              value="right"
                                              aria-label="Right aligned"
                                              onClick={() =>
                                                handleTextAlignmentChange(
                                                  "right"
                                                )
                                              }
                                            >
                                              <TextAlignRightIcon />
                                            </ToggleGroup.Item>
                                          </ToggleGroup>
                                          <Toggle
                                            size="mini"
                                            pressed={
                                              textWeight === "700"
                                                ? true
                                                : false
                                            }
                                            onPressedChange={
                                              handleTextWeightChange
                                            }
                                            aria-label="Toggle text bold"
                                          >
                                            <FontBoldIcon />
                                          </Toggle>
                                          <Toggle
                                            size="mini"
                                            pressed={
                                              textStyle === "italic"
                                                ? true
                                                : false
                                            }
                                            onPressedChange={
                                              handleTextStyleChange
                                            }
                                            aria-label="Toggle text style"
                                          >
                                            <FontItalicIcon />
                                          </Toggle>
                                          <Toggle
                                            size="mini"
                                            pressed={textUnderline}
                                            onPressedChange={
                                              handleUnderlineChange
                                            }
                                            aria-label="Toggle text underline"
                                          >
                                            <UnderlineIcon />
                                          </Toggle>
                                        </Flex>
                                      </Flex>
                                      {/* <Flex
                                        gap={300}
                                        style={{ marginTop: "var(--size-100)" }}
                                        align="center"
                                      >
                                        <Flex customClass="inputGroup"></Flex>
                              
                                      </Flex> */}
                                      <Separator />
                                      <OpacityInput
                                        opacity={opacity}
                                        handleOpacityChange={
                                          handleOpacityChange
                                        }
                                        setOpacity={setOpacity}
                                      />
                                      <Separator />
                                      <Flex
                                        gap={100}
                                        direction="column"
                                        align="center"
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <BorderWidthIcon />
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Stroke width
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={lineThickness}
                                            onChange={handleLineThicknessChange}
                                            label="Line Thickness"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <ColorStylePicker
                                            styles={styles}
                                            isStroke={true}
                                            selectedObjectType={
                                              selectedObjectType
                                            }
                                            applyColorToSelectedObject={
                                              applyColorToSelectedObject
                                            }
                                            currentColorId={currentColorId}
                                            currentStrokeColorId={
                                              currentStrokeColorId
                                            }
                                            isColorVisible={isColorVisible}
                                            setIsColorVisible={
                                              setIsColorVisible
                                            }
                                            lastColor={lastColor}
                                            setLastColor={setLastColor}
                                            currentColor={currentStrokeColor}
                                            handleColorChange={
                                              handleColorChange
                                            }
                                            handleInputChange={
                                              handleInputChange
                                            }
                                          />
                                        </Flex>
                                      </Flex>
                                      <Separator />
                                      <Flex
                                        gap={100}
                                        fluid
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <ColorStylePicker
                                          styles={styles}
                                          selectedObjectType={
                                            selectedObjectType
                                          }
                                          applyColorToSelectedObject={
                                            applyColorToSelectedObject
                                          }
                                          currentColorId={currentColorId}
                                          currentStrokeColorId={
                                            currentStrokeColorId
                                          }
                                          lastColor={lastColor}
                                          setLastColor={setLastColor}
                                          isColorVisible={isColorVisible}
                                          setIsColorVisible={setIsColorVisible}
                                          currentColor={currentColor}
                                          handleColorChange={handleColorChange}
                                          handleInputChange={handleInputChange}
                                          handleGradientChange={
                                            handleGradientChange
                                          }
                                          selectedGradient={selectedGradient}
                                          gradient={gradient}
                                        />
                                      </Flex>
                                    </Flex>
                                  </>
                                )}

                                {!isObjSelected && (
                                  <>
                                    {/* <Separator /> */}

                                    <Flex
                                      direction="column"
                                      gap={100}
                                      customClass="card"
                                    >
                                      <Paragraph weight="bold">
                                        Canvas
                                      </Paragraph>
                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Paragraph size="large">W</Paragraph>
                                          <Input
                                            type="number"
                                            value={canvasWidth}
                                            onChange={handleCanvasWidthChange}
                                            label="Canvas Width"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <Paragraph size="large">H</Paragraph>
                                          <Input
                                            type="number"
                                            value={canvasHeight}
                                            onChange={handleCanvasHeightChange}
                                            label="Canvas Height"
                                          />
                                        </Flex>
                                      </Flex>
                                      <Select
                                        value={selectedSize}
                                        onValueChange={handleBannerSizeChange}
                                      >
                                        <Select.Trigger aria-label="Select format">
                                          <Select.Value placeholder="Select format" />
                                        </Select.Trigger>
                                        <Select.Content
                                          position="popper"
                                          sideOffset={8}
                                          align="end"
                                        >
                                          {Object.entries(bannerSizes).map(
                                            ([name, { width, height }]) => (
                                              <Select.Item
                                                key={name}
                                                value={name}
                                              >
                                                {`${name} (${width}x${height})`}
                                              </Select.Item>
                                            )
                                          )}
                                        </Select.Content>
                                      </Select>
                                      <Separator />

                                      <Flex
                                        gap={100}
                                        direction="column"
                                        style={{ marginTop: "var(--size-100)" }}
                                        fluid
                                        align="start"
                                      >
                                        <Checkbox
                                          customID="gridvisibility"
                                          checked={gridVisible}
                                          onChange={toggleGrid}
                                        >
                                          {gridVisible
                                            ? "Hide Guidelines"
                                            : "Show Guidelines"}
                                        </Checkbox>
                                        <Flex gap={300} align="center">
                                          <Flex
                                            customClass="inputGroup"
                                            gap={100}
                                          >
                                            {/* <label>Columns</label> */}
                                            <ColumnsIcon />

                                            <Input
                                              type="number"
                                              value={gridCols}
                                              onChange={handleGridColumnsChange}
                                              fluid
                                              min="1"
                                              max="32"
                                              placeholder="Enter number of columns"
                                            />
                                          </Flex>

                                          <Flex
                                            customClass="inputGroup"
                                            gap={100}
                                          >
                                            {/* <label>Rows</label> */}
                                            <RowsIcon />

                                            <Input
                                              type="number"
                                              value={gridRows}
                                              onChange={handleGridRowsChange}
                                              fluid
                                              min="1"
                                              max="32"
                                              placeholder="Enter number of rows"
                                            />
                                          </Flex>
                                        </Flex>
                                      </Flex>
                                      <Separator />
                                      <Flex
                                        gap={100}
                                        direction="column"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Paragraph>Background Color</Paragraph>

                                        <Flex
                                          gap={100}
                                          fluid
                                          style={{
                                            marginTop: "var(--size-100)",
                                          }}
                                        >
                                          <Flex customClass="inputGroup">
                                            <DropdownMenu>
                                              <DropdownMenu.Trigger asChild>
                                                <div
                                                  className="colorBox"
                                                  style={{
                                                    backgroundColor:
                                                      backgroundColor,
                                                  }}
                                                ></div>
                                              </DropdownMenu.Trigger>

                                              <DropdownMenu.Content
                                                className="noPadding"
                                                sideOffset={4}
                                                align="end"
                                              >
                                                <HexColorPicker
                                                  color={backgroundColor}
                                                  onChange={setBackgroundColor}
                                                />
                                              </DropdownMenu.Content>
                                            </DropdownMenu>
                                            <Input
                                              type="text"
                                              value={backgroundColor}
                                              onChange={handleInputBGChange}
                                              label={false}
                                              fluid
                                            />
                                          </Flex>
                                        </Flex>

                                        <Separator />
                                        <Flex>
                                          <Button
                                            size="medium"
                                            variant="outline"
                                            onClick={() =>
                                              fileInputRef.current.click()
                                            }
                                            fluid
                                          >
                                            <ImageIcon />
                                            <span>{fileName}</span>
                                          </Button>
                                          <input
                                            type="file"
                                            onChange={handleBackgroundUpload}
                                            style={{ display: "none" }}
                                            ref={fileInputRef}
                                          />
                                        </Flex>
                                      </Flex>
                                    </Flex>
                                  </>
                                )}

                                {isRectangleSelected && (
                                  <>
                                    <Separator />

                                    <Flex
                                      direction="column"
                                      gap={100}
                                      customClass="card"
                                    >
                                      <Paragraph weight="bold">
                                        Rectangle
                                      </Paragraph>
                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  X
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Left position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionX}
                                            onChange={handlePositionXChange}
                                            label="Position X"
                                          />
                                        </Flex>

                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  Y
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Top position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionY}
                                            onChange={handlePositionYChange}
                                            label="Position Y"
                                          />
                                        </Flex>
                                      </Flex>
                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Paragraph size="large">W</Paragraph>
                                          <Input
                                            type="number"
                                            value={objWidth}
                                            onChange={handleObjWidthChange}
                                            label="Width"
                                            min="0"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <Paragraph size="large">H</Paragraph>

                                          <Input
                                            type="number"
                                            value={objHeight}
                                            onChange={handleObjHeightChange}
                                            label="Height"
                                            min="0"
                                          />
                                        </Flex>
                                      </Flex>

                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex
                                          gap={100}
                                          align="center"
                                          customClass="inputGroup"
                                        >
                                          <CornersIcon />
                                          <Input
                                            type="number"
                                            value={borderRadius}
                                            onChange={(e) =>
                                              handleBorderRadiusChange(
                                                e.target.value
                                              )
                                            }
                                            disabled={!isRectangleSelected} // Only enable if a rectangle is selected
                                            min="0"
                                            label="Border Radius"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <AngleIcon />
                                          <Input
                                            type="number"
                                            value={rotationAngle}
                                            onChange={handleRotationAngleChange}
                                            label="Rotation Angle"
                                          />
                                        </Flex>
                                      </Flex>

                                      <OpacityInput
                                        opacity={opacity}
                                        handleOpacityChange={
                                          handleOpacityChange
                                        }
                                        setOpacity={setOpacity}
                                      />
                                      <Separator />

                                      <Flex
                                        gap={100}
                                        direction="column"
                                        align="center"
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <BorderWidthIcon />
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Stroke width
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={lineThickness}
                                            onChange={handleLineThicknessChange}
                                            label="Line Thickness"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <ColorStylePicker
                                            styles={styles}
                                            isStroke={true}
                                            selectedObjectType={
                                              selectedObjectType
                                            }
                                            applyColorToSelectedObject={
                                              applyColorToSelectedObject
                                            }
                                            currentColorId={currentColorId}
                                            currentStrokeColorId={
                                              currentStrokeColorId
                                            }
                                            isColorVisible={isColorVisible}
                                            setIsColorVisible={
                                              setIsColorVisible
                                            }
                                            lastColor={lastColor}
                                            setLastColor={setLastColor}
                                            currentColor={currentStrokeColor}
                                            handleColorChange={
                                              handleColorChange
                                            }
                                            handleInputChange={
                                              handleInputChange
                                            }
                                          />
                                        </Flex>
                                      </Flex>
                                      <Separator />
                                      {isShapeSelected && (
                                        <Flex customClass="inputGroup">
                                          <ColorStylePicker
                                            styles={styles}
                                            selectedObjectType={
                                              selectedObjectType
                                            }
                                            applyColorToSelectedObject={
                                              applyColorToSelectedObject
                                            }
                                            currentColorId={currentColorId}
                                            currentStrokeColorId={
                                              currentStrokeColorId
                                            }
                                            isColorVisible={isColorVisible}
                                            setIsColorVisible={
                                              setIsColorVisible
                                            }
                                            lastColor={lastColor}
                                            setLastColor={setLastColor}
                                            currentColor={currentColor}
                                            handleColorChange={
                                              handleColorChange
                                            }
                                            handleInputChange={
                                              handleInputChange
                                            }
                                            setCurrentColor={setCurrentColor}
                                            handleGradientChange={
                                              handleGradientChange
                                            }
                                            selectedGradient={selectedGradient}
                                            gradient={gradient}
                                          />
                                        </Flex>
                                      )}
                                    </Flex>
                                  </>
                                )}

                                {isTriangleSelected && (
                                  <>
                                    <Separator />

                                    <Flex
                                      direction="column"
                                      gap={100}
                                      customClass="card"
                                    >
                                      <Paragraph weight="bold">
                                        Triangle
                                      </Paragraph>
                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  X
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Left position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionX}
                                            onChange={handlePositionXChange}
                                            label="Position X"
                                          />
                                        </Flex>

                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  Y
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Top position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionY}
                                            onChange={handlePositionYChange}
                                            label="Position Y"
                                          />
                                        </Flex>
                                      </Flex>
                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Paragraph size="large">W</Paragraph>
                                          <Input
                                            type="number"
                                            value={objWidth}
                                            onChange={handleObjWidthChange}
                                            label="Width"
                                            min="0"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <Paragraph size="large">H</Paragraph>

                                          <Input
                                            type="number"
                                            value={objHeight}
                                            onChange={handleObjHeightChange}
                                            label="Height"
                                            min="0"
                                          />
                                        </Flex>
                                      </Flex>

                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <AngleIcon />
                                          <Input
                                            type="number"
                                            value={rotationAngle}
                                            onChange={handleRotationAngleChange}
                                            label="Rotation Angle"
                                          />
                                        </Flex>
                                      </Flex>

                                      <OpacityInput
                                        opacity={opacity}
                                        handleOpacityChange={
                                          handleOpacityChange
                                        }
                                        setOpacity={setOpacity}
                                      />
                                      <Separator />

                                      <Flex
                                        gap={100}
                                        direction="column"
                                        align="center"
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <BorderWidthIcon />
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Stroke width
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={lineThickness}
                                            onChange={handleLineThicknessChange}
                                            label="Line Thickness"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <ColorStylePicker
                                            styles={styles}
                                            isStroke={true}
                                            selectedObjectType={
                                              selectedObjectType
                                            }
                                            applyColorToSelectedObject={
                                              applyColorToSelectedObject
                                            }
                                            currentColorId={currentColorId}
                                            currentStrokeColorId={
                                              currentStrokeColorId
                                            }
                                            isColorVisible={isColorVisible}
                                            setIsColorVisible={
                                              setIsColorVisible
                                            }
                                            lastColor={lastColor}
                                            setLastColor={setLastColor}
                                            currentColor={currentStrokeColor}
                                            handleColorChange={
                                              handleColorChange
                                            }
                                            handleInputChange={
                                              handleInputChange
                                            }
                                          />
                                        </Flex>
                                      </Flex>
                                      <Separator />
                                      {isShapeSelected && (
                                        <Flex customClass="inputGroup">
                                          <ColorStylePicker
                                            styles={styles}
                                            selectedObjectType={
                                              selectedObjectType
                                            }
                                            applyColorToSelectedObject={
                                              applyColorToSelectedObject
                                            }
                                            currentColorId={currentColorId}
                                            currentStrokeColorId={
                                              currentStrokeColorId
                                            }
                                            isColorVisible={isColorVisible}
                                            setIsColorVisible={
                                              setIsColorVisible
                                            }
                                            lastColor={lastColor}
                                            setLastColor={setLastColor}
                                            currentColor={currentColor}
                                            handleColorChange={
                                              handleColorChange
                                            }
                                            handleInputChange={
                                              handleInputChange
                                            }
                                            setCurrentColor={setCurrentColor}
                                            handleGradientChange={
                                              handleGradientChange
                                            }
                                            selectedGradient={selectedGradient}
                                            gradient={gradient}
                                          />
                                        </Flex>
                                      )}
                                    </Flex>
                                  </>
                                )}

                                {isStarSelected && (
                                  <>
                                    <Separator />

                                    <Flex
                                      direction="column"
                                      gap={100}
                                      customClass="card"
                                    >
                                      <Paragraph weight="bold">Star</Paragraph>
                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  X
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Left position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionX}
                                            onChange={handlePositionXChange}
                                            label="Position X"
                                          />
                                        </Flex>

                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  Y
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Top position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionY}
                                            onChange={handlePositionYChange}
                                            label="Position Y"
                                          />
                                        </Flex>
                                      </Flex>
                                      {/* <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Paragraph size="large">W</Paragraph>
                                          <Input
                                            type="number"
                                            value={objWidth}
                                            onChange={handleObjWidthChange}
                                            label="Width"
                                            min="0"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <Paragraph size="large">H</Paragraph>

                                          <Input
                                            type="number"
                                            value={objHeight}
                                            onChange={handleObjHeightChange}
                                            label="Height"
                                            min="0"
                                          />
                                        </Flex>
                                      </Flex> */}

                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <AngleIcon />
                                          <Input
                                            type="number"
                                            value={rotationAngle}
                                            onChange={handleRotationAngleChange}
                                            label="Rotation Angle"
                                          />
                                        </Flex>
                                      </Flex>

                                      <OpacityInput
                                        opacity={opacity}
                                        handleOpacityChange={
                                          handleOpacityChange
                                        }
                                        setOpacity={setOpacity}
                                      />
                                      <Separator />

                                      <Flex
                                        gap={100}
                                        direction="column"
                                        align="center"
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <BorderWidthIcon />
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Stroke width
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={lineThickness}
                                            onChange={handleLineThicknessChange}
                                            label="Line Thickness"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <ColorStylePicker
                                            styles={styles}
                                            isStroke={true}
                                            selectedObjectType={
                                              selectedObjectType
                                            }
                                            applyColorToSelectedObject={
                                              applyColorToSelectedObject
                                            }
                                            currentColorId={currentColorId}
                                            currentStrokeColorId={
                                              currentStrokeColorId
                                            }
                                            isColorVisible={isColorVisible}
                                            setIsColorVisible={
                                              setIsColorVisible
                                            }
                                            lastColor={lastColor}
                                            setLastColor={setLastColor}
                                            currentColor={currentStrokeColor}
                                            handleColorChange={
                                              handleColorChange
                                            }
                                            handleInputChange={
                                              handleInputChange
                                            }
                                          />
                                        </Flex>
                                      </Flex>
                                      <Separator />
                                      {isShapeSelected && (
                                        <Flex customClass="inputGroup">
                                          <ColorStylePicker
                                            styles={styles}
                                            selectedObjectType={
                                              selectedObjectType
                                            }
                                            applyColorToSelectedObject={
                                              applyColorToSelectedObject
                                            }
                                            currentColorId={currentColorId}
                                            currentStrokeColorId={
                                              currentStrokeColorId
                                            }
                                            isColorVisible={isColorVisible}
                                            setIsColorVisible={
                                              setIsColorVisible
                                            }
                                            lastColor={lastColor}
                                            setLastColor={setLastColor}
                                            currentColor={currentColor}
                                            handleColorChange={
                                              handleColorChange
                                            }
                                            handleInputChange={
                                              handleInputChange
                                            }
                                            setCurrentColor={setCurrentColor}
                                            handleGradientChange={
                                              handleGradientChange
                                            }
                                            selectedGradient={selectedGradient}
                                            gradient={gradient}
                                          />
                                        </Flex>
                                      )}
                                    </Flex>
                                  </>
                                )}

                                {isCircleSelected && (
                                  <>
                                    <Separator />

                                    <Flex
                                      direction="column"
                                      gap={100}
                                      customClass="card"
                                    >
                                      <Paragraph weight="bold">
                                        Circle
                                      </Paragraph>

                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  X
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Left position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionX}
                                            onChange={handlePositionXChange}
                                            label="Position X"
                                          />
                                        </Flex>

                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  Y
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Top position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionY}
                                            onChange={handlePositionYChange}
                                            label="Position Y"
                                          />
                                        </Flex>
                                      </Flex>

                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <ValueIcon />
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Circle radius
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={circleRadius}
                                            onChange={handleCircleRadiusChange}
                                            label="Circle Radius"
                                          />
                                        </Flex>
                                      </Flex>
                                      <OpacityInput
                                        opacity={opacity}
                                        handleOpacityChange={
                                          handleOpacityChange
                                        }
                                        setOpacity={setOpacity}
                                      />
                                      <Separator />
                                      <Flex
                                        gap={100}
                                        direction="column"
                                        align="center"
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <BorderWidthIcon />
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Stroke width
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={lineThickness}
                                            onChange={handleLineThicknessChange}
                                            label="Line Thickness"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <ColorStylePicker
                                            styles={styles}
                                            isStroke={true}
                                            selectedObjectType={
                                              selectedObjectType
                                            }
                                            applyColorToSelectedObject={
                                              applyColorToSelectedObject
                                            }
                                            currentColorId={currentColorId}
                                            currentStrokeColorId={
                                              currentStrokeColorId
                                            }
                                            isColorVisible={isColorVisible}
                                            setIsColorVisible={
                                              setIsColorVisible
                                            }
                                            lastColor={lastColor}
                                            setLastColor={setLastColor}
                                            currentColor={currentStrokeColor}
                                            handleColorChange={
                                              handleColorChange
                                            }
                                            handleInputChange={
                                              handleInputChange
                                            }
                                          />
                                        </Flex>
                                      </Flex>
                                      <Separator />

                                      {isShapeSelected && (
                                        <Flex customClass="inputGroup">
                                          <ColorStylePicker
                                            styles={styles}
                                            selectedObjectType={
                                              selectedObjectType
                                            }
                                            applyColorToSelectedObject={
                                              applyColorToSelectedObject
                                            }
                                            currentColorId={currentColorId}
                                            currentStrokeColorId={
                                              currentStrokeColorId
                                            }
                                            isColorVisible={isColorVisible}
                                            setIsColorVisible={
                                              setIsColorVisible
                                            }
                                            lastColor={lastColor}
                                            setLastColor={setLastColor}
                                            currentColor={currentColor}
                                            handleColorChange={
                                              handleColorChange
                                            }
                                            handleInputChange={
                                              handleInputChange
                                            }
                                            handleGradientChange={
                                              handleGradientChange
                                            }
                                            selectedGradient={selectedGradient}
                                            gradient={gradient}
                                          />
                                        </Flex>
                                      )}
                                    </Flex>
                                  </>
                                )}

                                {isLineSelected && (
                                  <>
                                    <Separator />

                                    <Flex
                                      direction="column"
                                      gap={100}
                                      customClass="card"
                                    >
                                      <Paragraph weight="bold">Line</Paragraph>

                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  X
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Left position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionX}
                                            onChange={handlePositionXChange}
                                            label="Position X"
                                          />
                                        </Flex>

                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  Y
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Top position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionY}
                                            onChange={handlePositionYChange}
                                            label="Position Y"
                                          />
                                        </Flex>
                                      </Flex>

                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <BorderWidthIcon />
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Stroke width
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={lineThickness}
                                            onChange={handleLineThicknessChange}
                                            label="Line Thickness"
                                          />
                                        </Flex>
                                        <Flex customClass="inputGroup">
                                          <AngleIcon />
                                          <Input
                                            type="number"
                                            value={rotationAngle}
                                            onChange={handleRotationAngleChange}
                                            label="Rotation Angle"
                                          />
                                        </Flex>
                                      </Flex>
                                      <OpacityInput
                                        opacity={opacity}
                                        handleOpacityChange={
                                          handleOpacityChange
                                        }
                                        setOpacity={setOpacity}
                                      />
                                      <Separator />
                                      <Flex customClass="inputGroup">
                                        <ColorStylePicker
                                          styles={styles}
                                          isStroke={true}
                                          selectedObjectType={
                                            selectedObjectType
                                          }
                                          applyColorToSelectedObject={
                                            applyColorToSelectedObject
                                          }
                                          currentColorId={currentColorId}
                                          currentStrokeColorId={
                                            currentStrokeColorId
                                          }
                                          isColorVisible={isColorVisible}
                                          setIsColorVisible={setIsColorVisible}
                                          lastColor={lastColor}
                                          setLastColor={setLastColor}
                                          currentColor={currentStrokeColor}
                                          handleColorChange={handleColorChange}
                                          handleInputChange={handleInputChange}
                                        />
                                      </Flex>
                                    </Flex>
                                  </>
                                )}

                                {isImageSelected && (
                                  <>
                                    <Separator />

                                    <Flex
                                      direction="column"
                                      gap={100}
                                      customClass="card"
                                    >
                                      <Paragraph weight="bold">Image</Paragraph>
                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  X
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Left position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionX}
                                            onChange={handlePositionXChange}
                                            label="Position X"
                                          />
                                        </Flex>

                                        <Flex customClass="inputGroup">
                                          <Tooltip>
                                            <Tooltip.Trigger asChild>
                                              <div>
                                                <Paragraph size="large">
                                                  Y
                                                </Paragraph>
                                              </div>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>
                                              Top position
                                            </Tooltip.Content>
                                          </Tooltip>
                                          <Input
                                            type="number"
                                            value={positionY}
                                            onChange={handlePositionYChange}
                                            label="Position Y"
                                          />
                                        </Flex>
                                      </Flex>
                                      <Flex
                                        gap={300}
                                        align="center"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Flex customClass="inputGroup">
                                          <AngleIcon />
                                          <Input
                                            type="number"
                                            value={rotationAngle}
                                            onChange={handleRotationAngleChange}
                                            label="Rotation Angle"
                                          />
                                        </Flex>

                                        <Flex
                                          gap={100}
                                          align="center"
                                          customClass="inputGroup"
                                        >
                                          <CornersIcon />
                                          <Input
                                            type="number"
                                            value={borderRadius}
                                            onChange={(e) =>
                                              handleBorderRadiusChange(
                                                e.target.value
                                              )
                                            }
                                            disabled={!isObjSelected}
                                            min="0"
                                            label="Border Radius"
                                          />
                                        </Flex>
                                      </Flex>
                                      <OpacityInput
                                        opacity={opacity}
                                        handleOpacityChange={
                                          handleOpacityChange
                                        }
                                        setOpacity={setOpacity}
                                      />
                                      <Separator />

                                      <Input
                                        type="text"
                                        value={id || ""}
                                        onChange={handleIdChange}
                                        label="Image Id"
                                        fluid
                                        placeholder="Add Image Id"
                                      />
                                      <Flex
                                        gap={200}
                                        direction="column"
                                        style={{ marginTop: "var(--size-100)" }}
                                      >
                                        <Button
                                          size="medium"
                                          variant="outline"
                                          onClick={() =>
                                            imageObjectInputRef.current.click()
                                          }
                                          fluid
                                        >
                                          <ImageIcon />
                                          <span>Change Image</span>
                                        </Button>
                                        <input
                                          type="file"
                                          onChange={(e) =>
                                            handleImageUploadAndUpdate(
                                              e,
                                              updateSelectedImageObject
                                            )
                                          }
                                          style={{ display: "none" }}
                                          ref={imageObjectInputRef}
                                        />
                                        <Checkbox
                                          customID="replaceByAI"
                                          checked={
                                            selectedObject &&
                                            selectedObject.id &&
                                            selectedObject.id.endsWith(
                                              "-static-"
                                            )
                                          }
                                          onChange={handleCheckboxChange}
                                        >
                                          Replace with AI
                                        </Checkbox>
                                      </Flex>
                                    </Flex>
                                  </>
                                )}

                                {selectedObject &&
                                  selectedObject.id &&
                                  selectedObject.id.startsWith("icon-") && (
                                    <>
                                      <Separator />
                                      <Flex
                                        direction="column"
                                        customClass="card"
                                      >
                                        <Flex
                                          gap={300}
                                          align="center"
                                          style={{
                                            marginBottom: "var(--size-100)",
                                          }}
                                        >
                                          <Flex customClass="inputGroup">
                                            <Paragraph size="large">
                                              W
                                            </Paragraph>
                                            <Input
                                              type="number"
                                              value={iconWidth}
                                              onChange={handleIconWidthChange}
                                              label="Width"
                                              min="0"
                                            />
                                          </Flex>
                                          <Flex customClass="inputGroup">
                                            <Paragraph size="large">
                                              H
                                            </Paragraph>

                                            <Input
                                              type="number"
                                              value={iconHeight}
                                              onChange={handleIconHeightChange}
                                              label="Height"
                                              min="0"
                                            />
                                          </Flex>
                                        </Flex>

                                        <Flex customClass="inputGroup">
                                          <>
                                            <DropdownMenu>
                                              <DropdownMenu.Trigger asChild>
                                                <div>
                                                  <div
                                                    className="colorBox"
                                                    style={{
                                                      backgroundColor:
                                                        typeof selectedColor ===
                                                        "string"
                                                          ? selectedColor
                                                          : "",
                                                    }}
                                                  ></div>
                                                </div>
                                              </DropdownMenu.Trigger>

                                              <DropdownMenu.Content
                                                align="end"
                                                side="left"
                                                noPadding
                                              >
                                                <HexColorPicker
                                                  color={selectedColor}
                                                  onChange={
                                                    handleIconColorChange
                                                  }
                                                />
                                              </DropdownMenu.Content>
                                            </DropdownMenu>

                                            <Input
                                              type="text"
                                              value={selectedColor}
                                              onChange={handleIconInputChange}
                                              label={false}
                                              fluid
                                              placeholder="Hex Color"
                                            />
                                          </>
                                        </Flex>
                                      </Flex>
                                    </>
                                  )}

                                {isObjSelected && (
                                  <>
                                    <Separator />
                                    <ShadowInput
                                      setShadow={setShadow}
                                      handleShadowChange={handleShadowChange}
                                      selectedElement={selectedObject}
                                    />
                                  </>
                                )}
                              </Flex>
                            </ScrollArea>
                          </Tabs.Content>
                          <Tabs.Content value="tab2">
                            <ScrollArea style={{ height: "60vh" }}>
                              <Flex direction="column" fluid>
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  ref={fileInputRef}
                                  onChange={handleFileUpload}
                                />
                                <Flex
                                  customClass="card"
                                  direction="column"
                                  gap={200}
                                >
                                  <Flex fluid justify="between" align="center">
                                    <Paragraph weight="bold">
                                      Your Styles
                                    </Paragraph>
                                    <DropdownMenu>
                                      <DropdownMenu.Trigger asChild>
                                        <IconButton
                                          size="small"
                                          variant="ghost"
                                        >
                                          <DotsHorizontalIcon />
                                        </IconButton>
                                      </DropdownMenu.Trigger>
                                      <DropdownMenu.Content align="end">
                                        <DropdownMenu.Item
                                          icon={DownloadIcon}
                                          onClick={downloadStyles}
                                        >
                                          Download Styles
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item
                                          icon={ImageIcon}
                                          onClick={() =>
                                            fileInputRef.current.click()
                                          }
                                        >
                                          Upload Styles
                                        </DropdownMenu.Item>
                                        {/* <button onClick={updateObjectsWithStyle}>
                      Update Canvas
                    </button> */}
                                      </DropdownMenu.Content>
                                    </DropdownMenu>
                                  </Flex>
                                  <ScrollArea style={{ maxHeight: "30vh" }}>
                                    <DragDropContext onDragEnd={onDragEnd}>
                                      <Droppable droppableId="droppableColors">
                                        {(provided) => (
                                          <Flex
                                            direction="column"
                                            fluid
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                          >
                                            {styles.map((style, index) => (
                                              <Draggable
                                                key={style.id}
                                                draggableId={String(style.id)}
                                                index={index}
                                              >
                                                {(provided, snapshot) => (
                                                  <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                      snapshot.isDragging,
                                                      provided.draggableProps
                                                        .style
                                                    )}
                                                    className="colorStyleItem"
                                                  >
                                                    <Flex
                                                      gap={100}
                                                      align="center"
                                                    >
                                                      <div
                                                        style={{
                                                          backgroundColor:
                                                            style.hexColor,
                                                        }}
                                                        className="colorBox"
                                                      >
                                                        <CaretSortIcon />
                                                      </div>
                                                      <Paragraph>
                                                        {style.colorName}
                                                      </Paragraph>
                                                    </Flex>
                                                    <Flex gap={100}>
                                                      <Tooltip>
                                                        <Tooltip.Trigger
                                                          asChild
                                                        >
                                                          <IconButton
                                                            size="mini"
                                                            variant="ghost"
                                                            aria-label="Copy Style ID to clipboard"
                                                            onClick={() =>
                                                              copyToClipboard(
                                                                style.id
                                                              )
                                                            }
                                                          >
                                                            <ClipboardCopyIcon ariaLabel="Clipboard Icon" />
                                                          </IconButton>
                                                        </Tooltip.Trigger>
                                                        <Tooltip.Content>
                                                          Copy Style ID to
                                                          clipboard
                                                        </Tooltip.Content>
                                                      </Tooltip>

                                                      <Tooltip>
                                                        <Tooltip.Trigger
                                                          asChild
                                                        >
                                                          <IconButton
                                                            size="mini"
                                                            aria-label="Edit style"
                                                            variant="ghost"
                                                            onClick={() =>
                                                              loadColorForEditing(
                                                                style
                                                              )
                                                            }
                                                          >
                                                            <Pencil1Icon ariaLabel="Pencil Icon" />
                                                          </IconButton>
                                                        </Tooltip.Trigger>
                                                        <Tooltip.Content>
                                                          Edit style
                                                        </Tooltip.Content>
                                                      </Tooltip>
                                                    </Flex>
                                                  </div>
                                                )}
                                              </Draggable>
                                            ))}
                                            {/* {provided.placeholder} */}
                                          </Flex>
                                        )}
                                      </Droppable>
                                    </DragDropContext>
                                  </ScrollArea>
                                </Flex>
                                <Separator />

                                <Flex customClass="card" direction="column">
                                  <Paragraph weight="bold">
                                    {editingColorId
                                      ? "Editing Style"
                                      : "Create Style"}
                                  </Paragraph>

                                  <Flex
                                    customClass="inputGroup"
                                    style={{ marginTop: "var(--size-200)" }}
                                  >
                                    <DropdownMenu>
                                      <DropdownMenu.Trigger asChild>
                                        <div
                                          className="colorBox"
                                          style={{
                                            backgroundColor: currentColor,
                                          }}
                                        ></div>
                                      </DropdownMenu.Trigger>
                                      <DropdownMenu.Content
                                        className="noPadding"
                                        sideOffset={4}
                                        align="end"
                                      >
                                        <HexColorPicker
                                          color={currentColor}
                                          onChange={(newColor) =>
                                            handleColorChange(newColor, false)
                                          }
                                        />
                                      </DropdownMenu.Content>
                                    </DropdownMenu>
                                    <Input
                                      type="text"
                                      value={colorName}
                                      onChange={handleNameChange}
                                      placeholder="Color Name"
                                      label={false}
                                      fluid
                                    />
                                    {editingColorId && (
                                      <IconButton
                                        size="small"
                                        variant="ghost"
                                        onClick={() =>
                                          deleteColor(editingColorId)
                                        }
                                      >
                                        <TrashIcon />
                                      </IconButton>
                                    )}
                                  </Flex>
                                  <Separator />
                                  <Flex
                                    direction="column"
                                    gap={100}
                                    style={{ marginTop: "var(--size-100)" }}
                                  >
                                    <Paragraph weight="bold">
                                      Visibility
                                    </Paragraph>

                                    <Flex
                                      gap={300}
                                      style={{ padding: "var(--size-200) 0" }}
                                    >
                                      <Checkbox
                                        customID="Text"
                                        checked={visibilityText}
                                        onChange={setVisibilityText}
                                      >
                                        Text
                                      </Checkbox>
                                      <Checkbox
                                        customID="Shapes"
                                        checked={visibilityShapes}
                                        onChange={setVisibilityShapes}
                                      >
                                        Shapes
                                      </Checkbox>
                                    </Flex>
                                  </Flex>
                                  <Separator />

                                  <Flex
                                    direction="column"
                                    gap={100}
                                    style={{ marginTop: "var(--size-100)" }}
                                  >
                                    {editingColorId ? (
                                      <Button
                                        fluid
                                        size="small"
                                        variant="outline"
                                        onClick={saveColorChanges}
                                      >
                                        Save Changes
                                      </Button>
                                    ) : (
                                      <Button
                                        fluid
                                        size="small"
                                        variant="outline"
                                        onClick={addColor}
                                      >
                                        <PlusIcon />
                                        Add Style
                                      </Button>
                                    )}
                                  </Flex>
                                </Flex>
                              </Flex>
                            </ScrollArea>
                          </Tabs.Content>
                        </Tabs>
                      )}
                      {viewMode === "Photo" && (
                        <PhotoMode
                          canvas={canvasInstance.current}
                          updateImageObjectsOrder={updateImageObjectsOrder}
                          brightness={brightness}
                          setBrightness={setBrightness}
                          contrast={contrast}
                          setContrast={setContrast}
                          saturation={saturation}
                          setSaturation={setSaturation}
                          hue={hue}
                          setHue={setHue}
                          blur={blur}
                          setBlur={setBlur}
                          noise={noise}
                          setNoise={setNoise}
                          isMonochrome={isMonochrome}
                          setIsMonochrome={setIsMonochrome}
                          histogramData={histogramData}
                          setHistogramData={setHistogramData}
                          redChannel={redChannel}
                          setRedChannel={setRedChannel}
                          greenChannel={greenChannel}
                          setGreenChannel={setGreenChannel}
                          blueChannel={blueChannel}
                          setBlueChannel={setBlueChannel}
                        />
                      )}
                    </Flex>
                  )}
                  <MapInteractionCSS
                    // probably no needed - you can delete later
                    // ref={mapInteractionRef}
                    disablePan={!isPanningEnabled}
                    disableZoom={false}
                    value={{ scale, translation }}
                    onChange={({ scale, translation }) => {
                      setScale(scale);
                      setTranslation(translation);
                    }}
                    minScale={0.5}
                    maxScale={2}
                  >
                    <div style={{ width: "100vw", height: "100vh" }}>
                      <Flex
                        direction="column"
                        customClass="TemplateCanvas nonmobile"
                        gap={100}
                        align="center"
                      >
                        <canvas ref={canvasRef} />
                      </Flex>

                      <Flex direction="column" customClass="Generate" gap={300}>
                        <Flex
                          direction="column"
                          customClass="render"
                          align="center"
                        >
                          <Flex
                            direction="column"
                            id="canvas-container"
                            gap={200}
                          ></Flex>
                        </Flex>
                      </Flex>
                    </div>
                  </MapInteractionCSS>
                </Flex>
              </Flex>
            </Flex>
            <div className="nonmobile">
              <Toolbar id="ToolbarBottomRight">
                <Flex
                  gap={100}
                  align="center"
                  style={{ marginRight: "var(--size-150)" }}
                >
                  {/* <Button
                    size="small"
                    showBadge
                    badgeLabel="hot"
                    onClick={generateTemplate}
                  >
                    Design Assistant
                  </Button> */}
                  {showDev && showDevModal && (
                    <div
                      className="Card"
                      style={{
                        position: "fixed",
                        bottom: "72px",
                        left: "16px",
                        right: "16px",
                        margin: "auto",
                        zIndex: "8",
                        maxWidth: "400px",
                      }}
                    >
                      <Paragraph>Dev Mode</Paragraph>
                      <PatternInput
                        handlePatternChange={handlePatternChange}
                        canvasInstance={canvasInstance}
                      />

                      <ScrollArea
                        style={{
                          height: "160px",
                          marginTop: "var(--size-300)",
                        }}
                      >
                        <Paragraph>
                          {selectedObject
                            ? displayProperties(selectedObject)
                            : "No object selected"}
                        </Paragraph>
                      </ScrollArea>
                    </div>
                  )}
                  {showDev && <Keyboard />}
                  <IconButton
                    onClick={toggleSpot}
                    size="small"
                    showBadge
                    badgeLabel="new"
                  >
                    <SparklesIcon />
                  </IconButton>
                  {/* <GenerateTemplate
                    canvasRef={canvasRef}
                    canvasInstance={canvasInstance}
                    applyTemplateData={applyTemplateData}
                    fabric={fabric}
                    updateImageObjectsOrder={updateImageObjectsOrder}
                  /> */}
                  {/* <Button
                    size="small"
                    onClick={() => applyColorPalette(generateColorPalette())}
                  >
                    Inspire Me!
                  </Button> */}
                  <PaletteManager
                    canvasInstance={canvasInstance}
                    setBackgroundColor={setBackgroundColor}
                    generateColorPalette={generateColorPalette}
                    applyColorPalette={applyColorPalette}
                  />
                  <Separator vertical />
                  <IconButton size="small" variant="ghost" onClick={zoomIn}>
                    <ZoomInIcon />
                  </IconButton>
                  <IconButton size="small" variant="ghost" onClick={zoomOut}>
                    <ZoomOutIcon />
                  </IconButton>
                  <Button size="small" variant="ghost" onClick={resetZoom}>
                    Reset
                  </Button>
                  <Separator vertical />
                  <Paragraph size="large">{Math.round(scale * 100)}%</Paragraph>
                </Flex>
              </Toolbar>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default App;
