import React, { useState } from "react";
import { login } from "../api";

export default function Login({ onLogin, switchToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setErr("");
    try {
      const res = await login(form);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      onLogin(res.user);
    } catch (error) {
      setErr(error.error || "login failed");
    }
  };

  return (
    <div className="card auth">
      <h2 className="center">Login</h2>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 8 }}>
          <input name="email" className="form-control" placeholder="email" value={form.email} onChange={change} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input name="password" type="password" className="form-control" placeholder="password" value={form.password} onChange={change} />
        </div>
        {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary" type="submit">Login</button>
          <button type="button" className="btn" onClick={switchToRegister}>Register</button>
        </div>
      </form>
    </div>
  );
}
