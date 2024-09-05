import React, { useEffect } from "react";
import {
  ToggleGroup,
  Tooltip,
  Input,
  Toggle,
  Flex,
  Paragraph,
} from "blocksin-system";
import {
  ArrowRightIcon,
  ArrowDownIcon,
  AlignTopIcon,
  AlignCenterHorizontallyIcon,
  AlignBottomIcon,
  AlignRightIcon,
  AlignLeftIcon,
  PlusIcon,
  MinusIcon,
  ColumnSpacingIcon,
  RowSpacingIcon,
} from "sebikostudio-icons";

const CanvasAutolayout = ({
  autoLayout,
  canvasInstance,
  setAutoLayout,
  layoutDirection,
  setLayoutDirection,
  gap,
  setGap,
  alignment,
  setAlignment,
  applyAutoLayout,
}) => {
  // Update auto layout settings and apply auto layout when toggles change
  useEffect(() => {
    if (canvasInstance.current) {
      const canvas = canvasInstance.current;
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "group") {
        activeObject.set({
          autoLayout,
          layoutDirection,
          gap,
          alignment,
        });
        if (autoLayout) {
          applyAutoLayout(activeObject, canvas);
        }
        canvas.requestRenderAll();
      }
    }
    // eslint-disable-next-line
  }, [autoLayout, layoutDirection, gap, alignment, canvasInstance.current]);

  return (
    <Flex
      direction="column"
      gap={200}
      style={{
        marginBottom: "var(--size-100)",
        marginTop: "var(--size-100)",
      }}
    >
      <Flex justify="between" gap={200} align="center">
        <Paragraph>Auto-layout</Paragraph>
        <Toggle
          size="mini"
          variant="ghost"
          pressed={autoLayout}
          onPressedChange={() => {
            setAutoLayout(!autoLayout);
          }}
        >
          {autoLayout ? <MinusIcon /> : <PlusIcon />}
        </Toggle>
      </Flex>

      {autoLayout && (
        <>
          <Flex direction="column" gap={100}>
            <Paragraph>Layout direction</Paragraph>
            <Flex customClass="inputGroup">
              <ToggleGroup
                type="single"
                value={layoutDirection}
                size="mini"
                aria-label="Layout direction"
                onValueChange={(value) => {
                  setLayoutDirection(value);
                }}
              >
                <ToggleGroup.Item value="row" aria-label="Row direction">
                  <ArrowRightIcon />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="column" aria-label="Column direction">
                  <ArrowDownIcon />
                </ToggleGroup.Item>
              </ToggleGroup>
            </Flex>
          </Flex>

          <Flex customClass="inputGroup">
            <Tooltip>
              <Tooltip.Trigger asChild>
                {layoutDirection === "row" ? (
                  <ColumnSpacingIcon />
                ) : (
                  <RowSpacingIcon />
                )}
              </Tooltip.Trigger>
              <Tooltip.Content>Gap between elements</Tooltip.Content>
            </Tooltip>
            <Input
              type="number"
              value={gap}
              onChange={(e) => setGap(parseInt(e.target.value, 10))}
              label="Gap"
            />
          </Flex>

          <Flex gap={100} fluid direction="column">
            <Paragraph>Alingment</Paragraph>

            <Flex customClass="inputGroup">
              <ToggleGroup
                type="single"
                size="mini"
                value={alignment}
                aria-label="Text alignment"
                onValueChange={(value) => setAlignment(value)}
              >
                {layoutDirection === "row" ? (
                  <>
                    <ToggleGroup.Item value="top" aria-label="Top aligned">
                      <AlignTopIcon />
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="center"
                      aria-label="Center aligned"
                    >
                      <AlignCenterHorizontallyIcon />
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="bottom"
                      aria-label="Bottom aligned"
                    >
                      <AlignBottomIcon />
                    </ToggleGroup.Item>
                  </>
                ) : (
                  <>
                    <ToggleGroup.Item value="left" aria-label="Left aligned">
                      <AlignLeftIcon />
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="center"
                      aria-label="Center aligned"
                    >
                      <AlignCenterHorizontallyIcon />
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="right" aria-label="Right aligned">
                      <AlignRightIcon />
                    </ToggleGroup.Item>
                  </>
                )}
              </ToggleGroup>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default CanvasAutolayout;
