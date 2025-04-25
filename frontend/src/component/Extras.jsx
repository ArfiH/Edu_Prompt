import React, { useState } from "react";
import CustomQuiz from "./ExtraComponents/CustomQuiz";
import Summary from "./ExtraComponents/Summary";
import GroqChat from "./ExtraComponents/GroqChat";
import Flashcard from "./ExtraComponents/Flashcard";

function Extras({ index, setIndex, quiz, summary, help, flashcards }) {
  return (
    <div className="extras-container mt-8 relative">
      <ul className="flex border-b">
        <li className="-mb-px border-0">
          <button
            className={
              index === 0
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold rounded-tl-xl"
                : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer rounded-tl-xl"
            }
            onClick={() => setIndex(0)}
          >
            Summary
          </button>
        </li>
        <li className="border-0">
          <button
            className={
              index === 1
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer"
            }
            onClick={() => setIndex(1)}
          >
            Quiz
          </button>
        </li>
        <li className="border-0">
          <button
            className={
              index === 2
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer"
            }
            onClick={() => setIndex(2)}
          >
            Help
          </button>
        </li>
        <li className="border-0">
          <button
            className={
              index === 3
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold rounded-tr-xl"
                : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer rounded-tr-xl"
            }
            onClick={() => setIndex(3)}
          >
            Flashcard
          </button>
        </li>
      </ul>

      <div className="bg-white p-4">
        {index === 0 &&
          (summary?.length > 0 ? (
            <Summary summary={summary} />
          ) : (
            <div className="text-center text-gray-500 p-4">
              <p>Click AI Summary</p>
            </div>
          ))}
        {index === 1 &&
          (quiz?.length > 0 ? (
            <CustomQuiz quiz={quiz} />
          ) : (
            <div className="text-center text-gray-500 p-4">
              <p>Click AI Quiz</p>
            </div>
          ))}
        {index === 2 ? <GroqChat help={help} /> : null}
        {index === 3 &&
          (flashcards?.length > 0 ? (
            <Flashcard flashcards={flashcards} />
          ) : (
            <div className="text-center text-gray-500 p-4">
              <p>Click AI Flashcards</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Extras;
