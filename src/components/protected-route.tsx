//   const user = "tmdwp";
//   if (user === null) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { type ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  // 1. While the API is checking if the user has a valid session (refreshing token)
  // if (loading) {
  //   return <div>Loading authentication...</div>; // Or your <LoadingScreen />
  // }

  // 2. If loading is finished and user is still null, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If user exists, render the protected content (Layout, Home, etc.)
  return <>{children}</>;
}
