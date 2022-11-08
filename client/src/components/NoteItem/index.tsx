import styles from "./NoteItem.module.scss";
import { format } from "date-fns";
import { UsertNoteItem } from "../../types/notes";

interface NoteItem extends UsertNoteItem {
  getSelectNote: (id: string) => void;
}

function NoteItem(props: NoteItem) {
  return (
    <div className={styles.note} onClick={() => props.getSelectNote(props.id)}>
      <div>{format(new Date(props.date), "MM.dd")} </div>
      <div className={styles.title}>{props.title}</div>
    </div>
  );
}

export default NoteItem;
