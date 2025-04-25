import React, { useState } from "react";
import Results from "../Results";

function CustomQuiz({ quiz }) {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [currSelection, setCurrSelection] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  function handleNextQuestion() {
    setSelectedAnswers([...selectedAnswers, currSelection]);
    setCurrQuestion((curr) => curr + 1);
    setCurrSelection('');
  }

  // if all questions is visited, show results
  if (currQuestion === quiz.length) {
    return <Results yourAnswers={selectedAnswers} quiz={quiz} />
  }

  return (
    <div
      key={currQuestion}
      className="quiz-container bg-white rounded-2xl m-4"
    >
      <h3 className="text-2xl font-semibold mb-4">
        Question {currQuestion + 1}: {quiz[currQuestion].question}
      </h3>
      <div className="options grid grid-cols-1 gap-4">
        {quiz[currQuestion].options.map((option, index) => (
          <button
            className={` ${option === currSelection ? 'bg-accent text-white' : ' bg-primary text-secondary'} p-4 font-semibold text-left rounded-2xl cursor-pointer`}
            key={index}
            value={option}
            onClick={(e) => setCurrSelection(e.target.value)}
          >
            {option}
          </button>
        ))}
      </div>
      {currQuestion < quiz.length - 1 ? (
        <button
          className="bg-accent px-4 py-2 text-primary font-semibold mt-8 rounded-2xl cursor-pointer"
          onClick={handleNextQuestion}
        >
          Next
        </button>
      ) : (
        <button className="bg-accent px-4 py-2 text-primary font-semibold mt-8 rounded-2xl cursor-pointer"
        onClick={handleNextQuestion}>
          Submit
        </button>
      )}
    </div>
  );
}

export default CustomQuiz;
