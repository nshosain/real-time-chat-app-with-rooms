import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

import { FaLinkedin } from "react-icons/fa";
import { AiOutlineGithub } from "react-icons/ai";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }

    navigate("/chat", { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>

        <button
          className="btn btn-secondary"
          style={{ width: "100%" }}
          onClick={joinRoom}
        >
          Join Room
        </button>

        <div>
          <a
            href="https://github.com/nshosain"
            target="_blank"
            rel="noreferrer"
          >
            <AiOutlineGithub style={{ color: "black", fontSize: "30px" }} />
          </a>{" "}
          <a
            href="https://www.linkedin.com/in/nshosain/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin style={{ color: "black", fontSize: "30px" }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
