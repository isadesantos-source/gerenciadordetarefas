import { createContext, useContext, useReducer } from "react";

const TarefaContext = createContext(null);

const initialState = {
  tarefas: [],
  filtro: "todas",
};

function reducer(state, action) {
  switch (action.type) {
    case "adicionar":
      return {
        ...state,
        tarefas: [...state.tarefas, action.payload],
      };

    case "toggle":
      return {
        ...state,
        tarefas: state.tarefas.map((t) =>
          t.id === action.payload ? { ...t, concluida: !t.concluida } : t,
        ),
      };

    case "filtro":
      return {
        ...state,
        filtro: action.payload,
      };
    default:
      return state;
  }
}
export function TarefaProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TarefaContext.Provider value={{ state, dispatch }}>
      {children}
    </TarefaContext.Provider>
  );
}

export function useTarefas() {
  return useContext(TarefaContext);
}
