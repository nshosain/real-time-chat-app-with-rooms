import styles from "./styles.module.css";
import MessagesReceived from "./messages";

const Chat = ({ socket }) => {
  return (
    <div className={styles.chatContainer}>
      <div>
        <MessagesReceived socket={socket} />
      </div>
    </div>
  );
};

export default Chat;
