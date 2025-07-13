import { Routes, Route } from 'react-router-dom';
import AuthLayout from './components/Common/AuthLayout.jsx';
import RegisterPage from './components/Auth/Register.jsx';
import LoginPage from './components/Auth/Login.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';

function App() {
    return (
        <Routes>
            <Route path="/welcome" element={<WelcomePage />} />

            {/* Rotas de Autenticação */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Rota Principal Protegida */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;