import api from "./api";
import { AxiosResponse } from "axios";
import { SavedNote, NodeListResponse, UsertNoteItem } from "../types/notes";

const create = (body: SavedNote): Promise<AxiosResponse<NodeListResponse>> => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const sendData = {
    title: body.title,
    noteText: body.savedNote,
    subTitle: body.subTitle,
  };
  return api.post(`note/create`, sendData, config);
};

const getAll = (): Promise<AxiosResponse<[]>> => {
  return api.post(`note/all`);
};

const getById = (id: string): Promise<AxiosResponse<NodeListResponse>> => {
  return api.get(`note/${id}`);
};
const update = (
  body: UsertNoteItem
): Promise<AxiosResponse<NodeListResponse>> => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const sendData = {
    title: body.title,
    subTitle: body.subTitle,
    noteText: body.blocks,
    id: body.id,
  };
  return api.patch(`note/edit`, sendData, config);
};

const setFavotite = (body: {
  isFavorite: boolean;
  id: string;
}): Promise<AxiosResponse<{}>> => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };  
  return api.patch(`note/favorite`, body, config);
};

const removeById = (id: string): Promise<AxiosResponse<[]>> => {
  return api.delete(`note/remove/${id}`);
};

const note = { create, update, getAll, getById, removeById, setFavotite };

export default note;
