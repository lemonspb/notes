import styles from "./Header.module.scss";
import { Trash, Edit } from "../../assets/icons";
interface Header {
  removeNote: () => void;
  createNewNote: () => void;
}

function Header(props: Header) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div onClick={() => props.removeNote()} className={styles.delete}>
          <Trash />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.edit} onClick={() => props.createNewNote()}>
          <Edit />
        </div>
      </div>
    </div>
  );
}

export default Header;
