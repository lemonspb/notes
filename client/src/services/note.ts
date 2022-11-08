import api from "./api";
import { AxiosResponse } from "axios";
import { SavedNote } from "../types/notes";

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

const note = { create, getAll };

export default note;