import React from "react";
import { ToggleGroup, Flex, Paragraph } from "blocksin-system";
import {
  PinBottomIcon,
  PinLeftIcon,
  PinRightIcon,
  PinTopIcon,
} from "sebikostudio-icons";

const CanvasConstraints = ({ constraints, handleToggleChange }) => {
  return (
    <Flex id="controls" customClass="card" direction="column" gap={100}>
      <Paragraph weight="bold">Constraints</Paragraph>
      <div className="constraints">
        <div className="constraintsView">
          <div
            className={`constraintsBorderBox ${
              constraints.bottom ? "bottom" : "top"
            }${constraints.right ? "right" : "left"}`}
          >
            <span></span>
            <div></div>
          </div>
        </div>
        <ToggleGroup
          className="ToggleGroup LeftRight ToggleGroup-mini"
          type="single"
          value={constraints.right ? "right" : "left"}
          onValueChange={(value) => handleToggleChange("right", value)}
        >
          <ToggleGroup.Item value="left">
            <PinLeftIcon />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="right">
            <PinRightIcon />
          </ToggleGroup.Item>
        </ToggleGroup>
        <ToggleGroup
          type="single"
          className="ToggleGroup TopBottom ToggleGroup-mini"
          value={constraints.bottom ? "bottom" : "top"}
          onValueChange={(value) => handleToggleChange("bottom", value)}
        >
          <ToggleGroup.Item value="top">
            <PinTopIcon />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="bottom">
            <PinBottomIcon />
          </ToggleGroup.Item>
        </ToggleGroup>
      </div>
    </Flex>
  );
};

export default CanvasConstraints;
