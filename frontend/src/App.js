import './App.css';
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login"); // "login" | "register"

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const handleLogin = (u) => {
    setUser(u);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setView("login");
  };

  if (!user) {
    return (
      <div className="container">
        {view === "login" ? (
          <Login onLogin={u => { localStorage.setItem("user", JSON.stringify(u)); handleLogin(u); }} switchToRegister={() => setView("register")} />
        ) : (
          <Register onLogin={u => { localStorage.setItem("user", JSON.stringify(u)); handleLogin(u); }} switchToLogin={() => setView("login")} />
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <Dashboard user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;
