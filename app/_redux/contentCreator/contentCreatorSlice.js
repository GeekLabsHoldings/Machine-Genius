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

function videoTranscriptionInit() {
  if (typeof window !== "undefined") {
    const videoTranscriptionInitValue = sessionStorage.getItem("videoTranscription");
    return videoTranscriptionInitValue ? JSON.parse(videoTranscriptionInitValue) : null;
  } else {
    return null;
  }
}

const initialState = {
  finalArticle: finalArticleInit(),
  checkGrammerResults: checkGrammerResultsInit(),
  checkAiResults: checkAiResultsInit(),
  videoTranscription: videoTranscriptionInit(),
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
    setVideoTranscription: (state, action) => {
      state.videoTranscription = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export default contentCreatorSlice.reducer;
export const contentCreatorActions = contentCreatorSlice.actions;
