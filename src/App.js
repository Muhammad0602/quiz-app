import { createElement, useEffect, useState, useRef } from "react";
import FlashcardList from "./FlashcardList";
import "./app.css"
import axios from "axios";

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php")
    .then(res => {
      setCategories(res.data.trivia_categories)
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    axios.get("https://opentdb.com/api.php", {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
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
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category"> Category </label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => (
              <option value={category.id} key={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input id="amount" type="number" min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
      <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );

  function decodeStr(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }
}


export default App;
