import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; 
import Header from "./Header";

export default function QuizCreation({ selecionado, setSelecionado }) {
  // 🟢 Agora carregamos os quizzes diretamente ao inicializar o estado
  const [quizzes, setQuizzes] = useState(() => {
    const quizzesSalvos = localStorage.getItem("quizzes");
    return quizzesSalvos ? JSON.parse(quizzesSalvos) : [];
  });

  const [titulo, setTitulo] = useState("");
  const [perguntas, setPerguntas] = useState([]);
  const [novaPergunta, setNovaPergunta] = useState("");
  const [novaOpcao, setNovaOpcao] = useState("");
  const [opcoes, setOpcoes] = useState([]);

  // 🟢 Atualiza o localStorage sempre que quizzes for modificado
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
      setQuizzes((prevQuizzes) => [...prevQuizzes, novoQuiz]); // Atualiza corretamente
      setTitulo("");
      setPerguntas([]);
    }
  };

  return (
    <div className="container">
      <Header selecionado={selecionado} />

      <div className="quiz-box">
        <div className="content">
          <input
            type="text"
            placeholder="Título"
            className="input-field"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Pergunta"
            className="input-field"
            value={novaPergunta}
            onChange={(e) => setNovaPergunta(e.target.value)}
          />
          <div className="options-container">
            <input
              type="text"
              placeholder="Adicionar opção"
              className="option-input"
              value={novaOpcao}
              onChange={(e) => setNovaOpcao(e.target.value)}
            />
            <button onClick={addOption}>+</button>
          </div>
          <ul>
            {opcoes.map((opt, index) => (
              <li key={index}>
                <input
                  type="radio"
                  name="answer"
                  onChange={() => {
                    setOpcoes(opcoes.map((o, i) => ({ ...o, selecionado: i === index })));
                  }}
                  checked={opt.selecionado}
                />
                {opt.texto}
              </li>
            ))}
          </ul>
          <button onClick={addQuestion}>Adicionar Pergunta</button>
        </div>
      </div>

      {/* Pré-visualização */}
      <div className="preview">
        <h2>Pré-visualização do Quiz</h2>
        {perguntas.length === 0 ? (
          <p>Nenhuma pergunta adicionada ainda.</p>
        ) : (
          perguntas.map((q, i) => (
            <div key={q.id} className="question-preview">
              <p><strong>Pergunta {i + 1}:</strong> {q.pergunta}</p>
              <ul>
                {q.opcoes.map((opt, j) => (
                  <li key={j} style={{ fontWeight: opt.selecionado ? "bold" : "normal" }}>{opt.texto}</li>
                ))}
              </ul>
            </div>
          ))
        )}
        <button className="save-button" onClick={handleSave} disabled={!titulo || perguntas.length === 0}>
          Salvar Quiz
        </button>
      </div>

      {/* Lista de quizzes salvos */}
      <div className="quiz-list">
        <h2>Lista de quizzes</h2>
        {quizzes.length === 0 ? (
          <p>Nenhum quiz salvo ainda.</p>
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-item">
              <h3>{quiz.titulo}</h3>
              
              {quiz.perguntas.map((q, i) => (
                <div key={i}>
                  <p><strong>Pergunta:</strong> {q.pergunta}</p>
                  <ul>
                    {q.opcoes.map((opt, j) => (
                      <li key={j} style={{ fontWeight: opt.selecionado ? "bold" : "normal" }}>{opt.texto}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <label>
                Selecionar Quizz
                <input
                  type="checkbox"
                  checked={selecionado?.id === quiz.id}
                  onChange={() => setSelecionado(quiz)}
                />
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
