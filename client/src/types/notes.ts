import { OutputBlockData } from "@editorjs/editorjs";

export interface NoteItem extends OutputBlockData {}

export type SavedNote = {
  title: string;
  savedNote: NoteItem[];
};

export type UsertNoteItem = {
  title: string;
  text: NoteItem[];
  id: string;
  date: Date;
};

export type NodeListResponse = {
  createdTime: Date;
  noteText: NoteItem[];
  owner: string;
  title: string;
  __v: number;
  _id: string;
};
