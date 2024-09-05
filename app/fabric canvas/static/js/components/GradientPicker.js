import React, { useState, useRef, useEffect } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import "./GradientPicker.scss";
import { Select, Input, Flex, Slider, Separator } from "blocksin-system";

const GradientPicker = ({
  onGradientChange,
  selectedGradient,
  enhancedAccessibility = false,
}) => {
  const [gradientType, setGradientType] = useState("linear");
  const [color1, setColor1] = useState("rgba(255, 0, 0, 1)");
  const [color2, setColor2] = useState("rgba(0, 0, 255, 1)");
  const [angle, setAngle] = useState(90);
  const [position1, setPosition1] = useState(0);
  const [position2, setPosition2] = useState(100);
  const [activeColor, setActiveColor] = useState("color1");
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);

  useEffect(() => {
    if (selectedGradient) {
      setGradientType(selectedGradient.type);
      setPosition1(selectedGradient.colorStops[0].offset * 100);
      setPosition2(selectedGradient.colorStops[1].offset * 100);
      setColor1(selectedGradient.colorStops[0].color);
      setColor2(selectedGradient.colorStops[1].color);

      if (selectedGradient.type === "linear") {
        const angleRad = Math.atan2(
          selectedGradient.coords.y2 - selectedGradient.coords.y1,
          selectedGradient.coords.x2 - selectedGradient.coords.x1
        );
        setAngle((angleRad * 180) / Math.PI);
      }
    }
  }, [selectedGradient]);

  const triggerGradientChange = () => {
    if (onGradientChange) {
      const gradientStyle = {
        background:
          gradientType === "linear"
            ? `linear-gradient(${angle}deg, ${color1} ${position1}%, ${color2} ${position2}%)`
            : `radial-gradient(circle, ${color1} ${position1}%, ${color2} ${position2}%)`,
      };

      const fabricGradient = {
        type: gradientType,
        coords:
          gradientType === "linear"
            ? {
                x1: 0,
                y1: 0,
                x2: Math.cos((angle * Math.PI) / 180),
                y2: Math.sin((angle * Math.PI) / 180),
              }
            : { x1: 0.5, y1: 0.5, x2: 0.5, y2: 0.5, r1: 0, r2: 0.5 },
        colorStops: [
          { offset: position1 / 100, color: color1 },
          { offset: position2 / 100, color: color2 },
        ],
      };

      onGradientChange({
        cssGradient: gradientStyle.background,
        fabricGradient,
      });
    }
  };

  const handleMouseMove = (e, sliderRef, setPosition) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.parentElement.getBoundingClientRect();
    const pos = ((e.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pos)));
    triggerGradientChange();
  };

  const handleMouseDown = (e, sliderRef, setPosition) => {
    const handleMouseMoveBound = (e) =>
      handleMouseMove(e, sliderRef, setPosition);
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMoveBound);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMoveBound);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <Flex
      customClass="GradientPicker"
      align="center"
      direction="column"
      gap={300}
    >
      <Flex customClass="padding" fluid>
        <label style={{ width: "100%" }}>
          Gradient Type
          <Select
            value={gradientType}
            onValueChange={(value) => {
              setGradientType(value);
              triggerGradientChange();
            }}
          >
            <Select.Trigger>
              <Select.Value placeholder="Select gradient type" />
            </Select.Trigger>
            <Select.Content position="popper">
              <Select.Item value="linear">Linear</Select.Item>
              <Select.Item value="radial">Radial</Select.Item>
            </Select.Content>
          </Select>
        </label>
      </Flex>

      {gradientType === "linear" && (
        <Flex customClass="padding" fluid>
          <label style={{ width: "100%" }} className="angle">
            <Slider
              defaultValue={[angle]}
              max={360}
              step={1}
              fluid
              onValueChange={(value) => {
                const roundedValue = Math.round(value[0]);
                setAngle(roundedValue);
                triggerGradientChange();
              }}
            />
            <span className="angleValue">{angle}%</span>
          </label>
        </Flex>
      )}
      <Separator />
      {activeColor === "color1" && (
        <Flex customClass="padding" direction="column" align="center" gap={300}>
          <RgbaStringColorPicker
            color={color1}
            onChange={(color) => {
              setColor1(color);
              triggerGradientChange();
            }}
            aria-label="Color 1 picker"
          />
          <Input
            label="Start"
            fluid
            value={color1}
            onChange={(e) => {
              setColor1(e.target.value);
              triggerGradientChange();
            }}
          />
        </Flex>
      )}

      {activeColor === "color2" && (
        <Flex customClass="padding" direction="column" align="center" gap={300}>
          <RgbaStringColorPicker
            color={color2}
            onChange={(color) => {
              setColor2(color);
              triggerGradientChange();
            }}
            aria-label="Color 2 picker"
          />
          <Input
            label="End"
            value={color2}
            fluid
            onChange={(e) => {
              setColor2(e.target.value);
              triggerGradientChange();
            }}
          />
        </Flex>
      )}
      {enhancedAccessibility && (
        <Flex
          customClass="padding"
          gap={200}
          fluid
          // style={{ margin: "var(--size-200) 0" }}
        >
          <div
            className="color1 colorButton"
            aria-label="Color 1"
            onClick={() => setActiveColor("color1")}
            tabIndex="0"
            role="button"
            aria-pressed={activeColor === "color1"}
          >
            <div
              style={{
                background: color1,
              }}
            />
          </div>
          <div
            className="color2 colorButton"
            aria-label="Color 2"
            onClick={() => setActiveColor("color2")}
            tabIndex="0"
            role="button"
            aria-pressed={activeColor === "color2"}
          >
            <div
              style={{
                background: color2,
              }}
            />
          </div>
        </Flex>
      )}
      <Flex direction="column" customClass="padding" fluid>
        <Flex customClass="gradientSlider" fluid>
          <div
            className="gradientbg"
            style={{
              background:
                gradientType === "linear"
                  ? `linear-gradient(${angle}deg, ${color1} ${position1}%, ${color2} ${position2}%)`
                  : `radial-gradient(circle, ${color1} ${position1}%, ${color2} ${position2}%)`,
            }}
          />
          <div
            ref={slider1Ref}
            className="colorHandle"
            style={{
              left: `${position1}%`,
            }}
            onMouseDown={(e) => handleMouseDown(e, slider1Ref, setPosition1)}
            aria-label="Color 1"
            onClick={() => setActiveColor("color1")}
            tabIndex="0"
            role="button"
            aria-pressed={activeColor === "color1"}
          >
            <div className="handle">
              <div
                style={{
                  backgroundColor: color1,
                }}
              />
            </div>
          </div>
          <div
            ref={slider2Ref}
            className="colorHandle"
            style={{
              left: `${position2}%`,
            }}
            onMouseDown={(e) => handleMouseDown(e, slider2Ref, setPosition2)}
            aria-label="Color 2"
            onClick={() => setActiveColor("color2")}
            tabIndex="0"
            role="button"
            aria-pressed={activeColor === "color2"}
          >
            <div className="handle">
              <div
                style={{
                  backgroundColor: color2,
                }}
              />
            </div>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GradientPicker;
