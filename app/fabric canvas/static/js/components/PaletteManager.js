import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  DropdownMenu,
  Flex,
  Tooltip,
  Separator,
} from "blocksin-system";
import { PlusIcon, SparklesIcon, TrashIcon } from "sebikostudio-icons";

// Main function to render the button and the dropdown menu
const PaletteManager = ({ generateColorPalette, applyColorPalette }) => {
  const [currentPalette, setCurrentPalette] = useState([]);
  const [savedPalettes, setSavedPalettes] = useState([]);

  useEffect(() => {
    const palettes =
      JSON.parse(localStorage.getItem("UserColorPalettes")) || [];
    setSavedPalettes(palettes);
  }, []);

  const handleGeneratePalette = () => {
    const palette = generateColorPalette();
    applyColorPalette(palette);
    setCurrentPalette(palette);
  };

  const handleSavePalette = () => {
    savePalette(currentPalette);
  };

  const handleApplySavedPalette = (palette) => {
    applySavedPalette(palette);
  };

  const handleDeletePalette = (index) => {
    const palettes = [...savedPalettes];
    palettes.splice(index, 1); // Remove the palette at the given index
    localStorage.setItem("UserColorPalettes", JSON.stringify(palettes));
    setSavedPalettes(palettes);
  };

  const savePalette = (palette) => {
    if (palette.length === 0) return; // Prevent saving empty palettes
    const palettes = [...savedPalettes, palette];
    localStorage.setItem("UserColorPalettes", JSON.stringify(palettes));
    setSavedPalettes(palettes);
  };

  const applySavedPalette = (palette) => {
    applyColorPalette(palette);
  };

  return (
    <Flex>
      <Flex customClass="SplitButton">
        {/* <Button size="small" onClick={handleGeneratePalette}>
          Inspire Me!
        </Button> */}
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button size="small" variant="solid">
              Inspire Me!
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            {savedPalettes.map((palette, index) => (
              <DropdownMenu.Item
                className="DropdownMenuItem paletteItem"
                key={index}
                onClick={() => handleApplySavedPalette(palette)}
              >
                <Flex align="center" justify="between" fluid gap={200}>
                  <Flex customClass="paletteBox">
                    {palette.map((color, i) => (
                      <div
                        key={i}
                        style={{
                          background: color,
                          width: "20px",
                          height: "20px",
                        }}
                      ></div>
                    ))}
                  </Flex>
                  <IconButton
                    size="mini"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the palette apply
                      handleDeletePalette(index);
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Flex>
              </DropdownMenu.Item>
            ))}
            <Separator />
            <DropdownMenu.Item
              icon={SparklesIcon}
              onClick={handleGeneratePalette}
            >
              Inspire Me
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>

        <Tooltip>
          <Tooltip.Trigger asChild>
            <IconButton size="small" onClick={handleSavePalette}>
              <PlusIcon />
            </IconButton>
          </Tooltip.Trigger>
          <Tooltip.Content>Save palette</Tooltip.Content>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default PaletteManager;
