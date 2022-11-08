import { useState, useEffect } from "react";
import NotesList from "../../components/NotesList";
import TextArea from "../../components/TextArea";
import Header from "../../components/Header";
import styles from "./Main.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { noteCreate, getAllUserNotes, getNoteById } from "../../slices/note";
import { SavedNote } from "../../types/notes";

function Main() {
  const dispatch = useAppDispatch();
  const { note, userNotesList, selectNote } = useAppSelector(
    (state) => state.note
  );
  useEffect(() => {
    dispatch(getAllUserNotes());
  }, []);

  const saveNote = () => {
    const title = note[0].data.text;
    console.log(note, selectNote);
    let body: SavedNote = {
      title: title,
      savedNote: note,
    };
    dispatch(noteCreate(body));
  };

  const getSelectNote = (id: string) => {
    dispatch(getNoteById(id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.sidebar}>
        <div onClick={() => saveNote()}>сохранить</div>
        <NotesList list={userNotesList} getSelectNote={getSelectNote} />
      </div>
      <div className={styles.main}>
        <TextArea note={selectNote} />
      </div>
    </div>
  );
}

export default Main;
