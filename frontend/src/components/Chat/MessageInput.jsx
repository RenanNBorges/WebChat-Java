import React, { useState } from 'react';
import './MessageInput.css'; // 1. Importar o nosso novo ficheiro CSS
import btnBall from '../../assets/images/btn-ball.svg';

/**
 * Renderiza o formulário de input de mensagem, com um botão de envio animado.
 * @returns {JSX.Element}
 */
const MessageInput = () => {
    const [message, setMessage] = useState('');

    // 2. Estado para controlar o ciclo de vida da animação.
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() === '' || isAnimating) return; // Previne múltiplos cliques

        // 3. Inicia a animação
        setIsAnimating(true);

        // TODO: (Milestone 6) A lógica de envio do WebSocket virá aqui.
        console.log("Sending message:", message);

        // 4. Lógica de temporização para a animação
        setTimeout(() => {
            setMessage(''); // Limpa o input
            setIsAnimating(false); // Reseta o estado, fazendo a bola reaparecer
        }, 400); // O tempo deve corresponder à duração da animação 'roll-out'
    };

    return (
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div className="flex-grow">
                <div className="relative w-full">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        placeholder="Escreva a sua mensagem..."
                    />
                </div>
            </div>
            <div className="ml-4">
                <button
                    onClick={handleSubmit}
                    className="focus:outline-none"
                    // Desativa o botão durante a animação para prevenir cliques duplos
                    disabled={isAnimating}
                >
                    <img
                        src={btnBall}
                        alt="Enviar Mensagem"
                        // 5. Aplica a classe de animação condicionalmente
                        className={`w-10 h-10 transition-transform duration-150 ease-in-out transform hover:scale-110 ${
                            isAnimating ? 'animate-roll-out' : 'animate-zoom-in'
                        }`}
                    />
                </button>
            </div>
        </div>
    );
};

export default MessageInput;