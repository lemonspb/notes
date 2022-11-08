import styles from "./NoteItem.module.scss";

type NoteItem = {
  text: string;
};

function NoteItem(props: NoteItem) {
  return (
    <div className={styles.note}>
      <div className={styles.text}>{props.text}</div>
    </div>
  );
}

export default NoteItem;
