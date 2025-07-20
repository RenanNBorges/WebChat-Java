import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button'; // Importamos nosso componente Button

/**
 * A página de destino pública, agora usando o componente Button para consistência.
 */
const WelcomePage = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 text-white"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/background.webp')` }}
        >
            <h1 className="text-5xl md:text-6xl font-bold">Foot Chat</h1>
            <p className="mt-4 text-xl md:text-2xl text-center max-w-2xl">
                A sua plataforma para discutir táticas, celebrar vitórias e conectar-se com outros fãs de futebol.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-xs">
                {/* Botão de "Entrar" */}
                <Button
                    as={Link} // Diz ao nosso componente para se renderizar como um Link
                    to="/login"
                    variant="primary"
                    className="w-full" // Garante que o botão ocupe o espaço
                >
                    Entrar
                </Button>

                {/* Botão de "Registar" */}
                <Button
                    as={Link} // Também se renderiza como um Link
                    to="/register"
                    variant="secondary" // Usamos a variante secundária para o estilo branco
                    className="w-full"
                >
                    Registar
                </Button>
            </div>
        </div>
    );
};

export default WelcomePage;