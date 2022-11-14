import { OutputBlockData } from "@editorjs/editorjs";

export interface NoteItem extends OutputBlockData {}

export type SavedNote = {
  title: string;
  subTitle?: string;
  savedNote: NoteItem[];
};

export type UsertNoteItem = {
  title?: string;
  subTitle?: string;
  id?: string;
  createdDate?: Date;
  updatedDate?: Date;
  isFavorite?: boolean;
  blocks?: NoteItem[];
};

export type FavoriteRequest = {
  isFavorite: boolean;
  id: string;
};

export type NodeListResponse = {
  subTitle?: string;
  updatedTime?: Date;
  createdTime: Date;
  title: string;
  _id: string;
  isFavorite: boolean;
  noteText?: NoteItem[];
  owner: string;
  __v: number;
};
