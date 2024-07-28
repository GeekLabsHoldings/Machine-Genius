import { createSlice } from "@reduxjs/toolkit";

function finalArticleInit() {
  if (typeof window !== "undefined") {
    const finalArticleInitValue = sessionStorage.getItem("finalArticle");
    return finalArticleInitValue ? JSON.parse(finalArticleInitValue) : null;
  } else {
    return null;
  }
}

const initialState = {
  finalArticle: finalArticleInit(),
};

export const contentCreatorSlice = createSlice({
  name: "contentCreator",
  initialState,
  reducers: {
    setFinalArticle: (state, action) => {
      state.finalArticle = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export default contentCreatorSlice.reducer;
export const contentCreatorActions = contentCreatorSlice.actions;
