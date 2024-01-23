import { createElement, useEffect, useState } from "react";
import FlashcardList from "./FlashcardList";
import "./app.css"
import axios from "axios";

function App() {
  const [flashcards, setFlashcards] = useState([])

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10")
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeStr(questionItem.correct_answer);
        const options = [...questionItem.incorrect_answers.map(a => decodeStr(a)), answer]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeStr(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }, [])

  return (
    <div className="container">
    <FlashcardList flashcards={flashcards} />
    </div>
  );

  function decodeStr(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }
}


export default App;
