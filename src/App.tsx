import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAllowed }: { children: React.ReactNode, isAllowed: boolean }) {
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}


function App({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <Routes>
      <Route path="/" element={<div>StripePage</div>} />
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/register" element={<div>RegisterPage</div>} />

      <Route
        path="/protected"
        element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <Routes>
              <Route path="/home-page" element={<div>HomePage</div>} />
              <Route path="/new-post" element={<div>NewPost</div>} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
