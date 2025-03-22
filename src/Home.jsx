import { useState } from "react";
import Header from "./Header";
import image from "./assets/lari.png";
import "./css/home.css";

export default function Home({ selecionado }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [messageFinal, setMessageFinal] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  let currentQuiz;
  if (selecionado) {
    currentQuiz = selecionado.perguntas[currentQuestionIndex];
  }

  const handleAnswer = (index) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
      setIsAnswered(true);
    }
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      if (currentQuiz.opcoes[selectedAnswer].selecionado) {
        setScore(score + 1);
      }
    }

    setSelectedAnswer(null);
    setIsAnswered(false);

    if (currentQuestionIndex < selecionado.perguntas.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setMessageFinal(true);
    }
  };

  return (
    <div className="container">
      <Header
        selecionado={selecionado}
        score={score}
        currentQuestionIndex={currentQuestionIndex}
      />
      <div className="quiz-content">
        <div className="character">
          <img src={image} alt="Avatar" className="avatar" />
        </div>

        {currentQuiz && !messageFinal ? (
          <div className="question-box">
            <p className="question-text">{currentQuiz.pergunta}</p>

            <div className="options">
              {currentQuiz.opcoes.map((option, index) => (
                <label
                  key={index}
                  className={`option-label ${selectedAnswer === index ? "selected" : ""} ${
                    isAnswered && option.selecionado ? "correct" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="quiz-option"
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => handleAnswer(index)}
                    disabled={isAnswered}
                  />
                  {option.texto}
                </label>
              ))}
            </div>

            <button className="next-button" onClick={handleNext} disabled={selectedAnswer === null}>
              Próxima
            </button>
          </div>
        ) : (
          <div className="question-box">
            {selecionado ? (
              <>
                <p className="question-text">
                  {`Parabéns! Você acertou ${score}/${selecionado.perguntas.length}`}
                </p>
                <button
                  onClick={() => {
                    setMessageFinal(false);
                    setCurrentQuestionIndex(0);
                    setScore(0);
                  }}
                >
                  Reiniciar
                </button>
              </>
            ) : (
              <p className="question-text">Selecione um quiz para começarmos</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
