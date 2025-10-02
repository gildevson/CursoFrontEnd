// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoutes({ children }: Props) {
  const token = localStorage.getItem("token");
  

  if (!token) {
    // Se não tiver token, redireciona para login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}


