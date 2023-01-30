import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Note from "../services/note";
import {
  SavedNote,
  UsertNoteItem,
  NodeListResponse,
  FavoriteRequest,
} from "../types/notes";
import { transformNoteListResponse } from "./utils/transfomNoteListResponse";
import { v4 as uuidv4 } from "uuid";

export const noteCreate = createAsyncThunk(
  "note/create",
  async (payload: SavedNote, thunkAPI) => {
    try {
      const response = await Note.create(payload);
      if (response.data) {
        thunkAPI.dispatch(getAllUserNotes());
        return response.data;
      }
    } catch (e) {
    } finally {
    }
  }
);

export const noteUpdate = createAsyncThunk(
  "note/update",
  async (payload: UsertNoteItem, thunkAPI) => {
    try {
      const response = await Note.update(payload);
      if (response.data) {
        thunkAPI.dispatch(getAllUserNotes());
        return response.data;
      }
    } catch (e) {
    } finally {
    }
  }
);

export const noteSetFavorite = createAsyncThunk(
  "note/setFavorite",
  async (payload: FavoriteRequest, thunkAPI) => {
    try {
      const response = await Note.setFavotite(payload);
      if (response.data) {
        thunkAPI.dispatch(getAllUserNotes());
        return response.data;
      }
    } catch (e) {
    } finally {
    }
  }
);

export const getAllUserNotes = createAsyncThunk("note/getAll", async () => {
  try {
    const response = await Note.getAll();
    if (response.data) {
      return response.data;
    }
  } catch (e) {
  } finally {
  }
});

export const getNoteById = createAsyncThunk(
  "note/getById",
  async (payload: string) => {
    try {
      const response = await Note.getById(payload);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
    } finally {
    }
  }
);

export const removeNote = createAsyncThunk(
  "note/remove",
  async (payload: string, thunkAPI) => {
    try {
      const response = await Note.removeById(payload);
      if (response.data) {
        thunkAPI.dispatch(getAllUserNotes());
        return response.data;
      }
    } catch (e) {
    } finally {
    }
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState: {
    userNotesListFavorites: [] as UsertNoteItem[],
    userNotesList: [] as UsertNoteItem[],
    selectNote: {} as UsertNoteItem,
  },
  reducers: {
    clearSelectNote: (state) => {
      const newNote = {
        title: "Новая метка",
        id: uuidv4(),
        subTitle: "Нет дополнительного текста",
        createdDate: new Date(),
      };
      state.userNotesList = [newNote, ...state.userNotesList];
      state.selectNote = newNote;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeNote.fulfilled, (state, action) => {
      state.selectNote = {};
    });
    builder.addCase(getAllUserNotes.fulfilled, (state, action) => {
      if (action.payload) {
        state.userNotesListFavorites = action.payload
          .filter((note: NodeListResponse) => note.isFavorite)
          .map((note: NodeListResponse) => {
            return transformNoteListResponse(note);
          });
        state.userNotesList = action.payload
          .filter((note: NodeListResponse) => !note.isFavorite)
          .map((note: NodeListResponse) => {
            return transformNoteListResponse(note);
          });
      }
    });
    builder.addCase(getNoteById.fulfilled, (state, action) => {
      if (action.payload) {
        state.selectNote = {
          title: action.payload.title,
          id: action.payload._id,
          createdDate: action.payload.createdTime,
          updatedDate: action.payload.updatedTime,
          blocks: action.payload.noteText,
          isFavorite: action.payload.isFavorite,
        };
      }
    });
  },
});

export const { clearSelectNote } = noteSlice.actions;

export default noteSlice;
