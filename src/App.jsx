import { useState, useEffect } from "react";
import { push, ref, onValue } from "firebase/database";
import { db } from "./firebase";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleButton = () => {
    if (inputValue === "") {
      alert("Write something!");
    } else {
      push(ref(db, "messages"), {
        text: inputValue,
      })
        .then(() => {
          console.log("Data saved successfully with unique ID!");
          setInputValue("");
        })
        .catch((error) => {
          console.error("Data could not be saved:", error);
        });
    }
  };

  useEffect(() => {
    const messagesRef = ref(db, "messages");

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

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center justify-between my-6 ">
        <input
          type="text"
          placeholder="Type here"
          className="input"
          value={inputValue}
          onChange={handleInput}
        />
        <button
          className="btn"
          onClick={handleButton}
        >
          Send
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className="alert flex items-center justify-center"
            >
              <div className="">{message.text}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Start a conversation!</p>
        )}
      </div>
    </div>
  );
};

export default App;
