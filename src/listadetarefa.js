import { useTarefas } from "./tarefa.js";

export default function ListaDeTarefas() {
  const { state, dispatch } = useTarefas();

  const tarefasFiltradas = state.tarefas.filter((t) => {
    if (state.filtro === "concluida") return t.concluida;
    if (state.filtro === "pendentes") return !t.concluida;
    return true;
  });

  return (
    <div style={{ marginTop: 20 }}>
      {tarefasFiltradas.map((tarefa) => (
        <div key={tarefa.id} style={{ display: "flex", gap: 10 }}>
          <input
            type="checkbox"
            checked={tarefa.concluida}
            onChange={() => dispatch({ type: "toggle", payload: tarefa.id })}
          />
          <span
            style={{
              textDecoration: tarefa.concluida ? "line-through" : "none",
            }}
          >
            {tarefa.texto}
          </span>
        </div>
      ))}
    </div>
  );
}
