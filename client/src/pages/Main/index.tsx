import { useState, useEffect } from "react";
import NotesList from "../../components/NotesList";
import TextArea from "../../components/TextArea";
import Header from "../../components/Header";
import styles from "./Main.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { noteCreate, getAllUserNotes, getNoteById } from "../../slices/note";
import { SavedNote } from "../../types/notes";
import { useNavigate, useSearchParams } from "react-router-dom";

function Main() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramId = searchParams.get("id");
  const navigaite = useNavigate();
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
  }, [paramId, getNoteById, dispatch]);

  const saveNote = () => {
    const title = note[0].data.text;
    let body: SavedNote = {
      title: title,
      savedNote: note,
    };
    dispatch(noteCreate(body));
  };

  const getSelectNote = (id: string) => {
    navigaite(`/main?id=${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
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
