import React, { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const API_BASE_URL = 'http://localhost:5000/api';

const getUserIdFromDecodedToken = (decoded) => {
    const id = decoded.id || decoded.sub;
    return id ? Number(id) : null;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded = jwt_decode(storedToken);
                if (decoded.exp * 1000 > Date.now()) {
                    const userId = getUserIdFromDecodedToken(decoded);
                    if (userId) {
                        setUser({ ...decoded, id: userId });
                        setToken(storedToken);
                    }
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Token inválido", error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errData = await response.json();
                toast.error(errData.error || "Credenciales incorrectas");
                return false;
            }

            const data = await response.json();
            const jwtToken = data.token;
            localStorage.setItem('token', jwtToken);

            const decoded = jwt_decode(jwtToken);
            
            const userId = getUserIdFromDecodedToken(decoded);
            setUser({ ...decoded, id: userId });
            setToken(jwtToken);

            return true;
        } catch (error) {
            console.error(error);
            toast.error("Hubo un error al iniciar sesión");
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        toast.info("Sesión cerrada");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};