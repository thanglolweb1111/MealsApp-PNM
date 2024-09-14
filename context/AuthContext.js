import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        user: null,  
    });

    const login = (user) => {
        setAuthState({
        isLoggedIn: true,
        user: user,
        });
    };

    const logout = () => {
        setAuthState({
        isLoggedIn: false,
        user: null,
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
