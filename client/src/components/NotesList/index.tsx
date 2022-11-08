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
      {props.list.map((note: any) => {
        return (
          <div onClick={() => props.getSelectNote(note.id)}>
            <NoteItem id={note.id} title={note.title} />
          </div>
        );
      })}
    </div>
  );
}

export default NotesList;
