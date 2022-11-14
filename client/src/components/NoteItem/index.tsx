import styles from "./NoteItem.module.scss";
import { format } from "date-fns";
import { UsertNoteItem } from "../../types/notes";
import classNames from "classnames";
import { FavoriteEmpty, FavoriteFull } from "../../assets/icons";
interface NoteItem extends UsertNoteItem {
  getSelectNote: (id: string) => void;
  isActive: boolean;
  setFavorite: (id?: string, isFavorite?: boolean) => void;
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
      <div className={styles.head}>
        <div className={styles.title}>{props.title}</div>
        <div
          className={styles.favorite}
          onClick={() => props.setFavorite(props.id, props.isFavorite)}
        >
          {props.isFavorite ? <FavoriteFull /> : <FavoriteEmpty />}
        </div>
      </div>

      <div className={styles.subTitle}>
        <div className={styles.date}>
          {format(new Date(props.createdDate || ""), "MM.dd")}{" "}
        </div>
        {props.subTitle}
      </div>
    </div>
  );
}

export default NoteItem;
