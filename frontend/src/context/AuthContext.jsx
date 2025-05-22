import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (dataUsuario) => {
    setUsuario(dataUsuario);
    localStorage.setItem('usuario', JSON.stringify(dataUsuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
