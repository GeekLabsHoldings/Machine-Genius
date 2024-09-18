"use client";
import React, { useState, useCallback, memo } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelectCheckmarks = memo(function MultipleSelectCheckmarks({
  words,
  getHighlightedWordsValue,
}) {
  const [highlightedWords, setHighlightedWords] = useState([]);

  const handleChange = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;
      const newValue = typeof value === "string" ? value.split(",") : value;
      setHighlightedWords(newValue);
      getHighlightedWordsValue(newValue);
    },
    [getHighlightedWordsValue]
  );

  return (
    <div>
      <FormControl sx={{ m: 0, width: "100%" }}>
        <InputLabel id="highlight-words-checkbox-label">
          Highlighted Words
        </InputLabel>
        <Select
          labelId="highlight-words-checkbox-label"
          id="highlight-words-checkbox"
          multiple
          value={highlightedWords}
          onChange={handleChange}
          input={<OutlinedInput label="Highlighted Words" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {words.map((word) => (
            <MenuItem key={word} value={word}>
              <Checkbox checked={highlightedWords.indexOf(word) > -1} />
              <ListItemText primary={word} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
});

export default MultipleSelectCheckmarks;
