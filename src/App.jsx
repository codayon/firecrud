import { useState, useEffect, useRef } from "react";
import { push, ref, onValue } from "firebase/database";
import { db } from "./firebase";

const App = () => {
  const [nickname, setNickname] = useState("");
  const [thought, setThought] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleNicknameInput = (e) => setNickname(e.target.value);
  const handleThoughtInput = (e) => setThought(e.target.value);

  const handleButton = () => {
    if (!nickname.trim() || !thought.trim()) {
      alert("Please fill in both fields!");
      return;
    }

    push(ref(db, "fun-chat"), {
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

  useEffect(() => {
    const messagesRef = ref(db, "fun-chat");

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(messageList);
        scrollToBottom();
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="border flex flex-col gap-4 bg-gray-50 p-6 rounded-lg shadow-lg">
        <label className="font-semibold">Nickname</label>
        <input
          type="text"
          placeholder="NickName123"
          value={nickname}
          onChange={handleNicknameInput}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
          onClick={handleButton}
        >
          Send
        </button>
      </div>

      <div className="mt-8 max-h-96 overflow-y-auto space-y-4 border p-4 rounded-lg shadow-inner bg-white">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className="bg-purple-50 border border-purple-200 p-4 rounded shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{message.nickname}</span>
              </div>
              <p className="mt-2 text-gray-800">{message.thought}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No thoughts yet. Share one!
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default App;
