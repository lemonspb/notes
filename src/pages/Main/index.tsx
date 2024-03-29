import { useState, useEffect } from "react";
import NotesList from "../../components/NotesList";
import TextArea from "../../components/TextArea";
import Header from "../../components/Header";
import styles from "./Main.module.scss";
import { OutputBlockData } from "@editorjs/editorjs";

import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  noteCreate,
  getAllUserNotes,
  getNoteById,
  removeNote,
  clearSelectNote,
  noteUpdate,
  noteSetFavorite,
} from "../../slices/note";
import { SavedNote } from "../../types/notes";
import { useNavigate, useSearchParams } from "react-router-dom";

function Main() {
  const dispatch = useAppDispatch();
  const navigaite = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("id");
  const { userNotesList, selectNote, userNotesListFavorites } = useAppSelector(
    (state) => state.note
  );

  useEffect(() => {
    dispatch(getAllUserNotes());
  }, []);

  useEffect(() => {
    if (paramId) {
      dispatch(getNoteById(paramId));
    }
  }, [paramId]);

  const setNoteTitle = (note: OutputBlockData[]) => {
    return note[0]?.data.text || "Новая заметка";
  };

  const setNoteSubTitle = (note: OutputBlockData[]) => {
    return (
      (note.length > 0 && note[1]?.data.text) || "Нет дополнительного текста"
    );
  };

  const getSelectNote = async (id: string) => {
    await navigaite(`/main?id=${id}`);
  };

  const handleFavorite = (id?: string, isFavorite?: boolean) => {
    id && dispatch(noteSetFavorite({ id: id, isFavorite: !isFavorite }));
  };

  const saveNote = async (note: OutputBlockData[]) => {
    if (paramId) {
      await dispatch(
        noteUpdate({
          id: paramId,
          blocks: note,
          title: setNoteTitle(note),
          subTitle: setNoteSubTitle(note),
        })
      );
      return;
    }
    let body: SavedNote = {
      title: setNoteTitle(note),
      savedNote: note,
      subTitle: setNoteSubTitle(note),
    };
    const response: any = await dispatch(noteCreate(body));
    getSelectNote(response.payload._id);
  };

  const removeNoteByid = () => {
    if (paramId) {
      // TODO: put in a separate function
      const indexRemovedItem = userNotesList.findIndex(
        (el) => el.id === paramId
      );
      const nextSelectedItem = userNotesList.at(indexRemovedItem + 1);
      dispatch(removeNote(paramId));
      navigaite(nextSelectedItem ? `/main?id=${nextSelectedItem.id}` : `/main`);
    }
  };
  const createNewNote = () => {
    navigaite(`/main`);
    dispatch(clearSelectNote());
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header removeNote={removeNoteByid} createNewNote={createNewNote} />
      </div>
      <div className={styles.sidebar}>
        <NotesList
          activeId={paramId}
          list={userNotesList}
          listFavorites={userNotesListFavorites}
          handleFavorite={handleFavorite}
          getSelectNote={getSelectNote}
        />
      </div>
      <div className={styles.main}>
        <TextArea note={selectNote} saveNote={saveNote} />
      </div>
    </div>
  );
}

export default Main;
