import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import note from "../slices/note";
const store = configureStore({
  reducer: {
    note: note.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
