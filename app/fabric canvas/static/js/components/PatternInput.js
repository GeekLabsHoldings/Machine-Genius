import React, { useState, useRef, useEffect } from "react";
import { Flex, Button, Select, Input } from "blocksin-system";
import { fabric } from "fabric";

const PatternInput = ({ handlePatternChange, canvasInstance }) => {
  const [patternImage, setPatternImage] = useState(null);
  const [patternRepeat, setPatternRepeat] = useState("repeat");
  const [patternOffsetX, setPatternOffsetX] = useState(0);
  const [patternOffsetY, setPatternOffsetY] = useState(0);
  const fileInputRef = useRef(null);
  const patternSourceCanvasRef = useRef(new fabric.StaticCanvas());

  useEffect(() => {
    const canvas = canvasInstance.current;
    const handleSelection = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.fill instanceof fabric.Pattern) {
        const pattern = activeObject.fill;
        const img = pattern.source;
        setPatternRepeat(pattern.repeat);
        setPatternOffsetX(pattern.offsetX || 0);
        setPatternOffsetY(pattern.offsetY || 0);
        const dataUrl = img.toDataURL
          ? img.toDataURL()
          : img.toDataURL("image/png");
        setPatternImage(dataUrl);
      } else {
        setPatternImage(null);
        setPatternRepeat("repeat");
        setPatternOffsetX(0);
        setPatternOffsetY(0);
      }
    };

    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);

    return () => {
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:updated", handleSelection);
    };
    // eslint-disable-next-line
  }, [canvasInstance.current]);

  useEffect(() => {
    if (patternImage) {
      updatePattern(patternImage);
    }
    // eslint-disable-next-line
  }, [patternRepeat, patternOffsetX, patternOffsetY]);

  const uploadImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setPatternImage(e.target.result);
      updatePattern(e.target.result, true);
    };
    reader.readAsDataURL(file);
  };

  const updatePattern = (imageSrc, isNewImage = false) => {
    fabric.Image.fromURL(imageSrc, (img) => {
      const patternSourceCanvas = patternSourceCanvasRef.current;
      patternSourceCanvas.clear();
      patternSourceCanvas.setDimensions({
        width: img.width,
        height: img.height,
      });
      patternSourceCanvas.add(img);
      patternSourceCanvas.renderAll();

      const pattern = new fabric.Pattern({
        source: patternSourceCanvas.getElement(),
        repeat: patternRepeat,
        offsetX: patternOffsetX,
        offsetY: patternOffsetY,
      });

      handlePatternChange(pattern);
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Flex
      gap={300}
      align="center"
      fluid
      style={{ marginTop: "var(--size-100)" }}
    >
      <Flex
        gap={100}
        align="center"
        direction="column"
        customClass="inputGroup"
      >
        <Button onClick={handleButtonClick}>Upload Image</Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={uploadImage}
        />
        {patternImage && (
          <div
            style={{
              width: 50,
              height: 50,
              backgroundImage: `url(${patternImage})`,
              backgroundSize: "cover",
              border: "1px solid #ccc",
              marginBottom: "10px",
            }}
          />
        )}
        <Select
          value={patternRepeat}
          onValueChange={(value) => {
            setPatternRepeat(value);
          }}
        >
          <Select.Trigger aria-label="Pattern Repeat">
            <Select.Value placeholder="Select repeat" />
          </Select.Trigger>
          <Select.Content sideOffset={8} align="start">
            <Select.Item value="repeat">Repeat</Select.Item>
            <Select.Item value="no-repeat">No Repeat</Select.Item>
          </Select.Content>
        </Select>
        <Input
          type="number"
          value={patternOffsetX}
          onChange={(e) => setPatternOffsetX(parseInt(e.target.value, 10))}
          placeholder="Pattern Offset X"
        />
        <Input
          type="number"
          value={patternOffsetY}
          onChange={(e) => setPatternOffsetY(parseInt(e.target.value, 10))}
          placeholder="Pattern Offset Y"
        />
      </Flex>
    </Flex>
  );
};

export default PatternInput;
