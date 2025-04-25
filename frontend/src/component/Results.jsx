import React from "react";
import "../index.css";

function Results({ yourAnswers, quiz }) {
  function isCorrect(ans, index) {
    return true;
  }

  return (
    <div className="results-container grid grid-cols-1 gap-4 mt-8 px-12 py-8 bg-white rounded-2xl">
      <h3 className="text-2xl font-bold">Results</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Your answer</th>
            <th>Correct answer</th>
          </tr>
        </thead>
        <tbody>
          {yourAnswers?.map((ans, index) => {
            return (
              <tr key={index}>
                <td>{quiz[index].question}</td>
                <td>
                  {ans}{" "}
                  {quiz[index].answer === ans ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="green"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big-icon lucide-circle-check-big"
                    >
                      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="red"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-x-icon lucide-circle-x"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                  )}
                </td>
                <td>{quiz[index].answer}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
