import styles from "./Header.module.scss";

interface Header {
  remove: () => void;
}

function Header(props: Header) {
  return (
    <div className={styles.header}>
      <div onClick={() => props.remove()}>удалить</div>
    </div>
  );
}

export default Header;
