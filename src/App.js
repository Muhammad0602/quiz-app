import FlashcardList from "./FlashcardList";

function App() {
  return (
    <>
    <FlashcardList flashcards={DATA_API} />
    </>
  );
}

const DATA_API = [
  {
    id: 1,
    question: "What is 3 + 3", 
    options: [
      "4",
      "5",
      "7",
      "6"
    ],
    answer: "6"
  },

  {
    id: 2,
    question: "What is 4 + 6", 
    options: [
      "24",
      "35",
      "10",
      "63"
    ],
    answer: "10"
  },
  
]

export default App;
