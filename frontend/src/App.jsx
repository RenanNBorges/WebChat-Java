import { Routes, Route } from 'react-router-dom'
import RegisterPage from './components/Auth/Register.jsx'
import LoginPage from "./components/Auth/Login.jsx";

// TODO: Eu vou criar estes componentes de página a seguir.
const ChatPage = () => <h1>Página de Chat</h1>;

function App() {
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/" element={<ChatPage />} />
        </Routes>
    )
}

export default App