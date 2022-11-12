import { OutputBlockData } from "@editorjs/editorjs";

export interface NoteItem extends OutputBlockData {}

export type SavedNote = {
  title: string;
  savedNote?: NoteItem[];
};

export type UsertNoteItem = {
  title?: string;
  id?: string;
  date?: Date;
  blocks?: NoteItem[];
};

export type NodeListResponse = {
  createdTime: Date;
  title: string;
  _id: string;
  noteText?: NoteItem[];
};
