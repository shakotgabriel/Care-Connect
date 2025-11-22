// src/components/RoleProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../src/hooks/useAuth";
import * as React from "react";

interface Props {
  roles: string[];
  children: JSX.Element;
}

export default function RoleProtectedRoute({ roles, children }: Props) {
  const { user } = useAuth();


  if (!user) return <Navigate to="/login" replace />;

  if (!roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
