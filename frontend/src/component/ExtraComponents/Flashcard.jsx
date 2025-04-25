import { useState, useEffect } from 'react';

export default function FlashcardDeck({ flashcards = [] }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  
  // Handle when there are no flashcards
  if (flashcards.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 w-full bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
        <p className="text-gray-500 text-center font-medium">No flashcards available</p>
      </div>
    );
  }
  
  const currentCard = flashcards[currentCardIndex];
  
  const handleFlip = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    
    // Reset animating state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const handleNext = () => {
    setIsFlipped(false); // Reset to question side
    setCurrentCardIndex((prevIndex) => 
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevious = () => {
    setIsFlipped(false); // Reset to question side
    setCurrentCardIndex((prevIndex) => 
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
      {/* Progress bar */}
      <div className="w-full mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Card {currentCardIndex + 1} of {flashcards.length}</span>
          <span>{Math.round(((currentCardIndex + 1) / flashcards.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Flashcard */}
      <div 
        className="w-full h-64 cursor-pointer mb-8"
        onClick={handleFlip}
        style={{ perspective: '1000px' }}
      >
        <div 
          className={`relative w-full h-full transition-all duration-500 ease-in-out`}
          style={{ 
            transformStyle: 'preserve-3d', 
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Question Side */}
          <div 
            className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div className="bg-blue-50 text-blue-600 font-medium text-sm px-3 py-1 rounded-full w-fit mb-4">Question</div>
            <div className="text-xl text-center font-medium">{currentCard.Question}</div>
            <div className="text-sm text-gray-400 mt-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <rect x="4" y="5" width="16" height="16" rx="2" ry="2"></rect>
                <line x1="16" y1="3" x2="16" y2="7"></line>
                <line x1="8" y1="3" x2="8" y2="7"></line>
                <line x1="4" y1="11" x2="20" y2="11"></line>
                <rect x="8" y="15" width="2" height="2"></rect>
              </svg>
              Tap to reveal answer
            </div>
          </div>
          
          {/* Answer Side */}
          <div 
            className="absolute w-full h-full bg-blue-50 rounded-xl shadow-lg p-6 flex flex-col justify-center items-center"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="bg-blue-100 text-blue-700 font-medium text-sm px-3 py-1 rounded-full w-fit mb-4">Answer</div>
            <div className="text-xl text-center">{currentCard.Answer}</div>
            <div className="text-sm text-gray-400 mt-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              Tap to see question
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="flex justify-between w-full">
        <button
          onClick={handlePrevious}
          className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Previous
        </button>
        
        <div className="flex items-center text-gray-500">
          <span className="font-medium text-blue-600">{currentCardIndex + 1}</span>
          <span className="mx-2">/</span>
          <span>{flashcards.length}</span>
        </div>
        
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center font-medium"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}