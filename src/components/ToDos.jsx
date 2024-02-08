import { getFirestore } from "firebase/firestore";
import { useRef, useState, useEffect } from "react";

import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
} from "firebase/firestore";

export default function ToDos({ app }) {
  const [cards, setCards] = useState([]);
  const inputRef = useRef();
  const db = getFirestore(app);
  const [newCard, setNewCard] = useState({});

  useEffect(() => {
    async function getDocuments() {
      const querySnapshot = await getDocs(collection(db, "todos"));

      setCards(querySnapshot.docs.map((doc) => doc.data()));

      const q = query(collection(db, "todos"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setNewCard({ id: change.doc.id, ...change.doc.data() });
          }
        });
      });
    }
    getDocuments();
  }, []);

  useEffect(() => {
    setCards([...cards, newCard]);
  }, [newCard]);

  async function handleAddTask() {
    const text = inputRef.current.value;

    inputRef.current.value = "";
    if (inputRef.current.value.trim().length === 0)
      alert("Tasks names can't be empty");

    const docRef = await addDoc(collection(db, "todos"), {
      text: text,
      timestamp: new Date(),
    });
  }

  return (
    <div>
      <input
        className="border-cyan-600 mr-4 border-[1px] rounded mt-4 "
        type="text"
        ref={inputRef}
        placeholder="the name of your new to-do card"
      />
      <button
        className="bg-green-500 p-2 rounded-xl text-white font-bold"
        onClick={handleAddTask}
      >
        Add Todo
      </button>

      <ul>
        {cards.map((card, index) => {
          return <li key={card.id || index}>{card.text}</li>;
        })}
      </ul>
    </div>
  );
}
