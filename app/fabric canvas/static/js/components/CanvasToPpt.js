import React from "react";
import PptxGenJS from "pptxgenjs";
import { DropdownMenu } from "blocksin-system";
import { Presentation2Icon } from "sebikostudio-icons";

// Function to extract a solid color from a gradient
const getSolidColorFromGradient = (gradient) => {
  if (gradient && gradient.colorStops && gradient.colorStops.length > 0) {
    return gradient.colorStops[0].color || "transparent";
  }
  return "transparent";
};

const getFontStyle = (fontWeight, fontStyle) => {
  if (fontWeight === "bold" && fontStyle === "italic") {
    return { bold: true, italic: true };
  } else if (fontWeight === "700") {
    return { bold: true };
  } else if (fontStyle === "italic") {
    return { italic: true };
  }
  return {};
};

const getColor = (fill) => {
  if (typeof fill === "string") {
    return fill;
  } else if (fill && fill.colorStops) {
    return getSolidColorFromGradient(fill);
  }
  return "transparent";
};

const rasterizeToPng = async (obj) => {
  return new Promise((resolve) => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = obj.width * obj.scaleX * 3; // 3 times higher resolution
    tempCanvas.height = obj.height * obj.scaleY * 3; // 3 times higher resolution
    const tempCtx = tempCanvas.getContext("2d");
    const objImage = obj.toDataURL({
      format: "png",
      multiplier: 3, // Export at 3x resolution
    });
    const img = new Image();
    img.onload = () => {
      tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
      resolve(tempCanvas.toDataURL("image/png"));
    };
    img.src = objImage;
  });
};

const CanvasToPpt = ({ canvasInstance, populatedCanvasRefs }) => {
  const saveToPpt = async () => {
    const pptx = new PptxGenJS();

    const processCanvas = async (canvas, slideIndex) => {
      const slide = pptx.addSlide();
      const backgroundColor = canvas.backgroundColor || "white";
      slide.background = { fill: backgroundColor };

      const objects = canvas.getObjects();

      for (const obj of objects) {
        let fillColor = getColor(obj.fill);
        let strokeColor = getColor(obj.stroke);

        if (obj.opacity !== 1) {
          const dataUrl = await rasterizeToPng(obj);
          slide.addImage({
            data: dataUrl,
            x: obj.left / 72,
            y: obj.top / 72,
            w: (obj.width * obj.scaleX) / 72, // Scale down to original size
            h: (obj.height * obj.scaleY) / 72, // Scale down to original size
          });
          continue;
        }

        if (obj.type === "textbox" || obj.type === "i-text") {
          const fontStyle = getFontStyle(obj.fontWeight, obj.fontStyle);
          slide.addText(obj.text, {
            x: obj.left / 72,
            y: obj.top / 72,
            w: obj.width / 72,
            h: obj.height / 72,
            fontSize: obj.fontSize,
            color: fillColor,
            fontFace: obj.fontFamily,
            align: obj.textAlign,
            lineSpacing: obj.lineHeight * 12,
            margin: 0,
            valign: "top",
            ...fontStyle,
          });
        } else if (obj.type === "rect" || obj.type === "circle") {
          if (obj.fill && obj.fill.colorStops) {
            const dataUrl = await rasterizeToPng(obj);

            slide.addImage({
              data: dataUrl,
              x: obj.left / 72,
              y: obj.top / 72,
              w: (obj.width * obj.scaleX) / 72, // Scale down to original size
              h: (obj.height * obj.scaleY) / 72, // Scale down to original size
            });
          } else {
            slide.addShape(
              obj.type === "rect"
                ? pptx.ShapeType.rect
                : pptx.ShapeType.ellipse,
              {
                x: obj.left / 72,
                y: obj.top / 72,
                w: (obj.width * obj.scaleX) / 72,
                h: (obj.height * obj.scaleY) / 72,
                fill: fillColor,
                line: {
                  color: strokeColor,
                  width: obj.strokeWidth,
                },
              }
            );
          }
        } else if (
          obj.type === "image" ||
          obj.type === "path" ||
          obj.type === "group"
        ) {
          const dataUrl = await rasterizeToPng(obj);

          slide.addImage({
            data: dataUrl,
            x: obj.left / 72,
            y: obj.top / 72,
            w: (obj.width * obj.scaleX) / 72, // Scale down to original size
            h: (obj.height * obj.scaleY) / 72, // Scale down to original size
          });
        }
      }
    };

    // Process the main canvas instance
    if (canvasInstance.current) {
      await processCanvas(canvasInstance.current, 0);
    }

    // Process each populated canvas instance
    for (let i = 0; i < populatedCanvasRefs.current.length; i++) {
      if (populatedCanvasRefs.current[i]) {
        await processCanvas(populatedCanvasRefs.current[i], i + 1);
      }
    }

    // Save the presentation
    pptx.writeFile("fabric_canvas.pptx");
  };

  return (
    <>
      <DropdownMenu.Item icon={Presentation2Icon} onClick={saveToPpt}>
        Download PPT
      </DropdownMenu.Item>
    </>
  );
};

export default CanvasToPpt;
