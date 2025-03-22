import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";
import Header from "./Header";
import './css/lista.css';

export default function QuizCreation({ selecionado, setSelecionado }) {
  const [quizzes, setQuizzes] = useState(() => {
    const quizzesSalvos = localStorage.getItem("quizzes");
    return quizzesSalvos ? JSON.parse(quizzesSalvos) : [];
  });

  const [titulo, setTitulo] = useState("");
  const [perguntas, setPerguntas] = useState([]);
  const [novaPergunta, setNovaPergunta] = useState("");
  const [novaOpcao, setNovaOpcao] = useState("");
  const [opcoes, setOpcoes] = useState([]);

  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  const addOption = () => {
    if (novaOpcao.trim()) {
      setOpcoes([...opcoes, { selecionado: false, texto: novaOpcao }]);
      setNovaOpcao("");
    }
  };

  const addQuestion = () => {
    if (novaPergunta.trim() && opcoes.length > 0) {
      const novaPerguntaObj = { id: uuidv4(), pergunta: novaPergunta, opcoes };
      setPerguntas([...perguntas, novaPerguntaObj]);
      setNovaPergunta("");
      setOpcoes([]);
    }
  };

  const handleSave = () => {
    if (titulo.trim() && perguntas.length > 0) {
      const novoQuiz = { id: uuidv4(), titulo, perguntas };
      setQuizzes((prevQuizzes) => [...prevQuizzes, novoQuiz]);
      setTitulo("");
      setPerguntas([]);
    }
  };

  const handleDelete = (id) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== id));
  };

  return (
    <div>
      <Header selecionado={selecionado} />
      <div className="container">
        <div className="grid">
          <div className="form-criacao">
            <h1>Crie seu quiz</h1>
            <input type="text" placeholder="Título" className="input-field" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            <input type="text" placeholder="Pergunta" className="input-field" value={novaPergunta} onChange={(e) => setNovaPergunta(e.target.value)} />
            <div className="options-container">
              <input type="text" placeholder="Adicionar opção" className="option-input" value={novaOpcao} onChange={(e) => setNovaOpcao(e.target.value)} />
              <button onClick={addOption}>+</button>
            </div>
            <div className="opcoes-nao-salvas">
              {opcoes.map((opt, index) => (
                <label key={index}>
                  <input type="radio" name="answer" onChange={() => {
                    setOpcoes(opcoes.map((o, i) => ({ ...o, selecionado: i === index })));
                  }} checked={opt.selecionado} />
                  {opt.texto}
                </label>
              ))}
              <button onClick={addQuestion}>Adicionar Pergunta</button>
            </div>
          </div>

          <div className="preview">
            <h2>Pré-visualização do Quiz</h2>
            {perguntas.length === 0 ? <p>Nenhuma pergunta foi adicionada.</p> : (
              perguntas.map((q, i) => (
                <div key={q.id} className="question-preview">
                  <p><strong>Pergunta {i + 1}:</strong> {q.pergunta}</p>
                  {q.opcoes.map((opt, j) => (
                    <li key={j} style={{ fontWeight: opt.selecionado ? "bold" : "normal" }}>{opt.texto}</li>
                  ))}
                </div>
              ))
            )}
            <button className="save-button" onClick={handleSave} disabled={!titulo || perguntas.length === 0}>Salvar Quiz</button>
          </div>

          <div className="quiz-list">
            <h1>Lista de quizes</h1>
            <div className="exibicao">
              {quizzes.length === 0 ? <p>Nenhum quiz salvo ainda.</p> : (
                quizzes.map((quiz) => (
                  <div key={quiz.id} className="card">
                    <h2>{quiz.titulo}</h2>
                    {quiz.perguntas.map((q, i) => (
                      <div key={i} id="pergunta">
                        <p><strong>Pergunta:</strong> {q.pergunta}</p>
                        {q.opcoes.map((opt, j) => (
                          <li key={j} style={{ fontWeight: opt.selecionado ? "bold" : "normal" }}>{opt.texto}</li>
                        ))}
                      </div>
                    ))}
                    <label>
                      <input type="checkbox" checked={selecionado?.id === quiz.id} onChange={() => setSelecionado(quiz)} />
                      selecionar quiz
                    </label>
                    <button onClick={() => handleDelete(quiz.id)} className="delete-button">
                      <FaTrash />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
