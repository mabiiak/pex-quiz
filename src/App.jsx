import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import QuizCreation from './QuizCreation'
import Home from './Home'
import './App.css'

// titulo: "titulo do conteudo",
// perguntas: [
//   {
//     pergunta: "pergunta1?",
//     opcoes: [{selecionado: true, texto: "texto opção 1"}, {selecionado: false, texto: "texto opção 2"}]
//   }, {
//     pergunta: "pergunta2?",
//     opcoes: [{selecionado: true, texto: "texto opção 1"}, {selecionado: false, texto: "texto opção 2"}]
//   },
// ]

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [selecionado, setSelecionado] = useState();
  
  return (
    <Routes>
      <Route path="/" element={
        <Home
          selecionado={selecionado}
          setSelecionado={setSelecionado}
        />  
      } />
      <Route path="/criar" element={
        <QuizCreation
          selecionado={selecionado}
          setSelecionado={setSelecionado}
          quizzes={quizzes}
          setQuizzes={setQuizzes}
        />
      } />
    </Routes>
  )
}

export default App
