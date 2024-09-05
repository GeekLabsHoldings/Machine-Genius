import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Slider,
  Button,
  Flex,
  Tabs,
  ScrollArea,
  Separator,
  Select,
} from "blocksin-system";
import { Bar } from "react-chartjs-2";
import { fabric } from "fabric";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement);

const blendModes = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

const PhotoMode = ({
  canvas,
  updateImageObjectsOrder,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  saturation,
  setSaturation,
  hue,
  setHue,
  blur,
  setBlur,
  noise,
  setNoise,
  isMonochrome,
  setIsMonochrome,
  histogramData,
  setHistogramData,
  redChannel,
  setRedChannel,
  greenChannel,
  setGreenChannel,
  blueChannel,
  setBlueChannel,
}) => {
  const [blendMode, setBlendMode] = useState("normal");

  // Function to get the CSS variable value
  const getCSSVariableValue = (variableName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(
      variableName
    );
  };

  useEffect(() => {
    const handleSelection = (e) => {
      const selectedImage = e.selected[0];
      if (selectedImage && selectedImage.filters) {
        updateSliders(selectedImage);
        generateHistogram(selectedImage);
        setBlendMode(selectedImage.globalCompositeOperation || "normal");
      }
    };

    if (canvas) {
      canvas.on("selection:created", handleSelection);
      canvas.on("selection:updated", handleSelection);
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created", handleSelection);
        canvas.off("selection:updated", handleSelection);
      }
    };
    // eslint-disable-next-line
  }, [canvas]);

  const updateSliders = (obj) => {
    const filters = obj.filters || [];
    if (filters.length > 0) {
      setBrightness([filters[0]?.brightness ?? 0]);
      setContrast([filters[1]?.contrast ?? 0]);
      setSaturation([filters[2]?.saturation ?? 0]);
      setHue([filters[3]?.rotation ?? 0]);
      setBlur([filters[4]?.blur ?? 0]);
      setNoise([filters[5]?.noise ?? 0]);
      setIsMonochrome(filters.some((filter) => filter.type === "Grayscale"));
      const gammaFilter = filters.find((filter) => filter.type === "Gamma");
      setRedChannel([gammaFilter?.gamma[0] ?? 1]);
      setGreenChannel([gammaFilter?.gamma[1] ?? 1]);
      setBlueChannel([gammaFilter?.gamma[2] ?? 1]);
    } else {
      setBrightness([0]);
      setContrast([0]);
      setSaturation([0]);
      setHue([0]);
      setBlur([0]);
      setNoise([0]);
      setIsMonochrome(false);
      setRedChannel([1]);
      setGreenChannel([1]);
      setBlueChannel([1]);
    }
  };

  const applyFilters = () => {
    const obj = canvas.getActiveObject();
    if (obj && obj.filters && typeof obj.applyFilters === "function") {
      obj.filters = [
        new fabric.Image.filters.Brightness({ brightness: brightness[0] }),
        new fabric.Image.filters.Contrast({ contrast: contrast[0] }),
        new fabric.Image.filters.Saturation({ saturation: saturation[0] }),
        new fabric.Image.filters.HueRotation({ rotation: hue[0] }),
        new fabric.Image.filters.Blur({ blur: blur[0] }),
        new fabric.Image.filters.Noise({ noise: noise[0] }),
        isMonochrome && new fabric.Image.filters.Grayscale(),
        new fabric.Image.filters.Gamma({
          gamma: [redChannel[0], greenChannel[0], blueChannel[0]],
        }),
      ].filter(Boolean);

      obj.globalCompositeOperation = blendMode;

      const imageTextureSize = Math.max(obj.width, obj.height);
      if (imageTextureSize > fabric.textureSize) {
        fabric.textureSize = imageTextureSize;
      }

      obj.applyFilters();
      canvas.renderAll();
      generateHistogram(obj);
    }
  };

  const handleApply = () => {
    const obj = canvas.getActiveObject();
    if (obj && obj.filters && typeof obj.applyFilters === "function") {
      const originalScaleX = obj.scaleX;
      const originalScaleY = obj.scaleY;

      const originalProperties = {
        id: obj.id,
        label: obj.label,
        zIndex: obj.zIndex,
      };

      // Restore the image to its original resolution before applying effects
      obj.scaleX = 1;
      obj.scaleY = 1;
      obj.applyFilters();

      const dataURL = obj.toDataURL({
        format: "png",
        quality: 1,
        width: obj.width,
        height: obj.height,
      });

      fabric.Image.fromURL(dataURL, (img) => {
        img.set({
          ...originalProperties,
          left: obj.left,
          top: obj.top,
          scaleX: originalScaleX,
          scaleY: originalScaleY,
          angle: obj.angle,
          globalCompositeOperation: blendMode,
        });

        canvas.remove(obj);
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.discardActiveObject();
        canvas.renderAll();
        updateImageObjectsOrder();
      });
    }
  };

  useEffect(() => {
    if (canvas) {
      applyFilters();
    }
    // eslint-disable-next-line
  }, [
    brightness,
    contrast,
    saturation,
    hue,
    blur,
    noise,
    isMonochrome,
    redChannel,
    greenChannel,
    blueChannel,
    blendMode,
    canvas,
  ]);

  const generateHistogram = (image) => {
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = image.width;
    offscreenCanvas.height = image.height;
    const context = offscreenCanvas.getContext("2d");

    context.drawImage(image.getElement(), 0, 0, image.width, image.height);
    const imageData = context.getImageData(
      0,
      0,
      image.width,
      image.height
    ).data;
    const histogram = new Array(256).fill(0);

    for (let i = 0; i < imageData.length; i += 4) {
      const gray = Math.round(
        (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3
      );
      histogram[gray]++;
    }

    setHistogramData({
      labels: [...Array(256).keys()],
      values: histogram,
    });
  };

  const foregroundNeutralColor = getCSSVariableValue("--foreground-neutral");

  const [activeTabPhoto, setActiveTabPhoto] = useState("tab1"); // Default tab

  return (
    <Flex
      direction="column"
      customClass="PhotoMode"
      style={{ overflow: "hidden" }}
    >
      <Flex
        direction="column"
        gap={100}
        style={{ marginTop: "var(--size-200)" }}
      >
        <Flex directin="column" customClass="card" fluid>
          <label>Linear Histogram</label>
        </Flex>
        <Flex fluid direction="column" customClass="card histogram">
          <Bar
            data={{
              labels: histogramData.labels,
              datasets: [
                {
                  data: histogramData.values,
                  backgroundColor: foregroundNeutralColor,
                  barThickness: "flex",
                  maxBarThickness: 1,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  display: false,

                  grid: {
                    drawBorder: false, // Hide the x-axis border line
                    drawOnChartArea: false, // Hide grid lines
                    drawTicks: false, // Hide tick marks
                    zeroLineColor: "transparent",
                    borderColor: "transparent",
                  },
                  border: {
                    display: false,
                  },
                },
                y: {
                  display: false,
                  grid: {
                    drawBorder: false, // Hide the y-axis border line
                    drawOnChartArea: false, // Hide grid lines
                    drawTicks: false, // Hide tick marks
                    zeroLineColor: "transparent",
                    borderColor: "transparent",
                  },
                  border: {
                    display: false,
                  },
                },
              },
              elements: {
                line: {
                  borderWidth: 0,
                },
                bar: {
                  borderWidth: 0,
                },
              },
              layout: {
                padding: {
                  bottom: 0,
                },
              },
            }}
          />
        </Flex>
      </Flex>

      <Tabs value={activeTabPhoto} onValueChange={setActiveTabPhoto} fluid>
        <Tabs.List aria-label="Manage Photo Correction">
          <Tabs.Trigger value="tab1">Colours</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Filters</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <ScrollArea style={{ height: "auto" }}>
            <Flex
              customClass="card"
              direction="column"
              gap={200}
              style={{
                paddingTop: "var(--size-400)",
                paddingBottom: "var(--size-400)",
              }}
            >
              <Flex direction="column" gap={100}>
                <label>Monochrome</label>
                <Checkbox
                  checked={isMonochrome}
                  onChange={setIsMonochrome}
                  customID="bw"
                >
                  Monochrome
                </Checkbox>
              </Flex>
              <Flex direction="column" gap={100}>
                <label>Brightness</label>
                <Slider
                  value={brightness}
                  onValueChange={(value) => setBrightness(value)}
                  min={-1}
                  max={1}
                  step={0.01}
                />
              </Flex>
              <Flex direction="column" gap={100}>
                <label>Contrast</label>
                <Slider
                  value={contrast}
                  onValueChange={(value) => setContrast(value)}
                  min={-1}
                  max={1}
                  step={0.01}
                />
              </Flex>
              <Flex direction="column" gap={100}>
                <label>Saturation</label>
                <Slider
                  value={saturation}
                  onValueChange={(value) => setSaturation(value)}
                  min={-1}
                  max={1}
                  step={0.01}
                />
              </Flex>
              <Flex direction="column" gap={100}>
                <label>Hue</label>
                <Slider
                  value={hue}
                  onValueChange={(value) => setHue(value)}
                  min={-1}
                  max={1}
                  step={0.01}
                  className="hue SliderRoot"
                />
              </Flex>
              <Separator />
              <Flex direction="column" gap={100}>
                <label>Red Channel</label>
                <Slider
                  value={redChannel}
                  onValueChange={(value) => setRedChannel(value)}
                  min={0}
                  max={2}
                  step={0.01}
                />
              </Flex>
              <Flex direction="column" gap={100}>
                <label>Green Channel</label>
                <Slider
                  value={greenChannel}
                  onValueChange={(value) => setGreenChannel(value)}
                  min={0}
                  max={2}
                  step={0.01}
                />
              </Flex>
              <Flex direction="column" gap={100}>
                <label>Blue Channel</label>
                <Slider
                  value={blueChannel}
                  onValueChange={(value) => setBlueChannel(value)}
                  min={0}
                  max={2}
                  step={0.01}
                />
              </Flex>
            </Flex>
          </ScrollArea>
        </Tabs.Content>

        <Tabs.Content value="tab2">
          <ScrollArea style={{ height: "auto" }}>
            <Flex
              customClass="card"
              direction="column"
              gap={200}
              style={{
                paddingTop: "var(--size-400)",
                paddingBottom: "var(--size-400)",
              }}
            >
              <Flex direction="column" gap={100}>
                <label>Blend Mode</label>
                <Select value={blendMode} onValueChange={setBlendMode}>
                  <Select.Trigger aria-label="Blend Mode">
                    <Select.Value placeholder="Select blend mode" />
                  </Select.Trigger>
                  <Select.Content sideOffset={8} align="start">
                    {blendModes.map((mode) => (
                      <Select.Item key={mode} value={mode}>
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </Flex>
              <Flex direction="column" gap={100}>
                <label>Blur</label>
                <Slider
                  value={blur}
                  onValueChange={(value) => setBlur(value)}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </Flex>
              <Flex direction="column" gap={100}>
                <label>Noise</label>
                <Slider
                  value={noise}
                  onValueChange={(value) => setNoise(value)}
                  min={0}
                  max={1000}
                  step={1}
                />
              </Flex>
            </Flex>
          </ScrollArea>
        </Tabs.Content>
      </Tabs>

      <Flex
        direction="column"
        customClass="card"
        gap={100}
        style={{
          borderTop: "1px solid var(--border-neutral-subtle)",
          paddingTop: "var(--size-200)",
        }}
      >
        <Button size="small" fluid onClick={handleApply}>
          Apply
        </Button>
      </Flex>
    </Flex>
  );
};

export default PhotoMode;
