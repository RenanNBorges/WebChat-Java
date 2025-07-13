import React from 'react';
import './FieldBackground.css'; // 1. Importa os estilos do novo ficheiro CSS

/**
 * Uma componente visual que renderiza um fundo estilizado de campo de jogo.
 * @param {object} props
 * @param {React.ReactNode} props.children - As componentes filhas a serem renderizadas sobre o fundo.
 * @returns {JSX.Element}
 */
const FieldBackground = ({ children }) => {
    return (
        // 2. Usa a nova classe CSS '.field-background'
        <div className="field-background">
            {/* A estrutura interna para desenhar o campo permanece a mesma */}
            <div className="center-line"></div>
            <div className="center-circle"></div>
            <div className="penalty-box left"></div>
            <div className="penalty-box right"></div>
            <div className="goal-area left"></div>
            <div className="goal-area right"></div>

            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default FieldBackground;