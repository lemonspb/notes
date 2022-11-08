import api from "./api";
import { AxiosResponse } from "axios";
import { SavedNote, NodeListResponse } from "../types/notes";

const create = (body: SavedNote): Promise<AxiosResponse<[]>> => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const sendData = {
    title: body.title,
    noteText: body.savedNote,
  };
  return api.post(`note/create`, sendData, config);
};

const getAll = (): Promise<AxiosResponse<[]>> => {
  return api.post(`note/all`);
};

const getById = (id: string): Promise<AxiosResponse<NodeListResponse>> => {
  return api.get(`note/${id}`);
};
const update = (sendData: any): Promise<AxiosResponse<[]>> => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return api.patch(`/edit`, sendData, config);
};

const note = { create, update, getAll, getById };

export default note;
