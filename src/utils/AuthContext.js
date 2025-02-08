import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //Lưu token người dùng
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const loginAuth = (newToken) => {
        setToken(newToken);
    };

    const logoutAuth = () => {
        setToken(null);
    };


    return (
        <AuthContext.Provider value={{ token, loginAuth, logoutAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
