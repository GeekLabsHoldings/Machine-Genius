import { configureStore } from "@reduxjs/toolkit";
import contentCreator from "./contentCreator/contentCreatorSlice";

export const store = configureStore({
  reducer: {
    contentCreator,
  },
});
