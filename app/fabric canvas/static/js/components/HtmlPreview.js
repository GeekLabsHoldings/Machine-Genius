import React from "react";
import { Flex, Button, ScrollArea, IconButton } from "blocksin-system";
import { Cross2Icon } from "sebikostudio-icons";

const HtmlPreview = ({ json, setShowHTML }) => {
  const downloadHTML = () => {
    const container = document.getElementById("htmlrender");
    if (container) {
      const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Canvas HTML</title>
              <style>
                /* Include any required styles here */
                body { margin: 0; padding: 0; }
                .flex { display: flex; }
                .flex-column { flex-direction: column; }
                .gap-200 { gap: 200px; }
              </style>
            </head>
            <body>
              ${container.outerHTML}
            </body>
            </html>
          `;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "canvas.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const renderGradient = (fill) => {
    if (fill.type === "linear") {
      const { coords, colorStops } = fill;
      const angle =
        (Math.atan2(coords.y2 - coords.y1, coords.x2 - coords.x1) * 180) /
        Math.PI;
      const gradient = `linear-gradient(${angle}deg, ${colorStops
        .map((stop) => `${stop.color} ${stop.offset * 100}%`)
        .join(", ")})`;
      return gradient;
    }
    return fill;
  };

  const renderObject = (obj) => {
    const commonStyle = {
      position: "absolute",
      left: `${obj.left}px`,
      top: `${obj.top}px`,
      transform: `rotate(${obj.angle}deg)`,
      transformOrigin: "center",
      width: `${obj.width * obj.scaleX}px`,
      height: `${obj.height * obj.scaleY}px`,
      opacity: obj.opacity || 1,
    };

    if (obj.type === "group") {
      const alignmentStyle =
        obj.layoutDirection === "column"
          ? { justifyContent: obj.alignment }
          : { alignItems: obj.alignment };

      return (
        <div
          key={obj.id}
          style={{
            ...commonStyle,
            display: "flex",
            flexDirection: obj.layoutDirection,
            gap: `${obj.gap}px`,
            ...alignmentStyle,
          }}
        >
          {obj.objects && obj.objects.map(renderObject)}
        </div>
      );
    }

    if (obj.type === "rect" || obj.type === "circle") {
      const backgroundStyle =
        obj.fill.type === "linear"
          ? {
              background: renderGradient(obj.fill),
            }
          : {
              backgroundColor: obj.fill,
            };

      if (obj.type === "circle") {
        backgroundStyle.borderRadius = "50%";
      }

      const borderStyle = obj.stroke
        ? {
            border: `${obj.strokeWidth}px solid ${obj.stroke}`,
          }
        : {};

      return (
        <div
          key={obj.id}
          style={{
            ...commonStyle,
            ...backgroundStyle,
            ...borderStyle,
            boxShadow: obj.shadow
              ? `${obj.shadow.offsetX}px ${obj.shadow.offsetY}px ${obj.shadow.blur}px ${obj.shadow.color}`
              : "none",
          }}
        ></div>
      );
    }

    if (obj.type === "textbox") {
      const hasShadow =
        obj.shadow &&
        !(
          obj.shadow.offsetX === 0 &&
          obj.shadow.offsetY === 0 &&
          obj.shadow.blur === 0 &&
          obj.shadow.color === "rgb(0, 0, 0)"
        );

      const textStyle = {
        fontSize: `${obj.fontSize}px`,
        fontFamily: obj.fontFamily,
        color: obj.fill.type === "linear" ? "transparent" : obj.fill,
        background:
          obj.fill.type === "linear"
            ? `${renderGradient(obj.fill)} text`
            : "none",
        lineHeight: obj.lineHeight,
        fontStyle: obj.fontStyle,
        fontWeight: obj.fontWeight,
        textAlign: obj.textAlign,

        backgroundClip: obj.fill.type === "linear" ? "text" : "initial",
        WebkitBackgroundClip: obj.fill.type === "linear" ? "text" : "initial",
        WebkitTextFillColor:
          obj.fill.type === "linear" ? "transparent" : obj.fill,
        position: "relative",
        zIndex: 1,
        WebkitTextStroke: obj.stroke
          ? `${obj.strokeWidth}px ${obj.stroke}`
          : "none",
      };

      const textShadowStyle = hasShadow
        ? {
            content: `"${obj.text}"`,
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: -1,
            textShadow: `${obj.shadow.offsetX}px ${obj.shadow.offsetY}px ${obj.shadow.blur}px ${obj.shadow.color}`,
            fontSize: `${obj.fontSize}px`,
            fontFamily: obj.fontFamily,
            lineHeight: obj.lineHeight,
            fontStyle: obj.fontStyle,
            fontWeight: obj.fontWeight,
            textAlign: obj.textAlign,
            color: "transparent",
          }
        : {};

      return (
        <span
          key={obj.id}
          style={{
            ...commonStyle,
            display: "inline-block", // Ensures span behaves similarly to a block element
            textAlign: obj.textAlign,
          }}
        >
          <span style={textStyle}>{obj.text}</span>
          {hasShadow && <span style={textShadowStyle}>{obj.text}</span>}
        </span>
      );
    }

    if (obj.type === "line") {
      const lineProps = {
        x1: obj.x1,
        y1: obj.y1,
        x2: obj.x2,
        y2: obj.y2,
        stroke: obj.stroke,
        strokeWidth: obj.strokeWidth,
        strokeDasharray: obj.strokeDasharray,
        strokeLinecap: obj.strokeLinecap,
        strokeLinejoin: obj.strokeLinejoin,
        opacity: obj.opacity,
      };

      return (
        <svg
          key={obj.id}
          style={{
            position: "absolute",
            left: `${obj.left}px`,
            top: `${obj.top}px`,
            width: `${obj.width}px`,
            height: `${obj.height}px`,
            transform: `rotate(${obj.angle}deg)`,
            transformOrigin: "center",
          }}
        >
          <line
            {...lineProps}
            x1={`${obj.x1}px`}
            y1={`${obj.y1}px`}
            x2={`${obj.x2}px`}
            y2={`${obj.y2}px`}
            style={{ transform: "translateX(50%) translateY(50%)" }}
          />
        </svg>
      );
    }

    if (obj.type === "image") {
      return (
        <img key={obj.id} src={obj.src} alt={obj.label} style={commonStyle} />
      );
    }

    return null;
  };

  let parsedJson = {};

  try {
    parsedJson = JSON.parse(json);
    console.log(parsedJson);
  } catch (error) {
    console.error("Error parsing JSON", error);
  }
  const sectionStyle = {
    position: "relative",
    width: `100%`,
    height: `auto`,
    backgroundColor: parsedJson.background,
    overflow: "hidden",
    margin: "auto",
  };

  const containerStyle = {
    position: "relative",
    maxWidth: `${parsedJson.width || 800}px`, // default width
    with: "100%",
    height: `${parsedJson.height || 600}px`, // default height
    backgroundColor: parsedJson.background,
    backgroundImage: parsedJson.backgroundImage
      ? `url(${parsedJson.backgroundImage.src})`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    margin: "auto",
  };

  return (
    <Flex customClass="htmlRender" direction="column" gap={200}>
      <Flex gap={200} customClass="btnGroup">
        <Button onClick={downloadHTML}>Download HTML</Button>
        <Flex
          style={{
            background: "var(--background-neutral-container)",
            borderRadius: "var(--size-50)",
          }}
        >
          <IconButton variant="ghost" onClick={() => setShowHTML(false)}>
            <Cross2Icon />
          </IconButton>
        </Flex>
      </Flex>

      <ScrollArea>
        <div
          style={{
            margin: "var(--size-1200) 0 ",
            width: "100%",
            height: "100%",
          }}
        >
          <div id="htmlrender" style={sectionStyle}>
            <div className="row" style={containerStyle}>
              {parsedJson.objects && parsedJson.objects.map(renderObject)}
            </div>
          </div>
        </div>
      </ScrollArea>
    </Flex>
  );
};

export default HtmlPreview;
