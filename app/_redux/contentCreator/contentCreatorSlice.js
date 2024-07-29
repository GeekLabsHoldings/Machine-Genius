import { createSlice } from "@reduxjs/toolkit";

function finalArticleInit() {
  if (typeof window !== "undefined") {
    const finalArticleInitValue = sessionStorage.getItem("finalArticle");
    return finalArticleInitValue ? JSON.parse(finalArticleInitValue) : null;
  } else {
    return null;
  }
}

function checkGrammerResultsInit() {
  if (typeof window !== "undefined") {
    const checkGrammerResultsInitValue = sessionStorage.getItem(
      "checkGrammerResults"
    );
    return checkGrammerResultsInitValue
      ? JSON.parse(checkGrammerResultsInitValue)
      : [];
  } else {
    return [];
  }
}

function checkAiResultsInit() {
  if (typeof window !== "undefined") {
    const checkAiResultsInitValue = sessionStorage.getItem("checkAiResults");
    return checkAiResultsInitValue ? JSON.parse(checkAiResultsInitValue) : [];
  } else {
    return [];
  }
}

const initialState = {
  finalArticle: finalArticleInit(),
  checkGrammerResults: checkGrammerResultsInit(),
  checkAiResults: checkAiResultsInit(),
};

export const contentCreatorSlice = createSlice({
  name: "contentCreator",
  initialState,
  reducers: {
    setFinalArticle: (state, action) => {
      state.finalArticle = action.payload;
    },
    setCheckGrammerResults: (state, action) => {
      state.checkGrammerResults = action.payload;
    },
    setCheckAiResults: (state, action) => {
      state.checkAiResults = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export default contentCreatorSlice.reducer;
export const contentCreatorActions = contentCreatorSlice.actions;
