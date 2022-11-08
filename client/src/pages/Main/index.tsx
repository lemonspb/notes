import { useState, useEffect } from "react";
import NotesList from "../../components/NotesList";
import TextArea from "../../components/TextArea";
import Header from "../../components/Header";
import styles from "./Main.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { noteCreate, getAllUserNotes } from "../../slices/note";
import { SavedNote } from "../../types/notes";

function Main() {
  const dispatch = useAppDispatch();
  const { note, userNotesList } = useAppSelector((state) => state.note);
  const initListNotes = [{ text: "", title: "Лила", id: "1" }];
  const [listNotes, setListNotes] = useState<any>(initListNotes);

  useEffect(() => {
    dispatch(getAllUserNotes());
  }, []);

  const saveNote = () => {
    const title = note[0].data.text;

    let body: SavedNote = {
      title: title,
      savedNote: note,
    };
    dispatch(noteCreate(body));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.sidebar}>
        <div onClick={() => saveNote()}>сохранить</div>
        <NotesList list={userNotesList} />
      </div>
      <div className={styles.main}>
        <TextArea />
      </div>
    </div>
  );
}

export default Main;
