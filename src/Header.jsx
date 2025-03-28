import { useNavigate } from "react-router-dom";
import "./css/header.css";

export default function Header({ selecionado, score, currentQuestionIndex }) {
  const navigate = useNavigate();

    return (
        <header className="header">
          <div className="nav">
            <button onClick={() => navigate("/")}>home</button>
            <button onClick={() => navigate("/criar")}>criar quiz</button>
          </div>
          <span className="title">{ selecionado ? selecionado.titulo : "Selecione um quiz" }</span>
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
