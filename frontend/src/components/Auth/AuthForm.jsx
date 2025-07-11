import React, { useState } from 'react'; // Import do useEffect removido
import { useAuth } from '../../context/AuthContext.jsx';

/**
 * A reusable form component for both login and registration,
 * updated to include password confirmation and terms acceptance for registration.
 * @param {object} props - The component props.
 * @param {boolean} props.isRegisterForm - A flag to determine if the form is for registration.
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
    const { login } = useAuth();
    // TODO: Implement register function in AuthContext
    // const { register } = useAuth();

    /**
     * A derived state to check if the form is valid for submission.
     * For registration, it requires passwords to match and terms to be agreed upon.
     */
    const isFormValid = isRegisterForm
        ? formData.password === formData.confirmPassword && formData.password !== '' && agreedToTerms
        : true;

    /**
     * Handles changes for all text input fields.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Handles the form submission for both login and registration.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegisterForm && !isFormValid) {
            setError('Por favor, verifique se as senhas coincidem e se aceitou os termos.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (isRegisterForm) {
                // TODO: Replace with the actual register function call
                // await register({ username: formData.username, email: formData.email, password: formData.password });
                alert('Registo bem-sucedido! (funcionalidade a ser concluída)');
            } else {
                await login({ username: formData.username, password: formData.password });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Ocorreu um erro. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {isRegisterForm && (
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Nome de utilizador
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className="input mt-1"
                    />
                </div>
            )}

            <div>
                {/* TODO: Update with custom icons as per the design */}
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input mt-1"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input mt-1"
                />
            </div>

            {isRegisterForm && (
                <>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirmar senha
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="input mt-1"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                            Aceito os <a href="/terms" className="text-primary-600 hover:underline">Termos de Jogo</a>
                        </label>
                    </div>
                </>
            )}

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <div>
                <button
                    type="submit"
                    disabled={loading || (isRegisterForm && !isFormValid)}
                    className="w-full btn btn-primary disabled:opacity-50"
                >
                    {loading ? 'A processar...' : (isRegisterForm ? 'Entrar em Campo' : 'Entrar')}
                </button>
            </div>
        </form>
    );
};

export default AuthForm;