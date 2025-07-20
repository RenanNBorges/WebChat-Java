import React from "react";
import { Link } from 'react-router-dom';

/**
 * Renderiza o cabeçalho principal da aplicação, usado no AuthLayout.
 * @returns {JSX.Element}
 */
const Header = () => {
    return (
        <header className="absolute top-0 left-0 w-full py-6 bg-white">
            <div className="container mx-auto px-6">
                <Link to="/">
                    <h1 className="text-5xl font-bold text-[var(--color-green-font)]">
                        Foot <span className="text-[var(--color-teal-light)]">Chat</span>
                    </h1>
                </Link>
            </div>
        </header>
    );
};

export default Header;