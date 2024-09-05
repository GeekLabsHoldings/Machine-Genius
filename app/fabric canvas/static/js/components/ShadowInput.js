import React, { useState, useEffect } from "react";
import { Flex, Input, DropdownMenu, Tooltip, Paragraph } from "blocksin-system";
import { RgbaStringColorPicker } from "react-colorful";
import { BlurIcon } from "sebikostudio-icons";

const ShadowInput = ({ selectedElement, setShadow, handleShadowChange }) => {
  const [shadowColor, setShadowColor] = useState("rgba(0, 0, 0, 1)");
  const [shadowBlur, setShadowBlur] = useState(0);
  const [shadowOffsetX, setShadowOffsetX] = useState(0);
  const [shadowOffsetY, setShadowOffsetY] = useState(0);
  const [shadowHexColor, setShadowHexColor] = useState("#000000");

  useEffect(() => {
    if (selectedElement && selectedElement.shadow) {
      const shadow = selectedElement.shadow;
      const initialColor = shadow.color || "rgba(0, 0, 0, 1)";
      setShadowColor(initialColor);
      setShadowBlur(shadow.blur || 0);
      setShadowOffsetX(shadow.offsetX || 0);
      setShadowOffsetY(shadow.offsetY || 0);
      setShadowHexColor(rgbaToHex(initialColor));
    }
  }, [selectedElement]);

  useEffect(() => {
    setShadowHexColor(rgbaToHex(shadowColor));
    updateShadow(shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY);
    // eslint-disable-next-line
  }, [shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY]);

  const rgbaToHex = (rgba) => {
    let parts = rgba.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d+\.?\d*)?\)$/
    );
    let r = parseInt(parts[1], 10),
      g = parseInt(parts[2], 10),
      b = parseInt(parts[3], 10),
      a = Math.round(parseFloat(parts[4] || 1) * 255);
    return (
      "#" +
      ("0" + r.toString(16)).slice(-2) +
      ("0" + g.toString(16)).slice(-2) +
      ("0" + b.toString(16)).slice(-2) +
      ("0" + a.toString(16)).slice(-2)
    );
  };

  const hexToRgba = (hex) => {
    let r = 0,
      g = 0,
      b = 0,
      a = 1;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    } else if (hex.length === 9) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
      a = parseInt(hex.slice(7, 9), 16) / 255;
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const handleHexInputChange = (event) => {
    const newHex = event.target.value;
    setShadowHexColor(newHex);
    const newRgba = hexToRgba(newHex);
    setShadowColor(newRgba);
    updateShadow(newRgba, shadowBlur, shadowOffsetX, shadowOffsetY);
  };

  const updateShadow = (color, blur, offsetX, offsetY) => {
    const shadow = {
      color: color,
      blur: blur,
      offsetX: offsetX,
      offsetY: offsetY,
    };
    setShadow(shadow); // Update local state
    handleShadowChange(shadow); // Update canvas object shadow
  };

  return (
    <Flex gap={100} direction="column" fluid customClass="card">
      <Paragraph weight="bold">Shadow Effect</Paragraph>

      <Flex gap={100} align="center" fluid customClass="inputGroup">
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <div
              className="colorBox"
              style={{
                backgroundColor:
                  typeof shadowColor === "string" ? shadowColor : "",
              }}
            ></div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content noPadding side="left">
            <RgbaStringColorPicker
              color={shadowColor}
              onChange={(color) => setShadowColor(color)}
            />
          </DropdownMenu.Content>
        </DropdownMenu>

        <Input
          type="text"
          value={shadowHexColor}
          onChange={handleHexInputChange}
          placeholder="Hex Color"
          label={false}
        />
      </Flex>

      <Flex gap={300} align="center" fluid>
        <Flex customClass="inputGroup">
          <Tooltip>
            <Tooltip.Trigger asChild>
              <div>
                <Paragraph size="large">X</Paragraph>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content>Left position</Tooltip.Content>
          </Tooltip>
          <Input
            type="number"
            value={shadowOffsetX}
            onChange={(e) => {
              const newOffsetX = e.target.value;
              setShadowOffsetX(newOffsetX);
              updateShadow(shadowColor, shadowBlur, newOffsetX, shadowOffsetY);
            }}
            placeholder="Offset X"
            min="-100"
            max="100"
          />
        </Flex>

        <Flex customClass="inputGroup">
          <Tooltip>
            <Tooltip.Trigger asChild>
              <div>
                <Paragraph size="large">Y</Paragraph>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content>Top position</Tooltip.Content>
          </Tooltip>

          <Input
            type="number"
            value={shadowOffsetY}
            onChange={(e) => {
              const newOffsetY = e.target.value;
              setShadowOffsetY(newOffsetY);
              updateShadow(shadowColor, shadowBlur, shadowOffsetX, newOffsetY);
            }}
            placeholder="Offset Y"
            min="-100"
            max="100"
          />
        </Flex>
      </Flex>
      <Flex customClass="inputGroup">
        <Tooltip>
          <Tooltip.Trigger>
            <BlurIcon />
          </Tooltip.Trigger>
          <Tooltip.Content>Blur</Tooltip.Content>
        </Tooltip>

        <Input
          type="number"
          value={shadowBlur}
          onChange={(e) => {
            const newBlur = e.target.value;
            setShadowBlur(newBlur);
            updateShadow(shadowColor, newBlur, shadowOffsetX, shadowOffsetY);
          }}
          placeholder="Blur"
          min="0"
        />
      </Flex>
    </Flex>
  );
};

export default ShadowInput;
