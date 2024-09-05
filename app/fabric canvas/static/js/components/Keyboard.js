import React, { useState, useEffect } from "react";
import { Flex, Heading } from "blocksin-system";
import Key from "../assets/Key.svg";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "sebikostudio-icons";
import KeyFiller from "../assets/KeyFiller.svg";

// Detect the operating system
const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

const shortcutFunctions = {
  "ctrl+a": "select all",
  "cmd+a": "select all",
  "ctrl+c": "copy",
  "cmd+c": "copy",
  "ctrl+g": "group",
  "cmd+g": "group",
  d: "deselect all",
  space: "hand tool",
  h: "hand tool",
  "ctrl+v": "paste",
  "cmd+v": "paste",
  "ctrl+d": "duplicate",
  "cmd+d": "duplicate",
  delete: "del",
  backspace: "del",
  "ctrl+u": "ungroup",
  "cmd+u": "ungroup",
};

const specialKeys = {
  ArrowLeft: <ArrowLeftIcon />,
  ArrowRight: <ArrowRightIcon />,
  ArrowUp: <ArrowUpIcon />,
  ArrowDown: <ArrowDownIcon />,
  " ": "space",
  Enter: "enter",
  Tab: "tab",
  Shift: "shift",
  Control: "ctrl",
  Meta: isMac ? "⌘" : "cmd",
  Alt: isMac ? "opt" : "alt",
  Escape: "esc",
  Delete: "del",
  Backspace: "del",
};

const getKeyDisplay = (key) => {
  if (specialKeys[key]) return specialKeys[key];
  if (!isNaN(key)) return key;
  return key;
};

const Keyboard = () => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyCombo = [];
      if (event.ctrlKey && !keyCombo.includes("ctrl")) keyCombo.push("ctrl");
      if (event.metaKey && !keyCombo.includes("cmd")) keyCombo.push("cmd");
      if (event.altKey && !keyCombo.includes("opt")) keyCombo.push("opt");
      if (event.shiftKey && !keyCombo.includes("shift")) keyCombo.push("shift");

      const key = event.key;
      if (!["Control", "Meta", "Alt", "Shift"].includes(key)) {
        keyCombo.push(key);
      }

      const keyComboStr = keyCombo.join("+").toLowerCase();
      const action = shortcutFunctions[keyComboStr];
      addKeyCombination([keyCombo, action]);
    };

    const addKeyCombination = ([keyCombo, action]) => {
      const id = Date.now();
      setKeys((prevKeys) => [...prevKeys, { keyCombo, action, id }]);

      setTimeout(() => {
        setKeys((prevKeys) => prevKeys.filter((key) => key.id !== id));
      }, 5000); // Matches the animation duration
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Flex customClass="Keyboard" direction="column" gap={100}>
      {keys.map(({ keyCombo, action, id }) => (
        <Flex
          key={id}
          customClass="KeysCombination"
          direction="row"
          align="center"
          gap={200}
          style={{ animation: "fadeOut 3s forwards" }}
        >
          {keyCombo.map((key, index) => (
            <Flex key={index} customClass="Key" align="center" justify="center">
              <img className="KeyHalf" src={Key} alt="Key" />
              <div
                className="KeyFiller"
                style={{ backgroundImage: `url(${KeyFiller})` }}
              ></div>
              <Heading level={3}>
                {typeof getKeyDisplay(key) === "string" ? (
                  getKeyDisplay(key)
                ) : (
                  <span className="icon">{getKeyDisplay(key)}</span>
                )}
              </Heading>
              <img className="KeyHalf reversed" src={Key} alt="Key" />
            </Flex>
          ))}
          {action && <Heading level={3}>{action}</Heading>}
        </Flex>
      ))}
    </Flex>
  );
};

export default Keyboard;
