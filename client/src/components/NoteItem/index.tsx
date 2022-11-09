import styles from "./NoteItem.module.scss";
import { format } from "date-fns";
import { UsertNoteItem } from "../../types/notes";
import classNames from "classnames";

interface NoteItem extends UsertNoteItem {
  getSelectNote: (id: string) => void;
  isActive: boolean;
}

function NoteItem(props: NoteItem) {
  const noteClasses = classNames({
    [styles.note]: styles.note,
    [styles.note_active]: props.isActive,
  });

  return (
    <div className={noteClasses} onClick={() => props.getSelectNote(props.id)}>
      <div>{format(new Date(props.date), "MM.dd")} </div>
      <div className={styles.title}>{props.title}</div>
    </div>
  );
}

export default NoteItem;
