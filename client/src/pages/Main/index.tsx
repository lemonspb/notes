import { useState, useEffect } from "react";
import NotesList from "../../components/NotesList";
import TextArea from "../../components/TextArea";
import Header from "../../components/Header";
import styles from "./Main.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  noteCreate,
  getAllUserNotes,
  getNoteById,
  removeNote,
  clearSelectNote,
  noteUpdate,
} from "../../slices/note";
import { SavedNote } from "../../types/notes";
import { useNavigate, useSearchParams } from "react-router-dom";

function Main() {
  const dispatch = useAppDispatch();
  const navigaite = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("id");
  const { note, userNotesList, selectNote } = useAppSelector(
    (state) => state.note
  );

  useEffect(() => {
    dispatch(getAllUserNotes());
  }, []);

  useEffect(() => {
    if (paramId) {
      dispatch(getNoteById(paramId));
    }
  }, [paramId, getNoteById]);

  const saveNote = () => {
    const title = note[0].data.text;
    if (paramId) {
      dispatch(
        noteUpdate({
          id: paramId,
          blocks: note,
          title: title,
        })
      );
      return;
    }
    let body: SavedNote = {
      title: title,
      savedNote: note,
    };
    dispatch(noteCreate(body));
  };

  const getSelectNote = (id: string) => {
    navigaite(`/main?id=${id}`);
  };

  const removeNoteByid = () => {
    if (paramId) {
      dispatch(removeNote(paramId));
      navigaite(`/main`);
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
        <div onClick={() => saveNote()}>сохранить</div>
        <NotesList
          activeId={paramId}
          list={userNotesList}
          getSelectNote={getSelectNote}
        />
      </div>
      <div className={styles.main}>
        <TextArea note={selectNote} />
      </div>
    </div>
  );
}

export default Main;
