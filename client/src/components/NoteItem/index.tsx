import styles from "./NoteItem.module.scss";
import { format } from "date-fns";
import { UsertNoteItem } from "../../types/notes";
import classNames from "classnames";

interface NoteItem extends UsertNoteItem {
  getSelectNote: (id: string) => void;
  isActive: boolean;
  setFavorite: (id: string) => void;
}

function NoteItem(props: NoteItem) {
  const noteClasses = classNames({
    [styles.note]: styles.note,
    [styles.note_active]: props.isActive,
  });

  return (
    <div
      className={noteClasses}
      onClick={() => props.getSelectNote(props.id || "")}
    >
      <div>{format(new Date(props.createdDate || ""), "MM.dd")} </div>
      <div
        className={styles.title}
        onClick={() => props.setFavorite(props.id, props.isFavorite)}
      >
        {props.title}{" "}
      </div>
      <div>{props.subTitle}</div>
      <div>{props.isFavorite ? "любимая заметочка" : "дурацкая заметочка"}</div>
    </div>
  );
}

export default NoteItem;
