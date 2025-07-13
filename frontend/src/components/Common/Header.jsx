import React from "react";
import { Link } from 'react-router-dom';

/**
 * Renders the main application header.
 * @returns {JSX.Element}
 */
const Header = () => {
    return (
        // O header em si não precisa de cor de fundo, pois ficará sobre o layout principal.
        <header className="absolute top-0 left-0 w-full py-4 bg-white">
            <div className="container mx-auto px-6">
                <Link to="/">
                    {/* TODO: Eu vou atualizar as cores para corresponderem exatamente ao seu último design. */}
                    <h1 className="text-5xl font-bold text-green-font">Foot <span className="text-[#AEEDE9]">Chat</span></h1>
                </Link>
            </div>
        </header>
    );
};

export default Header;