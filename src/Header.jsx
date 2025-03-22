import { useNavigate } from "react-router-dom";

export default function Header({ selecionado, score, currentQuestionIndex }) {
  const navigate = useNavigate();

    return (
        <header className="header">
          <div className="nav">
            <button onClick={() => navigate("/")}>home</button>
            <button onClick={() => navigate("/criar")}>criar quiz</button>
          </div>
          <span className="title">{ selecionado ? selecionado.titulo : "Selecione um quizz" }</span>
          <div>
          {selecionado &&
            <>
              <span> {currentQuestionIndex} / {selecionado.perguntas.length} </span>
              <span> pontos: {score} </span>
            </>
          }
          </div>
        </header>
    )
}
