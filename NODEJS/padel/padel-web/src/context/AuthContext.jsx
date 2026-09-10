import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = useCallback(() => {
        if (!localStorage.getItem('token')) {
            setUser(null);
            setLoading(false);
            return Promise.resolve();
        }
        return authApi.getMe()
            .then((data) => setUser(data))
            .catch(() => {
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const login = (credentials) => authApi.login(credentials).then((data) => {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        return loadUser();
    });

    const register = (data) => authApi.register(data).then((result) => {
        localStorage.setItem('token', result.token);
        setToken(result.token);
        return loadUser();
    });

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        refreshUser: loadUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth têm que ser usado dentro de um AuthProvider');
    }
    return context;
};
