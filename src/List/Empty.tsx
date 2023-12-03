import styles from "./Empty.module.css";
import ClipboardImg from "../assets/Clipboard.svg";

export function Empty() {
  return (
    <div className={styles.container}>
      <div className={styles.emptyList}>
        <div className={styles.emptyText}>
          <img src={ClipboardImg} className={styles.clipboardImg}/>
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      </div>
    </div>
  );
}