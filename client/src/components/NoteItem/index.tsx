import styles from "./NoteItem.module.scss";

function NoteItem(props: any) {
  return (
    <div className={styles.note}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.text}>{props.text}</div>
    </div>
  );
}

export default NoteItem;
