import { useState } from "react";
import { TarefaProvider, useTarefas } from "./tarefa.js";
import ListaDeTarefas from "./listadetarefa.js";

function AppContent() {
  const [texto, setTexto] = useState("");
  const { state, dispatch } = useTarefas();

  function adicionar() {
    if (!texto.trim()) return;

    dispatch({
      type: "adicionar",
      payload: {
        id: Date.now(),
        texto,
        concluida: false,
      },
    });
    setTexto("");
  }
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h1>Gerenciador de tarefas</h1>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={adicionar}>adicionar</button>

      <select
        value={state.filtro}
        onChange={(e) => dispatch({ type: "filtro", payload: e.target.value })}
      >
        <option value="todas">Todas</option>
        <option value="concluida">Concluídas</option>
        <option value="pendentes">Pendentes</option>
      </select>

      <ListaDeTarefas />
    </div>
  );
}
export default function App() {
  return (
    <TarefaProvider>
      <AppContent />
    </TarefaProvider>
  );
}
