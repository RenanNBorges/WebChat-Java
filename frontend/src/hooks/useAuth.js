import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Hook customizado para aceder facilmente ao AuthContext.
 * Isto encapsula a lógica de usar o contexto num único local e adiciona uma verificação de segurança.
 * @returns {object} O valor do contexto de autenticação.
 * @throws {Error} Se o hook for usado fora de um AuthProvider.
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined || context === null) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};