import { configureStore } from "@reduxjs/toolkit";
import contentCreator from "./contentCreator/contentCreatorSlice";
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    contentCreator,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
