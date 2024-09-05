import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  Flex,
  Paragraph,
  Separator,
  ToggleGroup,
  Tooltip,
  IconButton,
  Input,
} from "blocksin-system";
import {
  CircleIcon,
  EyeOpenIcon,
  TokensIcon,
  CheckIcon,
  EyeClosedIcon,
  Half2Icon,
} from "sebikostudio-icons";
import GradientPicker from "./GradientPicker";
import { HexColorPicker } from "react-colorful";

const ColorStylePicker = ({
  styles,
  selectedObjectType,
  applyColorToSelectedObject,
  isStroke = false,
  currentColor,
  handleColorChange,
  handleInputChange,
  lastColor,
  setLastColor,
  isColorVisible,
  setIsColorVisible,
  currentColorId,
  currentStrokeColorId,
  handleGradientChange,
  selectedGradient,
  gradient,
}) => {
  const [isGradient, setIsGradient] = useState(false);
  const [color, setColor] = useState("");

  useEffect(() => {
    const checkIfGradient =
      currentColor &&
      typeof currentColor === "object" &&
      (currentColor.type === "linear" || currentColor.type === "radial");
    setIsGradient(checkIfGradient);

    if (!checkIfGradient) {
      setColor(typeof currentColor === "string" ? currentColor : "");
    } else {
      setColor("#000"); // Default solid color when switching from gradient
    }
  }, [currentColor]);

  const toggleColorVisibility = () => {
    if (isColorVisible) {
      setLastColor(currentColor); // Store the current color before making it transparent
      handleColorChange("transparent", isStroke);
    } else {
      handleColorChange(lastColor, isStroke); // Restore the last non-transparent color
    }
    setIsColorVisible(!isColorVisible);
  };

  const handleGradientChangeWrapper = (gradient) => {
    handleGradientChange(gradient);
    setIsGradient(true); // Update isGradient state immediately when a gradient is applied
  };
  const handleToggleChange = (value) => {
    setIsGradient(value === "gradient");
    if (value === "solid") {
      handleColorChange(color, isStroke);
      // Apply the last used solid color when switching to solid
    }
  };

  const getGradientType = (gradient) => {
    if (gradient) {
      if (gradient.startsWith("linear-gradient")) {
        return "linear";
      }
      if (gradient.startsWith("radial-gradient")) {
        return "radial";
      }
    }
    return "";
  };

  return (
    <>
      <Flex customClass="inputGroup">
        <>
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <div>
                {!isGradient ? (
                  <div
                    className="colorBox"
                    style={{
                      backgroundColor:
                        typeof currentColor === "string" ? currentColor : "",
                    }}
                  ></div>
                ) : (
                  <Flex gap={200} align="center" customClass="GradientButton">
                    <div
                      className="gradient-preview"
                      style={{
                        background: gradient,
                      }}
                    />
                    <Paragraph size="large">
                      {getGradientType(gradient)}
                    </Paragraph>
                  </Flex>
                )}
              </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              className="DropdownMenuContent noPadding fillPicker"
              sideOffset={28}
              align="end"
              side="left"
            >
              {!isStroke && (
                <Flex
                  direction="column"
                  gap={100}
                  style={{ marginBottom: "var(--size-100)" }}
                >
                  <Flex
                    direction="column"
                    style={{ padding: "0 var(--size-200)" }}
                  >
                    <ToggleGroup
                      type="single"
                      defaultValue={isGradient ? "gradient" : "solid"}
                      aria-label="Fill"
                      value={isGradient ? "gradient" : "solid"}
                      onValueChange={handleToggleChange}
                    >
                      <Tooltip>
                        <Tooltip.Trigger asChild>
                          <div>
                            {" "}
                            <ToggleGroup.Item value="solid" aria-label="Solid">
                              <CircleIcon />
                            </ToggleGroup.Item>
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Solid</Tooltip.Content>
                      </Tooltip>
                      <Tooltip>
                        <Tooltip.Trigger asChild>
                          <div>
                            <ToggleGroup.Item
                              value="gradient"
                              aria-label="Gradient"
                            >
                              <Half2Icon />
                            </ToggleGroup.Item>
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Gradient</Tooltip.Content>
                      </Tooltip>
                    </ToggleGroup>
                  </Flex>
                  <Separator />
                </Flex>
              )}

              {!isGradient ? (
                <Flex
                  direction="column"
                  style={{ padding: "0 var(--size-200)" }}
                >
                  <HexColorPicker
                    color={currentColor}
                    onChange={(color) => handleColorChange(color, isStroke)}
                  />
                </Flex>
              ) : (
                <GradientPicker
                  onGradientChange={handleGradientChangeWrapper}
                  selectedGradient={selectedGradient}
                  enhancedAccessibility={false}
                />
              )}
            </DropdownMenu.Content>
          </DropdownMenu>
          {!isGradient && (
            <Input
              type="text"
              value={currentColor}
              onChange={(event) => handleInputChange(event, isStroke)}
              label={false}
              fluid
              placeholder="Hex Color"
            />
          )}
        </>
      </Flex>
      <Flex gap={100}>
        {!isStroke && (
          <IconButton
            size="small"
            variant="ghost"
            onClick={toggleColorVisibility}
          >
            {isColorVisible && currentColor !== "transparent" ? (
              <EyeOpenIcon />
            ) : (
              <EyeClosedIcon />
            )}
          </IconButton>
        )}
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <IconButton
              disabled={styles.length === 0}
              size="small"
              variant="ghost"
            >
              <TokensIcon />
            </IconButton>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content sideOffset={4} align="end" side="left">
            {styles.map((style) => {
              const shouldDisplay =
                (selectedObjectType === "text" && style.visibility.text) ||
                (selectedObjectType === "shape" && style.visibility.shapes);
              const isSelected =
                style.id === (isStroke ? currentStrokeColorId : currentColorId);

              return (
                shouldDisplay && (
                  <DropdownMenu.Item
                    key={style.id}
                    onClick={() =>
                      applyColorToSelectedObject(
                        style.hexColor,
                        style.id,
                        isStroke
                      )
                    }
                    icon={isSelected && CheckIcon}
                  >
                    <Flex fluid align="center" gap={200}>
                      <div
                        style={{
                          backgroundColor: style.hexColor,
                          padding: "10px",
                          borderRadius: "var(--size-50)",
                          color: "#fff",
                        }}
                      ></div>
                      {style.colorName}
                    </Flex>
                  </DropdownMenu.Item>
                )
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu>
      </Flex>
    </>
  );
};

export default ColorStylePicker;
