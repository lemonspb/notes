import styles from "./NoteList.module.scss";
import NoteItem from "../NoteItem";
import { UsertNoteItem } from "../../types/notes";
interface NodeList {
  list: UsertNoteItem[];
  getSelectNote: (id: string) => void;
}

function NotesList(props: NodeList) {
  return (
    <div className={styles.list}>
      {props.list.map((note: UsertNoteItem) => {
        return (
          <NoteItem
            id={note.id}
            date={note.date}
            title={note.title}
            key={note.id}
            getSelectNote={props.getSelectNote}
          />
        );
      })}
    </div>
  );
}

export default NotesList;
