import React, { createContext } from 'react';

/**
 * @type {React.Context<null|object>}
 * O objeto de contexto que irá partilhar o estado de autenticação.
 */
export const AuthContext = createContext(null);


