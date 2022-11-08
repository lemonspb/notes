import styles from "./NoteList.module.scss";
import NoteItem from "../NoteItem";
function NotesList(props: any) {
  return (
    <div className={styles.list}>
      {props.list.map((note: any) => {
        return (
          <NoteItem
            id={note.id}
            onClick={() => props.getNoteById()}
            title={note.title}
          />
        );
      })}
    </div>
  );
}

export default NotesList;
