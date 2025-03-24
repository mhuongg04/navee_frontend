import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //Lưu token người dùng
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [role, setRole] = useState(() => JSON.parse(localStorage.getItem('role')) || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', JSON.stringify(role));
            const expiresAt = Date.now() + 24 * 3600 * 1000;
            localStorage.setItem('expiresAt', expiresAt);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('expiresAt');
        }
    }, [token, role]);

    useEffect(() => {
        const checkExpiration = () => {
            const expiresAt = localStorage.getItem('expiresAt');
            if (expiresAt && Date.now() > parseInt(expiresAt, 10)) {
                logoutAuth();
            }
        };

        checkExpiration();

        const interval = setInterval(checkExpiration, 3 * 3600 * 1000);

        return () => clearInterval(interval);
    }, []);

    const loginAuth = (newToken, userRole) => {
        setToken(newToken);
        setRole(userRole);
    };

    const logoutAuth = () => {
        setToken(null);
        setRole(null);
    };


    return (
        <AuthContext.Provider value={{ token, role, loginAuth, logoutAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
