import { useState, useEffect, useRef } from "react";
import { push, ref, remove, onValue } from "firebase/database";
import { db } from "./firebase";

const App = () => {
  const [nickname, setNickname] = useState("");
  const [thought, setThought] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = ref(db, "fun-chat");

  const handleNicknameInput = (e) => setNickname(e.target.value);
  const handleThoughtInput = (e) => setThought(e.target.value);

  const handleSendButton = () => {
    if (!nickname.trim() || !thought.trim()) {
      alert("Please fill in both fields!");
      return;
    }

    push(messagesRef, {
      nickname: nickname.trim().replace(/\s+/g, ""),
      thought: thought.trim(),
    })
      .then(() => {
        setNickname("");
        setThought("");
      })
      .catch((error) => {
        console.error("Data could not be saved:", error);
      });
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all messages?")) {
      remove(ref(db, "fun-chat"))
        .then(() => console.log("All messages deleted"))
        .catch((err) => console.error("Error deleting all:", err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this message?")) {
      remove(ref(db, `fun-chat/${id}`))
        .then(() => console.log(`Message ${id} deleted`))
        .catch((err) => console.error("Error deleting message:", err));
    }
  };

  useEffect(() => {
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(messageList);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="border flex flex-col gap-4 bg-gray-50 p-6 rounded-lg shadow-lg">
        <label className="font-semibold">Nickname</label>
        <input
          type="text"
          placeholder="NickName123"
          value={nickname}
          onChange={handleNicknameInput}
          className="border border-gray-300 bg-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <label className="font-semibold">Thought</label>
        <textarea
          placeholder="Share your random thought..."
          value={thought}
          onChange={handleThoughtInput}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          rows={3}
        />

        <button
          className="bg-purple-500 text-white font-semibold py-2 px-4 rounded hover:bg-purple-600 transition"
          onClick={handleSendButton}
        >
          Send
        </button>
      </div>

      <div className="mt-8 max-h-96 overflow-y-auto border p-4 rounded-lg shadow-inner bg-white">
        {messages.length > 0 ? (
          <div className="flex flex-col gap-4">
            <button
              onClick={handleDeleteAll}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Delete All
            </button>
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-purple-50 border border-purple-200 p-4 rounded shadow-sm flex justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">
                      {message.nickname}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-800">{message.thought}</p>
                </div>
                <button
                  onClick={() => {
                    handleDelete(message.id);
                  }}
                  className="bg-red-500 text-white self-start font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No thoughts yet. Share one!
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
