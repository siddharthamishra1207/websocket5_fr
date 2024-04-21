import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("https://websocket-back-a69c.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [gender, setGender] = useState("boy"); // Default gender is "boy"
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <label> Enter the name: </label>
          <input
            type="text"
            placeholder="Name.."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <label> Gender </label>
          <select
            onChange={(event) => {
              setGender(event.target.value);
            }}
            defaultValue="boy" // Default value set to "boy"
          >
            <option value="boy">Male</option>
            <option value="girl">Female</option>
          </select>
          
            <label> Enter the Room Id : </label>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
            
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} gender={gender} />
      )}
    </div>
  );
}

export default App;
