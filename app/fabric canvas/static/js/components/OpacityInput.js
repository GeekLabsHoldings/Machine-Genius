import React from "react";
import { Flex, Input } from "blocksin-system";
import { OpacityIcon } from "sebikostudio-icons";

const OpacityInput = ({ setOpacity, opacity, handleOpacityChange }) => (
  <Flex gap={300} align="center" style={{ marginTop: "var(--size-100)" }}>
    <Flex gap={100} align="center" customClass="inputGroup">
      <OpacityIcon />
      <Input
        type="number"
        value={opacity}
        onChange={(e) => {
          const newOpacity = e.target.value;
          setOpacity(newOpacity); // Update local state
          handleOpacityChange(newOpacity); // Update canvas object opacity
        }}
        onBlur={() => {
          if (opacity === "") {
            setOpacity(0); // Set to 0% if the input field is empty
            handleOpacityChange("0"); // Apply the 0% opacity
          }
        }}
        min="0"
        max="100"
        placeholder="Opacity"
      />
    </Flex>
  </Flex>
);
export default OpacityInput;
