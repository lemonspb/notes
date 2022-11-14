import styles from "./NoteList.module.scss";
import NoteItem from "../NoteItem";
import { UsertNoteItem } from "../../types/notes";
interface NodeList {
  list: UsertNoteItem[];
  getSelectNote: (id: string) => void;

  handleFavorite: (id: string) => void;

  activeId?: string | null;
}

function NotesList(props: NodeList) {
  return (
    <div className={styles.list}>
      {props.list.map((note: UsertNoteItem) => {
        return (
          <NoteItem
            isActive={props.activeId === note.id}
            id={note.id}
            createdDate={note.createdDate}
            title={note.title}
            key={note.id}
            setFavorite={props.handleFavorite}
            subTitle={note.subTitle}
            isFavorite={note.isFavorite}
            getSelectNote={props.getSelectNote}
          />
        );
      })}
    </div>
  );
}

export default NotesList;
