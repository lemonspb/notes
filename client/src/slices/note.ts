import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Note from "../services/note";
import {
  SavedNote,
  NoteItem,
  UsertNoteItem,
  NodeListResponse,
} from "../types/notes";
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

const noteSlice = createSlice({
  name: "note",
  initialState: {
    note: [] as NoteItem[],
    userNotesList: [] as UsertNoteItem[],
  },
  reducers: {
    getCurrentNote: (state, { payload }) => {
      state.note = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(noteCreate.fulfilled, (state, action) => {});
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
        console.log(action.payload, "++");
      }
    });
  },
});

export const { getCurrentNote } = noteSlice.actions;

export default noteSlice;
