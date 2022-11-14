import styles from "./NoteList.module.scss";
import NoteItem from "../NoteItem";
import { UsertNoteItem } from "../../types/notes";
interface NodeList {
  list: UsertNoteItem[];
  listFavorites: UsertNoteItem[];
  getSelectNote: (id: string) => void;

  handleFavorite: (id?: string, isFavorite?: boolean) => void;

  activeId?: string | null;
}

function NotesList(props: NodeList) {
  return (
    <div className={styles.list}>
      {props.listFavorites?.length ? (
        <div className={styles.listFavorite}>
          <div className={styles.listFavoriteTitle}>Закреплено</div>
          {props.listFavorites.map((note: UsertNoteItem) => {
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
      ) : (
        ""
      )}
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
