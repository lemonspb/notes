import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import auth from "../slices/auth";
import note from "../slices/note";
const store = configureStore({
  reducer: {
    auth: auth.reducer,
    note: note.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
