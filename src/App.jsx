import { ApiProvider } from "./context/apiContext";
import "./App.css";
import Grafico from "./pages/Grafico";


function App() {
    return (
        <ApiProvider>
            <div>
                <h1>Bem-vindo ao App Conectar</h1>
                <p>Este é o início da sua aplicação React!</p>
                <Grafico/>
            </div>
        </ApiProvider>
    );
}

export default App;
