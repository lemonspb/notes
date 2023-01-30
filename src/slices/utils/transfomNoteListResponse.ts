import { NodeListResponse } from "../../types/notes";

export const transformNoteListResponse = (note: NodeListResponse) => {
  return {
    title: note.title,
    id: note._id,
    subTitle: note.subTitle,
    createdDate: note.createdTime,
    isFavorite: note.isFavorite,
  };
};
