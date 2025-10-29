import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import type { JSX } from 'react';

interface ProtectedRouteProps {
  readonly children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuth((s) => s.token);

  if (!token) return <Navigate to="/login" replace />;

  return children;
}
