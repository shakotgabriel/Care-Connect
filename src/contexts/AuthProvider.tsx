import { useState } from "react";
import * as React from "react";
import api from "../api/axios";
import { AuthContext, User } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  email: string;
  role: string;
  status: string;
  iat: number;
  exp: number;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Lazy initializer to load token once without useEffect
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role as User["role"],
        status: decoded.status,
      };
    } catch {
      return null;
    }
  });

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("access_token", res.data.token);

    const decoded = jwtDecode<DecodedToken>(res.data.token);
    setUser({
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role as User["role"],
      status: decoded.status,
    });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
