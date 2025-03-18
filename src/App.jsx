import { ApiProvider } from "./context/apiContext";
import "./App.css";
import Grafico from "./pages/Grafico";
import Tabela from "./pages/Tabela";
import { useState } from "react";

function App() {
    const [showGrafico, setShowGrafico] = useState(true);
    return (
        <ApiProvider>
            <div className="w-full min-h-screen flex flex-col items-center justify-start gap-4 p-4 overflow-y-auto mt-10
            ">
                <h1>Desafio Técnico</h1>

                <button onClick={() => setShowGrafico(true)}>
                    Mostrar Gráfico
                </button>
                <button onClick={() => setShowGrafico(false)}>
                    Mostrar Tabela
                </button>
                {showGrafico ? <Grafico/> : <Tabela />}
            </div>
        </ApiProvider>
    );
}

export default App;
