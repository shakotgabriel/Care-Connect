// src/contexts/AuthContext.ts
import { createContext } from "react";
import { UserRole } from "../../types/UserRole";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  hospitalId?: string | null;
  status: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
