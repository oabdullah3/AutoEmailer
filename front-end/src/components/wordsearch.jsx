import React, { useState } from 'react';
//import './TriviaQuiz.css'; // Ensure you have this CSS file for styling

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
    answer: "William Shakespeare",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  {
    question: "What year did the Titanic sink?",
    options: ["1912", "1905", "1898", "1920"],
    answer: "1912",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    answer: "Leonardo da Vinci",
  },
  {
    question: "Which planet is known for its rings?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    answer: "Saturn",
  },
  // Add more questions as needed
];

const TriviaQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsCorrect(option === questions[currentQuestionIndex].answer);
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  return (
    <div className="trivia-quiz-container">
      <h2>Quick Trivia Quiz while you wait...</h2>
      <p>{questions[currentQuestionIndex].question}</p>
      <div>
        {questions[currentQuestionIndex].options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={selectedOption === option ? 'selected' : ''}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption && (
        <p>
          {isCorrect ? "Correct!" : `Wrong! The correct answer is ${questions[currentQuestionIndex].answer}.`}
        </p>
      )}
      <button onClick={nextQuestion} disabled={!selectedOption}>Next Question</button>
    </div>
  );
};

export default TriviaQuiz;