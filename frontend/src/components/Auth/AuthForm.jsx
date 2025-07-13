import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { IoFootballOutline } from 'react-icons/io5';

/**
 * Um formulário reutilizável para login e registo, com a lógica de campos corrigida.
 * @param {object} props
 * @param {boolean} props.isRegisterForm - Define se o formulário está no modo de registo.
 * @returns {JSX.Element}
 */
const AuthForm = ({ isRegisterForm }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();

    const isFormValid = isRegisterForm
        ? formData.password.length >= 6 && formData.password === formData.confirmPassword && agreedToTerms
        : true;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegisterForm && !isFormValid) {
            setError('Por favor, verifique os seus dados.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            if (isRegisterForm) {
                await register({ username: formData.username, email: formData.email, password: formData.password });
            } else {
                // Agora isto está correto: o formulário envia o username que foi preenchido.
                await login({ username: formData.username, password: formData.password });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Ocorreu um erro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* CORREÇÃO: O campo de Username agora não está mais dentro do 'isRegisterForm'
                pois ele é usado em ambos os formulários (Login e Registo).
                No design de Login, o campo é "Nome de usuário".
            */}
            <div className="relative">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">person</span>
                <input
                    name="username"
                    type="text"
                    required
                    placeholder="Nome de utilizador"
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-custom"
                />
            </div>

            {/* O campo de E-mail agora SÓ aparece se for o formulário de registo */}
            {isRegisterForm && (
                <div className="relative">
                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">email</span>
                    <input name="email" type="email" required placeholder="E-mail" value={formData.email} onChange={handleChange} className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-custom" />
                </div>
            )}

            <div className="relative">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
                <input name="password" type="password" required placeholder="Senha" value={formData.password} onChange={handleChange} className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-custom" />
            </div>

            {isRegisterForm && (
                <>
                    <div className="relative">
                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
                        <input name="confirmPassword" type="password" required placeholder="Confirmar senha" value={formData.confirmPassword} onChange={handleChange} className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-custom" />
                    </div>
                    <div className="flex items-center pt-2 pb-4">
                        <input id="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="h-4 w-4 rounded text-teal-custom focus:ring-teal-custom border-gray-300" />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">Aceito os <a href="/terms" className="text-teal-custom hover:underline">Termos de Jogo</a></label>
                    </div>
                </>
            )}

            {/* TODO: Eu preciso de adicionar aqui o link "Esqueceu a senha?" para o formulário de login */}

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <div>
                <button type="submit" disabled={loading || (isRegisterForm && !isFormValid)} className="w-full bg-teal-custom text-white py-3 rounded-lg font-semibold flex items-center justify-center bg-[#37B29E] hover:bg-teal-800 transition-colors disabled:opacity-50">
                    <IoFootballOutline className="h-6 w-6 mr-2" />
                    {loading ? 'A processar...' : (isRegisterForm ? 'Entrar em Campo' : 'Entrar')}
                </button>
            </div>
        </form>
    );
};

export default AuthForm;