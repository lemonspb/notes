import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Note from "../services/note";
import {
  SavedNote,
  NoteItem,
  UsertNoteItem,
  NodeListResponse,
} from "../types/notes";
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
    note: [] as NoteItem[],
    userNotesList: [] as UsertNoteItem[],
    selectNote: {} as UsertNoteItem,
  },
  reducers: {
    getCurrentNote: (state, { payload }) => {
      state.note = payload;
    },

    clearSelectNote: (state, payload) => {
      state.userNotesList = [
        {
          title: "Новая метка",
          id: uuidv4(),
          date: new Date(),
        },
        ...state.userNotesList,
      ];
      state.selectNote = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeNote.fulfilled, (state, action) => {
      state.selectNote = {};
    });
    builder.addCase(getAllUserNotes.fulfilled, (state, action) => {
      if (action.payload) {
        state.userNotesList = action.payload.map((note: NodeListResponse) => {
          return {
            title: note.title,
            id: note._id,
            date: note.createdTime,
          };
        });
      }
    });
    builder.addCase(getNoteById.fulfilled, (state, action) => {
      if (action.payload) {
        state.selectNote = {
          title: action.payload.title,
          id: action.payload._id,
          date: action.payload.createdTime,
          blocks: action.payload.noteText,
        };
      }
    });
  },
});

export const { getCurrentNote, clearSelectNote } = noteSlice.actions;

export default noteSlice;
